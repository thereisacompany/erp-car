const { version } = require('./package.json');
const cacheName = `erp-car-v${version}`; // 添加版本號

// 安裝事件
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      // 緩存新的版本資源
      return cache.addAll([
        "/",
        "/manifest.json",
        "/styles.css",
        "/main.js",
        // ... 添加其他需要緩存的資源
      ]);
    })
  );
  self.skipWaiting(); // 強制立即激活新的 Service Worker
});

// 激活事件
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            console.log(`Deleting old cache: ${name}`);
            return caches.delete(name); // 刪除舊版本的緩存
          }
        })
      );
    })
  );
  clients.claim(); // 讓新的 Service Worker 接管所有頁面
});

// 請求攔截事件
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // 優先使用緩存中的資源
      }
      return fetch(event.request)
        .then((networkResponse) => {
          return caches.open(cacheName).then((cache) => {
            cache.put(event.request, networkResponse.clone()); // 緩存新的資源
            return networkResponse;
          });
        })
        .catch((error) => {
          console.error("Fetch failed:", error);
          return new Response("Network error!", { status: 503 });
        });
    })
  );
});
