const passport = require("passport");
const keys = require("../config/keys");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

// user to cookie by user.id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// id from cookie to user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      //   console.log("accessToken", accessToken);
      //   console.log("refreshToken", refreshToken);
      //   console.log("profile", profile);
      User.findOne({ googleId: profile.id }).then(user => {
        if (user) {
          done(null, user);
        } else {
          new User({
            googleId: profile.id
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
