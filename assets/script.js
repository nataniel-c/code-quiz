
// Create a list of questions with premade answers
const questions = [
    { question: "Question 1", 
        answers: [
            { text: "A", correct: "" },
            { text: "B", correct: "" },
            { text: "C", correct: "" },
            { text: "D", correct: "" },
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
var time = 0;

function introduceQuiz() {
    currentQuestionIndex = 0;
    currentScore = 0;
    time = 0;
    nextButton.innerHTML = "Start Quiz";
    nextButton.addEventListener("click", askQuestion);
    questionElement.innerHTML = "Coding Quiz Challenge";
    answerButton.style.display = "none";
    var running = 1;
    console.log(running);
    
}

function askQuestion() {

    nextButton.innerHTML = "Next Question";
    answerButton.style.display = "";
    var currentQuestion = questions[currentQuestionIndex];
    var questionNumber = currentQuestionIndex++ + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;
    for (var i = 0, i < 4, i++) {
        button[i].innerHTML = currentQuestion.answers[i].text;
    }

    
    button[0].addEventListener("click", evaluateAns);


}

function evaluateAns() {
    if 
}


introduceQuiz();
