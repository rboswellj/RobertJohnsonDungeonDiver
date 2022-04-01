import game from './game/app.js';
import {getAllUsers, getUser, loginUser, signupUser, loginCachedUser} from './js/apiRoutes';

const leaderBoards = document.getElementById('leaderBoard');
const boardList = document.getElementById('level1LeaderList');
const statsDiv = document.getElementById("playerStats");
const level1Stats = document.getElementById("level1Stats");
const logoutButton = document.getElementById("logoutBtn");
logoutButton.style.display = "none";

const loginDiv = document.getElementById("loginWrap");
let loginForm = document.getElementById("loginForm");

let storage = localStorage;

export let globalTopTime;
export let currentUserName;

async function checkForCache() {
    let stored = storage.getItem("token");
    if(stored) {
        try {
            await loginCachedUser(stored);
        } catch(err) {
            console.error(err);
            storage.removeItem("token");
        }
    }
}
checkForCache();

// Login User Click Event
document.getElementById("loginButton").addEventListener("click", async function(event){
    event.preventDefault();
    let loginId = loginForm.userId.value;
    let loginPass = loginForm.password.value
    // console.log(`login: ${loginId} pass: ${loginPass}`);
    await loginUser(loginId, loginPass);
    // loginUser("rboswellj@gmail.com", "mypassword");
  });

// Create User Click Event
  document.getElementById("createUser").addEventListener("click", async function(event){
    event.preventDefault()
    let loginId = loginForm.userId.value;
    let loginPass = loginForm.password.value
    // console.log(`login: ${loginId} pass: ${loginPass}`);
    await signupUser(loginId, loginPass);
  });

  logoutButton.addEventListener("click", () => {
      storage.removeItem("token");
      loginDiv.style.display = "flex";
      logoutButton.style.display = "none";
      currentUserName = "";
      currentUserInfo();
  });

  // Used to return userID of authorized user from the login function in apiRoutes
export async function authedUser(userId) {
    currentUserName = userId;
    loginDiv.style.display = "none";
    logoutButton.style.display = "inline";
    await currentUserInfo(userId);
} 

// Displays the top time etc for current user when logged in
export async function currentUserInfo() {
    if(currentUserName) {
        try {
            const response = await getUser(currentUserName);
            let data = response.data;
            
            level1Stats.innerHTML = `
            <h4>Level One Stats for ${data.userId}</h4>
            <ul>
                <li>Highest Score: </li>
            <li>Lowest Time: ${data.level1.topTime}</li>
            <li>Deaths: ${data.level1.deaths}</li>
            </ul>
            `;
    
        } catch(err) {
            level1Stats.innerHTML = `No levels completed`;
            console.error('current user info route');
            console.error(err);
        }
    } else {
        level1Stats.innerHTML = "Login or create account to see your stats";
    }
}
currentUserInfo(currentUserName);

// Creates the leader board using a list of all user's with a recorded score pushed into a sorted array
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
        // console.log(userArray);
        boardList.innerHTML = "";
        userArray.forEach(user => {
            boardList.innerHTML += `<li>${user.userId} : ${user.topTime}`;
        });
        

    } catch(err) {
        console.error(err);
    }
}

rankUsers();

// Creates the div that displays currently collected keys
let gameUI = document.getElementById('gameUI');
let keyDiv = document.createElement('div');
gameUI.appendChild(keyDiv);

// called from the game to change the number of keys when one is collected or used.
export function printKeys(keys) {
    keyDiv.innerHTML = `Keys: `
    let keyImage = `<img src="src/assets/key.png" height="20px" width="20px">`;
    for (let i=0; i < keys; i++) {
        keyDiv.innerHTML += keyImage;
    }
}





