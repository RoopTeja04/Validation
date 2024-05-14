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
        question: "What is the main concept behind React that allows for efficient UI updates?",
        answers: [
            {text: "Virtual DOM", correct: false},
            {text: "JSX Syntax", correct: false},
            {text: "Unidirectional Data Flow", correct: false},
            {text: "All of the above", correct: true},
        ]
    },
    {
        question: "How many elements can a valid React component return?",
        answers: [
            {text: "Multiple elements wrapped in a single container element", correct: false},
            {text: "Any number of elements", correct: false},
            {text: "Only one element", correct: true},
            {text: "It depends on the component's state", correct: false},
        ]
    },
    {
        question: " What is the mechanism used to pass data from parent to child components in React?",
        answers: [
            {text: "Events", correct: false},
            {text: "State", correct: false},
            {text: "Props", correct: true},
            {text: " Context API (for complex data sharing across unrelated components)", correct: false},
        ]
    },
    {
        question: "How do you manage data that needs to be shared across multiple, non-parent/child component relationships in React?",
        answers: [
            {text: "Props drilling (passing props down a long component hierarchy)", correct: false},
            {text: "State lifting (moving shared state up to a common ancestor component)", correct: false},
            {text: "Context API (provides a way to pass data through the component tree without explicit prop drilling)", correct: false},
            {text: "Both (b) and (c)", correct: true},
        ]
    },
    {
        question: "What is the primary function of the render method in a React component?",
        answers: [
            {text: " To handle user input events", correct: false},
            {text: "To define the component's lifecycle methods", correct: false},
            {text: "To specify the component's UI structure based on its state and props", correct: true},
            {text: "To manage communication between components", correct: false},
        ]
    },
    {
        question: "Which of the following statements is true about state in React?",
        answers: [
            {text: "State can be accessed and modified directly from any component.", correct: false},
            {text: "State is private to the component that defines it.", correct: false},
            {text: "State can be directly passed as props to child components.", correct: false},
            {text: "State updates trigger a re-render of the component and its children.", correct: true},
        ]
    },
    {
        question: "What is the recommended way to handle form input in React?",
        answers: [
            {text: "Directly modifying DOM elements using refs", correct: false},
            {text: "Using controlled components (where the form state is managed by the component)", correct: true},
            {text: "Using uncontrolled components (where the form state is managed by the DOM)", correct: false},
            {text: "It depends on the specific use case", correct: false},
        ]
    },
    {
        question: "What is the purpose of JSX syntax in React?",
        answers: [
            {text: " To define custom HTML elements", correct: false},
            {text: "To create a more readable way to write component structures that resemble HTML", correct: true},
            {text: " To improve performance of React applications", correct: false},
            {text: "To provide type safety to React components", correct: false},
        ]
    },
    {
        question: "What is the most common tool used to bundle and transpile React code for production use?",
        answers: [
            {text: "Webpack", correct: false},
            {text: "Babel", correct: false},
            {text: "React DevTools", correct: false},
            {text: "Both (a) and (b)", correct: true},
        ]
    },
    {
        question: "What are some of the key benefits of using React?",
        answers: [
            {text: " Improved developer experience with JSX and component-based architecture", correct: false},
            {text: "Faster rendering due to virtual DOM and efficient updates", correct: false},
            {text: "Reusable components that promote code maintainability", correct: false},
            {text: "All of the above", correct: true},
        ]
    },
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