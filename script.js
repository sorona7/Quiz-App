const quizData = [
  {
    question: "What is a variable in programming?",
    options: [
      "A labeleled box that stores infromation",
      "Somthing that repeats code",
      "A type of loop",
      "A CSS selector",
    ],
    answer: 0,
  },

  {
    question: "What can you store inside a variable?",
    options: [
      "Only numbers",
      "Only text",
      "Almost any kind of value",
      "Only true/false values",
    ],
    answer: 2,
  },

  {
    question: "What is an array?",
    options: [
      "A single value stored in a box",
      "A collection of multiple values inside one variable",
      "A type of loop",
      "A function",
    ],
    answer: 1,
  },

  {
    question: "What index does an array start at in JavaScript?",
    options: ["1", "0", "-1", "10"],
    answer: 1,
  },

  {
    question: "Why do we use loops?",
    options: [
      "To stop functions",
      "To create new arrays",
      "To rename variables",
      "To repeat tasks efficiently",
    ],
    answer: 3,
  },

  {
    question: "What does an if statement do?",
    options: [
      "Repeats code multiple times",
      "Checks a condition and runs code only if it is true",
      "Stores multiple values",
      "Defines a reusable function",
    ],
    answer: 1,
  },

  {
    question: "What does the && operator mean?",
    options: [
      "OR — at least one condition must be true",
      "NOT — reverses a condition",
      "AND — both conditions must be true",
      "Stops the code from running",
    ],
    answer: 2,
  },

  {
    question: "What does the ternary operator help us do?",
    options: [
      "Define variables",
      "Write short if/else decisions",
      "Create arrays",
      "Replace loops",
    ],
    answer: 3,
  },

  {
    question: "What is a parameter in a function?",
    options: [
      "The value returned by the function",
      "A placeholder for data the function can receive",
      "A loop used inside the function",
      "The name of the function itself",
    ],
    answer: 1,
  },

  {
    question: "What does return do inside a function?",
    options: [
      "Stops the function and sends a value back",
      "Creates a loop",
      "Creates a new variable",
      "Repeats the function automatically",
    ],
    answer: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let hasSelected = false;

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");

const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

function loadQuestion() {
  hasSelected = false;

  const currentQuestion = quizData[currentQuestionIndex];

  questionContainer.textContent = currentQuestion.question;

  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.classList.add("option-button");

    optionButton.addEventListener("click", () =>
      selectOption(optionButton, index)
    );

    optionsContainer.appendChild(optionButton);
  });

  nextButton.disabled = true;
}

function selectOption(clickedButton, selectedIndex) {
  if (hasSelected) return;
  hasSelected = true;

  const currentQuestion = quizData[currentQuestionIndex];
  const buttons = optionsContainer.querySelectorAll("button");

  buttons.forEach((btn) => (btn.disabled = true));

  if (selectedIndex === currentQuestion.answer) {
    clickedButton.classList.add("correct");
    score++;
  } else {
    clickedButton.classList.add("incorrect");

    buttons[currentQuestion.answer].classList.add("correct");
  }

  nextButton.disabled = false;
}

function showScore() {
  quizContainer.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreElement.textContent = `${score} out of ${quizData.length}`;
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  quizContainer.classList.remove("hidden");
  scoreContainer.classList.add("hidden");
  loadQuestion();
});

loadQuestion();
