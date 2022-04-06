require('dotenv').config();

const { getUserProfiles, getUsers } = require('./api');

const differenceInCalendarYears = require('date-fns/differenceInCalendarYears');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
let requestQueue = [];

/**
 * 
 * @param {string} userId
 * @returns {boolean}
 */
const validateUser = async (userId) => {
    const userProfiles = await getUserProfiles();
    const users = await getUsers();
    const user = users.find((x) => x.username === userId);
    const userProfile = userProfiles.find((x) => x.userUid === user?.uid);
    const isRegistered = user && userProfile;

    if (!isRegistered) { return false; }

    const { birthdate } = userProfile;
    const now = new Date();
    const userBirthDate = new Date(birthdate);
    const isAgeLegal = differenceInCalendarYears(now, userBirthDate) <= 10;

    return isRegistered && isAgeLegal;
}

const queueMessage = async (userId, wish) => {
    const userProfiles = await getUserProfiles();
    const users = await getUsers();
    const user = users.find((x) => x.username === userId);
    const { address } = userProfiles.find((x) => x.userUid === user?.uid);

    if (!user) { return; }

    requestQueue.push({
        userId,
        address,
        wish,
    });
}

const scheduleMail = () => {
    const user = process.env.EMAILUSERNAME;
    const pass = process.env.EMAILPASS;

    schedule.scheduleJob('*/15 * * * * *', () => {
        if (requestQueue.length < 1) { return; }

        // Create a SMTP transporter object
        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
              user: `${user}`,
              pass: `${pass}`
          }
        });

        const mailContents = requestQueue;
        requestQueue = []; 

        mailContents.forEach((mailContent) => {
            const message = {
                from: 'do_not_reply@northpole.com',
                to: 'santa@northpole.com',
                subject: 'Glitch Email',
                text: `
                USER ID: ${mailContent.userId}
                ADDRESS: ${mailContent.address}
                WISH: ${mailContent.wish}
                `,
            };   
            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    return process.exit(1);
                }
        
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });      
        }); 
    });
}

module.exports  = {
    validateUser,
    queueMessage,
    scheduleMail,
};