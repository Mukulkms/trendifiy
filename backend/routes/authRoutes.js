const express = require("express");
const router = express.Router();
const {
  register,
  login,
  sendOTP,
  verifyOTP,
  checkUserLoginMethods,
} = require("../controllers/authController");

// Auth Routes
router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/check-user", checkUserLoginMethods);


module.exports = router;
