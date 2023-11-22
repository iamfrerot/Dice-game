/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//// SELECTING ELEMENTS
const player0 = document.querySelector(".player-0-panel");
const player1 = document.querySelector(".player-1-panel");

const score0EL = document.querySelector("#score-0");
const score1EL = document.getElementById("score-1");

const current0 = document.getElementById("current-0");
const current1 = document.getElementById("current-1");

const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
//// STARTING CONDITIONS
let scores, activePlayer, currentScore, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  diceEL.classList.add("hidden");
  player0.classList.remove(`winner`);
  player1.classList.remove(`winner`);
  player0.classList.add(`active`);
  player1.classList.remove(`active`);
};
init();

const switchPlayers = function () {
  currentScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("active");
  player1.classList.toggle("active");
};
/// Rolling dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;
    //3.Check for rolled 1:if true, switch to next player

    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore; /// current scorebased on current player
    } else {
      // Switch to the player
      switchPlayers();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score

    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if player 's score is >= 100

    if (scores[activePlayer] >= 100) {
      // Finish
      playing = false;

      diceEL.classList.add("hidden");

      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");
    } else {
      // 3.Switch to the next players
      switchPlayers();
    }
  }
});
btnNew.addEventListener("click", init);
