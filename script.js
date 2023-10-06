    const popupButton =document.getElementById('popup-button');
    const crossbutton=document.getElementById('cross-button');
    const  body=document.getElementById('body');
    const  yellowbutton=document.getElementById('yellow_mode_button');
    const  darkbutton=document.getElementById('dark_mode_button');
    const head_image =document.getElementById('header_image_img')
    // Hamburger Handling
    crossbutton.addEventListener('click' , ()=>{
    popupButton.classList.toggle('disappear');
    })

    const hamburger=document.getElementById('hamburger');
    const topnav_content=document.getElementById('topnav_content');
    hamburger.addEventListener('click' , ()=>{
    topnav_content.classList.toggle('active');
    })

    // Handling mouseEnter or leave on projects
    const projectInnerdiv=Array.from(document.getElementsByClassName('project_innerdiv'));
        projectInnerdiv.forEach((e) => {
            const projectInnerdivContent= e.querySelector('div');
            e.addEventListener('mouseenter' , () =>{
                projectInnerdivContent.classList.add('project_innerdiv_content_hover');
            })
            e.addEventListener('mouseleave' , () =>{
                projectInnerdivContent.classList.remove('project_innerdiv_content_hover');
            })
        });

//here is the code for dark or yellow mode
    yellowbutton.addEventListener('click' ,() =>{
        body.classList.toggle('sepia');   
    })
    darkbutton.addEventListener('click' ,() =>{
        body.classList.toggle('dark') ;  
    })
// For changing the profile Image continuously
let lastTime=0;
let speed=1;
let idx=1;
function main(currTime){
    window.requestAnimationFrame(main);
    if((currTime -lastTime)/3000 <= 1/speed){return}
    lastTime =currTime;
    changeImage(idx); 
    if(idx==ImgList.length -1){idx=0;}
    else{idx++;}
}
function changeImage(idx){
    head_image.src=ImgList[idx];
    console.log("Change Image was Called")
}
window.addEventListener('load' ,() =>{
 setTimeout(() => {
        main();
    } , 4000)
});
const ImgList= [
    "images/Naveen_1.jpg" ,
    "images/Naveen_toon.jpg" ,
    "images/profilePhoto1.png" ,
    "images/profile-pic (2).png"
]

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle scroll events
function handleScroll(animatedItem) {
    if (isInViewport(animatedItem)) {
        animatedItem.style.opacity = '1';
        animatedItem.style.transform = 'translateY(0)';
    } else {
        animatedItem.style.opacity = '0';
        animatedItem.style.transform = 'translateY(30px)';
    }
}

// Add an event listener to the 'scroll' event
window.addEventListener('scroll', () =>{
    projectInnerdiv.forEach((e) =>{
        handleScroll(e)
    })
});

// Handling clicks on prefooter project box
const pre_ftr_box=Array.from(document.getElementsByClassName('pre-ftr-box'));
const urlList=[
    'https://naveenkumar30838.github.io/Resume/Spotify/index.html',
    'https://naveenkumar30838.github.io/Resume/calculator/',
    'https://naveenkumar30838.github.io/Resume/Snake/'
]
pre_ftr_box.forEach((e ,index) => {
    e.addEventListener('click' ,()=>{
        window.open(urlList[index]);
    })
});
