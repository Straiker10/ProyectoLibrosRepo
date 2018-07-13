//Get libro
var db = require("../Models/conexion");

var fs = require('fs');

exports.libro= function(req,res){
    //res.render('CatalogoLibro' ,{titulo:'Catalgo de libros'});
    db.query("SELECT * FROM libro", function(err,results){

        res.render('libros/indexLibro', { titulo: 'Libros', libros: results });
    });
};

exports.nuevoLibro= function(req,res){
    //res.render('CatalogoLibro' ,{titulo:'Catalgo de libros'});

    res.render('libros/crearLibro', { titulo: 'Nuevo Libro'});

};

exports.crearLibro = function(req, res, nex){
    var libro = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        autor: req.body.autor,
        precio: req.body.precio,
        imagen: req.files.imagen.name,
        tecnologia: req.body.tecnologia
    }

    db.query("INSERT INTO libro SET ?",libro, function(err, results){
        //validar si hay archivo
        if (!req.files){
            return res.status(400).send('No hay archivos.');
        }
  
        //seccion subir archivo
        let filToUpload = req.files.imagen; 
        filToUpload.mv('public/images/'+req.files.imagen.name, function(err) {
        if (err)
            return res.status(500).send(err);
        });
    });

    res.render('libros/crearLibro', { titulo: 'Libro creado'});
}


exports.eliminarLibro = function(req, res){
    var id = req.body.id

    console.log(id);
    var respuesta=false;
    db.query('DELETE FROM libro WHERE id_libro = ?',id,function(err, results){
        respuesta=true;
        res.json(respuesta);
    });

}

exports.getModificarLibro = function(req, res){
    var libro = null;
    db.query("SELECT * FROM libro WHERE id_libro = ?",req.params.id, function(err,results){
        libro = results[0];
        res.render('libros/modificarLibro', { titulo: 'Libros', libro: libro });
    });
}

exports.postModificarLibro = function(req, res){

    var id = req.body.id;

    if(req.files.imagen != null){
        var libro = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            autor: req.body.autor,
            precio: req.body.precio,
            imagen: req.files.imagen.name,
            tecnologia: req.body.tecnologia
        }
          //validar si hay archivo
          if (!req.files){
            return res.status(400).send('No hay archivos.');
        }
  
        //seccion subir archivo
        let filToUpload = req.files.imagen; 
        filToUpload.mv('public/images/'+req.files.imagen.name, function(err) {
        if (err)
            return res.status(500).send(err);
        });
    }else{
        var libro = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            autor: req.body.autor,
            precio: req.body.precio,
            tecnologia: req.body.tecnologia
        }
    }

    db.query('UPDATE  libro SET ? WHERE id_libro = ?', [libro, id], function(err,results){

      res.redirect('/libros/indexLibro');
    });
}

