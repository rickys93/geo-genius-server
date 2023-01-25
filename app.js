// describes the server/API
const express = require("express"); // access to express library
const cors = require("cors");
const { json } = require("express");

const logger = require("./logger");
let userProfile = require("./database/userProfile");
let users = require("./database/users");
let funFacts = require("./database/funFacts");
let flags = require("./database/flags");
let countries = require("./database/countries");
let ranks = require("./database/ranks");
let {
    flagFrenzyLeaderboard,
    countryQuizLeaderboard,
} = require("./database/leaderboards");

const app = express(); // make very basic server using express

// MIDDLEWARE

app.use(express.json()); // Layer to read the body of POSTs
app.use(cors()); // Layer to add CORS headers
app.use(logger); // Layer to log access

// ENDPOINTS

// Tell the app what kind of requests to listen for (and how to handle them)
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Geo Genius API!",
    });
});

// User endpoints
app.get("/user", (req, res) => {
    if (!userProfile) {
        json.status(404).json({
            message: "userProfile not found",
        });
        return;
    }
    res.json(userProfile);
});

app.put("/user", (req, res) => {
    const updates = req.body;

    let changesMade = false;

    for (key in updates) {
        if (key in userProfile) {
            userProfile[key] = updates[key];
            changesMade = true;
        }
    }

    if (!changesMade) {
        res.status(400).json({
            message: "Body must include either name or points key",
        });
        return;
    }
    res.status(200).json(userProfile);
});

app.post("/user/addscore", (req, res) => {
    const updates = req.body;

    if (!updates.score) {
        res.status(400).json({
            message: "Score not included in body",
        });
        return;
    }
    if (typeof updates.score !== "number") {
        res.status(400).json({
            message: "Score value not of type number",
        });
        return;
    }

    userProfile.points += updates.score;
    res.status(200).json({
        message: "Score added successfully!",
        points: userProfile.points,
    });
});

// Get all users list
app.get("/users", (req, res) => {
    console.log(users);

    if (!users) {
        res.status(404).json({
            message: "Users database not found!",
        });
    }

    res.status(200).json(users);
});

