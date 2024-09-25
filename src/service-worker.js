/* eslint-disable no-undef*/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}

workbox.core.setCacheNameDetails({
  prefix: 'erp-car',
  suffix: 'v1.0.0'
});

workbox.core.skipWaiting() // 强制等待中的 Service Worker 被激活
workbox.core.clientsClaim() // Service Worker 被激活后使其立即获得页面控制权
workbox.precaching.precacheAndRoute(self.__precacheManifest || []) // 设置预加载

// sw.js
workbox.routing.registerRoute(/(https?:\/\/)(.*)\/api\/(.*)/, args =>
  workbox.strategies
    .networkFirst({
      cacheName: 'data-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 2592000
        })
      ]
    })
    .handle(args)
    .then(response => {
      return response
    })
    .catch(err => {
      console.log('err:', err)
    })
)