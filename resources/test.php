
 /**
 This file is the quiz that uses the database to get the question
 The date is essential to update the page regularly with new questions from the database
 
 By Toufiq
  */  
  
  <script>
        //This script sets up the AJAX infrastructure for 
        //requesting time updates from the server(time.php).
        //and to make the created buttons functionable
        //By Toufiq
        var request = null;
        function getCurrentTime()
        {
            request = new XMLHttpRequest();
            var url = "scripts/time.php";
            request.open("GET", url, true);
            request.onreadystatechange = updatePage;
            request.send(null);
        }
        function updatePage()
        {
            if (request.readyState == 4)
            {
                var dateDisplay = document.getElementById("datetime");
                dateDisplay.innerHTML = request.responseText;
            }
        }
        getCurrentTime();
        setInterval('getCurrentTime()', 60000)
				
				// function get the current time from the sever
        function set(a) {
  let abcObj = document.getElementById("abc");
    
    if(a.value == a.className){
      alert('correct');
      carousel()
    }else{
      alert('Wrong');
    }
    
    let play = document.getElementsByClassName("question");
    console.log(play[0]);
  // a.addEventListener("blur", validate);
}

function validate() {
  console.log("Validation code is executing.");
}
        
      </script>
  
  <div class="w3-panel">

          
					<?php 
					// This script file is used to deal with the retrieval of question data from 
//the data base and their functioning( By toufiq)


echo is_writable(['CONTEXT_DOCUMENT_ROOT']
. "/Web"
. "/resources/question.txt");

file_write("question.txt", "Lets see if it is writable or not");
function file_write($filename, $content) {
  if (!is_writable($filename)) {
      if (!chmod($filename, 0666)) {
           echo "Cannot change the mode of file ($filename)";
           exit;
      };
  }
  if (!$fp = @fopen($filename, "w")) {
      echo "Cannot open file ($filename)";
      exit;
  }
  if (fwrite($fp, $content) === FALSE) {
      echo "Cannot write to file ($filename)";
      exit;
  }
  if (!fclose($fp)) {
      echo "Cannot close file ($filename)";
      exit;
  }
}
//create html buttons a choices for the given question
function createButtons($c, $a, $t, $d, $p2, $p3){
    
    echo "<div class ='question w3-half'>
         <h1>$t</h1>
         <input class=$a type=\"button\" style=$d id=$a name=\"button1\" value=$a onclick=set(this)>
         <input class=$a type=\"button\" style=$d id=$c name=\"button2\" value=$c onclick=set(this)>
          <div style=\"margin-top:10px;\">
            <input class=$a type=\"button\" 
             style=\"background-image:url('resources/gear1.png');height:190px; display:block;
             background-size:450px 190px; margin:auto; font-size:4em;\"
             id=$p2 value=$p2 onclick=set(this)>
          </div>  
         </div>";
         
     
         
}
# Function that retrieves data from the mongoDB database to make a question and
# returns the question 
function retrieve_question()
{
  $questions = file_get_contents($_SERVER['CONTEXT_DOCUMENT_ROOT']
              . "/Web"
              . "/resources/question.json");
    $quotes_data = json_decode($questions,true);
  

    $f = fopen($_SERVER['CONTEXT_DOCUMENT_ROOT']
              . "/Web"
              . "/resources/question.txt", "w");
    
    $dt = date("l, F jS");
    $GLOBALS['dt'];
    $random = array_rand($quotes_data,2);
    foreach($random as $i){
    $text =$quotes_data[$i][1];
		$option1 = $quotes_data[$i][0];
		$option2 = $quotes_data[$i][2];
    $display = $quotes_data[$i][3];
    $option3 = $quotes_data[$i][4];
    $option4 = $quotes_data[$i][5];

		//$GLOBALS["$option2"] = $option2;
		createButtons($option1, $option2, $text, $display, $option3, $option4);
    
    $question_today =$text."\n"
    .$option1."\n"
    .$option2."\n"
    .$display."\n"
    .$option3."\n"
    .$option4."\n";
    
    fwrite($f, $question_today);
    }
		
    
    fclose($f);
     
}


# If the question text exists, read data of today's question.
# This makes the question from already available data
if (file_exists($_SERVER['CONTEXT_DOCUMENT_ROOT']
              . "/Web"
              . "/resources/question.txt"))
{
    $f = fopen($_SERVER['CONTEXT_DOCUMENT_ROOT']
              . "/submissions/submission07"
              . "/resources/question.txt", "r");
    $date = trim(fgets($f));
		# If the saved date in text file matches with current date use the available data in the file 
		# to make the same question
		# otherwise retrieve a new question by calling the retrieve function
    if ($date == date("l, F jS"))
    {
      for($i = 0; $i<2; $i++){
        
        $op1 = fgets($f, 5000);
        $op2 = fgets($f, 2000);
				$op3 = fgets($f, 2000);
        $disp = fgets($f, 5000);
        $op4 = fgets($f, 2000);
        $op5 = fgets($f, 2000);
        
				createButtons( $op2, $op3, $op1, $disp, $op4, $op5);
        
      }
				//$GLOBALS["$i"]=$op2;
				
        fclose($f);
    }
    else
    {
        fclose($f);
        unlink($_SERVER['CONTEXT_DOCUMENT_ROOT']
              . "/Web"
              . "/resources/question.txt");
        echo retrieve_question();
    }
}
else
{
    echo retrieve_question();
}
?>				
          
          
        </div>
      
      