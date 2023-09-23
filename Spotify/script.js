import {orgsongListFun as copiedList } from './ValidForm/vscript.js'
import {allSongs as allSongsList } from './playbase.js';
const songBase=allSongsList();

const  songList=copiedList();
// console.log(songList)

//  ****************Basic Presets and Utility Functions 😀😀**********************************
const MasterPlay=document.getElementById('seek_bar_plpause')
const MusicAnime=document.getElementsByClassName('music-pl-Anime')[0];
const SongItemList=document.getElementsByClassName('song_item');
const seekbar=document.getElementById('seekbarInput');
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
    songName.textContent = songData[0];
    songItem.appendChild(songName);

    const songInfo = document.createElement("div");
    songInfo.className = "song_info flex";

    const songDuration = document.createElement("div");
    songDuration.className = "song_duration";
    songDuration.textContent = songData[2];
    songInfo.appendChild(songDuration);

    const songPlayPause = document.createElement("div");
    songPlayPause.className = "song_pl_pause";
    songPlayPause.innerHTML = '<i class="fa fa-play-circle pl_pauseButton pointer"></i>';
    songInfo.appendChild(songPlayPause);

    songItem.appendChild(songInfo);

    return songItem;
}

// to add song items to the playlist
function addSongItemsToPlaylist() {
    const playlist = document.getElementsByClassName("playlist");
    // Loop through the songList and create song items
    songList.forEach(songData => {
        const songItem = createSongItem(songData);
        playlist[0].appendChild(songItem);
    });
}
// Loading Playlist data
window.addEventListener("load", addSongItemsToPlaylist());
// *******************************Above was code to load playList when window Load ********************
// *******************************Handling play pause and other when song play pause ↓↓↓↓↓↓↓↓↓↓↓↓↓↓********************
function playCurrIndex(currIndex){
    if(songPlaying && currIndex==playingIndex){// clicked on same song
        // currTime=newSong.currTime;
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
        nextSong =new Audio(songList[currIndex][1])
        playingIndex=currIndex;
        songPlaying=true;
        newSong.pause();
        nextSong.play();
        nextSong.currTime=currTime;
        newSong=nextSong;
    } 
    else {
        newSong =new Audio(songList[currIndex][1])
        newSong.currentTime=currTime;
        playingIndex=currIndex;
        songPlaying=true;
        newSong.play();
        
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
        const n=songList.length-1;
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
               if(playingIndex !=songList.length-1){
                    currIndex +=1;
                    playCurrIndex(currIndex);
                    otherChangesOnPlay();
                    changePpButton();
               }
               if(playingIndex==songList.length -1){
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

/////////////////////////////////////////////For Search Bar///////////////////////////////
    const searchBar=document.getElementById('searchBar');
    searchBar.addEventListener('keyup' ,()=>{
        let searchInput=searchBar.value;
        if(linearSearch(searchInput) !=-1){
            currIndex=linearSearch(searchInput);
            playCurrIndex(currIndex);
        }
    })
    function linearSearch(input){
        for(let i=0;i<songList.length;i++){
            if(songList[i][0] == input){
                return i;
            }
        }
        return -1;
    }
    // creating a new Element if Search occured SuccessFully


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
