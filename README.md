# RobertJohnsonDungeonDiver

A Dungeon crawl game built with Phaser.
Connects to an API that holds score data for the game.
Scores are updated for each user.

Each time a level is complete the score will be checked against both the user's past scores, as well as a ranking for each level and where they will be ranked against all other users.

Implements a user login system to store past attempts and scores, as well as maintain game state for return visits.

Both the project directory and the api directory should just require an "npm install" command followed by an "npm start" to get the servers up and running.

Uses the packages Phaser, and Axios primarily. May implement some others to maintain game state as well as updates. May also implement Vue or react to maintain a virtual dom to make updates a bit easier as the game state changes.