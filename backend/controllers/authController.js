const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");


const sendOTP = async (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber) return res.status(400).json({ message: "Mobile number required" });

  const user = await User.findOne({ mobileNumber });
  if (!user) return res.status(404).json({ message: "User not registered" });

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  user.otp = otp;
  user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
  await user.save();

  console.log(`OTP for ${mobileNumber} is ${otp}`);

  res.json({ success: true, message: "OTP sent successfully" });
};

const verifyOTP = async (req, res) => {
  const { mobileNumber, otp } = req.body;

  if (!mobileNumber || !otp) {
    return res.status(400).json({ message: "Mobile number and OTP required" });
  }

  const user = await User.findOne({ mobileNumber });

  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (user.otpExpiresAt < new Date()) {
    return res.status(400).json({ message: "OTP has expired" });
  }

  user.otp = null;
  user.otpExpiresAt = null;
  await user.save();

  const token = jwt.sign({ id: user._id, mobileNumber: user.mobileNumber }, "your_jwt_secret", {
    expiresIn: "1d",
  });

  res.json({ token, user });
};

const register = async (req, res) => {
  console.log("📥 Register payload:", req.body);


  try {
    const { fullname, email, password, mobileNumber } = req.body;

    // Check required fields
    if (!fullname || !email || !password || !mobileNumber) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check for duplicates
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already registered. Please login." });
    }

    const existingMobile = await User.findOne({ mobileNumber });
    if (existingMobile) {
      return res.status(400).json({ error: "Mobile number already registered. Please login." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with hashed password
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      mobileNumber,
    });

    // Respond with token and user data
    res.status(201).json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        mobileNumber: user.mobileNumber,
      },
    });

  } catch (err) {
    if (err.code === 11000) {
      if (err.keyPattern?.email) {
        return res.status(409).json({ error: "Email already exists." });
      } else if (err.keyPattern?.mobileNumber) {
        return res.status(409).json({ error: "Mobile number already exists." });
      }
    }

    console.error("❌ Registration error:", err);
    res.status(500).json({ error: "Server error during registration." });
  }
};


const login = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;
    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(404).json({ message: "User not registered" });
    }

    if (password) {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid mobile number or password" });
      }

      return res.json({
        token: generateToken(user._id),
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          mobileNumber: user.mobileNumber,
        },
      });
    }

    return res.json({
      exists: true,
      loginMethods: ["otp", "password"],
    });

  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Server error during login." });
  }
};

// ✅ CommonJS export
module.exports = {
  register,
  login,
  sendOTP,
  verifyOTP,
};
