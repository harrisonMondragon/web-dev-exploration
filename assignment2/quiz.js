class User {
    constructor(username) {
        this.username = username;
    }
}

class Question {
    constructor(question, options, correctOption) {
        this.question = question;
        this.options = options;
        this.correctOption = correctOption;

        // Add the answer to options and randomize the order
        options.push(correctOption);
        options.sort(() => Math.random() - 0.5);
    }
}

class Quiz {
    constructor(questions, name, user) {
        this.quizQuestions = questions;
        this.quantity = questions.length;
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.questionAnswered = false;
        this.name = name;
        this.user = user;
    }
}

const quizContainer = document.getElementById("quiz-container");
const usernameContainer = document.getElementById("username-container");
const startContainer = document.getElementById("start-container");
const questionContainer = document.getElementById("question-container");
const resultsContainer = document.getElementById("results-container");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const correctAnswerContainer = document.getElementById(
    "correct-answer-container"
);
const quizHistoryElement = document.getElementById("quiz-history-item");
const usernameElement = document.getElementById("username-input");

let quiz;
let username = "test";

// Function to update the progress bar
function updateProgressBar(quiz) {
    const progress =
        ((quiz.currentQuestionIndex + 1) / quiz.quizQuestions.length) * 100;
    console.log(progress);
    document.querySelector(".progress").style.width = progress + "%";
}

function grabUsername() {
    username = usernameElement.value;
    if (username === "") {
        username = "test";
    }
    console.log(username);
    usernameContainer.style.display = "none";
    startContainer.style.display = "block";
}

function showQuizHistory() {
    const quizHistory = JSON.parse(localStorage.getItem(username)) || [];
    quizHistoryElement.innerHTML = "";
    quizHistory.forEach((quizData) => {
        const listItem = document.createElement("p");
        listItem.textContent = `${quizData.name} - Score: ${quizData.score}/${quizData.quantity}`;
        quizHistoryElement.appendChild(listItem);
    });
}

// Function to start the quiz
async function startQuiz() {
    try {
        quiz = await fetchQuestions();
        startContainer.style.display = "none";
        questionContainer.style.display = "block";
        displayQuestion(quiz);
    } catch (error) {
        console.error("Error starting quiz:", error);
    }
}

function displayQuestion(quiz) {
    correctAnswerContainer.style.display = "none";
    const currentQuestion = quiz.quizQuestions[quiz.currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    optionsElement.innerHTML = "";
    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", (event) => checkAnswer(event, quiz));
        optionsElement.appendChild(button);
    });

    updateProgressBar(quiz);
}

function checkAnswer(event, quiz) {
    if (quiz.questionAnswered) {
        return; // Exit early if the question has already been answered
    }
    let wasCorrect = false;
    const selectedOption = event.target.innerText;
    const correctAnswer =
        quiz.quizQuestions[quiz.currentQuestionIndex].correctOption;
    if (selectedOption === correctAnswer) {
        wasCorrect = true;
        quiz.score++;
    }
    disableOptions(selectedOption, correctAnswer);
    displayCorrectAnswer(quiz, wasCorrect);
}

function disableOptions(selectedOption) {
    const answerButtons = document.querySelectorAll(".option-btn");
    answerButtons.forEach((button) => {
        if (button.innerText === selectedOption) {
            button.classList.add("selected-option");
        }
        button.disabled = true;
    });
}

function displayCorrectAnswer(quiz, wasCorrect) {
    quiz.questionAnswered = true;
    const correctAnswer =
        quiz.quizQuestions[quiz.currentQuestionIndex].correctOption;
    correctAnswerContainer.style.display = "block";
    if (wasCorrect) {
        correctAnswerContainer.style.backgroundColor = "green";
    } else {
        correctAnswerContainer.style.backgroundColor = "red";
    }
    document.getElementById("correct-answer").innerText = correctAnswer;
    document.getElementById("current-score").innerText = quiz.score;
}

function nextQuestion(quiz) {
    console.log("clicked");
    quiz.currentQuestionIndex++;
    if (quiz.currentQuestionIndex < quiz.quizQuestions.length) {
        quiz.questionAnswered = false;
        displayQuestion(quiz);
    } else {
        showResults(quiz);
    }
}

function showResults(quiz) {
    saveDataToBrowser(quiz.score, quiz.quantity, quiz.name, quiz.user);
    questionContainer.style.display = "none";
    document.getElementById("results-container").style.display = "block";
    document.getElementById("score").innerText = quiz.score;
}

function returnToStart() {
    resultsContainer.style.display = "none";
    startContainer.style.display = "block";
}

function saveDataToBrowser(score, quantity, name, username) {
    const jsonData = {
        name: name,
        score: score,
        quantity: quantity,
    };
    let quizHistory = localStorage.getItem(`${username}`);
    quizHistory = quizHistory ? JSON.parse(quizHistory) : [];
    quizHistory.push(jsonData);
    localStorage.setItem(`${username}`, JSON.stringify(quizHistory));
}

async function fetchQuestions() {
    try {
        // URL parameters
        const category = 22; // Extracted category from the URL
        const difficulty = "medium"; // Extracted difficulty from the URL
        const quantity = 2;
        const response = await fetch(
            `https://opentdb.com/api.php?amount=${quantity}&category=${category}&difficulty=${difficulty}&type=multiple`
        );
        const data = await response.json();
        const questionArray = data.results.map(
            (questionData) =>
                new Question(
                    questionData.question,
                    questionData.incorrect_answers,
                    questionData.correct_answer
                )
        );
        console.log(questionArray);
        return new Quiz(
            questionArray,
            JSON.stringify(difficulty + "Geography Quiz"),
            username
        );
    } catch (error) {
        location.reload();
        window.alert(
            "Error fetching questions, you have been redirected to the home page. Please try again in a few moments."
        );
        console.error("here Error fetching questions:", error);
    }
}
