var express = require('express');
var router = express.Router();
var db = require("../Models/conexion");

var fs = require('fs');
var libroController = require('../Controllers/libro_controller');
var vendidosController = require('../Controllers/vendidostop_controller');

var comentarioController = require('../Controllers/comentario_controller');
var pagolController = require('../Controllers/pago_controller');
var clienteController = require('../Controllers/clientesController');
var seleccion1 = require('../Controllers/selectInicio_Controller'); ///seleccion de datos estrategicos
var ventaslocas = require('../Controllers/ventas_controllers');

var app = express();
/* GET home page. */
router.get('/', vendidosController.showTop, function(req, res, next) {
	if (req.session.cart){

}else{
	req.session.cart=[]
}
  res.render('index', { title: 'Express' });
});

router.get('/IndexBack',seleccion1.seleccionProductos);
	
router.get('/Login', function(req, res, next) {
	
  res.render('Login', { title: 'Inicio De Sesión',error:"" });
});

router.get('/nosotros', function(req,res,next){
res.render('nosotros', {title: 'Nosotros'});
});

router.post('/Login',seleccion1.seleccionProductos);  //adaptacion vista

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
			req.session.cart.push({id_libro:req.body.id_libro,nombre:req.body.nombre,link:req.body.link,tecnologia:req.body.tecnologia, autor:req.body.autor,precio:req.body.precio,estado:req.body.estado});	
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

router.get('/pay', pagolController.pay);

///descomenttar en caso de errores
//router.post('/enviar',pagolController.enviar);

//si es valida la compra
router.get('/Success',pagolController.success);

router.get('/cancel',pagolController.cancel);

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

//MostrarClientes 
router.get('/clientes/indexCliente', clienteController.cliente);
//Eliminar cliente
router.post('/clientes/eliminarCliente', clienteController.eliminarCliente);

router.get('/ventas/IndexVentas', ventaslocas.ventas);

router.post('/ventas/IndexVentas', ventaslocas.filtro);

router.post('/ventas/eliminarVenta', ventaslocas.eliminarVenta);

module.exports = router;
