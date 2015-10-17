var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var mysql      = require('mysql');
var bodyParser = require('body-parser');
//var blueimp_file_upload = require('./node_modules/blueimp-file-upload-node/server.js');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'admin',
  database : 'test',
  port: 3306
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... \n\n");  
} else {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
}
});
connection.query('CREATE DATABASE IF NOT EXISTS test', function (err) {
    if (err) throw err;
    connection.query('USE test', function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS users('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'email VARCHAR(40),'
            + 'name VARCHAR(30),'
            + 'password VARCHAR(30)'
            +  ')', function (err) {
                if (err) throw err;
            });
    });
});
console.log('added parsers');
app.use(bodyParser.json()); // Configures bodyParser to accept JSON
app.use(bodyParser.urlencoded({
    extended: true
}));
// Main route sends our HTML file
app.get('/', function(req, res) {
    // res.sendfile(__dirname + '/index.html');
    // send the rendered view to the client
    res.render('index.html');
});
app.get('/landing', function(req, res) {
    // res.sendfile(__dirname + '/index.html');
    // send the rendered view to the client
    console.log(req.user);
    res.render('landing.html');
});
app.get('/profile', function(req, res) {
    // res.sendfile(__dirname + '/index.html');
    // send the rendered view to the client
    res.render('profile.html');
});
app.get('/test', function(req, res) {
    // res.sendfile(__dirname + '/index.html');
    // send the rendered view to the client
    res.render('testpage.html');
});
app.get('/addvideo', function(req, res) {
    // res.sendfile(__dirname + '/index.html');
    // send the rendered view to the client
    console.log(req.user);
    res.render('addvideo.html');
});
app.get('/test', function(req, res) {
    res.sendfile(__dirname + '/server/index.html');
});
// Update MySQL database
app.post('/users', function (req, res) {
  console.log('add user', req.body);
    var post  = {name: 'Hello MySQL'};
    var query = connection.query('INSERT INTO preregistration SET ?',  req.body , function(err, result) {
      if (err) throw err;
      res.json({ msg: 'Preregistration added to database',  values: req.body});
    });
    console.log(query.sql);
});

// Begin listening
app.listen(3000);
console.log("Express server listening on port %d in %s mode");

// app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.html', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
