var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser'); //modulo para recuperar 
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



const fileUpload = require('express-fileupload'); //modulo para archivos

var app = express();

app.use(session({
	secret: 'SOMERANDOMSECRETHERE',
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge:60000 }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


  app.post('/enviar', function(req, res){
    indexRouter.post('/enviar');
   });
  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Pasar datos del fomr en post. 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//para archivos 
app.use(fileUpload());

app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
