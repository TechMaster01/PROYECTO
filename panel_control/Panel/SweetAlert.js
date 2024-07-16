/*var elementosDel = document.getElementsByClassName('delOrden');
//Alert del botón elimiar de órdenes
for (var i = 0; i < elementosDel.length; i++) {
    elementosDel[i].addEventListener('click', function () {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar',
            customClass: {
                confirmButton: 'alertFont',
                cancelButton: 'alertFont',
                title: 'alertFont',
                popup: 'alertFont'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // aquí va la logica para la eliminación
                Swal.fire({
                    title: 'Eliminado',
                    text: 'Los datos han sido eliminados',
                    icon: 'success',
                    customClass: {
                        title: 'alertFont',
                        popup: 'alertFont'
                    }
                });
            }
        });
    });
}*/
//conexión con la api
$(document).ready(function () {
    var apiUrlOrdenes = "https://mi-expendio.000webhostapp.com/ordenes";  
    var tablaCuerpoOrdenes = $("table.ordenes tbody");

    //obtener los datos de la API
    $.ajax({
        url: apiUrlOrdenes,
        type: "GET",
        dataType: "json",
        success: function (data) {
            //si la solicitud fue exitosa
            console.log("Datos obtenidos correctamente:", data);
            if (data && data.ordenes && data.ordenes.length > 0) {
                //tabla con los datos de la API
                $.each(data.ordenes, function (index, orden) {
                    var newRow = $("<tr>");
                    newRow.append($("<td>").text(orden.ID_ORDEN));
                    newRow.append($("<td>").text(orden.USUARIO));
                    newRow.append($("<td>").text(orden.FECHA_ORDEN));
                    newRow.append($("<td>").text(orden.TOTAL));
            
                    //botones y eventos
                    var acciones = $("<td>");
                    var btnEliminarOrden = $("<button>").addClass("delOrden");
                    var iconoEliminarOrden = $('<img src="img/delete-ico.ico">').addClass("iconoEliminarOrden");
                    
                    btnEliminarOrden.append(iconoEliminarOrden);
                    acciones.append(btnEliminarOrden);
            
                    btnEliminarOrden.on("click", function () {
                        Swal.fire({
                            title: '¿Estás seguro?',
                            text: 'Esta acción no se puede deshacer',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            cancelButtonText: 'Cancelar',
                            confirmButtonText: 'Eliminar',
                            customClass: {
                                confirmButton: 'alertFont',
                                cancelButton: 'alertFont',
                                title: 'alertFont',
                                popup: 'alertFont'
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // aquí va la logica para la eliminación
                                Swal.fire({
                                    title: 'Eliminado',
                                    text: 'Los datos han sido eliminados',
                                    icon: 'success',
                                    customClass: {
                                        title: 'alertFont',
                                        popup: 'alertFont'
                                    }
                                });
                            }
                        });
                        eliminarOrden(orden.ID_ORDEN);
                    });
            
                    newRow.append(acciones);
            
                    tablaCuerpoOrdenes.append(newRow);
                });
            } else {
                console.log("No se encontraron datos de la API.");
            }
        },
        error: function (xhr, status, error) {
            // errores de la solicitud
            console.error("Error al obtener datos de la API:", xhr, status, error);
        }
    });
});

function eliminarOrden(idOrden) {
    // lógica para eliminar una orden
    // nueva solicitud para esto??
    console.log("Eliminar orden con ID:", idOrden);
}




