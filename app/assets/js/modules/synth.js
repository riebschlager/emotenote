function Synth() {

    const map = function(input, oldMin, oldMax, newMin, newMax) {
        return ((input - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
    };

    const effects = {
        vibrato: new Tone.Vibrato({ frequency: 1, depth: 0.5 }).toMaster(),
        distortion: new Tone.Distortion().toMaster()
    };

    const synths = {
        major: new Tone.PolySynth(8, Tone.AMSynth, { portamento: 0 }).connect(effects.vibrato).toMaster(),
        minor: new Tone.PolySynth(8, Tone.DuoSynth, { portamento: 0.5 }).toMaster(),
        angry: new Tone.PolySynth(8, Tone.FMSynth, { portamento: 0 }).connect(effects.distortion).toMaster()
    };

    window.addEventListener('note-on', e => {
        if(e.detail.electrode <= chords.g.length) {
            synths.major.triggerRelease(chords.g[e.detail.electrode]);
        }
        if(e.detail.electrode <= chords.g.length) {
            synths.minor.triggerRelease(chords.g[e.detail.electrode]);
        }
        if(e.detail.electrode <= chords.angry.length) {
            synths.angry.triggerRelease(chords.angry[e.detail.electrode]);
        }
    });

    window.addEventListener('note-off', e => {
        if(e.detail.electrode <= chords.g.length) {
            synths.major.triggerAttack(chords.g[e.detail.electrode]);
        }
        if(e.detail.electrode <= chords.g.length) {
            synths.minor.triggerAttack(chords.g[e.detail.electrode]);
        }
        if(e.detail.electrode <= chords.angry.length) {
            synths.angry.triggerAttack(chords.angry[e.detail.electrode]);
        }
    });

    this.updateTones = function(emotions) {
        let maxVolume = -10;
        let minVolume = -20;
        synths.major.volume.value = map(emotions.happy, 0, 1, minVolume, maxVolume);
        synths.minor.volume.value = map(1 - emotions.happy, 0, 1, minVolume, maxVolume);

        if(emotions.angry > 0.7) {
            synths.angry.volume.value = map(emotions.angry, 0.5, 1, minVolume, maxVolume);
            synths.major.volume.value = map(emotions.happy, 0, 1, minVolume - 50, maxVolume - 10);
            synths.minor.volume.value = map(1 - emotions.happy, 0, 1, minVolume - 50, maxVolume - 10);
        } else {
            synths.angry.volume.value = map(emotions.angry, 0, 1, -100, -15);
        }
    }
}

module.exports = new Synth();
