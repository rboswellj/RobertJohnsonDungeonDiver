const axios = require('axios');

const apiBaseUrl = 'http://localhost:5000/api';

export function findUser(searchedUser) {
    return axios
    .get(`${apiBaseUrl}/search?userId=${searchedUser}`)
    .then((response => {

        return response.data.data;
    }))
    .catch((error) => {
        console.log(error);
    })
}

export async function findTopUserTime(user, level) {
    return await axios
    .get(`${apiBaseUrl}/${user}`)
    .then((response => {

        return response.data.data[`level${level}`].topTime;
    }))
    .catch((error) => {
        console.log(error);
    })
}

export async function updateTopTime(user, level, time) {
    const topTime = await findTopUserTime(user, level);
    if (time < topTime) {
        console.log(`New top time ${time} better than last time ${topTime}`);
    } else {
        console.log(`${time} is not better than top time ${topTime}`);
        const res = await axios
        .patch(`${apiBaseUrl}/${user}`, {
            "level1": { "topTime": time }
        })
        .catch((error) => {
            console.log(error);
        })
        
    }
}

