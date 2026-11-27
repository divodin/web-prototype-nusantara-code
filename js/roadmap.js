/* ==========================================================================
   NUSANTARA CODE — halaman roadmap
   - Ikon tahap dibuat sebagai SVG (layer vektor di desain tidak membawa path)
   - Tandai link roadmap yang sedang dibuka
   ========================================================================== */
(function () {
  "use strict";

  const stroke = 'fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"';

  const icons = {
    pen:
      `<svg viewBox="0 0 24 24" aria-hidden="true"><path ${stroke} d="M4 20l4.2-1 10-10a2.4 2.4 0 0 0-3.4-3.4l-10 10L4 20z"/><path ${stroke} d="M13.5 7.5l3 3"/></svg>`,
    figma:
      `<svg viewBox="0 0 24 32" aria-hidden="true"><path fill="#F24E1E" d="M6 0h6v10.5H6A5.25 5.25 0 0 1 6 0z"/><path fill="#FF7262" d="M12 0h6a5.25 5.25 0 0 1 0 10.5h-6z"/><path fill="#A259FF" d="M6 10.5h6v10.5H6A5.25 5.25 0 0 1 6 10.5z"/><circle fill="#1ABCFE" cx="17.25" cy="15.75" r="5.25"/><path fill="#0ACF83" d="M6 21h6v5.25A5.25 5.25 0 1 1 6 21z"/></svg>`,
    research:
      `<svg viewBox="0 0 48 52" aria-hidden="true"><circle ${stroke} cx="20" cy="20" r="13"/><path ${stroke} d="M29.5 29.5L42 42"/><path ${stroke} d="M14 16h12M14 22h8"/></svg>`,
    wireframe:
      `<svg viewBox="0 0 52 48" aria-hidden="true"><rect ${stroke} x="4" y="6" width="26" height="36" rx="3"/><rect ${stroke} x="34" y="6" width="14" height="16" rx="3"/><rect ${stroke} x="34" y="26" width="14" height="16" rx="3"/><path ${stroke} d="M10 14h14M10 20h10M10 26h14M10 32h8"/></svg>`,
    component:
      `<svg viewBox="0 0 48 48" aria-hidden="true"><rect ${stroke} x="8" y="8" width="13" height="13" rx="2"/><rect ${stroke} x="27" y="8" width="13" height="13" rx="2"/><rect ${stroke} x="8" y="27" width="13" height="13" rx="2"/><rect ${stroke} x="27" y="27" width="13" height="13" rx="2"/></svg>`,
    bug:
      `<svg viewBox="0 0 48 48" aria-hidden="true"><rect ${stroke} x="14" y="14" width="20" height="26" rx="10"/><path ${stroke} d="M14 22H7M34 22h7M14 30H7M34 30h7M18 12l-3-5M30 12l3-5M24 14V7"/></svg>`,
    html:
      `<svg viewBox="0 0 48 48" aria-hidden="true"><path ${stroke} d="M9 6h30l-3 34-12 4-12-4z"/><path ${stroke} d="M16 16h16l-1 9H17M17 31h10"/></svg>`,
    css:
      `<svg viewBox="0 0 48 48" aria-hidden="true"><path ${stroke} d="M9 6h30l-3 34-12 4-12-4z"/><path ${stroke} d="M30 15H18l.7 8h10.5l-.8 8.5-5.4 1.5-5.4-1.5"/></svg>`,
    js:
      `<svg viewBox="0 0 48 48" aria-hidden="true"><rect ${stroke} x="7" y="7" width="34" height="34" rx="6"/><path ${stroke} d="M27 18v13a4 4 0 01-8 0"/><path ${stroke} d="M35 20c-1-1.6-6-2-6 2s6 2 6 6-6 3.5-6 1.5"/></svg>`,
    git:
      `<svg viewBox="0 0 48 48" aria-hidden="true"><circle ${stroke} cx="24" cy="10" r="4"/><circle ${stroke} cx="24" cy="38" r="4"/><circle ${stroke} cx="12" cy="24" r="4"/><path ${stroke} d="M24 14v20M20 24h-4"/></svg>`,
    server:
      `<svg viewBox="0 0 48 48" aria-hidden="true"><rect ${stroke} x="8" y="8" width="32" height="12" rx="3"/><rect ${stroke} x="8" y="28" width="32" height="12" rx="3"/><path ${stroke} d="M15 14h.01M15 34h.01M24 20v8"/></svg>`,
    database:
      `<svg viewBox="0 0 48 48" aria-hidden="true"><ellipse ${stroke} cx="24" cy="12" rx="14" ry="5"/><path ${stroke} d="M10 12v24c0 2.8 6.3 5 14 5s14-2.2 14-5V12"/><path ${stroke} d="M10 24c0 2.8 6.3 5 14 5s14-2.2 14-5"/></svg>`,
    code:
      `<svg viewBox="0 0 48 48" aria-hidden="true"><path ${stroke} d="M16 12L4 24l12 12M32 12l12 12-12 12M27 6L21 42"/></svg>`,
    tools:
      `<svg viewBox="0 0 48 48" aria-hidden="true"><path ${stroke} d="M6 42l9-9M40 14a9 9 0 01-11 11L15 39l-6-6 14-14A9 9 0 0140 14z"/></svg>`,
    android:
      `<svg viewBox="0 0 48 52" aria-hidden="true"><path ${stroke} d="M10 24h28v16a4 4 0 01-4 4H14a4 4 0 01-4-4V24z"/><path ${stroke} d="M24 8a14 14 0 0114 16H10A14 14 0 0124 8z"/><path ${stroke} d="M17 5l3 4M31 5l-3 4"/><circle fill="currentColor" cx="18" cy="34" r="1.6"/><circle fill="currentColor" cx="30" cy="34" r="1.6"/></svg>`,
    layout:
      `<svg viewBox="0 0 48 48" aria-hidden="true"><rect ${stroke} x="6" y="8" width="36" height="32" rx="4"/><path ${stroke} d="M6 20h36M6 30h20"/></svg>`,
    layers:
      `<svg viewBox="0 0 48 48" aria-hidden="true"><path ${stroke} d="M24 6l18 9-18 9L6 15z"/><path ${stroke} d="M6 24l18 9 18-9M6 33l18 9 18-9"/></svg>`,
    network:
      `<svg viewBox="0 0 48 48" aria-hidden="true"><circle ${stroke} cx="24" cy="10" r="4"/><circle ${stroke} cx="10" cy="38" r="4"/><circle ${stroke} cx="38" cy="38" r="4"/><path ${stroke} d="M24 14v10M22 24L12 34M26 24l10 10"/></svg>`,
    info:
      `<svg viewBox="0 0 31 30" aria-hidden="true"><circle fill="currentColor" cx="15.5" cy="15" r="14.2"/><path stroke="#fff" stroke-width="3.4" stroke-linecap="round" fill="none" d="M15.5 13.5v9"/><circle fill="#fff" cx="15.5" cy="8.6" r="2"/></svg>`,
    spark:
      `<svg viewBox="0 0 31 30" aria-hidden="true"><path fill="currentColor" d="M15.5 1l3.4 9.4L29 14l-10.1 3.6L15.5 29l-3.4-11.4L2 14l10.1-3.6z"/></svg>`
  };

  document.querySelectorAll("[data-icon]").forEach(function (el) {
    const svg = icons[el.getAttribute("data-icon")];
    if (svg) el.innerHTML = svg;
  });

  // Tandai navigasi berdasarkan file yang sedang dibuka
  const file = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".rm-nav a, .rm-switch a").forEach(function (link) {
    const target = (link.getAttribute("href") || "").split("/").pop();
    if (target === file) link.setAttribute("aria-current", "page");
    if (target === "index.html") link.removeAttribute("aria-current");
  });
})();
