const express=require('express');
const router=express.Router();

const clienteController=require('../controller/clienteController');
const productosController=require('../controller/productosController');
const pedidosController=require('../controller/pedidosController');
const usuariosController=require('../controller/usuariosController');

//middleware para proteger las rutas
const auth = require('../middleware/auth');

module.exports=function(){

    //Agrega nuevo clientes via POST
    router.post('/clientes',
        auth,
        clienteController.nuevoCliente
    );

    //obtener todos los clientes
    router.get('/clientes',
        auth,
        clienteController.mostrarClientes
    );

    //muestra un cliente en especifico (id)
    router.get('/clientes/:idCliente',
        auth,
        clienteController.mostrarCliente
    );

    //Actualizar Cliente
    router.put('/clientes/:idCliente',
        auth,
        clienteController.actualizarCliente
    );

    //Eliminar Cliente
    router.delete('/clientes/:idCliente',
        auth,
        clienteController.eliminarCliente
    );

    /**PRODUCTOS */
    router.post('/productos',
        auth,
        productosController.subirArchivo,
        productosController.nuevoProducto
    );

    //Muestra todos los productos
    router.get('/productos',
        auth,
        productosController.mostrarProductos
    );

    //Muestra un producto especifico por su id
    router.get('/productos/:idProducto',
        auth,
        productosController.mostrarProducto
    );

    //Actualizar producto
    router.put('/productos/:idProducto',
        auth,
        productosController.subirArchivo,
        productosController.actualizarProducto
    );

    //Eliminar productos
    router.delete('/productos/:idProducto',
        auth,
        productosController.eliminarProducto
    );
    
    //Busqueda de productos
    router.post('/productos/busqueda/:query',
        auth,
        productosController.buscarProducto
    );

    /**PEDIDOS */
    //Agrega nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario',
        auth,
        pedidosController.nuevoPedido
    );

    //muestra todos los pedidos
    router.get('/pedidos',
        auth,
        pedidosController.mostrarPedidos
    );

    //Mostrar un pedido 
    router.get('/pedidos/:idPedido',
        auth,
        pedidosController.mostrarPedido
    );

    //Actualizar un pedido
    router.put('/pedidos/:idPedido',
        auth,
        pedidosController.actualizarPedido
    );

    //Eliminar pedidos
    router.delete('/pedidos/:idPedido',
        auth,
        pedidosController.eliminarPedido
    );

    //Usuarios
    router.post('/crear-cuenta',
        auth,
        usuariosController.registrarUsuario
    );

    router.post('/iniciar-sesion',usuariosController.autenticarUsuario);
   
    return router;
}