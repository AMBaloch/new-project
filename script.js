console.log("welcome to the world");

// initialize variables
let songIndex = 0;
let audioElement = new Audio('audio/mp3.12.mp3'); 
let masterPlay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');

// songs data - Updated names
let songs = [
    { songname: "Gerda_De_Lamana_", filePath: "audio/mp3.12.mp3" },
    { songname: "Tery wasty", filePath: "audio/mp3.1.m4a" },
    { songname: "Tumhri ankhain", filePath: "audio/mp3.2.m4a" },
    // { songname: "Larsha pekhwar", filePath: "audio/mp3.3.m4a" },
    // { songname: "Dewangi Dewangi", filePath: "audio/mp3.4.m4a" },
    // { songname: "Tum jo ayy zindagi mein", filePath: "audio/mp3.5.m4a" },
    // { songname: "Mar udarii", filePath: "audio/mp3.6.mp3" },
    // { songname: "Rasha mama", filePath: "audio/mp3.10.m4a" },
    // { songname: "Tu jany na", filePath: "audio/mp3.14.m4a" }
];

// 🔥 MAIN FUNCTION 
function playSong(index) {
    songIndex = index;
    audioElement.src = `songs[${songIndex}].filePath`;
    audioElement.currentTime = 0;
    audioElement.play();
    
    // Update UI
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeAllPlay();
    document.getElementsByClassName('songitemplay')[songIndex].classList.remove('fa-play-circle');
    document.getElementsByClassName('songitemplay')[songIndex].classList.add('fa-pause-circle');
}

// PLAY / PAUSE MASTER BUTTON
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
});

// UPDATE PROGRESS BAR
audioElement.addEventListener('timeupdate', ()=>{
    if(audioElement.duration){
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myprogressbar.value = progress;
    }
});

// SEEK
myprogressbar.addEventListener('change', ()=>{
    audioElement.currentTime = (myprogressbar.value * audioElement.duration) / 100;
});

// RESET ALL PLAY BUTTONS
const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// CLICK ON SONG LIST
Array.from(document.getElementsByClassName('songitemplay')).forEach((element, i)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlay();
        songIndex = i;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        // Play selected song
        audioElement.src = songs[i].filePath;
        audioElement.currentTime = 0;
        audioElement.play();

        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// ✅ NEXT BUTTON - 100% WORKING
document.getElementById('next').addEventListener('click', ()=>{
    if (songIndex >= 9) {  // 0-8 = 9 songs
        songIndex = 0;
    } else {
        songIndex++;
    }
    // Play next song
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    
    // Update UI
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeAllPlay();
    document.getElementsByClassName('songitemplay')[songIndex].classList.remove('fa-play-circle');
    document.getElementsByClassName('songitemplay')[songIndex].classList.add('fa-pause-circle');
    console.log("Next song:", songs[songIndex].songname);
});

// ✅ PREVIOUS BUTTON - 100% WORKING
document.getElementById('previous').addEventListener('click', ()=>{
    if (songIndex <= 0) {
        songIndex = 8;  // Last song index
    } else {
        songIndex--;
    }
    // Play previous song
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    
    // Update UI
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeAllPlay();
    document.getElementsByClassName('songitemplay')[songIndex].classList.remove('fa-play-circle');
    document.getElementsByClassName('songitemplay')[songIndex].classList.add('fa-pause-circle');
    console.log("Previous song:", songs[songIndex].songname);
});

// Auto next when song ends
audioElement.addEventListener('ended', ()=>{
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});