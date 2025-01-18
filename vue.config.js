// const { config } = require("vue/types/umd");
let timeStamp = new Date().getTime();
module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'zh',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  devServer: {
    proxy: {
      '/api': {
        // 请求本地IP: http://34.80.85.84 需要jshERP-boot后台项目 port:18000 正式環境 18001:測試, New DNS: https://driver.jsl.tw/
        target: process.env.VUE_APP_ENV === 'production' ? 'https://driver.jsl.tw' : 'https://dev-driver.jsl.tw',
        ws: false,
        changeOrigin: true
      }
    },
  },
  pwa: {
    name: "鉅生物流-司機",
    short_name: "司機端",
    theme_color: "#f2cc4d",
    description: "這是專屬鉅生物流使用的網站",
    icons: [
      {
        src: "./app_icon_72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "./app_icon_96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "./app_icon_144.png",
        sizes: "144x144",
        type: "image/png",
      },
    ],
    start_url: "/login",
    id: "/",
    display: "standalone",
    background_color: "#f2cc4d",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "InjectManifest", // 自定義 SW 模式
    workboxOptions: {
      importScripts: ["https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js"], // 引入 Workbox
      exclude: [/\.html$/], // HTML 不緩存
      swSrc: "./src/serviceWorker.js", // 指定自定義 Service Worker
    },
  },
  // 打包配置
  configureWebpack: {
    output: {
      filename: `js/js[name].${timeStamp}.js`,
      chunkFilename: `js/chunk.[id].${timeStamp}.js`,
    }
  },
  css: {
    extract: {
      filename: `css/[name].${timeStamp}.css`,
      chunkFilename: `css/chunk.[id].${timeStamp}.css`,
    }
  }
}
