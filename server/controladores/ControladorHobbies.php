<?php
include_once('../controladores/ControladorBase.php');
include_once('../entidades/Hobbies.php');
class ControladorHobbies extends ControladorBase
{
   function crear(Hobbies $hobbies)
   {
      $sql = "INSERT INTO Hobbies (idPersona,descripcion) VALUES (?,?);";
      $parametros = array($hobbies->idPersona,$hobbies->descripcion);
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function actualizar(Hobbies $hobbies)
   {
      $parametros = array($hobbies->idPersona,$hobbies->descripcion,$hobbies->id);
      $sql = "UPDATE Hobbies SET idPersona = ?,descripcion = ? WHERE id = ?;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function borrar(int $id)
   {
      $parametros = array($id);
      $sql = "DELETE FROM Hobbies WHERE id = ?;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      if(is_null($respuesta[0])){
         return true;
      }else{
         return false;
      }

   function leer($id)
   {
      if ($id==""){
         $sql = "SELECT * FROM Hobbies;";
      }else{
      $parametros = array($id);
         $sql = "SELECT * FROM Hobbies WHERE id = ?;";
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_paginado($pagina,$registrosPorPagina)
   {
      $desde = (($pagina-1)*$registrosPorPagina);
      $parametros = array($desde,$registrosPorPagina);
      $sql ="SELECT * FROM Hobbies LIMIT ?,?;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function numero_paginas($registrosPorPagina)
   {
      $sql ="SELECT ceil(count(*)/$registrosPorPagina)as'paginas' FROM Hobbies;";
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }

   function leer_filtrado(string $nombreColumna, string $tipoFiltro, string $filtro)
   {
      switch ($tipoFiltro){
         case "coincide":
            $parametros = array($filtro);
            $sql = "SELECT * FROM Hobbies WHERE $nombreColumna = ?;";
            break;
         case "inicia":
            $sql = "SELECT * FROM Hobbies WHERE $nombreColumna LIKE '$filtro%';";
            break;
         case "termina":
            $sql = "SELECT * FROM Hobbies WHERE $nombreColumna LIKE '%$filtro';";
            break;
         default:
            $sql = "SELECT * FROM Hobbies WHERE $nombreColumna LIKE '%$filtro%';";
            break;
      }
      $respuesta = $this->conexion->ejecutarConsulta($sql,$parametros);
      return $respuesta;
   }
}