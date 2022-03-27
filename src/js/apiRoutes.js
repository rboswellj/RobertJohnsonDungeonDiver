const axios = require('axios');
import { authedUser } from '..';

const apiBaseUrl = 'http://localhost:5000/api';
const apiLoginBase = 'http://localhost:5000/auth';

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${apiBaseUrl}/users`)
        return response.data;
    } catch(err) {
        console.error('getAllUsers route');
        console.log(err);
    }
}

export async function loginUser(userId, password) {
    try {
        let loginObject = {
            userId: userId,
            password: password
        }
        const token = await axios.post(`${apiLoginBase}/login`, loginObject);
        console.log(token.data.token);
        try {
            const response = await axios.get(`${apiLoginBase}/me`, { 
                headers: {
                    "token": token.data.token
                }
            });
            console.log(response.data);
            authedUser(response.data.userId);
        } catch(err) {
            console.error('loginUser - exchange token route');
            console.error(err);
            
        }
    } catch(err) {
        console.error('loginUser get token route')
        console.error(err);
        document.getElementById("loginMessage").innerHTML = "invalid Login or Password";
    }
}


export const getUser = async (user) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/user/${user}`);
        return response.data;
    } catch(err) {
        console.error('getUser route')
        console.log(err);
    }
};

export const getUserTopTime = async (user, level) => {
    try {
        const response = await getUser(user);
        return response.data["level1"].topTime;
    } catch(err) {
        console.error('getUserTopTime route');
        console.log(err);
    }
}

export const getUserRankings = async () => {
    try {
        const response = await axios.get(`${apiBaseUrl}/users`);
        return response.data;
    } catch(err) {
        console.error('getUserRankings route');
        console.log(err);
    }
}

export async function updateTopTime(user, levelName, time, deaths) {
    try {
        const topTime = parseFloat(await getUserTopTime(user, levelName));
        try {
            parseFloat(time, time);
        } catch(err) {
            console.error('updateTopTime parseFloat');
            console.log(err);
        }
        if (time < topTime) {
            console.log(`New top time ${time} better than best time ${topTime}`);
            try {
                await axios.patch(`${apiBaseUrl}/user/${user}`, {
                "level1": { "topTime": time, "deaths": deaths }
            })
            } catch(err) {
                console.log('updateTopTime patch operation');
                console.log(err);
            }
            console.log('top time updated');
        } else {
            console.log(`${time} is not better than top time ${topTime}`);
        }
    } catch(err) {
        console.log(err);
    }
}



