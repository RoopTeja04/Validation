const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const result = document.getElementById("results");

const questions = [
    {
        question: "what does CSS stands for?",
        answers: [
            {text: "Cascading Style Sheets", correct: true},
            {text: "Cascading Scripting Sheets", correct: false},
            {text: "Colourful Style System", correct: false},
            {text: "Creative Style Script", correct: false},
        ]
    },
    {
        question: "How can you change the background color of an element?",
        answers: [
            {text: "background-color: red", correct: true},
            {text: "color: red", correct: false},
            {text: "style:background-color: red", correct: false},
            {text: "background: red", correct: false},
        ]
    },
    {
        question: "Which selectors targets all elements of a specific type(e.g., all paragraphs)?",
        answers: [
            {text: "#id", correct: false},
            {text: ".class", correct: false},
            {text: "element-name", correct: true},
            {text: "none", correct: false},
        ]
    },
    {
        question: "how to add a comment in CSS?",
        answers: [
            {text: "//css", correct: true},
            {text: "/*comment*/", correct: false},
            {text: "(html comment)", correct: false},
            {text: "[comment]", correct: false},
        ]
    },
    {
        question: "what is the correct way to link an external CSS file to an HTML document?",
        answers: [
            {text: " css src='style.css'", correct: false},
            {text:" link rel='stylesheet' href='style.css'", correct: true},
            {text: " style src='style.css' ", correct: false},
            {text: " style type='css' href='style.css' ", correct: false},
        ]
    },
    {
        question: "which property controls the space around an elemet's content ?",
        answers: [
            {text: "padding", correct: true},
            {text: "margin", correct: false},
            {text: "space", correct: false},
            {text: "border", correct: false},
        ]
    },
    {
        question: "how can you select an element with specific ID?",
        answers: [
            {text: ".class-name", correct: false},
            {text: "element-name", correct: false},
            {text: "#id-name", correct: true},
            {text: "[attribute]", correct: false},
        ]
    },
    {
        question: "how can you select all elements that belong a particular class?",
        answers: [
            {text: "#class-name", correct: false},
            {text: ".class-name", correct: true},
            {text: "[class= 'classs-name']", correct: false},
            {text: "class-name", correct: false},
        ]
    },
    {
        question: "what property specifies the font family for an elemet's text?",
        answers: [
            {text: "font", correct: true},
            {text: "text-style", correct: false},
            {text: "font-family", correct: false},
            {text: "text-font", correct: false},
        ]
    },
    {
        question: "which of the following is NOT a valid way to specofy a color value in CSS",
        answers: [
            {text: "RGB", correct: false},
            {text: "Hexadecimal", correct: false},
            {text: "Named color", correct: true},
            {text: "HSL", correct: false},
        ]
    },
];

let currentQuestionIndex = 0;
let score = 0;

document.addEventListener( "DOMContentLoaded", () =>{
    nextBtn.classList.add('hide');
})

startBtn.addEventListener("click", startGame);

function startGame(){
    startBtn.classList.add('hide');
    startQuiz();
}

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestionValue = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1 ;

    questionElement.innerHTML = questionNo + ". " + currentQuestionValue.question;
    currentQuestionValue.answers.forEach(answer =>{
        const button = document.createElement("button");
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