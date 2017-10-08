function Face() {

    const vid = document.getElementById('videoel');
    let videoWidth = vid.width;
    let videoHeight = vid.height;
    const overlayCanvas = document.getElementById('overlay');
    const overlayCtx = overlayCanvas.getContext('2d');

    delete emotionModel['disgusted'];
    delete emotionModel['fear'];
    delete emotionModel['sad'];
    delete emotionModel['surprised'];

    const ec = new emotionClassifier();
    ec.init(emotionModel);
    const emotionData = ec.getBlank();

    // pModel.shapeModel.nonRegularizedVectors.push(9);
    // pModel.shapeModel.nonRegularizedVectors.push(11);

    let ctrack = new clm.tracker({ useWebGL: true });

    ctrack.init(pModel);

    function adjustVideoProportions() {
        let proportion = vid.videoWidth / vid.videoHeight;
        videoWidth = Math.round(videoHeight * proportion);
        vid.width = videoWidth;
        overlayCanvas.width = videoWidth;
    }

    navigator.mediaDevices.getUserMedia({
        audio: false, video: {
            width: { exact: 320 },
            height: { exact: 240 }
        }
    }).then(stream => {

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
        overlayCtx.clearRect(0, 0, videoWidth, videoHeight);
        let cp = ctrack.getCurrentParameters();
        let er = ec.meanPredict(cp);

        if(ctrack.getCurrentPosition()) {
            ctrack.draw(overlayCanvas, cp, 'vertices');
        }

        if(er) {
            er.forEach(em => {
                if(em.value > 0) {
                    app.emotions[em.emotion] = em.value;
                }
            });
            synth.updateTones(app.emotions);
        };
    }

};

module.exports = new Face();
