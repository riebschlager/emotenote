const touch = require('./assets/js/modules/touch.js');
const synth = require('./assets/js/modules/synth.js');
const chords = require('./assets/js/modules/chords.js');
const face = require('./assets/js/modules/face.js');

const app = new Vue({
    el: '#app',
    data: {
        emotions: {
            happy: 0
        }
    }
});
