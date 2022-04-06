const { getUserProfiles, getUsers } = require('../services/api');
const { validateUser } = require('../services');

const mockAxios = require("axios");

const userProfiles = [
    {
        "userUid": "1",
        "address": "219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo",
        "birthdate": "2017/12/05"
    },
    {
        "userUid": "2",
        "address": "365-1095, Minowada, Shirataka-machi Nishiokitama-gun, Yamagata",
        "birthdate": "1987/01/01"
    },
    {
        "userUid": "3",
        "address": "292-1082, Yodacho, Obihiro-shi, Hokkaido",
        "birthdate": "2010/23/01"
    }
];

const userss = [
    {
        "username": "john",
        "uid": "1"
    },
    {
        "username": "james",
        "uid": "2"
    },
    {
        "username": "jade",
        "uid": "3"
    }
]

jest.mock("../services/api", () => ({
        getUserProfiles: () =>
          Promise.resolve(userProfiles),
        getUsers: () =>
          Promise.resolve(userss),
      })
      
);

test ('Check if user is registered and is less than 10 years old', async () => {
    let userId = 'john';
    const isUserValid = await validateUser(userId);

    expect(isUserValid).toEqual(true);

});

test ('Check if user is not registered', async () => {
    let userId = 'olyver';
    const isUserValid = await validateUser(userId);

    expect(isUserValid).toEqual(false);

});

test ('Check if user is less than 10 years old', async () => {
    let userId = 'james';
    const isUserValid = await validateUser(userId);

    expect(isUserValid).toEqual(false);

});
