var db = require("../Models/conexion");

var fs = require('fs');


exports.seleccionProductos= function(req,res){

    var usuario={
		correo:req.body.correo,
		contrasena:req.body.contrasena,
	};
	var query="select * from usuarios where correo='"+usuario.correo+"' and contrasena='"+usuario.contrasena+"'";
	db.query("select * from usuarios where correo='"+usuario.correo+"' and contrasena='"+usuario.contrasena+"'",function(err,results){
		if(err){
			res.render('Login', { title: 'Inicio de sesión', error:err });		
		}else{
			var ok=false;
			for(var i=0; i<results.length; i++){
				if(results[i].correo==usuario.correo && results[i].contrasena==usuario.contrasena){
					var ok=true;
				};
			};
			if(ok){
                req.session.ejemplo=1;
                var count_clientes;
				db.query("SELECT COUNT(*) as totalClientes FROM venta", function(err,results){
                    count_clientes= results[0];

                    db.query("SELECT COUNT(*) as totalLibros FROM libro", function(err,results){
                        count_libros= results[0];  
                        
                        db.query("select  sum(venta) as totalLibrosVendidos from libro", function(err,results){
                            count_libros_vendidos= results[0]; 
                            db.query("SELECT COUNT(*) as totalComentarios FROM comentario", function(err,results){
                                count_comentario= results[0];    
                                res.render('IndexBack', { titulo: 'Administrativo', clientes: count_clientes, libros:count_libros, vendidos:count_libros_vendidos, comentarios:count_comentario });   
                            });   
                            
                        });
                        
                    });      
                });
               
        
			}else{
				res.render('Login', { title: 'Inicio de sesión', error:"El correo o contraseña son incorrectos.",query:query });
			};
			
		};
		
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