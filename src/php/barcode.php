<?php
include_once("dbconn.php");
include_once("../../vendor/autoload.php");
use CAW\Php as db_con;
use SimpleSoftwareIO\QrCode\BaconQrCodeGenerator;


session_start();
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$dbconn = db_con\DbConnection::dbconn();

if (!$dbconn) {
    die("dbconnection failed: " . mysqli_dbconnect_error());
} else {
    $action = $_GET['action'];
    switch ($action) {
        case 'create':
                $data = $_GET['data'];
                $id = $_GET['id'];
                $time = date("Y-m-d_H-i-s");
                $filePath =  '/Applications/XAMPP/xamppfiles/htdocs/qr_code/'.$time.'.png'; //It is server's local path, so it is not https
                $storePath = 'http://localhost:8100/qr_code/'.$time.'.png';
                $qrcode2 = new BaconQrCodeGenerator();
                try {
                    if (!file_exists("/Applications/XAMPP/xamppfiles/htdocs/qr_code")){
                        mkdir("/Applications/XAMPP/xamppfiles/htdocs/qr_code", 0777);
                    }
                    $qrcode2->format('png')
                        ->size(400)
                        ->color(255,0,255)
                        //->backgroundColor(255,255,0)
                        //->margin(100)
                        ->errorCorrection('H')
                        ->generate($data, $filePath);
                    $sqldata = serialize($qrcode2);
                    $sql = "INSERT INTO Barcode (qr_code, data, path, created_at, expired_time, user_id) VALUES ('$sqldata', '$data', '$storePath', NOW(), NOW()+(500), '$id')";
                    $result = mysqli_query($dbconn, $sql);
                 }catch(Exception $e){
                    echo "error";
                }
                break;
        case 'getCode':
                $data = $_GET['data'];
                $sql = "SELECT * FROM Barcode WHERE data = '$data'";
                $result = mysqli_query($dbconn, $sql);
            if ($result->num_rows > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $path = $row['path'];
                }
                $data = array(
                    'path'=> $path
                );
                echo json_encode($data);
            }
                break;

        case 'getOneCode':
            date_default_timezone_set('Asia/Hong_Kong');
            $now = date("Y-m-d H:i:s");
            $id = $_GET['id'];
            $time = date("Y-m-d H:i:s");
            $sql = "SELECT * FROM Barcode WHERE user_id = '$id'";
            $result = mysqli_query($dbconn, $sql);
            while ($row = mysqli_fetch_assoc($result)) {
              if(($row['expired_time']-$now)>0)
                $data[] = array(
                    'path' => $row['path'],
                    'end'=> $row['expired_time'],
                    'create' => $row['created_at'],
                    'time' => $now,
                    'zone' => date_default_timezone_get()
                );
            };
            echo json_encode($data);
            break;

        default:
            break;
     }



}

mysqli_close($dbconn);
?>
