//Get conexion
var db = require("../Models/conexion");

const paypal = require('paypal-rest-sdk');

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
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
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

                console.log(parseFloat(payment['transactions'][0]['amount']['total']));
               var venta = {
                    nombre_cliente: JSON.stringify(payment['payer']['payer_info']['last_name']),
                    fecha: JSON.stringify(payment['create_time']),
                    email: JSON.stringify(payment['payer']['payer_info']['email']),
                    monto: parseFloat(payment['transactions'][0]['amount']['total']),
                    articulos: items
                }
                    
                db.query("INSERT INTO venta SET ?",venta, function(err, results){
                    
                });

            
            }
          res.render('Success', { title: 'Libros', mensaje:'Grcias por su compra' });
      }
  });
};

//Si se cancela la compra
exports.cancel= function(req,res){
    res.redirect('/');
};





