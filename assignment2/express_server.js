const express = require('express');
const app = express();
const port = 3000;

const quizQuestions = [
    "What is the capital of France?",
    "Who is the author of 'To Kill a Mockingbird'?",
    "What year did the Titanic sink?",
    // Add more questions as needed
];

let currentQuestionIndex = 0;

// Route to serve the landing page with the first question
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to My Quiz</h1>
    <p>${quizQuestions[currentQuestionIndex]}</p>
    <form action="/answer" method="post">
        <input type="text" name="userAnswer" placeholder="Your answer">
        <button type="submit">Submit</button>
    </form>
  `);
});

// Route to handle the submission of answers
app.post('/answer', (req, res) => {
    const userAnswer = req.body.userAnswer;
    // Logic to check the user's answer and provide feedback
    // For simplicity, let's assume the correct answer is always "Paris"
    const correctAnswer = "Paris";
    const feedback = (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) ? "Correct!" : "Incorrect!";

    // Move to the next question
    currentQuestionIndex++;

    // If there are more questions, display the next one
    if (currentQuestionIndex < quizQuestions.length) {
        res.send(`
            <h1>Welcome to My Quiz</h1>
            <p>${quizQuestions[currentQuestionIndex]}</p>
            <p>${feedback}</p>
            <form action="/answer" method="post">
                <input type="text" name="userAnswer" placeholder="Your answer">
                <button type="submit">Submit</button>
            </form>
        `);
    } else {
        // If all questions have been answered, display a completion message
        res.send(`<h1>Congratulations! You have completed the quiz.</h1>`);
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
