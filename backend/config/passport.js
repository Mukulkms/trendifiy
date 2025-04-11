const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");
require("dotenv").config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "emails", "name", "picture.type(large)"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          $or: [{ facebookId: profile.id }, { email: profile.emails?.[0]?.value }],
        });

        if (existingUser) return done(null, existingUser);

        const newUser = new User({
          fullname: `${profile.name.givenName} ${profile.name.familyName}`,
          email: profile.emails?.[0]?.value || undefined,
          facebookId: profile.id,
          profilePic: profile.photos?.[0]?.value || "",
          provider: "facebook",
        });

        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        console.error("Facebook login error:", err);
        return done(err, null);
      }
    }
  )
);

// Session setup
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
