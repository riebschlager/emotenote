importScripts('node_modules/workbox-sw/build/importScripts/workbox-sw.prod.v2.0.1.js');

const workboxSW = new WorkboxSW({ clientsClaim: true });

workboxSW.router.registerRoute(
    new RegExp('(.*\/)?.*\.(png|jpg|jpeg|gif|mp4|webm)', 'i'),
    workboxSW.strategies.cacheFirst({
        cacheName: 'media',
        cacheableResponse: {
            statuses: [0, 200]
        }
    })
);
