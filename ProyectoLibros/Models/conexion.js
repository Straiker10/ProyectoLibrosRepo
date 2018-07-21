var mysql = require('mysql');

/**conexion 1 *
var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"",
    database:"bdlibros",
    insecureAuth:true
});*/

/**conexion 2 */
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