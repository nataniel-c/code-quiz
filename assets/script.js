// Create a list of questions with premade answers
const questions = [
    { question: "Commonly used data types do NOT include:", 
        answers: [
            { text: "A. strings", correct: false },
            { text: "B. booleans", correct: false },
            { text: "C. alerts", correct: true },
            { text: "D. numbers", correct: false },
        ]
    },
    { question: "The condition in an if/else statement is enclosed with ______.", 
        answers: [
            { text: "A. quotes", correct: false },
            { text: "B. curly brackets", correct: true },
            { text: "C. parenthesis", correct: false },
            { text: "D. square brackets", correct: false },
        ]
    },
    { question: "Arrays in JavaScript can be used to store ______.", 
        answers: [
            { text: "A. numbers and strings", correct: false },
            { text: "B. other arrays", correct: false },
            { text: "C. booleans", correct: false },
            { text: "D. all of the above", correct: true },
        ]
    },
    { question: "String values must be enclosed within ______ when being assigned to variables.", 
        answers: [
            { text: "A. commas", correct: false },
            { text: "B. curly brackets", correct: false },
            { text: "C. quotes", correct: true },
            { text: "D. parenthesis", correct: false },
        ]
    },
    { question: "A useful tool used during development and debugging for printing content to the debugger is:", 
        answers: [
            { text: "A. JavaScript", correct: false },
            { text: "B. terminal/bash", correct: false },
            { text: "C. for loops", correct: false },
            { text: "D. console.log", correct: true },
        ]
    }    
];

// Define elements in the HTML that will be changed as the quiz progresses
// Elements outside of the quiz
const introElement = document.getElementById("intro");
const endElement = document.querySelector(".end");
const timeElement = document.getElementById("time");

// Score elements. The first score element is used multiple times within the page
const scoreElement = document.querySelectorAll(".score");
const scoreListElement = document.querySelector(".score-list");
const highScores = document.querySelector(".high-scores");

//Buttons
const backButton = document.getElementById("back");
const clearButton = document.getElementById("clear");
const viewScoresButton = document.getElementById("view-scores");
const startButton = document.querySelector(".start-btn");
const submitScore = document.querySelector("#submit");

// Elements within the quiz
const quizElement = document.querySelector(".quiz");
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answers");
const choices = [document.getElementById("answer1"), 
    document.getElementById("answer2"), 
    document.getElementById("answer3"), 
    document.getElementById("answer4")];

// Set initial values for variables to be used internally within the script
var currentQuestionIndex = 0;
var currentScore = 0;
var finalScore = 0;
var scoreList = [
    { names: "",
    scores: ""}
];
var timerStarted = false;
var time = 0;

// Set the values for the displayed time and score on the page to be 0 as defined above
timeElement.innerHTML = time;
for (var i = 0; i < scoreElement.length; i++) {
    scoreElement[i].innerHTML = currentScore;
}

viewScoresButton.addEventListener("click", viewScores);

// Used to sort the stored scores from order of highest to lowest
function compareScores(a, b) {
    if (a < b) {
        return 1;
    } else if (a > b) {
        return -1;
    }
    return 0;
}

// Clears score and question selection index (for repetition)
// Gives user the option to start quiz. Hides all other quiz elements
function introduceQuiz() {
    currentQuestionIndex = 0;
    currentScore = 0;
    introElement.style.display = "";
    quizElement.style.display = "";
    scoreListElement.style.display = "none";
    endElement.style.display = "none";
    for (var i = 0; i < scoreElement.length; i++) {
        scoreElement[i].innerHTML = currentScore;
    }    
    startButton.addEventListener("click", startQuiz);
    questionElement.innerHTML = "Coding Quiz Challenge";
    answerButton.style.display = "none";
}

