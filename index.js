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

    if (!config.get('debug')) {
        windowOptions.acceptFirstMouse = true;
        windowOptions.alwaysOnTop = true;
        windowOptions.autoHideMenuBar = true;
        windowOptions.closable = false;
        windowOptions.fullscreen = true;
        windowOptions.kiosk = true;
        windowOptions.minimizable = false;
        windowOptions.movable = false;
        windowOptions.x = 0;
        windowOptions.y = 0;
    }

    win = new BrowserWindow(windowOptions);

    win.loadURL(`file://${__dirname}/app/index.html`);

    win.on('closed', () => {
        win = null;
    });

    win.on('blur', () => {
        if (!config.get('debug')) win.show();
    });

    win.on('hide', () => {
        if (!config.get('debug')) win.show();
    });

    win.webContents.on('crashed', event => {
        app.relaunch();
        app.exit(0);
    });

    if (config.get('debug')) {
        client.create(win, { port: config.get('debugPort') });
        win.webContents.openDevTools();
    }

}

app.on('ready', createWindow);

app.on('window-all-closed', () => { app.quit(); });
