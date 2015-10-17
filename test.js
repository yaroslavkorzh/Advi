var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'admin',
  database : 'test',
  port: 3306
});
var app = express();

app.configure(function(){
  // disable layout
  app.set("view options", {layout: false});

  // make a custom html template
  app.register('.html', {
    compile: function(str, options){
      return function(locals){
        return str;
      };
    }
  });
});

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
        connection.query('CREATE TABLE IF NOT EXISTS preregistration('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'email VARCHAR(40),'
            + 'rentreq VARCHAR(30)'
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

app.get('/test', function(req, res) {
    res.sendfile(__dirname + '/server/index.html');
});

// Update MySQL database

app.post('/users', function (req, res) {
  console.log('add user', req.body);

    var post  = {name: 'Hello MySQL'};
    var query = connection.query('INSERT INTO preregistration SET ?',  req.body , function(err, result) {
      // Neat!
      if (err) throw err;
      res.json({ msgId: 'User added to database: ' + JSON.stringify(result)});
      //res.send('User added to database with ID: ' + result.insertId);
    });
    console.log(query.sql);
    // connection.query('INSERT INTO users SET ?', ['req.body'], 
    //     function (err, result) {
    //         if (err) throw err;
    //         res.send('User added to database with ID: ' + result.insertId);
    //     }
    // );
});

// Begin listening

app.listen(3000);
console.log("Express server listening on port %d in %s mode");

// app.get("/",function(req,res){
// connection.query('SELECT * from user LIMIT 2', function(err, rows, fields) {
// connection.end();
//   if (!err)
//     console.log('The solution is: ', rows);
//   else
//     console.log('Error while performing Query.');
//   });
// });

// app.listen(3000);