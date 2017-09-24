if (typeof module === 'object') {
    window.module = module;
    module = undefined;
}

console.log('Chrome:', process.versions.chrome);
console.log('Node:', process.versions.node);
console.log('Electron:', process.versions.electron);
console.log('Modules:', process.versions.modules);

const { webFrame } = require('electron');
webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(1, 1);

document.addEventListener('wheel', e => {
    e.preventDefault();
    return false;
});

document.addEventListener('contextmenu', e => {
    e.preventDefault();
    return false;
});

navigator.serviceWorker.register('../sw.js', { scope: './' })
    .then(() => {
        console.log('Service Worker Registered');
    })
    .catch(error => {
        console.log('Error Registering Service Worker', error);
    });
