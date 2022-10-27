console.log("Nil Bunny")
const currenttime = document.getElementById("currenttime")
const totaltime = document.getElementById("totaltime")
const playpausebutton = document.getElementById("playpausebutton")
const seek = document.getElementById("seek")
//Audio with a Cap "A" is a class, that other "audio" refers to
const audio = new Audio("audio/Soft-Background-for-Interview.webm")
let seeking = false
//button listener
playpausebutton.onclick = function () {
    if (audio.paused) {
        audio.play()
    } else {
        audio.pause()
    }
}
//event triggered when audio ends
audio.onended = function(){
    currenttime.innerHTML = formatTime(0)
    seek.value = 0
    playpausebutton.src = "images/play.svg"
}
//audio listeners above
audio.oncanplaythrough = function () {
    seek.disabled = false;
}
//event triggered when audio plays
audio.onplay = function () {
    playpausebutton.src = "images/pause.svg"

}
//event triggered when audio paused
audio.onpause = function () {
    playpausebutton.src = "images/play.svg"
}
//event triggered by metadata load 
audio.onloadedmetadata = function () {
    totaltime.innerHTML = formatTime(audio.duration)
    currenttime.innerHTML = formatTime(0)
    seek.max = Math.floor(audio.duration)
}
//event triggered when playback time updates
audio.ontimeupdate = function () {
    currenttime.innerHTML = formatTime(audio.currentTime)
    if (!seeking) {
        seek.value = Math.floor(audio.currentTime)
    }
}
//seek bar listeners
//event triggeredon interaction with seekbar
seek.oninput = function () {
    seeking = true
}
//event triggered when seek bar is changed
seek.onchange = function(){
    audio.currentTime = seek.value
    seeking = false
}
//UTILITY FUNCTIONS
// takes total seconds (number) and returns a formatted string 
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}
