
import game from './js/levelOne';

let gameUI = document.getElementById('gameUI');
let playerStats = document.getElementById('playerStats');
let leaderBoards = document.getElementById('leaderBoard');

let keyDiv = document.createElement('div');
let keyImage = 'src/assets/key.png';
keyDiv.innerHTML = `<span class="uiLabel">Keys:</span> ${ game.getKeyCount || 0 }`;
gameUI.appendChild(keyDiv);
