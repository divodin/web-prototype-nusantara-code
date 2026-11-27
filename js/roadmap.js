/* ==========================================================================
   NUSANTARA CODE — halaman roadmap
   Menandai link roadmap aktif & memperbaiki viewBox ikon SVG yang terpotong.
   ========================================================================== */
(function () {
  "use strict";

  var file = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".rm-nav a, .rm-switch a").forEach(function (link) {
    var target = (link.getAttribute("href") || "").split("/").pop();
    if (target === file) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  // Perbaiki ikon SVG di dalam .rm-step__icon yang terpotong karena tidak punya viewBox
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