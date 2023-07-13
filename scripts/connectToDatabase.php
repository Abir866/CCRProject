<?php
/*connectToDatabase.php
Handles the connection to the Innovative Inventories database.
Values for $dbLocation, $dbUsername, $dbPassword, and
$dbName are assigned in the file mysqldb.inc, which
must be included from a "safe" (but readable) location
which is outside public_html, for security reasons.
*/

require("../scripts/mysqldb.inc");

if (!isset($dbLocation))
{
    echo "Database location is missing.<br>
          Connection script now terminating.";
    exit(0);
}

if (!isset($dbUsername))
{
    echo "Database username is missing.<br>
          Connection script now terminating.";
    exit(0);
}

if (!isset($dbPassword))
{
    echo "Database password is missing.<br>
          Connection script now terminating.";
    exit(0);
}

if (!isset($dbName))
{
    echo "Database name is missing.<br>
          Connection script now terminating.";
    exit(0);
}


$db = mysqli_connect($dbLocation,
$dbUsername,
$dbPassword,
$dbName);


if (mysqli_connect_errno() || ($db == null))
{
printf("Database connection failed: %s<br>
Connection script now terminating.",
mysqli_connect_error());
exit(0);
}
else
{
//echo "Connected!\n";
//mysqli_close($db);
//echo "Database closed!\n";
//exit(0);
}
/*
*/
?>