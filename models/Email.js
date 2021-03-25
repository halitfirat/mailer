const mongoose = require('mongoose');
const { Schema } = mongoose;

const emailSchema = new Schema({
  sent: Date,
  replyTo: String,
  to: String,
  subject: String,
  text: String,
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('emails', emailSchema);
