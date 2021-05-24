self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('chrono-store').then((cache) => cache.addAll([
        '/ChronoFraction/',
        '/ChronoFraction/index.html',
        '/ChronoFraction/src/index.js',
        '/ChronoFraction/src/style.css',
        '/ChronoFraction/src/BEEP.mp3',
        '/ChronoFraction/src/Chronometre.css',
        '/ChronoFraction/src/timer.png',

      ])),
    );
  });

self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });