const touch = require('./assets/js/modules/touch.js');

const map = function(input, oldMin, oldMax, newMin, newMax) {
    return ((input - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
};

const vibrato = new Tone.Vibrato({
    frequency: 1,
    depth: 0.5
}).toMaster();

const phaser = new Tone.Phaser().toMaster();

const verb = new Tone.Freeverb().toMaster();

const distortion = new Tone.Distortion().toMaster();

let synthMajor = new Tone.PolySynth(16, Tone.AMSynth, { portamento: 0 }).connect(vibrato).toMaster();

let synthMinor = new Tone.PolySynth(16, Tone.DuoSynth, { portamento: 0.5 }).connect(verb).toMaster();

let synthAngry = new Tone.PolySynth(16, Tone.FMSynth, { portamento: 0 }).connect(distortion).connect(vibrato).toMaster();



function updateTones() {
    synthMajor.volume.value = map(app.emotions.happy, 0, 1, -20, 0);
    synthMinor.volume.value = map(1 - app.emotions.happy, 0, 1, -20, 0);

    if(app.emotions.angry > 0.5) {
        synthAngry.volume.value = map(app.emotions.angry, 0, 1, -20, 0);
        synthMajor.volume.value = map(app.emotions.happy, 0, 1, -40, -15);
        synthMinor.volume.value = map(1 - app.emotions.happy, 0, 1, -40, -15);
    } else {
        synthAngry.volume.value = map(app.emotions.angry, 0, 1, -100, -15);
    }
}

let chordsAngry = [
    ['A1', 'A2', 'E3'],
    ['B1', 'B2', 'G3'],
    ['C1', 'C2', 'G3'],
    ['D1', 'D2', 'A3'],
    ['E1', 'E2', 'B3'],
    ['F1', 'F2', 'C3'],
    ['G1', 'G2', 'D3']
];

let chordsMajor = [
    ['A2', 'Cx3', 'E4'],
    ['B2', 'Dx4', 'Fx5'],
    ['C2', 'E3', 'G4'],
    ['D2', 'Fx3', 'A4'],
    ['E2', 'Gx3', 'B4'],
    ['F2', 'A3', 'C4'],
    ['G2', 'B3', 'D4']
];

let chordsMinor = [
    ['A2', 'C3', 'E4'],
    ['B2', 'E3', 'G4'],
    ['C2', 'Eb3', 'G4'],
    ['D2', 'F3', 'A4'],
    ['E2', 'G3', 'B4'],
    ['F2', 'Ab3', 'C4'],
    ['G2', 'Bb3', 'D4']
];

window.addEventListener('note-on', e => {
    if(e.detail.electrode < chordsMajor.length) {
        synthMajor.triggerRelease(chordsMajor[e.detail.electrode]);
    }
    if(e.detail.electrode < chordsMinor.length) {
        synthMinor.triggerRelease(chordsMinor[e.detail.electrode]);
    }
    if(e.detail.electrode < chordsAngry.length) {
        synthAngry.triggerRelease(chordsAngry[e.detail.electrode]);
    }
});

window.addEventListener('note-off', e => {
    if(e.detail.electrode < chordsMajor.length) {
        synthMajor.triggerAttack(chordsMajor[e.detail.electrode]);
    }
    if(e.detail.electrode < chordsMinor.length) {
        synthMinor.triggerAttack(chordsMinor[e.detail.electrode]);
    }
    if(e.detail.electrode < chordsAngry.length) {
        synthAngry.triggerAttack(chordsAngry[e.detail.electrode]);
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
delete emotionModel['disgusted'];
delete emotionModel['fear'];
delete emotionModel['sad'];
delete emotionModel['surprised'];
let ec = new emotionClassifier();
ec.init(emotionModel);
let emotionData = ec.getBlank();

// pModel.shapeModel.nonRegularizedVectors.push(9);
// pModel.shapeModel.nonRegularizedVectors.push(11);

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
    drawLoop();
}).catch(err => {
    console.log(err);
});

function drawLoop() {
    requestAnimationFrame(drawLoop);
    overlayCC.clearRect(0, 0, vid_width, vid_height);
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
        });
        updateTones();
    };
}
