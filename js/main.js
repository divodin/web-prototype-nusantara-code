/* ==========================================================================
   NUSANTARA CODE — interactions
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Sticky header shadow ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile navigation ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));

  /* Header memakai href "index.html#home", jadi ambil bagian setelah "#". */
  const targets = navLinks
    .map((link) => {
      const href = link.getAttribute("href") || "";
      const hash = href.indexOf("#");
      const id = link.getAttribute("data-nav-target") || (hash !== -1 ? href.slice(hash + 1) : "");
      const el = id ? document.getElementById(id) : null;
      return el ? { link, el } : null;
    })
    .filter(Boolean);

  const setActiveNav = (activeLink) => {
    navLinks.forEach((link) => {
      const isActive = link === activeLink;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  if ("IntersectionObserver" in window && targets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const match = targets.find((t) => t.el === entry.target);
          if (match) setActiveNav(match.link);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    targets.forEach((t) => observer.observe(t.el));
  }

  /* ---------- Carousel ---------- */
  const track = document.querySelector("[data-carousel-track]");
  const cards = track ? Array.from(track.children) : [];
  const dots = Array.from(document.querySelectorAll("[data-carousel-dots] .dot"));
  const counter = document.querySelector("[data-carousel-count]");

  if (track && cards.length) {
    let index = 0;

    const pad = (n) => String(n).padStart(2, "0");

    const render = () => {
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
      if (counter) counter.textContent = `${pad(index + 1)} / ${pad(cards.length)}`;
      updateFades();
    };

    const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);

    /* Fade hanya di sisi yang benar-benar masih punya kartu terpotong. */
    const updateFades = () => {
      const max = maxScroll();
      track.classList.toggle("is-fade-start", track.scrollLeft > 2);
      track.classList.toggle("is-fade-end", track.scrollLeft < max - 2);
    };

    /* Setiap kartu diposisikan di tengah track, lalu dijepit ke batas scroll. */
    const leftFor = (i) => {
      const card = cards[i];
      const start = card.offsetLeft - track.offsetLeft;
      const centered = start + card.offsetWidth / 2 - track.clientWidth / 2;
      return Math.min(maxScroll(), Math.max(0, centered));
    };

    const scrollTo = (i, smooth = true) => {
      index = Math.max(0, Math.min(cards.length - 1, i));
      track.scrollTo({ left: leftFor(index), behavior: smooth ? "smooth" : "auto" });
      render();
    };

    const step = (dir) => {
      const max = cards.length - 1;
      const next = index + dir;
      scrollTo(next > max ? 0 : next < 0 ? max : next);
    };

    document.querySelectorAll("[data-carousel]").forEach((button) => {
      button.addEventListener("click", () => {
        step(button.dataset.carousel === "next" ? 1 : -1);
      });
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => scrollTo(i));
    });

    /* Keep the counter in sync with manual swipes (tunggu scroll selesai
       supaya indikator tidak berkedip saat animasi tombol). */
    let syncTimer = 0;
    track.addEventListener(
      "scroll",
      () => {
        updateFades();
        clearTimeout(syncTimer);
        syncTimer = setTimeout(() => {
          const current = track.scrollLeft;
          let closest = 0;
          let best = Infinity;
          cards.forEach((_, i) => {
            const dist = Math.abs(leftFor(i) - current);
            if (dist < best) {
              best = dist;
              closest = i;
            }
          });
          if (closest !== index) {
            index = closest;
            render();
          }
        }, 120);
      },
      { passive: true }
    );

    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    });

    render();

    let resizeFrame = 0;
    window.addEventListener(
      "resize",
      () => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(() => {
          scrollTo(index, false);
        });
      },
      { passive: true }
    );
  }

  /* ---------- Contact: project topic picker ---------- */
  const topics = ["Website", "Interface / UI", "Mobile app", "Something else"];
  const topicButton = document.querySelector("[data-topic]");

  if (topicButton) {
    let cursor = -1;
    topicButton.addEventListener("click", () => {
      cursor = (cursor + 1) % topics.length;
      topicButton.textContent = topics[cursor];
    });
  }
})();
