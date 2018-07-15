var mysql = require('mysql');

var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"Ronquillo#2",
    database:"bdlibros",
    insecureAuth:true
});

connection.connect();
module.exports = connection;