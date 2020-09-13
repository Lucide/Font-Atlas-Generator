import {setCacheNameDetails} from "workbox-core"
import {precacheAndRoute, cleanupOutdatedCaches} from 'workbox-precaching';
import {registerRoute, setCatchHandler} from "workbox-routing";
import {StaleWhileRevalidate, CacheFirst} from "workbox-strategies";
import {CacheableResponsePlugin} from "workbox-cacheable-response";
import {ExpirationPlugin} from "workbox-expiration";

declare var self: ServiceWorkerGlobalScope;
export {};

setCacheNameDetails({
    prefix: "font-atlas-generator",
})

precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();

registerRoute(
    ({url}) => {
        return url.origin == "https://fonts.googleapis.com"
            || url.origin == "https://cdn.jsdelivr.net"
    },
    new StaleWhileRevalidate({
        cacheName: "cdn",
        plugins: [
            {
                fetchDidFail: async function ({event}) {
                    if (!event) return;
                    const fetchEvent = event as FetchEvent;
                    if (!fetchEvent.clientId) return;
                    const client = await self.clients.get(fetchEvent.clientId);
                    if (!client) return;
                    client.postMessage({
                        msg: "offline"
                    });
                }
            }
        ]
    })
);

registerRoute(
    ({url}) => url.origin == "https://fonts.gstatic.com",
    new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

setCatchHandler(async () => {
    return Response.error();
});