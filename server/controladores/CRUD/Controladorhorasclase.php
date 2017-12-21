<?php
include_once('../controladores/ControladorBase.php');
include_once('../entidades/CRUD/HorasClase.php');
class Controladorhorasclase extends ControladorBase
{
   function crear(HorasClase $horasclase)
   {
      $sql = "INSERT INTO HorasClase (idAsignatura,idParalelo,fecha,horas,) VALUES (?,?,?,?,);";
      $fechaNoSQLTime = strtotime($horasclase->fecha);
      $fechaSQLTime = date("Y-m-d H:i:s", $fechaNoSQLTime);
      $horasclase->fecha = $fechaSQLTime;
      $parametros = array($horasclase->idAsignatura,$horasclase->idParalelo,$horasclase->fecha,$horasclase->horas);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function actualizar(HorasClase $horasclase)
   {
      $parametros = array($horasclase->idAsignatura,$horasclase->idParalelo,$horasclase->fecha,$horasclase->horas,$horasclase->id);
      $sql = "UPDATE HorasClase SET idAsignatura = ?,idParalelo = ?,fecha = ?,horas = ? WHERE id = ?;";
      $fechaNoSQLTime = strtotime($horasclase->fecha);
      $fechaSQLTime = date("Y-m-d H:i:s", $fechaNoSQLTime);
      $horasclase->fecha = $fechaSQLTime;
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function borrar(int $id)
   {
      $parametros = array($id);
      $sql = "DELETE FROM HorasClase WHERE id = ?;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }
   }

   function leer($id)
   {
      if ($id==""){
         $sql = "SELECT * FROM HorasClase;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM HorasClase WHERE id = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($pagina,$registrosPorPagina)
   {
      $desde = (($pagina-1)*$registrosPorPagina);
      $sql ="SELECT * FROM HorasClase LIMIT $desde,$registrosPorPagina;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($registrosPorPagina)
   {
      $sql ="SELECT IF(ceil(count(*)/$registrosPorPagina)>0,ceil(count(*)/$registrosPorPagina),1) as 'paginas' FROM HorasClase;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta[0];
   }

   function leer_filtrado(string $nombreColumna, string $tipoFiltro, string $filtro)
   {
      switch ($tipoFiltro){
         case "coincide":
            $parametros = array($filtro);
            $sql = "SELECT * FROM HorasClase WHERE $nombreColumna = ?;";
            break;
         case "inicia":
            $sql = "SELECT * FROM HorasClase WHERE $nombreColumna LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT * FROM HorasClase WHERE $nombreColumna LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT * FROM HorasClase WHERE $nombreColumna LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}