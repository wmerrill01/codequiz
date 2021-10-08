/*
HOMEWORK
I have a bunch of quiz questions to ask. What is the best way to store all those questions, PLUS the correct answer for each one?
For each question in the quiz:
    //The question itself
    //The possible answers
    //Which answer is correct

Have a process where:

    /When the game starts, a countdown begins
    //A question is selected from the collection
    //All the elements are added to the DOM
    //The user will click on one of the answers
    //Detect that click and determine if the user clicked on the right answer
        //If yes, add some points (read the ReadMe)
        //If no, subtract time from the time remaining
        //Go to the next question


    //repeatable process.^^^ 

After all questions OR after time runs out, show the user their score
High score tracking

*/
var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["a. <js>", "b. <javascript>", "c. <scripting>", "d. <script>"],
        answer: "d. <script>"
    },
    {
        questionText: "What does DOM stand for?",
        choices: ["Document Object Model", "Dark Orange Maggot", "Drunk Old Mom", "Document Only Maker"],
        correctAnswer: "Document Object Model"
    },
    {
        questionText: "Variables are containers for storing _____?",
        choices: ["flowers", "pictures", "data values", "peaches"],
        correctAnswer: "data values"
    },
    {
        questionText: "Which of these is NOT a data type?",
        choices: ["string", "function", "number", "boolean"],
        correctAnswer: "function"
    },
    {
        questionText: "What needs to come after the function name to run it?",
        choices: ["percentage symbol", "quotes", "curly brackets", "parentheses"],
        correctAnswer: "parentheses"
    },
    {
        questionText: "What can be put into objects?",
        choices: ["Arrays", "Strings", "Booleans", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        questionText: "How do you write a comment in JavaScript?",
        choices: ["!This is a comment!", "#This is a comment", "*This is a comment*", "//This is a comment"],
        correctAnswer: "//This is a comment"
    }
];


var timerEl = document.getElementById("timer");
var startbtn = document.getElementById("startButton");
var startDiv = document.getElementById("start");

var quizEl = document.getElementById("quiz-area");
var questionTitle = document.getElementById("questionTop");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");
var correctAns = 0;
var questionNumber = 0;
var questionIndex = 0;

var finalScore = document.getElementById("finalScore");
var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");

var highScoreSection = document.getElementById("highScoreSection");
var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn");
var listOfHighScores = document.getElementById("listOfHighScores");



var timeLeft = 46;


function startQuiz() {
    var timeLeft = 46;
  
    var timeInterval = setInterval(function () {
      
      timeLeft--;
      timerEl.textContent= timeLeft + " seconds remaining.";

      startDiv.style.display = "none";
      quizEl.style.display = "block";
      timerEl.style.display = "block";

  
      if(timeLeft === 0) {
        clearInterval(timeInterval);
        if (questionIndex < questions.length - 1) {
            gameDone();
        }
        
  
      }
      
      if(questionIndex >= questions.length) {
          timerEl.style.display = "none";
      }
    }, 1000);
    showQuiz();
  }

function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].questionText;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

function checkAnswer(correctAnswer) {
    answerCheck.style.display = "block";

    if(questions[questionIndex].correctAnswer === questions[questionIndex].choices[correctAnswer]) {
        correctAns ++;
        answerCheck.textContent ="Correct! You get 1 point!";

    } else {
        timeLeft -= 5;
        timeLeft.textContent = timeLeft;
        answerCheck.textContent ="Wrong. The correct answer is: " + questions[questionIndex].correctAnswer;
    }
    questionIndex ++;
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameDone();
    }
}

function chooseA() { checkAnswer(0);};
function chooseB() { checkAnswer(1);};
function chooseC() { checkAnswer(2);};
function chooseD() { checkAnswer(3);};




  

function gameDone() {
    quizEl.style.display = "none";
    startDiv.style.display = "none";
    timerEl.style.display = "none";
    summary.style.display = "block";

    finalScore.textContent = correctAns;
}

function storeHighScores(event) {
    event.preventDefault();
    if (initialInput.value ==="") {
        alert("Must enter something");
        return;
    }

    startDiv.style.display = "none";
    timer.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");
    var scoresArr;

    if (savedHighScores === null) {
        scoresArr = [];
    } else {
        scoresArr = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArr.push(userScore)

    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);

    showHighScores();

}

function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    quizEl.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";
    
    var savedHighScores = localStorage.getItem("high scores");
    if(savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);
    var storedHighScores = JSON.parse(savedHighScores);

    for (; i< storeHighScores.length; i++){
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}


startbtn.addEventListener("click", startQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function(event) {
    storeHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function() {
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "Cleared!";
    listOfHighScores.setAttribute("style", "font-family: sans-serif; font-style: bold;")
})