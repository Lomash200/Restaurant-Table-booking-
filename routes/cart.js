const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/restaurant");

const cartSchema = new mongoose.Schema({
    tableid: { type: mongoose.Schema.Types.ObjectId, ref: 'Table'},
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    neworder: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Menu'
    }],

    allorder: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Menu'
    }],
});

module.exports = mongoose.model('Cart', cartSchema);