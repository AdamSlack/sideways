'use-strict';


// IMPORTS
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('../../config/example_config');

//postgres connection
const pg = () => {};

// CONSTANTS
const server = express();



server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Accept', 'application/json');
    next();
  });

//Catch all error handler
server.use(function (err, req, res, next) {
    res.status(500)
    res.render('error, please refer to https://github.com/AdamSlack/stroke_drivers_screening_assessment', { error: err })
  });


//Create router
//NOTE: Did a router to make more clearly seperated content
var router = express.Router(); //Routing for endpoint

// Middleware to use for all requests
// TODO: middleware checks token autheticaity?
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', (req, res) => {
    res.send('Welcome to the stroke driving assement API (https://github.com/AdamSlack/stroke_drivers_screening_assessment)');
});


/*
    Login checks
*/
router.route('/login')
    //Check all POST
    .post((req, res) => {
        var tok = 'create_token or show sucess in middleware'
        return token;
    })
    //Check all GET
    .get((req, res) => {
        return ;
    });

router.route('/register_participant')
    .post((req,res) => {
        //func call
    });

//Test clician id and then participant id
router.route('/:clincian/:participant')
    .post((req,res) => {
        return "noice";
    }).get((req,res) => {
        return "noice_get";
    });

//Results handle
router.route('/dot_cancellation')
    .post((req,res) => {
        let data = body;
        let time_taken = data.time_taken
        let true_pos = data.true_pos;
        let false_pos = data.false_pos;
        let false_neg = data.false_neg;
        //TODO: validation + beginign to insert
    }).get((req,res) => {

    });

router.route('/car_direction')
    .post((req,res) => {
        let data = body;
        let time_taken = data.time_taken
        let points = data.points;
        //TODO: validation + beginign to insert
    }).get((req,res) => {

    });

router.route('/compass_directions')
    .post((req,res) => {
        let data = body;
        let time_taken = data.time_taken
        let points = data.points;
        //TODO: validation + beginign to insert
    }).get((req,res) => {

    });

router.route('/road_scenarios')
    .post((req,res) => {
        let data = body;
        let time_taken = data.time_taken
        let points = data.points;
        //TODO: validation + beginign to insert
    }).get((req,res) => {

    });

router.route('/trail_making')
    .post((req,res) => {
        let data = body;
        let time_taken = data.time_taken
        let mistakes = data.mistakes;
        //TODO: validation + beginign to insert
    }).get((req,res) => {

    });



//Register Routes
server.use('/',router)




server.listen(8080);
console.log('Running on: localhost:8080')