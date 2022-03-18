import game from './js/levelOne';
import axios from 'axios';
import {findUser, findTopUserTime} from './js/apiRoutes';

const stateEvent = new CustomEvent('stateChanged', )

let currentUserName = 'jstarr';
// const getCurrentUser = async (currentUser) => {
//     const user = await apiRoute.findUser(currentUser);
//     return user;
// }
let currentUserInfo = findUser(currentUserName).then(response => {
    // console.log(response);
    let data = {
        id: response.data.id,
        name: response.data.name,
        userId: response.data.userId,
        highestLevelComplete: response.data.highestLevelComplete,
        level1: { topTime: response.data["level1"].topTime, deaths: response.data.level1.deaths },
        level3: { topTime: response.data["level2"].topTime, deaths: response.data.level1.deaths },
    }
    let statsDiv = document.getElementById("playerStats");
    let level1Stats = document.createElement("div");
    level1Stats.innerHTML = `
    <h4>Level One Stats for ${data.name}</h4>
    <ul>
        <li>Highest Score: </li>
        <li>Lowest Time: ${data.level1.topTime}</li>
        <li>Deaths: ${data.level1.deaths}</li>
    </ul>
    `;
    statsDiv.appendChild(level1Stats);

})
.catch(error => console.log(error));
// let currentUserInfo = findUser(currentUserName);

// findUser(currentUserName).then((result) => {
//     console.log(result.data);
//     return result.data.data;    
// });

// let currentUserInfo = {};
// export const retrieveUser = (data) =>{
//     currentUserInfo = data;
// }

console.log(`find user function`);
setTimeout(() => console.log(currentUserInfo),2000);
console.log(findTopUserTime(currentUserName, 'level1'));

let gameUI = document.getElementById('gameUI');
let playerStats = document.getElementById('playerStats');
let leaderBoards = document.getElementById('leaderBoard');

let keyDiv = document.createElement('div');
gameUI.appendChild(keyDiv);

export function printKeys(keys) {
    keyDiv.innerHTML = `Keys: `
    let keyImage = `<img src="src/assets/key.png" height="20px" width="20px">`;
    for (let i=0; i < keys; i++) {
        keyDiv.innerHTML += keyImage;
    }
}




