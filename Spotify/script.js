import {orgsongListFun as copiedList } from './ValidForm/vscript.js'
const  songList=copiedList();
console.log(songList)

//  ****************Basic Presets and Utility Functions 😀😀**********************************
let currIndex=0;
let playingIndex=-1;
let songPlaying=false;
let newSong;
let nextSong;
const MasterPlay=document.getElementById('seek_bar_plpause')
const MusicAnime=document.getElementsByClassName('music-pl-Anime')[0];

    // To format second time in minute
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
      }
      
    // finding Duration of any song
    // function getDuration(idx){
    //   const x=new Audio(songList[3][1]);
    //   let duration="";
    //   x.addEventListener('loadedmetadata' , () =>{
    //       const dur=x.duration;
    //       duration +=(String)(formatTime(dur))        
    //       console.log(duration)
    //     })
    //    return duration;
    // }

    // console.log(getDuration(2))


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
    if(songPlaying && currIndex==playingIndex){
        newSong.pause(); 
        songPlaying=false; 
        playingIndex=currIndex;
        changePpButton();
        otherChangesOnPlay();
        return; 
    }
    else if(songPlaying){
        ppButtonList[playingIndex -1+2].classList.remove('fa-pause-circle')
        ppButtonList[playingIndex -1+2].classList.add('fa-play-circle')
        nextSong =new Audio(songList[currIndex][1])
        playingIndex=currIndex;
        songPlaying=true;
        newSong.pause();
        nextSong.play();
        newSong=nextSong;
    } 
    else {
        newSong =new Audio(songList[currIndex][1])
        playingIndex=currIndex;
        songPlaying=true;
        newSong.play();
    }
    changePpButton();
    otherChangesOnPlay();
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
    // Handling click on previous next button
    const next=document.getElementById('next')
    const previous=document.getElementById('previous')
    previous.addEventListener('click',()=>{
        if( currIndex != 0 && playingIndex!=-1){
            currIndex -=1;
            playCurrIndex(currIndex)
        }
    })
    next.addEventListener('click',()=>{
        const n=songList.length-1;
        if( currIndex != n && playingIndex!=n){
            currIndex +=1;
            playCurrIndex(currIndex)
        }
    })
 // playing pausing songs when clicked on pl pause  button 
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

//////////////////////////////////////////JS fOR  Html CSS or some Utility work function///////////////////////////
// Opening the new Add song window when click on the plus icon
    const plusIcon=document.getElementById('plus_circle')
    plusIcon.addEventListener('click' ,() =>{
        window.open('ValidForm/index.html')
    })
    
