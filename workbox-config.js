module.exports = {
    sourcemap: false,
    inlineWorkboxRuntime: true,
    swDest: "sw.js",
    globDirectory: ".",
    globPatterns: [
        "index.html",
        "assets/*",
        "build/js/app.js",
        "build/css/*.css"
    ],
    cacheId: "font-atlas-generator",
    cleanupOutdatedCaches: true,
    runtimeCaching: [
        {
            urlPattern: /https:\/\/fonts\.googleapis\.com/,
            handler: "StaleWhileRevalidate",
            options: {
                cacheName: "google-fonts-stylesheets"
            }
        },
        {
            urlPattern: /https:\/\/fonts\.gstatic\.com/,
            handler: "CacheFirst",
            options: {
                cacheName: "google-fonts-webfonts",
                cacheableResponse: {
                    statuses: [0, 200]
                },
                expiration: {
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30
                }
            }
        },
        {
            urlPattern: /.*normalize\.min\.css$/,
            handler: "StaleWhileRevalidate",
            options: {
                cacheName: "normalize-css"
            }
        }
    ]
};