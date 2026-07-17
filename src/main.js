/* ============================================================
   TIMES OF THE WILD — interaction layer
   Phase 1 (this file): scroll reveal, nav rail, swipe decks, ad popups.
   Phase 2 (not yet implemented): cursor-chasing paw, idle meerkat,
   footprint trail — layered on top once the structure above is signed off.
   ============================================================ */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Breaking-news ticker: seamless infinite loop ---------------- */
  /* The track is built from whatever items already sit in the HTML (the
     "template" set). At any viewport width we clone that template enough
     times to comfortably exceed 2x the container width, always an even
     number of sets, so the CSS -50% keyframe always lands on a set
     boundary and the loop never runs out of content mid-scroll. */

  (function buildTicker() {
    const container = document.querySelector(".ticker");
    const track = document.querySelector(".ticker-track");
    if (!container || !track) return;

    if (!buildTicker.template) {
      buildTicker.template = Array.from(track.children).map((el) => el.cloneNode(true));
    }
    if (!buildTicker.template.length) return;

    track.innerHTML = "";
    buildTicker.template.forEach((node) => track.appendChild(node.cloneNode(true)));
    const setWidth = track.scrollWidth || 1;
    const targetWidth = container.clientWidth * 2.5;
    let sets = Math.max(2, Math.ceil(targetWidth / setWidth));
    if (sets % 2 !== 0) sets += 1;

    track.innerHTML = "";
    for (let s = 0; s < sets; s++) {
      buildTicker.template.forEach((node) => track.appendChild(node.cloneNode(true)));
    }

    let resizeTimer;
    window.removeEventListener("resize", buildTicker._onResize || (() => {}));
    buildTicker._onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildTicker, 200);
    };
    window.addEventListener("resize", buildTicker._onResize);
  })();

  /* ---------------- Crest eyes: cursor-tracking pupils ---------------- */

  (function initCrestEyes() {
    if (prefersReducedMotion) return;
    const crests = document.querySelectorAll(".crest");
    if (!crests.length) return;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let raf = null;

    function update() {
      raf = null;
      crests.forEach((crest) => {
        crest.querySelectorAll(".crest-eye").forEach((eye) => {
          const r = eye.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = pointerX - cx;
          const dy = pointerY - cy;
          const dist = Math.hypot(dx, dy) || 1;
          const maxMove = r.width * 0.4;
          const move = Math.min(dist * 0.05, maxMove);
          const nx = (dx / dist) * move;
          const ny = (dy / dist) * move;
          eye.style.transform = `translate(-50%, -50%) translate(${nx}px, ${ny}px)`;
        });
      });
    }

    window.addEventListener("pointermove", (e) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    });
  })();

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

  /* ---------------- Tab bar: active section + hybrid open/collapse ---------------- */

  const railLinks = Array.from(document.querySelectorAll(".tabbar-list a, .tabbar-brand"));
  const sections = Array.from(document.querySelectorAll(".issue-section[id]"));

  railLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.dataset.target;
      const target = document.getElementById(id);
      if (!target) return;

      // Defensive fallback: some browser/OS/CPU-throttling combinations
      // start a smooth scrollIntoView animation and then silently stall it
      // partway (observed: scroll moves a few px, then never continues).
      // Compare against the actual target position after a grace period,
      // not just "did it move at all", and snap the rest of the way if the
      // animation didn't really finish — the nav must never leave the page
      // stuck half-scrolled.
      const targetY = Math.round(
        window.scrollY + target.getBoundingClientRect().top - 52
      );
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        if (Math.abs(window.scrollY - targetY) > 24) {
          target.scrollIntoView({ behavior: "auto", block: "start" });
        }
      }, 700);
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

  /* ---------------- Moodcast map pins ---------------- */
  /* Hover already reveals the tooltip via CSS (:hover/:focus-visible) —
     this just adds a tap-to-toggle fallback for touch devices, where
     hover doesn't really exist. Tapping one pin closes any other. */

  const moodcastPins = document.querySelectorAll(".moodcast-pin");
  moodcastPins.forEach((pin) => {
    pin.addEventListener("click", (e) => {
      const alreadyOpen = pin.classList.contains("is-open");
      moodcastPins.forEach((p) => p.classList.remove("is-open"));
      if (!alreadyOpen) {
        pin.classList.add("is-open");
        e.stopPropagation();
      }
    });
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".moodcast-pin")) {
      moodcastPins.forEach((p) => p.classList.remove("is-open"));
    }
  });

  /* ---------------- Paw trinket ---------------- */
  /* Two behaviors: (1) an occasional unprompted enter/wave/leave from a
     random edge, on a long randomized timer so it stays a surprise rather
     than a metronome; (2) a rarer, cooldown-limited "reach" when the
     cursor lingers near the left/right edge of the viewport. Both share
     one element and a `busy` flag so they never overlap/fight. */

  (function initPawTrinket() {
    if (prefersReducedMotion) return;
    const paw = document.getElementById("pawTrinket");
    if (!paw) return;

    let busy = false;

    function play(edge, holdMs) {
      if (busy) return;
      busy = true;
      paw.classList.remove("edge-bottom", "edge-left", "edge-right");
      paw.classList.add("edge-" + edge);
      // Force reflow so the class swap above is committed before we
      // toggle is-active — otherwise the slide-in transition can be
      // skipped if the browser coalesces both class changes into one frame.
      void paw.offsetWidth;
      paw.classList.add("is-active");
      const waveTimer = setTimeout(() => paw.classList.add("is-waving"), 450);
      const leaveTimer = setTimeout(() => {
        paw.classList.remove("is-active", "is-waving");
        setTimeout(() => { busy = false; }, 800);
      }, holdMs);
      // Stash timers on the element in case a future change needs to
      // cancel an in-flight sequence (not used yet, cheap insurance).
      paw._timers = [waveTimer, leaveTimer];
    }

    function scheduleIdleWave() {
      const delay = 20000 + Math.random() * 25000; // 20–45s
      setTimeout(() => {
        const edges = ["bottom", "left", "right"];
        play(edges[Math.floor(Math.random() * edges.length)], 2200);
        scheduleIdleWave();
      }, delay);
    }
    scheduleIdleWave();

    let cooldownUntil = 0;
    document.addEventListener("pointermove", (e) => {
      if (busy || Date.now() < cooldownUntil) return;
      const zone = 64;
      let edge = null;
      if (e.clientX < zone) edge = "left";
      else if (e.clientX > window.innerWidth - zone) edge = "right";
      if (!edge) return;
      cooldownUntil = Date.now() + 20000; // don't retrigger for a while regardless
      if (Math.random() > 0.35) return; // and even then, only sometimes
      play(edge, 1800);
    });
  })();

  /* ---------------- Sudoku: playable grid ---------------- */
  /* Solution is only used locally to flag a wrong digit and detect a
     finished grid — never displayed, so it doesn't spoil the puzzle. */

  (function initSudoku() {
    const tile = document.querySelector(".puzzle-tile--sudoku");
    const grid = document.getElementById("sudokuGrid");
    if (!tile || !grid) return;

    const solution =
      "534678912672195348198342567859761423426853791713924856961537284287419635345286179";
    const cells = Array.from(grid.querySelectorAll(".sudoku-cell"));
    const editable = cells.filter((c) => !c.classList.contains("given"));

    function checkComplete() {
      const solved = cells.every((c, i) => c.value === solution[i]);
      tile.classList.toggle("is-solved", solved);
    }

    function focusNext(fromIndex, dir) {
      let i = fromIndex;
      for (let step = 0; step < cells.length; step++) {
        i += dir;
        if (i < 0 || i >= cells.length) return;
        if (!cells[i].classList.contains("given")) {
          cells[i].focus();
          cells[i].select();
          return;
        }
      }
    }

    editable.forEach((cell) => {
      cell.addEventListener("input", () => {
        const digit = cell.value.replace(/[^1-9]/g, "").slice(-1);
        cell.value = digit;
        const idx = cells.indexOf(cell);
        cell.classList.toggle(
          "is-conflict",
          digit !== "" && digit !== solution[idx]
        );
        checkComplete();
        if (digit !== "") focusNext(idx, 1);
      });

      cell.addEventListener("keydown", (e) => {
        const idx = cells.indexOf(cell);
        if (e.key === "Backspace" && cell.value === "") {
          focusNext(idx, -1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          focusNext(idx, 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          focusNext(idx, -1);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          focusNext(idx, 9);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          focusNext(idx, -9);
        }
      });
    });
  })();
})();
