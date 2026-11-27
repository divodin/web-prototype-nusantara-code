/* ==========================================================================
   NUSANTARA CODE — Komponen Header & Footer Bersama
   Menyuntikkan header (.site-header) dan footer (.site-footer) ke semua halaman.
   ========================================================================== */
(function () {
  "use strict";

  var isRoadmap = document.body.classList.contains("roadmap-page");
  var root = isRoadmap ? "../" : "";
  var roadmapDir = isRoadmap ? "" : "roadmap/";

  // 1. Suntikkan Header
  var navContainer = document.getElementById("nav-placeholder");
  if (navContainer) {
    navContainer.outerHTML =
      '<header class="site-header">' +
        '<a class="logo" href="' + root + 'index.html#home" aria-label="Nusantara Code — beranda">NUSANTARA CODE</a>' +
        '<nav class="site-nav" aria-label="Navigasi utama">' +
          '<a href="' + root + 'index.html#home">Beranda</a>' +
          '<a href="' + root + 'index.html#about">Tentang Komunitas</a>' +
          '<a href="' + root + 'index.html#roadmap">Roadmap</a>' +
          '<a href="' + root + 'index.html#contact">Contact us</a>' +
        '</nav>' +
      '</header>';
  }

  // 2. Suntikkan Footer
  var footerContainer = document.getElementById("footer-placeholder");
  if (footerContainer) {
    footerContainer.outerHTML =
      '<footer class="site-footer">' +
        '<a class="site-footer__brand" href="' + root + 'index.html#home">NUSANTARA CODE</a>' +
        '<p class="site-footer__tagline">Learn. Build. Connect.</p>' +
        '<a class="site-footer__copy" href="' + root + 'index.html#contact">nusantarakode@gmail.com</a>' +
      '</footer>';
  }
})();