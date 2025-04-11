const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");


router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
      failureRedirect: "http://localhost:3000/login",
      session: true,
    }),
    (req, res) => {
      const user = req.user;

      console.log("✅ Facebook user:", user);

  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      console.log("🔐 Generated token:", token);
      res.redirect(`http://localhost:3000/home?token=${token}`);
    }
  );

module.exports = router;
