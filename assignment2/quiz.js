// LOTS OF THIS IS CHATGPT GENERATED -> NEEDS TO BE REFACTORED & CHECKED

// Basic Flow:
// User opens site and a welcome screen is shown with a start quiz button
// User clicks start quiz and the quiz is fetched from the API
// The first question is shown and the user can select an answer
// The user is shown if the answer is correct or not as well as their total score then can click next to move on
// The user is shown the next question and so on until the quiz is finished
// The user is shown their score and can enter their name to save it
// The user can see the high scores of all users
// https://gosnippets.com/snippets/pure-js-css-card-multiple-choice-questions-quiz-layout

class QuizQuestion {
    constructor(question, answer, choices) {
        this.question = question;
        this.answer = answer;
        this.choices = choices;
    }
    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.score = 0;
        this.questionIndex = 0;
    }
    getQuestion() {
        return this.questions[this.questionIndex];
    }
    isEnded() {
        return this.questions.length === this.questionIndex;
    }
    checkAnswer(choice) {
        this.questionIndex++;
        if (this.getQuestion().isCorrectAnswer(choice)) {
            this.score++;
        }
        if (this.isEnded()) {
            console.log("quiz ended");
        }
    }

    beginQuiz() {
        this.questionIndex = 0;
        this.score = 0;
    }
}

class User {
    constructor(username, score) {
        this.username = username;
        this.score = score;
    }
}

async function fetchQuestions() {
    try {
        const response = await fetch(
            "https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple"
        );
        const data = await response.json();
        console.log(data);
        return data.results.map(
            (questionData) =>
                new QuizQuestion(
                    questionData.question,
                    questionData.correct_answer,
                    questionData.incorrect_answers
                )
        );
    } catch (error) {
        return console.error("Error fetching questions:", error);
    }
}

fetchQuestions().then((questions) => {
    const quizObject = new Quiz(questions);
    console.log(quizObject);
});

//console.log(this.quizObject.questions);
