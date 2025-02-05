const express = require('express');
const app = express();
const userModel = require("./models/user");
const Match = require("./models/GameDetails"); // Import Match Details Schema
const cookieParser = require('cookie-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const Bowler = require("./models/bowler");
const Batsman = require("./models/batsmanModel");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.get('/', (req, res) => {
    console.log("hey");
    res.render("index");
});
// app.get('/liveScores', isLoggedIn, async (req, res) => {
// let user = await userModel.findOne({email: req.user.email})
// console.log(user);
// //res.render("liverscores", {user});
// });
app.get('/loginpage', (req, res) => {
    res.render('login.ejs'); // Renders login.ejs
});
app.post('/loginpage', (req, res) => {
    res.render('login.ejs'); // Renders login.ejs
});
app.post('/register', async (req, res) => {
     let {username, email, password  } = req.body;
   let user = await userModel.findOne({email})
   if(user) return res.status(500).send({message: "user already exists"})
bcrypt.genSalt(10,(err, salt) => {
bcrypt.hash(password, salt, async (err, hash) => {
   let user = await userModel.create({
        username,
        email,
        password: hash
    });
   let token = jwt.sign({email: email, userid: user._id}, "shhhh");
   res.cookie("token", token);
   res.send("registered");
})
});
})
app.post('/logining', async (req, res) => {
    console.log("he");
    let {email, password} = req.body;
    let user = await userModel.findOne({email});
    
    // Check if user exists
    if (!user) return res.status(404).send("User  not found");

    // Compare password
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) return res.status(500).send("Error comparing passwords");
        if (result) {
            
            let token = jwt.sign({email: email, userid: user._id}, "shhhh");
   res.cookie("token", token);
   res.redirect('/');      //res.status(200).send("You can login");
        } else {
            res.status(401).send("Incorrect password");
        }
    });
});
app.get('/logout', (req,res) => {
res.cookie("token", "");
res.redirect('/loginpage');
});

function isLoggedIn(req, res, next){
    if(req.cookies.token === "") res.send("you must be logged in");// when verified after checcking orther things res.redirect('/loginpage');
    else{
        let data = jwt.verify(req.cookies.token, "shhhh");
        req.user = data;
        next();
    }
    
}

app.get('/matchDetails', isLoggedIn, (req, res) => {
    res.render('matchDetails.ejs');
});
app.get('/liveScores', isLoggedIn, async (req,res) => {
    // let allBowlers = await Bowler.find();
    // res.render("topWicketTaker.ejs", {allBowlers});
    try {
        // Fetch the top 100 bowlers sorted by wickets in descending order
        
        let liveMatches = await Match.find({ status: "Live" });
        // Render the EJS template with the sorted bowlers
        res.render("liveMatches.ejs", { liveMatches });
    } catch (error) {
        console.error('Error fetching live Matches:', error);
        res.status(500).send("An error occurred while fetching the live Matches.");
    }
    
    });
