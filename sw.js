const CACHE = 'ledger-static-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/favicon.svg',
  './icons/icon-192.svg',
  './icons/icon-512.svg',
  './styles/tokens.css',
  './styles/app.css',
  './js/main.js',
  './js/core/state.js',
  './js/core/store.js',
  './js/domain/currency.js',
  './js/domain/ledger.js',
  './js/domain/money.js',
  './js/domain/planning.js',
  './js/domain/snapshots.js',
  './js/services/exchange-rates.js',
  './js/ui/format.js',
  './js/ui/toast.js'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match('./index.html'))));
});
