// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const services = require('./services');
require('dotenv').config();
const nodemailer = require('nodemailer');
let schedule = require('node-schedule');


app.use(bodyParser());
app.use(morgan());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/', async (request, response) => {

  try {

    let user = process.env.EMAILUSERNAME;
    let pass = process.env.EMAILPASS;

    console.log('I AM HERE', request.body);


    const { userid: userId, wish } = request.body;
    const { validateUser } = services;
    
    if (!userId) {
      console.log('Here!');
      return response.status(400).sendFile(__dirname + '/views/error.html');
    }

    const isValidUser = await validateUser(userId);

    const sendMail = () => {
      // Create a SMTP transporter object
      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: `${user}`,
            pass: `${pass}`
        }
      });

        // Message object 
        let message = {
          from: 'do_not_reply@northpole.com',
          to: 'santa@northpole.com',
          subject: 'Glitch Email',
          username: userId,
          text: wish
        };

      schedule.scheduleJob('*/15 * * * * *', () => {
            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    return process.exit(1);
                }
        
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        })
    }

    sendMail();
    
    if (isValidUser) {
      // show success page
      response.sendFile(__dirname + '/views/success.html');
    } else {
      //show error page
      response.sendFile(__dirname + '/views/error.html');    
    }
  } catch (error) {
    response.status(500).sendFile(__dirname + '/views/error.html');
    console.log(error);
  }

});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);

});
