<?php
//this is needed during development, because php files need to be compiled on server side
//
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include "config.php";

// Retrieve the raw POST data
$jsonData = file_get_contents('php://input');
// Decode the JSON data into a PHP associative array
$data = json_decode($jsonData);
// Check if decoding was successful

//passed params from ajax 
$studiengang = $data->studiengang;



// Create connection
$con = new mysqli($servername, $username, $password);

// Check connection
if ($con->connect_error) {
  die("Connection failed: " . $con->connect_error);
}


$stmt = $con->prepare("select * from studienplaner.module where studiengang = ?");
$stmt->bind_param("s", $studiengang);
$stmt->execute();
$result = $stmt->get_result();
$result_array = [ "modules" => [], "specializations" => [] ];

while($row = $result->fetch_assoc()){
   $elem_array = [
      "id" => $row['id'],
      "name" => $row['name'],
      "lp" => $row['leistungspunkte'],
      "ah" => $row['angebotshaeufigkeit'],
      "ess" => $row['empfohlenesSemesterSose'],
      "esw" => $row['empfohlenesSemesterWise'],
      "vorInhalt" => explode(";", $row['id_voraussetzung_inhaltlich']),
      "vorFormal" => explode(";", $row['id_voraussetzung_formal']),
      "vorLeistung" => $row['vorleistung'] == 1 ? true : false,
      "min" => $row['min_punkte'],
      "kat" => $row['katalog'],
      "pflicht" => $row['pflicht_in'],
      "empf" => $row['empfohlen_fuer'],
      "nicht" => $row['nicht_fuer'],
      "url" => $row['url'],
      "inhalt" => $row['inhalte']
   ];
   array_push($result_array['modules'], $elem_array);
}

$stmt = $con->prepare("select * from studienplaner.vertiefungen where studiengang = ?");
$stmt->bind_param("s", $studiengang);
$stmt->execute();
$result = $stmt->get_result();

while($row = $result->fetch_assoc()) {
   $elem_array = [
      "name" => $row['vertiefung'],
      "short" => $row['id'],
      "lps_other" => $row['lps_other'],
   ];
   array_push($result_array['specializations'], $elem_array);
}

//return array via json encode 
echo json_encode($result_array);
   
$con->close();


?>