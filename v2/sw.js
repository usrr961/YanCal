importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwa-pages";

// Offline fallback page – ensure this page is always cached.
const offlineFallbackPage = "/index.html";

// Initialize the assetsToCache array.
let assetsToCache = [];

// Function to load assets from a JSON file.
function loadAssets() {
  return fetch('assetsToCache.json', { cache: 'no-cache' })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load assets JSON');
      }
      return response.json();
    })
    .then(data => {
      // Ensure the offline fallback page is included.
      if (!data.includes(offlineFallbackPage)) {
        data.unshift(offlineFallbackPage);
      }
      assetsToCache = data;
      console.log("Assets loaded from JSON:", assetsToCache);
    })
    .catch(err => {
      console.error("Error loading assets JSON, using fallback list:", err);
      // Fallback to the default assets list.
      assetsToCache = [
        offlineFallbackPage,
        "/SADMIN.html",
        "/SUI2.html",
        "/SBAR.html", 
        "index.html",
        "https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js",
        "https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js",
        "https://unpkg.com/quagga/dist/quagga.min.js","debugo.html"
      ];
    });
}

// Kick off loading the assets list immediately.
loadAssets();

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(assetsToCache))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});

// Listen for notification click event
self.addEventListener('notificationclick', function (event) {
  event.notification.close(); // Close the notification when clicked

  // Check if the tab is already open and focus it
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    }).then(function (clientList) {
      const urlToOpen = new URL(event.notification.data.url, self.location.origin).href;
      // Check if a tab with the notification's URL is already open
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise, open a new tab with the URL
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
