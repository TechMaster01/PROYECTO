<?php

namespace App\Controllers;

use App\Models\ModeloProductos;
use App\Models\ModeloProveedores;
use CodeIgniter\RESTful\ResourceController;

class ControladorProveedores extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        //Creamos la instancia
        $ModeloProveedores = new ModeloProveedores();
        //Se recuperan los registros de la tabla de proveedores
        $Datos['proveedores'] = $ModeloProveedores->findAll();
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
        $ModeloProveedores = new ModeloProveedores();
        //Se obtienen los datos por id
        $Datos = $ModeloProveedores -> getWhere(['ID_PROVEEDOR' => $id])->getResult();
        //Retorna los datos
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
        $ModeloProveedores = new ModeloProveedores();
        //Requerimos los datos
        $Datos = [
            'ID_PROVEEDOR' => $this->request->getVar('ID_PROVEEDOR'),
            'NOMBRE_PROVEEDOR' => $this->request->getVar('NOMBRE_PROVEEDOR'),
            'DESCRIPCION' => $this->request->getVar('DESCRIPCION')
        ];
        //Hacemos la insercion
        $ModeloProveedores->insert($Datos);

        $Respuesta = [
            'estatus' => 201,
            'error' => null,
            'message' => 'Recurso almacenado satisfactoriamente.'
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
        $ModeloProveedores = new ModeloProveedores();
        //Se solicitan datos
        $DatosSolicitud = $this->request->getJSON();
        //Datos a actualizar
        $DatosActualizar = [
            'ID_PROVEEDOR' => $DatosSolicitud->ID_PROVEEDOR,
            'NOMBRE_PROVEEDOR' => $DatosSolicitud->NOMBRE_PROVEEDOR,
            'DESCRIPCION' => $DatosSolicitud->DESCRIPCION
        ];
        //Hacemos la insercion
        $ModeloProveedores->update($id, $DatosActualizar);

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
        $ModeloProveedores = new ModeloProveedores();
        //
        $Proveedor = $ModeloProveedores->find($id);
        //
        if($Proveedor){
            $ModeloProveedores->delete($id);

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
