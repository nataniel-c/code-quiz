
// Create a list of questions with premade answers
const questions = [
    { question: "Question 1", 
        answers: [
            { text: "A", correct: true },
            { text: "B", correct: false },
            { text: "C", correct: false },
            { text: "D", correct: false },
        ]
    },
    { question: "Question 2", 
        answers: [
            { text: "E", correct: "" },
            { text: "F", correct: "" },
            { text: "G", correct: "" },
            { text: "H", correct: "" },
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
// Introduction
const introElement = document.getElementById("intro");

const endElement = document.getElementById("end");

// Elements within the quiz
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const button = [document.getElementById("answer1"), 
    document.getElementById("answer2"), 
    document.getElementById("answer3"), 
    document.getElementById("answer4")];

var currentQuestionIndex = 0;
var currentScore = 0;
var scoreHistory = [];
var timerStarted = false;

function introduceQuiz() {
    currentQuestionIndex = 0;
    currentScore = 0;
    time = 0;
    nextButton.innerHTML = "Start Quiz";
    nextButton.addEventListener("click", startQuiz);
    questionElement.innerHTML = "Coding Quiz Challenge";
    answerButton.style.display = "none";
    var running = 1;
    console.log(running);
}

function startQuiz {
    setInterval(startTimer, 1000);
    askQuestion();
}

function askQuestion() {
    while (currentQuestionIndex < 10) {
        nextButton.innerHTML = "Next Question";
        answerButton.style.display = "";
        var currentQuestion = questions[currentQuestionIndex];
        var questionNumber = currentQuestionIndex++ + 1;
        questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;
        for (var i = 0; i < 4; i++) {
            button[i].innerHTML = currentQuestion.answers[i].text;
            if (currentQuestion.answers[i].correct) {
                button[i].correct = true;
            }
            else {
                button[i].correct = false;
            }
            button[i].addEventListener("click", function(event) {
                var clickedButton = event.target;
                if (clickedButton.correct) {
                    choseCorrect();
                }
                else {
                    choseWrong();
                }
            })
        }
    }
    if (currentQuestionIndex === 10) {
        endGame();
    }
}

function choseCorrect() {
    currentScore = currentScore + 10;
    console.log(currentScore);
    askQuestion();
}

function choseWrong() {
    currentScore = currentScore - 10;
    currentTime = currentTime - 10;
    console.log(currentScore);
    askQuestion();
}

function startTimer() {
    if (timerStarted === false) {
        timerStarted = true;
        var time = 160;
    }
    while (time !== 0 && timerStarted === true) {
        time = time - 1;
    }
}
function endGame() {

}

introduceQuiz();
