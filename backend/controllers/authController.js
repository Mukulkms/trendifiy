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
    // Trim all values
    const fullname = req.body.fullname?.trim();
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();
    const confirmPassword = req.body.confirmPassword?.trim();
    const mobileNumber = req.body.mobileNumber?.trim();

    // 1. Validation - Check if all fields are filled
    if (!fullname || !email || !password || !confirmPassword || !mobileNumber) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // 2. Password match check
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    // 3. Check for duplicates
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ error: "Email already registered. Please login." });
    }

    const existingMobile = await User.findOne({ mobileNumber });
    if (existingMobile) {
      return res.status(409).json({ error: "Mobile number already registered. Please login." });
    }

    // 4. Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // 5. Create user
    const user = await User.create({
      fullname,
      email,
      password,
      mobileNumber,
      otp,
      otpExpiresAt,
    });

    // 6. Respond success
    res.status(201).json({
      success: true,
      message: "User registered. OTP sent for verification.",
      otpSent: true,
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
    } else {
      // 👇 Generate and save OTP
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });

      user.otp = otp;
      user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry
      await user.save();

      console.log(`🔐 OTP for ${mobileNumber} is ${otp}`);

      return res.json({
        otpSent: true,
        message: "OTP sent successfully",
      });
    }
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Server error during login." });
  }
};

const checkUserLoginMethods = async (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  const user = await User.findOne({ mobileNumber });

  if (!user) {
    return res.status(404).json({ message: "User not registered" });
  }

  const loginMethods = [];

  if (user.password) loginMethods.push("password");
  loginMethods.push("otp"); // Assuming OTP is always allowed

  return res.json({ exists: true, loginMethods });
};


// ✅ CommonJS export
module.exports = {
  register,
  login,
  sendOTP,
  verifyOTP,
  checkUserLoginMethods,
};
