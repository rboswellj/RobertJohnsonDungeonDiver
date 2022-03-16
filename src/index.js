import game from './js/levelOne';
import {findUser, findTopUserTime} from './js/apiRoutes';

const stateEvent = new CustomEvent('stateChanged', )

let currentUserName = 'alsmit';
// const getCurrentUser = async (currentUser) => {
//     const user = await apiRoute.findUser(currentUser);
//     return user;
// }
let currentUserInfo = findUser(currentUserName);

console.log(currentUserInfo);
console.log(findTopUserTime(currentUserName, 'level1'));

let gameUI = document.getElementById('gameUI');
let playerStats = document.getElementById('playerStats');
let leaderBoards = document.getElementById('leaderBoard');

let keyDiv = document.createElement('div');
let keyImage = 'src/assets/key.png';
keyDiv.innerHTML = `<h3>keys: ${keyCount || 0}</h3>`;

gameUI.appendChild(keyDiv);

