
const mongoose = require('mongoose');

const batsmanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    runs: { type: Number, default: 0 },
    balls: { type: Number, default: 0 },
    howOut: { type: String, default: null },
});

module.exports = mongoose.model('Batsman', batsmanSchema);