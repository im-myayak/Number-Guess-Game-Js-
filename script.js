'use strict';
const EASY = 2,
    MEDIUM = 4,
    HARD = 5;
// global variable
let message = '',
    score = 20,
    levelInterval,
    highscore = 0,
    playerNumber;
// the number to be guessed
let generatedNumber = Math.floor(Math.random() * 20) + 1;
// to display the info related to the number position
let displaymessage = document.querySelector('.message');
// to display the score information
let displayscore = document.querySelector('.score');
// to handle the correct number
let correctNumber = document.querySelector('.number');
//evenlistener for EASY button selection
document.querySelector('.easy').addEventListener('click', function() {
    levelInterval = EASY;
    document.querySelector('.firstPart').style.display = 'none';
    document.querySelector('main').style.display = 'flex';
});
//evenlistener for MEDIUM button selection
document.querySelector('.medium').addEventListener('click', function() {
    levelInterval = MEDIUM;
    document.querySelector('.firstPart').style.display = 'none';
    document.querySelector('main').style.display = 'flex';
});
//evenlistener for HARD button selection
document.querySelector('.hard').addEventListener('click', function() {
    levelInterval = HARD;
    document.querySelector('.firstPart').style.display = 'none';
    document.querySelector('main').style.display = 'flex';
});
//evenlistener for AGAIN button selection

document.querySelector('.again').addEventListener('click', function() {
    score = 20;
    generatedNumber = Math.floor(Math.random() * 20) + 1;
    message = 'Start guessing...';
    displayscore.textContent = score;
    displaymessage.textContent = message;
    correctNumber.textContent = '?';
    document.querySelector('.check').disabled = false;
    document.querySelector('.attend-message').textContent = `${
    score / levelInterval
  } chances remaining `;
    correctNumber.style.width = '15rem';
    document.querySelector('.guessing').value = '';
    document.body.style.backgroundColor = 'black';
    document.querySelector('.firstPart').style.display = 'block';
    document.querySelector('main').style.display = 'none';
});
//evenlistener for CHECK button selection

document.querySelector('.check').addEventListener('click', function() {
    playerNumber = document.querySelector('.guessing').value;

    check(generatedNumber, playerNumber);
});
//function to compared the generated number and the player number called in the check function
let comparareNumbers = function(generatedNumber, playerNumber) {
    if (playerNumber == '') message = '⛔No number.';
    else {
        if (playerNumber <= 0 || playerNumber >= 21)
            return 'enter a number between 1 and 20';
        else if (generatedNumber == playerNumber) return 'Success';
        else {
            score -= levelInterval;
            return generatedNumber > playerNumber ? 'too low...' : 'too high...';
        }
    }
};
// function called when the check button is clicked
let check = function(generatedNumber, playerNumber) {
    message = comparareNumbers(generatedNumber, playerNumber, score);
    console.log(generatedNumber, message);

    displayscore.textContent = score;
    displaymessage.textContent = message;
    // when the player guessed the correct number
    if (message == 'Success') {
        correctNumber.textContent = generatedNumber;
        let displayhighscore = document.querySelector('.highscore');
        highscore = score > highscore ? score : highscore;
        displayhighscore.textContent = highscore;
        correctNumber.style.width = '30rem';
        document.body.style.backgroundColor = 'green';
        document.querySelector('.check').disabled = true;
    }
    //keep track on the remaining chance of the player
    document.querySelector('.attend-message').textContent = `${
    score / levelInterval
  } chances remaining `;
    if (score <= 0) {
        looseGame();
        document.querySelector('.check').disabled = true;
    }
};
// when the player missed all his attempts and failed the game
let looseGame = function() {
    correctNumber.textContent = generatedNumber;
    displaymessage.textContent = 'You lost the game';

    document.body.style.backgroundColor = 'red';
    document.querySelector('.check').disabled = true;
};