/*
 * Self-removing service worker - this project does NOT use one.
 *
 * Why this file exists: a browser keeps service-worker registrations per ORIGIN
 * (scheme + host + port). If any other project is served from the same origin at
 * some point - which happens constantly in local dev, where most Next.js apps
 * default to http://localhost:3000 and some of them ship a PWA service worker -
 * the browser keeps checking /sw.js for updates on every navigation and logs a
 * 404 in this app's server output.
 *
 * Serving this file turns that 404 into a 200, and the worker below immediately
 * unregisters itself and drops any caches. A browser that was holding a stale
 * registration is cleaned up on its next visit and then stops requesting /sw.js.
 *
 * It is inert for regular visitors: nothing in the app calls
 * navigator.serviceWorker.register(), so the browser never installs it.
 *
 * Delete this file (or replace it) if a real service worker is added later.
 */

self.addEventListener('install', () => {
  // Activate immediately instead of waiting for existing tabs to close.
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys()
        await Promise.all(keys.map(key => caches.delete(key)))
      } catch {
        // Cache API unavailable - nothing to clean up.
      }

      try {
        await self.registration.unregister()
      } catch {
        // Already unregistered.
      }
    })()
  )
})
