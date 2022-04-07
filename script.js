const image = document.querySelector("img");
const songTitle = document.getElementsByClassName("songTitle")[0];
const artist = document.getElementsByClassName("artist")[0];
const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const progressArea = document.getElementsByClassName("progressArea")[0];
const progressBar = document.getElementsByClassName("progressBar")[0];
const currentTimeEl = document.getElementsByClassName("currentTime")[0];
const durationEl = document.getElementsByClassName("duration")[0];

const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Jacinto Design",
  },
];

//check if Playing
let isPlaying = false;

//play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

//pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

//Play or pause event listner
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//update DOM
function loadSong(song) {
  songTitle.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

//Current Sing
let songIndex = 0;

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//on Load - select first song
loadSong(songs[songIndex]);

//Update Progress Bar & Time
function updateProgressBar(e) {
    const { duration, currentTime } = e.srcElement;
    progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    //calculate display for duration
    const durationMinutes = Math.floor(duration/60);
    let durationSeconds = Math.floor(duration%60);
    if (durationSeconds < 10){
        durationSeconds = `0${durationSeconds}`
    }
    //delay switching duration element to avoid NaN
    if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`
    }
    //calculate display for currentTime
    const currentMinutes = Math.floor(currentTime/60);
    let currentSeconds = Math.floor(currentTime%60);
    if (currentSeconds < 10){
        currentSeconds = `0${currentSeconds}`
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
}

function setProgressBar(e) {
    // console.log(e);
    const width = this.clientWidth; //this points to e.srcElement. therefore, width = e.srcElement.clientWidth
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = ((clickX / width) * duration);
}

// Event Listners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressArea.addEventListener("click", setProgressBar);
music.addEventListener("ended",nextSong)
