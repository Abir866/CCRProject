<?php 
/**
 * FormRegistrationProcess.php
 * 
 * This is done to get the registration information from the registration page
 * and pass on an the answers to the database.
 * 
 * Author: Rahabar Mahmud(A00446187)
 */

//initializing everything
$salutation = $firstName = $middleInitial = $lastName = "";
$gender = $email = $phone = $street = "";
$city = $region = $postalCode = "";
$loginName = $password1 = $password2 = "";

//This is used to post information to the SQL database and uses regular expressions
//to ensure all that proper values are used in each case
if($_SERVER["REQUEST_METHOD"] == "POST")
{
    //posting the salutations to the server
    $salutation = sanitized_input($_POST["salutation"]);

    //posting the user's first name
    $firstName = sanitized_input($_POST["firstName"]);
    if(!preg_match("/^[A-Z][A-Za-z '-]*$/", $firstName))
    die("Bad first name!");

    //posting the user's middle name
    $middleInitial = sanitized_input($_POST["middleInitial"]);
    if(!empty($_POST['middleInitial']) && 
    !preg_match("/^[A-Z](\.)?$/", $middleInitial))
    die("Bad middle initial!");

    //posting the last name
    $lastName = sanitized_input($_POST["lastName"]);
    if(!preg_match("/^[A-Z][A-Za-z '-]*$/", $lastName))
    die("Bad last name!");

    //the gender
    $gender = sanitized_input($_POST["gender"]);

    //positing the user's email
    $email = sanitized_input($_POST["email"]);
    if(!preg_match("/^\w+([.-]?\w+)*@\w([.-]?\w+)*(\.\w{2,3})$/", $email))
    die("Bad e-mai!");

    //posting the user's phone number
    $phone = sanitized_input($_POST["phone"]);
    if(!empty($_POST['phone']) && 
    !preg_match("/^((\d{3}-)?\d{3}-\d{4})|\(\d{3}\)\d{3}-\d{4}$/", $phone))
    die("Bad phone number!");

    //posting the address
    $street = sanitized_input($_POST["street"]);
    if(empty($_POST['street']))
    die("Missing street address!");

    $city = sanitized_input($_POST["city"]);
    if(empty($_POST['city']))
    die("Missing city!");

    $region = sanitized_input($_POST["region"]);
    if(!preg_match("/^[A-Z]{2}$/", $region))
    die("Bad region!");

    $postalCode = sanitized_input($_POST["postalCode"]);
    if(!empty($_POST['postalCode']) && 
    !preg_match("/^[A-Z]\d[A-Z] ?\d[A-Z]\d$/", $postalCode))
    die("Bad postal code!");

    //the login name
    $loginName = sanitized_input($_POST["loginName"]);
    if(!preg_match("/^[A-Za-z][A-Za-z0-9]{5,14}$/", $loginName))
    die("Bad login Name!");

    //posting the password from the user
    $password1 = sanitized_input($_POST["password1"]);
    $regex = "/^(?=.*\d)(?=.*[@^_+=[\]:])(?=.*[A-Z])(?=.*[a-z])\S{8,15}$/";
    if(!preg_match($regex, $password1))
        die("Bad first password!");


    //asking for the password a second time to see if they match
    $password2 = sanitized_input($_POST["password2"]);
    $regex = "/^(?=.*\d)(?=.*[@^_+=[\]:])(?=.*[A-Z])(?=.*[a-z])\S{8,15}$/";
    if(!preg_match($regex, $password2))
        die("Bad second password!");


}

/**
 * This is used to trim the spaces, slashes and other special characters before posting the
 * data
 */
function sanitized_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
    
}

//==============main script===================

//the message if the email entered by the user already exists for an account
if (emailAlreadyExists($db, $_POST['email']))
{
    echo "<h3>Sorry, but your e-mail address is already registered
    in our database.To register, you must use a different e-mail address.</h3>";
    
}
//if the 2 passwords entered does not match
else if($_POST['password1'] != $_POST['password2']) 
{
    echo "<h3>Sorry, but the passwords you entered do not match.
    Your attempt to register has failed. Please try again.</h3>"; 
    
}
//posting everything to the database
else
{
   $loginDateTime = date('Y-m-d h:i:s');
   $loginPassword = md5($_POST['password1']);
   $uniqueLoginName = getUniqueLoginName($db, $_POST['loginName']);
   
   if($uniqueLoginName != $_POST['loginName'])
   {
        echo "<h3>Your preferred login name already exists.
        So we have assigned \"$uniqueLoginName\" as your login name./h3>";
   }
   $firstName = str_replace("'", "\'", $firstName);
   $lastName = str_replace("'", "\'", $lastName);

   $query = "INSERT INTO my_Customer
   (
        salutation, first_name, middle_initial, last_name, gender, email,
        phone, street, city, region, postal_code,
        date_time, login_name, login_password

    )
    VALUES
    (
    
        '$salutation', '$firstName', '$middleInitial', '$lastName',
        '$gender', '$email', '$phone',
        '$street', '$city', '$region', '$postalCode',
        '$loginDateTime', '$uniqueLoginName', '$loginPassword'
    );";

    if (mysqli_query($db, $query))
    {
        echo "<h3>Thank you for registering at Saint Margaret's Bay conservation Site.<br>
        Your login userame for our website is
        \"$uniqueLoginName\".<br>
        Remember to record the password you supplied in a safe place.<br>
        To log in and start shopping in our e-store please 
        <a href='pages/formLogin.php'>click here</a>.</h3>";
    }
    else
    {
        echo "<h3>Unable to register: </h3>".mysqli_error($db).
        " Error #".mysqli_errno($db); 
    }
        
} 
mysqli_close($db);


/**
 * This function checks if the email entered by the user already exists.
 * It checks the customer table's email column and checks to find any matching or same
 * email address.
 */
function emailAlreadyExists($db, $email)
{
    $query =
    "SELECT * FROM my_Customer
               WHERE email = '$email'";
    $customers = mysqli_query($db, $query);
    if($customers)
        $numRecords = mysqli_num_rows($customers);
    else
        $numRecords = 0;
    return ($numRecords> 0) ?  true : false;
    
}

/**
 * This function checks if the username entered by the user is unique.
 * If the name is non-unique, then it modifies the name slightly by adding numbers
 * to the end of the name to make the name unique. 
 */
function getUniqueLoginName($db, $loginName)
{
    $uniqueLoginName = $loginName;
    $query =
    "SELECT * FROM my_Customer
               WHERE login_name = '$uniqueLoginName'";
    $customers = mysqli_query($db, $query);
    if($customers)
        $numRecords = mysqli_num_rows($customers);
    else
        $numRecords = 0;
        
    if($numRecords != 0)
    {
        $i = 0;
        do
        {
            $i++;
            $uniqueLoginName = $loginName.$i;
            $query =
            "SELECT * FROM my_Customer
                       WHERE login_name = '$uniqueLoginName'";
            $customers = mysqli_query($db, $query);
            if($customers)
                $numRecords = mysqli_num_rows($customers);
            else
                $numRecords = 0;
            
        } while ($numRecords != 0);
    }
    return $uniqueLoginName;
    
}


?>