const cacheName = "erp-car";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(["/", "/index.html", "/manifest.json"]);
    }),
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));  // 只從網絡獲取，不使用緩存
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request) // 每次都從網絡請求，無論緩存中是否有
      .then(response => {
        // 也可以選擇性緩存最新的資源
        if (event.request.url.includes("/index.html")) {
          caches.open(cacheName).then(cache => {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      })
      .catch(() => {
        // 如果網絡不可用，則回退到緩存
        return caches.match(event.request);
      })
  );
});
