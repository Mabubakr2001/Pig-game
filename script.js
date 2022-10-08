'use strict';

const firPlayer = document.querySelector(".player--0");
const secPlayer = document.querySelector(".player--1");
const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdDiceBtn = document.querySelector(".btn--hold");
const firCurrentScore = document.getElementById("current--0");
const secCurrentScore = document.getElementById("current--1");
const firTotalScore = document.getElementById("score--0");
const secTotalScore = document.getElementById("score--1");
const diceImg = document.querySelector(".dice");
const firPlayerWins = document.querySelector(".wins--0");
const secPlayerWins = document.querySelector(".wins--1");

let isPlaying, currentScore, totalScores, activePlayer;

const gameInit= function () {
    isPlaying = true;
    currentScore = 0;
    totalScores = [0, 0];
    activePlayer = 0;
    firCurrentScore.textContent = 0;
    secCurrentScore.textContent = 0;
    firTotalScore.textContent = 0;
    secTotalScore.textContent = 0;
    firPlayer.classList.remove("player--winner");
    secPlayer.classList.remove("player--winner");
    firPlayer.classList.add("player--active");
    secPlayer.classList.remove("player--active");
    firPlayerWins.textContent = "";
    secPlayerWins.textContent = "";
    diceImg.classList.add("hidden");
}

const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    firPlayer.classList.toggle("player--active");
    secPlayer.classList.toggle("player--active");
    activePlayer = activePlayer === 0 ? 1 : 0;
}

gameInit()

rollDiceBtn.addEventListener("click", () => {
    if (isPlaying) {
        const randomRollNum = Math.trunc(Math.random() * 6) + 1;
        diceImg.src = `images/dice-${randomRollNum}.png`;
        diceImg.classList.remove("hidden");
    
        if (randomRollNum !== 1) {
            currentScore += randomRollNum;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer()
        }
    }
})

holdDiceBtn.addEventListener("click", () => {
    if (isPlaying) {
        totalScores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer];
        if (totalScores[activePlayer] >= 100) {
            isPlaying = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            document.querySelector(`.wins--${activePlayer}`).textContent = `Player ${activePlayer === 0 ? 1 : 2} wins!`;
            diceImg.classList.add("hidden");
        } else {
            switchPlayer()
        }
    }
})

newGameBtn.addEventListener("click", gameInit);