/*var elementosDel = document.getElementsByClassName('delProductos');
//Alert del botón elimiar de Productos
for (var i = 0; i < elementosDel.length; i++) {
    elementosDel[i].addEventListener('click', function () {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar',
            customClass: {
                confirmButton: 'alertFont',
                cancelButton: 'alertFont',
                title: 'alertFont',
                popup: 'alertFont'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // aquí va la logica para la eliminación
                Swal.fire({
                    title: 'Eliminado',
                    text: 'Los datos han sido eliminados',
                    icon: 'success',
                    customClass: {
                        title: 'alertFont',
                        popup: 'alertFont'
                    }
                });
            }
        });
    });
}*/
//Productos
$(document).ready(function () {
    var apiUrlProductos = "https://mi-expendio.000webhostapp.com/productos";  
    var tablaCuerpoProductos = $("table.productos tbody");

    function abrirFormularioModificar(idProducto) {
        // aquí se llena el formulario
        $.get(apiUrlProductos + '/' + idProducto, function (data) {
            $('#nombre').val(data.NOMBRE_PRODUCTO);
            $('#descripcion').val(data.DESCRIPCION);
            $('#stock').val(data.STOCK);
            $('#precio').val(data.PRECIO);
        });
    }


    // Función para modificar un producto
    function modificarProducto(idProducto){
        //solicitud PUT para modificar el producto con el id
        $.ajax({
            url: apiUrlProductos +'/' + idProducto,
            type: "PUT",
            data: { NOMBRE_PRODUCTO: nombre, DESCRIPCION: descripcion, STOCK: stock, PRECIO: precio },
            success: function (data) {
                console.log("Producto modificado correctamente:", data);
            },
            error: function (xhr, status, error) {
                console.error("Error al eliminar el producto:", xhr, status, error);
            }
        });
    }

    // Función para eliminar un producto
    function eliminarProducto(idProducto) {
        //solicitud DELETE para eliminar el producto con el ID
        $.ajax({
            url: "https://mi-expendio.000webhostapp.com/productos/" + idProducto,
            type: "DELETE",
            success: function (data) {
                console.log("Producto eliminado correctamente:", data);
            },
            error: function (xhr, status, error) {
                console.error("Error al eliminar el producto:", xhr, status, error);
            }
        });
    }

    

    // Obtener datos de la API
    $.ajax({
        url: apiUrlProductos,
        type: "GET",
        dataType: "json",
        success: function (data) {
            // Si la solicitud fue exitosa
            console.log("Datos obtenidos correctamente:", data);
            if (data && data.productos && data.productos.length > 0) {
                // Llena la tabla con los datos de la API
                $.each(data.productos, function (index, producto) {
                    var newRow = $("<tr>");
                    newRow.append($("<td>").text(producto.ID_PRODUCTO));
                    newRow.append($("<td>").text(producto.NOMBRE_PRODUCTO));
                    newRow.append($("<td>").text(producto.DESCRIPCION));
                    newRow.append($("<td>").text(producto.STOCK));
                    newRow.append($("<td>").text(producto.PRECIO));
                    newRow.append($("<td>").text(producto.ID_PROVEEDOR));

                    // Botones y eventos
                    var acciones = $("<td>");
                    var btnEliminarProducto = $("<button>").addClass("delProductos").attr("data-idproducto", producto.ID_PRODUCTO);
                    var iconoEliminarProducto = $('<img src="img/delete-ico.ico">').addClass("iconoEliminarProducto");
                    var btnModificarProducto = $("<button>").addClass("ModProductos").attr("data-idproducto", producto.ID_PRODUCTO);
                    var iconoModificarProducto = $('<img src="img/modificar.ico">').addClass("iconoEliminarProducto");
                    btnModificarProducto.append(iconoModificarProducto);
                    acciones.append(btnModificarProducto)

                    btnModificarProducto.on("click", function(){
                        var idProducto = $(this).data("idproducto");

                        abrirFormularioModificar(idProducto);

                        Swal.fire({
                            title: 'Modificar Producto',
                            html: '<label class="formModificar" for="nombre">Nombre:</label><input type="text" id="nombre" name="nombre" class="formularioInput" value=""><br>' +
                                '<label class="formModificar" for="descripcion">Descripción:</label><input type="text" id="descripcion" name="descripcion" class="formularioInput" value=""><br>' +
                                '<label class="formModificar" for="stock">Stock:</label><input type="text" id="stock" name="stock" class="formularioInput" value=""><br>' +
                                '<label class="formModificar" for="precio">Precio:</label><input type="text" id="precio" name="precio" class="formularioInput" value=""><br>',
                                            
                            showCancelButton: true,
                            confirmButtonText: 'Guardar cambios',
                            cancelButtonText: 'Cancelar',
                            showCloseButton: true,
                            customClass: {
                                confirmButton: 'alertFont',
                                cancelButton: 'alertFont',
                                title: 'alertFont',
                                popup: 'alertFont'
                            }
            
                        }).then((result) => {
                            if (result.isConfirmed){
                                modificarProducto
                                //se vuelve a llenar la tabla actualizada (?)
                                $.ajax({
                                    url: apiUrlProductos,
                                    type: "GET",
                                    dataType: "json",
                                    success: function (data) {
                                        if (data && data.productos && data.productos.length > 0) {
                                            //se vacía la tabla (se supone)
                                            tablaCuerpoProductos.empty();

                                            // Llena la tabla con los datos de la API (segun)
                                            $.each(data.productos, function (index, producto) {
                                                var newRow = $("<tr>");
                                                newRow.append($("<td>").text(producto.ID_PRODUCTO));
                                                newRow.append($("<td>").text(producto.NOMBRE_PRODUCTO));
                                                newRow.append($("<td>").text(producto.DESCRIPCION));
                                                newRow.append($("<td>").text(producto.STOCK));
                                                newRow.append($("<td>").text(producto.PRECIO));
                                                newRow.append($("<td>").text(producto.ID_PROVEEDOR));
                                                
                                            });
                                        } else {
                                            console.log("No se encontraron datos de la API.");
                                        }
                                    },
                                    error: function (xhr, status, error) {
                                        console.error("Error al obtener datos de la API:", xhr, status, error);
                                    }
                                });
                            }
                        })

                    })

                    
                    btnEliminarProducto.append(iconoEliminarProducto);
                    acciones.append(btnEliminarProducto);
            
                    btnEliminarProducto.on("click", function () {
                        var idProducto = $(this).data("idproducto");
                        Swal.fire({
                            title: '¿Estás seguro?',
                            text: 'Esta acción no se puede deshacer',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            cancelButtonText: 'Cancelar',
                            confirmButtonText: 'Eliminar',
                            customClass: {
                                confirmButton: 'alertFont',
                                cancelButton: 'alertFont',
                                title: 'alertFont',
                                popup: 'alertFont'
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // Llama a la función para eliminar el producto con el ID correspondiente
                                eliminarProducto(idProducto, function () {                    
                                    
                    
                                    // se vuelve a llenar la tabla actualizada (se supone)
                                    $.ajax({
                                        url: apiUrlProductos,
                                        type: "GET",
                                        dataType: "json",
                                        success: function (data) {
                                            if (data && data.productos && data.productos.length > 0) {
                                                //se vacía la tabla (se supone)
                                                tablaCuerpoProductos.empty();

                                                // Llena la tabla con los datos de la API (segun)
                                                $.each(data.productos, function (index, producto) {
                                                    var newRow = $("<tr>");
                                                    newRow.append($("<td>").text(producto.ID_PRODUCTO));
                                                    newRow.append($("<td>").text(producto.NOMBRE_PRODUCTO));
                                                    newRow.append($("<td>").text(producto.DESCRIPCION));
                                                    newRow.append($("<td>").text(producto.STOCK));
                                                    newRow.append($("<td>").text(producto.PRECIO));
                                                    newRow.append($("<td>").text(producto.ID_PROVEEDOR));
                                                    
                                                });
                                            } else {
                                                console.log("No se encontraron datos de la API.");
                                            }
                                        },
                                        error: function (xhr, status, error) {
                                            console.error("Error al obtener datos de la API:", xhr, status, error);
                                        }
                                    });
                                });
                            }
                        });
                    });
                    
            
                    newRow.append(acciones);
            
                    tablaCuerpoProductos.append(newRow);
                });
            } else {
                console.log("No se encontraron datos de la API.");
            }
        },
        error: function (xhr, status, error) {
            // Errores de la solicitud
            console.error("Error al obtener datos de la API:", xhr, status, error);
        }
    });
});


