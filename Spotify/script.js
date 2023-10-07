
import {allSongs as allSongsList } from './playbase.js';
const songBase=allSongsList();

// console.log(songBase)

//  ****************Basic Presets and Utility Functions 😀😀**********************************
const MasterPlay=document.getElementById('seek_bar_plpause')
const MusicAnime=document.getElementsByClassName('music-pl-Anime')[0];
const SongItemList=document.getElementsByClassName('song_item');
const seekbar=document.getElementById('seekbarInput');
const currsongname=document.getElementById('currsongname')
const thumb=document.getElementsByClassName('song_thumbnail');
let currIndex=0;
let prevPlayIndex=-1;
let playingIndex=-1;
let songPlaying=false;
let autoplaying=true;
let newSong;
let nextSong;
let currTime=0;
seekbar.value='0';

// ***********************Utiltiy Function ends Here *******************************************
// Adding song element to the list when window loads
// Creating a new song item element
function createSongItem(songData) {
    const songItem = document.createElement("div");
    songItem.className = "song_item flex";
    // Create and append the song item content
    const songThumbnail = document.createElement("div");
    songThumbnail.className = "song_thumbnail";
    songThumbnail.innerHTML = '<img src="Assets/song_thumb.jpg" alt="">';
    songItem.appendChild(songThumbnail);

    const songName = document.createElement("div");

    songName.className = "song_name pointer";
    songName.textContent = songData.name;
    songItem.appendChild(songName);

    const songInfo = document.createElement("div");
    songInfo.className = "song_info flex";

    const songDuration = document.createElement("div");
    songDuration.className = "song_duration";
    songDuration.textContent = songData.duration;
    songInfo.appendChild(songDuration);

    const songPlayPause = document.createElement("div");
    songPlayPause.className = "song_pl_pause";
    songPlayPause.innerHTML = '<i class="fa fa-play-circle pl_pauseButton pointer"></i>';
    songInfo.appendChild(songPlayPause);

    songItem.appendChild(songInfo);

    return songItem;
}

// to add song items to the playlist
function addSongItemsToPlaylist(list) {
    const playlist = document.getElementsByClassName("playlist");
    playlist.innerHTML=null;
    // Loop through the songBase and create song items
    list.forEach(songData => {
        const songItem = createSongItem(songData);
        playlist[0].appendChild(songItem);
    });
}
// Loading Playlist data
window.addEventListener("load", addSongItemsToPlaylist(songBase));
// *******************************Above was code to load playList when window Load ********************
// *******************************Handling play pause and other when song play pause ↓↓↓↓↓↓↓↓↓↓↓↓↓↓********************
function playCurrIndex(currIndex){
    if(songPlaying && currIndex==playingIndex){// clicked on same song
        newSong.pause(); 
        songPlaying=false; 
        playingIndex=currIndex;
        changePpButton();
        otherChangesOnPlay();
        return; 
    }
    else if(songPlaying){// song playing and clicked on new Song
        // currTime=0;
        ppButtonList[playingIndex -1+2].classList.remove('fa-pause-circle')
        ppButtonList[playingIndex -1+2].classList.add('fa-play-circle')
        nextSong =new Audio(songBase[currIndex].src)
        playingIndex=currIndex;
        songPlaying=true;
        newSong.pause();
        nextSong.play();
        nextSong.currTime=currTime;
        newSong=nextSong;
        currsongname.innerHTML=`<p>${songBase[currIndex].name}</p>`;
    } 
    else {
        newSong =new Audio(songBase[currIndex].src)
        newSong.currentTime=currTime;
        playingIndex=currIndex;
        songPlaying=true;
        newSong.play();
        currsongname.innerHTML=`<p>${songBase[currIndex].name}</p>`;
        
    }
    changePpButton();
    otherChangesOnPlay();
    if(autoplaying) {autoplay();} 
    
}

// Changing play pause button if some song is playing 
const ppButtonList=Array.from(document.getElementsByClassName('pl_pauseButton'));
function changePpButton(){
    // console.log(ppButtonList)
    if(songPlaying==true){
        ppButtonList[currIndex-1+2].classList.remove('fa-play-circle')
        ppButtonList[currIndex-1+2].classList.add('fa-pause-circle')
    }
    else if (songPlaying==false) {
        ppButtonList[currIndex-1+2].classList.remove('fa-pause-circle')
        ppButtonList[currIndex-1+2].classList.add('fa-play-circle')
    }
}

