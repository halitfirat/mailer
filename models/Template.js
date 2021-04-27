const mongoose = require('mongoose');
const { Schema } = mongoose;

const templateSchema = new Schema({
  replyTo: String,
  to: String,
  subject: String,
  text: String,
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('templates', templateSchema);
