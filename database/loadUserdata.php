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


// Create connection
$con = new mysqli($servername, $username, $password);

// Check connection
if ($con->connect_error) {
  die("Connection failed: " . $con->connect_error);
}


$stmt = $con->prepare("select * from studienplaner.students where username = ?");
$stmt->bind_param("s", $user);
$stmt->execute();
$result = $stmt->get_result();

$result_password = null;
$result_array = null;

//convert data to return array
while($row = $result -> fetch_assoc()){

   //this is for password checking -> later used
   $result_password = $row['pwHash'];

   $result_array = [
      "username" => $row['username'],
      "studiengang" => $row['studiengang'],
      "fpo" => $row['fpo'],
      "belegt" => $row['module_belegt'],
      "bestanden" => $row['module_bestanden'],
      "vertiefung" => $row['vertiefung'],
      "sort" => $row['sort'],
      "theme" => $row['theme'],
   ];
}

//check pwHash value
//if pwHash is null -> user does not exist
if($result_password == null){

   //null
   echo json_encode($result_password);
}
//user exist -> check pwHash value
else{

   //password is correct
   if($result_password == $pass){

      //return result
      echo json_encode($result_array);
   }
   //incorrect password
   else{

      echo json_encode(null);
   }
}

$con->close();
exit;

?>