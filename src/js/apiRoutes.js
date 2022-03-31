const axios = require('axios');
import { authedUser, currentUserName, globalTopTime } from '../index';
import { config } from '../config';

const apiPort = config.apiServerPort;

// const apiBaseUrl = `http://localhost:${apiPort}/api`;
const apiBaseUrl = `${config.apiUrl}/api`;
const apiLoginBase = `${config.apiUrl}/auth`;

export let levelCompleteMsg = [];
export let timeIsBetter = false;

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/users`);
    return response.data;
  } catch (err) {
    console.error('getAllUsers route');
    console.error(err);
  }
};

// Authorization and accounts

export async function loginUser(userId, password) {
  try {
    let loginObject = {
      userId: userId,
      password: password,
    };
    const token = await axios.post(`${apiLoginBase}/login`, loginObject);
    // console.log(token.data.token);
    try {
      const response = await axios.get(`${apiLoginBase}/me`, {
        headers: {
          token: token.data.token,
        },
      });
      // console.log(response.data);
      authedUser(response.data.userId);

      const session = await setSession(userId, token.data.token);
    } catch (err) {
      console.error('loginUser - exchange token route');
      console.error(err);
    }
  } catch (err) {
    console.error('loginUser get token route');
    console.error(err);
    document.getElementById('loginMessage').innerHTML =
      'invalid Login or Password';
  }
}

// Deals with maintaining login sessions
export async function setSession(userId, token) {
  try {
    let response = await axios.get(
      `${apiLoginBase}/set-session?userId=${userId}`
    );
    // console.log(response.data);
  } catch (err) {
    console.error('setSession, apiRoutes, line 55');
    console.error(error);
  }
}

export async function getSession() {
  try {
    let response = await axios.get(`${apiLoginBase}/get-session`);
    // console.log(response.data);
  } catch (err) {
    console.error('getSession apiRoutes, line 64');
    console.error(err);
  }
}

export async function signupUser(userId, password) {
  try {
    let signupObject = {
      userId: userId,
      password: password,
    };
    let token = await axios.post(`${apiLoginBase}/signup`, signupObject);
    console.log(token);
    console.log(token.data.token);
    try {
      const response = await axios.get(`${apiLoginBase}/me`, {
        headers: {
          token: token.data.token,
        },
      });
      console.log(response.data);
      authedUser(response.data.userId);
    } catch (err) {
      console.error('signupUser - exchange token route');
      console.error(err);
    }
  } catch (err) {
    console.error('signupUser get token route');
    console.error(err);
    document.getElementById('loginMessage').innerHTML = 'login in use';
  }
}

// User score info

export const getUser = async (user) => {
  try {
      if(currentUserName) {
          const response = await axios.get(`${apiBaseUrl}/user/${user}`);
          return response.data;
      }
  } catch (err) {
    console.error('getUser route');
    console.error(err);
  }
};

export const getUserTopTime = async (user, level) => {
  try {
      if(currentUserName) {
          const response = await getUser(user);
          return response.data['level1'].topTime;
      }
  } catch (err) {
    console.error('getUserTopTime route');
    console.error(err);
  }
};

export const getUserRankings = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/users`);
    return response.data;
  } catch (err) {
    console.error('getUserRankings route');
    console.error(err);
  }
};

export async function addNewUser(user, levelName, time, deaths) {
  try {
    let response = await axios.post(`${apiBaseUrl}/users/new`, {
      userId: user,
      highestLevelComplete: levelName,
      level1: { topTime: time, deaths: deaths },
    });
  } catch (err) {
    console.error('addNewUser apiroutes 111');
    console.error(err);
  }
}

export async function updateTopTime(user, levelName, time, deaths) {
  try {
    if (user) {
      const topTime = parseFloat(await getUserTopTime(user, levelName));
      if (topTime) {
        try {
          parseFloat(time, time);
        } catch (err) {
          console.error('updateTopTime parseFloat');
          console.error(err);
        }
        levelCompleteMsg = [`${time}`, `${topTime}`];
        if (time < topTime) {
          timeIsBetter = true;
          console.log(levelCompleteMsg);
          try {
            await axios.put(`${apiBaseUrl}/user/${user}`, {
              level1: { topTime: time, deaths: deaths },
            });
          } catch (err) {
            console.error('updateTopTime patch operation');
            console.error(err);
          }
          // console.log('top time updated');
        } else {
          // console.log(`${time} is not better than top time ${topTime}`);
          timeIsBetter = false;
        }
      } else {
        // console.log(`No time found for user. Updating Top Time to ${time}`);
        levelCompleteMsg = [`${time}`];
        try {
          await addNewUser(user, levelName, time, deaths);
        } catch (err) {
          console.error(err);
        }
      }
    } else {
        // console.log("No user signed in");
    }
  } catch (err) {
    console.error(err);
  }
}
