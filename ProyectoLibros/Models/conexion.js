var mysql = require('mysql');

//conexión al servidor
var connection = mysql.createConnection({host: "bookstorebd.mysql.database.azure.com", 
	user: "DiosemirNah@bookstorebd.com", 
	password: "Admin12345", 
	database: "bookstore", 
	port: 3306, 
	ssl:true
});

connection.connect();
module.exports = connection;