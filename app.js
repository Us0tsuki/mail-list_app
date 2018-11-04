var mysql = require("mysql");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
var urlencodedParser = bodyParser.urlencoded({extended : false});

var db_credentials = {
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b50b26470e7ecb',
    password: '74b4134b',
    database: 'heroku_5e74c9e184c66a0'
}

var connection;

function keepDBActive() {
    connection = mysql.createConnection(db_credentials);
    connection.connect(function(err) {
        if(err) {
            console.log('error occurred when connecting to db:', err);
            setTimeout(keepDBActive, 2000);
        }
        console.log('db connected as id ' + connection.threadId);
    })

    connection.on('error', function(err) {
        console.log('db connection lost:', err);
        if(err.code == 'PROTOCOL_CONNECTION_LOST') handleDisconnect();
        else throw err;
    })
}

keepDBActive();

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

app.listen(process.env.PORT, function () {
    console.log('App listening on port ' + process.env.PORT);
});
