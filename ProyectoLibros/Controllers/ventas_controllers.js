var db = require("../Models/conexion");

var fs = require('fs');

exports.ventas= function(req,res){
    //res.render('CatalogoLibro' ,{titulo:'Catalgo de libros'});
    db.query("SELECT * FROM venta", function(err,results){

        res.render('ventas/IndexVentas', { titulo: 'Ventas', ventas: results });
    });
};