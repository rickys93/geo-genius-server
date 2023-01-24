// describes the server/API
const express = require("express"); // access to express library
const cors = require("cors");
const { json } = require("express");

const logger = require("./logger");
let userProfile = require("./database/userProfile.js");
let funFacts = require("./database/funFacts.js");
let flags = require("./database/flags.js");
let countries = require("./database/countries.js");

const app = express(); // make very basic server using express

// MIDDLEWARE

// req -> [cors (add header to response)] -> [API] -> response
// req -> [auth (check the req headers for a key)] -> [API] -> response
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

module.exports = app; // makes the server available to other files
