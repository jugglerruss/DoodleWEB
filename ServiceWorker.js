const cacheName = "DefaultCompany-DoodleJumpTest-1.0";
const contentToCache = [
    "Build/36db41ea7bc6b6776bbca25cc146a9d4.loader.js",
    "Build/198702bcd00883dfc80eab4cf06e69bf.framework.js",
    "Build/625b1bed33826e729f34c24298dce133.data",
    "Build/fbf770ce46f3e7415dbdc4b39aeaeb88.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
