// Get button and modal elements
const nextBtn = document.getElementById("next-btn");
const rulesBtn = document.getElementById("rules-btn");
const rulesModal = document.getElementById("rules-modal");
const closeBtn = document.getElementById("close-btn");

const headerSection = document.querySelector(".header");

const choiceBtns = document.querySelectorAll(".choice-btn");
const gameSection = document.querySelector(".game");
const resultSection = document.querySelector(".results");
const result = document.querySelectorAll(".results-result");

const resultWinner = document.querySelector(".results-winner");
const resultText = document.querySelector(".results-text");

const congratsSection = document.querySelector(".congrats");

const scoreboard = document.querySelectorAll(".scoreboard");

if (!localStorage.getItem("myScore")) {
  localStorage.setItem("myScore", 0);
}

if (!localStorage.getItem("pcScore")) {
  localStorage.setItem("pcScore", 0);
}
let myScore = localStorage.getItem("myScore");
let pcScore = localStorage.getItem("pcScore");

const pcScoreDisplay = scoreboard[0].querySelector("h2");
pcScoreDisplay.textContent = pcScore;

const myScoreDisplay = scoreboard[1].querySelector("h2");
myScoreDisplay.textContent = myScore;

//game logic
choiceBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const youChoose = button.dataset.choice;
    //demo need to work on this not final
    const pcChoose = getComputerChoice();
    displayResults([youChoose, pcChoose]);
  });
});

// Function to get computer choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Function to play a single round
function playRound(results) {
  const playerChoice = results[0];
  const computerChoice = results[1];

  if (playerChoice === computerChoice) {
    return [false, false];
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    myScore = localStorage.getItem("myScore");
    myScore++;
    localStorage.setItem("myScore", myScore);
    return [true, false];
  } else {
    pcScore = localStorage.getItem("pcScore");
    pcScore++;
    localStorage.setItem("pcScore", pcScore);

    return [false, true];
  }

  // updateScore();
}

function displayResults(results) {
  result.forEach((resultDiv, id) => {
    resultDiv.innerHTML = `<div class="choice ${results[id]}">
      <img src="./assets/images/${results[id]}.svg" alt="${results[id]}"/>
      </div>`;
  });

  gameSection.classList.toggle("hidden");
  resultSection.classList.toggle("hidden");

  displayWinner(results);
}

function displayWinner(results) {
  const winner = playRound(results);

  if (winner[0] == true && winner[1] == false) {
    resultWinner.innerHTML = `<h3 class="results-text">YOU WIN <br> <span>AGAINST PC</span></h3>
    <button class="play-again">PLAY AGAIN</button>`;
    result[0].classList.toggle("winner");
    nextBtn.style.display = "inline";
  } else if (winner[1] == true && winner[0] == false) {
    resultWinner.innerHTML = `<h3 class="results-text">YOU LOST <br> <span>AGAINST PC</span></h3>
    <button class="play-again">PLAY AGAIN</button>`;
    result[1].classList.toggle("winner");
  } else {
    resultWinner.innerHTML = `<h3 class="results-text">TIE UP</h3>
    <button class="play-again">REPLAY</button>`;
  }

  updateScore();

  resultWinner.classList.toggle("hidden");
  resultSection.classList.toggle("show-winner");

  //play again button
  const playAgain = document.querySelector(".play-again");
  playAgain.addEventListener("click", () => {
    resultSection.classList.toggle("show-winner");
    resultSection.classList.toggle("hidden");
    resultWinner.classList.toggle("hidden");
    result.forEach((resultDiv) => {
      resultDiv.classList.remove("winner");
    });
    nextBtn.style.display = "none";
    gameSection.classList.toggle("hidden");
  });
}

// Function to update scores
function updateScore() {
  pcScoreDisplay.textContent = pcScore;
  myScoreDisplay.textContent = myScore;
}

// Navigate to congrats on winning

nextBtn.addEventListener("click", () => {
  congratsSection.classList.toggle("hidden");
  resultSection.classList.toggle("hidden");
  headerSection.classList.toggle("hidden");
  nextBtn.style.display = "none";
});

//congrats section play again button
const playAgain = document.querySelector(".play-again");
playAgain.addEventListener("click", () => {
  resultSection.classList.toggle("show-winner");
  resultWinner.classList.toggle("hidden");
  result.forEach((resultDiv) => {
    resultDiv.classList.remove("winner");
  });
  headerSection.classList.remove('hidden');
  congratsSection.classList.toggle("hidden");
  gameSection.classList.toggle("hidden");
});

// Show modal when Rules button is clicked
rulesBtn.addEventListener("click", () => {
  rulesModal.style.display = "flex"; // Display the modal
});

// Close modal when Close button is clicked
closeBtn.addEventListener("click", () => {
  rulesModal.style.display = "none"; // Hide the modal
});
