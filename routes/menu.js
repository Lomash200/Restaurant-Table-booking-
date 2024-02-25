const mongoose = require('mongoose');
const { array } = require('./multer');
mongoose.connect("mongodb://127.0.0.1:27017/restaurant");

const menuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  caption: { type: String, required: true },
  image: { type: String },
  category: { type: String},
  price: {type: Number},
  menuOfWeek: { type: Boolean, default: false }
}); 

module.exports = mongoose.model('Menu', menuSchema);


