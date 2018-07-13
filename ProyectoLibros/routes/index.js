var express = require('express');
var router = express.Router();

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
module.exports = router;
