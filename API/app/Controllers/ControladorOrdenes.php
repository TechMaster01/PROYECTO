<?php

namespace App\Controllers;

use App\Models\ModeloOrdenes;
use CodeIgniter\RESTful\ResourceController;

class ControladorOrdenes extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        //Se crea la instancia
        $ModeloOrdenes = new ModeloOrdenes();
        //Se recuperan los datos
        $Datos['ordenes'] = $ModeloOrdenes->findAll();
        //se retornan los datos
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
        $ModeloOrdenes = new ModeloOrdenes();
        //Se recuperan datos por id
        $Datos = $ModeloOrdenes->getWhere(['ID_ORDEN' => $id])->getResult();
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
        $ModeloOrdenes = new ModeloOrdenes();
        //Requerimos los datos
        $Datos = [      
            'ID_ORDEN' => $this->request->getVar('ID_ORDEN'),
            'USUARIO' => $this->request->getVar('USUARIO'),
            'FECHA_ORDEN' => $this->request->getVar('FECHA_ORDEN'),
            'TOTAL' => $this->request->getVar('TOTAL')      
        ];
        //Hacemos la insercion
        $ModeloOrdenes->insert($Datos);
        //Retornamos una respuesta
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
        $ModeloOrdenes = new ModeloOrdenes();
        //Se solicitan datos
        $DatosSolicitud = $this->request->getJSON();
        //Datos a actualizar
        $DatosActualizar = [
            'ID_ORDEN' => $DatosSolicitud->ID_ORDEN,
            'USUARIO' => $DatosSolicitud->USUARIO,
            'FECHA_ORDEN' => $DatosSolicitud->FECHA_ORDEN,
            'TOTAL' => $DatosSolicitud->TOTAL
        ];
        //Hacemos la insercion
        $ModeloOrdenes->update($id, $DatosActualizar);

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
        $ModeloOrdenes = new ModeloOrdenes();
        //
        $Ordenes = $ModeloOrdenes->find($id);
        //
        if($Ordenes){
            $ModeloOrdenes->delete($id);

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
