import {allSongs as allSongsList } from './playbase.js';
let songBase=allSongsList();
//  ****************Basic Presets and Utility Functions 😀😀**********************************
const MasterPlay=document.getElementById('seek_bar_plpause')
const MusicAnime=document.getElementsByClassName('music-pl-Anime')[0];
const SongItemList=document.getElementsByClassName('song_item');
const seekbar=document.getElementById('seekbarInput');
const currsongname=document.getElementById('currsongname')
const plusIcon=document.getElementById('plus_circle')
const autoplaytoggle=document.getElementById('autoplay-toggle')
const looptoggle=document.getElementById('loop-toggle')
const ellipsis=document.getElementById('ellipsis')
const moreFeature=document.getElementById('MoreFeature')
const punjabi= document.getElementById('punjabi')
const all= document.getElementById('all')
const Bollywood= document.getElementById('Bollywood')
const jubin= document.getElementById('jubin')
const single= document.getElementById('single')
const sad= document.getElementById('sad')
const happy= document.getElementById('happy')
const cool= document.getElementById('cool')

let currIndex=0;
let prevPlayIndex=-1;
let playingIndex=-1;
let songPlaying=false;
let autoplaying=true;
let looping=true;
let newSong;
let nextSong;
let currTime=0;
seekbar.value='0';
let currlist=songBase;

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
    // songPlayPause.innerHTML = '<i class="fa fa-play-circle pl_pauseButton pointer"></i>';
    songInfo.appendChild(songPlayPause);

    songItem.appendChild(songInfo);

    return songItem;
}

// to add song items to the playlist
function addSongItemsToPlaylist(list) {
    const playlist = document.getElementsByClassName("playlist")[0];
    playlist.innerHTML="";
    // Loop through the songBase and create song items
    list.forEach(songData => {
        const songItem = createSongItem(songData);
        playlist.appendChild(songItem);
    });
}
// Loading Playlist data
window.addEventListener("load", () =>{
    setTimeout(() => {
        addSongItemsToPlaylist(songBase)
    }, 1000);
    setTimeout(() => {
        activateNameClick();
        // changePpButton();
        // activatePPButtonList();
    }, 2000);
})
// *******************************Above was code to load playList when window Load ********************
// *******************************Handling play pause and other when song play pause ↓↓↓↓↓↓↓↓↓↓↓↓↓↓********************
function playCurrIndex(currIndex , currlist){
    if(songPlaying && currIndex==playingIndex){// clicked on same song
        newSong.pause(); 
        songPlaying=false; 
        playingIndex=currIndex;
        changePpButton();
        otherChangesOnPlay();
        return; 
    }else if(songPlaying){// song playing and clicked on new Song
        // const ppButtonList=makePPButtonList();
        nextSong =new Audio(currlist[currIndex].src)
        // ppButtonList[playingIndex].classList.remove('fa-pause-circle')
        // ppButtonList[playingIndex].classList.add('fa-play-circle')
        playingIndex=currIndex;
        songPlaying=true;
        newSong.pause();
        nextSong.play();
        nextSong.currTime=currTime;
        newSong=nextSong;
        currsongname.innerHTML=`<p>${currlist[currIndex].name}</p>`;
    } 
    else {
        if(currIndex!=playingIndex){
            currTime=0;
        }
        newSong =new Audio(currlist[currIndex].src)
        newSong.currentTime=currTime;
        playingIndex=currIndex;
        songPlaying=true;
        newSong.play();
        currsongname.innerHTML=`<p>${currlist[currIndex].name}</p>`;  
    }
    // changePpButton();
    otherChangesOnPlay();
    if(autoplaying){
        autoplay(currlist);
    }
}
// Changing play pause button if some song is playing 
// function makePPButtonList(){
//     return Array.from(document.getElementsByClassName('pl_pauseButton'));
// }
// function changePpButton(){
//     const ppButtonList=makePPButtonList();
//     if(songPlaying==true){
//         ppButtonList[currIndex].classList.remove('fa-play-circle')
//         ppButtonList[currIndex].classList.add('fa-pause-circle')
//     }
//     else if (songPlaying==false) {
//         ppButtonList[currIndex].classList.remove('fa-pause-circle')
//         ppButtonList[currIndex].classList.add('fa-play-circle')
//     }
// }
   
