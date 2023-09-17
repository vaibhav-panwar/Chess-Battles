require("dotenv").config()
const { v4: uuidv4 } = require('uuid');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport")

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // we get email here so what we want we do
    const email=profile._json.email;
    const user={
        email,
        password:uuidv4()
    }
    return cb(null, user);
  }
));

module.exports={passport}