// Starts timer function concurrently with quiz function
// Hides all introductory information and sets how to handle choosing right and wrong answers
function startQuiz() {
    time = 60;
    timeElement.innerHTML = time;
    timerStarted = true;
    setInterval(runTimer, 1000);
    introElement.style.display = "none";
    startButton.style.display = "none";
    answerButton.style.display = "";
    for (var i = 0; i < 4; i++) {
        choices[i].addEventListener("click", function(event) {
            var clickedButton = event.target;
            if (clickedButton.correct) {
                choseCorrect();
            } else if (clickedButton.correct === false) {
                choseWrong();
            }
        })
    }
    askQuestion();
}

// Changes the displayed question and answer elements to correspond with the current question based on the question index
// Assigns whether an answer element is correct or not correct based on the premade list of quesitons and answers
// Also updates score on top right of page every time user moves on to the next question
function askQuestion() {
    scoreElement[0].innerHTML = currentScore;
    if (currentQuestionIndex < questions.length) {
        var currentQuestion = questions[currentQuestionIndex];
        questionElement.innerHTML = (currentQuestionIndex + 1) + ". " + currentQuestion.question;
        for (var i = 0; i < 4; i++) {
            choices[i].innerHTML = currentQuestion.answers[i].text;
            if (currentQuestion.answers[i].correct) {
                choices[i].correct = true;
            } else {
                choices[i].correct = false;
            }
        }
    } else {
        endGame();
    }
}

// Function that changes the value of the timer every second
// If the quiz is not currently running, the time displayed on the page shall be 0
// When the timer runs out it immediately ends the game 
function runTimer() {
    if (time !== 0 && timerStarted) {
        time = time - 1;
        timeElement.innerHTML = time;
    } else if (timerStarted === false) {
        time = 0;
        timeElement.innerHTML = 0;
    } else if (time <= 0 && timerStarted) {
        endGame();
    }
}

// These two functions handle what to do when the user gets an answer right or wrong
// Also increases the count for the currentQuestionIndex
function choseCorrect() {
    currentScore = currentScore + 10;
    currentQuestionIndex = currentQuestionIndex + 1;
    askQuestion();
}
function choseWrong() {
    currentScore = currentScore - 10;
    time = time - 10;
    currentQuestionIndex = currentQuestionIndex + 1;
    askQuestion();
}

// End game and give user the option to enter initials
function endGame() {
    // Clear the question to show all done
    questionElement.innerHTML = "All Done!";
    // Add the remaining time to the user's score
    var finalScore = currentScore + time;
    scoreElement[0].innerHTML = finalScore;
    scoreElement[1].innerHTML = finalScore;
    // Clear the timer
    timerStarted = false;
    clearInterval(runTimer);
    // Show the end text and form
    endElement.style.display = "block";
    // Hide answers
    answerButton.style.display = "none";
    var userInitials = document.getElementById("initials");
    submitScore.addEventListener("click", function(event) {
        event.preventDefault();
        saveScore(finalScore, userInitials);
    })
}
 
// Handle user input for scorekeeping
function saveScore(savedScore, savedInitials) {
    var newScore = {
        name: savedInitials.value.trim(),
        score: savedScore.value
    };
    Object.assign(scoreList, newScore);
    scoreList = scoreList.sort(
        (s1, s2) => (s1.scores < s2.scores) ? 1 : (s1.scores > s2.scores) ? -1 : 0);
    localStorage.setItem('scoreList', JSON.stringify(scoreList));
}

// Viewing scores will only be possible while not taking the quiz
function viewScores() {
    if (timerStarted === false) {
        scoreListElement.style.display = "block";
        endElement.style.display = "none";
        quizElement.style.display = "none";
        if (scoreList !== null) {
            var highScoreList = JSON.parse(localStorage.getItem('scoreList'));
            for (var i = 0; i < scoreList.length; i++) {
                var place = i + 1;
                highScores.innerHTML =  "<li>" + 
                place + ". " + highScoreList[i].name + " - " + highScoreList[i].score +
                "</li>";
            };
        }
    }
    backButton.addEventListener("click", introduceQuiz)
    clearButton.addEventListener("click", function() {
        scoreList = [
            { names: "",
            scores: ""}
        ];
        viewScores();
    })
}

// Function initializes quiz start page upon loading
introduceQuiz();
