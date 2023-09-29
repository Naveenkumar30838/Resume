
const playlist =[
    // Song Name Url Duration 
    {name: "Challeya" ,src:"Files/Chaleya.mp3" , duration: "03:20" , singer: ""},  
    {name: "California" , src: "Files/california.mp3" ,duration: "02:55" , singer: ""}, 
    {name: "Mere Raske Qamar" , src: "Files/Mere Raske Qamar.mp3" ,duration:"03:40" , singer: ""}, 
    {name: "Dus Numbari" , src: "Files/dus_Numberi.mp3" ,duration:"02:25" , singer: ""}, 
    {name: "Long Drive" , src: "Files/Long_drive.mp3" ,duration: "02:30" , singer: ""}, 
    {name: "Lahore" , src: "Files/Lahore (1).mp3" ,duration: "03:17",singer:""}, 
    {name: "Tere Naam" , src: "Files/terenaam.mp3" ,duration:"06:35",singer:""}, 
    {name: "Birthday" , src: "Files/Birthday.mp3" ,duration: "03:58",singer:""}, 
    {name: "Heartless" , src: "Files/Heartless.mp3" ,duration: "07:22" , singer:"Badshah"}, 
    {name: "Mere Warga" , src: "Files/MereWarga.mp3" ,duration: "04:45" ,singer:""}, 
    {name: "Yaar Purane" , src: "Files/Yaarpuran.mp3" ,duration: "04:52" ,singer:""}, 
    {name: "Tu hai Ki Nahi" , src: "Files/Tu_Hai_Ki_Nahi.mp3" ,duration: "05:34" ,singer:""},
    {name: "Yalgaar" , src: "Files/Yalgaar.mp3" ,duration: "03:15" ,singer:""}, 
    {name: "Shaam-Lofi" , src: "Files/shaam.mp3" ,duration: "06:08" ,singer:""}, 
    {name: "ChildHood" , src: "Files/Childhood.mp3" ,duration: "02:04" ,singer:""}, 
    {name: "Chan Vekhya" , src: "Files/chanVekhya.mp3" ,duration: "03:30" ,singer:"Harnoor"}, 
    {name: "Parshawan" , src: "Files/Parshawan.mp3" ,duration: "02:55" ,singer:"Harnoor"}, 
]
export function orgsongListFun() {
 return playlist;
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
