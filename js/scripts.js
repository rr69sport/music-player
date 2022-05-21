const styles = getComputedStyle(document.documentElement);
const mainColor = styles.getPropertyValue('--main-color');
const audioElement = document.getElementById('audio-element');
const playPauseElement = document.getElementById('play-pause');
const stopElement = document.getElementById('stop');
const prevElement = document.getElementById('prev');
const nextElement = document.getElementById('next');

const artistSongElement = document.getElementById('artist-song');
const titleSongElement = document.getElementById('title-song');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let audioCtx;

const initPlayer = () => {
    if (!audioCtx) audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    const source = audioCtx.createMediaElementSource(audioElement);
    source.connect(analyser);
    source.connect(audioCtx.destination);

    let data = new Uint8Array(analyser.frequencyBinCount);

    console.log(data);

    const draw = (data) => {
        data = [...data];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let space = canvas.width / data.length;

        data.forEach((value, i) => {
            ctx.beginPath();
            ctx.moveTo(space * i * 1.5, canvas.height * 2.5);
            ctx.lineTo(space * i * 1.5, canvas.height - value / 2.5);
            ctx.strokeStyle = mainColor;
            ctx.stroke();
        });
    }
    
    const loopingFunction = () => {
        requestAnimationFrame(loopingFunction);
        analyser.getByteFrequencyData(data);
        draw(data);
    }

    requestAnimationFrame(loopingFunction);
}

playPauseElement.addEventListener('click', () => {
    audioElement.paused ? audioElement.play() : audioElement.pause();
    initPlayer();
});
stopElement.addEventListener('click', () => {
    audioElement.pause();
    audioElement.currentTime = 0;
});