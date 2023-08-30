
// Create a list of questions with premade answers
const questions = [
    { question: "Commonly used data types do NOT include:", 
        answers: [
            { text: "A. Strings", correct: false },
            { text: "B. Booleans", correct: false },
            { text: "C. Alerts", correct: true },
            { text: "D. Numbers", correct: false },
        ]
    },
    { question: "Question 2", 
        answers: [
            { text: "E", correct: true },
            { text: "F", correct: false },
            { text: "G", correct: false },
            { text: "H", correct: false },
        ]
    },
    { question: "", 
        answers: [
            { text: "", correct: "" },
            { text: "", correct: "" },
            { text: "", correct: "" },
            { text: "", correct: "" },
        ]
    },
    { question: "", 
        answers: [
            { text: "", correct: "" },
            { text: "", correct: "" },
            { text: "", correct: "" },
            { text: "", correct: "" },
        ]
    },
    { question: "", 
        answers: [
            { text: "", correct: "" },
            { text: "", correct: "" },
            { text: "", correct: "" },
            { text: "", correct: "" },
        ]
    },
    { question: "", 
        answers: [
            { text: "", correct: "" },
            { text: "", correct: "" },
            { text: "", correct: "" },
            { text: "", correct: "" },
        ]
    },
    { question: "", 
        answers: [
            { text: "", correct: "" },
            { text: "", correct: "" },
            { text: "", correct: "" },
            { text: "", correct: "" },
        ]
    },
    { question: "", 
        answers: [
            { text: "", correct: "" },
            { text: "", correct: "" },
            { text: "", correct: "" },
            { text: "", correct: "" },
        ]
    },
    { question: "", 
        answers: [
            { text: "", correct: "" },
            { text: "", correct: "" },
            { text: "", correct: "" },
            { text: "", correct: "" },
        ]
    },
    { question: "", 
        answers: [
            { text: "", correct: "" },
            { text: "", correct: "" },
            { text: "", correct: "" },
            { text: "", correct: "" },
        ]
    }    
];

// Reference the elements that will be changed in the HTML as the quiz progresses

// Elements outside of the quiz
const introElement = document.getElementById("intro");
const endElement = document.querySelector(".end");
const timeElement = document.getElementById("time");

// Score elements
const scoreElement = document.querySelectorAll(".score");
const scoreListElement = document.querySelector(".score-list")

//B uttons
const backButton = document.getElementById("back");
const clearButton = document.getElementById("clear");
const viewScoresButton = document.getElementById("view-scores");

// Elements within the quiz
const quizElement = document.querySelector(".quiz");
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const choices = [document.getElementById("answer1"), 
    document.getElementById("answer2"), 
    document.getElementById("answer3"), 
    document.getElementById("answer4")];

// Set initial values for variables to be used internally within the script
var currentQuestionIndex = 0;
var currentScore = 0;
var scoreList = [];
var timerStarted = false;
var time = 0;

timeElement.innerHTML = time;
scoreElement[0].innerHTML = currentScore;

viewScoresButton.addEventListener("click", viewScores);

function compareScores(a, b) {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    }
    return 0;
}

function introduceQuiz() {
    currentQuestionIndex = 0;
    currentScore = 0;
    time = 0;
    nextButton.innerHTML = "Start Quiz";
    nextButton.addEventListener("click", startQuiz);
    questionElement.innerHTML = "Coding Quiz Challenge";
    answerButton.style.display = "none";
}

function startQuiz() {
    time = 120;
    timerStarted = true;
    setInterval(runTimer, 1000);
    introElement.style.display = "none";
    nextButton.innerHTML = "Next Question";
    answerButton.style.display = "";
    for (var i = 0; i < 4; i++) {
        choices[i].addEventListener("click", function(event) {
            var clickedButton = event.target;
            if (clickedButton.correct) {
                choseCorrect();
            }
            else if (clickedButton.correct === false) {
                choseWrong();
            }
        })
    }
    askQuestion();
}

function askQuestion() {
    scoreElement[0].innerHTML = currentScore;
    if (currentQuestionIndex < questions.length) {
        var currentQuestion = questions[currentQuestionIndex];
        questionElement.innerHTML = (currentQuestionIndex + 1) + ". " + currentQuestion.question;
        for (var i = 0; i < 4; i++) {
            choices[i].innerHTML = currentQuestion.answers[i].text;
            if (currentQuestion.answers[i].correct) {
                choices[i].correct = true;
            }
            else {
                choices[i].correct = false;
            }
        }
    } else {
        endGame();
    }
}

// Function that changes the value of the timer every second
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

function choseCorrect() {
    currentScore = currentScore + 10;
    currentQuestionIndex = currentQuestionIndex + 1;
    console.log(currentScore);
    askQuestion();
}

function choseWrong() {
    currentScore = currentScore - 10;
    time = time - 10;
    currentQuestionIndex = currentQuestionIndex + 1;
    console.log(currentScore);
    askQuestion();
}

function endGame() {
    timerStarted = false;
    questionElement.innerHTML = "All Done!";
    scoreElement[1].innerHTML = currentScore + time;
    clearInterval(runTimer);
    scoreList.push(currentScore);
    scoreList.sort(compareScores);
    endElement.style.display = "block";
    answerButton.style.display = "none";
    nextButton.style.display = "none";
}

function viewScores() {
    if (timerStarted === false) {
        scoreListElement.style.display = "block";
        quizElement.style.display = "none";
        scoreListElement.innerHTML = scoreList;
        backButton.addEventListener("click", introduceQuiz)
        clearButton.addEventListener("click", function() {
            scoreList = [];
            viewScores();
        })
    }
}

introduceQuiz();
