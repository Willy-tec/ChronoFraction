const OFFLINE_URL = "index.html"
const CACHE_NAME = "offline"

self.addEventListener('install', (e) => {
    console.log(caches.open("cache"))
    console.log('/ChronoFraction/index.html')
    e.waitUntil(
/*       caches.open("cache").then((cache) =>{return cache.addAll([

        'index.html',
        'src/index.js',
        'src/style.css',
        'src/BEEP.mp3',
        'src/Chronometre.css',
        'src/timer.png',
        'src/BEEP.mp3'

      ]).catch((e)=> console.log(e)) */

    //}),
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // Setting {cache: 'reload'} in the new request will ensure that the response
      // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
    })()
    );
  });

self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });