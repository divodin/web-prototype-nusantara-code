/* ==========================================================================
   NUSANTARA CODE — Komponen Header & Footer Bersama
   ========================================================================== */
(function () {
  "use strict";

  var isRoadmap =
    document.body.classList.contains("roadmap-page") ||
    window.location.pathname.indexOf("/roadmap/") !== -1;

  var root = isRoadmap ? "../" : "";

  // 1. Suntikkan Header
  var navContainer = document.getElementById("nav-placeholder");
  if (navContainer) {
    navContainer.outerHTML =
      '<header class="site-header" style="position:relative; z-index:999;">' +
        '<a class="logo" href="' + root + 'index.html#home" aria-label="Nusantara Code — beranda">NUSANTARA CODE</a>' +
        '<nav class="site-nav" aria-label="Navigasi utama">' +
          '<a href="' + root + 'index.html#home" data-nav-target="home">Beranda</a>' +
          '<a href="' + root + 'index.html#about" data-nav-target="about">Tentang Komunitas</a>' +
          '<a href="' + root + 'index.html#roadmap" data-nav-target="roadmap">Roadmap</a>' +
          '<a href="' + root + 'index.html#contact" data-nav-target="contact">Contact us</a>' +
        '</nav>' +
      '</header>';
  }

  // 2. Suntikkan Footer (Back to top di Landing Page | Back to homepage di Roadmap)
  var footerContainer = document.getElementById("footer-placeholder");
  if (footerContainer) {
    var footerActionHtml = isRoadmap
      ? '<a class="site-footer__copy" href="../index.html#home">Back to homepage →</a>'
      : '<a class="site-footer__copy" href="#home" data-back-to-top>Back to top ↑</a>';

    footerContainer.outerHTML =
      '<footer class="site-footer">' +
        '<a class="site-footer__brand" href="' + root + 'index.html#home">NUSANTARA CODE</a>' +
        '<p class="site-footer__tagline">Learn. Build. Connect.</p>' +
        footerActionHtml +
      '</footer>';
  }

  // 3. Handler klik tombol "Back to top" di Landing Page
  var backToTopBtn = document.querySelector("[data-back-to-top]");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.replaceState(null, "", "#home");
    });
  }

  // 4. Navigasi & scroll antar halaman
  document.querySelectorAll(".site-nav a[data-nav-target], .logo, .site-footer__brand").forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = this.getAttribute("data-nav-target") || "home";
      var targetEl = document.getElementById(targetId);

      if (!isRoadmap && targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", "#" + targetId);
        return;
      }

      if (isRoadmap) {
        e.preventDefault();
        try {
          sessionStorage.setItem("nc_scroll_target", targetId);
        } catch (err) {}
        window.location.href = "../index.html#" + targetId;
      }
    });
  });

  // 5. Auto-scroll saat tiba di index.html dari halaman lain
  if (!isRoadmap) {
    var pendingTarget = null;
    try {
      pendingTarget = sessionStorage.getItem("nc_scroll_target");
      if (pendingTarget) sessionStorage.removeItem("nc_scroll_target");
    } catch (err) {}

    if (!pendingTarget && window.location.hash) {
      pendingTarget = window.location.hash.replace("#", "");
    }

    if (pendingTarget) {
      var el = document.getElementById(pendingTarget);
      if (el) {
        setTimeout(function () {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      }
    }
  }
})();