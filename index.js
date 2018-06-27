var express = require('express');
var bcrypt=require('bcrypt');
var bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var session=require('express-session');

var db;
var userID;


var signupController=require('./controller/signupController');
var loginController=require('./controller/loginController');
var calendarController=require('./controller/calendarController');
var addController=require('./controller/addController');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'delta',
  resave: true,
  saveUninitialized: false
}));



app.use(express.static('./files'));
signupController(app);
loginController(app);
calendarController(app);
addController(app);