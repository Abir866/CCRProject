<!--Purpose:This script gets the current date and time. It is called by ajax to update the page with the new date and time without reloading
    Author/Workdone:Toufiq Abir Farhan Tufan (made this simple scrit)
-->
<?php 

$date = date("l, F jS"); 
$time = date('g:ia');
echo "It's $date.<br>
      The time is $time.";	
?>
