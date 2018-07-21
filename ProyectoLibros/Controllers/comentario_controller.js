//Get libro
var db = require("../Models/conexion");

//Seccion comentarios
exports.showComentarios= function(req,res){

    db.query("SELECT * FROM comentario Where id_libro = ?",req.params.id, function(err,results){
        res.render('ComentarioLibro', { titulo: 'Comentarios', comentarios:results, id:req.params.id });
    });
};

exports.crearComentario = function(req, res, nex){
var fecha = new Date();

var dd = fecha.getDate();
var mm = fecha.getMonth();
var yy = fecha.getFullYear();

if(dd<10){
    dd='0'+dd;
}

if(mm<10){
    mm ='0'+mm;
}

today= dd+"/"+mm+"/"+yy;

    var comentario = {
        comentario: req.body.comentario,
        nombre_autor: req.body.nombre,
        fecha:today,
        email: req.body.email,
        id_libro: req.body.id
    }

    db.query("INSERT INTO comentario SET ?",comentario, function(err, results){
        
    });

    res.redirect('CatalogoLibro');
}