//Alerts de Proveedores
/*document.addEventListener('DOMContentLoaded', function () {
    var botonModProveedores = document.querySelector('.modProveedores');

    botonModProveedores.addEventListener('click', function () {
        Swal.fire({
            title: 'Modificar Producto',
            html: '<label class="formCustom" for="proveedor">Proveedor:</label><input type="text" id="proveedor" name="proveedor " value=""><br>' +
                '<label class="formCustom" for="descripcionProveedor">Descripción:</label><input type="text" id="descripcion" name="descripcion " value=""><br>',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Guardar Cambios',
            cancelButtonText: 'Cancelar',
            showCloseButton: true,
            customClass: {
                popup: 'formFont'
            }
        });
    });
});*/

/*var elementosDel = document.getElementsByClassName('delProveedores');
//Alert del botón elimiar de proveedores
for (var i = 0; i < elementosDel.length; i++) {
    elementosDel[i].addEventListener('click', function () {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar',
            customClass: {
                confirmButton: 'alertFont',
                cancelButton: 'alertFont',
                title: 'alertFont',
                popup: 'alertFont'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // aquí va la logica para la eliminación
                Swal.fire({
                    title: 'Eliminado',
                    text: 'Los datos han sido eliminados',
                    icon: 'success',
                    customClass: {
                        title: 'alertFont',
                        popup: 'alertFont'
                    }
                });
            }
        });
    });
}*/

