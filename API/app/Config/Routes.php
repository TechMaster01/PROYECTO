<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->resource('proveedores', ['controller' => 'ControladorProveedores']);
$routes->resource('productos', ['controller' => 'ControladorProductos']);
$routes->resource('usuarios',['controller' => 'ControladorUsuarios']);
$routes->resource('ordenes',['controller' => 'ControladorOrdenes']);
$routes->resource('detalleordenes',['controller' => 'ControladorDetalleOrdenes']);
$routes->resource('login',['controller' => 'ControladorLogin']);

