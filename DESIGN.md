---
name: Times of the Wild
description: Satirical wildlife-newspaper pitch microsite for Dubai Safari Park's season opening.
colors:
  acid-chartreuse: "#E7FB4E"
  chartreuse-dim: "#D8ED45"
  brand-coral: "#F47568"
  near-black-ink: "#15150C"
  cream-paper: "#FBF6E4"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, Times New Roman, serif"
    fontSize: "clamp(3rem, 10vw, 6.75rem)"
    fontStyle: italic
    fontWeight: 400
    lineHeight: 0.95
  headline:
    fontFamily: "Instrument Serif, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.5rem, 3vw, 2rem)"
    fontStyle: normal
    fontWeight: 400
    lineHeight: 1.08
  title:
    fontFamily: "Instrument Serif, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.06rem, 2vw, 1.31rem)"
    fontStyle: italic
    fontWeight: 400
  body:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.14em"
  label-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 700
  body-dense:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  accent-display:
    fontFamily: "Instrument Serif, Georgia, Times New Roman, serif"
    fontSize: "clamp(18px, 2.4vw, 26px)"
    fontWeight: 400
  caption:
    fontFamily: "-apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
rounded:
  sm: "4px"
  lg: "16px"
  pill: "999px"
  full: "50%"
  device: "36px"
spacing:
  xs: "8px"
  sm: "18px"
  md: "24px"
  lg: "36px"
  xl: "64px"
components:
  nav-link-active:
    backgroundColor: "{colors.brand-coral}"
    textColor: "{colors.cream-paper}"
    padding: "0 16px"
  card-primary:
    backgroundColor: "{colors.cream-paper}"
    textColor: "{colors.near-black-ink}"
    rounded: "{rounded.sm}"
    padding: "32px 26px 26px"
  popup-close:
    backgroundColor: "{colors.brand-coral}"
    rounded: "{rounded.full}"
    width: "44px"
    height: "44px"
  media-placeholder:
    backgroundColor: "color-mix(in srgb, {colors.near-black-ink} 42%, {colors.acid-chartreuse} 58%)"
    iconColor: "{colors.cream-paper}"
---

# Design System: Times of the Wild

## 1. Overview

**Creative North Star: "The Acid-Ink Gazette"**

An acid-chartreuse field, near-black ink, and a cream stamped-card system dressed up as a real tabloid newspaper — because the pitch works by being the finished artifact, not describing one. Every surface commits to the bit: torn card edges, a scrolling breaking-news ticker, in-fiction ad breaks with a close button that dodges the cursor. The system rejects anything that reads as a generic pitch deck or corporate brochure; it has to feel lived-in, like Edition 01 of a publication that's been running for years.

The palette is drawn from Dubai Safari Park's real brand deck (a 13-hue Pantone system built around the binoculars mark), not invented for this piece. The one exception the code itself flagged as unresolved — a hot-magenta accent — has been replaced with brand coral, sourced from the deck's flagship key visual. The body serif (currently Georgia) remains an open placeholder pending a second typeface decision.

**Key Characteristics:**
- Full-bleed acid chartreuse as the hero field, not a neutral backdrop
- Cream, ink-bordered "stamped" cards with a torn top edge (clip-path zigzag)
- Flat, zero-blur, hard-offset shadows only — nothing soft or glowing
- Instrument Serif italic reserved for the meta-voice; roman for reported news
- A satirical, affectionate voice: jokes land on gentle absurdity, never mockery

## 2. Colors

A single saturated field carries the page; ink and cream do the structural work; coral is the only color allowed to mean "interactive."

### Primary
- **Acid Chartreuse** (`#E7FB4E`): the full-bleed body background and hero field. Covers the majority of every viewport. A deliberately digital, neon-brighter pop rather than a literal Pantone match — this piece's own hero hue within the brand's "one saturated field per execution" pattern (the real deck rotates coral, yellow, red, pale blue per asset).
- **Chartreuse Dim** (`#D8ED45`): a half-step darker sibling of Primary, used only for recessed strips — currently the breaking-news ticker background.

### Tertiary
- **Brand Coral** (`#F47568`): the sole interactive accent, sourced directly from the real DSP campaign key visual ("This afterparty has a dress code"). Used for the active nav-rail link and the ad-popup close button. Nowhere else.

### Neutral
- **Near-Black Ink** (`#15150C`): all text, borders, dividers, and the dark surfaces of the nav toggle and phone-mock device chrome.
- **Cream Paper** (`#FBF6E4`): the surface color for every card, ad-tile, and the rail-list flyout — the "paper" the ink sits on.

