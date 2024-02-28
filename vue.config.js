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
                target: 'http://34.80.85.84:18000', // 请求本地IP: http://34.80.85.84 需要jshERP-boot后台项目 port:9999 正式環境 10000:測試, New DNS: https://ep.jsl.tw/
                ws: false,
                changeOrigin: true
            }
        }
    },
}