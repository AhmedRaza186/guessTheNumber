let loseSound = new Audio('./sounds/gameover.mp3')
let bgSound = new Audio('./sounds/background.mp3')
let newRound = new Audio('./sounds/newround.mp3')
let winGame = new Audio('./sounds/wingame.mp3')
let winRound = new Audio('./sounds/winround.mp3')
let errorSound = new Audio('./sounds/error.mp3')
let buttonClicked = new Audio('./sounds/buttonclicked.mp3')

let winModal = document.querySelector('#winModal')
let modalRound = document.querySelector('#modalNextRound')
let modalNewGame = document.querySelector('#modalNewGame')


bgSound.play()
bgSound.loop = true


let num;
function generateNum() {
    num = Math.ceil(Math.random() * 20)

}

generateNum()

document.querySelector('.again').addEventListener('click', () => {
    window.location.reload()
})
modalRound.addEventListener('click', roundChecker)
modalNewGame.addEventListener('click', () => {
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
let score = 0
let scoreDisplay = document.querySelector('.score')
let roundDisplay = document.querySelector('#rounds')
function roundChecker() {
    winModal.style.zIndex = '-1'
    winModal.style.opacity = '0'
           modalNewGame.style.display = 'none'
           modalRound.style.display = 'none'
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
    turnDisplay.innerText = `Remaining Turns :${turns}`
scoreDisplay.innerText = 'Score :0'


}
roundChecker()

function scoreChecker(turns) {
    score = turns * scoreMultipler
    scoreDisplay.innerText = `Score :${Math.round(score)}`
}
let totalScore = 0
let totalScoreDisplay = document.querySelector('.totalScore')

function totalScoreHandler() {
    totalScore += score
    totalScoreDisplay.innerText = `Total Score :${Math.round(totalScore)}`
}
let input = document.querySelector('input')
document.querySelector('body').addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        input.focus()
    }
})

let checkBtn = document.querySelector('.check')

checkBtn.addEventListener('click', checkNum)
input.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        checkBtn.click()
    }
})

function checkNum() {

    let userGuess = +(input.value)
    if (isNaN(userGuess)) {
        let error = document.querySelector('.notNum')
        errorSound.play()
        error.style.display = 'block'
        setTimeout(() => {
            error.style.display = 'none'

        }, 2000)
        return
    }
    if (userGuess == '') {
        let error = document.querySelector('.notNum')
        errorSound.play()
        error.style.display = 'block'
        setTimeout(() => {
            error.style.display = 'none'

        }, 2000)
        return
    }
    buttonClicked.play()
    userGuessDisplay.innerText = userGuess
    input.value = ''
    turns--
    if (userGuess == num) {
        if (round == 10) {
            winGame.play()
            winModal.querySelector('h3').innerText = 'You Won the Game'
            winModal.style.zIndex = '10'
            winModal.style.opacity = '1'
                   modalNewGame.style.display = 'block'
            return
        }
        winRound.play()
        winModal.style.zIndex = '10'
        winModal.style.opacity = '1'
        modalRound.style.display = 'block'
        modalNewGame.style.display = 'block'
        generateNum()
        scoreChecker(turns + 1)
        let roundScore = document.querySelectorAll('.winScore h4')[0]
        roundScore.innerText = `Score :${Math.round(score)}`
        totalScoreHandler()
        let allRoundScore = document.querySelectorAll('.winScore h4')[1]
        allRoundScore.innerText = `Total Score :${Math.round(totalScore)}`
        // roundChecker()
        return

    }


    turnDisplay.innerText = `Remaining Turns :${turns}`

    if (turns < 1) {
        loseSound.play()
   winModal.querySelector('h3').innerText = 'Game Over'
            winModal.style.zIndex = '10'
            winModal.style.opacity = '1'
              modalNewGame.style.display = 'block'
              let roundScore = document.querySelectorAll('.winScore h4')[0]
        roundScore.innerText = `Score :0`
        let allRoundScore = document.querySelectorAll('.winScore h4')[1]
        allRoundScore.innerText = `Total Score :${Math.round(totalScore)}`
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