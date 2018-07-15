var express = require('express');
var router = express.Router();
var db = require("../Models/conexion");

var fs = require('fs');
var libroController = require('../Controllers/libro_controller')

var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/IndexBack', function(req, res, next) {
	if(req.session.ejemplo==1){
		res.render('IndexBack', { title: 'Administrativo' });
	}else{
		res.render('Login', { title: 'Inicio de sesión', error:"Debes iniciar sesión para accesar a ese módulo." });
	};
  	
});
router.get('/Login', function(req, res, next) {
	req.session.destroy();
  res.render('Login', { title: 'Inicio De Sesión',error:"" });
});
router.post('/Login', function(req, res) {
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
				res.render('IndexBack', { title: 'Administrativo' });
			}else{
				res.render('Login', { title: 'Inicio de sesión', error:"El correo o contraseña son incorrectos.",query:query });
			};
			
		};
		
	});
  	
});

router.get('/Contacto', function(req, res, next) {
  res.render('Contacto', { title: 'Contacto' });
});



//Catalogo provisional

//Aplicacion de Controllers //indexLibro
router.get('/CatalogoLibro', libroController.showLibro);

//Aplicacion de Controllers //indexLibro
router.get('/libros/indexLibro', libroController.libro);

//Aplicacion de Controllers //nuevo libro
router.get('/libros/crearLibro', libroController.nuevoLibro);

//Aplicacion de Controllers //nuevo libro
router.post('/libros/crearLibro', libroController.crearLibro);


//Aplicacion de Controllers //eliminar libro
router.post('/libros/eliminarLibro', libroController.eliminarLibro);

//Aplicacion de Controllers //modificar libro GET
router.get('/libros/modificarLibro/:id', libroController.getModificarLibro);

//Aplicacion de Controllers //modificar libro POST
router.post('/libros/modificarLibro', libroController.postModificarLibro);

module.exports = router;
