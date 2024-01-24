<?php
//this is needed during development, because php files need to be compiled on server side
//
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include "config.php";


// Create connection
$con = new mysqli($servername, $username, $password);

// Check connection
if ($con->connect_error) {
  die("Connection failed: " . $con->connect_error);
}


$stmt = $con->prepare("select * from studienplaner.studiengang");
$stmt->execute();
$result = $stmt->get_result();

$result_array = [];

//convert data to return array
while($row = $result -> fetch_assoc()){

   $result_array_elem = [
      "name" => $row['name'],
      "fpo" => $row['fpo'],
   ];

   array_push($result_array, $result_array_elem);
}

//return result
echo json_encode($result_array);

$con->close();
exit;

?>