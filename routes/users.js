const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/restaurant");
const plm = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  fullname: { type: String},
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String},
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});
userSchema.plugin(plm);
module.exports = mongoose.model('Users', userSchema);


