const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");  
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const message = document.getElementById("message");

document.addEventListener( 'DOMContentLoaded', () =>{
    nextButton.classList.add('hide');
});

const questions = [
    {
        question: "what is the full form of HTML",
        answers: [
            {text: "Hyper Text Markup Language", correct: true},
            {text: "Hyper Text Mail Language", correct: false},
            {text: "Higher Text Medium Language", correct: false},
            {text: "None", correct: false},
        ]
    },
    {
        question: "what is the extension to save as html file",
        answers: [
            {text: ".css", correct: false},
            {text: ".html", correct: true},
            {text: ".js", correct: false},
            {text: "None", correct: false},
        ]
    },
    {
        question: "what is the extension to save as html file",
        answers: [
            {text: ".css", correct: false},
            {text: ".html", correct: true},
            {text: ".js", correct: false},
            {text: "None", correct: false},
        ]
    }
];

startButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide'); 
    startQuiz();
}
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
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
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score ++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () =>{
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
    nextButton.style.display = "none";
}