$(document).ready(function () {
    var apiUrlProveedores = "https://mi-expendio.000webhostapp.com/proveedores";  
    var tablaCuerpoProveedores = $("table.proveedores tbody");

    //obtener los datos de la API
    $.ajax({
        url: apiUrlProveedores,
        type: "GET",
        dataType: "json",
        success: function (data) {
            //si la solicitud fue exitosa
            console.log("Datos obtenidos correctamente:", data);
            if (data && data.proveedores && data.proveedores.length > 0) {
                //tabla con los datos de la API
                $.each(data.proveedores, function (index, proveedor) {
                    var newRow = $("<tr>");
                    newRow.append($("<td>").text(proveedor.ID_PROVEEDOR));
                    newRow.append($("<td>").text(proveedor.NOMBRE_PROVEEDOR));
                    newRow.append($("<td>").text(proveedor.DESCRIPCION));

            
                    //botones y eventos
                    var acciones = $("<td>");
                    var btnEliminarProveedores = $("<button>").addClass("delProveedores");
                    var iconoEliminarProveedores = $('<img src="img/delete-ico.ico">').addClass("iconoEliminarProveedores");
                    
                    btnEliminarProveedores.append(iconoEliminarProveedores);
                    acciones.append(btnEliminarProveedores);
            
                    btnEliminarProveedores.on("click", function () {
                        Swal.fire({
                            title: '¿Estás seguro?',
                            text: 'Esta acción no se puede deshacer',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            cancelButtonText: 'Cancelar',
                            confirmButtonText: 'Eliminar',
                            customClass: {
                                confirmButton: 'alertFont',
                                cancelButton: 'alertFont',
                                title: 'alertFont',
                                popup: 'alertFont'
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // aquí va la logica para la eliminación
                                Swal.fire({
                                    title: 'Eliminado',
                                    text: 'Los datos han sido eliminados',
                                    icon: 'success',
                                    customClass: {
                                        title: 'alertFont',
                                        popup: 'alertFont'
                                    }
                                });
                            }
                        });
                        eliminarProveedores(producto.ID_PROVEEDOR);
                    });
            
                    newRow.append(acciones);
            
                    tablaCuerpoProveedores.append(newRow);
                });
            } else {
                console.log("No se encontraron datos de la API.");
            }
        },
        error: function (xhr, status, error) {
            // errores de la solicitud
            console.error("Error al obtener datos de la API:", xhr, status, error);
        }
    });
});



