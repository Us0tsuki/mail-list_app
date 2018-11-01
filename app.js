var mysql = require("mysql");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
var urlencodedParser = bodyParser.urlencoded({extended : false});

var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b50b26470e7ecb',
    password: '74b4134b',
    database: 'heroku_5e74c9e184c66a0'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

app.get("/", function(req, res){
    var q = 'SELECT COUNT(*) as count FROM users';
    connection.query(q, function(err, results) {
        if(err) throw err;
        var count =  results[0].count;
        res.render('home', {count : count});
    });
});

app.post('/register', urlencodedParser, function(req, res) {
    var user = {email: req.body.email};
    var q = 'INSERT INTO users SET ?';
    connection.query(q, user, function(err, result) {
        if(err) console.error(err);
        res.redirect('back');
    });
});

app.listen(8080, function () {
 console.log('App listening on port 8080!');
});
