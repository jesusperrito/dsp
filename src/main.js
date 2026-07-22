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
        const crestRect = crest.getBoundingClientRect();
        // Socket radius was measured by rendering each crest asset to a
        // canvas and running connected-component analysis on the alpha
        // channel to find the true transparent hole (not eyeballed, not a
        // grid overlay read by hand — both of those were tried and both
        // were off by double digits at one point). Header socket ≈5% of
        // crest width, footer ≈6.5%; this uses the smaller with margin,
        // shared across every crest instance rather than tuned per-asset.
        const maxMove = crestRect.width * 0.032;
        crest.querySelectorAll(".crest-eye").forEach((eye) => {
          const r = eye.getBoundingClientRect();
          // Once the crest has scrolled well clear of the viewport, its
          // rect is way off-screen (huge/negative top) while the pointer
          // is still constrained to the viewport — the math below would
          // then compute a dx/dy dominated entirely by that offset,
          // making the eyes look "stuck" pointing one way (mostly
          // downward/away) no matter where the cursor actually is, until
          // the header scrolled back near the top. Skip and reset instead.
          if (r.bottom < -200 || r.top > window.innerHeight + 200) {
            if (eye.style.transform) eye.style.transform = "";
            return;
          }
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = pointerX - cx;
          const dy = pointerY - cy;
          const dist = Math.hypot(dx, dy) || 1;
          const move = Math.min(dist * 0.15, maxMove);
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
    window.addEventListener(
      "scroll",
      () => {
        if (!raf) raf = requestAnimationFrame(update);
      },
      { passive: true }
    );
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
  // Safety net: content must never stay permanently hidden if the observer
  // never fires (headless renderers, prerender, some crawlers, a throttled
  // tab). Shortly after load, reveal anything still not visible — the
  // animation is a nice-to-have, the content is not optional.
  window.addEventListener("load", () => {
    setTimeout(() => {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }, 1200);
  });

  /* ---------------- Tab bar: brand wordmark appears once the masthead scrolls away ---------------- */
  /* The full crest + wordmark are already on screen at load — showing the
     small wordmark in the sticky bar too is redundant until the masthead
     itself has scrolled out of view. */

  (function initBrandOnScroll() {
    const tabbar = document.querySelector(".tabbar");
    const masthead = document.querySelector(".masthead");
    if (!tabbar || !masthead) return;
    // Plain scroll check rather than IntersectionObserver: it's a single
    // threshold (has the masthead's bottom passed above the sticky bar?),
    // and a direct scrollY comparison is more robust than IO across
    // environments. The work is two property reads + a class toggle, cheap
    // enough to run straight from the scroll handler with no rAF/observer
    // plumbing that could stall.
    function update() {
      const mastheadBottom = masthead.offsetTop + masthead.offsetHeight;
      // 52px ≈ the sticky tab bar's own height, so it flips right as the
      // masthead disappears behind the bar rather than a bit after.
      tabbar.classList.toggle("is-scrolled", window.scrollY > mastheadBottom - 52);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  })();

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

  /* ---------------- Article pager ---------------- */
  /* One article visible at a time per section; prev/next arrows slide the
     track by one card width. Clamped at both ends (no wrap) so "1 / 3"
     always matches what disabled/enabled arrows imply. */

  document.querySelectorAll(".card-pager").forEach((pager) => {
    const track = pager.querySelector(".card-pager-track");
    const cards = Array.from(pager.querySelectorAll(".card"));
    const prevBtn = pager.querySelector(".card-pager-prev");
    const nextBtn = pager.querySelector(".card-pager-next");
    const currentEl = pager.querySelector(".card-pager-current");
    if (!track || cards.length < 2) {
      if (prevBtn) prevBtn.hidden = true;
      if (nextBtn) nextBtn.hidden = true;
      return;
    }
    let index = 0;

    // Match the track's height to the CURRENT card so a short article
    // (e.g. the 3-paragraph Park Logo piece) doesn't inherit the tallest
    // card's height and leave a big empty gap below it.
    function syncHeight() {
      track.style.height = cards[index].offsetHeight + "px";
    }
    function render() {
      track.style.transform = `translateX(-${index * 100}%)`;
      if (currentEl) currentEl.textContent = index + 1;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === cards.length - 1;
      // Mark which card is on-screen so the video layer only ever plays the
      // featured card's video, never a hidden sibling's (which was audible
      // but invisible before).
      cards.forEach((c, i) => c.classList.toggle("is-featured", i === index));
      syncHeight();
      // Let the video layer re-evaluate which video (if any) should run.
      pager.dispatchEvent(new CustomEvent("pagerchange", { bubbles: true }));
    }
    prevBtn.addEventListener("click", () => {
      if (index > 0) {
        index -= 1;
        render();
      }
    });
    nextBtn.addEventListener("click", () => {
      if (index < cards.length - 1) {
        index += 1;
        render();
      }
    });
    render();
    // Re-measure once late-loading media (images/videos) settle, and on
    // resize, since the active card's height can change.
    window.addEventListener("load", syncHeight);
    window.addEventListener("resize", syncHeight);
    pager.querySelectorAll("img, video").forEach((m) => {
      m.addEventListener("load", syncHeight);
      m.addEventListener("loadedmetadata", syncHeight);
    });
  });

  /* ---------------- Ad break popups ---------------- */

  const overlay = document.getElementById("adPopupOverlay");
  const popup = document.getElementById("adPopup");
  const popupClose = document.getElementById("adPopupClose");
  const popupContent = document.getElementById("adPopupContent");

  const MAX_DODGES = 2;
  let dodgeCount = 0;

  function openAdPopup(adSection) {
    // The popup shows its OWN creative (data-popup-img), separate from the
    // section's inline banner — so the section and the popup aren't the
    // same image twice.
    const img = adSection.dataset.popupImg;
    const alt = adSection.dataset.popupAlt || "Advertisement";
    if (!img) return;
    popupContent.innerHTML =
      '<img class="ad-popup-img" src="' + img + '" alt="' + alt.replace(/"/g, "&quot;") + '">';
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

  /* Side skyscraper ads: dismissible, and revealed only once the reader has
     scrolled past the front-page hero — otherwise (being position:fixed and
     vertically centred) they sit over the masthead and nav at the top. */
  (function initSideAds() {
    const sideAds = Array.from(document.querySelectorAll(".side-ad"));
    if (!sideAds.length) return;
    sideAds.forEach((ad) => {
      const close = ad.querySelector(".side-ad-close");
      if (close) close.addEventListener("click", () => ad.classList.add("is-dismissed"));
    });
    const frontPage = document.getElementById("front-page");
    function update() {
      // Reveal once the front-page section's bottom has passed above the
      // viewport top (i.e. we're into the article sections).
      const pastHeader = frontPage
        ? window.scrollY > frontPage.offsetTop + frontPage.offsetHeight - 40
        : window.scrollY > 400;
      sideAds.forEach((ad) => ad.classList.toggle("is-revealed", pastHeader));
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  })();

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
    // A tapped-open pin (.is-open, CSS-driven) doesn't get cleared by
    // simply hovering a different pin afterwards — :hover and .is-open
    // are independent triggers, so without this two tooltips could show
    // at once. Hovering any other pin always closes a tapped-open one.
    pin.addEventListener("mouseenter", () => {
      moodcastPins.forEach((p) => {
        if (p !== pin) p.classList.remove("is-open");
      });
    });
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".moodcast-pin")) {
      moodcastPins.forEach((p) => p.classList.remove("is-open"));
    }
  });

  /* ---------------- Media slots: video (hover, or featured autoplay) with sound ---------------- */
  /* Two playback modes, never more than one video at a time:
       • A slot that has a still photo (img+video) plays ONLY on hover —
         the photo is its resting state, the video is the reward for
         pointing at it.
       • A slot with no still photo (video-only) has nothing to show at
         rest, so it autoplays — but ONLY while it's the "featured" card
         (the one the pager currently has on screen) AND actually in view.
     "Featured" gating is the important bit: a pager keeps its other
     articles in the DOM, just translated off to the side, so without this
     a hidden sibling's video would play (audible, invisible) — which is
     exactly the Fashion giraffe-hairstyle glitch. Sound is on; browsers
     block unmuted autoplay until a gesture, so video starts muted and
     unmutes on the first click/tap/key or via the per-slot mute button. */

  (function initVideos() {
    const slots = Array.from(document.querySelectorAll(".media-slot--has-video"));
    if (!slots.length) return;

    const muteIcon =
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 8.5l4 4m0-4l-4 4" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>';
    const soundIcon =
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 8.5a4 4 0 010 7M18.5 6a7 7 0 010 12" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>';

    let soundOn = true; // the reader's expressed preference
    let unlocked = false; // has a real user gesture happened yet?
    let activeSlot = null;
    let hoveredSlot = null; // an img+video slot currently under the pointer

    const entries = slots.map((slot) => {
      const video = slot.querySelector(".media-slot-video");
      const hasPhoto = !!slot.querySelector(".media-slot-photo");
      // No still photo ⇒ the video is the resting visual: strip the grey
      // icon placeholder so the video shows directly.
      if (!hasPhoto) slot.classList.add("media-slot--video-only");
      if (video) {
        video.muted = true; // start muted so autoplay is always permitted
        video.setAttribute("playsinline", "");
        video.loop = true;
      }
      // Per-slot mute/unmute button.
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "media-slot-mute";
      btn.setAttribute("aria-label", "Toggle video sound");
      btn.innerHTML = soundOn ? soundIcon : muteIcon;
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        soundOn = !soundOn;
        unlocked = true;
        applySound();
        refreshButtons();
      });
      slot.appendChild(btn);

      const en = { slot, video, btn, hasPhoto };

      // img+video ⇒ hover to play.
      if (hasPhoto) {
        slot.addEventListener("pointerenter", (e) => {
          if (e.pointerType === "touch") return; // no true hover on touch
          hoveredSlot = slot;
          resolve();
        });
        slot.addEventListener("pointerleave", (e) => {
          if (e.pointerType === "touch") return;
          if (hoveredSlot === slot) hoveredSlot = null;
          resolve();
        });
      }
      return en;
    });

    function refreshButtons() {
      entries.forEach((en) => (en.btn.innerHTML = soundOn ? soundIcon : muteIcon));
    }

    function applySound() {
      entries.forEach((en) => {
        if (!en.video) return;
        const wantAudio = en.slot === activeSlot && soundOn && unlocked;
        en.video.muted = !wantAudio;
      });
    }

    function setActive(slot) {
      if (activeSlot === slot) {
        applySound();
        return;
      }
      if (activeSlot) {
        activeSlot.classList.remove("is-playing");
        const prev = activeSlot.querySelector(".media-slot-video");
        if (prev) prev.pause();
      }
      activeSlot = slot;
      if (!slot) return;
      slot.classList.add("is-playing");
      const video = slot.querySelector(".media-slot-video");
      if (!video) return;
      video.muted = !(soundOn && unlocked);
      const p = video.play();
      if (p && p.catch) {
        p.catch(() => {
          video.muted = true; // unmuted autoplay refused pre-gesture
          video.play().catch(() => {});
        });
      }
    }

    // A card kept off to the side by a pager isn't "featured"; the hero and
    // any non-pager slot always are.
    function isFeatured(slot) {
      const card = slot.closest(".card");
      if (!card) return true;
      return card.classList.contains("is-featured");
    }
    function visibleFraction(el) {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.height <= 0) return 0;
      const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      return visible / r.height;
    }

    // Decide what should be playing: a hovered img+video wins; otherwise the
    // most-in-view *featured* video-only slot; otherwise nothing.
    function resolve() {
      if (hoveredSlot) {
        setActive(hoveredSlot);
        return;
      }
      let best = null;
      let bestFrac = 0.5; // require a solid majority in view
      entries.forEach((en) => {
        if (en.hasPhoto) return; // img+video only ever plays on hover
        if (!isFeatured(en.slot)) return; // never a hidden pager sibling
        const frac = visibleFraction(en.slot);
        if (frac > bestFrac) {
          bestFrac = frac;
          best = en.slot;
        }
      });
      setActive(best);
    }

    // Timestamp throttle (not rAF) so it can't stall if rAF is starved.
    let lastRun = 0;
    let trailing = null;
    function onScroll() {
      const now = Date.now();
      if (now - lastRun >= 120) {
        lastRun = now;
        resolve();
      } else {
        clearTimeout(trailing);
        trailing = setTimeout(() => {
          lastRun = Date.now();
          resolve();
        }, 120);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    // A pager switching its featured card must re-evaluate immediately.
    document.addEventListener("pagerchange", resolve);
    resolve();

    function unlock() {
      if (unlocked) return;
      unlocked = true;
      applySound();
    }
    ["pointerdown", "keydown", "touchstart"].forEach((evt) =>
      window.addEventListener(evt, unlock, { once: true, passive: true })
    );
  })();

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

    // offsetPct: where along the edge it enters (15–85%, clear of the
    // corners so it never clips a registration mark or nav corner).
    function play(edge, holdMs, offsetPct) {
      if (busy) return;
      busy = true;

      // THE fix for "paw enters from the wrong edge / diagonally".
      // The CSS transitions `transform`, and each edge's hidden state uses
      // a DIFFERENT transform axis (edge-left/right => translateX(±260),
      // edge-top/bottom => translateY(±260)). When we swap edge classes
      // while that transition is live, the browser interpolates the
      // transform from the *previous* edge's axis to the new one — e.g.
      // from translateY(260) (bottom) to translateX(260) (right) — which
      // reads as the paw sweeping diagonally in from the wrong side.
      // Neither a plain reflow nor a double-rAF prevented this because the
      // transition was never actually turned OFF during the swap.
      // So: kill the transition, snap the new edge's hidden state into
      // place, force a reflow to COMMIT it with no animation, then
      // re-enable the transition and slide in on the next frame. Now the
      // only thing that ever animates is this one edge's straight,
      // single-axis in/out — never a cross-axis interpolation.
      paw.style.transition = "none";
      paw.classList.remove("edge-top", "edge-bottom", "edge-left", "edge-right", "is-active", "is-waving");
      paw.classList.add("edge-" + edge);
      const pct = offsetPct == null ? 15 + Math.random() * 70 : offsetPct;
      paw.style.setProperty("--paw-offset", pct + "%");
      void paw.offsetWidth; // commit the hidden state instantly, unanimated
      paw.style.transition = ""; // restore the CSS transition for the slide

      requestAnimationFrame(() => {
        paw.classList.add("is-active");
        const waveTimer = setTimeout(() => paw.classList.add("is-waving"), 450);
        const leaveTimer = setTimeout(() => {
          paw.classList.remove("is-active", "is-waving");
          setTimeout(() => { busy = false; }, 800);
        }, holdMs);
        // Stash timers on the element in case a future change needs to
        // cancel an in-flight sequence (not used yet, cheap insurance).
        paw._timers = [waveTimer, leaveTimer];
      });
    }

    function scheduleIdleWave() {
      const delay = 20000 + Math.random() * 25000; // 20–45s
      setTimeout(() => {
        const edges = ["top", "bottom", "left", "right"];
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
      // Reach in roughly level with the cursor, so it reads as "chasing" it.
      const offsetPct = Math.max(15, Math.min(85, (e.clientY / window.innerHeight) * 100));
      play(edge, 1800, offsetPct);
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

  /* ---------------- Snake (puzzles slot 3) ---------------- */
  /* Classic grid snake, rendered at a tiny logical resolution and scaled
     up crisp (image-rendering: pixelated) for a retro feel using the
     site's own palette rather than a generic green/black arcade look.
     Keyboard listener is bound to the canvas itself (not document), so
     playing never hijacks arrow-key page scrolling elsewhere. */

  (function initSnake() {
    const canvas = document.getElementById("snakeCanvas");
    const tile = document.getElementById("snakeTile");
    const overlay = document.getElementById("snakeOverlay");
    const overlayText = overlay ? overlay.querySelector(".snake-overlay-text") : null;
    const scoreEl = document.getElementById("snakeScore");
    if (!canvas || !tile) return;
    const ctx = canvas.getContext("2d");

    const COLS = 20;
    const ROWS = 15;
    const CELL = canvas.width / COLS;

    const rootStyle = getComputedStyle(document.documentElement);
    const inkColor = rootStyle.getPropertyValue("--ink").trim() || "#15150C";
    const bgColor = rootStyle.getPropertyValue("--bg").trim() || "#E7FB4E";
    const accentColor = rootStyle.getPropertyValue("--accent").trim() || "#F47568";

    let snake, dir, nextDir, food, score, tickTimer, running;

    function placeFood() {
      let cell;
      do {
        cell = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
      } while (snake.some((s) => s.x === cell.x && s.y === cell.y));
      food = cell;
    }

    function reset() {
      snake = [
        { x: 9, y: 7 },
        { x: 8, y: 7 },
        { x: 7, y: 7 },
      ];
      dir = { x: 1, y: 0 };
      nextDir = dir;
      score = 0;
      if (scoreEl) scoreEl.textContent = "0";
      placeFood();
    }

    function draw() {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = accentColor;
      ctx.fillRect(food.x * CELL, food.y * CELL, CELL, CELL);
      ctx.fillStyle = inkColor;
      snake.forEach((seg) => ctx.fillRect(seg.x * CELL, seg.y * CELL, CELL, CELL));
    }

    function stop(message) {
      running = false;
      clearInterval(tickTimer);
      tile.classList.remove("is-playing");
      if (overlayText) overlayText.textContent = message;
    }

    function tick() {
      dir = nextDir;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      const hitWall = head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS;
      const hitSelf = snake.some((s) => s.x === head.x && s.y === head.y);
      if (hitWall || hitSelf) {
        stop(`Scored ${score} — the safari's snake is unbothered. Click or press a key to try again.`);
        return;
      }
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score += 1;
        if (scoreEl) scoreEl.textContent = String(score);
        placeFood();
      } else {
        snake.pop();
      }
      draw();
    }

    function start() {
      if (running) return;
      reset();
      running = true;
      tile.classList.add("is-playing");
      draw();
      tickTimer = setInterval(tick, 130);
    }

    const keyMap = {
      ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 }, W: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 }, S: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 }, A: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 }, D: { x: 1, y: 0 },
    };

    canvas.addEventListener("keydown", (e) => {
      const wanted = keyMap[e.key];
      if (!wanted) return;
      e.preventDefault();
      if (!running) {
        start();
        return;
      }
      // Never allow a direct reversal into the snake's own neck.
      if (wanted.x === -dir.x && wanted.y === -dir.y) return;
      nextDir = wanted;
    });
    canvas.addEventListener("click", () => {
      canvas.focus();
      if (!running) start();
    });

    // Paint an idle frame immediately so the tile is never a blank canvas.
    reset();
    draw();
  })();
})();