### Named Rules
**The One Accent Rule.** Coral is the only color in the system allowed to signal interactivity. It never appears in body copy, as a second background, or anywhere decorative — only the active nav link and the popup close button.

**The No-Magenta Rule.** The hot-magenta placeholder (`#FF14D6`) that shipped in early CSS was a mistake, not a brand color. It must not reappear anywhere in this system.

## 3. Typography

**Display Font:** Instrument Serif (with Georgia, Times New Roman fallback)
**Body Font:** Georgia (with Times New Roman fallback) — **placeholder**, pending a final second-typeface decision
**Label Font:** System sans (-apple-system, BlinkMacSystemFont, Helvetica Neue, Arial)

**Character:** A warm, italic-leaning display serif carries the editorial "voice" of the paper; a plain system sans handles utility (bylines, nav, the ticker) the way real newspaper mastheads mix a display face with wire-service type.

### Hierarchy
- **Display** (400, `clamp(48px, 10vw, 108px)`, line-height 0.95, italic): the masthead title only — "Times of the Wild."
- **Headline** (400, `clamp(24px, 3vw, 32px)`, line-height 1.08, roman): every reported article headline. Hero variant scales up to `clamp(34px, 5.2vw, 56px)` for the front-page lead.
- **Title / Dek** (400, `clamp(17px, 2vw, 21px)`, italic): the sub-headline under every headline and every section title — the paper's own commentary voice.
- **Body** (400, 16px, line-height 1.55, Georgia): article paragraphs, capped via two-column layout (`.body-cols`) so no line runs unreasonably long.
- **Body Dense** (400, 15px, line-height 1.55, Georgia): the same voice at a tighter size for card and list contexts (article-deck cards, the Wild Moodcast list) where space is tighter than the main two-column body.
- **Label** (700, 12px, 0.14em tracked, uppercase, system sans): eyebrows.
- **Label Small** (700, 13px, system sans): bylines, nav-rail links, the ticker, and the closing credits line — one step up from Label, untracked, used where the eyebrow's full uppercase treatment would be too loud.
- **Accent Display** (400, `clamp(18px, 2.4vw, 26px)`, Instrument Serif): small in-fiction display moments that don't carry a full Headline's weight — the comic-strip panel caption, ad-tile headlines, the ad-popup headline.
- **Caption** (400, 14px, system sans): tertiary supporting text — ad-tile body copy, the placeholder-note, the ad-popup body copy.

### Named Rules
**The Roman/Italic Split Rule.** Instrument Serif italic is reserved for the meta-voice — masthead, deks, section titles, the closing "Fin." mark. Reported headlines always stay roman. The split is how a reader unconsciously tells "this is news" from "this is the paper talking to you."

## 4. Elevation

Flat, cut-paper, stamped-zine. No blur ever appears in a shadow; depth is conveyed through hard, zero-radius offset shadows in solid ink, plus a torn/stamped top edge on cards (a `clip-path` zigzag, not a shadow at all). Most cards carry no shadow — their depth comes from the 2px ink border and the torn edge; shadows are reserved for the two elements that need to feel like they're sitting above the page.

### Shadow Vocabulary
- **Rail-list offset** (`box-shadow: 4px 4px 0 var(--ink)`): the flyout nav menu, giving it a stamped, cut-out feel.
- **Popup offset** (`box-shadow: 8px 8px 0 var(--ink)`): the ad-break modal, a heavier double-strength version signaling it's the most "on top" element on the page.

### Named Rules
**The No-Blur Rule.** Every shadow in this system is a hard-edged, zero-blur offset in solid ink. A soft or blurred shadow reads as generic-SaaS and is forbidden.

**The One Overshoot Exception.** The ad-popup entrance (`cubic-bezier(.2,1.4,.4,1)`) is the single named exception to the site's no-bounce motion rule: a deliberate, slightly-too-eager pop, satirizing cheap intrusive ad design. It is the only overshoot easing allowed anywhere in the system — every other transition uses standard ease-out. Under `prefers-reduced-motion`, it falls back to a plain 0.2s fade.

## 5. Components

### Buttons
- **Shape:** perfect circle (`50%`) for the popup close button.
- **Popup close:** coral circle, cream icon, `44px × 44px` (touch target minimum), positioned to overhang the popup's top-right corner. Its signature behavior: it dodges the cursor (random ±46px translate) up to twice before allowing a click — a satirical gag, the "ad" literally resisting dismissal.

