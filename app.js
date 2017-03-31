// libraries
var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection');
var app = express();
var port = 10000;

var todo = require('./models/todo');

connection.init();

// listen port to 2016
app.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// allow all request
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// express public
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// public router
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/todo', function(req, res) {
  todo.get(req, res);
});

app.post('/todo', function(req, res) {
  // res.send(req.body);
  todo.post(req.body, res);
});

