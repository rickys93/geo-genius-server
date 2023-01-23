// describes the server/API
const express = require("express"); // access to express library
const cors = require("cors");
const { json } = require("express");

const logger = require("./logger");
let userProfile = require("./database/user-profile.js");
let funFacts = require("./database/fun-facts.js");
let flagFacts = require("./database/flag-facts.js");

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
            message: "body must include either name or points key",
        });
    }
    res.status(200).json(userProfile);
});

// GET random fun fact endpoint
app.get("/fun-facts", (req, res) => {
    res.json(funFacts);
});

app.get("/fun-facts/random", (req, res) => {
    //generate random ID from IDs available
    const randomId = Math.floor(Math.random() * funFacts.length);
    //fact with the random ID
    const randomFact = funFacts[randomId];
    res.json(randomFact);
});

//GET request for random flag and fact
app.get("/flag-facts", (req, res) => {
    res.json(flagFacts);
});

app.get("/flag-facts/random", (req, res) => {
    //generate random ID from IDs available
    const randomId = Math.floor(Math.random() * flagFacts.length);
    //fact with the random ID
    const randomFlag = flagFacts[randomId];
    res.json(randomFlag);
});

module.exports = app; // makes the server available to other files
