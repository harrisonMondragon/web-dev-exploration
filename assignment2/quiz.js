let quiz;
let user;
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

class User {
    constructor() {
        this.username = this.grabUsername();
    }

    grabUsername() {
        let username = usernameElement.value;
        username = username === "" ? "user" : username;
        usernameContainer.style.display = "none";
        startContainer.style.display = "block";
        return username;
    }

    showQuizHistory() {
        const quizHistory =
            JSON.parse(localStorage.getItem(this.username)) || [];
        quizHistoryElement.innerHTML = "";
        quizHistory.forEach((quizData) => {
            const quizItem = document.createElement("p");
            quizItem.textContent = `${quizData.name} - Score: ${quizData.score}/${quizData.quantity}`;
            quizHistoryElement.appendChild(quizItem);
        });
    }

    saveDataToBrowser(score, quantity, name) {
        const dataToSave = {
            score: score,
            quantity: quantity,
            name: name,
        };
        let quizHistory = localStorage.getItem(this.username);
        quizHistory = quizHistory ? JSON.parse(quizHistory) : [];
        quizHistory.unshift(dataToSave);
        localStorage.setItem(this.username, JSON.stringify(quizHistory));
    }
}

class Question {
    constructor(question, options, correctOption) {
        this.question = question;
        this.options = options;
        this.correctOption = correctOption;
        options.push(correctOption);
        options.sort(() => Math.random() - 0.5);
    }
}

class Quiz {
    constructor(questions, name) {
        this.quizQuestions = questions;
        this.quantity = questions.length;
        this.score = 0;
        this.currentQuestionIndex = -1;
        this.name = name;
    }

    startQuiz() {
        startContainer.style.display = "none";
        questionContainer.style.display = "block";
        this.nextQuestion();
    }

    nextQuestion() {
        const nextQuestionIterator = this.nextQuestionGenerator().next();
        !nextQuestionIterator.done
            ? this.displayQuestion(nextQuestionIterator.value)
            : this.showResults();
    }

    *nextQuestionGenerator() {
        while (this.currentQuestionIndex < this.quizQuestions.length - 1) {
            yield this.quizQuestions[this.currentQuestionIndex++];
        }
    }

    displayQuestion() {
        correctAnswerContainer.style.display = "none";
        const currentQuestion = this.quizQuestions[this.currentQuestionIndex];
        questionElement.innerText = currentQuestion.question;
        optionsElement.innerHTML = "";
        currentQuestion.options.forEach((option) => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("option-btn");
            button.addEventListener("click", (event) =>
                this.checkAnswer(event)
            );
            optionsElement.appendChild(button);
        });
        this.updateProgressBar();
    }

    checkAnswer(event) {
        let wasCorrect = false;
        const selectedOption = event.target.innerText;
        const correctAnswer =
            this.quizQuestions[this.currentQuestionIndex].correctOption;
        if (selectedOption === correctAnswer) {
            wasCorrect = true;
            this.score++;
        }
        this.disableOptions(selectedOption);
        this.displayCorrectAnswer(wasCorrect);
    }

    updateProgressBar() {
        const progress =
            (this.currentQuestionIndex / this.quizQuestions.length) * 100 + 10;
        document.querySelector(".progress").style.width = progress + "%";
    }

    disableOptions(selectedOption) {
        const answerButtons = document.querySelectorAll(".option-btn");
        answerButtons.forEach((button) => {
            if (button.innerText === selectedOption) {
                button.classList.add("selected-option");
            }
            button.disabled = true;
        });
    }

    displayCorrectAnswer(wasCorrect) {
        const correctAnswer =
            this.quizQuestions[this.currentQuestionIndex].correctOption;
        correctAnswerContainer.style.display = "block";
        correctAnswerContainer.style.backgroundColor = wasCorrect
            ? "green"
            : "red";
        document.getElementById("correct-answer").innerText = correctAnswer;
        document.getElementById("current-score").innerText = this.score;
    }

    showResults() {
        user.saveDataToBrowser(this.score, this.quantity, this.name);
        questionContainer.style.display = "none";
        resultsContainer.style.display = "block";
        document.getElementById("score").innerText = this.score;
    }

    returnToStart() {
        resultsContainer.style.display = "none";
        startContainer.style.display = "block";
    }
}

function setupQuiz() {
    user = new User();
}

async function runQuiz() {
    quizQuestions = await fetchQuestions();
    quiz = new Quiz(quizQuestions, "Medium Geography Quiz");
    quiz.startQuiz();
}

async function fetchQuestions() {
    try {
        const response = await fetch(
            "https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple"
        );
        const data = await response.json();
        const questionArray = data.results.map((questionData) => {
            return new Question(
                decodeString(questionData.question),
                questionData.incorrect_answers.map((option) =>
                    decodeString(option)
                ),
                decodeString(questionData.correct_answer)
            );
        });
        return questionArray;
    } catch (error) {
        location.reload();
        window.alert(
            "Error fetching questions, you have been redirected to the home page. Please try again in a few moments."
        );
        console.error("Error fetching questions:", error);
    }

    function decodeString(string) {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = string;
        return tempElement.textContent;
    }
}
