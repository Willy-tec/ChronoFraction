self.addEventListener('install', (e) => {
    console.log(caches.open("cache"))
    console.log('/ChronoFraction/index.html')
    e.waitUntil(
      caches.open("cache").then((cache) =>{return cache.addAll([

        '/ChronoFraction/index.html',
        '/ChronoFraction/src/index.js',
        '/ChronoFraction/src/style.css',
        '/ChronoFraction/src/BEEP.mp3',
        '/ChronoFraction/src/Chronometre.css',
        '/ChronoFraction/src/timer.png',

      ]).catch((e)=> console.log(e))
    }),
    );
  });

self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });