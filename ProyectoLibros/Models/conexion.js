var mysql = require('mysql');

/**var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"Ronquillo#2",
    database:"bdlibros",
    insecureAuth:true
});*/
///conexion 1 

<<<<<<< HEAD
/*
var connection = mysql.createConnection({
=======
/*var connection = mysql.createConnection({
>>>>>>> a75889d2a72988e7a8890aa9db07b40b5db392fe
    host:"localhost",
    port:3306,
    user:"root",
    password:"",
    database:"bdlibros",
    insecureAuth:true
});*/
<<<<<<< HEAD

=======
>>>>>>> a75889d2a72988e7a8890aa9db07b40b5db392fe
/**conexion 2 */
var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"kjkszpj08",
    database:"bdlibros",
    insecureAuth:true
});

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