const car=document.getElementsByClassName('car')[0];
const container=document.getElementsByClassName('container')[0];
const roadLeft=document.getElementById('roadleft');
const roadMid=document.getElementById('roadmid');
const roadRight=document.getElementById('roadright');
const tree1=document.getElementById('tree1')
const tree2=document.getElementById('tree2')
const ob1=document.getElementsByClassName('obstacle')[0];
const ob2=document.getElementsByClassName('obstacle')[1];
const ob3=document.getElementsByClassName('obstacle')[2];

const levelbox=document.getElementById('level')
const scoreBox=document.getElementById('score');
const maxScoreBox=document.getElementById('maxScore');
const leftButton=document.getElementsByClassName('arrowLeft')[0];
const rightButton=document.getElementsByClassName('arrowRight')[0];
const gridRoad=document.getElementsByClassName('grid-road')[0];
const roadleft=document.getElementsByClassName('roadleft')[0];


// Intializing variable
let score=0;
let maxScore =0;
let x=10;
let lastTime=0;
let speed=8;
let inputDir = { x: 0, y: 1 }
const rowHeight=40;
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
const NoOfRows=Math.round(vh/rowHeight);

const carPos={x:2 , y:NoOfRows-4};
const ob1Pos={x:2 , y:4};
const ob2Pos={x:4 , y:2};
const ob3Pos={x:4 , y:8};

// Code for Stylesheet 
// changing some stylsheet using js
 gridRoad.style.gridTemplateRows=`repeat(${NoOfRows} ,40px)`
 roadleft.style.gridRowEnd=NoOfRows + 2;
 roadRight.style.gridRowEnd=NoOfRows + 2;
 roadMid.style.gridRowEnd=NoOfRows + 2;
//  Main function to get Fps
function main ( currtime){
    window.requestAnimationFrame(main);
    if((currtime -lastTime) /3000 < 1/speed){
        return;
    }
    lastTime =currtime;
    gameEngine();
}

main();    
function gameEngine() {     

       //display the car  
        car.style.gridRow =carPos.y;
        car.style.gridColumn =carPos.x;
        // display ob1 ob2 and ob3
        ob1.innerHTML='<img src="assets/car4.png">'
        ob2.innerHTML='<img src="assets/car2.png">'
        ob3.innerHTML='<img src="assets/car3.png">'
        ob1.style.gridRow=ob1Pos.y;
        ob1.style.gridColumn=ob1Pos.x;

        ob2.style.gridRow=ob2Pos.y;
        ob2.style.gridColumn=ob2Pos.x;

        ob3.style.gridRow=ob3Pos.y;
        ob3.style.gridColumn=ob3Pos.x;

        // if you collided
        if((carPos.x ==ob1Pos.x && carPos.y ==ob1Pos.y) || (carPos.x ==ob2Pos.x && carPos.y ==ob2Pos.y) || (carPos.x ==ob3Pos.x && carPos.y ==ob3Pos.y)){
            carPos.x=2;
            carPos.y=NoOfRows-2;
            ob1Pos.y=1;
            ob2Pos.y=4;
            ob3Pos.y=8;
            scoreBox.innerHTML ="00";
            if(score > maxScore || maxScore==null || maxScore ==undefined){
                maxScore=score;
                localStorage.setItem(maxScore,score)
                score=0;
            }
            const ms=localStorage.getItem(maxScore);
            ms!=null ?maxScoreBox.innerHTML = ms: maxScoreBox.innerHTML="00"; 
            const level=getLevel(maxScore);
            levelbox.innerHTML=level
            window.alert("Game ended")
        }
        if(carPos.y == 1){
            const a=2;
            const b=NoOfRows-4;
            ob1Pos.x=2;
            ob1Pos.y=Math.round(a + (b - a) * Math.random());
        }
        if(carPos.y == 1){
            const a=1;
            const b=NoOfRows-4;
            ob2Pos.x=4;
            ob2Pos.y=Math.round(a + (b - a) * Math.random());
        }
        if(carPos.y == 1){
            const a=2;
            const b=NoOfRows-2;
            const  newx=Math.random() <0.5?2:4;
            ob3Pos.x=newx;
            ob3Pos.y=Math.round(a + (b - a) * Math.random());
        }
        if(notSafe(ob1Pos,ob2Pos) || notSafe(ob1Pos,ob3Pos )|| notSafe(ob3Pos,ob2Pos)){
            ob1Pos.y=2;
            ob3Pos.y=6;
            ob2Pos.y=10;
        }
        // moving the car
        if(carPos.y <=1){
           carPos.y = NoOfRows;
           otherChanges();
           score ++;
           scoreBox.innerHTML=score;
        }
        let newx=carPos.x+ inputDir.x;
        // left right Movements  
        if(isRightMovePsble(newx)){
            if(newx ==3 && inputDir.x == 1){
                newx=4;
            }else if(newx ==3 && inputDir.x==-1){
                newx=2;
            }
            carPos.x=newx;
        }
        carPos.y +=inputDir.y
        inputDir.y=-1;

    }

 function notSafe(ob1Pos, ob2Pos){
    if( ob1Pos.y == ob2Pos.y){  return true;}
    else if(ob1Pos.y + 1==ob2Pos.y && ob1Pos.x!=ob2Pos.x) { return true;}
   else if (ob1Pos.y - 1==ob2Pos.y && ob1Pos.x!=ob2Pos.x){return true;}
    return false;
 }

 function isRightMovePsble(x){
    if(x==1  || x==5){return false;}
    return true;
 }
// function to make some changes when car completes his track 
function getRandomColor() {
    const letters = '0123456789ABCDEF'; // Hexadecimal characters
    let color = '#';
  
    // Generate a random six-digit hex color code
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  
    return color;
  }
 function otherChanges(){
    const color1=getRandomColor();
    const color2=getRandomColor();
    roadMid.style.background=`radial-gradient( ${color1}, ${color2})`;

    const color3=getRandomColor();
    // roadLeft.style.backgroundColor=color3
    roadLeft.style.background=`linear-gradient(to right , ${color3}, ${color2})`
    roadRight.style.background=`linear-gradient(to left , ${color3}, ${color2})`
    
 }
 window.addEventListener('keydown', (e) => {
    inputDir = { x: 0, y: 1 };
    switch (e.key) {
        case 'ArrowUp': inputDir.y = -1;
            inputDir.x = 0;
            break;
        case 'ArrowRight': inputDir.y = 0;
            inputDir.x = 1;
            break;
        case 'ArrowLeft': inputDir.y = 0;
            inputDir.x = -1;
            break;
        default: inputDir.x=0;inputDir.y=0;
    }
    gameEngine();
})

function getLevel(ms) {
    if (ms < 10 && ms >= 0)  {speed =5;  return 1; }
    if (ms < 20 && ms >= 10) {speed =6;  return 2; }
    if (ms < 30 && ms >= 20) {speed =7;  return 3; }
    if (ms < 40 && ms >= 30) {speed =8; return 4;}
    if (ms < 50 && ms >= 40) {speed =8; return 5;}            
    if (ms < 60 && ms >= 50)  {speed =8;  return 6;}
    if (ms < 70 && ms >= 60)  {speed =9 ; return 7;}
     if(ms < 80 && ms >= 70) {speed =10 ; return 8;}
     if(ms < 90 && ms >= 80) {speed =11; return 9;}
}

    leftButton.addEventListener('click' ,() =>{
            carPos.x=2;
        })
        rightButton.addEventListener('click' ,() =>{
        carPos.x=4;
    })
