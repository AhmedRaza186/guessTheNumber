let loseSound = new Audio('./gameover.mp3')
let bgSound = new Audio('./background.mp3')
let newRound = new Audio('./newround.mp3')
let winGame = new Audio('./wingame.mp3')
let winRound = new Audio('./winround.mp3')

let winModal = document.querySelector('#winModal')
let modalRound = document.querySelector('#modalNextRound')


bgSound.play()

let num;
function generateNum() {
    num = Math.ceil(Math.random() * 20)
    console.log(num, '===> num')
}

generateNum()

document.querySelector('.again').addEventListener('click', () => {
    window.location.reload()
})
modalRound.addEventListener('click', roundChecker)
document.querySelector('#modalNewGame').addEventListener('click', () => {
    winModal.style.zIndex = '-1'
    winModal.style.opacity = '0'
    setTimeout(() => {
        window.location.reload()

    }, 1000)

})
let guessingStatus = document.querySelector('.guessing')
let userGuessDisplay = document.querySelector('.box p')


let turnDisplay = document.querySelector('.turns')

let scoreMultipler = 0

let round = 0
let roundDisplay = document.querySelector('#rounds')
function roundChecker() {
    winModal.style.zIndex = '-1'
    winModal.style.opacity = '0'
    newRound.play()
    round++
    if (round <= 2) {
        scoreMultipler = 2
        turns = 10
    }
    else if (round <= 4) {
        scoreMultipler = 4
        turns = 5
    }
    else if (round <= 6) {
        scoreMultipler = 6.66
        turns = 3
    }
    else if (round <= 9) {
        scoreMultipler = 10
        turns = 2
    }
    else if (round = 10) {
        scoreMultipler = 20
        turns = 1
    }

    roundDisplay.innerText = `Round ${round}`
    userGuessDisplay.innerText = `?`
    guessingStatus.innerText = 'Start Guessing....'


}
roundChecker()
let scoreDisplay = document.querySelector('.score')

let score = 0
function scoreChecker(turns) {
    score = turns * scoreMultipler
    console.log(scoreMultipler, '===> multiplyer')
    console.log(turns, '===> scoreCheckerturn')
    console.log(score, '===> score')
    scoreDisplay.innerText = `Score :${Math.round(score)}`
}
let totalScore = 0
let totalScoreDisplay = document.querySelector('.totalScore')

function totalScoreHandler() {
    totalScore += score
    totalScoreDisplay.innerText = `Total Score :${Math.round(totalScore)}`
}


document.querySelector('.check').addEventListener('click', checkNum)

function checkNum() {
    let input = document.querySelector('input')
    let userGuess = +(input.value)
    if (!Number(userGuess)) {
        alert(`Only Numbers allowed`)
        return
    }
    userGuessDisplay.innerText = userGuess
    input.value = ''
    turns--
    if (userGuess == num) {
        if (round == 10) {
            winGame.play()
            winModal.firstElementChild.innerText = 'You Won the Game'
            winModal.style.zIndex = '10'
            winModal.style.opacity = '1'
            modalRound.style.display = 'none'

            return
        }
        winRound.play()
        winModal.style.zIndex = '10'
        winModal.style.opacity = '1'
        generateNum()
        scoreChecker(turns + 1)
        totalScoreHandler()
        // roundChecker()
        console.log(turns)
        userGuessDisplay.innerText = `?`
        guessingStatus.innerText = 'Start Guessing....'
        turnDisplay.innerText = `Remaining Turns :${turns}`
        return

    }

    console.log(turns, '===> turn')
    turnDisplay.innerText = `Remaining Turns :${turns}`
    console.log(turnDisplay, '===> turn display')
    if (turns < 1) {
        loseSound.play()
        setTimeout(() => {
            alert('You lose')
        }, 1000)
        generateNum()
        round = 1



    }

    let diff = num - userGuess


    if (diff > 0 && diff <= 3) {
        guessingStatus.innerText = 'You are Low but Close'
        return

    }
    else if (diff < 0 && diff >= -3) {
        guessingStatus.innerText = 'You are high but Close'
        return

    }
    else if (diff > 3) {
        guessingStatus.innerText = 'You are Low'
        return
    }
    else if (diff < -3) {
        guessingStatus.innerText = 'You are High'
        return

    }
}