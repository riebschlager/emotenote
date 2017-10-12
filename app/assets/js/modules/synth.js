function Synth() {

    const map = function(input, oldMin, oldMax, newMin, newMax) {
        return ((input - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
    };

    const effects = {
        distortion: new Tone.Distortion(0.8).toMaster(),
        chorus: new Tone.Chorus().toMaster(),
        reverb: new Tone.JCReverb().toMaster()
    };

    const synths = {
        major: new Tone.PolySynth(12, Tone.FMSyth).connect(effects.reverb).toMaster(),
        minor: new Tone.PolySynth(12, Tone.DuoSynth, { portamento: 0.4 }).connect(effects.chorus).toMaster(),
        angry: new Tone.PolySynth(12, Tone.FMSynth).connect(effects.distortion).connect(effects.reverb).toMaster()
    };

    window.addEventListener('note-on', e => {
        if(e.detail.electrode <= chords.aMajor.length) {
            synths.major.triggerRelease(chords.aMajor[e.detail.electrode]);
        }
        if(e.detail.electrode <= chords.aMinor.length) {
            synths.minor.triggerRelease(chords.aMinor[e.detail.electrode]);
        }
        if(e.detail.electrode <= chords.angry.length) {
            synths.angry.triggerRelease(chords.angry[e.detail.electrode]);
        }
    });

    window.addEventListener('note-off', e => {
        if(e.detail.electrode <= chords.aMajor.length) {
            synths.major.triggerAttack(chords.aMajor[e.detail.electrode]);
        }
        if(e.detail.electrode <= chords.aMinor.length) {
            synths.minor.triggerAttack(chords.aMinor[e.detail.electrode]);
        }
        if(e.detail.electrode <= chords.angry.length) {
            synths.angry.triggerAttack(chords.angry[e.detail.electrode]);
        }
    });

    this.updateTones = function(emotions) {
        let maxVolume = -10;
        let minVolume = -40;
        synths.major.volume.value = map(emotions.happy, 0, 1, minVolume, maxVolume);
        synths.minor.volume.value = map(1 - emotions.happy, 0, 1, minVolume, maxVolume);

        if(emotions.angry > 0.5) {
            synths.angry.volume.value = map(emotions.angry, 0.5, 1, minVolume, maxVolume);
            synths.major.volume.value = map(emotions.happy, 0, 1, minVolume, maxVolume - 10);
            synths.minor.volume.value = map(1 - emotions.happy, 0, 1, minVolume, maxVolume - 10);
        } else {
            synths.angry.volume.value = map(emotions.angry, 0, 1, -100, -15);
        }
    }
}

module.exports = new Synth();
