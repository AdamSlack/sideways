'use-strict';


// IMPORTS
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('../../config/example_config');


// CONSTANTS
const server = express();


server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Accept', 'application/json');
    next();
  });

  server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/p/:participant/dot_cancellation', (req, res) => {
    var participant = req.params.participant;
    res.send('Participant: ' + participant);
});

server.listen(12345);
console.log('Running on: localhost:12345')