//  playing pausing songs when clicked on pl pause  button 
function activatePPButtonList() {
const ppButtonList=makePPButtonList();
    ppButtonList.forEach((element ,idx) => {
        element.addEventListener('click', () => {
            if(songPlaying==true && idx==playingIndex){
                newSong.pause(); 
                songPlaying=false;
            }
            else {
            currIndex=idx;
            playCurrIndex(currIndex, currlist)
            songPlaying=true;
        }
        changePpButton();
        otherChangesOnPlay();
    })
})
}
// Other changes when song is played
function otherChangesOnPlay(){
    if(songPlaying==true){
        MasterPlay.classList.remove('fa-play-circle')
        MasterPlay.classList.add('fa-pause-circle')
        MusicAnime.style.opacity='100'
        // anime around songItem
        SongItemList[playingIndex].classList.add('shadow')
        if(prevPlayIndex !=-1 && prevPlayIndex !=currIndex){
            SongItemList[prevPlayIndex].classList.remove('shadow')
        }
        prevPlayIndex =currIndex;
    }
    else{
        MasterPlay.classList.remove('fa-pause-circle')
        MasterPlay.classList.add('fa-play-circle')
        MusicAnime.style.opacity='0'
        SongItemList[prevPlayIndex].classList.remove('shadow')
    }   
    bindSeekBar(newSong);
    playSongNameAnime();
}
//////////////////////////////////////////Handling click on different icons////////////////////////
// ******************************************Master Play *********************************************
    MasterPlay.addEventListener('click' ,() =>{
        if(songPlaying){
        playingIndex=-1;
            newSong.pause();
            songPlaying=false;
            otherChangesOnPlay();
            changePpButton();
        }
        else if(songPlaying==false && playingIndex==-1){
            playCurrIndex(0 , currlist);
        }
        else{
            playCurrIndex(currIndex, currlist)
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
            playCurrIndex(currIndex, currlist)
        }
    })
    next.addEventListener('click',()=>{ // go to next
        const n=songBase.length-1;
        if( currIndex != n && playingIndex!=n){
            currIndex +=1;
            playCurrIndex(currIndex,currlist)
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
    
// changing currsong Index when click on any element
function activateNameClick(){ ///Here creating func. so that when playlist is changed we can recall this function to refresh
    const plPauseList=document.querySelectorAll('.song_name')
       plPauseList.forEach( (element,idx) =>{
           element.addEventListener('click' ,() =>{
               currIndex=idx;
               playCurrIndex(currIndex,currlist);
           })
       })
}

/////////////////////////////////////////////Other Feature /////////////////////////////////////////////////////////
                           ////////////////1. Autoplay ////////////////////////////////////////////////
     function autoplay(currlist){
        if(songPlaying ){
            newSong.addEventListener('ended' ,() =>{
               if(playingIndex !=currlist.length-1){
                    currIndex=currIndex+1;
                    currTime=0;
                    playCurrIndex(currIndex,currlist);
                    playingIndex=currIndex;
                    otherChangesOnPlay();
                    changePpButton();
               }
               else if (looping){
                   currIndex = 0;
                   currTime=0;
                   playCurrIndex(currIndex,currlist);
                   playingIndex=0;
                    otherChangesOnPlay();
                    changePpButton();
               }
               else{
                currTime=0;
                newSong.pause();
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
        if(songPlaying){
        playingIndex=-1;
            const newTime = newSong.duration * (seekbar.value / 100);
            newSong.currentTime=newTime;
        }
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
            playCurrIndex(currIndex,currlist);
        }
        
    })
//////////////////////////////////////////JS fOR  Html CSS or some Utility work function///////////////////////////
// Opening the new Add song window when click on the plus icon
    plusIcon.addEventListener('click' ,() =>{
     //    window.open('ValidForm/index.html')
     window.alert("Coming Soon ......")
    })  
    // Showing More feature
    ellipsis.addEventListener('click' , () =>{
        moreFeature.classList.toggle('disappear')
    })
    // auto play icon setting
    autoplaytoggle.addEventListener('click' ,() =>{
        autoplaytoggle.classList.toggle('fa-toggle-off')
        autoplaytoggle.classList.toggle('fa-toggle-on')
        if(autoplaying==true){autoplaying=false;}
        else{
            autoplaying=true;
        }
    })
    // loop icon settings
    looptoggle.addEventListener('click' ,() =>{
        looptoggle.classList.toggle('fa-toggle-on')
        looptoggle.classList.toggle('fa-toggle-off')
        if(looping==true){looping=false;}
        else{
            looping=true;
        }
    })
    // Making all playlist to be primary
    all.classList.add('whiteback')
window.addEventListener('keydown' ,(e) =>{
    const activeElement =document.activeElement;
    if(activeElement.tagName=='INPUT' ){return;}
    if(e.key == 'k' || e.key==' ' ){
        if(songPlaying){
        playingIndex=-1;
            newSong.pause();
            songPlaying=false;
            otherChangesOnPlay();
            changePpButton();
        }
        else if(songPlaying==false && playingIndex==-1){
            playCurrIndex(0,currlist);
        }
        else{
            playCurrIndex(currIndex,currlist)
        }
    }
    if(e.key == 'l'){
            const n=songBase.length-1;
            if( currIndex != n && playingIndex!=n){
                currIndex +=1;
                playCurrIndex(currIndex,currlist)
            }
    }
    if(e.key == 'j'){
            if( currIndex != 0 && playingIndex!=-1){
                currIndex -=1;
                playCurrIndex(currIndex,currlist)
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
  // changing the background color when clicked on any of item on sorting List
const sortListElement =document.querySelectorAll(".sortList div")
    sortListElement.forEach((e) =>{
        e.addEventListener('click',()=>{
            sortListElement.forEach((e) =>{
                if(e.classList.contains('whiteback')){e.classList.remove('whiteback')}
            })
            e.classList.add('whiteback')
        })
    })
function bringChanges(){
    
    activateNameClick();
    changePpButton();
    activatePPButtonList();
}
all.addEventListener('click',() =>{
    songBase=allSongsList();
    currlist=songBase;
    addSongItemsToPlaylist(currlist);
    bringChanges();
    if(songPlaying){
        playingIndex=-1;
        currTime=0;
        songPlaying=false;
        newSong.pause();
        otherChangesOnPlay();
        changePpButton();
    }
})
punjabi.addEventListener('click' ,() =>{
    songBase=allSongsList();
    const punjabiSongList=songBase.filter((element) =>{
        if(element.category=="Punjabi"){return true;}
        else {
            return false;
        }
    })
    if(songPlaying){
        playingIndex=-1;
        currTime=0;
        songPlaying=false;
        newSong.pause();
        otherChangesOnPlay();
        changePpButton();
    }
    currlist=punjabiSongList;
    songBase=currlist;
    addSongItemsToPlaylist(currlist);
    setTimeout(() => {
        bringChanges()
    }, 500);
})
jubin.addEventListener('click' ,() =>{
    songBase=allSongsList();
    const jubinSongList=songBase.filter((element) =>{
        if(element.singer=="jubin Nautiyal"){return true;}
        else {
            return false;
        }
    })
    if(songPlaying){
        playingIndex=-1;
        currTime=0;
        songPlaying=false;
        newSong.pause();
        otherChangesOnPlay();
        changePpButton();
    }
    currlist=jubinSongList;
    songBase=currlist;
    addSongItemsToPlaylist(currlist);
    setTimeout(() => {
        bringChanges()
    }, 500);
})
Bollywood.addEventListener('click' ,() =>{
    songBase=allSongsList();
    const bollySongList=songBase.filter((element) =>{
        if(element.category=="bollywood"){return true;}
        else {
            return false;
        }
    })
    if(songPlaying){
        playingIndex=-1;
        currTime=0;
        songPlaying=false;
        newSong.pause();
        otherChangesOnPlay();
        changePpButton();
    }
    currlist=bollySongList;
    songBase=currlist;

    addSongItemsToPlaylist(currlist)
    setTimeout(() => {
        bringChanges()
    }, 500);

})
lofi.addEventListener('click' ,() =>{
    songBase=allSongsList();
    const lofiSongList=songBase.filter((element) =>{
        if(element.category=="lofi"){return true;}
        else {
            return false;
        }
    })
    if(songPlaying){
        playingIndex=-1;
        currTime=0;
        songPlaying=false;
        newSong.pause();
        otherChangesOnPlay();
        changePpButton();
    }
    currlist=lofiSongList;
    songBase=currlist;

    addSongItemsToPlaylist(currlist)
    setTimeout(() => {
        bringChanges()
    }, 500);
})
happy.addEventListener('click' ,() =>{
    songBase=allSongsList();
    const lofiSongList=songBase.filter((element) =>{
        if(element.genre=="happy"){return true;}
        else {
            return false;
        }
    })
    if(songPlaying){
        playingIndex=-1;
        currTime=0;
        songPlaying=false;
        newSong.pause();
        otherChangesOnPlay();
        changePpButton();
    }
    currlist=lofiSongList;
    songBase=currlist;

    addSongItemsToPlaylist(currlist)
    setTimeout(() => {
        bringChanges()
    }, 500);
})
cool.addEventListener('click' ,() =>{
    songBase=allSongsList();
    const lofiSongList=songBase.filter((element) =>{
        if(element.genre=="cool"){return true;}
        else {
            return false;
        }
    })
    if(songPlaying){
        playingIndex=-1;
        currTime=0;
        songPlaying=false;
        newSong.pause();
        otherChangesOnPlay();
        changePpButton();
    }
    currlist=lofiSongList;
    songBase=currlist;

    addSongItemsToPlaylist(currlist)
    setTimeout(() => {
        bringChanges()
    }, 500);
})
sad.addEventListener('click' ,() =>{
    songBase=allSongsList();
    const lofiSongList=songBase.filter((element) =>{
        if(element.genre=="sad"){return true;}
        else {
            return false;
        }
    })
    if(songPlaying){
        playingIndex=-1;
        currTime=0;
        songPlaying=false;
        newSong.pause();
        otherChangesOnPlay();
        changePpButton();
    }
    currlist=lofiSongList;
    songBase=currlist;

    addSongItemsToPlaylist(currlist)
    setTimeout(() => {
        bringChanges()
    }, 500);
})
single.addEventListener('click' ,() =>{
    songBase=allSongsList();
    const lofiSongList=songBase.filter((element) =>{
        if(element.category=="single"){return true;}
        else {
            return false;
        }
    })
    if(songPlaying){
        playingIndex=-1;
        currTime=0;
        songPlaying=false;
        newSong.pause();
        otherChangesOnPlay();
        changePpButton();
    }
    currlist=lofiSongList;
    songBase=currlist;

    addSongItemsToPlaylist(currlist)
    setTimeout(() => {
        bringChanges()
    }, 500);
})
