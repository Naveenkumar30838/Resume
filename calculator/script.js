// const value_1=document.getElementsByClassName(value_1);
const shownInput=document.getElementById('Input-place');

let input1="";
let input2="";
let operator=-1;
let displayIn="";
console.log(input1)
// Here is the code to take input 
function value_1(){
    if(operator==-1){
      toString(input1 +=1);
      displayIn=input1;
        shownInput.setAttribute("value" ,displayIn); 
    }
    else {toString(input2 +=1);displayIn=input1+operator+input2;shownInput.setAttribute("value" ,displayIn); }
}
function value_2(){
    if(operator==-1){
        toString(input1 +=2);
        displayIn=input1;
        shownInput.setAttribute("value" ,displayIn);
        
    }
    else {toString(input2 +=2);
        displayIn=input1+operator+input2;
        shownInput.setAttribute("value" ,displayIn); }
}
function value_3(){
    if(operator==-1){
        toString(input1 +=3);
        displayIn=input1;
        shownInput.setAttribute("value" ,displayIn);
    }
    else {toString(input2 +=3);
        displayIn=input1+operator+input2;
        shownInput.setAttribute("value" ,displayIn); }
}
function value_4(){
    if(operator==-1){
        toString(input1 +=4);
        displayIn=input1;
        shownInput.setAttribute("value" ,displayIn);
    }
    else {toString(input2 +=4);
        displayIn=input1+operator+input2;
        shownInput.setAttribute("value" ,displayIn); }
}
function value_5(){
    if(operator==-1){
        toString(input1 +=5);
        displayIn=input1;
        shownInput.setAttribute("value" ,displayIn);
    }
    else {toString(input2 +=5);
        displayIn=input1+operator+input2;
        shownInput.setAttribute("value" ,displayIn); }
}
function value_6(){
    if(operator==-1){
        toString(input1 +=6);
        displayIn=input1;
        shownInput.setAttribute("value" ,displayIn);
    }
    else {toString(input2 +=6);
        displayIn=input1+operator+input2;
        shownInput.setAttribute("value" ,displayIn); }
}
function value_7(){
    if(operator==-1){
        toString(input1 +=7);
        displayIn=input1;
        shownInput.setAttribute("value" ,displayIn);
    }
    else {toString(input2 +=7);
        displayIn=input1+operator+input2;
        shownInput.setAttribute("value" ,displayIn); }}
function value_8(){
    if(operator==-1){
        toString(input1 +=8);
        displayIn=input1;
        shownInput.setAttribute("value" ,displayIn);
    }
    else {toString(input2 +=8);
        displayIn=input1+operator+input2;
        shownInput.setAttribute("value" ,displayIn); }}
function value_9(){
    if(operator==-1){
        toString(input1 +=9);
        displayIn=input1;
        shownInput.setAttribute("value" ,displayIn);
    }
    else {toString(input2 +=9);
        displayIn=input1+operator+input2;
        shownInput.setAttribute("value" ,displayIn); }
}
function value_dot(){
    if(operator==-1){
        toString(input1 +=".");
        displayIn=input1;
        shownInput.setAttribute("value" ,displayIn);
    }
    else {toString(input2 +=".");
        displayIn=input1+operator+input2;
        shownInput.setAttribute("value" ,displayIn); }
}
function value_0(){
    if(operator==-1){
        toString(input1 +=0);
        displayIn=input1;
        shownInput.setAttribute("value" ,displayIn);
    }
    else {toString(input2 +=0);
        displayIn=input1+operator+input2;
        shownInput.setAttribute("value" ,displayIn); }
}
function back_button(){
    displayIn=displayIn.slice(0,-1);
    if(operator==-1){input1=input1.slice(0,-1);}
    else if(operator!=-1 && input2==""){operator=-1;}
    else {input2=input2.slice(0,-1);}
    shownInput.setAttribute("value" ,displayIn);
}
function operatorEqualToMinus(){
    if(operator==-1 && input1!=""){
        operator="-";
        shownInput.setAttribute("value" ,input1+"-"); }
}
function operatorEqualToPlus(){
    if(operator==-1 && input1!=""){
        operator="+";
        shownInput.setAttribute("value" ,input1+"+"); }
    // console.log("Hellow ")
}
function operatorEqualToMulti(){
    if(operator==-1 && input1!=""){
        operator="*";
        shownInput.setAttribute("value" ,input1+"*"); }
}
function operatorEqualToDivide(){
    if(operator==-1 && input1!=""){
        operator="/";
        shownInput.setAttribute("value" ,input1+"/"); }
}
function operatorEqualToPow(){
    if(operator==-1 && input1!=""){
        operator="^";
        shownInput.setAttribute("value" ,input1+"^"); }
}
function operatorEqualToRem(){
    if(operator==-1 && input1!=""){
        operator="%";
        shownInput.setAttribute("value" ,input1+"%"); }
}
// const myvar=document.getElementById('value_1');
// myvar.addEventListener('click' ,() => {
    //     myvar.innerHTML="Hello world" ;
    //     myvar.style.cursor='pointer'})
function value_ac(){
    input1=input2="";
    operator=-1;
    shownInput.setAttribute("value" ,""); 
    
} 
function printOutput(){
    if(input1=="" || input2=="" || operator==-1){
        shownInput.setAttribute("value" ,"Enter Valid Input"); 
        input1=input2="";
        operator=-1;
        return;
    }
    const result =dooperation(Number(input1),Number(input2),operator);
    shownInput.setAttribute("value" ,result); 
    input1=input2="";
    operator=-1;
}

function dooperation(a,b,operator){
let result=-1;
switch (operator){
    case '+' : result = a+b;
                break;
    case '-' : result =a-b;
                break;
    case "*" : result=a*b;
                break;
    case '/'  : result=a/b;
                break;
    case '%'  : result=a%b;
                break;
    case '^'  : result =pow(a,b);
                break;
}
return result;
}
// Here  is function to calculate a^b;
const pow =(a,b)=>{
    let output=a;
    for(let i=1;i<b;i++){
        output *=output;
    }
    return output;
}