// Other changes when song is played
function otherChangesOnPlay(){
    // console.log(ppButtonList)
    
    if(songPlaying==true){
        MasterPlay.classList.remove('fa-play-circle')
        MasterPlay.classList.add('fa-pause-circle')
        MusicAnime.style.opacity='100'

    }
    else{
        MasterPlay.classList.remove('fa-pause-circle')
        MasterPlay.classList.add('fa-play-circle')
        MusicAnime.style.opacity='0'
    }   
   
    // anime around songitem
    if(songPlaying){
        SongItemList[playingIndex +1].classList.add('shadow')
        if(prevPlayIndex !=-1 && prevPlayIndex !=currIndex){
            SongItemList[prevPlayIndex +1].classList.remove('shadow')
        }
        prevPlayIndex =currIndex;
    }     
    else{
        SongItemList[prevPlayIndex +1].classList.remove('shadow')
    } 
    bindSeekBar(newSong);
    playSongNameAnime();
}
//////////////////////////////////////////Handling click on different icons////////////////////////
// ******************************************Master Play *********************************************
    MasterPlay.addEventListener('click' ,() =>{
        if(songPlaying){
            newSong.pause();
            songPlaying=false;
            otherChangesOnPlay();
            changePpButton();
        }
        else if(songPlaying==false && playingIndex==-1){
            playCurrIndex(0);
        }
        else{
            playCurrIndex(currIndex)
        }
    })
    // Handling click on previous next and skip Buttons ,-  -> && << >>
    const next=document.getElementById('next')
    const previous=document.getElementById('previous')
    const skipfor=document.getElementById('skipFor');
    const skipback=document.getElementById('skipBack');
    
    previous.addEventListener('click',()=>{ // go to previous
        if( currIndex != 0 && playingIndex!=-1){
            currIndex -=1;
            playCurrIndex(currIndex)
        }
    })
    next.addEventListener('click',()=>{ // go to next
        const n=songBase.length-1;
        if( currIndex != n && playingIndex!=n){
            currIndex +=1;
            playCurrIndex(currIndex)
        }
    })
    skipback.addEventListener('click',() =>{  // go back by 10 sec
        const newTime=newSong.currentTime - 10;
        newSong.currentTime=newTime;
    })
    skipfor.addEventListener('click',() =>{  // go back by 10 sec
        const newTime=newSong.currentTime + 10;
        newSong.currentTime=newTime;
    })
    
   
//  playing pausing songs when clicked on pl pause  button 







 ppButtonList.forEach((element ,idx) => {
    element.addEventListener('click', () => {
        if(songPlaying==true){
            newSong.pause(); 
            songPlaying=false;
        }
        else {
            currIndex=idx -2 +1;
            playingIndex=currIndex;
            playCurrIndex(currIndex);
            songPlaying=true;
        }
        changePpButton();
        otherChangesOnPlay();
    })
})
// changing currsong Index when click on any element
 const plPauseList=document.querySelectorAll('.song_name')
    plPauseList.forEach( (element,idx) =>{
        element.addEventListener('click' ,() =>{
            // const songNo=element.id;
            currIndex=idx -2 +1;
            playCurrIndex(currIndex);
        })
    })
/////////////////////////////////////////////Other Feature /////////////////////////////////////////////////////////
                           ////////////////1. Autoplay ////////////////////////////////////////////////
     function autoplay(){
        if(songPlaying ){ newSong.addEventListener('ended' ,() =>{
               if(playingIndex !=songBase.length-1){
                    currIndex +=1;
                    playCurrIndex(currIndex);
                    otherChangesOnPlay();
                    changePpButton();
               }
               if(playingIndex==songBase.length -1){
                currIndex=0;
                playCurrIndex(currIndex);
                otherChangesOnPlay();
                changePpButton();
               }
           })
        }
    }