// Get userprofile for a username
app.get("/users/:username", (req, res) => {
    const username = req.params.username;
    console.log(username);

    const user = users.filter(
        (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (user.length === 0) {
        res.status(404).json({
            message: `User ${username} not found!`,
        });
        return;
    }

    res.status(200).json(user[0]);
});

// Add a new user
app.post("/users", (req, res) => {
    const newUser = req.body;
    console.log(newUser);

    if (!newUser.username) {
        res.status(400).json({
            message: "Username not included in body",
        });
        return;
    }

    const usernameTaken = users.filter(
        (user) => user.username.toLowerCase() === newUser.username.toLowerCase()
    );

    if (usernameTaken.length > 0) {
        res.status(409).json({
            message: `Username ${newUser.username} already taken.`,
        });
    }
    newUser.points = 0;

    users.push(newUser);
    res.status(200).json({
        message: "User added successfully!",
        newUser,
    });
});

// GET random fun fact endpoint
app.get("/fun-facts", (req, res) => {
    if (!funFacts) {
        json.status(404).json({
            messsage: "No funFacts database file found.",
        });
        return;
    }
    res.status(200).json(funFacts);
});

app.get("/fun-facts/random", (req, res) => {
    if (funFacts.length === 0) {
        res.status(404).json({
            message: "No items found in funFacts database file",
        });
        return;
    }
    //generate random ID from IDs available
    const randomId = Math.floor(Math.random() * funFacts.length);
    //fact with the random ID
    const randomFact = funFacts[randomId];
    res.status(200).json(randomFact);
});

//GET request for random flag and fact
app.get("/flag-facts", (req, res) => {
    if (!flags) {
        json.status(404).json({
            messsage: "No flags database file found.",
        });
        return;
    }
    res.status(200).json(flags);
});

app.get("/flag-facts/random", (req, res) => {
    if (flags.length === 0) {
        res.status(404).json({
            message: "No items found in funFacts database file",
        });
        return;
    }
    //generate random ID from IDs available
    const randomId = Math.floor(Math.random() * flags.length);
    //fact with the random ID
    const randomFlag = flags[randomId];
    res.status(200).json(randomFlag);
});

//countryfacts
app.get("/countries", (req, res) => {
    if (!countries) {
        json.status(404).json({
            messsage: "No countries database file found.",
        });
        return;
    }
    res.status(200).json(countries);
});

app.get("/country-facts", (req, res) => {
    if (countries.length === 0) {
        res.status(404).json({
            message: "No items found in funFacts database file",
        });
        return;
    }
    //generate random ID from IDs available
    const randomId = Math.floor(Math.random() * countries.length);
    //fact with the random ID
    const randomFlag = countries[randomId];
    res.status(200).json(randomFlag);
});

// Endpoint returns up to 3 random answers and the correct answer in random order
app.get("/country-facts/:id", (req, res) => {
    const countryId = req.params.id;

    if (countryId >= countries.length) {
        res.status(404).json({
            message: `ID ${countryId} not found in database`,
        });
        return;
    }

    // for each category get a list of answers in random order, with one being correct
    let answers = {};
    for (category of Object.keys(countries[0])) {
        categoryAnswers = getAnswersFor(category, countryId);
        answers[category] = categoryAnswers;
    }

    res.status(200).json(answers);
});

function getAnswersFor(category, countryId) {
    // error handle if category not found in database
    if (!category in countries) {
        return;
    }

    // For some categories, an answer can appear more than once (eg. continent)
    let allAnswers = [];
    for (country of countries) {
        allAnswers.push(country[category]);
    }
    // This finds just the unique answers
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    let uniqueAnswers = allAnswers.filter(onlyUnique);

    // if the total possible answers is 4 or less (eg. only 2 hemispheres), just return all the answers
    if (uniqueAnswers.length <= 4) {
        // put the answers in a random order
        const shuffledAnswers = uniqueAnswers.sort(
            (a, b) => 0.5 - Math.random()
        );
        return shuffledAnswers;
    }

    // get the correct answer
    let answers = [];
    answers.push(countries[countryId][category]);

    // delete correct answer from the unique answers array
    const correctIndex = uniqueAnswers.indexOf(countries[countryId][category]);
    uniqueAnswers.splice(correctIndex, 1);

    // now get 3 random answers
    for (i = 0; i < 3; i++) {
        // gets random index and answer from unique answers
        let randomIndex = Math.floor(Math.random() * uniqueAnswers.length);
        let randomAnswer = uniqueAnswers[randomIndex];
        answers.push(randomAnswer);

        // delete the random answer so can't be selected again
        uniqueAnswers.splice(randomIndex, 1);
    }

    // put the answers in a random order
    const shuffledAnswers = answers.sort((a, b) => 0.5 - Math.random());

    return shuffledAnswers;
}

// leaderboard endpoints

// GET all leaderboard data
app.get("/leaderboards", (req, res) => {
    if (!flagFrenzyLeaderboard || !countryQuizLeaderboard) {
        res.status(404).json({
            message: "Leaderboard not found",
        });
        return;
    }

    res.status(200).json({ flagFrenzyLeaderboard, countryQuizLeaderboard });
});

// GET leaderboard data for one of the leaderboards
// options: flagfrenzy, countryquiz
app.get("/leaderboards/:name", (req, res) => {
    const name = req.params.username.toLowerCase();

    if (name !== "flagfrenzy" && name !== "countryquiz") {
        res.status(404).json({
            message: `Leaderboard ${name} not found in database`,
        });
        return;
    }
    let leaderboard = flagFrenzyLeaderboard;
    if (name === "flagfrenzy") {
        leaderboard = flagFrenzyLeaderboard;
    } else if (name === "countryquiz") {
        leaderboard = countryQuizLeaderboard;
    }

    res.status(200).json(leaderboard);
});

// POST a new leaderboard entry
app.post("/leaderboards/:name", (req, res) => {
    const name = req.params.username.toLowerCase();
    const newEntry = req.body;

    if (name !== "flagfrenzy" && name !== "countryquiz") {
        res.status(404).json({
            message: `Leaderboard ${name} not found in database`,
        });
        return;
    }

    if (!newEntry.score || !newEntry.username) {
        res.status(400).json({
            message: "Body of request needs to include score and name",
        });
        return;
    }

    if (name === "flagfrenzy") {
        flagFrenzyLeaderboard = addToDatabase(newEntry, flagFrenzyLeaderboard);
        res.status(200).json(flagFrenzyLeaderboard);
    } else if (name === "countryquiz") {
        countryQuizLeaderboard = addToDatabase(
            newEntry,
            countryQuizLeaderboard
        );
        res.status(200).json(countryQuizLeaderboard);
    }
});

// if score in top 10, add to leaderboard
function addToDatabase(newEntry, leaderboard) {
    let largerThan = leaderboard.filter(
        (entry) => entry.score > newEntry.score
    );
    let smallerThan = leaderboard.filter(
        (entry) => entry.score <= newEntry.score
    );

    // add the new entry into the correct rank
    let newLeaderboard = [];
    newLeaderboard = newLeaderboard.concat(largerThan);
    newLeaderboard = newLeaderboard.concat(newEntry);
    newLeaderboard = newLeaderboard.concat(smallerThan);
    // delete 11th entry to keep only 10
    newLeaderboard.pop();

    // make sure each entry has the correct rank
    for (const [index, entry] of newLeaderboard.entries()) {
        entry.rank = index + 1;
    }

    return newLeaderboard;
}

app.get("/ranks", (req, res) => {
    if (!ranks) {
        res.status(404).json({
            message: "Database ranks not found",
        });
        return;
    }

    res.status(200).json(ranks);
});

module.exports = app; // makes the server available to other files
