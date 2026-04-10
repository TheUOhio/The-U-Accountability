const CACHE_VERSION = 'theu-v1.6.1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './U logo.jpg',
];

// Install — cache all assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Activate new SW immediately
});

// Activate — delete old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim(); // Take control of all pages immediately
});

// Fetch — network first, fall back to cache (always tries for fresh content)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // Clone and update cache with fresh response
        const clone = response.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(e.request, clone));
        return response;
      })
      .catch(() => {
        // Network failed — serve from cache (offline support)
        return caches.match(e.request);
      })
  );
});
