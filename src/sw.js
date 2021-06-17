self.addEventListener('install', (e) => {
    console.log(caches.open("cache"))
    console.log('/ChronoFraction/index.html')
    e.waitUntil(
      caches.open("cache").then((cache) =>{return cache.addAll([

        'index.html',
        'src/index.js',
        'src/style.css',
        'src/BEEP.mp3',
        'src/Chronometre.css',
        'src/timer.png',
        'src/BEEP.mp3'

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