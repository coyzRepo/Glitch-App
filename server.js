// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const services = require('./services');
const axios = require('axios');



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
        // console.log('I AM HERE', request.body);

    const { userid: userId, wish } = request.body;
    const { validateUser } = services;
    
    if (!userId) {
      return response.status(400).sendFile(__dirname + '/views/error.html');
    }

    const isValidUser = await validateUser(userId);
    
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
