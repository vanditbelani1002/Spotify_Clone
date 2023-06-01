console.log("welcome to spotify");

// Initialization the Variables
let songindex = 1;
let audioelement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay')
let progressbar = document.getElementById('progressbar')
let songitem = Array.from(document.getElementsByClassName('songitem'));
// let songtime = Array.from(document.getElementsByClassName('timestamp'));
let mastersongname = document.getElementById('mastersongname');
let songtime = document.getElementById('songtime');


let songs = [
    { Songname: "Chand ne Kaho Aaje", filepath: "songs/1.mp3", songtime:'5:19', coverpath:'images/1.jpg' },
    { Songname: "Gori Radha Ne Kalo Kan", filepath: "songs/2.mp3", songtime:'5:08',coverpath:'images/2.jpg' },
    { Songname: "Kehvu Ghanu Ghanu Chhe", filepath: "songs/3.mp3", songtime:'4:23', coverpath:'images/3.jpg' },
    { Songname: "Papa Pagali Me Kidhi", filepath: "songs/4.mp3", songtime:'3:12', coverpath:'images/4.jpg' },
    { Songname: "Valam Aavo Ne Aavo", filepath: "songs/5.mp3", songtime:'5:20', coverpath:'images/5.jpg' },
    { Songname: "Dhun Laagi", filepath: "songs/6.mp3", songtime:'4:34', coverpath:'images/6.jpg' }
]
songtime.innerHTML=songs[songindex-1].songtime;


songitem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('songname')[0].innerText = songs[i].Songname;
    element.getElementsByClassName('timestamp')[0].innerHTML = songs[i].songtime;
})

const masterplaybtn = () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
      audioelement.play();
      masterplay.classList.remove('fa-circle-play');
      masterplay.classList.add('fa-circle-pause');
      Array.from(document.getElementsByClassName("songitemplay")).forEach(
        (element) => {
          if (parseInt(element.id) === songindex) {
            element.classList.remove("fa-circle-play");
            element.classList.add("fa-circle-pause");
          }
        })
    }
    else {
      audioelement.pause();
      masterplay.classList.remove('fa-circle-pause');
      masterplay.classList.add('fa-circle-play');
      Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
      })
    }
  }
masterplay.addEventListener('click',()=>{
    masterplaybtn();
})
//litsen to Events
audioelement.addEventListener('timeupdate', () => {
    // Update seekbar
    progress = parseInt((audioelement.currentTime / audioelement.duration) * 100)
    progressbar.value = progress;
})



progressbar.addEventListener('change', () => {
    audioelement.currentTime = progressbar.value * audioelement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play')
    })
}

const playbtn = () => {
    Array.from(document.getElementsByClassName("songitemplay")).forEach(
      (element) => {
        if (element.id == songindex) {
          element.classList.remove("fa-circle-play");
          element.classList.add("fa-circle-pause");
        } else {
          element.classList.remove("fa-circle-pause");
          element.classList.add("fa-circle-play");
        }
      }
    );
  };

 

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => (
    element.addEventListener('click', (e) => {
        if (e.target.id == songindex) {
            if (audioelement.paused || audioelement.currentTime <= 0) {
                audioelement.play();
                masterplay.classList.remove('fa-circle-play');
                masterplay.classList.add('fa-circle-pause');
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
            }
            else {
                audioelement.pause();
                masterplay.classList.remove('fa-circle-pause');
                masterplay.classList.add('fa-circle-play');
                Array.from(document.getElementsByClassName("songitemplay")).forEach((c) => {
                    c.classList.remove('fa-circle-pause');
                    c.classList.add('fa-circle-play');
                })
            }
        } 
        else {
            makeAllPlays();
            songindex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioelement.src = `songs/${songindex}.mp3`;
            mastersongname.innerText = songs[songindex - 1].Songname;
            songtime.innerText=songs[songindex-1].songtime;
            audioelement.currentTime = 0;
            audioelement.play();
            masterplay.classList.remove('fa-cirle-play');
            masterplay.classList.add('fa-circle-pause');

        }

    })
))

document.addEventListener("keydown", (e) => {
  if (e.code == "Space") {
    masterplaybtn();
  }
});

// For Play the Next Song 

const playnext = () => {
    if (songindex >= songs.length) {
        songindex = 1;
    }
    else {
        songindex += 1;
    }
    audioelement.src = `songs/${songindex}.mp3`
    mastersongname.innerText = songs[songindex - 1].Songname;
    songtime.innerText = songs[songindex-1].songtime;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove("fa-circle-play");
    masterplay.classList.add("fa-circle-pause");
    playbtn();

}
document.addEventListener('keydown', (c) => {
  if (c.code == "ArrowRight") {
    playnext();
  }
});
document.getElementById('next').addEventListener('click', playnext)

// Play next song automatically 

audioelement.addEventListener('ended',playnext)

// For Play the Previous Song

const playprevious = () => {
    if (songindex == 1) {
        songindex = songs.length;
        ;
    }
    else {
        songindex -= 1;
    }
    audioelement.src = `songs/${songindex}.mp3`;
    mastersongname.innerText = songs[songindex - 1].Songname;
    songtime.innerHTML = songs[songindex - 1].songtime;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-cirle-play')
    masterplay.classList.add('fa-cirle-pause')
    playbtn();
}
document.getElementById('previous').addEventListener('click', playprevious)
document.addEventListener('keydown', (c) => {
    if (c.code == "ArrowLeft") {
      playprevious();
    }
  });

// For the mute of unmute the song 

const mute = ()=>{
  if(audioelement.volume==1.0){
    volumebar.value=0
    audioelement.volume=0.0
  }
  else{
    audioelement.volume=1.0 
    volumebar.value=100
  }
}

document.addEventListener('keydown', (c) => {
  if (c.code == "KeyM") {
    mute();
  }
});

document.getElementById('mute').addEventListener('click',()=>{
  audioelement.volume=0;
  volumebar.value=0
})

document.getElementById('full').addEventListener('click',()=>{
  audioelement.volume=1.0;
  volumebar.value=100
})

// For the change the volume of the Song 

const volumebar = document.getElementById('volumebar')

volumebar.addEventListener('change',()=>{
  audioelement.volume=(volumebar.value)/100;
})


const volumedown = () =>{
  volumebar.value=--volumebar.value;
  audioelement.volume=(volumebar.value)/100;
}

document.addEventListener('keydown', (c) => {
  if (c.code == "ArrowDown") {
    volumedown();
  }
});

const volumeup = () =>{
  volumebar.value=++volumebar.value;
  audioelement.volume=(volumebar.value)/100;
}

document.addEventListener('keydown', (c) => {
  if (c.code == "ArrowUp") {
    volumeup();
  }
});

// For the changing time of playing song 

let currenttime = document.getElementById('currenttime')
const update = ()=>{
  let current_min = Math.floor(audioelement.currentTime/60);
  let current_sec = Math.floor(audioelement.currentTime%60);
  if(current_sec<10){
    current_sec= "0"+current_sec;
  }
  currenttime.innerHTML=current_min+":"+current_sec
}

setInterval(update,1000);

