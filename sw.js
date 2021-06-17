/* const OFFLINE_URL = "/index.html"
const CACHE_NAME = "offline"

self.addEventListener('install', (e) => {
    console.log("install event")
    self.skipWaiting();
    e.waitUntil(()=>{
      caches.open("cache").then((cache) =>{
        return cache.addAll([
          '/index.html',
          '/src/index.js',
          '/src/style.css',
          '/src/BEEP.mp3',
          '/src/Chronometre.css',
          '/src/timer.png',
          '/src/BEEP.mp3'
          ]).catch((e)=> console.log(e))
        })
      })


    
/*     (async () => {
      const cache = await caches.open(CACHE_NAME);
      // Setting {cache: 'reload'} in the new request will ensure that the response
      // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
    })()
    ); ////////////////////
  });

self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  }); */


const CACHE_NAME = 'cache-and-update';
const STATIC_ASSETS = [
  './index.html',
  './src/index.js',
  './src/style.css',
  './src/Chronometre.css',
  './src/timer.png',
  './src/BEEP.mp3'
];
self.addEventListener('install', (event) => {
  // forces the waiting service worker to become the active service worker.
  self.skipWaiting();
  // delay install by caching assets and open database
  event.waitUntil(cacheStaticAssets());
});
self.addEventListener('activate', (event) => {
  // allows an active service worker to set itself as the controller for all clients within its scope.
  self.clients.claim();
  // remove old cache and then cache new static assets
  event.waitUntil(caches.delete(CACHE_NAME).then(cacheStaticAssets));
});
function cacheStaticAssets() {
  return caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
}

const CACHE_NAME = 'cache-and-update';
self.addEventListener('fetch', (event) => {
  // respond from cache first
  event.respondWith((async function() {
    // fallback for navigate requests
    if (event.request.mode === 'navigate') {
      return getCachedIndex();
    }
    const response = await fetchFromNetworkFirst(event.request);
    return response;
  })());
});
async function fetchFromNetworkFirst(request) {
  try {
    const response =  await fromNetwork(request);
    await updateCache(request, response.clone());
    return response;
  } catch(e) {
    const responseFromCache = await fromCache(request);
    if (responseFromCache) {
      return responseFromCache;
    } else {
      throw e;
    }
  }
}
function getCachedIndex() {
  return caches.open(CACHE_NAME).then((cache) => cache.match('index.html'));
}
function fromCache(request) {
  return caches.open(CACHE_NAME).then((cache) => cache.match(request));
}
function fromNetwork(request) {
  return fetch(request);
}
function updateCache(request, response) {
  return caches.open(CACHE_NAME).then((cache) => cache.put(request, response));
}