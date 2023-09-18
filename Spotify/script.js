import {orgsongListFun as copiedList } from './ValidForm/vscript.js'
const  songList=copiedList();
console.log(songList)

// Intiliazing the variables
let currIndex=0;
let playingIndex=-1;
let srNo=-1;
let songPlaying=false;
let newSong;
let nextSong;

// code  to add song element to the list when window loads
// Function to create a new song item element
function createSongItem(songData) {
    const songItem = document.createElement("div");
    songItem.className = "song_item flex";
    // Create and append the song item content
    const songThumbnail = document.createElement("div");
    songThumbnail.className = "song_thumbnail";
    songThumbnail.innerHTML = '<img src="Assets/song_thumb.jpg" alt="">';
    songItem.appendChild(songThumbnail);

    const songName = document.createElement("div");
    srNo+=1;
    songName.className = "song_name pointer";
    songName.id=srNo;
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

// Function to add song items to the playlist
function addSongItemsToPlaylist() {
    const playlist = document.getElementsByClassName("playlist");
    
    // Loop through the songList and create song items
    songList.forEach(songData => {
        const songItem = createSongItem(songData);
        playlist[0].appendChild(songItem);
    });
}
// Call the function when the window loads
window.addEventListener("load", addSongItemsToPlaylist());
// *******************************Above was code to load playList when window Load ********************
// changing currsong Index when click on any element

const plPauseList=document.querySelectorAll('.song_name')
    plPauseList.forEach( (element) =>{
        element.addEventListener('click' ,() =>{
            const songNo=element.id;
            currIndex=songNo;
            // const newSong=new Audio(songList[currIndex][1]);
            // newSong.play();
            console.log("clicked Element NO " ,currIndex)
            playCurrIndex(currIndex);
        }
        )
    }
    )
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
        nextSong =new Audio(songList[currIndex][1])
        playingIndex=currIndex;
        songPlaying=true;
        newSong.pause();
        nextSong.play();
        newSong=nextSong;
        changePpButton();
    } 
    else {
        newSong =new Audio(songList[currIndex][1])
        playingIndex=currIndex;
        songPlaying=true;
        newSong.play();
        changePpButton();
    }
    otherChangesOnPlay();
}

// Changing play pause button if some song is playing 
const ppButtonList=Array.from(document.getElementsByClassName('pl_pauseButton'));
function changePpButton(){
    // console.log(ppButtonList)
    if(songPlaying==true){
        ppButtonList[currIndex-1+2].classList.remove('fa-play-circle')
        ppButtonList[currIndex-1+2].classList.add('fa-pause-circle')
        console.log("Changed SuccessFully")
    }
    else if (songPlaying==false) {
        ppButtonList[currIndex-1+2].classList.remove('fa-pause-circle')
        ppButtonList[currIndex-1+2].classList.add('fa-play-circle')
    }
}

// Other changes when song is played
function otherChangesOnPlay(){
    // console.log(ppButtonList)
    const MasterPlay=document.getElementById('seek_bar_plpause')
    const MusicAnime=document.getElementsByClassName('music-pl-Anime')[0];

    if(songPlaying==true){
        MasterPlay.classList.remove('fa-play-circle')
        MasterPlay.classList.add('fa-pause-circle')
        MusicAnime.style.opacity='100'

    }
    else if (songPlaying==false) {
        MasterPlay.classList.remove('fa-pause-circle')
        MasterPlay.classList.add('fa-play-circle')
        MusicAnime.style.opacity='0'
        console.log("Hello there")
    }
}

    // playing pausing songs when clicked on pl pause  button 
    ppButtonList.forEach((element) => {
        element.addEventListener('click', () => {
            if(songPlaying==true){
                newSong.pause(); 
            }
            else {
                newSong.play();
            }
            changePpButton();
            otherChangesOnPlay();
        })
    })
      





// Opening the new Add song window when click on the plus icon
const plusIcon=document.getElementById('plus_circle')
plusIcon.addEventListener('click' ,() =>{
    window.open('ValidForm/index.html')
})


