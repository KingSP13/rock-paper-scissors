let paragraphResult = document.querySelector('.js-result');
let paragraphMoves = document.querySelector('.js-moves');
let paragraphScore = document.querySelector('.js-score');

//Estudo de funções, aqui uso as duas formas que poderia ter chamado a função, a forma recomendada usando arrow functions com leitura facilitada, porém eventlisteners não recebem parâmetros, então eu basicamente chamo uma função para chamar uma função, e nessa função final eu incluo o parametro que quero que seja passado, exemplo no botão 'scissors'

document.querySelector('.rock')
.addEventListener("click", () => {
    playGame('rock')
});
document.querySelector('.paper')
.addEventListener("click", () => {
    playGame('paper')
});
document.querySelector('.scissors')
.addEventListener("click", function() {
    playGame('scissors')
});
 
document.querySelector('.reset-button')
.addEventListener("click", () => {
    scoreReset()
});
document.querySelector('.auto-play-btn')
.addEventListener("click", () => {
    autoPlay()
});

const keyboardPlay = (event) => {
    if(event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper')
    } else if (event.key === 's') {
        playGame('scissors')
    } else if (event.key === 'a') {
        autoPlay()
    } else if (event.key === 'Backspace') {
        scoreReset()
    } else if (event.key === 'Enter') {
        autoPlay()
    }
}

document.body.addEventListener("keydown", keyboardPlay)

let score = JSON.parse(localStorage.getItem('score')) || {
wins:0,
losses: 0,
ties: 0
}

let isAutoPlaying = false;
let intervalId;

const autoPlay = () => {
if(!isAutoPlaying) {
    intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);

    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.auto-play-btn').innerText = 'Stop Playing.'
} else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.auto-play-btn').innerText = 'Auto Play.'
}
}
const playGame = playerMove => {
    const computerMove = pickComputerMove();
    let result = '';

if (playerMove === 'scissors') {

    if (computerMove === 'scissors') {
        result = 'Tie.'
    } else if  (computerMove === 'rock') {
        result = 'You lose.'
    } else if (computerMove === 'paper') {
        result = 'You win.'
    }

    } else if (playerMove === 'paper') {
    if (computerMove === 'paper') {
    result = 'Tie.'
    } else if  (computerMove === 'scissors') {
        result = 'You lose.'
    } else if (computerMove === 'rock') {
        result = 'You win.'
    }
    
    } else if ('rock') {
        if (computerMove === 'rock') {
    result = 'Tie.'
    } else if  (computerMove === 'paper') {
        result = 'You lose.'
    } else if (computerMove === 'scissors') {
        result = 'You win.'
    }
    }

    if(result === 'You win.') {
        score.wins = score.wins +=1;
    } else if (result === 'You lose.') {
        score.losses = score.losses +=1;
    } else {
        score.ties = score.ties +=1
    }

    localStorage.setItem('score', JSON.stringify(score));

paragraphResult.innerText = (`${result}`);
paragraphMoves.innerHTML = (`You <img src="./assets/${playerMove}.png"> X <img src="./assets/${computerMove}.png">`)
paragraphScore.innerText = (`\nScore: Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`)
}

const pickComputerMove = () => {
randomNum = Math.random();

if (randomNum >= 0 && randomNum < 1 / 3) {
    computerMove = 'scissors'
} else if (randomNum >= 1/3 && randomNum < 2 / 3) {
    computerMove = 'rock'
} else if (randomNum >= 2/3 && randomNum <= 1) {
    computerMove = 'paper'
}

return computerMove;
}
const scoreReset = () => {
    if (confirm('Reset score ?')) {
        score.wins = 0,
        score.losses = 0,
        score.ties = 0
    } else {
        return;
    }

localStorage.removeItem('score')
document.querySelector('.js-result').innerText = 'Score Reseted !';
document.querySelector('.js-moves').innerText = '';
document.querySelector('.js-score').innerText = '';
}