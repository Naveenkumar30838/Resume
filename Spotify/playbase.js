const playbase =[
    // Song Name Url Duration 
    {name: "Challeya" ,src:"Files/Chaleya.mp3" , duration: "03:20" },  
    {name: "Lahore" , src: "Files/Lahore (1).mp3" ,duration: "03:17",singer:""}, 
    {name: "Shaam-Lofi" , src: "Files/shaam.mp3" ,duration: "06:08" ,singer:""}, 
    {name: "Parshawan" , src: "Files/Parshawan.mp3" ,duration: "02:55" ,singer:"Harnoor"}, 
    {name: "Tu hai Ki Nahi" , src: "Files/Tu_Hai_Ki_Nahi.mp3" ,duration: "05:34" ,singer:""},
    {name:"Brown Munde" , src: "Files/Brown_Munde.mp3" ,duration:"04:27"},
    {name:"Khaab" , src: "Files/Khaab.mp3",duration:"03:21"},
    {name:"Zehra" , src: "Files/Zehra.mp3",duration:"03:48"},
    
    {name:"Random" , src: "Files/videoplayback.mp3",duration:"03:13"},
    {name:"Ranjha" , src: "Files/Ranjha.mp3",duration:"03:50"},
    {name:"Raatan Lambiya" , src: "Files/Raataan Lambiyan .mp3",duration:"03:50"},

]
export function allSongs() {
    return playbase;
}
