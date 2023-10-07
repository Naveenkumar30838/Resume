
function isValid(songName, songLocation,songduration){
    const nameLen=songName.length;
   if( nameLen>10 || nameLen==0 ) {return "Enter Name in proper format"}
   const locLen=songLocation.length ;
   if(songLocation.charAt(locLen-1) !=3  || locLen<=3){return "Not a mp3 file"}
   const dur=songduration.length;
   if(dur<=0 || dur>4){return "Enter Duration in Proper Format"}
   return true;
}

const myForm=document.getElementById('myForm');
// console.log(myForm)
myForm.addEventListener('submit' ,(event) => {
    window.aler("it will be updated Soon");
//     event.preventDefault();
//     const songName=document.getElementById("Name").value;
//     const songLocation=document.getElementById("location").value;
//     const songlength=document.getElementById("duration").value;

//     const validcheck=isValid(songName,songLocation,songlength);
//     console.log(validcheck)
//     if(validcheck!=true){
//         window.alert(validcheck)
//     }
//     else {
//         addSongToPlayList(songName,songLocation,songlength);
//     }

   }
// )
// function to add song to the playlist
// function addSongToPlayList(songName,songLocation,songlength){
//     const len=orgsongList.length-1;
//     orgsongList[len][0]=songName;
//     orgsongList[len][1]=songLocation;
//     orgsongList[len][2]=songlength;
// }
// console.log(orgsongList[orgsongList.length-1])
