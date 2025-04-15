const express = require("express");
const passport = require("passport");
const router = express.Router();

// Start Google login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback after login
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Redirect or send token after successful login
    res.redirect("http://localhost:3000"); // or send token from backend if you're doing JWT
  }
);

module.exports = router;
