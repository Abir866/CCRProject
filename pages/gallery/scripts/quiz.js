/*
  Purpose: These functions are used to create a Quiz-game with three questions along with pictures.
  As the user answers the question, the progress is shown at the bottom right followed by percentage 
  of score at the end of the quiz.

  Reference: www.codeexplained.dev
  Authors: Tahira Tabassum (A00416670)
*/

/*
  Purpose: getElementById in nine lines below returns the element in the Document object that has 
  the id same as parameter.

  Parameter: none
*/

// global variable, start is the starting screen for the quiz
const start = document.getElementById("start");
// global variable, quiz is the quiz div
const quiz = document.getElementById("quiz");
// global variable, question is the question div
const question = document.getElementById("question");
// global variable, emoji is the div that shows emoji
const emoji = document.getElementById("emoji");
// global variable, optionA is the div shows option A
const optionA = document.getElementById("A");
// global variable, optionB is the div shows option B
const optionB = document.getElementById("B");
// global variable, optionC is the div shows option C
const optionC = document.getElementById("C");
// global variable, progress is the div depicts progress
const progress = document.getElementById("progress");
// global variable, scoreDiv is the div that shows the score
const scoreDiv = document.getElementById("scoreContainer");

/*
  Purpose: This creates three questions with image and three different answers for each question

  Parameter: none

*/

// global variable, stores the question objects
let questions = [
    {
        question : "What is the name of this tree?",
        imgSrc : "img/apple.jpg",
        optionA : "Apple tree",
        optionB : "Guava tree",
        optionC : "Mango tree",
        correct : "A"
    },{
        question : "What is this tree called?",
        imgSrc : "img/pear.jpg",
        optionA : "It's a kiwi tree",
        optionB : "It's a pear tree",
        optionC : "It's not a tree",
        correct : "B"
    },{
        question : "What is another name of 'yellow birch trees'?",
        imgSrc : "img/yellowbirch.jpg",
        optionA : "Golden birch",
        optionB : "Swamp birch",
        optionC : "Both A & B",
        correct : "C"
    }
];

/*
  Purpose: Creating variables, one for the first question (which is 0) and one for the last question.
*/
const lastQuestion = questions.length - 1;
// global variable, running question is the current question index
let runningQuestion = 0;
// global variable, count is the count of questions
let count = 0;
// global variable, gauge unit to store unit gauge width
const gaugeUnit = gaugeWidth / questionTime;
// global variable, stores current score
let score = 0;

/*
  Purpose: This function will finally provide with the question to the user.
  It does this by accessing the current question and changing the inner HTML elements
 
  Parameter: none

  Author: Same as Header
*/
function renderQuestion(){
    // ques is the current question object
    let ques = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ ques.question +"</p>";
    emoji.innerHTML = "<img src="+ ques.imgSrc +">";
    optionA.innerHTML = ques.optionA;
    optionB.innerHTML = ques.optionB;
    optionC.innerHTML = ques.optionC;
}

/*
  Purpose: addEventListener function starts the quiz
*/
start.addEventListener("click",startQuiz);

/*
  Purpose: startQuiz function will render the circles at the right bottom corner.

  Parameter: none

  Author: Same as Header
*/
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    showProgress();
}

/*
  Purpose: Progress bar at the bottom right
  
  Parameter: none
*/
function showProgress(){
    progress.innerHTML = "";
    
    // quesIndex is the index of question objects
    for(let quesIndex = 0; quesIndex <= lastQuestion; quesIndex++){
        progress.innerHTML += "<div class='prog' id="+ quesIndex +"></div>";
    }
}
/*
  Purpose: condition for checking answers to calculate the score

  Parameter: 'answer'

   uthor: Same as Header
*/
function checkAns(answer){
    if( answer == questions[runningQuestion].correct){
        score++;
        correctAns();
    }else{
        wrongAns();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        //Quiz ends and shows the score
        calculateScore();
    }
}

/*
  Purpose: When correct answer is provided by user, progress bar at the bottom right shows green

  Parameter: none

  Author: Same as Header
*/
function correctAns(){
    document.getElementById(runningQuestion).style.backgroundColor = "rgb(0,128,0)";
}

/*
  Purpose: When wrong ans provided by user, progress bar at the bottom right shows red

  Parameter: none

  Author: Same as Header
*/
function wrongAns(){
    document.getElementById(runningQuestion).style.backgroundColor = "rgb(255,0,0)";
}

/*
  Purpose: This function calculates the score

  Parameter: none

  Author: Same as Header
*/
function calculateScore() {
    scoreDiv.style.display = "block";
    
    //Calculating the amount of question percent answered
    const scorePerCent = Math.round(100 * score/questions.length);
    
    //Showing emoji to the user based on the score
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