// Save Game Details Route
app.post('/saveGameDetails', async (req, res) => {
    try {
        console.log(req.body); // Debug: Log the form data
        const {
            hostTeam: teamA,
            visitor: teamB,
            radio: tossWonBy,
            batBowl: optedTo,
            overs
        } = req.body;
        
        const gameDetails = new Match({ teamA, teamB, tossWonBy, optedTo, overs });
        const savedMatch =  await gameDetails.save();
        // res.status(201).json({ message: 'Game details saved successfully!' });
        // Redirect to nextpage.ejs after saving
        // Redirect to nextpage with match ID
       
        res.redirect(`/nextpage?matchId=${savedMatch._id}`); // Now savedMatch is correctly defined
        // res.redirect('/nextpage');
    } catch (error) {
        console.error(error);
         res.status(500).json({ message: 'Error saving game details', error });
        
    }
});
// Route to render nextpage.ejs
// app.get('/nextpage', isLoggedIn, (req, res) => {
//     res.render('nextpage.ejs'); // Ensure this file exists in your views directory
// });
app.get('/nextpage', (req, res) => {
    const matchId = req.query.matchId;

    // Render the intermediate page
    res.render('nextpage.ejs', { matchId });
});
// app.get('/scorecard', isLoggedIn, (req, res) => {
//     res.render('scorecard.ejs');
// });
app.get('/scorecard/:id', async (req, res) => {
    try {
        const matchId = req.params.id;

        // Fetch match details from the database
        const matchDetails = await Match.findById(matchId);
        if (!matchDetails) {
            return res.status(404).json({ message: 'Match not found' });
        }

        // Render the scorecard page
        res.render('scorecard.ejs', { matchDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching match details', error });
    }
});
app.get('/changeBowler', isLoggedIn, (req, res) =>{
res.render('changeBowler.ejs');
});
app.get('/FallOfWicket', isLoggedIn, (req, res) =>{
res.render('FallOfWicket.ejs');
});

// Save bowler data
// app.post('/api/bowler', async (req, res) => {
//     const { name, runs, overs, maidens, wickets } = req.body;

//     try {
//         let bowler = await Bowler.findOne({ name });
//         if (bowler) {
//             // Update existing bowler stats
//             bowler.runs += runs;
//             bowler.overs += overs;
//             bowler.maidens += maidens;
//             bowler.wickets += wickets;
//         } else {
//             // Create new bowler record
//             bowler = new Bowler({ name, runs, overs, maidens, wickets });
//         }
//         await bowler.save();
//         res.status(200).send('Bowler data saved successfully!');
//     } catch (err) {
//         res.status(500).send('Error saving data');
//     }
// });
// Save bowler data directly in app.post
app.post('/api/bowler', async (req, res) => {
    const { name, runs, overs, maidens, wickets } = req.body;

    try {
        let bowler = await Bowler.findOne({ name });

        if (bowler) {
            // Update existing bowler stats
            bowler.runs += runs;
            bowler.overs += overs;
            bowler.maidens += maidens;
            bowler.wickets += wickets;
        } else {
            // Create new bowler record
            bowler = new Bowler({ name, runs, overs, maidens, wickets });
        }

        await bowler.save();
        res.status(200).json({ message: 'Bowler data saved successfully!' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
});

// Save batsman data directly in app.post
app.post('/api/batsman', async (req, res) => {
    const { name, runs, balls, howOut } = req.body;

    try {
        let batsman = await Batsman.findOne({ name });

        if (batsman) {
            // Update existing batsman stats
            batsman.runs += runs;
            batsman.balls += balls;
            batsman.howOut = howOut; // Overwrite the dismissal method
        } else {
            // Create new batsman record
            batsman = new Batsman({ name, runs, balls, howOut });
        }

        await batsman.save();
        res.status(200).json({ message: 'Batsman data saved successfully!', batsman });
    } catch (error) {
        console.error('Error saving batsman data:', error);
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
});
app.get('/topWicketTakers', isLoggedIn, async(req, res) => {
     
    // let allBowlers = await Bowler.find();
    // res.render("topWicketTaker.ejs", {allBowlers});
    try {
        // Fetch the top 100 bowlers sorted by wickets in descending order
        let allBowlers = await Bowler.find().sort({ wickets: -1 }).limit(100);
        
        // Render the EJS template with the sorted bowlers
        res.render("topWicketTaker.ejs", { allBowlers });
    } catch (error) {
        console.error('Error fetching bowlers:', error);
        res.status(500).send("An error occurred while fetching the top wicket takers.");
    }
});

app.get('/topRunsScorers', isLoggedIn, async(req, res) => {
    try {
        // Fetch the top 100 batsman sorted by runns in descending order
        let allBatsmans = await Batsman.find().sort({ runs: -1 }).limit(100);
        
        // Render the EJS template with the sorted bowlers
        res.render("topRunScorer.ejs", { allBatsmans });
    } catch (error) {
        console.error('Error fetching batsmans:', error);
        res.status(500).send("An error occurred while fetching the top run scorers.");
    }
});
app.post('/saveBallDetails', async (req, res) => {
    try {
        const { matchId, team, score, wickets, overs } = req.body;

        console.log(`Request received at /saveBallDetails`);
        console.log(`Received for match ${matchId}: team = ${team}, score = ${score}, wickets = ${wickets}`);

        // Find the match by matchId
        const match = await Match.findById(matchId);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }

        // Dynamically check the team and update the score and wickets
        if (team === match.teamA) {
            // match.score[match.teamA] = score;  // Update the score for the specified team
            // match.wickets[match.teamA] = wickets;  // Update the wickets for the specified team
            match.teamAruns = score;
            match.teamAwickets = wickets;
        } else if(team === match.teamB){
        //  match.score[match.teamA] = score;  // Update the score for the specified team
        //     match.wickets[match.teamA] = wickets;  // Update the wickets for the specified team
            match.teamBruns = score;
            match.teamBwickets = wickets;
        }
        
        else {
            return res.status(400).json({ message: `Invalid team: ${team}` });
        }

        // Update the current over (you might need to handle overs more precisely)
        match.currentOver = overs;  // Update current over (could be formatted like '12.4')
// Update the match status to "Live" if it is not already
if (match.status !== 'Live') {
    match.status = 'Live';
}
        // Save the updated match data
        await match.save();

        // Send success response
        res.json({ message: 'Ball details saved successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving ball details', error });
    }
});
app.get('/footBall', (req, res) => {
    // Render the intermediate page
    res.render('footBall.ejs');
});


app.listen(3000, () => {
    console.log("server is running on port 3000");
});  