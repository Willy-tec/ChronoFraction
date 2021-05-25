self.addEventListener('install', (e) => {
    console.log(caches.open("cache"))
    console.log('/ChronoFraction/index.html')
    e.waitUntil(
      caches.open("cache").then((cache) =>{return cache.addAll([

        '/ChronoFraction/main/index.html',
        '/ChronoFraction/main/src/index.js',
        '/ChronoFraction/main/src/style.css',
        '/ChronoFraction/main/src/BEEP.mp3',
        '/ChronoFraction/main/src/Chronometre.css',
        '/ChronoFraction/main/src/timer.png',
        'https://raw.githubusercontent.com/willy-tec/ChronoFraction/main/src/BEEP.mp3'

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