### Cards / Containers
- **Corner style:** 4px radius (`--rounded-sm`). The torn/stamped zigzag top edge (`clip-path` polygon) that used to run along every card was removed per feedback — it read as a rendering glitch rather than a deliberate mark. Depth now comes from the border alone.
- **Background:** cream paper.
- **Border:** 2px solid ink (3px for the ad-popup, signaling its higher stacking priority).
- **Shadow strategy:** none on the base card — the border alone carries the depth; see Elevation.
- **Internal padding:** `26px` uniform (no longer needs the old torn-edge top clearance).

### Article pager
Each content section shows one full-width article at a time instead of a horizontally-scrollable row of fixed-width cards — for presentation, a single focal piece per section reads better than a shelf to browse. `.card-pager-track` holds every article at `flex: 0 0 100%`; `main.js` slides the track via `transform: translateX()` in response to prev/next arrow clicks (`.card-pager-controls`), clamped at both ends (no wrap-around) with a "N / total" counter. Every article across every section is fully written (sourced from the studio's `Times Of The Wild.pdf` — verified against all 37 pages, every source article is present; there are no additional ones to add).
- **`overflow: hidden` lives on the static `.card-pager`, never on the moving `.card-pager-track`.** The track is what carries the slide `transform`, and a transform drags the element's own overflow clip along with it — so clipping on the track hid cards 2+ entirely (paging just slid card 1 off into blank space, exactly the "cards don't come on screen" bug). The static pager gives a fixed viewport the track slides behind.
- **Track height is JS-synced to the *current* card** (`align-items: flex-start` + a measured `height`), so a short article doesn't inherit the tallest card's height and leave a big gap ("lots of space after the article" in Art & Design) — and, because the height is set to the active card's own height, the active (tall) card is **never cropped** by a shorter sibling.
- **The active card is marked `.is-featured`** (and a `pagerchange` event fires) so the video layer only ever plays the on-screen card's video, never a hidden sibling's.

### Navigation
- **Style:** a sticky horizontal tab bar (`position: sticky; top: 0`) directly under the masthead, cream background, ink bottom border, one bordered box per section. Matches the segmented nav strip in the studio's Layout 2.pdf and screenshot reference — replaces an earlier floating vertical pill rail.
- **Even-width tabs, no gaps:** each `<li>` is `flex: 1 1 auto` so the section tabs grow to fill the whole bar edge-to-edge with no leftover space, and each `<a>` fills its `<li>` (centered text) so the hover/active background covers the whole cell — no "color-cut" strip left uncovered. Ad-break sections are no longer in the nav.
- **States:** links sit at 65% opacity by default, full opacity + `--bg-dim` background on hover, and solid coral background + cream text when their section is active (scroll-tracked). The active-section highlight uses IntersectionObserver, which is fine as a progressive enhancement.
- **Brand strip appears on scroll only:** `.tabbar-brand` (the `totw-wordmark.svg`, link back to `#front-page`) is hidden at the top of the page (`max-width: 0; opacity: 0`) because the full masthead crest+wordmark is already on screen there — showing it in the bar too is redundant. Once the masthead scrolls behind the sticky bar, `main.js` adds `.tabbar.is-scrolled` and it slides in. The reveal `max-width` is generous (180px vs the ~109px content) so the wordmark is never clipped. **The scroll trigger is a plain `scroll` listener running the check directly** (a scrollY-vs-masthead-bottom comparison), not IntersectionObserver and not rAF-throttled — the work is trivial and this avoids stalling if rAF/IO are starved.
- **Link type is 10.5px**, tighter 10px horizontal padding and 0.03em tracking, so all section tabs fit; the 0.65-opacity contrast (5.5:1) is unaffected by size below the WCAG large-text threshold.
- **Trailing element:** a decorative, currently-inert search icon button.

### Crest + Wordmark (masthead/footer logo lockup)
- The header shows `totw-logo-header.svg` (the studio's correct combined crest + wordmark artwork) plus two small ink-filled circular "eyes" absolutely positioned into the crest's empty eye sockets. The footer shows `totw-footer-no-eyes.svg` — a variant of the crest with no eye cutouts at all, not paired with any eye-tracking dots.
- **Eye-tracking is header-only.** Earlier the footer also carried a tracking-eye pair, but the footer crest asset's own eye sockets sit in a different position than the header's, so the shared eye coordinates overlapped the footer illustration incorrectly. Rather than maintain a second calibrated coordinate set for a footer that doesn't need the gag, eye-tracking was dropped there entirely in favor of the no-eyes asset. Header eye-tracking (`main.js`, `initCrestEyes`) is unchanged: subtle cursor parallax, clamped to a small radius, skipped under `prefers-reduced-motion`.
- **Positioning is coordinate-derived, not eyeballed:** socket centers for the header were calibrated against `totw-logo-header.svg`'s own viewBox via iterative visual testing (a grid-overlay test page, since eyeballing this particular asset's socket coordinates from the file alone was unreliable) and stored as percentages, so the dots land exactly in the circular openings rather than an approximation.
- `totw-wordmark.svg` also appears standalone in the tab bar's brand strip — see Navigation above.
- **Eye-tracking only runs while the header is actually in view.** `initCrestEyes` skips (and resets to neutral) whenever the crest's `getBoundingClientRect()` is well outside the viewport. Without this, once the page is scrolled past the header the crest's rect sits far off-screen while the pointer stays viewport-bound, so the direction math is dominated by that huge fixed offset — the eyes read as "stuck" pointing mostly one way (barely responsive to the cursor) until scrolled back near the top. A `scroll` listener (in addition to `pointermove`) keeps this reset prompt rather than waiting for the next mouse move.

### Front-page hero
The lead section breaks out of the standard content column entirely (`.issue-section.front-page { max-width: none; padding-top: 0 }`) to run a full-bleed media slot (`.media-slot--hero-full`, up to 600px tall) edge-to-edge starting immediately under the sticky nav — no gap. The headline card (`.hero-card`) overlaps the image's bottom edge (`margin-top: -64px`) rather than sitting in the normal document flow below it — a deliberately more editorial, "grandiose" treatment than the standard card-in-column layout every other section uses. The card itself is centered on the page (`.hero-card-wrap` is a `display:flex; justify-content:center` container, not a left-hugging block) and its text — the "Front Page" eyebrow, headline, dek, byline — is center-aligned; the eyebrow lives inside the card now, directly above the headline, rather than as a separate line above the whole hero. Body copy stays constrained to the normal 872px column below the full-bleed break so the rest of the section still reads as part of the same paper.

### Section headers
Every section's eyebrow + title stack vertically instead of sharing one line: the paw-icon eyebrow (`.eyebrow--tag`, "Section") sits above the italic section title (`.section-title`), separated by a 3px ink rule below the pair. Sections no longer collapse — an earlier accordion pattern (`<details>`/`<summary>`, one section open at a time) was removed; every section is always fully open. It added a click-to-expand step that didn't earn its cost once the page's actual length and content were in front of a real reader — flat, always-visible sections read better for a document meant to be skimmed top to bottom.

### Wild Moodcast (illustrated map)
Supersedes the earlier interim text-list version. `moodcast-map.svg` renders as a full illustrated park map; eight `.moodcast-pin` buttons are absolutely positioned over it by percentage coordinates, each showing `mooncast-pin.svg` as the pin icon. On hover (or `:focus-visible`, or a tap-to-toggle on touch devices via `main.js`) a tooltip card fades in above the pin: a circular portrait (`moodcast-holder.svg` frame + a per-animal face SVG) plus the animal's name and mood line. Hover was chosen over click-to-open as the primary interaction specifically so the reader never has to click to close one pin before opening the next — moving the cursor away is enough.
- **Pin coordinates are landmark-calibrated, not eyeballed.** Positions were read off a percentage-grid overlay laid over the actual map art (the same technique used for the header crest eyes) and placed on a distinct visible clearing/landmark per animal — e.g. the Red-Crowned Cranes pin sits on the map's temple/pavilion cluster, Arabian Wolves on a circular walled clearing, Pygmy Hippos and Mandarin Ducks on the map's one wetland/marsh zone. Not every one of the 8 has an obviously "correct" enclosure in the art (it's a hand-drawn scene, not a zoo blueprint with per-species markers), so this is a best-fit reading of the map, not a guaranteed 1:1 mapping.
- **A tapped-open tooltip (`.is-open`, the touch fallback) is closed by hovering a different pin**, not just by tapping elsewhere. Without this, `:hover` (mouse) and `.is-open` (tap) were independent triggers — tapping one pin then hovering another with a mouse could leave two tooltip cards visible and overlapping at once.
- **Face-in-holder sizing uses `left/top: 50%` + a per-animal `width` + `transform: translate()`**, not `object-fit`/`object-position`. Two earlier passes both got this wrong. The first measured each face's content bounding box in a normalized square canvas, which doesn't match how `object-fit: cover` actually crops (by the image's own real aspect ratio) — the crane's portrait cropped to nothing. The second re-measured correctly but still used `object-position` to try to center the content, on the assumption that `object-position: X% Y%` means "align image point (X,Y) with the box center" — it doesn't. Per spec it's a pan slider identical to `background-position` (0% = content's edge flush with the box, 50% = centered, 100% = the opposite edge flush), so setting it to the content's own coordinates just panned toward whichever corner the content happened to sit in — wolf, ostrich, crane and oryx all rendered as a tiny fragment in one corner of the circle. The fix drops `object-fit`/`object-position` entirely: `left: 50%; top: 50%` puts the image's top-left corner at the box's center, then `transform: translate(-Cx%, -Cy%)` (content center as a % of the image's own width/height) shifts the image by exactly that fraction of itself, landing the *content's* center — not the canvas's — on the box's center. Per-animal `width` (a zoom of roughly `110% / max(content width%, content height%)`) makes the drawn content, not the empty margin around it, reach the box edges. Every number comes from a canvas alpha-channel content-bbox scan of the real SVG.
- **The pin and tooltip clip circles are grid-calibrated against their own art, not eyeballed or radial-scanned.** `.moodcast-pin-face` (the small preview on the map pin) and `.moodcast-portrait-clip` (the tooltip portrait) each mask a circular crop over `mooncast-pin.svg` / `moodcast-holder.svg`. Earlier estimates for the pin (from a radial ray-cast) came out both undersized and offset ~7% too low, so the "filled" face only covered part of the pin's real white circle — visually reading as a tiny face floating in empty white space, exactly the reported bug. A labeled percentage-grid overlaid directly on each rendered asset (same technique as the crest eye sockets) gave precise values: pin circle `left:48.5%; top:39.5%; width:49%; height:41%`; holder circle `left:50%; top:58%; width:94%; height:84%`.

### Paw trinket
A small recurring animation (`#pawTrinket`, `paw.png`) that periodically slides in from a screen edge, waves, and leaves — the "mess with the user" gag. Two independent triggers, both gated behind `prefers-reduced-motion` and a shared `busy` lock so they never overlap:
- **Idle wander:** fires on a randomized 20–45s timer from a random edge (top/bottom/left/right), regardless of cursor activity.
- **Edge chase:** when the cursor lingers within 64px of the left or right viewport edge, there's a 65% chance (and a 20s cooldown after any trigger, hit or miss) of the paw reaching in from that side, roughly level with the cursor's Y position — enough to feel alive without becoming a constant, annoying reflex.
- **Entry position is randomized along each edge** (15–85% of that edge, via a `--paw-offset` custom property set per trigger), not fixed to the center — matches the "paws can enter from anywhere along an edge" reference rather than always the same spot.
- **Orientation is edge-specific, not uniform.** The source photo has its pad at the top of the frame and a raw/cropped end at the bottom. A `.paw-orient` wrapper (nested inside the slide-positioned `.paw-trinket`, outside the wave-animated `.paw-wave-inner`) rotates per edge — 0° bottom, 180° top, 90° left, -90° right — so the pad always leads into the page and the cropped end trails off past the screen edge, invisible, instead of showing a visible "cut" mid-page. Splitting orientation onto its own wrapper element (rather than combining it into the wave keyframes) means the two rotations compose independently instead of the wave animation overwriting the base orientation each cycle.

### Media (photo + scroll-driven video)
Real photography/video now fills the article media slots (matched to each article by filename in `assets/`). Every media surface uses the same plain `.media-slot--card` rectangle — the earlier quatrefoil `.media-slot--blob` shapes were dropped per direction ("not helping"), so the treatment is consistent everywhere.
- **`.media-slot--card`:** the single media rectangle for all article cards.
- **Video playback: hover for photo-paired slots, featured-autoplay for video-only** (`.media-slot--has-video`, `main.js`'s `initVideos`). Never more than one video plays at once. A slot with a still `.media-slot-photo` (img+video) plays **only on hover** — the photo is its resting state. A slot with no photo (`.media-slot--video-only`) has nothing to show at rest, so it **autoplays, but only while its card is `.is-featured`** (the one the pager currently has on screen) *and* actually in view — this featured-gate is what stops a hidden pager sibling's video from playing audibly-but-invisibly (the Fashion giraffe-hairstyle glitch). Sound is on; browsers block unmuted autoplay until a gesture, so video starts muted and the active one unmutes on the first click/tap/key; a per-slot corner **mute toggle** (injected by JS, on hover) lets the reader turn sound off/on. Scroll/hover/`pagerchange` all re-resolve which single video should run, timestamp-throttled (no rAF).
- **img+video vs video-only:** a slot with a still `.media-slot-photo` shows the photo at rest and fades the video in over it while playing; a slot with no photo is tagged `.media-slot--video-only` (JS strips its grey icon placeholder) and shows the video's own frame directly — used for Sports and other video-only articles.
- **`.media-slot--avatar`:** a small circular variant used in the Wild Moodcast list.
- **`media-placeholder` token** (a `color-mix()` of ink and chartreuse, not a new hue) still backs any slot awaiting real media.

### Classifieds
A back-page classifieds grid (`.classifieds-grid`, CSS multi-column flow like a real newspaper) of short, funny in-fiction ads (`.classified`: small-caps category kicker + serif body + coral contact line) written by extracting animals/running gags from the articles (flamingo selling its pink coat for crocodile tears, the ostrich denying the footprints, etc.). Contact lines rotate the real DSP details — `800 900`, `support@dubaisafari.ae`, `Al Warqa 5, Dubai, UAE`.

### Site footer
A real page footer (`<footer class="site-footer">`, sibling to `<main>`, distinct from the in-fiction "Fin." closing section): paw-print divider, italic "Welcome to The Wild Times" tagline, the studio's `social-icons.svg` row, a rule, the masthead eyebrow/credits repeated, and the footer crest lockup (`totw-footer-no-eyes.svg`, no eye-tracking — see Crest + Wordmark above).

### Registration marks
Small circular crosshair marks (⊕, simple inline SVG, not a studio asset) fixed to the four page corners at ~32% opacity — a print-crop-mark motif matching the reference screenshot. `position: fixed`, `pointer-events: none`, hidden below 640px. `.masthead-row` carries `padding: 0 28px` specifically so the corner-most masthead text (issue line, byline credits) never crowds these marks.

### Puzzles: Sudoku
A real, solvable 9×9 puzzle (`.sudoku-grid`, 81 `<input>` cells, given cells `readonly` + visually distinguished via `.given`), not a decorative mock. `main.js`'s `initSudoku` filters input to digits 1–9, auto-advances focus to the next editable cell on entry (and back on backspace-from-empty), flags a wrong digit in coral (`.is-conflict`) by checking it against a fixed embedded solution (never rendered, so it can't leak an answer), and reveals a "solved" note once every cell matches. Arrow keys move focus in-grid for keyboard players.

### Puzzles: Safari Snake (3rd puzzle tile)
A real, playable Snake game (`.puzzle-tile--snake`, `<canvas id="snakeCanvas">`, `main.js`'s `initSnake`) — replaces the old empty media-slot placeholder. Rendered on an ink field at a tiny 20×15-cell logical resolution and scaled up crisp via `image-rendering: pixelated` for a retro/pixel read, but using the brand palette rather than a generic arcade green-on-black: chartreuse board, ink snake, coral food. An idle frame paints immediately (never a blank canvas); click or any movement key starts it; a `.snake-overlay` shows the title/prompt and fades out (`.is-playing`) during play. Keyboard handling is bound to the **canvas element**, not `document`, so arrow keys only drive the game when it's focused and never hijack page scrolling. Direct reversals into the snake's own neck are rejected. On collision the overlay returns with a self-deprecating scoreboard line ("the safari's snake is unbothered") — the joke the user asked for: you're not meant to beat the house score. Honors the site's flat/no-blur/no-gradient rules; the HUD reuses the sans label styling.

### Ad Break (signature component) + side ads
Now built from the studio's finished ad creative rather than mocked tiles:
- **Ad-break sections** show a **single** full-width banner each (`.ad-banner`, the wide `ads-5hh`/`ads-6hh` images), one per section, under a quiet "Advertisement" kicker — the old two-tile QR-code mock layout was dropped.
- **Popups** still fire the first time an ad-break scrolls into view (the "intrusive ad" gag, close button that dodges the cursor), but show their **own** creative — the 16:9 `ads-3h`/`ads-4h` images — via each section's `data-popup-img`/`data-popup-alt`, so the section banner and the popup aren't the same image twice.
- **Side skyscraper ads** (`.side-ad`, the tall `ads-1v`/`ads-2v` images) are `position: fixed` in the left/right page gutters, shown only at ≥1360px where they clear the 920px content column, each with a dismiss button. Because they're vertically centred and fixed, they'd sit over the masthead/nav at the very top — so they're `opacity: 0; pointer-events: none` until `main.js` adds `.is-revealed` once the reader has scrolled past the front-page hero (opacity, not `visibility`, for the fade; a transitioned `visibility` would stay hidden for the whole fade).

## 6. Known simplifications

- **Wild Moodcast:** three animals referenced in the mood copy (Gibbons, Sand Gazelles, Komodo Dragons) have no dedicated portrait art, so they run as a plain text note below the map instead of a pin. Each portrait's face-within-holder position is a visual estimate, not pixel-calibrated per animal.
- **Paw trinket:** uses one vertical orientation for all three entry edges rather than per-edge rotation — a deliberate scope call, not an oversight.

## 7. Do's and Don'ts

### Do:
- **Do** keep every shadow a hard, zero-blur offset in ink (`4px 4px 0` or `8px 8px 0`) — never soft or glowing.
- **Do** reserve brand coral (`#F47568`) as the only interactive accent — the active nav tab and the popup close button, nothing else.
- **Do** keep Instrument Serif italic for the meta-voice only (masthead, deks, section titles, "Fin.", footer tagline); reported headlines stay roman.
- **Do** stay fully in-character across every section — ticker, ad breaks, bylines, credits, footer — nothing should read as an unfinished template.
- **Do** cap body copy at 65–75ch via the two-column layout.
- **Do** keep every interactive touch target at least 44×44px (tab-bar links, popup close).
- **Do** keep non-active nav links at opacity 0.65, not lower — 0.55 fails WCAG AA at this font size (3.99:1); 0.65 clears it at 5.5:1.
- **Do** put SVG `<clipPath>`/`<mask>` defs that are referenced via CSS `url(#id)` in their own zero-size (`width="0" height="0"; position:absolute`) SVG, never inside a `display:none` icon-sprite SVG — some engines won't resolve the reference into a `display:none` ancestor, silently dropping the clip/mask.
- **Do** keep placeholders honest (a fill color + a small icon), matching the media-placeholder token — never a bare gray box that reads as broken.
- **Do** keep every section always open — the accordion pattern was tried and removed; don't reintroduce a collapse/expand step on sections.

### Don't:
- **Don't** put `overflow: hidden` on an element that carries a `transform` and expect it to act as a clip window. A transform drags the element's own overflow box along with it, so it clips its *own* moving content, not a fixed viewport. A translateX carousel/pager needs the clip on the **static parent**, with the transformed track left un-clipped (this bug hid all but the first pager card — paging slid card 1 off into blank space; see `.card-pager`).
- **Don't** position a circular crop, an eye/pupil socket, or any other "must land inside this specific illustrated shape" coordinate by eyeballing the art, guessing from a viewBox ratio, or a radial ray-cast/flood-fill sample. Every one of those approaches produced a visibly-wrong result at least once in this project (crest eyes overlapping their sockets twice, the moodcast pin/holder circles under-sized and offset). The one technique that has reliably converged: overlay a labeled percentage grid directly on the *actual rendered* asset (a plain HTML file, red gridlines every 5%, numbers every 10%), read the shape's edges off the labeled lines, and verify by drawing a ring at the derived center/radius back over the art before shipping it.
- **Don't** use magenta or hot pink anywhere — the earlier `#FF14D6` placeholder was a mistake, not a brand color.
- **Don't** add soft or blurred `box-shadow` values; this system is flat and cut-paper, zero-blur only.
- **Don't** add a second overshoot/bounce easing anywhere else in the system — the ad-popup entrance is the one deliberate exception, not a precedent.
- **Don't** let the satirical tone turn mean-spirited — jokes land on gentle absurdity, never on mockery.
- **Don't** read as a generic corporate brochure or templated AI pitch deck — the point is that it feels like a real, lived-in publication.
- **Don't** ship placeholder-feeling sections (Classifieds) as if finished; either complete them or keep the honest "coming soon"/mock framing. The sudoku is a real, solvable puzzle now — don't regress it back to static digits.
- **Don't** render the sudoku's solution digits anywhere in markup, JS-visible text, or a debug affordance — conflict/completion checks compare silently against the embedded solution string so the answer can't be inspected by a curious reader.
- **Don't** set `overflow-x: hidden` (or any single-axis non-`visible` overflow) on `html` or `body`. On a regular element this is a normal clipping technique; on the *root* element it can propagate to the viewport's native scrolling mechanism instead of behaving like a normal box, and was confirmed in this project's own testing to disable scrolling outright — not just the axis it was meant to clip. If something needs horizontal-bleed clipping, scope `overflow: hidden` to that element itself (the ticker already does this correctly).
- **Don't** rely on `scroll-behavior: smooth` (CSS) or `behavior: "smooth"` (JS) as the only path to a scroll completing. Both were confirmed to silently stall mid-animation in at least one real environment during this project's testing. Any programmatic scroll a user depends on (like nav click-to-jump) needs a fallback that checks whether the scroll actually reached its target after a grace period and snaps instantly if not — see the tab-bar click handler in `main.js`.
- **Don't** use CSS `mask-image` with a `radial-gradient` for decorative edge effects (e.g. a scalloped/stamped border) — confirmed to hang the renderer entirely in this project's testing.
- **Don't** let a *transitioned* `transform` interpolate between two different axes when swapping an element's state. The paw trinket animates in via `transform: translate()` (single axis per edge: `translateX` for left/right, `translateY` for top/bottom). Because `transform` is transitioned, swapping edge classes while the transition is live made the browser interpolate e.g. `translateY(260)` → `translateX(260)` — a diagonal sweep in from the wrong side. Neither a plain reflow nor a double-rAF fixed it because the transition was never actually turned **off** during the swap. The fix that works: set `transition: none`, apply the new edge's hidden transform, force a reflow to commit it unanimated, then restore the transition and slide in on the next frame — so only that edge's own straight, single-axis motion ever animates (`play()` in `main.js`).
- **Don't** gate content visibility on a JS/observer-triggered reveal with no fallback. The `[data-reveal]` sections start at `opacity: 0` and get `.is-visible` from an IntersectionObserver — but in any renderer where IO doesn't fire (a throttled/background tab, a headless capture, prerender, some crawlers) the content would ship permanently blank. There's now a `window.load` + short-timeout safety net in `main.js` that reveals anything still hidden. The reveal animation is a nice-to-have; the content is not optional, so it must never depend solely on the observer firing.
- **Don't** assume `IntersectionObserver` or `requestAnimationFrame` will fire in every runtime. For load-bearing scroll behavior (the nav brand reveal, the scroll-driven video selection) prefer a plain `scroll` listener that reads `getBoundingClientRect`/`scrollY` directly, throttled with a timestamp rather than rAF — it's a couple of cheap reads and it can't stall if rAF/IO are starved (which they demonstrably can be). Reserve IO/rAF for pure enhancements (the active-tab highlight, the reveal animation) that are allowed to no-op.
- **Don't** use `object-position: X% Y%` expecting it to "center image point (X,Y) in the box." It's a pan slider (same formula as `background-position`: 0% = content's edge flush with the box, 50% = centered, 100% = the opposite edge flush) — setting it to a content-bbox's own coordinates just pans toward whichever corner that content sits in. To truly center a specific point of an image at the center of its box regardless of zoom, use `left: 50%; top: 50%; transform: translate(-Cx%, -Cy%)` instead (Cx/Cy = that point as a % of the image's own width/height) — see `.moodcast-face` in `styles.css`.
- **Don't** position a circular crop, an eye/pupil socket, or any other "must land inside this specific illustrated shape" coordinate by eyeballing the art, guessing from a viewBox ratio, reading a percentage-grid overlay by hand, or a single radial ray-cast/flood-fill sample from one seed point. Every one of those produced a visibly-wrong result at least once in this project. What actually converges: render the asset to a canvas and run connected-component analysis on the alpha channel within a tight search region — it finds the *exact* boundary of the real transparent hole (or, for a content bounding box, the real drawn pixels) with no human reading error, and two components of near-identical size/shape (e.g. a socket pair) cross-validate that you found the right one rather than a leak through a gap in the linework.
- **Don't** give an absolutely-positioned child a percentage `height` (or `width`) unless its containing block has a *definite* size. A `.moodcast-portrait`/`.moodcast-pin` with only a `width` and content-derived (`auto`) height made their `height: N%` children (the circular clip masks) size unpredictably — sometimes 0, sometimes wrong. Give the parent an explicit `aspect-ratio` matching its own art so descendant percentage heights have something real to resolve against.
