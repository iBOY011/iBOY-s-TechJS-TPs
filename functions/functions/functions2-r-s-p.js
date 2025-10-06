let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

let isAutoPlaying = false;
let intervalId;

updateScoreElement();

document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    if (isAutoPlaying) {
      clearInterval(intervalId); // arrete l intervalle 
      isAutoPlaying = false;
      document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    } else {
      intervalId = setInterval(() => {
        const playerMove = pickComputerMove(); 
        playGame(playerMove);
      }, 1000); // chaque seconde; 1000ms = 1s
      
      isAutoPlaying = true;
      document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
    }
  });

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

  /*
  Add an event listener
  if the user presses the key r => play rock
  if the user presses the key p => play paper
  if the user presses the key s => play scissors
  */
document.addEventListener('keydown', (event) => {
  if (event.key === 'r'){
    playGame('rock');
  } else if ( event.key === 'p'){
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});


function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  // calculate result
  // update the score and store it using localStorage.setItem
  // show the new score and the updated images using "document.querySelector"

  if (playerMove === computerMove) {
    result = 'Tie.';
    score.ties++;
  } else if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'scissors' && computerMove === 'paper') ||
    (playerMove === 'paper' && computerMove === 'rock')
  ) {
    result = 'You win!';
    score.wins++;
  } else {
    result = 'You lose!';
    score.losses++;
  }
  updateScoreElement();
  localStorage.setItem('score', JSON.stringify(score));
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = 
    `You :<img src="images/${playerMove}-emoji.png" class="move-icon"> 
    Computer :<img src="images/${computerMove}-emoji.png" class="move-icon"> `;

}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computcomputerMoveerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}