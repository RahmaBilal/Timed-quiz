const questions = [
    {
        questionText: "Inside which HTML element do we put the js?",
        options: ["1. <js>", "2. <script>", "3. <JavaScript>", "4. <scripting>"],
        answer: "2. <script>",
    },
    {
        questionText: "Where is the correct place to insert a JavaScript?",
        options: ["1. Both the <head> section and the <body> section are correct", "2. The <body> section", "3.The <head>  section"],
        answer: "1. Both the <head> section and the <body> section are correct",
    },
    {
        questionText: "How do you write Hello World in an alert box?",
        options: ["1. alertBox(“Hello World”);", "2. Msg(“Hello World”);", "3. Alert(“Hello World”);", "4. msgBox(“Hello World”);"],
        answer: "3. Alert(“Hello World”);",
    },
    {
        questionText: "How does a FOR loop start?",
        options: ["1. For (I = 0; I <=5; I++)", "2. For (I <= 5; I++)", "3. For (I = 0; I <=5)", "4. For I = 1 to 5"],
        answer: "1. For (I = 0; I <=5; I++)",
    },
    {
        questionText: "How can you add a comment in a JavaScript?",
        options: ["1. ‘This is a comment", "2. <!—This is a comment —>", "3. //This is a comment"],
        answer: "3. //This is a comment",
    },
    {
        questionText: "Which event occurs when the user clicks on an HTML element?",
        options: ["1. onclick", "2. onmouseover", "3. onmouseclick", "4. onchange"],
        answer: "1. onclick",
    },
    {
        questionText: "Which operator is used to assign a value to a variable?",
        options: ["1. -", "2. *", "3. =", "4. X"],
        answer: "3. =",
    },
];

const leaderboardCard = document.querySelector("#leaderboard-card");
const startCard = document.querySelector("#start-card");
const questionCard = document.querySelector("#question-card");
const scoreCard = document.querySelector("#score-card");

function hideCards() {
    leaderboardCard.setAttribute("hidden", true);
    startCard.setAttribute("hidden", true);
    questionCard.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
}

const resultDiv = document.querySelector("#result-div");
const resultText = document.querySelector("#result-text");

function hideResultText() {
    resultDiv.getElementsByClassName.display = "none";
}

var intervalID;
var time;
var currentQuestion;

document.querySelector("#start-btn").addEventListener("click", startQuiz);

function startQuiz() {
    hideCards();
    questionCard.removeAttribute("hidden");
    currentQuestion = 0;
    displayQuestion();
    
    time = questions.length * 10;

    intervalID = setInterval(countdown, 1000);
    displayTime();
}

function countdown() {
    time--;
    displayTime();
    if (time < 1) {
        endQuiz();
    }
}

const timeDisplay = document.querySelector("#time");
function displayTime() {
    timeDisplay.textContent = time;
}

function displayQuestion() {
    let question = questions[currentQuestion];
    let options = question.options;

    let h2QuestionElement = document.querySelector("#question-txt");
    h2QuestionElement.textContent = question.questionText;

    for (let i = 0; i < options.length; i++) {
        let option = options[i]
        let optionButton = document.querySelector("#option" + i);
        optionButton.textContent = option;
    }
}

document.querySelector("#quiz-options").addEventListener("click", checkAnswer);

function optionIsCorrect(optionButton) {
    return optionButton.textContent === questions[currentQuestion].answer;
}

function checkAnswer(eventObject) {
    let optionButton = eventObject.target;
    resultDiv.style.display = "block";
    if (optionIsCorrect(optionButton)) {
        resultText.textContent = "Correct";
        setTimeout(hideResultText, 1000);
    } else {
        resultText.textContent = "Incorrect";
        setTimeout(hideResultText, 1000);
        if (time >= 10) {
            time = time - 10;
            displayTime();
        } else {
            time = 0;
            displayTime();
            endQuiz();
        }
    }

}