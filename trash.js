const audioElement = document.getElementById('audio-element');
const playPauseElement = document.getElementById('play-pause');
const stopElement = document.getElementById('stop');
const prevElement = document.getElementById('prev');
const nextElement = document.getElementById('next');

const artistSongElement = document.getElementById('artist-song');
const titleSongElement = document.getElementById('title-song');

const canvas = document.getElementById('canvas');

playPauseElement.addEventListener('click', () => {
    audioElement.paused ? audioElement.play() : audioElement.pause();
});
stopElement.addEventListener('click', () => {
    audioElement.pause();
    audioElement.currentTime = 0;
});