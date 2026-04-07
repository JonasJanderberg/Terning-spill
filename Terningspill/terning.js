// Terning spill - enkel spill-logikk for terning.html

const btnNew = document.querySelector('.btn-ny');
const btnRoll = document.querySelector('.btn-kast');
const btnHold = document.querySelector('.btn-hold');
const diceEl = document.getElementById('terning');

const playerPanels = [
    document.querySelector('.spiller-0-panel'),
    document.querySelector('.spiller-1-panel')
];

const currentEls = [
    document.getElementById('poeng-0'),
    document.getElementById('poeng-1')
];

const totalEls = [
    document.getElementById('sum-0'),
    document.getElementById('sum-1')
];

let totals, currentScore, activePlayer, playing;
const WIN_SCORE_DEFAULT = 100;

initGame();

btnRoll.addEventListener('click', () => {
    if (!playing) return;
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `img/terning-${dice}.png`;
    diceEl.style.display = 'block';

    if (dice !== 1) {
        currentScore += dice;
        currentEls[activePlayer].textContent = currentScore;
    } else {
        // kastet 1 -> mister tur
        switchPlayer();
    }
});

btnHold.addEventListener('click', () => {
    if (!playing) return;
    totals[activePlayer] += currentScore;
    totalEls[activePlayer].textContent = totals[activePlayer];

    const winScore = WIN_SCORE_DEFAULT;
    if (totals[activePlayer] >= winScore) {
        // vinner
        playing = false;
        playerPanels[activePlayer].classList.add('vinner');
        playerPanels[activePlayer].classList.remove('aktiv');
        diceEl.style.display = 'none';
    } else {
        switchPlayer();
    }
});

btnNew.addEventListener('click', initGame);

function switchPlayer() {
    currentScore = 0;
    currentEls[activePlayer].textContent = 0;
    playerPanels[activePlayer].classList.remove('aktiv');
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerPanels[activePlayer].classList.add('aktiv');
}

function initGame() {
    totals = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    totalEls[0].textContent = 0;
    totalEls[1].textContent = 0;
    currentEls[0].textContent = 0;
    currentEls[1].textContent = 0;

    // reset panel classes
    playerPanels[0].classList.remove('vinner', 'aktiv');
    playerPanels[1].classList.remove('vinner', 'aktiv');
    playerPanels[0].classList.add('aktiv');

    diceEl.style.display = 'none';
}