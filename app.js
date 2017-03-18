// libraries
var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection');
var app = express();
var server = require('http').createServer(app);
var io = require('./socket/socket-io').listen(server);
var port = process.env.PORT || 2016;


// listen port to 2016
server.listen(port, function () {
  console.log('Server listening at port %d', port);
});


// router dependencies
var userRoutes = require('./routes/user');

// allow all request
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// express public
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// public router
app.get('/', function (req, res) {
  res.send('Hello World!');
});

connection.init();


// ROUTES
userRoutes.configure(app);
