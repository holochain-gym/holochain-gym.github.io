this.workbox = this.workbox || {};
this.workbox.recipes = (function (exports, registerRoute_js, StaleWhileRevalidate_js, CacheFirst_js, CacheableResponsePlugin_js, ExpirationPlugin_js, NetworkFirst_js, setCatchHandler_js, matchPrecache_js) {
    'use strict';

    try {
      self['workbox:recipes:6.0.2'] && _();
    } catch (e) {}

    /*
      Copyright 2020 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * An implementation of the [Google fonts]{@link https://developers.google.com/web/tools/workbox/guides/common-recipes#google_fonts} caching recipe
     *
     * @memberof module:workbox-recipes
     *
     * @param {Object} [options]
     * @param {string} [options.cachePrefix] Cache prefix for caching stylesheets and webfonts. Defaults to google-fonts
     * @param {number} [options.maxAgeSeconds] Maximum age, in seconds, that font entries will be cached for. Defaults to 1 year
     * @param {number} [options.maxEntries] Maximum number of fonts that will be cached. Defaults to 30
     */

    function googleFontsCache(options = {}) {
      const sheetCacheName = `${options.cachePrefix || 'google-fonts'}-stylesheets`;
      const fontCacheName = `${options.cachePrefix || 'google-fonts'}-webfonts`;
      const maxAgeSeconds = options.maxAgeSeconds || 60 * 60 * 24 * 365;
      const maxEntries = options.maxEntries || 30; // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.

      registerRoute_js.registerRoute(({
        url
      }) => url.origin === 'https://fonts.googleapis.com', new StaleWhileRevalidate_js.StaleWhileRevalidate({
        cacheName: sheetCacheName
      })); // Cache the underlying font files with a cache-first strategy for 1 year.

      registerRoute_js.registerRoute(({
        url
      }) => url.origin === 'https://fonts.gstatic.com', new CacheFirst_js.CacheFirst({
        cacheName: fontCacheName,
        plugins: [new CacheableResponsePlugin_js.CacheableResponsePlugin({
          statuses: [0, 200]
        }), new ExpirationPlugin_js.ExpirationPlugin({
          maxAgeSeconds,
          maxEntries
        })]
      }));
    }

    /*
      Copyright 2020 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * An implementation of the [image caching recipe]{@link https://developers.google.com/web/tools/workbox/guides/common-recipes#caching_images}
     *
     * @memberof module:workbox-recipes
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] Name for cache. Defaults to images
     * @param {number} [options.maxAgeSeconds] Maximum age, in seconds, that font entries will be cached for. Defaults to 30 days
     * @param {number} [options.maxEntries] Maximum number of images that will be cached. Defaults to 60
     */

    function imageCache(options = {}) {
      const defaultMatchCallback = ({
        request
      }) => request.destination === 'image';

      const cacheName = options.cacheName || 'images';
      const matchCallback = options.matchCallback || defaultMatchCallback;
      const maxAgeSeconds = options.maxAgeSeconds || 30 * 24 * 60 * 60;
      const maxEntries = options.maxEntries || 60;
      registerRoute_js.registerRoute(matchCallback, new CacheFirst_js.CacheFirst({
        cacheName,
        plugins: [new CacheableResponsePlugin_js.CacheableResponsePlugin({
          statuses: [0, 200]
        }), new ExpirationPlugin_js.ExpirationPlugin({
          maxEntries,
          maxAgeSeconds
        })]
      }));
    }

    /*
      Copyright 2020 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * An implementation of the [CSS and JavaScript files recipe]{@link https://developers.google.com/web/tools/workbox/guides/common-recipes#cache_css_and_javascript_files}
     *
     * @memberof module:workbox-recipes
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] Name for cache. Defaults to static-resources
     */

    function staticResourceCache(options = {}) {
      const defaultMatchCallback = ({
        request
      }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'worker';

      const cacheName = options.cacheName || 'static-resources';
      const matchCallback = options.matchCallback || defaultMatchCallback;
      registerRoute_js.registerRoute(matchCallback, new StaleWhileRevalidate_js.StaleWhileRevalidate({
        cacheName,
        plugins: [new CacheableResponsePlugin_js.CacheableResponsePlugin({
          statuses: [0, 200]
        })]
      }));
    }

    /*
      Copyright 2020 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * An implementation of a page caching recipe with a network timeout
     *
     * @memberof module:workbox-recipes
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] Name for cache. Defaults to pages
     * @param {RouteMatchCallback} [options.matchCallback] Workbox callback function to call to match to. Defaults to request.mode === 'navigate';
     * @param {number} [options.networkTimoutSeconds] Maximum amount of time, in seconds, to wait on the network before falling back to cache. Defaults to 3
     */

    function pageCache(options = {}) {
      const defaultMatchCallback = ({
        request
      }) => request.mode === 'navigate';

      const cacheName = options.cacheName || 'pages';
      const matchCallback = options.matchCallback || defaultMatchCallback;
      const networkTimeoutSeconds = options.networkTimeoutSeconds || 3;
      registerRoute_js.registerRoute(matchCallback, new NetworkFirst_js.NetworkFirst({
        networkTimeoutSeconds,
        cacheName,
        plugins: [new CacheableResponsePlugin_js.CacheableResponsePlugin({
          statuses: [0, 200]
        })]
      }));
    }

    /*
      Copyright 2020 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * An implementation of the [comprehensive fallbacks recipe]{@link https://developers.google.com/web/tools/workbox/guides/advanced-recipes#comprehensive_fallbacks}. Be sure to include the fallbacks in your precache injection
     *
     * @memberof module:workbox-recipes
     *
     * @param {Object} [options]
     * @param {string} [options.pageFallback] Precache name to match for pag fallbacks. Defaults to offline.html
     * @param {string} [options.imageFallback] Precache name to match for image fallbacks.
     * @param {string} [options.fontFallback] Precache name to match for font fallbacks.
     */

    function offlineFallback(options = {}) {
      const pageFallback = options.pageFallback || 'offline.html';
      const imageFallback = options.imageFallback || false;
      const fontFallback = options.fontFallback || false;

      const handler = async options => {
        const dest = options.request.destination;

        if (dest === "document") {
          return (await matchPrecache_js.matchPrecache(pageFallback)) || Response.error();
        }

        if (dest === "image" && imageFallback !== false) {
          return (await matchPrecache_js.matchPrecache(imageFallback)) || Response.error();
        }

        if (dest === "font" && fontFallback !== false) {
          return (await matchPrecache_js.matchPrecache(fontFallback)) || Response.error();
        }

        return Response.error();
      };

      setCatchHandler_js.setCatchHandler(handler);
    }

    exports.googleFontsCache = googleFontsCache;
    exports.imageCache = imageCache;
    exports.offlineFallback = offlineFallback;
    exports.pageCache = pageCache;
    exports.staticResourceCache = staticResourceCache;

    return exports;

}({}, workbox.routing, workbox.strategies, workbox.strategies, workbox.cacheableResponse, workbox.expiration, workbox.strategies, workbox.routing, workbox.precaching));
//# sourceMappingURL=workbox-recipes.dev.js.map
