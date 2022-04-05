const axios = require('axios');
const differenceInCalendarYears = require('date-fns/differenceInCalendarYears')

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

/**
 * 
 * @param {string} userId
 * @returns {boolean}
 */
const validateUser = async (userId) => {
    const userProfiles = await getUserProfiles();
    const users = await getUsers();
    const user = users.find((x) => x.username === userId);
    console.log('user:', user);
    const userProfile = userProfiles.find((x) => x.userUid === user?.uid);
    const isRegistered = user && userProfile;

    if (!isRegistered) { return false; }

    const { birthdate } = userProfile;
    const now = new Date();
    const userBirthDate = new Date(birthdate);
    const isAgeLegal = differenceInCalendarYears(now, userBirthDate) <= 10;

    console.log({
        user,
        userProfile,
        isRegistered,
        now,
        userBirthDate,
        isAgeLegal,
    });
    
    return isRegistered && isAgeLegal;
}

module.exports  = {
    validateUser,
};