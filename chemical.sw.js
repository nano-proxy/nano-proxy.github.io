const uvEnabled = true;
if (uvEnabled) {
    importScripts("/uv/uv.bundle.js");
    importScripts("/uv/uv.config.js");
    importScripts(__uv$config.sw || "/uv/uv.sw.js");
}

Object.defineProperty(self, "crossOriginIsolated", { value: true }); // Firefox fix

let uv;

if (uvEnabled) {
    uv = new UVServiceWorker();
}

self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            if (uvEnabled && uv.route(event)) {
                return await uv.fetch(event);
            }
            return await fetch(event.request);
        })(),
    );
});