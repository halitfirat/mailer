const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  username: String
});

mongoose.model('users', userSchema);
