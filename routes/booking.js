const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/restaurant");

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true, min: 1 },
    tableid: { type: mongoose.Schema.Types.ObjectId, ref: 'Table'},
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
});

module.exports = mongoose.model('Booking', bookingSchema);
