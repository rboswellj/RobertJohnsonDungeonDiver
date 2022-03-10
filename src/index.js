
import game from './js/levelOne';


const apiBaseUrl = 'http://localhost:5000/api';
const request = require('request');

const getData = (req, res) => {
    request.get(apiBaseUrl, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            var locals = JSON.parse(body);
            console.log(locals);
        }
    });
}

let gameUI = document.getElementById('gameUI');
let playerStats = document.getElementById('playerStats');
let leaderBoards = document.getElementById('leaderBoard');

let keyDiv = document.createElement('div');
let keyImage = 'src/assets/key.png';
keyDiv.innerHTML = `<span class="uiLabel">Keys:</span> ${ game.getKeyCount || 0 }`;
gameUI.appendChild(keyDiv);
