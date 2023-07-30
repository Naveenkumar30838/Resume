 
 
    const popupButton =document.getElementById('popup-button');
    const crossbutton=document.getElementById('cross-button');
    crossbutton.addEventListener('click' , ()=>{
    popupButton.classList.toggle('disappear');
    })

    const hamburger=document.getElementById('hamburger');
    const topnav_content=document.getElementById('topnav_content');
    hamburger.addEventListener('click' , ()=>{
    topnav_content.classList.toggle('active');
    })

    // Here i am avoiding to write the mouse remove function to keep it somewhat more funky
    const project_innerdiv=document.getElementById('project_innerdiv');
    const project_innerdiv_content=document.getElementById('project_innerdiv_content');
    project_innerdiv.addEventListener("mouseenter", function(){
        project_innerdiv_content.classList.toggle('project_innerdiv_content_hover')});
// here is same script for project 2
        const project_innerdiv_2=document.getElementById('project_innerdiv_2');
    const project_innerdiv_content_2=document.getElementById('project_innerdiv_content_2');
    project_innerdiv_2.addEventListener("mouseenter", function(){
        project_innerdiv_content_2.classList.toggle('project_innerdiv_content_hover')});

// here is same script for project 3
        const project_innerdiv_3=document.getElementById('project_innerdiv_3');
    const project_innerdiv_content_3=document.getElementById('project_innerdiv_content_3');
    project_innerdiv_3.addEventListener("mouseenter", function(){
        project_innerdiv_content_3.classList.toggle('project_innerdiv_content_hover')});
//here is the code for dark or yellow mode
const  body=document.getElementById('body');
const  yellowbutton=document.getElementById('yellow_mode_button');
const  darkbutton=document.getElementById('dark_mode_button');
yellowbutton.addEventListener('click' ,() =>{
    body.classList.toggle('sepia');   
})
darkbutton.addEventListener('click' ,() =>{
    body.classList.toggle('dark') ;  
})