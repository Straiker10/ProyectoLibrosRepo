var nodemailer = require('nodemailer'); // email sender function 

exports.sendEmail = function(req, res){
    // nodemailer stuff will go here
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
    text: 'Lle adjuntamos el link de descarga para poder visualizar su libro comprado.'
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
};