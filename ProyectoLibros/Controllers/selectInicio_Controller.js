var db = require("../Models/conexion");

var fs = require('fs');


exports.seleccionProductos= function(req,res){
    //res.render('CatalogoLibro' ,{titulo:'Catalgo de libros'});
    db.query("SELECT nombre FROM libro", function(err,results){

        res.render('/IndexBack', { titulo: 'Administrativo', otro: results });
    });
};

/*exports.seleccionVenta= function(req,res){
    //res.render('CatalogoLibro' ,{titulo:'Catalgo de libros'});
    db.query("SELECT COUNT(*) AS total FROM venta", function(err,results){

        res.render('/IndexBack', { titulo: 'Inicio', inicio2: results });
    });
};

exports.seleccionComentario= function(req,res){
    //res.render('CatalogoLibro' ,{titulo:'Catalgo de libros'});
    db.query("select count(*) AS total from comentario", function(err,results){

        res.render('/IndexBack', { titulo: 'Inicio', inicio3: results });
    });
};*/