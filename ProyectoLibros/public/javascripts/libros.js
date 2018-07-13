function eliminarLibro(id){
    var confirmar =  confirm('¿Estas seguro que quiere eliminar el libro?');
    if(confirmar){

        $.ajax({
            url:'/libros/eliminarLibro',
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