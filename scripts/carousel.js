/**
 * Purpose:This function causes the all the sequetial contents of the game to be displayed in a screen at a time maintaining their correct order
 *         -Sequential content includes the the questions and it's associated optians, the progress bar, the info modal
 * 
 * Author/Work done: Toufiq Abir Farhan Tufan (made the function)      
 */

function carousel()
{
  var i;   // variable for first for loop
  var k;   // variable to index through the dots
  var slides = document.getElementsByClassName("question"); //get all the screens of the game
  var dots =document.getElementsByClassName("dot");    // get all progress dots to be used to cycle through each dot as the screen changes
  var heads = document.getElementsByClassName("qnum"); // get all questions to be used for numbering each question

  var modchange = document.getElementsByClassName("moreinfo");   // get the node element that has the more info class to prevent this elemnt appearing in the result screen

  //Iterating through the slides(screens)and the dots and displaying each screen and dot at a time
  
  for (i = 0; i < slides.length; i++)
  {
    slides[i].style.display = "none";     // slides being used
    
  }
  for(k=0;k<dots.length;k++){
    dots[k].style.backgroundColor="#bbb";    // the dot representing the cureent screen is colored black
   }
  
  index++;
  if (index > slides.length) {index = 1}    
  slides[index-1].style.display = "block";  
  
  
  
  if((index>1) && (index<=6)){
    dots[index-2+(5*dex)].style.backgroundColor="black";
    heads[index-2].innerText="Question"+(index-1);    // heads being used to number the question on each screen
    dex++;
    if(dex > 4){
      dex =0;
    }
   }
   
   // if we are at the 7th screen of the game( the result screen of the game set display to none for the more info)
   
  if(index>=7){
    
    modchange[0].style.display ="none";  // mochange that was declared being used
    
  }
   
}
//Global variables
var index = 0;   // to keep track of screens and to acess elemts of the screen through indexing
var dex = 0;    // a numeric value added to index in order to acess the correct  dot to display for corresponding screen 



