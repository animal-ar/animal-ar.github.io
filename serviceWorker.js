const CACHE_NAME = 'animal-ar-v2.2';

const STATIC_ASSETS = [
  './',
  './index.html',
  './start-ar.html',
  './about.html',
  './library-used.html',
  './manifest.json',

  /*
  // AR assets
  './glb/targets.mind',
  './glb/rusa-ekor-putih.glb',
  './glb/ikan-mas-ryukin.glb',

  // Icons
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'*/
];

// INSTALL
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// FETCH
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Jangan intercept kamera
  if (req.destination === 'video' || req.url.includes('mediadevices')) return;

  // Network-first untuk halaman AR
  if (req.destination === 'document') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Cache-first untuk asset
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req))
  );
});
