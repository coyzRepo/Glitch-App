const axios = require('axios');

/**
 * 
 * @returns {Array}
 */
 const getUserProfiles = async () => { 
    const response = await axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json');

    return response.data ?? [];
}

/**
 * 
 * @returns {Array}
 */
 const getUsers = async () => { 
    const response = await axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json');

    return response.data ?? [];
}

module.exports = {
    getUserProfiles,
    getUsers,
}