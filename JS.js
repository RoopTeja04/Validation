const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("nxt-btn");
const startBtn = document.getElementById("start-btn");

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            {text: "var", correct: false},
            {text: "let", correct: false},
            {text: "const", correct: false},
            {text: " All of the above", correct: true},
        ]
    },
    {
        question: "What is the correct way to write a single-line comment in JavaScript?",
        answers: [
            {text: "// This is a comment", correct: true},
            {text: "/* This is a comment */", correct: false},
            {text: "# This is a comment", correct: false},
            {text: "! This is a comment", correct: false},
        ]
    },
    {
        question: "How do you display a message ('Hello, world!') in the browser using JavaScript?",
        answers: [
            {text: "console.log('hello world!')", correct: false},
            {text: "alert('Hello, world!')", correct: true},
            {text: "document.write('Hello, world!')", correct: false},
            {text: "All of the above", correct: false},
        ]
    },
    {
        question: "What data type is represented by the value 10 in JavaScript?",
        answers: [
            {text: "string", correct: false},
            {text: "number", correct: true},
            {text: "boolean", correct: false},
            {text: "object", correct: false},
        ]
    },
    {
        question: " How do you check if a variable is of a specific data type in JavaScript?",
        answers: [
            {text: "if (variable instanceof type)", correct: false},
            {text:" if (typeof variable === type)", correct: true},
            {text: " if (variable == type) ", correct: false},
            {text: " if (variable = type) ", correct: false},
        ]
    },
    {
        question: "What is the output of the following code: let x = 5 + '10';",
        answers: [
            {text: "15", correct: false},
            {text: "510", correct: true},
            {text: "Error", correct: false},
            {text: "The answer depends on the context", correct: false},
        ]
    },
    {
        question: "How do you create an array in JavaScript that contains the elements 'apple', 'banana', and 'orange'?",
        answers: [
            {text: "let fruits = ['apple', banana', 'orange'];", correct: false},
            {text: "let fruits = ('apple', 'banana', 'orange');", correct: false},
            {text: "let fruits = {apple, banana, orange};", correct: false},
            {text: 'let fruits = ["apple", "banana", "orange"];', correct: true},
        ]
    },
    {
        question: "What is the difference between == and === in JavaScript?",
        answers: [
            {text: "They are the same for all comparisons.", correct: false},
            {text: "== performs type coercion, while === checks for strict equality ", correct: true},
            {text: "== is used for assignment, === is for comparison", correct: false},
            {text: "== is for numbers, === is for strings", correct: false},
        ]
    },
    {
        question: " How do you loop through the elements of an array in JavaScript?",
        answers: [
            {text: "for (let i = 0; i < fruits.length; i++) { ... }", correct: true},
            {text: "while (i < fruits.length) { ... }", correct: false},
            {text: "foreach (fruit in fruits) { ... }", correct: false},
            {text: "There is no built-in way to loop in JavaScript", correct: false},
        ]
    },
    {
        question: "What is the purpose of a function in JavaScript?",
        answers: [
            {text: "To reuse a block of code", correct: false},
            {text: "To organize code and improve readability", correct: false},
            {text: "To pass data between different parts of your program", correct: false},
            {text: "All of the above", correct: true},
        ]
    },
];

document.addEventListener("DOMContentLoaded", () =>{
    nextBtn.classList.add('hide');
});

startBtn.addEventListener("click", startGame);

function startGame(){
    startBtn.classList.add('hide');
    startQuiz()
}

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    showQuestion()
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;  
    currentQuestion.answers.forEach( answer =>{
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach( button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } 
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
});

function handleNextButton(){
    currentQuestionIndex ++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = "you scored " + score + " out of " + questions.length + " !";
    nextBtn.style.display = "none";
}