//Alerts de Usuarios
/*document.addEventListener('DOMContentLoaded', function () {
    var botonModUsuarios = document.querySelector('.modUsuarios');

    botonModUsuarios.addEventListener('click', function () {
        Swal.fire({
            title: 'Modificar Producto',
            html: '<label class="formCustom" for="idRol">ID de Rol:</label><input type="text" id="idRol" name="idRol" value=""><br>' +
                '<label class="formCustom" for="nombreUsuario">Nombre del Usuario:</label><input type="text" id="nombreUsuario" name="nombreUsuario " value=""><br>' +
                '<label class="formCustom" for="Direccion">Dirección:</label><input type="text" id="Direccion" name="Direccion " value=""><br>' +
                '<label class="formCustom" for="eMail">e-Mail:</label><input type="text" id="eMail" name="eMail" value=""><br>'+
                '<label class="formCustom" for="numTelefonico">Número Telefónico:</label><input type="text" id="numTelefonico" name="numTelefonico " value=""><br>' +
                '<label class="formCustom" for="Contraseña">Contraseña:</label><input type="text" id="Contraseña" name="Contraseña " value=""><br>',


            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Guardar Cambios',
            cancelButtonText: 'Cancelar',
            showCloseButton: true,
            customClass: {
                popup: 'formFont'
            }
        });
    });
});*/

//var elementosDel = document.getElementsByClassName('delUsuarios');
//Alert del botón elimiar de proveedores
/*for (var i = 0; i < elementosDel.length; i++) {
    elementosDel[i].addEventListener('click', function () {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar',
            customClass: {
                confirmButton: 'alertFont',
                cancelButton: 'alertFont',
                title: 'alertFont',
                popup: 'alertFont'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // aquí va la logica para la eliminación
                Swal.fire({
                    title: 'Eliminado',
                    text: 'Los datos han sido eliminados',
                    icon: 'success',
                    customClass: {
                        title: 'alertFont',
                        popup: 'alertFont'
                    }
                });
            }
        });
    });
}*/

$(document).ready(function () {
    var apiUrlUsuarios = "https://mi-expendio.000webhostapp.com/usuarios";  
    var tablaCuerpoUsuarios = $("table.usuarios tbody");

    //obtener los datos de la API
    $.ajax({
        url: apiUrlUsuarios,
        type: "GET",
        dataType: "json",
        success: function (data) {
            //si la solicitud fue exitosa
            console.log("Datos obtenidos correctamente:", data);
            if (data && data.usuarios && data.usuarios.length > 0) {
                //tabla con los datos de la API
                $.each(data.usuarios, function (index, usuarios) {
                    var newRow = $("<tr>");
                    newRow.append($("<td>").text(usuarios.USUARIO));
                    newRow.append($("<td>").text(usuarios.ID_ROL));
                    newRow.append($("<td>").text(usuarios.NOMBRE_USUARIO));
                    newRow.append($("<td>").text(usuarios.DIRECCION));
                    newRow.append($("<td>").text(usuarios.EMAIL));
                    newRow.append($("<td>").text(usuarios.CELULAR));
                    newRow.append($("<td>").text(usuarios.PASSWORD));


            
                    //botones y eventos
                    var acciones = $("<td>");
                    var btnEliminarUsuarios = $("<button>").addClass("delUsuarios");
                    var iconoEliminarUsuarios = $('<img src="img/delete-ico.ico">').addClass("iconoEliminarUsuarios");
                    
                    btnEliminarUsuarios.append(iconoEliminarUsuarios);
                    acciones.append(btnEliminarUsuarios);
            
                    btnEliminarUsuarios.on("click", function () {
                        Swal.fire({
                            title: '¿Estás seguro?',
                            text: 'Esta acción no se puede deshacer',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            cancelButtonText: 'Cancelar',
                            confirmButtonText: 'Eliminar',
                            customClass: {
                                confirmButton: 'alertFont',
                                cancelButton: 'alertFont',
                                title: 'alertFont',
                                popup: 'alertFont'
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // aquí va la logica para la eliminación
                                Swal.fire({
                                    title: 'Eliminado',
                                    text: 'Los datos han sido eliminados',
                                    icon: 'success',
                                    customClass: {
                                        title: 'alertFont',
                                        popup: 'alertFont'
                                    }
                                });
                            }
                        });
                        eliminarUsuarios(usuarios.USUARIO);
                    });
            
                    newRow.append(acciones);
            
                    tablaCuerpoUsuarios.append(newRow);
                });
            } else {
                console.log("No se encontraron datos de la API.");
            }
        },
        error: function (xhr, status, error) {
            // errores de la solicitud
            console.error("Error al obtener datos de la API:", xhr, status, error);
        }
    });
});


