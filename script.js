'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// condition
let totalScore, currentScore, activePlayer, playing;

const init = function () {
  totalScore = [0, 0]; // big score
  currentScore = 0;
  activePlayer = 0; //playing player
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  for (let i = 0; i < totalScore.length; i++) {
    totalScore[i] = 0;
    document.querySelector(`#score--${i}`).textContent = 0;
    document.querySelector(`#current--${i}`).textContent = 0;
  }
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice
btnRoll.addEventListener('click', () => {
  if (playing === true) {
    //1. generate a random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./img/dice-${dice}.png`;

    //3. check 1 number dice ? 'switch' : 'continue';
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch user
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing === true) {
    //1 add current score to player score
    totalScore[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    //2 check score >= 100 or not
    if (totalScore[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //3 if not, switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
