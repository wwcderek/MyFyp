<?php
include_once("dbconn.php");
use CAW\Php as db_con;

	session_start();
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
	$dbconn = db_con\DbConnection::dbconn();
	if (!$dbconn) {
	    die("dbconnection failed: " . mysqli_dbconnect_error());
	} 
	else {

    $action = $_GET['action'];
    
switch ($action) {
     case 'createAccount':
     $name = $_GET['name'];
     $password = $_GET['password'];
     settype($password, "string");
     $password = password_hash($password,PASSWORD_DEFAULT);
     $sql = "INSERT INTO Account (accountName, password, createDt) VALUES ('$name', '$password', NOW())";
     $result = mysqli_query($dbconn, $sql);
     break;

     case 'checkAccount':
     $sql = "SELECT * FROM Account";
     $result = mysqli_query($dbconn, $sql);
     while ($row = mysqli_fetch_assoc($result)) {
         $data[] = array(
          'accountName' => $row['accountName']
         );
     };
     echo json_encode($data);
     break;

     default:
    		# code...
     break;

 }






    }

mysqli_close($dbconn);

?>



