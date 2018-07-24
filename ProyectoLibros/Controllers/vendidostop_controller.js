var db = require("../Models/conexion");

var fs = require('fs');

exports.showTop= function(req,res){
    //res.render('CatalogoLibro' ,{titulo:'Catalgo de libros'});
    db.query("SELECT * FROM libro ORDER BY venta DESC LIMIT 3", function(err,results){
        res.render('index', { titulo: 'Inicio', vendidos : results });
    });
};