var express = require('express');
var app = express();
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');

var usersCtrl = require('./controllers/usersCtrl');
var gamesCtrl = require('./controllers/gamesCtrl');
var seasonsCtrl = require('./controllers/seasonsCtrl');
var predictionsCtrl = require('./controllers/predictionsCtrl');

var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));

app.use(cookieParser('whereweregoingwedontneedroads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
  // res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});


// app.use(flash());

//LOCAL
var where_am_i = __dirname;
console.log(where_am_i)
mongoose.connect('mongodb://localhost/tenp-jwt');
//REMOTE (CHANGE THIS! NEW USER AND PWD, AND DON'T SHOW THE PWD!)
// mongoose.connect('mongodb://bert:g7je6vPPx9shTGed@ec2-52-33-185-209.us-west-2.compute.amazonaws.com:27017/tenp');

app.use(cors())
var routes = require('./config/routes')
app.use(routes);



app.listen(port, function() {
  console.log('server listening on port %s', port)
});