// let num;
// function generateNum(){
//      num = Math.ceil(Math.random() * 20)
// console.log(num)
// }

// generateNum()

// let p = document.querySelector('.showText h2')

// let guessArr = []

// document.querySelector('button').addEventListener('click',checkNum)

// function checkNum(){
//     let input = document.querySelector('input')
// let userGuess = +(input.value)
// input.value = ''
// console.log(userGuess)
// guessArr.push(userGuess)
// if(userGuess == num){
//     alert("You Won")
// }
// else if (guessArr.length == 5){
//     setTimeout(() => {
//         alert('You lose')
//     },1000)
//       generateNum()
//       guessArr = []
      
// }

// let diff = num - userGuess
// console.log(diff)
// if(diff == 1){
//     p.innerHTML = 'You are Low but very very Close'
//     return
// }
// else if(diff == -1){
//     p.innerHTML = 'You are high but very very Close'
//     return
    
// }
// if(diff > 0 && diff <= 3){
//     p.innerHTML = 'You are Low but Close'
//     return

// }
// else if(diff < 0 && diff >= -3){
//     p.innerHTML = 'You are high but Close'
//     return
    
// }


// }