<?php
//this is needed during development, because php files need to be compiled on server side
//
header('Access-Control-Allow-Origin: http://localhost:3000');
include "config.php";
$content = $_POST["postContent"];


// Create connection
$con = new mysqli($servername, $username, $password);

// Check connection
if ($con->connect_error) {
  die("Connection failed: " . $con->connect_error);
}


$stmt = $con->prepare("INSERT INTO studienplaner.feedback VALUES ('$content')");
$stmt->execute();
$result = $stmt->get_result();

$result_array = [ "status" => [200]];

//return array via json encode 
echo json_encode($result_array);
   
$con->close();
?>