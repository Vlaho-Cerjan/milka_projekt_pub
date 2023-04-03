const CACHE_NAME = 'offline-cache';
const OFFLINE_URL = '/offline.html';

// Install the service worker and cache the offline page
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.add(OFFLINE_URL))
      .then(() => self.skipWaiting())
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch the requested resource and return it from the cache or network
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request.url)
        .then(response => {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, clonedResponse));
          return response;
        })
        .catch(() => caches.match(event.request).then(response => response))
        .catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});

// Periodic background sync
self.addEventListener('periodicsync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          return cache.matchAll('/api/*')
            .then(requests => {
              const promises = requests.map(request => {
                return fetch(request)
                  .then(response => {
                    const clonedResponse = response.clone();
                    cache.put(request, clonedResponse);
                  })
                  .catch(() => {})
              });
              return Promise.all(promises);
            })
        })
    );
  }
});

// Register the background sync task
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(self.registration.periodicSync.register('background-sync', {
      minInterval: 24 * 60 * 60 * 1000 // 24 hours
    }));
  }
});
