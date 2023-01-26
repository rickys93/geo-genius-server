# GeoGenius Server
The GeoGenius server is a simple backend built using JavaScript and the Express.js framework. It supports a simple database of JSON files that includes data on countries, flags, fun facts, leaderboards, ranks, user profiles, and users.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Technologies
JavaScript
Express.js
JSON

### Prerequisites
- Node.js
- npm
- git

### Installation & Usage
1. Open up a terminal, navigate to desired directory location.
2. Clone the repository to your local machine, command: `git clone https://github.com/rickys93/geo-genius-server`
3. Navigate to the server directory of the project and run `npm install` to install the necessary dependencies
4. Run `npm start` to start the server (`npm run dev` to start development environment)
5. Open a web browser and navigate to http://localhost:3000 to view the server

## Routes
The server provides the following routes for retrieving and creating quotes:

- GET /user - get current user
- PUT /user - update current user
- POST /user/addscore - add score to current user
- GET /users - get all users
- GET users/:user - get a particular user
- POST /users - add new user
- GET /fun-facts - get all fun facts
- GET /fun-facts/random - get random fun fact
- GET /flag-facts - get all flag facts
- GET /countries - get all country facts
- GET /country-facts - get random country fact
- GET /country-facts/:id - get random random answers including one correct answer for country with id
- GET /leaderboards - get all leaderboards
- GET /leaderboards/:gameName - get leaderboard named gameName
- GET /ranks - get all rank data
- GET /ranks/:name - get rank data with name

## Process 
The GeoGenius server was developed as part of the GeoGenius project. The goal was to create a simple backend that could support the interactive and educational features of the client application.

The development process began with a brainstorming session to identify the key features and functionality of the server. The team then broke down the project into smaller, manageable tasks and assigned them to individual team members. The team used Agile methodologies, including daily stand-up meetings, to track progress and ensure that the project stayed on schedule.

The server was built using JavaScript and the Express.js framework. The team chose these technologies because of their simplicity, ease of use and the fact that JavaScript is the language of the client app. A simple database was created using JSON files that includes data on countries, flags, fun facts, leaderboards, ranks, user profiles, and users.

During the development process, the team did not have time to implement a proper testing and debugging process. The team focused on building the server and connecting it to the client app.

Overall, the GeoGenius server was a success, and seems to be close to the initial specification. The team learned a lot about the development process and Agile methodologies, as well as becoming more familiar with git push, git pull and git branching.

## Future Features
- A more secure and robust login system that allows for different user sessions and better password encryption.
- The replacement of the simple JSON file database with an actual database. This will allow for better scalability and data management.
- Re-formatting of the data files to improve data organization, consistency, and maintainability.
- Adding more endpoints for more functionality like adding a feature to allow admin to add new countries,fun facts and flags etc
- Implementing increased error handling and input validation to improve the stability and security of the server.
- Adding support for pagination in the GET requests to return data in chunks.

## Licence
This project is licensed under the MIT License. See the LICENSE file for details.