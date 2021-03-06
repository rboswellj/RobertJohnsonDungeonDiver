# RobertJohnsonDungeonDiver

Created by Robert Johnson

A Dungeon crawl game built with Phaser.
Connects to an API that holds score data for the game.
Scores are updated for each user.
User authentication is accomplished through http calls to the API,
The API has a connection to a Mongo DB which holds the account information.

Frontend:
https://github.com/rboswellj/RobertJohnsonDungeonDiver
Backend:
https://github.com/rboswellj/RobertJohnsonDungeonDiverApi

This repo contains the front end application which uses Webpack.

I built the game using the Phaser 3 JS library.
The levels are based on a tilemap png file, the tiles are split into 16px x 16px chunks.
The tiles placement is handles by a JSON file which contains coordinates for the placement.
All data is passed by axios calls from the front end to the backend and vice versa.

The game is simple, you just need to get to the stairs in as little time as possible.
Players are ranked based on who gets there the fastest. Ideally there will be at least 3 levels
by the time I turn this project in, depending on how long all of the backend communication and
authorization takes to get set up.

TO RUN:
I have set up the API on Heroku, so the app will now function without running the DB or the server. 
You just need to run
npm install 
on this repo, and then 
npm start.
then site should be available at http://localhost:8080

The create account and login/logout options should function as expected using the
heroku repo, you do not need to run the api repo locally.



Project Requirements Met:
    1. Read and pars an external file
        The core of my API is based around a JSON file that serves as a database for storing user scores from the game.
        The file is parsed and written to inside of the ./repos/scoreRepo.js file in the API repo
    2. Retrieve data from external API
        The App repo retrieves and writes data to and from my external API via axios calls. These calls can be seen
        in the ./src/js/apiRoutes.js file in the application repo.
    3. Post to external API and show that it has saved/persisted
        This is handled the same way as the retrieval, through axios calls, found in the same ./src/js/apiRoutes.js file
    4. Create and use a function that accepts two or more parameters
        I have done this many times. Basically every operation is a function or a class method.
    5. Create a form and save the values
        The login form writes the username and an encrypted password to the database when the "Create Account" button
        is pressed. It is also used to retrieve a login token when the "login" button is pressed, if the user and password
        match what is in the database.
    6. Calculate and Display Data Based on an external factor
        The running from the time the start button is pressed to the time the goal is reached is calculated. It is then
        compared to the user's previous speed record and if it is faster, the record is updated for the user. The top 
        speeds for all user's are also ranked in a leader board.
    7. Create an array, dictionary or list, populate it with multiple value
        The leader board is made up of an array. Each time the function rankUsers() is called from the index.js file in the app
        it pulls in a complete list of all the user's stored in the json file on the api and pushes their names and top times to
        an array. This array is then sorted from lowest time to highest and the result is inserted into an ordered list that makes
        up the leader board.
    8. Create a Web Server with at least one route.
        The Api backend.
    

Requirements to Run all locally:
Node
local MongoDB
A separate repo containing the API will also need to be running.

I included some installation instructions for MongoDb in the readme
for the Api repo.

The application makes calls to my backend API which is held in a separate repository.

The Api also requires a Mongo DB to be installed and running, 
Mongo should contain a DB called "Dungeon-Diver" with a collection called "users".
This shouldn't require any initial data. 
The DB is currently only used to store the username and an encrypted password.
for new user accounts. All other data is public and stored on the API as a JSON file.

If you have the MongoDB running on the correct ports, you should just need to open the two node projects and
enter "npm install" on each of them. 
Then you should just need to run "npm start" on each and their respective servers should start up.

I've set these ports in a config.js file in the source folder of both repos if you need to change them.

API http://localhost:5000/
App http://localhost:8080/
DB http://localhost:27017
    




