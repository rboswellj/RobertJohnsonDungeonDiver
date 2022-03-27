import game from './game/levelOne';

import {getAllUsers, getUser, loginUser, signupUser} from './js/apiRoutes';
import axios from 'axios';

const leaderBoards = document.getElementById('leaderBoard');
const boardList = document.getElementById('level1LeaderList');
const statsDiv = document.getElementById("playerStats");
const level1Stats = document.getElementById("level1Stats");

const loginDiv = document.getElementById("loginWrap");
let loginForm = document.getElementById("loginForm");


let currentUserName = '';

// updateTopTime(currentUserName, "level1", "9.001", 0);

document.getElementById("loginButton").addEventListener("click", async function(event){
    event.preventDefault();
    let loginId = loginForm.userId.value;
    let loginPass = loginForm.password.value
    console.log(`login: ${loginId} pass: ${loginPass}`);
    await loginUser(loginId, loginPass);
    // loginUser("rboswellj@gmail.com", "mypassword");
  });

  document.getElementById("createUser").addEventListener("click", async function(event){
    event.preventDefault()
    let loginId = loginForm.userId.value;
    let loginPass = loginForm.password.value
    console.log(`login: ${loginId} pass: ${loginPass}`);
    await signupUser(loginId, loginPass);
  });

export async function authedUser(userId) {
    currentUserName = userId;
    console.log(currentUserName);
    loginDiv.style.display = "none";
    await currentUserInfo(userId);
} 

export async function currentUserInfo() {
    if(currentUserName) {
        try {
            const response = await getUser(currentUserName);
            let data = response.data;
            console.log(data);
            
            level1Stats.innerHTML = `
            <h4>Level One Stats for ${data.userId}</h4>
            <ul>
                <li>Highest Score: </li>
            <li>Lowest Time: ${data.level1.topTime}</li>
            <li>Deaths: ${data.level1.deaths}</li>
            </ul>
            `;
    
        } catch(err) {
            console.error('current user info route');
            console.log(err);
        }
    } else {
        level1Stats.innerHTML = "Login or create account to see your stats";
    }
}
currentUserInfo(currentUserName);

export async function rankUsers() {
    try {
        let userArray = [];
        let users = await getAllUsers();
        for(let user of users.data){
            let data = { 
                userId: user.userId, 
                topTime: user.level1.topTime
            }
            userArray.push(data);
        }
        userArray.sort((a,b) => (parseFloat(a.topTime) > parseFloat(b.topTime)) ? 1 : ((parseFloat(b.topTime) > parseFloat(a.topTime)) ? -1 : 0))
        console.log(userArray);
        boardList.innerHTML = "";
        userArray.forEach(user => {
            boardList.innerHTML += `<li>${user.userId} : ${user.topTime}`;
        });
        

    } catch(err) {
        console.log(err);
    }
}

rankUsers();
let gameUI = document.getElementById('gameUI');

let keyDiv = document.createElement('div');
gameUI.appendChild(keyDiv);

export function printKeys(keys) {
    keyDiv.innerHTML = `Keys: `
    let keyImage = `<img src="src/assets/key.png" height="20px" width="20px">`;
    for (let i=0; i < keys; i++) {
        keyDiv.innerHTML += keyImage;
    }
}





