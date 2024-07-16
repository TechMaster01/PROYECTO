<?php

namespace App\Controllers;

use App\Models\ModeloUsuarios;
use CodeIgniter\RESTful\ResourceController;

class ControladorLogin extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    public function index()
    {
        //
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        //
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
        //
        $ModeloLogin = new ModeloUsuarios();
        //
        $Datos = [
            'USUARIO' => $this->request->getVar('USUARIO'),
            'PASSWORD' => $this->request->getVar("PASSWORD")
        ];

        $Solicitud = $ModeloLogin->getWhere(['USUARIO' => $Datos['USUARIO']])->getRow();

        if($Solicitud){
            if($Datos['PASSWORD'] == $Solicitud->PASSWORD){
                $resultado = [
                    'estatus' => 200,
                    'error' => null,
                    'mensaje' => ['success' => 'Inicio de Sesión Correcto']
                ];
                return $this->respond($resultado);
            }
            return $this->failUnauthorized("La contraseña no es correcta");
        }else{
            return $this->failNotFound("Recurso no encontrado con el identificador ". $Datos['USUARIO']); 
        }
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
        //
    }
}
