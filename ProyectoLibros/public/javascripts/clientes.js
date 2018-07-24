function eliminarCliente(id){
    var confirmar =  confirm('¿Estas seguro que quiere eliminar al cliente?');
    if(confirmar){

        $.ajax({
            url:'/clientes/eliminarCliente',
            method:'post',
            data:{id:id},
            success: function(respuesta){
                if(respuesta){
                    $('#row'+id).remove();
                    $('#row2'+id).remove();
                }
            }
        });
    }
}

function validaVacio(valor) {
        valor = valor.replace("&nbsp;", "");
        valor = valor == undefined ? "" : valor;
        if (!valor || 0 === valor.trim().length) {
            return true;
            }
        else {
            return false;
            }
        }

function validarfor(){
    
    var nombre= document.getElementById("nombre_cliente").value; 
    /*var precio = document.getElementsByName("precio")[0].value;
    var descrip = document.getElementsByName("descripcion")[0].value;
    var image = document.getElementsByName("imagen")[0].value;
    var autor = document.getElementsByName("autor")[0].value;*/
        
    if ( validaVacio(nombre.value) ) {  //COMPRUEBA CAMPOS VACIOS
        alert("Los campos no pueden quedar vacios");
        console.log("vacio");
        return false;
    }{
        return true;
    }
}