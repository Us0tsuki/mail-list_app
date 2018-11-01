var mysql = require("mysql");
var faker = require("faker");

var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b50b26470e7ecb',
    password: '74b4134b',
    database: 'heroku_5e74c9e184c66a0'
});

var users = [];
for (var i = 0; i < 500; i++) {
	data.push([faker.internet.email(), faker.date.past()]);
}

var q = 'INSERT INTO users (email, created_at) VALUES ?';
connection.query(q, [data], function(err, result) {
	if(err) console.error(err);
	console.log(result);
});

connection.end();
