class Question {
    constructor(question, options, correctOption) {
        this.question = question;
        this.options = options;
        options.push(correctOption);
        this.correctOption = correctOption;
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
    console.log(quiz);
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
    console.log("here");
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
        const response = await fetch(
            "https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple"
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
        return new Quiz(questionArray);
    } catch (error) {
        return console.error("Error fetching questions:", error);
    }
}

// // LOTS OF THIS IS CHATGPT GENERATED -> NEEDS TO BE REFACTORED & CHECKED

// // Basic Flow:
// // User opens site and a welcome screen is shown with a start quiz button
// // User clicks start quiz and the quiz is fetched from the API
// // The first question is shown and the user can select an answer
// // The user is shown if the answer is correct or not as well as their total score then can click next to move on
// // The user is shown the next question and so on until the quiz is finished
// // The user is shown their score and can enter their name to save it
// // The user can see the high scores of all users
// // https://gosnippets.com/snippets/pure-js-css-card-multiple-choice-questions-quiz-layout

// class Question {
//     constructor(question, answer, choices) {
//         this.question = question;
//         this.answer = answer;
//         this.choices = choices;
//     }
//     isCorrectAnswer(choice) {
//         return this.answer === choice;
//     }
// }

// class Quiz {
//     constructor(questions) {
//         this.questions = questions;
//         this.score = 0;
//         this.questionIndex = 0;
//     }
//     getQuestion() {
//         return this.questions[this.questionIndex];
//     }
//     isEnded() {
//         return this.questions.length === this.questionIndex;
//     }
//     checkAnswer(choice) {
//         this.questionIndex++;
//         if (this.getQuestion().isCorrectAnswer(choice)) {
//             this.score++;
//         }
//         if (this.isEnded()) {
//             console.log("quiz ended");
//         }
//     }

//     beginQuiz() {
//         this.questionIndex = 0;
//         this.score = 0;
//     }
// }

// class User {
//     constructor(username, score) {
//         this.username = username;
//         this.score = score;
//     }
// }

// async function fetchQuestions() {
//     try {
//         const response = await fetch(
//             "https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple"
//         );
//         const data = await response.json();
//         console.log(data);
//         return data.results.map(
//             (questionData) =>
//                 new Question(
//                     questionData.question,
//                     questionData.correct_answer,
//                     questionData.incorrect_answers
//                 )
//         );
//     } catch (error) {
//         return console.error("Error fetching questions:", error);
//     }
// }

// fetchQuestions().then((questions) => {
//     const quizObject = new Quiz(questions);
//     console.log(quizObject);
// });

// //console.log(this.quizObject.questions);

// // Function to display a question
// function displayQuestion() {
//     const question = questions[currentQuestionIndex];
//     const questionTextElement = document.getElementById("question-text");
//     const optionsListElement = document.getElementById("options");

//     // Populate question text
//     questionTextElement.textContent = question.question;

//     // Populate options
//     optionsListElement.innerHTML = "";
//     question.options.forEach((option) => {
//         const li = document.createElement("li");
//         const button = document.createElement("button");
//         button.textContent = option;
//         button.addEventListener("click", () =>
//             checkAnswer(option, question.correctAnswer)
//         );
//         li.appendChild(button);
//         optionsListElement.appendChild(li);
//     });
// }

// // Function to check the answer
// function checkAnswer(selectedAnswer, correctAnswer) {
//     if (selectedAnswer === correctAnswer) {
//         score++;
//     }
//     // Move to the next question or show results
//     if (currentQuestionIndex < questions.length - 1) {
//         currentQuestionIndex++;
//         displayQuestion();
//     } else {
//         showResults();
//     }
// }

// // Function to show the results
// function showResults() {
//     // Display the final score
//     document.getElementById("score").textContent = score;
//     // Redirect to the results page
//     window.location.href = "results.html";
// }
