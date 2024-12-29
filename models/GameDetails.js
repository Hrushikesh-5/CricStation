// const mongoose = require('mongoose');


// const GameDetailsSchema = new mongoose.Schema({
//     teamA: String,
//     teamB: String,
//     tossWonBy: String,
//     optedTo: String,
//     overs: Number,
// });

// module.exports = mongoose.model('GameDetails', GameDetailsSchema);

const mongoose = require('mongoose');

// Match Schema
const matchSchema = new mongoose.Schema({
    teamA: { type: String, required: true },
    teamB: { type: String, required: true },
    tossWonBy: { type: String, required: true },
    optedTo: { type: String, required: true }, // "bat" or "bowl"
    overs: { type: Number, required: true }, // Total overs in the match
    teamAruns: { type: Number, default: 0},
    teamBruns: { type: Number, default: 0},
   teamAwickets: { type: Number, default: 0},
    teamBwickets: { type: Number, default: 0},
    status: { type: String, default: 'Upcoming' }, // Match status
    // wickets: {
    //     teamA: { type: Number, default: 0 }, // Wickets fallen for team A
    //     teamB: { type: Number, default: 0 }, // Wickets fallen for team B
    // },
    //  teamA: { type: Number, default: 0 }, // Runs scored by team A
       // teamB: { type: Number, default: 0 }, // Runs scored by team B
   // },
    currentOver: { type: String, default: '0.0' }, // Format: 'overs.balls'
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;