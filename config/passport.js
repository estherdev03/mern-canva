const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const callbackURL =
  process.env.GOOGLE_CALLBACK_URL ||
  `${process.env.API_URL || "http://localhost:5000"}/api/auth/google/callback`;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName || profile.name?.givenName || "User";
        const image = profile.photos?.[0]?.value || "";

        if (!email) {
          return done(new Error("No email from Google profile"), null);
        }

        let user = await User.findOne({ email });
        if (user) {
          if (!user.image && image) {
            user.image = image;
            await user.save();
          }
        } else {
          user = await User.create({
            name,
            email,
            image,
          });
        }

        const token = jwt.sign(
          { name: user.name, email: user.email, _id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: "2d" }
        );

        return done(null, { user, token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
