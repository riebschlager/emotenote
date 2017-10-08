const { app, BrowserWindow } = require('electron');
const { client } = require('electron-connect');
process.env.NODE_CONFIG_DIR = require('path').join(__dirname, 'config');
const config = global.config = require('config');

let win;

function createWindow() {

    const windowOptions = {
        width: config.get('appWidth'),
        height: config.get('appHeight')
    };

    if(!config.get('debug')) {
        windowOptions.acceptFirstMouse = true;
        windowOptions.alwaysOnTop = true;
        windowOptions.fullscreen = true;
    }

    win = new BrowserWindow(windowOptions);

    win.loadURL(`file://${__dirname}/app/index.html`);

    win.on('closed', () => {
        win = null;
    });

    win.webContents.on('crashed', event => {
        app.relaunch();
        app.exit(0);
    });

    if(config.get('debug')) {
        client.create(win, { port: config.get('debugPort') });
        win.webContents.openDevTools();
    }

}

app.on('ready', createWindow);

app.on('window-all-closed', () => { app.quit(); });
