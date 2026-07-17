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
- **Corner style:** 4px radius (`--rounded-sm`), with a torn/stamped top edge via `clip-path` polygon in the page's background color. Every card-family surface — article cards, ad-tiles, the placeholder note, the ad-popup — shares this same 4px radius; none deviate.
- **Background:** cream paper.
- **Border:** 2px solid ink (3px for the ad-popup, signaling its higher stacking priority).
- **Shadow strategy:** none on the base card — the torn edge and border carry the depth; see Elevation.
- **Internal padding:** `32px 26px 26px` (extra top clearance for the torn-edge overlay).

### Navigation
- **Style:** a sticky horizontal tab bar (`position: sticky; top: 0`) directly under the masthead, cream background, ink bottom border, one bordered box per section. Matches the segmented nav strip in the studio's Layout 2.pdf and screenshot reference — replaces an earlier floating vertical pill rail.
- **States:** links sit at 65% opacity by default, 90% on hover, and switch to solid coral background + cream text when their section is active (scroll-tracked via IntersectionObserver). Ad-break sections are included as jumpable tabs but excluded from the "active" highlight styling choice — none, they behave like any other tab.
- **Overflow:** the tab list scrolls horizontally (`overflow-x: auto`, scrollbar hidden) rather than switching to a different mobile pattern — same component at every width.
- **Trailing element:** a decorative, currently-inert search icon button, matching the reference's search affordance. Not wired to real search yet.
- **Brand strip:** `.tabbar-brand`, a bordered slot stuck to the left edge of the tab bar showing `totw-wordmark.svg` at a small fixed height (16px), a link back to `#front-page`. Keeps the brand present at all scroll depths without repeating the full masthead. Included in the same active-tab/scroll-target JS as the section links.

### Crest + Wordmark (masthead/footer logo lockup)
- The header shows `totw-logo-header.svg` (the studio's correct combined crest + wordmark artwork) plus two small ink-filled circular "eyes" absolutely positioned into the crest's empty eye sockets. The footer shows `totw-footer-no-eyes.svg` — a variant of the crest with no eye cutouts at all, not paired with any eye-tracking dots.
- **Eye-tracking is header-only.** Earlier the footer also carried a tracking-eye pair, but the footer crest asset's own eye sockets sit in a different position than the header's, so the shared eye coordinates overlapped the footer illustration incorrectly. Rather than maintain a second calibrated coordinate set for a footer that doesn't need the gag, eye-tracking was dropped there entirely in favor of the no-eyes asset. Header eye-tracking (`main.js`, `initCrestEyes`) is unchanged: subtle cursor parallax, clamped to a small radius, skipped under `prefers-reduced-motion`.
- **Positioning is coordinate-derived, not eyeballed:** socket centers for the header were calibrated against `totw-logo-header.svg`'s own viewBox via iterative visual testing (a grid-overlay test page, since eyeballing this particular asset's socket coordinates from the file alone was unreliable) and stored as percentages, so the dots land exactly in the circular openings rather than an approximation.
- `totw-wordmark.svg` also appears standalone in the tab bar's brand strip — see Navigation above.

### Front-page hero
The lead section breaks out of the standard content column entirely (`.issue-section.front-page { max-width: none }`) to run a full-bleed media slot (`.media-slot--hero-full`, up to 600px tall) edge-to-edge, with the headline card (`.hero-card`) overlapping its bottom edge (`margin-top: -64px`) rather than sitting in the normal document flow below it — a deliberately more editorial, "grandiose" treatment than the standard card-in-column layout every other section uses, per direction to make the landing moment the strongest single beat on the page. Body copy and the eyebrow stay constrained to the normal 872px column above and below the full-bleed break so the rest of the section still reads as part of the same paper.

### Section headers
Every section's eyebrow + title stack vertically instead of sharing one line: the paw-icon eyebrow (`.eyebrow--tag`, "Section") sits above the italic section title (`.section-title`), separated by a 3px ink rule below the pair. Sections no longer collapse — an earlier accordion pattern (`<details>`/`<summary>`, one section open at a time) was removed; every section is always fully open. It added a click-to-expand step that didn't earn its cost once the page's actual length and content were in front of a real reader — flat, always-visible sections read better for a document meant to be skimmed top to bottom.

