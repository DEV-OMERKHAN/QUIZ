// Question banks
const easyQuestions = [
  { question: "2 + 2 = ?", options: ["3", "4", "5"], answer: 1 },
  { question: "Capital of India?", options: ["Delhi", "Mumbai", "Kolkata"], answer: 0 },
  { question: "Which is a fruit?", options: ["Carrot", "Apple", "Potato"], answer: 1 }
];

const mediumQuestions = [
  { question: "Which tag is used for JavaScript?", options: ["<script>", "<js>", "<javascript>"], answer: 0 },
  { question: "CSS stands for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Styled Sheets"], answer: 0 }
];

const hardQuestions = [
  { question: "What does malloc() do in C?", options: ["Allocates memory", "Frees memory", "Initializes variable"], answer: 0 },
  { question: "Which year was JavaScript created?", options: ["1995", "2000", "1992"], answer: 0 }
];

const extremeQuestions = [
  { question: "Who created Git?", options: ["Linus Torvalds", "Bill Gates", "Mark Zuckerberg"], answer: 0 },
  { question: "Which algorithm is used in RSA?", options: ["Prime factorization", "Sorting", "Hashing"], answer: 0 }
];

// Globals
let currentQuestions = [];
let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const quizContainer = document.getElementById("quiz-container");
const levelSelect = document.getElementById("level-select");
const backBtn = document.getElementById("back-btn"); // new

// Shuffle helper
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Start quiz
function startQuiz(level) {
  if (level === "easy") currentQuestions = shuffle(easyQuestions).slice(0, 3);
  if (level === "medium") currentQuestions = shuffle(mediumQuestions).slice(0, 3);
  if (level === "hard") currentQuestions = shuffle(hardQuestions).slice(0, 3);
  if (level === "extreme") currentQuestions = shuffle(extremeQuestions).slice(0, 3);

  currentIndex = 0;
  score = 0;
  levelSelect.style.display = "none";
  quizContainer.style.display = "block";

  // ensure question/options are visible (they might have been hidden at end)
  questionEl.style.display = "";
  optionsEl.style.display = "";
  nextBtn.style.display = "none";

  resultEl.textContent = "";
  backBtn.style.display = "none"; // hide back button at start
  showQuestion();
}

// Show question
function showQuestion() {
  let q = currentQuestions[currentIndex];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    let btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(btn, i);
    optionsEl.appendChild(btn);
  });
  nextBtn.style.display = "none";
}

// Check answer
function checkAnswer(button, i) {
  let correctIndex = currentQuestions[currentIndex].answer;
  if (i === correctIndex) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    optionsEl.children[correctIndex].classList.add("correct");
  }
  Array.from(optionsEl.children).forEach(b => b.disabled = true);
  nextBtn.style.display = "block";
}

// Next question
nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    showQuestion();
  } else {
    resultEl.textContent = `Quiz Over! You scored ${score} out of ${currentQuestions.length}.`;
    // hide Q&A and next button
    questionEl.style.display = "none";
    optionsEl.style.display = "none";
    nextBtn.style.display = "none";

    // show Back button so user can return to difficulty selection
    backBtn.style.display = "inline-block";
  }
};

// Back button handler: reset and show difficulty selection
backBtn.addEventListener('click', () => {
  // hide quiz container and show level select
  quizContainer.style.display = "none";
  levelSelect.style.display = "block";

  // clear/reset quiz UI
  questionEl.textContent = '';
  optionsEl.innerHTML = '';
  resultEl.textContent = '';

  // reset quiz state variables
  currentIndex = 0;
  score = 0;
  currentQuestions = [];

  // hide back button for next run
  backBtn.style.display = "none";
  // ensure next button is visible for next quiz run (startQuiz will hide it anyway)
  nextBtn.style.display = "inline-block";
});
