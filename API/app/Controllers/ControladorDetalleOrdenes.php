<?php

namespace App\Controllers;

use App\Models\ModeloDetalleOrdenes;
use CodeIgniter\RESTful\ResourceController;

class ControladorDetalleOrdenes extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        //Se crea la instancia
        $ModeloDetalleOrdenes = new ModeloDetalleOrdenes();
        //Se recuperan los datos
        $Datos['detalle_orden'] = $ModeloDetalleOrdenes->findAll();
        //Se retornan los datos
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
        $ModeloDetalleOrdenes = new ModeloDetalleOrdenes();
        //Se recuperan datos por id
        $Datos = $ModeloDetalleOrdenes->getWhere(['ID_ORDEN' => $id])->getResult();
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
        $ModeloDetalleOrdenes = new ModeloDetalleOrdenes();
        //Requerimos los datos
        $Datos = [
            'ID_ORDEN' => $this->request->getVar('ID_ORDEN'),
            'ID_PRODUCTO' => $this->request->getVar('ID_PRODUCTO'),
            'CANTIDAD' => $this->request->getVar('CANTIDAD')
        ];
        //Hacemos la insercion
        $ModeloDetalleOrdenes->insert($Datos);

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
        //
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        //Se crea la instancia
        $ModeloDetalleOrdenes = new ModeloDetalleOrdenes();
        //Se recoje el id
        $DetalleOrdenes = $ModeloDetalleOrdenes->find($id);
        //
        if($DetalleOrdenes){
            $ModeloDetalleOrdenes->delete($id);

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