### Wild Moodcast (illustrated map)
Supersedes the earlier interim text-list version. `moodcast-map.svg` renders as a full illustrated park map; eight `.moodcast-pin` buttons are absolutely positioned over it by percentage coordinates (hand-placed to match each animal's rough habitat location on the map art), each showing `mooncast-pin.svg` as the pin icon. On hover (or `:focus-visible`, or a tap-to-toggle on touch devices via `main.js`) a tooltip card fades in above the pin: a circular portrait (`moodcast-holder.svg` frame + a per-animal face SVG) plus the animal's name and mood line. Hover was chosen over click-to-open as the primary interaction specifically so the reader never has to click to close one pin before opening the next — moving the cursor away is enough.
- **Known gap:** three animals in the mood copy (Gibbons, Sand Gazelles, Komodo Dragons) have no dedicated portrait art yet, so they're folded into a plain supplementary text note below the map rather than given broken/placeholder pins.
- **Known simplification:** each face SVG's position within its holder frame (`.moodcast-face`, `left: 50%; top: 58%`) is a visual estimate, not pixel-calibrated per animal the way the header crest eyes were — revisit if any face reads as noticeably off-center once real content review happens.

### Paw trinket
A small recurring animation (`#pawTrinket`, `paw.png`) that periodically slides in from a screen edge, waves, and leaves — the "mess with the user" gag. Two independent triggers, both gated behind `prefers-reduced-motion` and a shared `busy` lock so they never overlap:
- **Idle wander:** fires on a randomized 20–45s timer from a random edge (bottom/left/right), regardless of cursor activity.
- **Edge chase:** when the cursor lingers within 64px of the left or right viewport edge, there's a 65% chance (and a 20s cooldown after any trigger, hit or miss) of the paw reaching in from that side — enough to feel alive without becoming a constant, annoying reflex.
- All edges use the same vertical paw orientation deliberately; per-edge rotation was considered and skipped as unnecessary complexity for a gag this brief.

### Media placeholders
Temporary stand-ins until real photography/video arrives — see `media-placeholder` in the token block above for the fill color, which is a `color-mix()` of ink and chartreuse (not a new hue) so placeholders stay inside the existing palette.
- **`.media-slot--card`:** a plain quiet rectangle, "like a newspaper" — the default for regular article cards.
- **`.media-slot--blob`:** the quatrefoil clip-shape, reserved for a handful of featured/hero spots only (the front-page lead, and one card each in Park Affairs and Fashion at time of writing) — not applied to every image.
- **Blob shape family:** `blob-1` traces the studio's `clipping-mask-1.svg` path exactly (normalized to `objectBoundingBox` units so it scales with any element size). `blob-2`/`blob-3` are generated variants in the same family (a 90° rotation, and a rotation + non-uniform stretch) for visual variety across hero spots without needing more hand-drawn assets. All three live as `<clipPath>` defs in `index.html`.
- **`.media-slot--avatar`:** a small circular variant used in the Wild Moodcast list, a lightweight nod to the reference's circular portrait treatment without the full custom illustrated map (noted below as a known simplification).

### Site footer
A real page footer (`<footer class="site-footer">`, sibling to `<main>`, distinct from the in-fiction "Fin." closing section): paw-print divider, italic "Welcome to The Wild Times" tagline, the studio's `social-icons.svg` row, a rule, the masthead eyebrow/credits repeated, and the footer crest lockup (`totw-footer-no-eyes.svg`, no eye-tracking — see Crest + Wordmark above).

### Registration marks
Small circular crosshair marks (⊕, simple inline SVG, not a studio asset) fixed to the four page corners at ~32% opacity — a print-crop-mark motif matching the reference screenshot. `position: fixed`, `pointer-events: none`, hidden below 640px. `.masthead-row` carries `padding: 0 28px` specifically so the corner-most masthead text (issue line, byline credits) never crowds these marks.

### Puzzles: Sudoku
A real, solvable 9×9 puzzle (`.sudoku-grid`, 81 `<input>` cells, given cells `readonly` + visually distinguished via `.given`), not a decorative mock. `main.js`'s `initSudoku` filters input to digits 1–9, auto-advances focus to the next editable cell on entry (and back on backspace-from-empty), flags a wrong digit in coral (`.is-conflict`) by checking it against a fixed embedded solution (never rendered, so it can't leak an answer), and reveals a "solved" note once every cell matches. Arrow keys move focus in-grid for keyboard players.

### Ad Break (signature component)
Full-width in-page sections styled as tabloid ads (QR-code placeholder, headline, fine print), which also trigger a full-screen popup version the first time they scroll into view — reinforcing the "intrusive ad" joke without leaving the page's fiction.

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
- **Don't** use magenta or hot pink anywhere — the earlier `#FF14D6` placeholder was a mistake, not a brand color.
- **Don't** add soft or blurred `box-shadow` values; this system is flat and cut-paper, zero-blur only.
- **Don't** add a second overshoot/bounce easing anywhere else in the system — the ad-popup entrance is the one deliberate exception, not a precedent.
- **Don't** let the satirical tone turn mean-spirited — jokes land on gentle absurdity, never on mockery.
- **Don't** read as a generic corporate brochure or templated AI pitch deck — the point is that it feels like a real, lived-in publication.
- **Don't** ship placeholder-feeling sections (Classifieds) as if finished; either complete them or keep the honest "coming soon"/mock framing. The sudoku is a real, solvable puzzle now — don't regress it back to static digits.
- **Don't** render the sudoku's solution digits anywhere in markup, JS-visible text, or a debug affordance — conflict/completion checks compare silently against the embedded solution string so the answer can't be inspected by a curious reader.
- **Don't** set `overflow-x: hidden` (or any single-axis non-`visible` overflow) on `html` or `body`. On a regular element this is a normal clipping technique; on the *root* element it can propagate to the viewport's native scrolling mechanism instead of behaving like a normal box, and was confirmed in this project's own testing to disable scrolling outright — not just the axis it was meant to clip. If something needs horizontal-bleed clipping, scope `overflow: hidden` to that element itself (the ticker already does this correctly).
- **Don't** rely on `scroll-behavior: smooth` (CSS) or `behavior: "smooth"` (JS) as the only path to a scroll completing. Both were confirmed to silently stall mid-animation in at least one real environment during this project's testing. Any programmatic scroll a user depends on (like nav click-to-jump) needs a fallback that checks whether the scroll actually reached its target after a grace period and snaps instantly if not — see the tab-bar click handler in `main.js`.
- **Don't** use CSS `mask-image` with a `radial-gradient` for decorative edge effects (e.g. a scalloped/stamped border) — confirmed to hang the renderer entirely in this project's testing. The shipped torn-edge card treatment uses `clip-path: polygon()` instead, which is visually similar and had no such issue.
