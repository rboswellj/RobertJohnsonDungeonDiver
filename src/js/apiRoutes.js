const axios = require('axios');
import { retrieveUser } from '..';


const apiBaseUrl = 'http://localhost:5000/api';

// export function findUser(searchedUser) {
//     return axios
//     .get(`${apiBaseUrl}/search?userId=${searchedUser}`)
//     .then((response => {
//         return response.data.data;
//     }))
//     .catch((error) => {
//         console.log(error);
//     })
// }

export const findUser = async (user) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/${user}`);
        // console.log(data);
        return response.data;
    } catch(err) {
        console.log(err);
    }
};

export async function findTopUserTime(user, level) {
    return await axios
    .get(`${apiBaseUrl}/${user}`)
    .then((response => {

        return response.data.data['level1'].topTime;
    }))
    .catch((error) => {
        console.log(error);
    })
}

export async function updateTopTime(user, levelName, time, deaths) {
    const topTime = await findTopUserTime(user, levelName);
    if (time < topTime) {
        console.log(`New top time ${time} better than best time ${topTime}`);
        await axios
        .patch(`${apiBaseUrl}/${user}`, {
            "level1": { "topTime": time, "deaths": deaths }
        })
        .catch((error) => {
            console.log(error);
        });
        console.log('top time updated');
    } else {
        console.log(`${time} is not better than top time ${topTime}`);
    }
}

export async function updateState(user, data) {

        await axios
        .patch(`${apiBaseUrl}/${user}`, {
            "currentState": data
        })
        .catch((error) => {
            console.log(error);
        });
        console.log('state updated')
}

export function getKeyCount(user) {
    axios
    .get(`${apiBaseUrl}/${user}`)
    .then(response => {
        let keys = response.data.data.currentState.keys;
        // console.log(`New Key Count: ${keys}`);
        return keys;
    })
    .catch((error) => {
        console.log(error);
    });
}
