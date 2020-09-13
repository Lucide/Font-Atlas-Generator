import {setCacheNameDetails, skipWaiting} from "workbox-core"
import {precacheAndRoute, cleanupOutdatedCaches} from 'workbox-precaching';
import {registerRoute, setCatchHandler} from "workbox-routing";
import {StaleWhileRevalidate, CacheFirst} from "workbox-strategies";
import {CacheableResponsePlugin} from "workbox-cacheable-response";
import {ExpirationPlugin} from "workbox-expiration";
import type {Message} from "common/message";

declare var self: ServiceWorkerGlobalScope;
export {};

setCacheNameDetails({
    prefix: "font-atlas-generator",
})

skipWaiting();

// self.addEventListener("message", (event) => {
//     if ((event.data as Message).type == "SKIP_WAITING") {
//         self.skipWaiting();
//     }
// });

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
                    await messageClient(event as FetchEvent);
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

async function messageClient(event: FetchEvent) {
    if (!event.clientId) return;
    const client = await self.clients.get(event.clientId);
    if (!client) return;
    client.postMessage({
        type: "OFFLINE"
    } as Message);
}

