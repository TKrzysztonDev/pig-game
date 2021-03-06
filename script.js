'use strict';

// Variables
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0Score = document.getElementById('current--0');
const player1Score = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
diceEl.classList.add('hidden');

// Functions

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Starting conditions

// Rolling Dice Functionality

btnRoll.addEventListener('click', function() {
    if (playing) {
        // Generate a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        // Display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        console.log(dice);
        // Check if its 1 : if it is switch player
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add(`player--winner`);
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove(`player--active`);
            diceEl.classList.add('hidden');
            playing = false;
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', function() {
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--winner`);
    currentScore = 0;
    activePlayer = 0;

    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

    score0El.textContent = 0;
    score1El.textContent = 0;
    player0Score.textContent = 0;
    player1Score.textContent = 0;

    diceEl.classList.add('hidden');

    scores = [0, 0];
    playing = true;
});