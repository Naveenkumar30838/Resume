let speed = 1;
let count = 0;
let score = 0;
let maxScore = 0;
let lastPaintTime = 0;
let inputDir = { x: 0, y: 1 }
let food = { x: 2, y: 4 };
let snakeArr = [
    { x: 5, y: 2 },
]

const board = document.getElementById('board')
const scoreBoard = document.getElementById('score')
const maxScoreBoard = document.getElementById('maxScore')
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    const mS = localStorage.getItem(maxScore);
    localStorage.setItem(level, getLevel(mS));
    levelbox.innerHTML=localStorage.getItem(level);

    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            if (score >= mS) { 
                localStorage.setItem(maxScore, score) 
            }
            maxScoreBoard.innerHTML = mS;
            score = 0;
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        if (score >= mS) { localStorage.setItem(maxScore, score) }
        maxScoreBoard.innerHTML = mS;
        score = 0;
        return true;
    }
    maxScoreBoard.innerHTML = mS;
    
    return false;
}

function gameEngine() {
    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        alert("Game Ended Press any key to Continue");
        snakeArr = [{ x: 13, y: 15 }];
    }

    // if food is eaten
    if (food.x === snakeArr[0].x && food.y === snakeArr[0].y) {
        score++;
        x = food.x;
        y = food.y;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });

        scoreBoard.innerHTML = score;
        maxScoreBoard.innerHTML = localStorage.getItem(maxScore)
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // displaying the item
    board.innerHTML = ""

    // display the snake
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head')
            // console.log(gridRowStart)
        }
        else {
            snakeElement.classList.add('body')
        }

        board.appendChild(snakeElement)
    });
    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)

}

// when user press any key 
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    inputDir = { x: 0, y: 1 };
    // console.log(e);
    switch (e.key) {
        case 'ArrowUp': inputDir.y = -1;
            inputDir.x = 0;
            break;
        case 'ArrowDown': inputDir.y = 1;
            inputDir.x = 0;
            break;
        case 'ArrowRight': inputDir.y = 0;
            inputDir.x = 1;
            break;
        case 'ArrowLeft': inputDir.y = 0;
            inputDir.x = -1;
            break;
        default: break;
    }

    gameEngine();
})
// /////////////////////////////// Js For UI Starts Here////////////////////////////////////////d
const levelbox = document.getElementById('level');
// changing level if maxScore changes

function getLevel(ms) {
    if (ms < 10 && ms >= 0)  {speed =1;  return 1; }
    if (ms < 20 && ms >= 10) {speed =2;  return 2; }
    if (ms < 30 && ms >= 20) {speed =3;  return 3; }
    if( ms < 40 && ms >= 30) {speed =4; return 4;}
    if( ms < 50 && ms >= 40) {speed =5; return 5;}            
    if(ms < 60 && ms >= 50)  {speed =6;  return 6;}
    if(ms < 70 && ms >= 60)  {speed =7 ; return 7;}
     if(ms < 80 && ms >= 70) {speed =8 ; return 8;}
     if(ms < 90 && ms >= 80) {speed =9 ; return 9;}
}
// for mobile
const scorebox =document.getElementById('scorebox');
const setting=document.getElementById('settings')
setting.addEventListener('click' , () =>{
    scorebox.classList.toggle('disappear')
})
   //// handling clicks on buttons
   const topbutton=document.getElementById('top')
   const left=document.getElementById('left')
   const right=document.getElementById('right')
   const bottom=document.getElementById('bottom')
   topbutton.addEventListener('click' ,() =>{
    inputDir = { x: 0, y: 1 };
    inputDir.y = -1;
     inputDir.x = 0;
   })
   left.addEventListener('click' , () => {
    inputDir = { x: 0, y: 1 };
    inputDir.y = 0;
     inputDir.x = -1;
   })
   right.addEventListener('click' , () => {
    inputDir = { x: 0, y: 1 };
    inputDir.y = 0;
     inputDir.x = 1;
   })
   bottom.addEventListener('click' , () => {
    inputDir = { x: 0, y: 1 };
    inputDir.y = 1;
     inputDir.x = 0;
   })