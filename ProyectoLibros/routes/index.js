var express = require('express');
var router = express.Router();
var db = require("../Models/conexion");

var fs = require('fs');
var libroController = require('../Controllers/libro_controller');

var comentarioController = require('../Controllers/comentario_controller');
var pagolController = require('../Controllers/pago_controller');

var app = express();
/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.cart){

}else{
	req.session.cart=[]
}
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
	if (req.session.cart){

	}else{
		req.session.cart=[]
	}
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
	if (req.session.cart){

	}else{
		req.session.cart=[]
	}
  res.render('Contacto', { title: 'Contacto' });
});
router.post('/CarritoCompras', function(req, res, next) {
	Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
	var unico=true;
	if (req.session.cart){

	}else{
		req.session.cart=[]
	}
	if(req.body.accion=="agregar"){
		for(var i=0; i < req.session.cart.length; i++){
			if(req.session.cart[i].id_libro==req.body.id_libro){
				unico=false;
			}
		}
		if(unico){
			req.session.cart.push({id_libro:req.body.id_libro,nombre:req.body.nombre,tecnologia:req.body.tecnologia, autor:req.body.autor,precio:req.body.precio,estado:req.body.estado});	
		}		
	}
	if(req.body.accion=="eliminar"){
		for (var j=0;j<req.session.cart.length;j++){
			if(req.session.cart[j].id_libro==req.body.id_libro){
				req.session.cart.remove(j);
			}
		}
	}
	var concepto="";
	var total=0;
	for(var k=0; k < req.session.cart.length; k++){
			concepto=concepto+req.session.cart[k].nombre+" + ";
			total=total+parseFloat(req.session.cart[k].precio);
	}
	concepto = concepto.substring(0, concepto.length - 3);
	res.render('CarritoCompras', { title: 'Carrito', cart:req.session.cart,concepto:concepto,total:total });
  });

router.get('/CarritoCompras', function(req, res, next) {
	if (req.session.cart){

	}else{
		req.session.cart=[]
	}
	var concepto="";
	var total=0;
	for(var k=0; k < req.session.cart.length; k++){
			concepto=concepto+req.session.cart[k].nombre+" + ";
			total=total+parseFloat(req.session.cart[k].precio);
	}
	concepto = concepto.substring(0, concepto.length - 3);
	res.render('CarritoCompras', { title: 'Carrito',cart:req.session.cart,concepto:concepto,total:total });
  });



//Catalogo

//Aplicacion de Controllers 
router.get('/CatalogoLibro', libroController.showLibro);

router.get('/ComentarioLibro/:id',comentarioController.showComentarios);

router.post('/agregarComentario',comentarioController.crearComentario);

//Pagos
//hacer pago statico //falta adaptarlo dinamicamente
router.get('/pay', pagolController.pay);

//si es valida la compra
router.get('/Success',pagolController.success);

//Admin Libro
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
