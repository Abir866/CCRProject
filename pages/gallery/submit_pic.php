<!--
    Purpose: A page that allows users to submit pictures of the conservation area, along with
    ability to add a description to their pictures and take credit for their submission.
    
    Author(s) / Work Done: Gobind Singh / Everything
-->

<?php 
// global variables to decide the css that is being used
// quiz is for quiz page, submit pic for submit pic and gallery for gallery page
$quiz = $gallery = 0;
$submit_pic = 1;
// includes the php file that does majority of the form processing and database functionality
require_once './includes/form_processing.php';
// includes the HTML head tag common to all pages
include './common/document_head.php'; 
// includes the common to all pages, banner section
include './common/banner.php'; 
// includes the common to all pages, navbar
include './common/nav.html'; 
?> 

<body>
    <div id="content">
        <h1>Picture Submission Page</h1>
        <!-- div that's only displayed after form processing to show success/failure -->
        <?php if(!empty($res)) { ?>
        <div class="response <?php echo $res["type"]; ?>"><?php echo $res["message"]; ?></div>
        <?php }?>
        <!-- form to upload data to the database -->
        <form action="./submit_pic.php" method="POST" enctype="multipart/form-data">    
            <!-- input field to enter username -->
            <label for="User">Name</label>
            <input type="text" id="User" name="user" placeholder="Your username" pattern="[A-Za-z]*" title= "Letters only" required>

            <!-- input field to enter email -->
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your email" required>

            <!-- input field to enter description -->
            <label for="Description">Description</label>
            <textarea id="Description" name="Description" minlength=10 maxlength=150 placeholder="Write something about the Picture" style="height:200px" title= "Alphabets, digits and punctuations only." required pattern="[A-Za-z0-9,.;?! ]*"></textarea>

            <!-- div tag containing input field to upload images and spans to show filenames and file errors -->
            <div id="img">
                <label for="image">Upload Image</label>
                <input type="file" name="image" id="image" required>
                <span id="file-name"></span>
                <span id="file-error"></span>
            </div>

            <!-- submit button -->
            <input type="submit" value="Submit" onclick="return ValidateFileType()">
        </form>
    </div>
</body>
<!-- javascript to add form checking and manipulating functionality to submit_pic.php -->
<script src="./scripts/submit_pic.js"></script>
</html>