// controllers/authController.js
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const User = require("../models/User");


exports.register = async (req, res) => {
  try {
    const { fullname, email, password, mobileNumber } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already registered. Please login." });
    }

    const existingMobile = await User.findOne({ mobileNumber });
    if (existingMobile) {
      return res.status(400).json({ error: "Mobile number already registered. Please login." });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname, email, password: hashed, mobileNumber });

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

exports.login = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;
    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(404).json({ message: "User not registered" });
    }

    if (password) {
      const isMatch = await bcrypt.compare(password, user.password);
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

    // No password → return login options
    return res.json({
      exists: true,
      loginMethods: ["otp", "password"],
    });

  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Server error during login." });
  }
};
