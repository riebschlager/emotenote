// let synth = new Tone.PolySynth(6, Tone.Synth).toMaster();




/*
		 KICK
		 */

// var kick = new Tone.MembraneSynth({
//     "envelope": {
//         "sustain": 0,
//         "attack": 0.02,
//         "decay": 0.8
//     },
//     "octaves": 10
// }).toMaster();

// var kickPart = new Tone.Loop(function(time) {
//     kick.triggerAttackRelease("C2", "8n", time);
// }, "2n").start(0);


/*
 SNARE
 */
// var snare = new Tone.NoiseSynth({
//     "volume": -5,
//     "envelope": {
//         "attack": 0.001,
//         "decay": 0.2,
//         "sustain": 0
//     },
//     "filterEnvelope": {
//         "attack": 0.001,
//         "decay": 0.1,
//         "sustain": 0
//     }
// }).toMaster();
// var snarePart = new Tone.Loop(function(time) {
//     snare.triggerAttack(time);
// }, "2n").start("4n");
/**
 *  PIANO
 */
// var piano = new Tone.PolySynth(4, Tone.Synth, {
//     "volume": -8,
//     "oscillator": {
//         "partials": [2, 2, 1],
//     },
//     "portamento": 0.05
// }).toMaster()
// var cChord = ["C4", "E4", "G4", "F5"];
// var dChord = ["D4", "F4", "A4", "C5"];
// var gChord = ["B3", "D4", "E4", "A4"];
// var pianoPart = new Tone.Part(function(time, chord) {
//     piano.triggerAttackRelease(chord, "8n", time);
// }, [["1:0:2", cChord], ["0:1", cChord], ["0:1:3", dChord], ["0:2:2", cChord], ["0:3", cChord], ["0:3:2", gChord]]).start("2m");
// pianoPart.loop = true;
// pianoPart.loopEnd = "1m";
// pianoPart.humanize = true;
/*
 BASS
 */
// var bass = new Tone.MonoSynth({
//     "volume": -10,
//     "envelope": {
//         "attack": 0.1,
//         "decay": 0.3,
//         "release": 2,
//     },
//     "filterEnvelope": {
//         "attack": 0.001,
//         "decay": 0.01,
//         "sustain": 0.5,
//         "baseFrequency": 200,
//         "octaves": 2.6
//     }
// }).toMaster();
// var bassPart = new Tone.Sequence(function(time, note) {
//     bass.triggerAttackRelease(note, "16n", time);
// }, ["C2", ["C3", ["C3", "D2"]], "E2", ["D2", "A1"]]).start(0);
// bassPart.probability = 0.9;
//set the transport 
// Tone.Transport.bpm.value = 120;
// GUI //
// Interface.Button({
//     key: 32,
//     type: "toggle",
//     text: "Start",
//     activeText: "Stop",
//     start: function() {
//         Tone.Transport.start("+0.1");
//     },
//     end: function() {
//         Tone.Transport.stop();
//     }
// });
// Tone.Transport.start("+0.1");
