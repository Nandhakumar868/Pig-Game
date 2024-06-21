"use strict";
// Selecting Players

const player0 = document.querySelector(".player-0");
const player1 = document.querySelector(".player-1");

// Selecting Elements
const score0El = document.querySelector(".highScore-0");
const score1El = document.querySelector(".highScore-1");

const current0El = document.querySelector(".current-0");
const current1El = document.querySelector(".current-1");

// Selecting dice
const dice = document.querySelector(".dice");

// Selecting Buttons
const btnNewGame = document.querySelector(".new-game");
const btnRollDice = document.querySelector(".roll-dice");
const btnHold = document.querySelector(".hold");

// Initializing scores
let scores, currentScore, activePlayer, playing;

// Starting Conditions
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  dice.classList.add("hidden");

  player0.classList.remove("player-winner");
  player1.classList.remove("player-winner");
  player0.classList.add("player-active");

  current0El.textContent = 0;
  current1El.textContent = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
};
init();

const switchPlayer = () => {
  document.querySelector(`.current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player-active");
  player1.classList.toggle("player-active");
};

btnRollDice.addEventListener("click", () => {
  if (playing) {
    // Generate a random(from 1 to 6) to display dice and to add current score
    const randomNumber = Math.trunc(Math.random() * 6) + 1;

    // Displaying the dice based on random number
    dice.classList.remove("hidden");
    dice.src = `images/dice-${randomNumber}.png`;

    // Check for dice roll 1
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.querySelector(`.current-${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch Player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`.highScore-${activePlayer}`).textContent =
      scores[activePlayer];

    // Check score is greater than or equal to 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");
      playing = false;
      dice.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

// Resetting the game
btnNewGame.addEventListener("click", init);
