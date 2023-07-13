<!--
  Purpose: This php script allows the creation of contents for the body of the quiz. The contents produced here are 
           are passed into to the game.php for rendering.The script extracts the contents from the question.json file,
           structures these information here using html to give us the fully formed questions with their options 
           of images and gives functionality to the elements made.
           Functionality of Randomizing the options for each question is for the options created.
           Functionality of producing a new set of questions(interms of the random order of the questions and randomized options) in accordane to a new date
           The file includes js script that involves additional structure formation 
           and functionality of these html structures, making up the results section
           of the game(which is answer for each question displayed, and the popup for check answers) and 
           the initial state(time updates of the current time displayer in the game.php file) , play button) of the game.

           Authors / Work Done: 
  Rahabar Mahmud - pop up close() and open()  functionality
  Toufiq Abir Farhan Tufan - Styling, structure, content, functionality of the rest of the sections



The question.json file contains a json object. the key value pairs in it isused as source of textual information and images(only for options) associated to each question and options.
.Each key work as an identity for each question.The number of key value- pairs limits the number of question that could be generated. In this case there are 5 key-value paris and thus the script can produce
5 unique questions. The json object is described below
 "1" consists of an array of question(alphabets), options(alphnumeric),image file destination(ASCII characters)
 "2" consists of an array of question(alphabets), options(alphnumeric),image file destination(ASCII characters)
 "3" consists of an array of question(alphabets), options(alphnumeric),image file destination(ASCII characters)
 "4" consists of an array of question(alphabets), options(alphnumeric),image file destination(ASCII characters)
 "5" consists of an array of question(alphabets), options(alphnumeric),image file destination(ASCII characters)
-->




<div class="w3-panel">


    <?php 
					# This script file is used to deal with the retrieval of question data from 
          #the data base and their functioning( By toufiq)


//create html buttons a choices for the given question
/**
 * Purpose:The purpose of this function is to inject HTML that consists of:
 * a question, 3 images for the question as options,image is clickable button.A group of question and its associated options(images) have 
 * a unique label(the key of json object)
 * 
 * The function ensures images are randomized in the order they appear and which images appear for each question
 * 
 * Parameters:(1)"$c"-  value to be used for the button's value identifying the image of the option
 *            (2)"$a"-  correct value to be used for the button's value identifying the image of the option
 *            (3)"$t"-  text for the question to be made
 *            (4)"$d"-  imagefile destination to be used to associate an image to an option
 *            
 *            (5)"$p2"- a value to be used for the button's value identifying the image of the option  
 *            (6)"$ar"-  an array of all the images extrcted from json file (three of these images to be used as options
 *            (7)"$ind"- a string of numeric value to label the question and its options(images)
 * 
 * Author:  same as file header
 */