/////////////////////////////////////////////Binding Seek bar //////////////////////////////////
     // To format second time in minute
     function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
      }

      
    // finding Duration of any song  && Time Stamps
    function bindSeekBar(newSong){
        let duration="";
        let durationInMIn="";
        const timepassed=document.getElementById('timepassed')
        const totaltime=document.getElementById('totaltime')

        newSong.addEventListener('loadedmetadata' , () =>{
            duration=newSong.duration;
            durationInMIn +=(String)(formatTime(duration));
            totaltime.innerText=durationInMIn;
        })
        newSong.addEventListener('timeupdate' , () =>{
            currTime=newSong.currentTime;
            let progress = (currTime / duration) * 100;
            seekbar.value=progress;
            timepassed.innerText=formatTime(newSong.currentTime);
        })                
    }
    // handling click on seekBar
    seekbar.addEventListener('input' ,() =>{
        const newTime = newSong.duration * (seekbar.value / 100);
        newSong.currentTime=newTime;
        console.log(seekbar.value)
    })
    // adding animation on song Name when song Load
    function playSongNameAnime(){
        const currsongnameP=currsongname.querySelector('p');
        if(songPlaying==true){
            currsongnameP.style.animation=' songnameAnime 3s cubic-bezier(0.63, 0.63, 0.41, 1.35)'
        }
    }

/////////////////////////////////////////////For Search Bar///////////////////////////////
    const searchBar=document.getElementById('searchBar');
    function linearSearch(input){
        for(let i=0;i<songBase.length;i++){
            if(songBase[i].name.toLowerCase() == input.toLowerCase()){
                return i;
            }
        }
        return -1;
    }
    searchBar.addEventListener('keyup' ,(e)=>{
        let searchInput=searchBar.value;
       
        const searchedSongData=linearSearch(searchInput);
        if( searchedSongData!=-1 ){
            currIndex=searchedSongData;
            playingIndex=searchedSongData;
            currTime=0;
            playCurrIndex(currIndex);
        }
        
    })

//////////////////////////////////////////JS fOR  Html CSS or some Utility work function///////////////////////////
// Opening the new Add song window when click on the plus icon
    const plusIcon=document.getElementById('plus_circle')
    plusIcon.addEventListener('click' ,() =>{
        window.open('ValidForm/index.html')
    })
    
    // Showing More feature
    const ellipsis=document.getElementById('ellipsis')
    const moreFeature=document.getElementById('MoreFeature')
    ellipsis.addEventListener('click' , () =>{
        moreFeature.classList.toggle('disappear')
    })
    // auto play icon setting
    const autoplaytoggle=document.getElementById('autoplay-toggle')
    autoplaytoggle.addEventListener('click' ,() =>{
        autoplaytoggle.classList.toggle('fa-toggle-off')
        autoplaytoggle.classList.toggle('fa-toggle-on')
        if(autoplaying==true){autoplaying=false;}
        else{
            autoplaying=true;
        }
    })

    // const filterButton=document.getElementsByClassName("filterButton")[0];
    // filterButton.addEventListener('click' ,() =>{
        //  filterButton.style.backgroundColor ="red"
        //  const newsongBase=songBase.filter((currvalue)=>{
        //     if(currvalue.singer =='Badshah') {return true;}
        //  })
        //  console.log( newsongBase) 
        //      addSongItemsToPlaylist(newsongBase);
        
        // })   // updating Soon
/// Basic functionality for home screen
// window.addEventListener('keypress')
window.addEventListener('keydown' ,(e) =>{
    const activeElement =document.activeElement;
    if(activeElement.tagName=='INPUT' ){return;}
    if(e.key == 'k' || e.key==' ' ){
        if(songPlaying){
            newSong.pause();
            songPlaying=false;
            otherChangesOnPlay();
            changePpButton();
        }
        else if(songPlaying==false && playingIndex==-1){
            playCurrIndex(0);
        }
        else{
            playCurrIndex(currIndex)
        }
    }
    if(e.key == 'l'){
            const n=songBase.length-1;
            if( currIndex != n && playingIndex!=n){
                currIndex +=1;
                playCurrIndex(currIndex)
            }
    }
    if(e.key == 'j'){
            if( currIndex != 0 && playingIndex!=-1){
                currIndex -=1;
                playCurrIndex(currIndex)
            }
    }
    if(e.key == 'ArrowRight' && songPlaying){
            const newTime=newSong.currentTime + 10;
            newSong.currentTime=newTime;
    }
    if(e.key == 'ArrowLeft' && songPlaying){
            const newTime=newSong.currentTime - 10;
            newSong.currentTime=newTime;   
    }





})
