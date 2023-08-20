<!--
    Gallery
    Purpose: To retrieve images from a database and display the images uploaded by either the conservation team or by users of the conservation site.
    Authors / Work Done: Justin Lemire (From line 23 till end)
                         Gobind Singh (Lines 7 to 22 and line 80, 81)
-->
<?php
/**
 * Purpose: This php segment gets all the data from the gallery table and stores it in the corresponding variables.
 * 
 * Author: Gobind Singh (Only this php segment till line 22 and line 80, 81)
 */
include './common/connection.php';
// global variables to decide the css that is being used
// quiz is for quiz page, submit pic for submit pic and gallery for gallery page
$quiz = $submit_pic = 0;
$gallery = 1;
// statement to get all rows from gallery table
$stmt = $conn->prepare('SELECT user, image, Description FROM gallery');
// execute the query
$stmt->execute();
// store results in variables
$stmt->bind_result($user, $image, $desc);
?>

<!--
Purpose: To display the images pulled from the database in rows of 4.
Parameters: N/A
Return: N/A
-->
<!DOCTYPE html>
<!-- The following 3 items are for the required includes with the websites document_head file, the banner file and navigation bar file. -->
<?php include './common/document_head.php'; ?>
<?php include './common/banner.php'; ?>
<?php include './common/nav.html'; ?>
        <div id="content">
            <div id="container">
                <div id="gallery">
                    <?php 
                        $dir = 'upload/'; //specify the image directory.
                        if(is_dir($dir)){ //check that directory is actually a directory.
                            $count = 1; //Variable for tracking number of images on a line.
                            while ($stmt->fetch()) {
                                if($file != " && $file != '.' && $file != '..'"){ //check for making sure is a file.
                                    $image_path = $dir.$image; //creates and assigns a variable for the path of an image from the directory.
                                    if(is_file($image_path)){ //Checks that the thing being pointed to by image path is a file.
                                    ?>
                                        <!-- This section is to format the cards that display the images (note: Username does not resize with the cards, believe overflow could solve
                                                the problem) -->
                                        <div id="card">                                   
                                            <a href="<?php echo $image_path; ?>"> <!-- Creates a clickable link to a fullsize version of the image contained inside the card. -->
                                                <img src="<?php echo $image_path; ?>" alt="" title="" /> <!-- Displays the image -->   
                                            </a>
                                            <div id="cardinner">
                                                <p><?php echo $desc ?></p> <!-- Shows the description of the image taken from the database. -->
                                                <h4><?php echo $user?></h4> <!-- Shows the username of the person who uploaded the image -->
                                            </div>
                                        </div>
                                        <!--
                                        Purpose: This function will cause the site to move to the next line when 4 image cards have been displayed.
                                        Parameters: Count - Variable for how many cards are on the current line.
                                        Return: Returns an incremented Count value if it is less then 4. 
                                        -->
                                        <?php
                                            if($count%4 == 0){ //if statement to see if count is 4
                                                ?>
                                                <div id="clear"></div> <!-- This line clears the div and is the part that moves to the next line for display. -->
                                            <?php
                                            }
                                            $count++; //increment the count variable.
                                    }
                                }
                            }
          
                        }                       
                    ?>
                </div>
            </div>
        </div>
    </body>
    <?php 
        $stmt->close(); //Close the statement.
        $conn->close(); //Close the connection to the database.
    ?>
</html>