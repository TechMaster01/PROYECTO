<?php

namespace App\Controllers;

use App\Models\ModeloUsuarios;
use CodeIgniter\RESTful\ResourceController;

class ControladorUsuarios extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        //Crear instancia
        $ModeloUsuarios = new ModeloUsuarios();
        //Se recuperan datos
        $Datos['usuarios'] = $ModeloUsuarios->findAll();
        //Retornas datos
        return $this->respond($Datos);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        //Se crea instancia
        $ModeloUsuarios = new ModeloUsuarios();
        //Se recuperan datos por id
        $Datos = $ModeloUsuarios->getWhere(['USUARIO' => $id])->getResult();
        //Se retorna respuesta
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
        $ModeloUsuarios = new ModeloUsuarios();
        //Requerimos los datos
        $Datos = [
            'USUARIO' => $this->request->getVar('USUARIO'),
            'ID_ROL' => $this->request->getVar('ID_ROL'),
            'NOMBRE_USUARIO' => $this->request->getVar('NOMBRE_USUARIO'),
            'DIRECCION' => $this->request->getVar('DIRECCION'),
            'EMAIL' => $this->request->getVar('EMAIL'),
            'CELULAR' => $this->request->getVar('CELULAR'),
            'PASSWORD' => $this->request->getVar('PASSWORD')
        ];
        //Hacemos la insercion
        $ModeloUsuarios->insert($Datos);

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
        $ModeloUsuarios = new ModeloUsuarios();
        //Se solicitan datos
        $DatosSolicitud = $this->request->getJSON();
        //Datos a actualizar
        $DatosActualizar = [
            'USUARIO' => $DatosSolicitud->USUARIO,
            'ID_ROL' => $DatosSolicitud->ID_ROL,
            'NOMBRE_USUARIO' => $DatosSolicitud->NOMBRE_USUARIO,
            'DIRECCION' => $DatosSolicitud->DIRECCION,
            'EMAIL' => $DatosSolicitud->EMAIL,
            'CELULAR' => $DatosSolicitud->CELULAR,
            'PASSWORD' => $DatosSolicitud->PASSWORD
        ];
        //Hacemos la insercion
        $ModeloUsuarios->update($id, $DatosActualizar);

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
        //Se crea la instancia
        $ModeloUsuarios = new ModeloUsuarios();
        //
        $Usuarios = $ModeloUsuarios->find($id);
        //
        if($Usuarios){
            $ModeloUsuarios->delete($id);

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

    public function validador($Usuario, $Password){
        //Crear la instancia
        $ModeloUsuarios = new ModeloUsuarios();
        //
        $Usuarios = $this->request->getJSON();
        
        if($Usuarios){
            $Respuesta = [
                'estatus' => 200,
                'error' => null,
                'mensaje' => ['Satisfactorio' => 'El usuario existe.']
            ];
        }
    }
}
