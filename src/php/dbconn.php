<?php
namespace CAW\Php;

class DbConnection
{
    public static function dbconn()
    {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbconn = mysqli_connect($servername, $username, $password, "CAW") or die(mysqli_error());
        return $dbconn;
    }

}
?>