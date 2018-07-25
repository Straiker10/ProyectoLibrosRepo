var db = require("../Models/conexion");

var fs = require('fs');

exports.ventas= function(req,res){
    //res.render('CatalogoLibro' ,{titulo:'Catalgo de libros'});
    db.query("SELECT * FROM venta", function(err,results){

        res.render('ventas/IndexVentas', { titulo: 'Ventas', ventas: results,query:"" });
    });
};
exports.filtro=function(req,res){
    var filtro=false;
    var date = new Date();
    var mes=("0" + (date.getMonth() + 1)).slice(-2)
    var anio= date.getFullYear();
    var query="Select * from venta"
    if (req.body.dia) {
        if(!filtro){
            filtro=true;
            query=query+" where fecha like '%"+anio+"-"+mes+"-"+req.body.dia+"%'";
            db.query(query,function(err,results){
                res.render('ventas/IndexVentas', { titulo: 'Ventas', ventas: results, query:query });    
                
            });        
        }
    }
    if (req.body.mes) {
        if(!filtro){
            filtro=true;
            if(req.body.mes.length==1){
                req.body.mes="0"+req.body.mes;
            }
            query=query+" where fecha like '%"+anio+"-"+req.body.mes+"%'";
            db.query(query,function(err,results){
                res.render('ventas/IndexVentas', { titulo: 'Ventas', ventas: results, query:query });    
            });        
        }
    }
    if (req.body.año) {
        if(!filtro){
            filtro=true;
            query=query+" where fecha like '%"+req.body.año+"%'";
            db.query(query,function(err,results){
                res.render('ventas/IndexVentas', { titulo: 'Ventas', ventas: results, query:query });    
            });        
        }
    }
    
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