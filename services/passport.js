const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/return',
      proxy: true
    },
    async function (accessToken, refreshToken, profile, cb) {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return cb(null, existingUser);
      }

      const user = await new User({ googleId: profile.id }).save();
      cb(null, user);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser(async (obj, cb) => {
  cb(null, obj);
});
