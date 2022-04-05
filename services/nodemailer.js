// // Use at least Nodemailer v4.1.0
// require('dotenv').config({path:__dirname+'/../.env'});
// const nodemailer = require('nodemailer');
// const schedule = require('node-schedule');



// // // Generate SMTP service account from ethereal.email
// // nodemailer.createTestAccount((err, account) => {
// //     let user = process.env.EMAILUSERNAME;
// //     let pass = process.env.EMAILPASS;
// //     console.log(user, pass);
// //     if (err) {
// //         console.error('Failed to create a testing account. ' + err.message);
// //         return process.exit(1);
// //     }

// //     console.log('Credentials obtained, sending message...');

// //     // Create a SMTP transporter object
// //     let transporter = nodemailer.createTransport({
// //         host: account.smtp.host,
// //         port: account.smtp.port,
// //         secure: account.smtp.secure,
// //         auth: {
// //             user: `${user}`,
// //             pass: `${pass}`
// //         }
// //     });

// //     // Message object
// //     let message = {
// //         from: 'do_not_reply@northpole.com',
// //         to: 'santa@northpole.com',
// //         subject: 'Test email',
// //         text: 'Hello to myself!',
// //         // html: '<p><b>Hello</b> to myself!</p>'
// //     };

// //     schedule.scheduleJob('*/2 * * * * *', () => {
// //         console.log('stasdfgasdf');
// //         transporter.sendMail(message, (err, info) => {
// //             if (err) {
// //                 console.log('Error occurred. ' + err.message);
// //                 return process.exit(1);
// //             }
    
// //             console.log('Message sent: %s', info.messageId);
// //             // Preview only available when sending through an Ethereal account
// //             console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// //         });
// //     });
// // });

// // module.exports = EmailResponse;

// schedule.scheduleJob('*/2 * * * * *', () => {
//     console.log('haysss!');
// });