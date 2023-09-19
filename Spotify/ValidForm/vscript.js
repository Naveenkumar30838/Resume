
const orgsongList =[
    // Song Name Url Duration 
    ["Filhall" , "Assets/Filhall.mp3" ,"00:28"],
    ["Mein Dil Laya" , "Assets/MeinDilLaya.mp3" ,"02:463"], 
    ["Brown_munde" , "Assets/Brown_Munde.mp3" ,"04:27"],
    ["Qara" , "Assets/Qara.mp3" ,"00:30"], 
    ["Illegal Weapon" , "Assets/illegalWeapon.mp3" ,"03:08"], 
    ["Mehbooba" , "Assets/Mehbooba.mp3" ,"03:38"], 
    ["California" , "Assets/california.mp3" ,"02:55"], 
    ["Mere Raske Qamar" , "Assets/Mere Raske Qamar.mp3" ,"03:40"], 
    ["Dus Numbari" , "Assets/dus_Numberi.mp3" ,"02:25"], 
    ["Long Drive" , "Assets/Long_drive.mp3" ,"02:30"], 
    ["Lahore" , "Assets/Lahore (1).mp3" ,"03:17"], 
    ["Tere Naam" , "Assets/terenaam.mp3" ,"06:35"], 
    ["Birthday" , "Assets/Birthday.mp3" ,"03:58"], 
    ["Heartless" , "Assets/Heartless.mp3" ,"07:22"], 
    ["Mere Warga" , "Assets/MereWarga.mp3" ,"04:45"], 
    ["Parinday" , "Assets/parinday.mp3" ,"04:23"], 
    ["Ranjha" , "Assets/Ranjha.mp3" ,"03:50"], 
    ["Raatan Lambiya" , "Assets/Raataan Lambiyan .mp3" ,"03:53"], 
    ["Yaar Purane" , "Assets/Yaarpuran.mp3" ,"04:52"], 
    ["Yalgaar" , "Assets/Yalgaar.mp3" ,"03:15"], 
    ["Tu hai Ki Nahi" , "Assets/Tu_Hai_Ki_Nahi.mp3" ,"05:34"], 
    
]
export function orgsongListFun() {
 return orgsongList;
}
function isValid(songName, songLocation,songduration){
    const nameLen=songName.length;
   if( nameLen>10 || nameLen==0 ) {return "Enter Name in proper format"}
   const locLen=songLocation.length ;
   if(songLocation.charAt(locLen-1) !=3  || locLen<=3){return "Not a mp3 file"}
   const dur=songduration.length;
   if(dur<=0 || dur>4){return "Enter Duration in Proper Format"}
   return true;
}

// const myForm=document.getElementById('myForm');
// console.log(myForm)
// myForm.addEventListener('submit' ,(event) => {
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

//    }
// )
// function to add song to the playlist
// function addSongToPlayList(songName,songLocation,songlength){
//     const len=orgsongList.length-1;
//     orgsongList[len][0]=songName;
//     orgsongList[len][1]=songLocation;
//     orgsongList[len][2]=songlength;
// }
// console.log(orgsongList[orgsongList.length-1])
