var db = require("../Models/conexion");

var fs = require('fs');

exports.cliente= function(req,res){
    //res.render('CatalogoLibro' ,{titulo:'Catalgo de libros'});
    db.query("SELECT id_venta,nombre_cliente, email, COUNT(*) Total FROM venta GROUP BY email HAVING COUNT(*) >= 1", function(err,results){

        res.render('clientes/indexCliente', { titulo: 'Clientes', clientes: results });
    });
};

exports.eliminarCliente = function(req, res){
    var id = req.body.id;
    console.log(id);
    var respuesta=false;
    db.query('DELETE FROM venta WHERE id_venta= ?',id,function(err, results){
        respuesta=true;
        res.json(respuesta);
    });
}