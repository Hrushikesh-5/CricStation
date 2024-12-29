const mongoose = require('mongoose');

// Define the schema for a bowler
const bowlerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    runs: { type: Number, default: 0 },
    overs: { type: Number, default: 0 },
    maidens: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
});

// Create a Mongoose model using the schema
const Bowler = mongoose.model('bowler', bowlerSchema);

// Export the model
module.exports = Bowler;