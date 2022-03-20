const axios = require('axios');


const apiBaseUrl = 'http://localhost:5000/api';

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${apiBaseUrl}/users`)
        return response.data;
    } catch(err) {
        console.log(err);
    }
}

export const getUser = async (user) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/${user}`);
        return response.data;
    } catch(err) {
        console.log(err);
    }
};

export const getUserTopTime = async (user, level) => {
    try {
        const response = await getUser(user);
        return response.data["level1"].topTime;
    } catch(err) {
        console.log(err);
    }
}

export const getUserRankings = async () => {
    try {
        const response = await axios.get(`${apiBaseUrl}/users`);
        return response.data;
    } catch(err) {
        console.log(err);
    }
}

export async function updateTopTime(user, levelName, time, deaths) {
    try {
        const topTime = parseFloat(await getUserTopTime(user, levelName));
        try {
            parseFloat(time, time);
        } catch(err) {
            console.log(err);
        }
        if (time < topTime) {
            console.log(`New top time ${time} better than best time ${topTime}`);
            try {
                await axios.patch(`${apiBaseUrl}/${user}`, {
                "level1": { "topTime": time, "deaths": deaths }
            })
            } catch(err) {
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


export async function updateState(user, data) {
    try{
        const response = await axios.patch(`${apiBaseUrl}/${user}`, {
            "currentState": data
        });
    } catch(err) {
        console.log(err);
    }
}



