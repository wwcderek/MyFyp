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
switch($action){
  case 'getFilm':
  $category = $_GET['category'];
  $sql = "SELECT * FROM Film WHERE category = '$category'";
        $result = mysqli_query($dbconn, $sql);
        while ($row = mysqli_fetch_assoc($result)) {
             $data[] = array(
              'category' => $row['category'],
              'name' => $row['name'],
              'length' => $row['length'],
              'author' => $row['author'],
              'description' => $row['description'],
              'path' => $row['path'],
              'score' => $row['score'],
              'comment' => $row['comment']
             );
        };
         echo json_encode($data);
  break;




}




    }

mysqli_close($dbconn);
?>