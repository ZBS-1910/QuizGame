const quizData = [
    { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: "Pacific Ocean" },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"], answer: "William Shakespeare" },
    { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: "8" },
    { question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
    { question: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: "7" },
    { question: "What is the chemical symbol for gold?", options: ["Ag", "Au", "Pb", "Fe"], answer: "Au" },
    { question: "Which planet is closest to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], answer: "Mercury" },
    { question: "What is the national animal of India?", options: ["Tiger", "Elephant", "Lion", "Peacock"], answer: "Tiger" },
    { question: "Which year did World War II end?", options: ["1942", "1945", "1948", "1950"], answer: "1945" },
    { question: "Who discovered gravity?", options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"], answer: "Isaac Newton" },
    { question: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Bangkok", "Tokyo"], answer: "Tokyo" },
    { question: "Which is the longest river in the world?", options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"], answer: "Nile River" },
    { question: "How many players are there in a standard football (soccer) team?", options: ["9", "10", "11", "12"], answer: "11" },
    { question: "What is the freezing point of water in Celsius?", options: ["0°C", "32°C", "100°C", "50°C"], answer: "0°C" },
    { question: "Which is the smallest planet in our solar system?", options: ["Mars", "Venus", "Mercury", "Pluto"], answer: "Mercury" }
];


let currentQuestionIndex = 0;
let score = 0;

let questionText, optionsContainer, scoreDisplay, quizContainer, welcomeScreen;

document.addEventListener('DOMContentLoaded', () => {
    questionText = document.getElementById("question-text");
    optionsContainer = document.getElementById("options-container");
    scoreDisplay = document.getElementById("score");
    quizContainer = document.getElementById("quiz-container");
    welcomeScreen = document.getElementById("welcome-screen");

    document.getElementById("start-btn").addEventListener("click", () => {
        welcomeScreen.style.display = "none";
        quizContainer.style.display = "block";
        loadQuestion();
    });
});

function loadQuestion() {
    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = "";

        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option-button");
            button.onclick = () => checkAnswer(button, option);
            optionsContainer.appendChild(button);
        });
    } else {
        showGameOverScreen();
    }
}

function checkAnswer(button, selectedAnswer) {
    const correctAnswer = quizData[currentQuestionIndex].answer;
    const allButtons = optionsContainer.querySelectorAll('.option-button');

    if (selectedAnswer === correctAnswer) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
        allButtons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add("correct");
            }
        });
    }

    scoreDisplay.textContent = `Score: ${score}`;
    allButtons.forEach(btn => btn.disabled = true);

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1500);
}

function showGameOverScreen() {
    quizContainer.innerHTML = `
        <h1>Game Over!</h1>
        <p>Your final score is <strong>${score} / ${quizData.length}</strong></p>
        <h2>${getFinalMessage(score)}</h2>
        <button id="restart-btn">Restart Quiz</button>
        <button id="exit-btn">Exit</button>
    `;

    // Attach event listeners AFTER setting innerHTML
    setTimeout(() => {  // Use setTimeout to ensure the DOM is updated
        const restartButton = document.getElementById("restart-btn");
        const exitButton = document.getElementById("exit-btn");
    
        if (restartButton) {
            restartButton.addEventListener("click", restartQuiz);
        }
    
        if (exitButton) {
            exitButton.addEventListener("click", exitQuiz);
        }
    }, 0);
}


function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.innerHTML = `
        <h1>Quiz Game</h1>  
        <h2 id="question-text"></h2><br>
        <div class="options" id="options-container"></div><br><br><br>
        <p id="score">Score: 0</p>
    `;

    setTimeout(() => { // Ensure DOM is updated before getting elements
        questionText = document.getElementById("question-text");
        optionsContainer = document.getElementById("options-container");
        scoreDisplay = document.getElementById("score");

        const restartButton = document.getElementById("restart-btn");
        const exitButton = document.getElementById("exit-btn");
    
        if (restartButton) {
            restartButton.addEventListener("click", restartQuiz);
        }
    
        if (exitButton) {
            exitButton.addEventListener("click", exitQuiz);
        }
        loadQuestion();
    }, 0);
}

function exitQuiz() {
    quizContainer.innerHTML = `
        <h1>Thank You for Playing!</h1>
        <p>Your final score was <strong>${score} / ${quizData.length}</strong></p>
    `;
}

function getFinalMessage(score) {
    if (score === quizData.length) {
        return "🎉 Excellent! Perfect Score!";
    } else if (score > quizData.length / 2) {
        return "😊 Great Play! Well Done!";
    } else {
        return "😅 Keep Practicing! You can do better!";
    }
}