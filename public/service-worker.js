const CACHE_NAME = "cricstation-v1";
const urlsToCache = [
  "/", "/manifest.json", "/offline.html",
  "/matchDetails", "/nextpage", "/liveScores",
  "/saveGameDetails", "/FallOfWicket", "/changeBowler",
  "/topWicketTakers", "/topRunsScorers", "/saveBallDetails",
  "/footBall",
  "index.ejs",

  // CSS Files
  "/stylesheets/changeBowler.css", "/stylesheets/cricStation.css",
  "/stylesheets/scorecard.css", "/stylesheets/liveMatches.css",
  "/stylesheets/login.css", "/stylesheets/fallOfWicket.css",
  "/stylesheets/footBall.css", "/stylesheets/matchDetails.css",
  "/stylesheets/nextpage.css", "/stylesheets/topRunScorers.css",
  "/stylesheets/topWicketTakers.css",

  // JavaScript Files
  "/javascripts/changeBowler.js", "/javascripts/cricStation.js",
  "/javascripts/fallOfWicket.js", "/javascripts/footBall.js",
  "/javascripts/score.js", "/javascripts/matcheDetails.js",
  "/javascripts/nextpage.js",

  // Images
  "/images/icon-192x192.png", "/images/icon-512x512.png"
];

// Install & Cache Static Files
this.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(urlsToCache);
      console.warn("Static assets cached!");
    })()
  );
});

// Fetch Event - Handles Dynamic & Static Requests
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.pathname.startsWith("/api/")) {
    event.respondWith(handleAPIRequest(event.request));
    return;
  }

  if (url.pathname.startsWith("/scorecard/") || url.pathname.startsWith("/matchDetails")) {
    event.respondWith(handleDynamicPages(event.request));
    return;
  }

  event.respondWith(handleStaticFiles(event.request));
});

// Cache API Responses (Dynamic)
async function handleAPIRequest(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
    return response;
  } catch {
    return caches.match(request) || new Response("Offline API data unavailable", { status: 503 });
  }
}

// Cache & Serve Dynamic Pages (HTML)
async function handleDynamicPages(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) return cachedResponse;

  try {
    const fetchedResponse = await fetch(request);
    cache.put(request, fetchedResponse.clone()); // Store full HTML response
    return fetchedResponse;
  } catch {
    return caches.match("/offline.html"); // Show fallback page if offline
  }
}

// Serve Static Files from Cache
async function handleStaticFiles(request) {
  const cachedResponse = await caches.match(request);
  return cachedResponse || fetch(request);
}

// Activate & Clear Old Cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => { 
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.warn("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })()
  );
});

