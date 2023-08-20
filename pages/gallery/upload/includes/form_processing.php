<?php
/*
  Purpose: The purpose of this file is to provide a picture submission page to the users
  that visit the website.

  When all the fields have been filled, the user will either be prompted with an
  error or the data will be entered in a database and the image will be stored in 
  a file.

  Authors / WorkDone : Gobind Preet Singh / Everything
*/

include 'common/connection.php';

/*
  Purpose: The purpose of this function is to sanitize the user provided data
  and then return the sanitized form of it to the caller.
  
  Parameter: $data - string storing data that needs to be sanitized
  
  Return: $data - string containing data that has been sanitized
  
  Author: Gobind Preet Singh
*/
function sanitize_data($data) {
    // strip white spaces
    $data = trim($data);
    // strip escape characters
    $data = stripslashes($data);
    // convert any html specific characters to entities
    $data = htmlspecialchars($data);
    return $data;    
}

// only run if the data is passed in using post method
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        // sanitize email check that it has a value and check the value against a regular expression.
        // If fails, throw an exception with the description.
        // global variable, email  stores the email
        $email = sanitize_data($_POST['email']);
        if(!isset($_POST['email']) && !preg_match('/^\w+([.-]?\w+)*@\w([.-]?\w+)*(\.\w{2,3})$/', $email)) {
            throw new Exception('Invalid email');
        }
            
        // sanitize user check that it has a value and check the value against a regular expression.
        // If fails, throw an exception with the description.
        // global variable, user stores the user
        $user = sanitize_data($_POST['user']);
        if(!isset($_POST['user']) && !preg_match('/^[A-Za-z]*$/', $user)) {
            throw new Exception('Invalid username');
        }
            
        // sanitize description check that it has a value and check the value against a regular expression.
        // If fails, throw an exception with the description.
        // global variable, Desc stores the description
        $Desc = sanitize_data($_POST['Description']);
        if(!isset($_POST['Description']) && !preg_match('/^[A-Za-z0-9,.;?! ]*$/', $Desc)) {
            throw new Exception('Invalid Description');
        }

        // check the file has been uploaded.
        // If fails, throw an exception with the description.
        if(!isset($_FILES['image'])) {
            throw new Exception('Problem with uploading file');
        }

        // check there was no error while uploading the file.
        // If fails, throw an exception with the description.
        if($_FILES['image']['error']) {
            throw new Exception('File couldn\'t be uploaded. Probably because file too large.');
        }

        // define the directory where the images are stored
        // global, uploadDir stores the upload destination
        $uploadDir = './upload/';
        // get the file extension
        // global, file_ext stores the file's extension
        $file_ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        // sanitize the filename and prevent path traversal attacks
        // global, imgnewfile is the santized image name
        $imgnewfile = sanitize_data(pathinfo($_FILES['image']['name'], PATHINFO_BASENAME));
        // global array that defines the type of files that are allowed
        $allowed = ['jpg','jpeg','gif','png'];

        // if the file extension is not allowed, throw an exception with the description.
        if (!(in_array($file_ext, $allowed))) {
            throw new Exception('File extension should only be jpg, png, jpeg'); 
        }

        // If image is too big, throw an exception with the description.
        if($_FILES['image']['size'] > 32000000) {
            throw new Exception('Image size exceeds 32MB');    
        }
        
        // if the file cannot be moved then error.
        // If fails, throw an exception with the description.
        if(!move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir.$imgnewfile)) {
            throw new Exception('File couldn\'t be uploaded, no permissions.'); 
        }

        // prepare a SQL insert statement   
        // global variable stores the prepared sql statement
        $stmt = $conn->prepare('INSERT INTO gallery (user, email, image, Description) VALUES (?, ?, ?, ?)');
        $stmt->bind_param('ssss', $user, $email, $imgnewfile, $Desc);

        // execute it.
        // If execution fails, throw an exception with the description.
        if(!$stmt->execute()) {
            throw new Exception('Too many parameters'); 
        }

        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        // store the error thrown and make a response object
        $res = [
            'type' => 'error',
            'message' => $e->getMessage()
        ];
    } finally  {
        // else make a response object with success
        if(!isset($res)) {
            $res = [
                'type' => 'success',
                'message' => 'Your file has been uploaded successfully!'
            ];
        }
    }
    
}
?>