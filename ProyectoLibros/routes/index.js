var express = require('express');
var router = express.Router();

var libroController = require('../Controllers/libro_controller')

var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/IndexBack', function(req, res, next) {
  res.render('IndexBack', { title: 'Administrativo' });
});
router.get('/Login', function(req, res, next) {
  res.render('Login', { title: 'Inicio De Sesión' });
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
