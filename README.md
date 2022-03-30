# RobertJohnsonDungeonDiver

Created by Robert Johnson

A Dungeon crawl game built with Phaser.
Connects to an API that holds score data for the game.
Scores are updated for each user.
User authentication is accomplished through http calls to the API,
The API has a connection to a Mongo DB which holds the account information.

Requirements to Run:
Node
local MongoDB
A separate repo containing the API will also need to be running.

The application makes calls to my backend API which is held in a separate repository.
Located at https://github.com/rboswellj/RobertJohnsonDungeonDiverApi
By default this app runs on port 8080 API runs on port 5000 of localhost
If the person running this needs to change these ports they will need to change the variables
const apiBaseUrl = 'http://localhost:5000/api';
const apiLoginBase = 'http://localhost:5000/auth';
which are located in ./src/js/apiRoutes.js at the top

In the API the port can be changed by setting the variable 
const expressPort = '5000';
in the index.js files

The Api also requires a Mongo DB to be installed and run on port 27017, or there is a config file located at ./src/config.js
The DB address can be changed here. Mongo should contain a DB called "Dungeon-Diver" with a collection called "users".
This shouldn't really require any initial data. The DB is currently only used to store the username and an encrypted password
for new user accounts. All other data is public and stored on the API as a JSON file.


Frontend:
This repo contains the front end application which uses Webpack.

I built the game using the Phaser 3 JS library.
The levels are based on a tilemap png file, the tiles are split into 16px x 16px chunks.
The tiles placement is handles by a JSON file which contains coordinates for the placement.
All data is passed by axios calls from the front end to the backend and vice versa.

The game is simple, you just need to get to the stairs in as little time as possible.
Players are ranked based on who gets there the fastest. Ideally there will be at least 3 levels
by the time I turn this project in, depending on how long all of the backend communication and
authorization takes to get set up.

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
    
    




