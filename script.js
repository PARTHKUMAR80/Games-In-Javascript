// number guessing game

let msg1=document.getElementById('para-1');
let msg2=document.getElementById('para-2');
let msg3=document.getElementById('para-3');

let Answer=Math.floor(Math.random()*100 + 1);
let no_of_guesses=0;
let guessed_numbers=[];

function play(){
    let user_guess=document.getElementById('guess').value;
    if (user_guess<1 || user_guess>100){
        alert("***Guessed number should be between 1 and 100...");
    }
    else {
        guessed_numbers.push(user_guess);
        no_of_guesses++;
        if (user_guess<Answer){
            document.getElementById('card').style.backgroundColor='red';
            if (Math.abs(user_guess-Answer)<=5){
                msg1.textContent="Your are very close but you guessed lower..."
            }
            else {
                msg1.textContent="You guessed too low...";
            }
            msg2.textContent="No. of guesses: " + no_of_guesses;
            msg3.textContent="Guessed numbers are: " + guessed_numbers;
        }
        else if (user_guess>Answer){
            document.getElementById('card').style.backgroundColor='red';
            if (Math.abs(user_guess-Answer)<=5){
                msg1.textContent="You are very close but you guessed higher...";
            }
            else {
                msg1.textContent="You guessed too high...";
            }
            msg2.textContent="No.of guesses: " + no_of_guesses;
            msg3.textContent="Guessed numbers are: " + guessed_numbers;
        }
        else {
            document.getElementById('card').style.backgroundColor='green';
            msg1.textContent="You won the match...";
            msg2.textContent="The number was: " + Answer;
            msg3.textContent="You guessed it in " + no_of_guesses + " guesses...";
        }
    }
}

// rock paper scissore

const selcetionButtons=document.querySelectorAll('[data-selection]');
const finalColomn=document.querySelector('[data-final-colomn]');
const yourScorespan=document.querySelector('[data-your-score]');
const computerScorespan=document.querySelector('[data-computer-score]');
const SELECTION = [
    {
        name:'rock',
        emoji:'✊',
        beats:'scissors'
    },
    {
        name:'paper',
        emoji:'✋',
        beats:'rock'
    },
    {
        name:'scissors',
        emoji:'✌',
        beats:'paper'
    }
]
selcetionButtons.forEach(selcetionButton => {
    selcetionButton.addEventListener('click' , e => {
        const selcetionName=selcetionButton.dataset.selection;
        const selection=SELECTION.find(selection => selection.name === selcetionName);
        makeSelection(selection);
    })
})

function makeSelection(selection){
    const computerSelection=randomSelection();
    // console.log(computerSelection);
    const yourWinner=isWinner(selection , computerSelection);
    const computerWinner=isWinner(computerSelection , selection);
    addSelectionResult(computerSelection , computerWinner);
    addSelectionResult(selection , yourWinner);
    if (yourWinner){
        incScore(yourScorespan);
    }
    if (computerWinner){
        incScore(computerScorespan);
    }
}

function randomSelection(){
    const randomIndex=Math.floor(Math.random()*SELECTION.length);
    return SELECTION[randomIndex];
}

function isWinner(selection , opponentSelection){
    return selection.beats === opponentSelection.name;
}

function incScore(scoreSpan){
    scoreSpan.innerText=parseInt(scoreSpan.innerText) + 1;
}

function addSelectionResult(selection , winner){
    const div=document.createElement('div');
    div.innerText=selection.emoji;
    div.classList.add('result-selection');
    if (winner) div.classList.add('winner');
    finalColomn.after(div);
}