//Get conexion
var db = require("../Models/conexion");

const paypal = require('paypal-rest-sdk');
var nodemailer = require('nodemailer'); // email sender function 

//configuracion paypal //credenciales 
paypal.configure({
  'mode': 'sandbox',
  'client_id':'AalmO2oZTOfIpU6yppcZaIrtK3az_xYJTtawtyW-2yP9ucjaE0QnaJL_GLdYsroboF0LjYtkUhnoRGTu',
  'client_secret':'EBNESZY7EnoF0TIidigY-mzdk8iC74GUpe1P3nLnDw4qwX5jl2Kk7Sf2W6nG7LmLhJwlMa1HQclNdXt9'
});

exports.pay= function(req,res){

    //variable para generar el pago 
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://bookstoreutm.azurewebsites.net/success",
            "cancel_url": "https://bookstoreutm.azurewebsites.net/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [
              ]
            },
            "amount": {},
            "description": "Hat for the best team ever"
        }]
    };

    
    var total=0;
    for(var k=0; k < req.session.cart.length; k++){
        total=total+parseFloat(req.session.cart[k].precio);
       create_payment_json['transactions'][0]['item_list']['items'].push({ "name": req.session.cart[k].nombre,"sku": "001","price": req.session.cart[k].precio,"currency": "MXN", "quantity": 1 });
       
    }

    //add amount
    create_payment_json['transactions'][0]['amount'] = { "currency": "MXN","total": total};

//Generar el pago con paypal
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href);
          }
        }
    }
  })

};

//Si la respuesta de paypal es correcta
exports.success= function(req,res){
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    var total=0;
    for(var k=0; k < req.session.cart.length; k++){
        total=total+parseFloat(req.session.cart[k].precio);
        
    }

    var execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "MXN",
                "total": total
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);//Error
          throw error;
      } else {
        console.log(JSON.stringify(payment));
            var state = payment['state'];
            var items ="";

            if(state =="approved"){

                //Obtener items del carrito;
                for(var i in payment['transactions'][0]['item_list']['items']) {
                    items+="-"+JSON.stringify(payment['transactions'][0]['item_list']['items'][i]['name']); 
                }

            
                var venta = {
                    nombre_cliente: JSON.stringify(payment['payer']['payer_info']['last_name']),
                    fecha: JSON.stringify(payment['create_time']),
                    email: JSON.stringify(payment['payer']['payer_info']['email']),
                    monto: parseFloat(payment['transactions'][0]['amount']['total']),
                    articulos: items
                }
                    
                db.query("INSERT INTO venta SET ?",venta, function(err, results){
                    
                });
                
                var id=0;
                for(var k=0; k < req.session.cart.length; k++){
                   id=req.session.cart[k].id_libro;          
                    //nuevo query para el update del campo venta autoincrement
                    var sql = "UPDATE libro SET venta = venta + 1 WHERE id_libro = ?";
                    db.query(sql,[id], function(err,results){
            
                    });
                }
                var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'bookstoreutm@gmail.com',
                    pass: 'Bookstore123'
                    }
                });
                var mailOptions = {
                from: 'BOOKSTORE <bookstoreutm@gmail.com> ',
                to: 'smurs_14@hotmail.com',
                subject: 'Gracias por su compra.',
                text: 'Le adjuntamos el link de descarga para poder visualizar su libro comprado.'
                };
                transporter.sendMail(mailOptions, function(error, info){
                if (error){
                    console.log(error);
                    res.send(500, err.message);
                } else {
                    console.log("Email sent");
                    res.status(200).jsonp(req.body);
                    }
                });
            }
           
          res.render('Success', { title: 'Libros', mensaje:'Gracias por su compra' });
      }
  });
};

/*exports.enviar= function(req,res)
                    {
                    //Estos son los valores que corresponden a la persona que enviara el correo.
                    var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                    user: 'bookstoreutm@gmail.com', //Escribimos la cuenta de correo
                    pass: 'Bookstore123'//El password de la cuenta de correo
                    }
                    });
                    //Estos son los valores de lo que se enviara y a quien se enviara
                    var mailOptions = {
                    from: 'BOOKSTORE <bookstoreutm@gmail.com>',
                    to: req.query.payment, //Este datos se toma del formulario de esta manera
                    subject: "Compra realizada con exito.", //Este datos se toma del formulario de esta manera
                    text: res.links('http:facebook.com')//Este datos se toma del formulario de esta manera
                    };
                    //Este método se encarga de hacer el envió.
                    transporter.sendMail(mailOptions, function(error, info){
                    if (error){
                        console.log(error);
                        res.render('/');
                     } else {
                        console.log("El correo se envió correctamente.");
                        res.redirect('/');
                        //tenemos que crear los archivos ejs para el enviado y error
                    }
                });
            };*/

//Si se cancela la compra
exports.cancel= function(req,res){
    res.redirect('/');
};





