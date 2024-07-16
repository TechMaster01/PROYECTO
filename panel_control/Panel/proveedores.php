<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de control</title> 
    <link rel="icon" type="image/x-icon" href="img/modelorama-logo.png">
    <link rel="stylesheet" href="estilos.css">

</head>
<body>
    <!-- Header-->
    <header id=header>
        <div id="logo">
            <img src="img/modelorama-text-logo.png" alt="logo">
        </div>
        <h1 id=panel>
            Panel de Control
        </h1>
    </header>
    <!-- Fin Header-->

    <!--navbar-->
    <nav id="nav">
        <ul>
            <li>
                <a id="home" href="index.php" >Inicio</a>

            </li>
            <li>
                <a id="editar" href="#" onclick="return false;" >  Administrar  </a>
                <ul>
                    <li>
                    <a href="ordenes.php" >Órdenes</a>
                    </li>
                    <li>
                    <a href="productos.php" >Productos</a>
                    </li>
                    <li>
                    <a href="proveedores.php" >Proveedores</a>
                    </li>
                    <li>
                    <a href="usuarios.php" >Usuarios</a>
                    </li>
                </ul>
            </li>
            <li>
                <a id="reporte" href="reporte.php" >Reporte de ventas</a>
            </li>
            <li>
                <a id="inventario" href="inventario.php" >Inventario</a>
            </li>
            <li>
                <a id="config" href="config.php" >Configuración</a>
                <ul>
                    <li>
                    <a href="config.php" >OpcConfig1</a>
                    </li>
                    <li>
                    <a href="config.php" >OpcConfig2</a>
                    </li>
                    <li>
                    <a href="config.php" >OpcConfig3</a>
                    </li>
                    <li>
                    <a href="config.php" >OpcConfig4</a>
                    </li>
                </ul>

            </li>
            <li>
                <a id="log-out" href="../login.php" >Cerrar sesión</a>
            </li>
        </ul>
    </nav>
    <!--fin navbar-->
    <div class="container">
            <div>
                <h1>
                    Proveedores
                </h1>
            </div>
            <table class="proveedores">
                <thead>
                    <th>ID del Proveedor</th>
                    <th>Proveedor</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </thead>

                <tbody>
                    <tr>
                       
                    </tr>
                </tbody>
            </table>
        </div>


        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
        <script src="SweetAlert.js"></script>

</body>
</html>