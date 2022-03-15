import game from './js/levelOne';
import {findTopUserTime} from './js/apiRoutes';

let currentUserName = 'jstarr';
// const getCurrentUser = async (currentUser) => {
//     const user = await apiRoute.findUser(currentUser);
//     return user;
// }
let currentUserInfo = apiRoute.findUser(currentUserName);

console.log(currentUserInfo);
console.log(findTopUserTime(currentUserName, 'level1'));

let gameUI = document.getElementById('gameUI');
let playerStats = document.getElementById('playerStats');
let leaderBoards = document.getElementById('leaderBoard');

let keyDiv = document.createElement('div');
let keyImage = 'src/assets/key.png';
keyDiv.innerHTML = `<span class="uiLabel">Keys:</span> ${
  game.getKeyCount || 0
}`;
gameUI.appendChild(keyDiv);

