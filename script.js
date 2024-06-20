let player_1 = document.querySelector('.player-1');
let player_2 = document.querySelector('.player-2');

let highScore1 = document.getElementById('high-score-0');
let highScore2 = document.getElementById('high-score-1');

let currentScore1 = document.getElementById('score-0');
let currentScore2 = document.getElementById('score-1');

let image = document.querySelector('.dice');

let newGame = document.querySelector('.new-game');
let rollDice = document.querySelector('.roll-dice');
let holdGame = document.querySelector('.hold');

let score1 = 0;
let score2 = 0;

let totalScore1 = 0;
let totalScore2 = 0;

let imageArray = ['images/dice-1.png','images/dice-2.png','images/dice-3.png','images/dice-4.png','images/dice-5.png','images/dice-6.png']

let randomNumber = 0;

const diceImage = () => {
    randomNumber = Math.trunc(Math.random()*6);

    image.src = `${imageArray[randomNumber]}`;
    image.style.display = 'inline';
};

const playerFunction = (currentScore,score,highScore, totalScore) => {
    currentScore.textContent = score;
    holdGame.addEventListener('click', () => {
        highScore.textContent = totalScore;
        currentScore.textContent = 0;
        player_1.classList.contains('player-active') ? totalScore1 += score : totalScore2 += score
        score1 = 0;
        score2 = 0;
    })
}

rollDice.addEventListener('click', () => {
    diceImage();

    if(randomNumber === 0){
        player_1.classList.contains('player-active') ? (
            player_1.classList.remove('player-active'),
            player_2.classList.add('player-active')
        ) : (
            player_1.classList.add('player-active'),
            player_2.classList.remove('player-active')
        )
        score1 = 0;
        totalScore1 = 0;
        currentScore1.textContent = score1;
        score2 = 0;
        totalScore2 = 0;
        currentScore2.textContent = score2;
    }

    player_1.classList.contains('player-active') ? (
        randomNumber !== 0 ? score1 += randomNumber+1 : score1 = score1,
        // totalScore1 += score1,
        playerFunction(currentScore1,score1, highScore1,totalScore1)
    ) : (
        randomNumber !== 0 ? score2 += randomNumber+1 : score2 = score2,
        // totalScore2 += Number(currentScore2.textContent),
        playerFunction(currentScore2,score2,highScore2, totalScore2)
    )
});