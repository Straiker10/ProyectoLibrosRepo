var mysql = require('mysql');

var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"kjkszpj08",
    database:"bdlibros",
    insecureAuth:true
});

connection.connect();
module.exports = connection;