function createButtons($c, $a, $t, $d, $p2, $ar, $ind){
  
  $dis =$ar[$ind]; //gets the image of the correct answer for the question from the array
  
  $convert =intval($ind);    // number conversion  of the label to be used as an argument for splicing method topoint to the image with this label
  
  $element =array_splice($ar,$convert-1,1);  // remove the image (the index of the labelled image is always label-1 in the array)
  
  
  
  shuffle($ar);  // randomize the order of the images
  
  $im1=$ar[1];  // pick the first image in the array
  
  $im2=$ar[2];   // pick another image from the array
  
  $button = array("<input class=$a type=\"button\" style=$dis id=$a name=\"button1\" value=$a onclick=set(this)>",
  "<input class=$a type=\"button\" style=$im1 id=$c name=\"button2\" value=$c onclick=set(this)>","<input class=$a type=\"button\" style=$im2
  id=$p2 value=$p2 onclick=set(this)>");   // makes image buttons (image options displayed for each question are labbeled by using 
                                           // correct answer as their classname which will be accessed later 
                                           // on for checking the clicked button's value with the clicked button's class name)with 
                                           //these isolated images and store these buttons in an array to inject them into the html
                                           //once a button is cliked the game moves to the next screen using the set function
  shuffle($button);   // randomize the  order so that the correct image could at any index in the sequence
  echo "<div class ='question'>
        <div style='text-align:center'>
           <h2 class='qnum'>st</h1>
           <span class='dot'></span>
           <span class='dot'></span>
           <span class='dot'></span>
           <span class='dot'></span>
           <span class='dot'></span>
         </div>  
  <h1 class='qhead'>$t</h1>".$button[0].$button[1]."
    <div style=\"margin:10px;\">".
      $button[2]."
    </div>  
   </div>";

}
/**
 * Purpose:Function that retrieves data from the json file to save it to a text file
 *    - text file will be the source of data for the questions for the rest of the day after initial extraction from the json file.
 *    -The text file is overwritten with information from the json file each day
 *    -This is so that a new set of questions are displayed each day
 * 
 * Author: same as the header file
 */


function retrieve_question()
{
  $questions = file_get_contents($_SERVER['CONTEXT_DOCUMENT_ROOT']
              . "/Web"
              . "/resources/question.json");        // gets the file contents in the json file
    $quotes_data = json_decode($questions,true);    // converts the json object read into an associative array to be usable by php


    $f = fopen($_SERVER['CONTEXT_DOCUMENT_ROOT']
              . "/Web"
              . "/resources/question.txt", "w");    //opens the text file to be used to store the read data
    fwrite($f, date("l, F jS") . "\n");             // the current date when the data was read from the json is written so that when reading data from the text file 
                                                   // if the read date gets old (which means the information written in the text file is 24 hours past)we overwrite the file by calling the retrieve  
                                                  // function to get new set of data from the json file


    $random = array_rand($quotes_data,5);         //the assosiative array is reduced to 5 elements(arrays)- which will be the number of questions
    shuffle($random);
    $count = 0;     // to ensure that the elements in the random array 
                    //that will be categorized into options, images, question's text
                    //having respective categorical arrays of their own are later 
                    //accessed sequentially by indexing into the required 
                    //elemnts from these categoric arrays as needed-
                    // first element from each and every categoric arrays together make up the parts of the first question
                    // 2nd elemnet from each and evry categoric arrays together make parts of the second question and so on
                    
    foreach($random as $i){
    $text[$count] =$quotes_data[$i][1];
		$option1[$count] = $quotes_data[$i][0];      // array of all the first elemnet(question) in the 5 arrays gathered
		$option2[$count] = $quotes_data[$i][2];      // array of all the second element(correct answer) in the 5 read from the json file
    $display[$count] = $quotes_data[$i][3];      // array of all the third element in the 5 read from the json file
    $option3[$count] = $quotes_data[$i][4];      // array of all the fourth element in the 5 read from the json file
    $option4[$count] = $quotes_data[$i][5];      // array of all the fifth element in the 5 read from the json file
    $images[strval($count+1)]=$display[$count];   // array of all the sixth element(image) in the 5 read from the json file
		
    
    $question_today =$text[$count]."\n"
    .$option1[$count]."\n"
    .$option2[$count]."\n"
    .$display[$count]."\n"
    .$option3[$count]."\n"
    .$option4[$count]."\n";      # blue print of each of the questions  put together as a sring to be saved in the text file   
    
    fwrite($f, $question_today);
    $count++;
    }
    $count2=0;            # performing the same purpose as 
                          #count- this indexing into each of the categorical arrays and accessing their elements in the order, all first elements accessed first , all second elements accessed next and so on
    foreach($random as $key){
      $imageIndex = strval($count2+1);   # a key acting as a label to the uniqueness of each image associated to a question. 
                                         #This key is to identify the image associated from the image array to the question
      createButtons($option1[$count2], $option2[$count2], $text[$count2], $display[$count2], $option3[$count2], $images, $imageIndex);
      $count2++;
    }
    fclose($f);

}


# If the question text exists, read data of today's question.

if (file_exists($_SERVER['CONTEXT_DOCUMENT_ROOT']
              . "/Web"
              . "/resources/question.txt"))
{
    $f = fopen($_SERVER['CONTEXT_DOCUMENT_ROOT']
              . "/Web"
              . "/resources/question.txt", "r");  // opens the text file for reading data
    $date = trim(fgets($f));  // the current date
    
		# If the saved date in text file matches with current date use the available data in the file 
		# to make the same question
		# otherwise retrieve a new question by calling the retrieve function
    if ($date == date("l, F jS"))
    { 
      # This makes the question from already available data in the text file
      for($i = 0; $i<5; $i++){
        
        $op1[$i] = fgets($f, 5000);            // building an array of all the first option value in the text file
        $op2[$i] = fgets($f, 2000);            // building an array of all the questions  in the text file
				$op3[$i] = fgets($f, 2000);            // building an array of all the correct answer value in the text file
        $disp[$i] = fgets($f, 5000);           // building an array of all the images in the text file
        $op4[$i] = fgets($f, 2000);            // building an array of all the 2nd option in the text file
        $op5[$i] = fgets($f, 2000);            // building an array of all the third option in the text file
        
        
        $k =$i+1;    // same purpose as the count in retrieve function
        
        $img[strval($k)]=$disp[$i];          // building an associative array  of images
				
        
      }
      fclose($f);
      
      for($j=0; $j<count($img); $j++){
        $inx=strval($j+1);  # a key acting as a label to the uniqueness of each image associated to a question. 
                            #This key is to identify the image associated from the image array to the question
        
        createButtons( $op2[$j], $op3[$j], $op1[$j], $disp[$j], $op4[$j], $img, $inx);

      }
				
				
       
    }
    else
    {
      
        fclose($f);
        unlink($_SERVER['CONTEXT_DOCUMENT_ROOT']
              . "/Web"
              . "/resources/question.txt");
         retrieve_question();
    }
}
else
{
  
     retrieve_question();
}
?>


</div>
<!--This script sets up the AJAX infrastructure for 
        requesting time updates from the server(time.php)
        The script is also used to proudce required html, some inline styling that structures
         and gives additional styles to the intial screen (the play button with a background image) 
        of the game and final screen(results view) of the game
        
        -->
<script defer>
// global variables
let Obj = document.getElementsByClassName("qhead"); // get all the element nodes containing 
//the question for later accessing the question itself  for display in the results screen
var counter =
    0; // counter that keeps track of the game so as to ensure the pop-up appweears at the results screen and also index through the nodes containing the question
var request = null; // initialzation for a request object variable
/**
 * Purpose: This function gets the time from the server by
 *    - accessing the content in the time.php scrpt using xml request
 * Author same as the file header
 */
function getCurrentTime() {
    request = new XMLHttpRequest(); // creates a request object
    var url = "./../../scripts/time.php"; // destination to the time php script
    request.open("GET", url, true); // get the content in the script as the request body
    request.onreadystatechange = updatePage; // call update when request is received from the server
    request.send(null);
}
/**
 * Purpose: This function injects html consisting of the current date and time by
 *      -asynchronously updating the page with the xml request body's content 
 * Author same as the header file
 */
function updatePage() {
    if (request.readyState == 4) // request status is OK then do the following
    {
        var dateDisplay = document.getElementById(
            "datetime"); //accessing the elemnt in the game.php where to inject the html
        dateDisplay.innerHTML = request.responseText;
        console.log(request.responseText);
    }
}
getCurrentTime();
setInterval('getCurrentTime()', 60000); // updates the time evry minute

/**
 * Purpose: Sets up the result screen of the game with
 *  - the questions in the order the questions came in the quiz
 *  - correct answers along with each of the question
 *  - pop up to appear
 * 
 * Additionally the functions checks the answers clicked in the quiz and highlights(red or green) 
 * the choosen answers based on the check to
 *  distinguish between questions that the user got right and wrong
 *  Parameter:(1) the element node of the image button clicked (the classname of the button is the value of the correct answer)
 * 
 * Author: same as the file header
 */
function set(a) {
    // if the clicked image button's value matches with the answer for the question then  have the correct answer for this question highlighted as green
    if (a.value == a.className) {
        // skip the play button's value as it also appear
        if (a.value != "Play Quiz") {
            q = Obj[counter].cloneNode(true); // clone the indexed element node(acessing the current question answered)
            q.setAttribute("class", "null");
            l = s.appendChild(q); // add the clone-(element containg the question) to the result screen 
            g = s.appendChild(document.createElement(
                "p")); // apped an element that would contain the choosen answer to the question in the quiz

            g.setAttribute("class", "right"); // label the element that has the chosen answer for this question

            g.innerText = a.value;
            counter++;
        }

        carousel(); // each time the carousel function is called the game moves to the next screen
        //if 6 screens have been passed display the pop up
        if (counter == 5) {
            openPopup();
        }
        // otherwise if the clicked image button's value doesn't match with 
        //the answer for the question then  have the correct answer for this question highlighted as red
    } else {

        if (a.value != "Play Quiz") {
            y = Obj[counter].cloneNode(
                true); // clone the indexed element node (acessing the the current question answered)
            y.setAttribute("class", "null");
            z = s.appendChild(y); // add the clone-(element containg the question) to the result screen
            x = s.appendChild(document.createElement(
                "p")); // apped an element that would contain the chosen answer to the question in the quiz
            x.setAttribute("class", "wrong");

            x.innerText = a.value;
            counter++;
        }

        carousel(); // move to the next screen
        //if 6 screens have been passed display the pop up
        if (counter == 5) {
            openPopup();
        }

    }


}

function validate() {
    console.log("Validation code is executing.");
}
let play = document.getElementsByClassName("question"); // the initial screen to be made part of the question class
p = document.createElement("div"); // the div that is going to have the question class

play[0].parentElement.insertBefore(p, play[0]); // append this screen at the start of the quiz
p.setAttribute("class", "question");
p.classList.add("mystyle");
d = p.appendChild(document.createElement("div")); // a div that will contain the play button and it's background image
d.style.height = "120px";
c = d.appendChild(document.createElement("input")); // the play button
c.setAttribute("type", "button");
c.setAttribute("value", "Play Quiz");
c.setAttribute("class", "Play Quiz");
c.setAttribute("onclick", "set(this)");
c.style.margin = "45px 125px";
c.style.width = "200px";
c.style.display = "block";
c.style.fontSize = "x-large";
c.style.height = "50px";
c.style.borderRadius = "25px";
c.style.webkitTextFillColor = "#32a2a8";

pa = document.createElement("div"); // the final screen of the quiz( results view)
// global variable
s = play[0].parentElement.appendChild(pa); //append it at the end of the quiz
s.setAttribute("class", "question");


/**
 * This function is used to add the the class open-popup to our pop-up div.
 * I have added some css in the css file for the class open-popup. It makes the
 * pop-up scale in size and animate itself to the center of the page.
 * The pop was initially scaled down to 0.1 and was hidden under the menu bar
 * The user can then click the button on the popup to go back to the main estore page.
 * 
 * Author: Rahabar Mahmud
 */
function openPopup() {
    popup.classList.add('open-popup');
}


/**
 * This function is used to remove the open-popup class from our pop-up div. It will make our
 * popup scale back to 0.1 and go and hide itself under the menubar again until the user checksout again.
 * 
 * Author: Rahabar Mahmud
 */
function closePopup() {
    popup.classList.remove('open-popup');
}
</script>