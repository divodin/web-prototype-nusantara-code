/* ==========================================================================
   NUSANTARA CODE — Halaman Roadmap
   Menandai link roadmap aktif & merapikan viewBox ikon SVG.
   ========================================================================== */
(function () {
  "use strict";

  var currentSlug = window.location.pathname
    .split("/")
    .pop()
    .replace(/\.html$/i, "") || "index";

  document.querySelectorAll(".site-nav a, .rm-switch a").forEach(function (link) {
    var href = link.getAttribute("href") || "";
    var targetSlug = href
      .split("#")[0]
      .split("?")[0]
      .split("/")
      .pop()
      .replace(/\.html$/i, "");

    if (link.closest(".site-nav") && href.indexOf("#roadmap") !== -1) {
      link.setAttribute("aria-current", "page");
    } else if (link.closest(".rm-switch") && targetSlug === currentSlug) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  document.querySelectorAll(".rm-step__icon svg").forEach(function (svg) {
    try {
      var box = svg.getBBox();
      if (box.width > 0 && box.height > 0) {
        svg.setAttribute("viewBox", box.x + " " + box.y + " " + box.width + " " + box.height);
        svg.removeAttribute("width");
        svg.removeAttribute("height");
      }
    } catch (e) {
      // Abaikan jika SVG tersembunyi
    }
  });
})();