$(document).ready(function () {
    var apiUrlOrdenes = "https://mi-expendio.000webhostapp.com/ordenes";  
    var tablaCuerpoReporte = $("table.reporte tbody");

    //obtener los datos de la API
    $.ajax({
        url: apiUrlOrdenes,
        type: "GET",
        dataType: "json",
        success: function (data) {
            //si la solicitud fue exitosa
            console.log("Datos obtenidos correctamente:", data);
            if (data && data.ordenes && data.ordenes.length > 0) {
                //tabla con los datos de la API
                $.each(data.ordenes, function (index, orden) {
                    var newRow = $("<tr>");
                    newRow.append($("<td>").text(orden.ID_ORDEN));
                    newRow.append($("<td>").text(orden.FECHA_ORDEN));
                    newRow.append($("<td>").text(orden.TOTAL));
            
                    //botones y eventos
                    var acciones = $("<td>");
                    var btnVerReporte = $("<button>").addClass("verReporte");
                    var iconoVerReporte = $('<img src="img/reporte.ico">').addClass("iconoVerReporte");
                    
                    btnVerReporte.append(iconoVerReporte);
                    acciones.append(btnVerReporte);
            
                    btnVerReporte.on("click", function () {
                        Swal.fire({
                            title: 'Reporte',
                            text: '¡Aquí va el reporte de ventas!',
                            icon: 'info',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            cancelButtonText: 'Cancelar',
                            confirmButtonText: '¿Imprimir u otra acción?',
                            customClass: {
                                confirmButton: 'alertFont',
                                cancelButton: 'alertFont',
                                title: 'alertFont',
                                popup: 'alertFont'
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // aquí va la logica para la confirmación                              
                            }
                        });
                    });
            
                    newRow.append(acciones);
            
                    tablaCuerpoReporte.append(newRow);
                });
            } else {
                console.log("No se encontraron datos de la API.");
            }
        },
        error: function (xhr, status, error) {
            // errores de la solicitud
            console.error("Error al obtener datos de la API:", xhr, status, error);
        }
    });
});

$(document).ready(function () {
    var apiUrlProductos = "https://mi-expendio.000webhostapp.com/productos";  
    var tablaCuerpoInventario = $("table.inventario tbody");

    //obtener los datos de la API
    $.ajax({
        url: apiUrlProductos,
        type: "GET",
        dataType: "json",
        success: function (data) {
            //si la solicitud fue exitosa
            console.log("Datos obtenidos correctamente:", data);
            if (data && data.productos && data.productos.length > 0) {
                //tabla con los datos de la API
                $.each(data.productos, function (index, producto) {
                    var newRow = $("<tr>");
                    newRow.append($("<td>").text(producto.NOMBRE_PRODUCTO));
                    newRow.append($("<td>").text(producto.STOCK));
            
                    //botones y eventos
                    var acciones = $("<td>");
                    var btnModificarInventario = $("<button>").addClass("modificarInventario");
                    var iconoModificarInventario = $('<img src="img/edit.ico">').addClass("iconoModificarInventario");
                    
                    btnModificarInventario.append(iconoModificarInventario);
                    acciones.append(btnModificarInventario);
            
                    btnModificarInventario.on("click", function () {
                        Swal.fire({
                            title: 'Inventario',
                            text: '¡Aquí va el formulario del inventario!',
                            icon: 'info',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            cancelButtonText: 'Cancelar',
                            confirmButtonText: '¿Aquí también se modifica?',
                            customClass: {
                                confirmButton: 'alertFont',
                                cancelButton: 'alertFont',
                                title: 'alertFont',
                                popup: 'alertFont'
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // aquí va la logica para la confirmación                              
                            }
                        });
                    });
            
                    newRow.append(acciones);
            
                    tablaCuerpoInventario.append(newRow);
                });
            } else {
                console.log("No se encontraron datos de la API.");
            }
        },
        error: function (xhr, status, error) {
            // errores de la solicitud
            console.error("Error al obtener datos de la API:", xhr, status, error);
        }
    });
});

