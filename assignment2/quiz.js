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
    constructor(questions) {
        this.quizQuestions = questions;
        this.score = 0;
        this.currentQuestionIndex = 0;
    }
}

const startContainer = document.getElementById("start-container");
const questionContainer = document.getElementById("question-container");
const resultsContainer = document.getElementById("results-container");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");

// Function to update the progress bar
function updateProgressBar(quiz) {
    const progress = (quiz.currentQuestionIndex + 1) / quiz.quizQuestions.length * 100;
    console.log(progress)
    document.querySelector('.progress').style.width = progress + '%';
}

// Function to start the quiz
async function startQuiz() {
    try {
        const quiz = await fetchQuestions();
        startContainer.style.display = "none";
        questionContainer.style.display = "block";
        displayQuestion(quiz);
    } catch (error) {
        console.error("Error starting quiz:", error);
    }
}

function displayQuestion(quiz) {
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
    const selectedOption = event.target.innerText;
    const correctAnswer =
        quiz.quizQuestions[quiz.currentQuestionIndex].correctOption;
    if (selectedOption === correctAnswer) {
        quiz.score++;
    }
    quiz.currentQuestionIndex++;
    if (quiz.currentQuestionIndex < quiz.quizQuestions.length) {
        displayQuestion(quiz);
    } else {
        showResults(quiz);
    }
}

function showResults(quiz) {
    questionContainer.style.display = "none";
    document.getElementById("results-container").style.display = "block";
    document.getElementById("score").innerText = quiz.score;
}

function returnToStart() {
    resultsContainer.style.display = "none";
    startContainer.style.display = "block";
}

async function fetchQuestions() {
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple");
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
        return new Quiz(questionArray);
    } catch (error) {
        return console.error("Error fetching questions:", error);
    }
}
