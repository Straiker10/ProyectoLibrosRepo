var db = require("../Models/conexion");

var fs = require('fs');

exports.ventas= function(req,res){
    //res.render('CatalogoLibro' ,{titulo:'Catalgo de libros'});
    db.query("SELECT * FROM venta", function(err,results){

        res.render('ventas/IndexVentas', { titulo: 'Ventas', ventas: results });
    });
};
exports.eliminarVenta = function(req, res){
    var id = req.body.id;
    console.log(id);
    var respuesta=false;
    db.query('DELETE FROM venta WHERE id_venta= ?',id,function(err, results){
        respuesta=true;
        res.json(respuesta);
    });
}