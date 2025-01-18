const cacheName = "erp-car-v2"; // 添加版本号，方便更新缓存

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        "/", // 主頁
        "/manifest.json", // manifest
        "/styles.css", // 替換為你的CSS路徑
        "/main.js",    // 替換為你的JS路徑
        // 可添加更多需要緩存的靜態資源
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  // 禁止緩存以 `/api/` 開頭的請求
  if (requestUrl.pathname.startsWith("/api/")) {
    return; // 直接跳過緩存處理
  }

  // 禁止緩存 HTML 請求
  if (event.request.headers.get("accept").includes("text/html")) {
    return;
  }

  // 其他資源的緩存邏輯
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((response) => {
          return caches.open(cacheName).then((cache) => {
            cache.put(event.request, response.clone()); // 添加到緩存
            return response;
          });
        }).catch((error) => {
          console.error("Fetch failed:", error);
          return new Response("Network error!", { status: 503 }); // 返回錯誤信息
        })
      );
    })
  );
});
