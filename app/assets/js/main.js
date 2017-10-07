const serialport = require('serialport');

var port = new serialport('/dev/tty.usbmodem1421', {
    baudRate: 9600
});

setInterval(() => {
    let data = port.read(2);
    if(data) {
        let condition = data[0] === 48;
        let electrode = parseInt(data[1].toString(16)) - 30;
        console.log(condition, electrode);
    }
});

const app = new Vue({
    el: '#app',
    data: {
        emotions: {
            happy: 0
        }
    }
});

const vid = document.getElementById('videoel');
let vid_width = vid.width;
let vid_height = vid.height;
let overlay = document.getElementById('overlay');
let overlayCC = overlay.getContext('2d');
let ec = new emotionClassifier();
ec.init(emotionModel);
let emotionData = ec.getBlank();

//pModel.shapeModel.nonRegularizedVectors.push(9);
//pModel.shapeModel.nonRegularizedVectors.push(11);

let ctrack = new clm.tracker({ useWebGL: true });

ctrack.init(pModel);

function adjustVideoProportions() {
    let proportion = vid.videoWidth / vid.videoHeight;
    vid_width = Math.round(vid_height * proportion);
    vid.width = vid_width;
    overlay.width = vid_width;
}

navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 1920, height: 1080 } }).then(stream => {

    vid.srcObject = stream;

    vid.onloadedmetadata = function() {
        adjustVideoProportions();
        vid.play();
    }

    vid.onresize = function() {
        adjustVideoProportions();
        ctrack.stop();
        ctrack.reset();
        ctrack.start(vid);
    }

    ctrack.start(vid);
    // drawLoop();
}).catch(err => {
    console.log(err);
});

function drawLoop() {
    requestAnimationFrame(drawLoop);
    overlayCC.clearRect(0, 0, vid_width, vid_height);
    //psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);
    let cp = ctrack.getCurrentParameters();
    let er = ec.meanPredict(cp);

    if(ctrack.getCurrentPosition()) {
        ctrack.draw(overlay, cp, 'vertices');
    }

    if(er) {
        er.forEach(em => {
            if(em.value > 0) {
                app.emotions[em.emotion] = em.value;
            }
        })
    };
}

