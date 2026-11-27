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
  const targets = navLinks
    .map((link) => {
      const id = link.getAttribute("href");
      const el = id && id.startsWith("#") ? document.querySelector(id) : null;
      return el ? { link, el } : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && targets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const match = targets.find((t) => t.el === entry.target);
          if (!match) return;
          navLinks.forEach((l) => l.classList.toggle("is-active", l === match.link));
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
    };

    const scrollTo = (i, smooth = true) => {
      index = Math.max(0, Math.min(cards.length - 1, i));
      const card = cards[index];
      const left = card.offsetLeft - track.offsetLeft;
      track.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
      render();
    };

    document.querySelectorAll("[data-carousel]").forEach((button) => {
      button.addEventListener("click", () => {
        const dir = button.dataset.carousel === "next" ? 1 : -1;
        const max = cards.length - 1;
        const next = index + dir;
        scrollTo(next > max ? 0 : next < 0 ? max : next);
      });
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => scrollTo(i));
    });

    /* Keep the counter in sync with manual swipes */
    let frame = 0;
    track.addEventListener(
      "scroll",
      () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const center = track.scrollLeft + track.clientWidth / 2;
          let closest = 0;
          let best = Infinity;
          cards.forEach((card, i) => {
            const cardCenter = card.offsetLeft - track.offsetLeft + card.offsetWidth / 2;
            const dist = Math.abs(cardCenter - center);
            if (dist < best) {
              best = dist;
              closest = i;
            }
          });
          if (closest !== index) {
            index = closest;
            render();
          }
        });
      },
      { passive: true }
    );

    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollTo(index + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollTo(index - 1);
      }
    });

    render();
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
