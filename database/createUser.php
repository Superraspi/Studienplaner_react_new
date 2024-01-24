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
$pass = $data->password;
$studiengangName = $data->studiengang->name;
$studiengangFPO = $data->studiengang->fpo;
$module_belegt = "";
$module_bestanden = "";
$ver = "Ver";
$sort = "sort";
$theme = "dark";

// Create connection
$con = new mysqli($servername, $username, $password);

// Check connection
if ($con->connect_error) {
  die("Connection failed: " . $con->connect_error);
}

$stmt = $con->prepare("select * from studienplaner.students where username = ?");
$stmt->bind_param("s", $user);
$stmt->execute();

$res = $stmt->get_result()->fetch_assoc();

//user already exists
if($res != null){

    echo json_encode("-1");
    $con->close();
    exit;
}
else{

    //$stmt = $con->prepare("INSERT INTO studienplaner.students (username, pwHash, studiengang, fpo, module_belegt, module_bestanden, vertiefung, sort, theme) VALUES ('vitus','passwort','Informatik B.Sc.','wise20/21','','','Ver','sort','dark')");
    $stmt = $con->prepare("INSERT INTO studienplaner.students (username, pwHash, studiengang, fpo, module_belegt, module_bestanden, vertiefung, sort, theme) VALUES (?,?,?,?,?,?,?,?,?)");
    $stmt->bind_param("sssssssss", $user, $pass, $studiengangName, $studiengangFPO, $module_belegt, $module_bestanden, $ver, $sort, $theme);
    $stmt->execute();
    echo json_encode(["1"]);
}

$con->close();
exit;
?>