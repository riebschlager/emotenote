const touch = require('./assets/js/modules/touch.js');
const synth = require('./assets/js/modules/synth.js');
const chords = require('./assets/js/modules/chords.js');
const face = require('./assets/js/modules/face.js');

const map = function(input, oldMin, oldMax, newMin, newMax) {
    return ((input - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
};

const app = new Vue({
    el: '#app',
    data: {
        emotions: {
            happy: 0
        }
    },
    methods: {
        getOpacity: function(emotion) {
            if(emotion === 'happy' && this.emotions.happy > 0.5) {
                return map(this.emotions.happy, 0.5, 1, 0, 1);
            } else if(emotion === 'sad') {
                return map(1 - this.emotions.happy, 0, 0.5, 0, 1);
            }
            if(emotion === 'angry' && this.emotions.angry > 0.5) {
                return map(this.emotions.angry, 0.5, 1, 0, 1);
            }
            return 0;
        }
    }
});
