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

//passed params by the login page
$user = $data->username;
$belegt = $data->module_belegt;
$bestanden = $data->module_bestanden;
$vertiefung = $data->vertiefung;
$sort = $data->sort;
$theme = $data->theme;

/*
$user = "12";
$belegt = "12";
$bestanden = "12";
$vertiefung = "12";
$sort = "12";
$theme = "12";
*/

// Create connection
$con = new mysqli($servername, $username, $password);

// Check connection
if ($con->connect_error) {
  die("Connection failed: " . $con->connect_error);
}


$stmt = $con->prepare("UPDATE studienplaner.students SET module_belegt=?,module_bestanden=?,vertiefung=?,sort=?,theme=? WHERE username = ?");
$stmt->bind_param("ssssss", $belegt, $bestanden, $vertiefung, $sort, $theme, $user);
$stmt->execute();

echo json_encode("success");

$con->close();
exit;

?>