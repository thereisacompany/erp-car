const cacheName = "erp-car-v2"; // 添加版本号，方便更新缓存

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      // 缓存更多必要的资源，例如 CSS, JavaScript, 图片等
      return cache.addAll([
        "/",
        "/manifest.json",
        "/styles.css", // 替换成你的CSS文件路径
        "/main.js",    // 替换成你的主要JS文件路径
        // ... 添加其他需要缓存的资源
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener("fetch", event => {
  if (event.request.headers.get('accept').includes('text/html')) {
    return; // 不緩存 HTML 文件
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(response => {
        return caches.open(cacheName).then(cache => {
          cache.put(event.request, response.clone()); // 缓存获取到的资源
          return response;
        });
      }).catch(error => {
        // 处理网络错误, 例如显示离线页面
        console.error("Fetch failed:", error);
        return new Response("Network error!", { status: 503 }); // 或返回一个离线页面
      });
    })
  );
});