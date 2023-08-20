<?php
/*
  Purpose: The purpose of this file is to just create a connection to the mysqli database.

  If the connection is unsuccessful the page dies.

  Authors / WorkDone: Gobind Preet Singh / Everything
*/
    $servername = "localhost";
    $username = "group23I";
    $password = "40CarryBelgiumFlorida";
    $database = "group23I";
    // Create connection
    $conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
?>