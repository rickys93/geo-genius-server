// Start the server/API

const app = require("./app");

// Set the app off listening
const portNumber = 3000;

app.listen(portNumber, () => {
    console.log(`App listening on port ${portNumber}...`);
}); // On a numbered port
