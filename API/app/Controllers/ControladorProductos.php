<?php

namespace App\Controllers;

use App\Models\ModeloProductos;
use CodeIgniter\RESTful\ResourceController;

class ControladorProductos extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        //Se crea instancia
        $ModeloProductos = new ModeloProductos();
        //Se recuperan los registros de la tabla de proveedores
        $Datos['productos'] = $ModeloProductos->findAll();
        //
        return $this->respond($Datos);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        //Se crea la instancia
        $ModeloProductos = new ModeloProductos();
        //Se recuperan datos por id
        $Datos = $ModeloProductos->getWhere(['ID_PRODUCTO' => $id])->getResult();
        //Se da respuesta con un return
        if($Datos){
            return $this->respond($Datos);
        }else{
            return $this->failNotFound('Recurso no encontrado con el id '.$id);
        }
    }

    /**
     * Return a new resource object, with default properties
     *
     * @return mixed
     */
    public function new()
    {
        //
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        //Se crea la instancia
        $ModeloProductos = new ModeloProductos();
        //Requerimos los datos
        $Datos = [
            'ID_PRODUCTO' => $this->request->getVar('ID_PRODUCTO'),
            'NOMBRE_PRODUCTO' => $this->request->getVar('NOMBRE_PRODUCTO'),
            'DESCRIPCION' => $this->request->getVar('DESCRIPCION'),
            'STOCK' => $this->request->getVar('STOCK'),
            'PRECIO' => $this->request->getVar('PRECIO'),
            'ID_PROVEEDOR' => $this->request->getVar('ID_PROVEEDOR'),
        ];
        //Hacemos la insercion
        $ModeloProductos->insert($Datos);

        $Respuesta = [
            'estatus' => 201,
            'error' => null,
            'message' => ['Satisfactorio' => 'Recurso almacenado satisfactoriamente.']
        ];

        return $this->respondCreated($Respuesta, 201);
    }

    /**
     * Return the editable properties of a resource object
     *
     * @return mixed
     */
    public function edit($id = null)
    {
        //
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        //Se crea la instancia
        $ModeloProductos = new ModeloProductos();
        //Se solicitan datos
        $DatosSolicitud = $this->request->getJSON();
        //Datos a actualizar
        $DatosActualizar = [
            'ID_PRODUCTO' => $DatosSolicitud->ID_PRODUCTO,
            'NOMBRE_PRODUCTO' => $DatosSolicitud->NOMBRE_PRODUCTO,
            'DESCRIPCION' => $DatosSolicitud->DESCRIPCION,
            'STOCK' => $DatosSolicitud->STOCK,
            'PRECIO' => $DatosSolicitud->PRECIO,
            'ID_PROVEEDOR' => $DatosSolicitud->ID_PROVEEDOR
        ];
        //Hacemos la insercion
        $ModeloProductos->update($id, $DatosActualizar);

        $Respuesta = [
            'estatus' => 200,
            'error' => null,
            'message' => ['Satisfactorio' => 'Recurso actualizado satisfactoriamente']
        ];

        return $this->respond($Respuesta);
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        //se crea la instancia
        $ModeloProductos = new ModeloProductos();
        //
        $Productos = $ModeloProductos->find($id);
        //
        if($Productos){
            $ModeloProductos->delete($id);

            $Respuesta = [
                'estatus' => 200,
                'error' => null,
                'mensaje' => ['Satisfactorio' => 'Recurso eliminado satisfactoriamente.']
            ];

            return $this->respondDeleted($Respuesta);
        }else{
            return $this->failNotFound("Recurso no encontrado con el identificador ".$id);            
        }
    }
}
