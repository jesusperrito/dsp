/* ============================================================
   TIMES OF THE WILD — interaction layer
   Phase 1 (this file): scroll reveal, nav rail, swipe decks, ad popups.
   Phase 2 (not yet implemented): cursor-chasing paw, idle meerkat,
   footprint trail — layered on top once the structure above is signed off.
   ============================================================ */

(function () {
  "use strict";

  /* ---------------- Scroll reveal ---------------- */

  const revealEls = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------------- Nav rail: active section + hybrid open/collapse ---------------- */

  const rail = document.getElementById("navRail");
  const railToggle = document.getElementById("railToggle");
  const railLinks = Array.from(document.querySelectorAll(".rail-list a"));
  const sections = Array.from(document.querySelectorAll(".issue-section[id]"));

  if (railToggle && rail) {
    railToggle.addEventListener("click", () => {
      const open = rail.classList.toggle("is-open");
      railToggle.setAttribute("aria-expanded", String(open));
    });
  }

  railLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.dataset.target;
      const target = document.getElementById(id);
      if (!target) return;
      const details = target.querySelector(":scope > details.section-fold");
      if (details && !details.open) details.open = true;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (rail.classList.contains("is-open")) {
        rail.classList.remove("is-open");
        railToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = railLinks.find((l) => l.dataset.target === entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          railLinks.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* ---------------- Swipe card decks: mouse-drag support ---------------- */
  /* Native scroll-snap already handles touch + trackpad; this adds
     click-and-drag for desktop mice so nothing feels stuck. */

  document.querySelectorAll(".card-deck").forEach((deck) => {
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    deck.addEventListener("pointerdown", (e) => {
      isDown = true;
      deck.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startScroll = deck.scrollLeft;
      deck.style.scrollSnapType = "none";
    });
    deck.addEventListener("pointermove", (e) => {
      if (!isDown) return;
      deck.scrollLeft = startScroll - (e.clientX - startX);
    });
    const release = () => {
      isDown = false;
      deck.style.scrollSnapType = "";
    };
    deck.addEventListener("pointerup", release);
    deck.addEventListener("pointerleave", release);
    deck.addEventListener("pointercancel", release);
  });

  /* ---------------- Ad break popups ---------------- */

  const overlay = document.getElementById("adPopupOverlay");
  const popup = document.getElementById("adPopup");
  const popupClose = document.getElementById("adPopupClose");
  const popupContent = document.getElementById("adPopupContent");

  const MAX_DODGES = 2;
  let dodgeCount = 0;

  function openAdPopup(adSection) {
    popupContent.innerHTML = adSection.querySelector(".ad-inline").innerHTML;
    overlay.hidden = false;
    dodgeCount = 0;
    popupClose.style.transform = "";
    document.body.style.overflow = "hidden";
  }

  function closeAdPopup() {
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  popupClose.addEventListener("pointerenter", () => {
    if (dodgeCount >= MAX_DODGES) return;
    dodgeCount += 1;
    const maxOffset = 46;
    const dx = (Math.random() * 2 - 1) * maxOffset;
    const dy = (Math.random() * 2 - 1) * maxOffset;
    popupClose.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  popupClose.addEventListener("click", closeAdPopup);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) closeAdPopup();
  });

  const adBreaks = document.querySelectorAll(".issue-section.ad-break");
  const adObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.shown) {
          entry.target.dataset.shown = "true";
          openAdPopup(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  adBreaks.forEach((ad) => adObserver.observe(ad));
})();
