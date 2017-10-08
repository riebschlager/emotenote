function Touch() {

    const serialport = require('serialport');

    const port = new serialport('/dev/tty.usbmodem1421', {
        baudRate: 9600
    });

    setInterval(() => {
        let data = port.read(2);
        if(data) {
            let detail = {
                condition: data[0] === 48,
                electrode: parseInt(data[1].toString(16)) - 30
            };
            // This is a gross hack. Figure it out.
            detail.electrode = detail.electrode === 11 ? 10 : detail.electrode;
            detail.electrode = detail.electrode === 12 ? 11 : detail.electrode;
            let eventName = detail.condition ? 'note-on' : 'note-off';
            let event = new CustomEvent(eventName, { detail });
            window.dispatchEvent(event);
        }
    });
}

module.exports = new Touch();
