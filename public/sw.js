const CACHE_NAME = "version-2";

// Rutas reales de tu app
const urlsToCache = [
  "/",                // Home (Notas)
  "/tareas",          // Página de tareas
  "/manifest.json",
  "https://cdn-icons-png.flaticon.com/128/6711/6711178.png",
  "https://cdn-icons-png.flaticon.com/128/6711/6711178.pngg"
];

// 🟢 INSTALACIÓN (cachea sin romper si algo falla)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log("Cacheando recursos...");

      const cachePromises = urlsToCache.map((url) =>
        fetch(url)
          .then((response) => {
            if (response.ok) {
              return cache.put(url, response);
            }
          })
          .catch(() => {
            console.warn("No se pudo cachear:", url);
          })
      );

      return Promise.all(cachePromises);
    })
  );
});

// 🟡 FETCH (modo offline primero)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si está en caché → lo devuelve
      if (response) {
        return response;
      }

      // Si no → lo busca en internet
      return fetch(event.request)
        .then((networkResponse) => {
          // Guardar en caché dinámico (opcional)
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          console.warn("Sin conexión y recurso no cacheado:", event.request.url);
        });
    })
  );
});

// 🔵 ACTIVACIÓN (limpia versiones viejas)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Eliminando caché vieja:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});