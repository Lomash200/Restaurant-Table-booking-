const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/restaurant");

const tableSchema = new mongoose.Schema({
    tableid: { type: String, required: true },
    bookedby: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking'},
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    capacity: { type: Number, required: true, min: 1 },
    availability: { type: Boolean, default: true},
});

module.exports = mongoose.model('Table', tableSchema);