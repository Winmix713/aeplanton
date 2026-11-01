```index.tsx
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<App />);
}

```
```App.tsx
import React from 'react';
import { MotionConfig } from 'framer-motion';
import { GameScreen } from './components/game/GameScreen';
import { LanguageProvider } from './contexts/LanguageContext';

interface AppProps {
  /** Open on the title screen, or jump straight into a seeded Engineer · Jezero run. */
  startScreen?: 'title' | 'game';
  /** Start with the bottom mission-data drawer expanded. */
  drawerDefaultOpen?: boolean;
  /** Vibration feedback on supported devices. Independent of reduced motion. */
  hapticsEnabled?: boolean;
  /** Interface language on first visit. A choice made in-app is remembered on the device. */
  defaultLanguage?: 'en' | 'hu';
}

export function App({ startScreen = 'title', drawerDefaultOpen = false, hapticsEnabled = true, defaultLanguage = 'en' }: AppProps) {
  return (
    <LanguageProvider defaultLang={defaultLanguage}>
      <MotionConfig reducedMotion="user">
        <GameScreen startScreen={startScreen} drawerDefaultOpen={drawerDefaultOpen} hapticsEnabled={hapticsEnabled} />
      </MotionConfig>
    </LanguageProvider>
  );
}

```
```package.json
{
  "name": "magic-patterns-project",
  "private": true,
  "dependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-router-dom": "6.30.2",
    "lucide-react": "0.577.0",
    "framer-motion": "11.18.2",
    "@radix-ui/react-icons": "1.3.2",
    "date-fns": "4.1.0",
    "tailwind-merge": "2.6.1",
    "three": "0.169.0",
    "@types/three": "0.169.0"
  }
}

```
```index.css
/* @import url() FONT IMPORTS MUST ALWAYS BE AT THE VERY TOP OF THIS FILE, ABOVE THE TAILWIND IMPORTS — DO NOT DELETE THIS COMMENT */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300..700&display=swap');

/* CRITICAL: THE FOLLOWING TAILWIND IMPORTS MUST NEVER BE DELETED OR REORDERED — DO NOT DELETE THIS COMMENT */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* END TAILWIND IMPORTS — ALL OTHER CSS MUST GO BELOW THIS LINE */

:root {
  --bg: #0c0b0a;
  --inv: #161412;
  --ink: #f8f6f2;
  --ink-2: rgba(248, 246, 242, 0.85);
  --ink-3: rgba(248, 246, 242, 0.72);
  --ink-4: rgba(248, 246, 242, 0.55);
  --ink-5: rgba(248, 246, 242, 0.18);
  --line: rgba(255, 255, 255, 0.1);
  --line-2: rgba(255, 255, 255, 0.18);
  --fill-1: rgba(255, 255, 255, 0.05);
  --fill-2: rgba(255, 255, 255, 0.09);
  --fill-3: rgba(255, 255, 255, 0.16);
  --track: rgba(255, 255, 255, 0.18);
  --amber: #f5a857;
  --amber-2: rgba(245, 168, 87, 0.18);
  --amber-ink: #ffd9ae;
  --green: #92dcae;
  --green-2: rgba(146, 220, 174, 0.16);
  --blue: #9cc2f0;
  --blue-2: rgba(156, 194, 240, 0.16);
  --red: #ff7a6b;
  --glass-bg: linear-gradient(180deg, rgba(30, 28, 26, 0.76), rgba(17, 16, 15, 0.72));
  --edge: inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  --shadow-md: 0 1px 2px rgba(0, 0, 0, 0.18), 0 8px 24px -12px rgba(0, 0, 0, 0.5);
  /* radii: sm 7 · md 11 · lg 16 · xl 22 */
  --r-sm: 7px;
  --r-md: 11px;
  --r-lg: 16px;
  --r-xl: 22px;
  /* motion */
  --t-fast: 150ms;
  --t-hover: 200ms;
  --t-enter: 250ms;
  --t-exit: 140ms;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-exit: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
html,
body,
#root {
  min-height: 100%;
}
body {
  background: var(--bg);
  color: var(--ink);
  font-family: Inter, 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
  font-size: 14px;
  line-height: 1.55;
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1, 'cv11' 1;
  -webkit-font-smoothing: antialiased;
}
.glass {
  background: var(--glass-bg);
  border: 1px solid var(--line);
  box-shadow: var(--edge), 0 1px 2px rgba(0, 0, 0, 0.2), 0 12px 32px -12px rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(28px) saturate(140%) brightness(0.82);
  -webkit-backdrop-filter: blur(28px) saturate(140%) brightness(0.82);
}
.glass-strong {
  --glass-bg: linear-gradient(180deg, rgba(30, 28, 26, 0.94), rgba(16, 15, 14, 0.9));
}
/* Fluid type (responsive-design skill: clamp() with min/max bounds) */
.text-fluid-title {
  font-size: clamp(1.5rem, 1.1vw + 1.05rem, 1.875rem);
}
.text-fluid-display {
  font-size: clamp(1.75rem, 2.4vw + 1rem, 2.125rem);
}
.text-fluid-countdown {
  font-size: clamp(2.5rem, 5vw + 1rem, 3.5rem);
}
.scroll-quiet {
  scrollbar-width: none;
}
.scroll-quiet::-webkit-scrollbar {
  display: none;
}
/* Frosted light glass variant — accents unchanged */
[data-glass='light'] .glass {
  --glass-bg: linear-gradient(180deg, rgba(250, 246, 240, 0.78), rgba(236, 229, 220, 0.72));
  --ink: #1b1714;
  --ink-2: rgba(27, 23, 20, 0.85);
  --ink-3: rgba(27, 23, 20, 0.72);
  --ink-4: rgba(27, 23, 20, 0.58);
  --ink-5: rgba(27, 23, 20, 0.18);
  --line: rgba(27, 23, 20, 0.1);
  --line-2: rgba(27, 23, 20, 0.18);
  --fill-1: rgba(27, 23, 20, 0.04);
  --fill-2: rgba(27, 23, 20, 0.08);
  --fill-3: rgba(27, 23, 20, 0.13);
  --track: rgba(27, 23, 20, 0.16);
  --amber: #c9731f;
  --green: #2f8a57;
  --blue: #3a6fae;
  backdrop-filter: blur(28px) saturate(140%);
  -webkit-backdrop-filter: blur(28px) saturate(140%);
}
.hud-label {
  font-size: 10px;
  font-weight: 550;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--ink-4);
  line-height: 1.2;
}
.stage-text {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
}
.grain {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
  opacity: 0.35;
}
/* Stage frame: hairline edge fading from amber at the top, plus four amber corner brackets */
.hud-frame {
  border: 1px solid transparent;
  border-image: linear-gradient(180deg, rgba(245, 168, 87, 0.4), rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0.04)) 1;
}
.bracket {
  position: absolute;
  width: 22px;
  height: 22px;
  border: 0 solid var(--amber);
  opacity: 0.9;
}
.bracket-tl { top: 10px; left: 10px; border-top-width: 2px; border-left-width: 2px; border-top-left-radius: 8px; }
.bracket-tr { top: 10px; right: 10px; border-top-width: 2px; border-right-width: 2px; border-top-right-radius: 8px; }
.bracket-bl { bottom: 10px; left: 10px; border-bottom-width: 2px; border-left-width: 2px; border-bottom-left-radius: 8px; }
.bracket-br { bottom: 10px; right: 10px; border-bottom-width: 2px; border-right-width: 2px; border-bottom-right-radius: 8px; }
/* Bento cards */
.bento-card {
  background: var(--fill-1);
  border: 1px solid var(--line);
  box-shadow: var(--edge), var(--shadow-md);
}
.bento-card--interactive {
  position: relative;
  transition: transform var(--t-hover) var(--ease), border-color var(--t-hover) var(--ease), background-color var(--t-hover) var(--ease);
}
.bento-card--interactive:hover {
  transform: translateY(-4px);
  border-color: rgba(245, 168, 87, 0.32);
  background: var(--fill-2);
}
.bento-card--interactive:has(:focus-visible) {
  border-color: rgba(245, 168, 87, 0.6);
}
/* Hotspot ring pulse (looping "alive" signal) */
@keyframes hotspot-pulse {
  0% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(1.9); opacity: 0; }
}
.hotspot-pulse { animation: hotspot-pulse 1.6s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
@keyframes breathe {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.75); }
}
.breathe { animation: breathe 2s ease-in-out infinite; }
:focus-visible {
  outline: 2px solid var(--amber);
  outline-offset: 2px;
}
.hud-range {
  -webkit-appearance: none;
  appearance: none;
  height: 3px;
  border-radius: 9999px;
  outline-offset: 6px;
  cursor: pointer;
}
.hud-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 9999px;
  background: #f4f1ec;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  transition: transform 150ms var(--ease);
}
.hud-range::-webkit-slider-thumb:hover { transform: scale(1.12); }
.hud-range::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border: 0;
  border-radius: 9999px;
  background: #f4f1ec;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}
@media (prefers-reduced-motion: reduce) {
  .breathe { animation: none; }
  .hotspot-pulse { animation: none; opacity: 0; }
  .bento-card--interactive:hover { transform: none; }
  * { transition-duration: 1ms !important; }
}

```
```tailwind.config.js
export default {
  content: [
    './*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './utils/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: 'var(--bg)',
        inv: 'var(--inv)',
        ink: {
          DEFAULT: 'var(--ink)',
          2: 'var(--ink-2)',
          3: 'var(--ink-3)',
          4: 'var(--ink-4)',
          5: 'var(--ink-5)',
        },
        line: { DEFAULT: 'var(--line)', 2: 'var(--line-2)' },
        fill: { 1: 'var(--fill-1)', 2: 'var(--fill-2)', 3: 'var(--fill-3)' },
        track: 'var(--track)',
        amber: { DEFAULT: 'var(--amber)', soft: 'var(--amber-2)', ink: 'var(--amber-ink)' },
        green: { DEFAULT: 'var(--green)', soft: 'var(--green-2)' },
        blue: { DEFAULT: 'var(--blue)', soft: 'var(--blue-2)' },
        red: 'var(--red)',
      },
      fontFamily: {
        sans: ['Inter', '"SF Pro Text"', '-apple-system', 'BlinkMacSystemFont', '"Helvetica Neue"', 'sans-serif'],
      },
    },
  },
};

```
```docs/design-5.md
# Aether Planetary Ops — Design System (design.md)

An ultra-high-fidelity space mission HUD: a command console over a live 3D/terrain stage. Deep obsidian ground, frosted-glass panels, soft amber as the single action/attention color, tactical green for nominal state, Inter for everything. Calm, dense, readable at a glance.

**Principles**
1. **Stage first.** The terrain/vehicle view is the hero; all UI floats on it as glass and never fully hides it.
2. **One accent.** Amber = focus, action, "now". Green = nominal/complete. Blue = info/link. Red = fault only.
3. **Numbers never jump.** Tabular figures everywhere; fixed-width readouts.
4. **Quiet motion.** Every one-shot transition is under 300ms. Looping motion is limited to "alive" signals (pulse, route dash).
5. **Dense but ordered.** Telemetry lives in corners and rails; the center stays clear.

---

## 1. Color tokens

```css
:root {
  /* ink (surfaces & text) */
  --bg:        #0c0b0a;               /* obsidian */
  --inv:       #161412;               /* text on amber / inverted */
  --solid:     #f4f1ec;
  --ink:       #f8f6f2;               /* primary text */
  --ink-2:     rgba(248,246,242,.85);
  --ink-3:     rgba(248,246,242,.72);
  --ink-4:     rgba(248,246,242,.55); /* labels, captions */
  --ink-5:     rgba(248,246,242,.18); /* inactive bars */
  --line:      rgba(255,255,255,.10);
  --line-2:    rgba(255,255,255,.18);
  --fill-1:    rgba(255,255,255,.05);
  --fill-2:    rgba(255,255,255,.09); /* hover */
  --fill-3:    rgba(255,255,255,.16); /* active */
  --track:     rgba(255,255,255,.18); /* progress track */

  /* semantic accents */
  --amber:     #f5a857;  --amber-2: rgba(245,168,87,.18);  --amber-ink: #ffd9ae;
  --green:     #92dcae;  --green-2: rgba(146,220,174,.16);
  --blue:      #9cc2f0;  --blue-2:  rgba(156,194,240,.16);
  --red:       #ff7a6b;  /* faults / critical only */
}
```

| Role | Token | Use |
|---|---|---|
| Action / "now" / selected | `--amber` | Primary button, active dock item, progress fill, current objective, key readout |
| Nominal / complete / ready | `--green` | Status dots, completed objectives, "Nominal" |
| Info / link / transit | `--blue` | Link strength, navigation, transit vehicles |
| Warning | `--amber` + `--amber-ink` text | Caution states |
| Critical | `--red` | Faults, failed commands. Use sparingly |

Status levels map to classes: `lvl-nominal` (green), `lvl-info` (blue), `lvl-warn` (amber), `lvl-crit` (red).

Contrast: body text on glass must be `--ink-3` or brighter; `--ink-4` is for uppercase labels only.

---

## 2. Typography

**Family:** `"Inter var", "Inter Variable", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif`
**Features:** `font-variant-numeric: tabular-nums; font-feature-settings: 'tnum' 1, 'cv11' 1;` smoothing `antialiased`. Base 14px / 1.55.

| Style | Spec |
|---|---|
| Display | `clamp(34px, 5.2vw, 48px)` / 1.02, 600, −0.025em |
| Panel title (rover name) | 30px, 500, −0.02em |
| Card heading | 17px, 600, −0.015em |
| Body | 15px / 24px, `--ink-4`; card body 13px / 20px |
| Stat (big readout) | 30px, **300**, −0.02em; unit `small` 14px, 400, `--ink-3`, 4px left margin |
| Label | 10px, 550, uppercase, 0.14em tracking, `--ink-4` |
| Label-sm | 10px, 550, uppercase, 0.12em |
| Brand wordmark | 11px, 650, uppercase, 0.32em |
| Table row | 11.5px, label `--ink-3`, value 550 `--ink` |

Rule: large numbers are light (300), tiny labels are medium-heavy (550) and uppercase. This contrast is the signature.

---

## 3. Surfaces: glass & depth

```css
--glass:        linear-gradient(180deg, rgba(30,28,26,.76), rgba(17,16,15,.72));
--glass-strong: linear-gradient(180deg, rgba(30,28,26,.92), rgba(16,15,14,.88)); /* menus, modals, toasts */
--glass-blur:   blur(28px) saturate(140%) brightness(.82);
--edge:         inset 0 1px 0 rgba(255,255,255,.12), inset 0 0 0 1px rgba(255,255,255,.08);
```

`.glass` = glass gradient + 1px `--line` border + `--edge` inner highlight + `backdrop-filter: var(--glass-blur)` + `--r-lg`.

**Radii:** sm 7 · md 11 · lg 16 · xl 22 · pill 9999. Hero frame 24.
**Shadows:** layered "beautiful" stacks (`--shadow-md` for cards, `--shadow-lg` for the hero frame / overlays). Never a single heavy drop shadow.
**Texture:** page sections get a 135° hairline stripe (`rgba(255,255,255,.025)` every 72px) and a soft amber aurora (`radial-gradient(ellipse, rgba(245,168,87,.12), transparent 65%)`) behind the headline.
**Stage:** warm Martian gradient (`#4a2f22 → #94623f → #a87048`), film-grain overlay (`mix-blend-mode: overlay`, .55), and a vignette that darkens edges and top/bottom scrims so HUD text stays legible.
**Optional light variant:** "frosted light glass" toggle swaps `--glass*` and ink tokens; keep amber/green/blue unchanged.

---

## 4. Layout

Console is a fixed-height frame (720px desktop) over the stage, with absolutely positioned regions:

```
┌───────────────────────────────────────────────────────────────┐
│ BRAND │ Mission     [ ◖ Mission progress ━━━━ 58% 3/5 ◗ ]   Clock · UTC · Link · ☀ · 🔊 │  topbar
├──┬────────────────────────────────────────────────────┬──────┤
│N │ TL: identity + fleet / rover stats        stage     │ TR:  │
│A │                                                     │ map  │
│V │          (callouts / hotspots / vehicles)           │ obj. │
│  │ BL: environment + resources         BR: hints+camera│      │
│  │                  ┌──── command dock ────┐           │      │
└──┴──────────────────┴──────────────────────┴───────────┴──────┘
```

- **Frame:** 1px gradient border (amber 40% → white 10% → 4%), radius 24, four amber **corner brackets** (22px, 2px, radius 8, inset 10px).
- **Topbar** (top 14px, sides 22px): 3-col grid `1fr auto 1fr` — brand + mission left, progress pill center, clocks/toggles right.
- **Left nav rail:** vertical glass pill (radius 26), 38px round buttons, left 14px.
- **Corner regions:** TL (identity, fleet/rover stats, width 252), TR (site map, objectives, width 252), BL (environment strip + resources), BR (hints + camera dock). Gap between stacked panels: 12px.
- **Bottom dock:** centered, 6px padding, radius lg.
- **Below the frame:** 6-column bento grid, 16px gap, spans of 3 and 2.
- Page container: max-width 1280, section padding 96px 24px (64px 16px on tablet).

---

## 5. Components

### 5.1 Chips & health pills
Uppercase 10px/550, 0.1em tracking, padding 3×9, pill radius, 1px tinted border + tinted fill.
Variants: amber (default), `is-green`, `is-blue`, `is-plain`. Lead with a 6px `.dot` (`currentColor`).
**System health pill:** chip + dot + short status ("Navigating", "Ready", "Holding", "On target"). The dot **breathes** (2s) only while the system is active.

### 5.2 Buttons
- Height 44, padding 0 20, radius 12, 13px/550.
- **Primary:** amber fill, `--inv` text, amber border, inset top highlight + amber glow shadow.
- **Secondary:** `--fill-1`, `--line-2` border.
- Hover: lift −2px, brighten. Active: `scale(.97)`, 150ms.
- **Icon button:** 24px (32px large), radius sm, outlined `--line`. **Tool button:** 34px, borderless.
- Focus ring: 2px amber, 2px offset, on every interactive element.

### 5.3 Progress
**Linear (mission pill):** glass pill, label + 4px track (`--track`) + amber gradient fill (`--amber → #f2a24e`) + bold % + `n/5`. Width animates 250ms.
**Circular progress indicator (resources, subsystem health):**
- SVG ring, viewBox 48, r 20, stroke 3, `stroke-linecap: round`, rotated −90°.
- Track `--track`; arc `--amber` (default), `--green` when ≥ nominal threshold, `--red` when critical.
- Center: stat value (300 weight, 16–20px) with unit `small`; label below (uppercase label style).
- Animate `stroke-dashoffset` over 250ms `--ease`. Optional end-cap dot glows at the arc head.
**Resource bar (compact alternative):** 3px track with ink or amber fill, under a stat + sub-line.

### 5.4 Telemetry strips
- **Stat:** label (top) → big light number + unit → optional sub-line (`--ink-4`, 11px).
- **Environment strip (BL):** 6 stats in a row, no panel (reads directly on the scrim): Temp, Wind, Pressure, Dust τ, Irradiance, Radiation.
- **Rows list (`dl.rows`):** `dt` left `--ink-3`, `dd` right 550; 1px `--line` top border, 7px vertical padding.
- **Sparkline:** 1.5px amber polyline with a thin ink baseline path; `preserveAspectRatio="none"`.
- **Signal bars:** 4–5 ascending 3px bars (4→12px), active = `--blue`, inactive `--ink-5`.

### 5.5 Callouts / stags (on-stage labels)
Glass micro-card (8×10 padding, radius md): bold name + dim type, status line in uppercase with a status dot, optional inset stat row. Connected to its target by a **1px stem** with a 5px terminal dot. Direction classes `stag--left/right`, stem length via `--stem`. Target sector label has no card, just text + stem.

### 5.6 Hotspots
Ring button over a 3D part ("Inspect Solar array"). Pulsing ring, label appears on hover/focus. `is-high` raises emphasis (amber). Always has an `aria-label`.

### 5.7 Navigation
- **Vertical rail:** round 38px buttons; active = `--fill-3` + inset `--line-2`; amber 6px badge dot for unread. Tooltip slides in from the right (12px offset). Keyboard hints (`1`–`5`) shown in expanded labels.
- **Segmented control (camera):** `Site / Tactical / ATLAS`, shared sliding glide pill behind the active tab (`role="tablist"`).
- **Command dock:** icon over 9.5px uppercase label, min-width 64. Active = amber tint + amber border. Dividers 1px. Contains Move/Stop/Scan/Collect/Return + speed control.

### 5.8 Rows & lists
- **Objectives:** code (`01`) + title + meta ("ATLAS-01 · Sector 04") + state button. States: *complete* (green check), *now* (amber ring with breathing dot), *next/queued* (hollow ring).
- **Fleet rows:** name + dim type, status dot + text, right value (battery/prop %) + chevron.
- **Sample slots:** 3-up grid, 36px, radius md. Empty = dashed, full = amber tint with check + "Core 0n".

### 5.9 Minimap / site map
Glass panel, 150px (or square canvas 276px) rendered terrain, dashed route, solid traveled path, amber current-position dot, white waypoints, north arrow, scale bar bottom-left, "Click to fly" bottom-right, coordinates footer with copy button.

### 5.10 Dropdown, slider, modal, toast
- **Slider:** 3px track, ink fill to `--p`, 14px white-gradient thumb, hover scale 1.12.
- **Menu:** `glass-strong`, opens upward, items stagger ≤50ms, `menuitemradio`, amber for checked.
- **Modal:** blurred 60% black backdrop, panel radius xl, max-width 420, focus trapped, Esc closes, focus restored.
- **Toast:** bottom-center pill, `role="status"`, green check, auto-hides at 1.8s.

### 5.11 Bento capability cards
Radius lg, 20px padding, `rgba(12,11,10,.5)` + blur 24, `--edge` + `--shadow-md`. Structure: tinted 40px icon tile (color via `--c`) + category chip → heading + description → inset `.viz` demo block (`--fill-1`, radius md). Hover: lift −4px, amber border at 32%.

---

## 6. Iconography
Line icons, 1.4 stroke, round caps/joins, 16–20px (Solar linear set or equivalent inline SVG). Icon swaps (play↔pause, sun↔moon, copy↔check) use scale .5 → 1 + blur 4px → 0 + fade; **exit is shorter than enter**.

---

## 7. Motion

```css
--t-fast: 150ms; --t-hover: 200ms; --t-enter: 250ms; --t-exit: 140ms;
--ease:      cubic-bezier(.16, 1, .3, 1);      /* enter / hover */
--ease-exit: cubic-bezier(.25, .46, .45, .94); /* exit */
```

- All one-shots < 300ms. Exit faster than enter.
- Scroll reveals: fade + 16px rise, ≤50ms stagger, `once: true`. Headline reveals word-by-word with a mask.
- Looping allowed: `breathe` (2s pulse on live dots), route dash (1.2s linear), rover bob (1.1s).
- Haptics (where supported): light 8ms, medium 16ms, success [10,40,10], error [30,40,30].
- `prefers-reduced-motion`: collapse durations to ~0, disable loops and smooth scroll.

---

## 8. Interaction & state rules
- Commands validate against state and answer with a toast + haptic (e.g. "Out of range · 18.9 m to Sector 04", "Scan the outcrop first").
- Mission progress rolls up from objectives (5 objectives → 20% each; starts at 7% to show life).
- Status color follows state: navigating = amber, holding = plain, on target/complete = green.
- Dock reflects reality: Move toggles play/pause icon; after one-shot actions, the dock settles back after ~1.2s.
- Click vehicle = inspect; double-click terrain or click minimap = fly camera.

---

## 9. Responsive
- **≤1100px:** progress track 150px; hide mission label and divider.
- **≤1023px:** console becomes a vertical flow — topbar → stage (360px) → nav (horizontal) → left panel → right panels (2 columns) → dock (horizontally scrollable). Hide corner brackets and tooltips.
- **≤767px:** bento and right panels single column; hide secondary clocks and sector callout.
- **≤479px:** tighter dock buttons (min 58px), speed control 130px.

---

## 10. Accessibility
- Landmarks and labels: `nav[aria-label]`, `aside[aria-label]`, `role="toolbar"` for dock, `role="tablist"` for camera, `role="dialog"` + `aria-modal` for modals.
- Toggles use `aria-pressed`; current nav uses `aria-current`; dynamic status via `aria-live="polite"`.
- Visible 2px amber focus ring, full keyboard support (arrow keys in menus, Esc to close, Tab trap in modal).
- Never rely on color alone: pair status color with dot + text.
- Touch targets ≥ 34px (prefer 38–44).

---

## 11. Do / Don't
**Do** keep amber to one focal element per region · use tabular numerals · let glass blur the stage · pair every status color with text · keep labels uppercase and tiny, numbers large and light.
**Don't** add a second accent hue · use pure white panels on the dark theme · animate beyond 300ms for one-shots · use font weights above 650 · place opaque panels over the stage center · use red for anything non-critical.

---

## 12. Implementation notes
- Stack: HTML/CSS tokens + optional GSAP (ScrollTrigger) and Lenis for scroll; Three.js for the live stage (camera-controls), CSS2D-style overlays projected from 3D positions for stags and hotspots.
- Load Inter via `inter.css`; keep the system-font fallback stack.
- Build components from tokens only; no hard-coded colors outside `:root`.
- Label sample data clearly (e.g. chip "Interactive demo · simulated data") when telemetry is simulated.

```
```docs/aether-capabilities-fora.md
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aether Planetary Ops — Capabilities</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.42/bundled/lenis.min.js"></script>
  <link rel="preconnect" href="https://rsms.me/">
  <link rel="stylesheet" href="https://rsms.me/inter/inter.css">

  <style>
    /* ================= Aether Planetary Ops tokens ================= */
    :root {
      --font: "Inter var", "Inter Variable", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;

      /* ink */
      --bg: #0c0b0a;
      --ink: #f8f6f2;
      --ink-2: rgba(248,246,242,0.85);
      --ink-3: rgba(248,246,242,0.72);
      --ink-4: rgba(248,246,242,0.55);
      --ink-5: rgba(248,246,242,0.18);
      --inv: #161412;
      --solid: #f4f1ec;
      --line: rgba(255,255,255,0.10);
      --line-2: rgba(255,255,255,0.18);
      --fill-1: rgba(255,255,255,0.05);
      --fill-2: rgba(255,255,255,0.09);
      --fill-3: rgba(255,255,255,0.16);
      --track: rgba(255,255,255,0.18);

      /* semantic accents */
      --amber: #f5a857;
      --amber-2: rgba(245,168,87,0.18);
      --amber-ink: #ffd9ae;
      --green: #92dcae;
      --green-2: rgba(146,220,174,0.16);
      --red: #ff7a6b;
      --blue: #9cc2f0;
      --blue-2: rgba(156,194,240,0.16);

      /* glass */
      --glass: linear-gradient(180deg, rgba(30,28,26,0.76), rgba(17,16,15,0.72));
      --glass-strong: linear-gradient(180deg, rgba(30,28,26,0.92), rgba(16,15,14,0.88));
      --glass-blur: blur(28px) saturate(140%) brightness(0.82);
      --edge: inset 0 1px 0 rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.08);

      /* radii */
      --r-sm: 7px; --r-md: 11px; --r-lg: 16px; --r-xl: 22px; --r-pill: 9999px;

      /* beautiful shadows */
      --shadow-md: 0 0 0 1px rgba(0,0,0,0.06), 0 1px 1px -0.5px rgba(0,0,0,0.06), 0 3px 3px -1.5px rgba(0,0,0,0.06), 0 6px 6px -3px rgba(0,0,0,0.06), 0 12px 12px -6px rgba(0,0,0,0.06), 0 24px 24px -12px rgba(0,0,0,0.06);
      --shadow-lg: 0 2.8px 2.2px rgba(0,0,0,0.034), 0 6.7px 5.3px rgba(0,0,0,0.048), 0 12.5px 10px rgba(0,0,0,0.06), 0 22.3px 17.9px rgba(0,0,0,0.072), 0 41.8px 33.4px rgba(0,0,0,0.086), 0 100px 80px rgba(0,0,0,0.12);

      /* ===== Amicro motion tokens (every one-shot < 300ms) ===== */
      --t-fast: 150ms;
      --t-hover: 200ms;
      --t-enter: 250ms;
      --t-exit: 140ms;
      --ease: cubic-bezier(0.16, 1, 0.3, 1);
      --ease-exit: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    * { box-sizing: border-box; }
    html { background: var(--bg); }
    body {
      margin: 0; background: var(--bg); color: var(--ink);
      font-family: var(--font); font-size: 14px; line-height: 1.55;
      font-variant-numeric: tabular-nums; font-feature-settings: 'tnum' 1, 'cv11' 1;
      -webkit-font-smoothing: antialiased;
    }
    button { font-family: inherit; color: inherit; }
    h1, h2, h3, p, dl, dd { margin: 0; }

    /* ---------- type ---------- */
    .display-lg { font-size: clamp(34px, 5.2vw, 48px); line-height: 1.02; font-weight: 600; letter-spacing: -0.025em; }
    .body-md { font-size: 15px; line-height: 24px; color: var(--ink-4); }
    .lbl { font-size: 10px; font-weight: 550; text-transform: uppercase; letter-spacing: 0.14em; color: var(--ink-4); }
    .lbl-sm { font-size: 10px; font-weight: 550; text-transform: uppercase; letter-spacing: 0.12em; }
    .stat { font-size: 30px; line-height: 1; font-weight: 300; letter-spacing: -0.02em; }
    .stat small { font-size: 14px; font-weight: 400; margin-left: 4px; color: var(--ink-3); letter-spacing: 0; }

    /* ---------- section chrome ---------- */
    .section { position: relative; overflow: hidden; padding: 96px 24px; }
    .texture { position: absolute; inset: 0; pointer-events: none;
      background-image: repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 72px); }
    .aurora { position: absolute; top: -160px; left: 50%; transform: translateX(-50%); width: 900px; max-width: 140vw; height: 500px; pointer-events: none;
      background: radial-gradient(ellipse at center, rgba(245,168,87,0.12), transparent 65%); }
    .wrap { position: relative; max-width: 1280px; margin: 0 auto; }

    /* ---------- glass ---------- */
    .glass { background: var(--glass); border: 1px solid var(--line); box-shadow: var(--edge);
      -webkit-backdrop-filter: var(--glass-blur); backdrop-filter: var(--glass-blur); border-radius: var(--r-lg); }
    .glass-strong { background: var(--glass-strong); }
    .chip { display: inline-flex; align-items: center; gap: 6px; padding: 3px 9px; border-radius: var(--r-pill);
      font-size: 10px; font-weight: 550; text-transform: uppercase; letter-spacing: 0.1em; white-space: nowrap;
      color: var(--amber); border: 1px solid rgba(245,168,87,0.35); background: var(--amber-2); }
    .chip.is-green { color: var(--green); border-color: rgba(146,220,174,0.35); background: var(--green-2); }
    .chip.is-blue { color: var(--blue); border-color: rgba(156,194,240,0.35); background: var(--blue-2); }
    .chip.is-plain { color: var(--ink-3); border-color: var(--line); background: var(--fill-1); }
    .dot { width: 6px; height: 6px; border-radius: 9999px; background: currentColor; flex: none; }
    .pulse { animation: breathe 2s ease-in-out infinite; }
    @keyframes breathe { 0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(245,168,87,0.5); } 50% { opacity: 0.55; box-shadow: 0 0 0 4px rgba(245,168,87,0); } }

    /* ---------- buttons ---------- */
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 44px; padding: 0 20px;
      border-radius: 12px; font-size: 13px; font-weight: 550; letter-spacing: 0.01em; cursor: pointer; text-decoration: none;
      transition: transform var(--t-hover) var(--ease), background-color var(--t-hover) var(--ease), border-color var(--t-hover) var(--ease), box-shadow var(--t-hover) var(--ease), color var(--t-hover) var(--ease); }
    .btn:hover { transform: translateY(-2px); }
    .btn:active { transform: translateY(0) scale(0.97); transition-duration: var(--t-fast); }
    .btn-primary { background: var(--amber); color: var(--inv); border: 1px solid rgba(245,168,87,0.55);
      box-shadow: 0 1px 0 rgba(255,255,255,0.35) inset, 0 6px 18px -6px rgba(245,168,87,0.55); }
    .btn-primary:hover { background: #f8b46b; box-shadow: 0 1px 0 rgba(255,255,255,0.4) inset, 0 12px 24px -8px rgba(245,168,87,0.6); }
    .btn-secondary { background: var(--fill-1); color: var(--ink); border: 1px solid var(--line-2); }
    .btn-secondary:hover { background: var(--fill-2); border-color: rgba(255,255,255,0.3); }
    :where(.btn, .dock-btn, .icon-btn, .nav-btn, .speed-trigger, .menu-item, .tool-btn, .slot):focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }

    .icon-btn { display: inline-grid; place-items: center; flex: none; width: 24px; height: 24px; border-radius: var(--r-sm);
      color: var(--ink-4); background: transparent; border: 1px solid var(--line); cursor: pointer;
      transition: background-color var(--t-fast) var(--ease), color var(--t-fast) var(--ease), transform var(--t-fast) var(--ease); }
    .icon-btn:hover { background: var(--fill-2); color: var(--ink); }
    .icon-btn:active { transform: scale(0.92); }
    .icon-btn.is-lg { width: 32px; height: 32px; border-radius: var(--r-md); }
    .icon-btn.is-done { color: var(--green); border-color: rgba(146,220,174,0.4); }
    .tool-btn { display: inline-grid; place-items: center; width: 34px; height: 34px; border-radius: var(--r-md);
      color: var(--ink-3); background: transparent; border: 0; cursor: pointer;
      transition: background-color var(--t-fast) var(--ease), color var(--t-fast) var(--ease), transform var(--t-fast) var(--ease); }
    .tool-btn:hover { background: var(--fill-2); color: var(--ink); }
    .tool-btn:active { transform: scale(0.92); }

    /* ---------- icon swap (scale + blur + fade; exit shorter than enter) ---------- */
    .icon-swap { position: relative; display: inline-block; width: var(--sz, 16px); height: var(--sz, 16px); flex: none; }
    .icon-swap-item { position: absolute; inset: 0; display: grid; place-items: center;
      opacity: 0; transform: scale(0.5); filter: blur(4px);
      transition: opacity var(--t-exit) var(--ease-exit), transform var(--t-exit) var(--ease-exit), filter var(--t-exit) var(--ease-exit); }
    .icon-swap-item.is-on { opacity: 1; transform: none; filter: blur(0);
      transition-duration: var(--t-enter); transition-timing-function: var(--ease); }

    /* ================= HERO CAPABILITY FRAME ================= */
    .frame-meta { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
    .frame { position: relative; padding: 1px; border-radius: 24px;
      background: linear-gradient(160deg, rgba(245,168,87,0.4), rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.04));
      box-shadow: var(--shadow-lg); }
    .frame-inner { position: relative; border-radius: 23px; overflow: hidden; background: var(--bg); isolation: isolate; }
    .bracket { position: absolute; width: 22px; height: 22px; border: 0 solid var(--amber); pointer-events: none; z-index: 5; opacity: 0.9; }
    .bracket.tl { top: 10px; left: 10px; border-top-width: 2px; border-left-width: 2px; border-top-left-radius: 8px; }
    .bracket.tr { top: 10px; right: 10px; border-top-width: 2px; border-right-width: 2px; border-top-right-radius: 8px; }
    .bracket.bl { bottom: 10px; left: 10px; border-bottom-width: 2px; border-left-width: 2px; border-bottom-left-radius: 8px; }
    .bracket.br { bottom: 10px; right: 10px; border-bottom-width: 2px; border-right-width: 2px; border-bottom-right-radius: 8px; }

    .console { position: relative; height: 720px; }

    /* ---------- stage (martian terrain) ---------- */
    .stage { position: absolute; inset: 0; overflow: hidden; z-index: 0; transition: filter var(--t-enter) var(--ease);
      background:
        radial-gradient(ellipse 60% 40% at 55% 62%, rgba(255,196,130,0.22), transparent 70%),
        linear-gradient(180deg, #4a2f22 0%, #6d4630 14%, #94623f 34%, #a87048 62%, #8f5c3c 100%); }
    .stage.is-dim { filter: brightness(0.72) saturate(0.9); }
    .stage svg.fill { position: absolute; inset: 0; width: 100%; height: 100%; }
    .stage .grain { mix-blend-mode: overlay; opacity: 0.55; }
    .stage .vignette { position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(ellipse 85% 75% at 50% 52%, transparent 40%, rgba(12,11,10,0.62) 100%),
                  linear-gradient(180deg, rgba(12,11,10,0.5), transparent 22%, transparent 78%, rgba(12,11,10,0.55)); }
    .rover { position: absolute; left: 50%; top: 56%; width: min(300px, 62%); transform: translate(-50%, -50%); }
    .rover svg { width: 100%; height: auto; display: block; overflow: visible; }
    .rover.is-moving svg { animation: bob 1.1s ease-in-out infinite; }
    @keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
    .trail { stroke-dasharray: 4 12; }
    .trail.is-moving { animation: dash 1.2s linear infinite; }
    @keyframes dash { to { stroke-dashoffset: -32; } }

    .callout { position: absolute; z-index: 2; }
    .callout .card { padding: 8px 10px; border-radius: var(--r-md); }
    .callout .stem { width: 1px; height: 64px; margin-left: 8px; background: var(--ink-4); position: relative; }
    .callout .stem::after { content: ""; position: absolute; left: -2px; bottom: -2px; width: 5px; height: 5px; border-radius: 9999px; background: var(--ink); }
    .callout.rover-callout { left: 41%; top: 19%; }
    .callout.sector-callout { left: 58%; top: 7%; }
    .callout b { font-weight: 600; color: var(--ink); }

    /* ---------- HUD regions ---------- */
    .hud-top { position: absolute; z-index: 3; top: 14px; left: 22px; right: 22px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 12px; }
    .brand { display: flex; align-items: center; gap: 12px; min-width: 0; }
    .brand-mark { display: grid; place-items: center; width: 30px; height: 30px; flex: none; color: var(--ink); }
    .brand-name { font-size: 11px; font-weight: 650; letter-spacing: 0.32em; text-transform: uppercase; }
    .brand-sep { width: 1px; height: 26px; background: var(--line-2); flex: none; }
    .brand-mission { min-width: 0; }
    .brand-mission .m1 { font-size: 10px; letter-spacing: 0.14em; color: var(--ink-4); text-transform: uppercase; font-weight: 550; }
    .brand-mission .m2 { font-size: 12px; font-weight: 550; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    .progress-pill { display: flex; align-items: center; gap: 14px; padding: 7px 16px; border-radius: var(--r-pill); }
    .progress-track { position: relative; width: 240px; height: 4px; border-radius: 3px; background: var(--track); overflow: hidden; }
    .progress-fill { height: 100%; width: 0%; border-radius: 3px; background: linear-gradient(90deg, var(--amber), #f2a24e);
      transition: width var(--t-enter) var(--ease); }
    .progress-val { font-size: 12px; font-weight: 650; }

    .clock { display: flex; align-items: center; justify-content: flex-end; gap: 18px; }
    .clock .grp { text-align: right; }
    .clock .grp .v { font-size: 12px; font-weight: 550; letter-spacing: 0.02em; }
    .signal { display: inline-flex; align-items: flex-end; gap: 2px; height: 12px; }
    .signal i { display: block; width: 3px; border-radius: 1px; background: var(--ink-5); }
    .signal i:nth-child(1) { height: 4px; } .signal i:nth-child(2) { height: 6px; } .signal i:nth-child(3) { height: 8px; } .signal i:nth-child(4) { height: 10px; } .signal i:nth-child(5) { height: 12px; }
    .signal i.on { background: var(--blue); }

    .hud-nav { position: absolute; z-index: 3; left: 14px; top: 238px; display: flex; flex-direction: column; gap: 4px; padding: 6px; border-radius: 26px; }
    .nav-btn { position: relative; display: grid; place-items: center; width: 38px; height: 38px; border-radius: var(--r-pill);
      color: var(--ink-4); background: transparent; border: 0; cursor: pointer;
      transition: background-color var(--t-fast) var(--ease), color var(--t-fast) var(--ease), transform var(--t-fast) var(--ease); }
    .nav-btn:hover { background: var(--fill-2); color: var(--ink); }
    .nav-btn:active { transform: scale(0.92); }
    .nav-btn.is-active { background: var(--fill-3); color: var(--ink); box-shadow: inset 0 0 0 1px var(--line-2); }
    .nav-btn .badge { position: absolute; top: 8px; right: 8px; width: 6px; height: 6px; border-radius: 9999px; background: var(--amber); }
    .nav-btn .tip { position: absolute; left: calc(100% + 12px); top: 50%; transform: translate(-4px, -50%); white-space: nowrap; pointer-events: none;
      padding: 5px 10px; border-radius: var(--r-sm); font-size: 11px; font-weight: 550; letter-spacing: 0.04em; color: var(--ink);
      background: rgba(18,17,16,0.94); border: 1px solid var(--line); opacity: 0; z-index: 10;
      transition: opacity var(--t-exit) var(--ease-exit), transform var(--t-exit) var(--ease-exit); }
    .nav-btn:hover .tip, .nav-btn:focus-visible .tip { opacity: 1; transform: translate(0, -50%); transition-duration: var(--t-fast); transition-timing-function: var(--ease); }

    .hud-left { position: absolute; z-index: 3; left: 80px; top: 62px; width: 252px; }
    .rover-head h2 { font-size: 30px; font-weight: 500; letter-spacing: -0.02em; line-height: 1.1; margin: 2px 0; }
    .rover-head .sub { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-4); font-weight: 550; }
    .rover-head .chip { margin-top: 10px; }
    .stats { margin-top: 12px; padding: 14px 14px 6px; }
    .stats-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .stats .rule { height: 2px; margin: 10px 0 0; border-radius: 2px; background: linear-gradient(90deg, var(--ink) 0 55%, var(--track) 55%); }
    .spark { display: block; width: 100%; height: 52px; margin: 8px 0 4px; }
    .rows > div { display: flex; justify-content: space-between; gap: 12px; padding: 7px 0; border-top: 1px solid var(--line); font-size: 11.5px; }
    .rows dt { color: var(--ink-3); }
    .rows dd { font-weight: 550; color: var(--ink); }
    .rows dd.is-amber { color: var(--amber); }

    .hud-right { position: absolute; z-index: 3; right: 14px; top: 62px; width: 252px; display: flex; flex-direction: column; gap: 12px; }
    .panel { padding: 12px; }
    .panel-head > span { white-space: nowrap; }
    .panel-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
    .minimap { position: relative; height: 150px; border-radius: var(--r-md); overflow: hidden; border: 1px solid var(--line);
      background: radial-gradient(circle at 60% 40%, #8a5a3c, #4d3022 85%); }
    .minimap svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .minimap .scale { position: absolute; left: 8px; bottom: 6px; font-size: 9px; letter-spacing: 0.1em; color: var(--ink-2); text-transform: uppercase; font-weight: 550; }
    .coords { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 10px; }
    .coords span.t { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-4); font-weight: 550; }
    .slots { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 8px; }
    .slot { position: relative; height: 36px; border-radius: var(--r-md); border: 1px solid var(--line); background: var(--fill-1);
      font-size: 10px; font-weight: 550; letter-spacing: 0.06em; color: var(--ink-3); cursor: default; padding: 0; overflow: hidden;
      transition: border-color var(--t-hover) var(--ease), background-color var(--t-hover) var(--ease); }
    .slot > span { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 4px; }
    .slot.is-full { border-color: rgba(245,168,87,0.45); background: var(--amber-2); color: var(--amber-ink); }

    .hud-dock { position: absolute; z-index: 4; bottom: 14px; left: 50%; transform: translateX(-50%); }
    .dock { display: flex; align-items: center; gap: 4px; padding: 6px; border-radius: var(--r-lg); }
    .dock-btn { display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 64px; padding: 9px 12px 8px; border-radius: var(--r-md);
      color: var(--ink-3); background: transparent; border: 1px solid transparent; cursor: pointer;
      transition: background-color var(--t-hover) var(--ease), color var(--t-hover) var(--ease), border-color var(--t-hover) var(--ease), transform var(--t-hover) var(--ease); }
    .dock-btn:hover { background: var(--fill-2); color: var(--ink); transform: translateY(-2px); }
    .dock-btn:active { transform: translateY(0) scale(0.96); transition-duration: var(--t-fast); }
    .dock-btn .label { font-size: 9.5px; font-weight: 650; text-transform: uppercase; letter-spacing: 0.16em; }
    .dock-btn.is-active { background: var(--amber-2); border-color: rgba(245,168,87,0.38); color: var(--amber); }
    .dock-btn.is-active:hover { background: rgba(245,168,87,0.26); }
    .dock-sep { width: 1px; align-self: stretch; margin: 6px 8px; background: var(--line); }
    .speed { display: flex; flex-direction: column; gap: 6px; padding: 0 10px 0 4px; min-width: 150px; }
    .speed-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }

    /* range slider */
    .range { -webkit-appearance: none; appearance: none; width: 100%; height: 14px; margin: 0; background: transparent; cursor: pointer; --p: 55%; }
    .range::-webkit-slider-runnable-track { height: 3px; border-radius: 3px; background: linear-gradient(90deg, var(--ink) 0 var(--p), var(--track) var(--p) 100%); }
    .range::-moz-range-track { height: 3px; border-radius: 3px; background: linear-gradient(90deg, var(--ink) 0 var(--p), var(--track) var(--p) 100%); }
    .range::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; margin-top: -5.5px; border-radius: 9999px; border: 0;
      background: linear-gradient(180deg, #fff, #d9d5cf); box-shadow: 0 1px 3px rgba(0,0,0,0.5); transition: transform var(--t-fast) var(--ease); }
    .range::-moz-range-thumb { width: 14px; height: 14px; border-radius: 9999px; border: 0; background: linear-gradient(180deg, #fff, #d9d5cf); box-shadow: 0 1px 3px rgba(0,0,0,0.5); }
    .range:hover::-webkit-slider-thumb { transform: scale(1.12); }
    .range:active::-webkit-slider-thumb { transform: scale(0.94); }
    .range:focus-visible { outline: 2px solid var(--amber); outline-offset: 4px; border-radius: 6px; }

    /* ---------- dropdown ---------- */
    .speed-trigger { display: inline-flex; align-items: center; gap: 4px; padding: 3px 6px; border-radius: var(--r-sm);
      font-size: 12px; font-weight: 650; color: var(--ink); background: transparent; border: 1px solid transparent; cursor: pointer;
      transition: background-color var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease); }
    .speed-trigger:hover, .speed-trigger[aria-expanded="true"] { background: var(--fill-2); border-color: var(--line); }
    .speed-trigger .chev { color: var(--ink-4); transition: transform var(--t-enter) var(--ease); }
    .speed-trigger[aria-expanded="true"] .chev { transform: rotate(180deg); }
    .menu { position: absolute; right: 0; bottom: calc(100% + 10px); z-index: 20; min-width: 150px; padding: 6px;
      transform-origin: bottom right; opacity: 0; transform: translateY(6px) scale(0.96); visibility: hidden; pointer-events: none;
      transition: opacity var(--t-exit) var(--ease-exit), transform var(--t-exit) var(--ease-exit), visibility 0s linear var(--t-exit); }
    .menu[data-open="true"] { opacity: 1; transform: none; visibility: visible; pointer-events: auto;
      transition: opacity var(--t-enter) var(--ease), transform var(--t-enter) var(--ease), visibility 0s linear 0s; }
    .menu-item { display: flex; align-items: center; justify-content: space-between; gap: 12px; width: 100%; padding: 8px 10px; border-radius: var(--r-sm);
      font-size: 12px; font-weight: 550; color: var(--ink-2); background: transparent; border: 0; cursor: pointer; text-align: left;
      opacity: 0; transform: translateY(4px);
      transition: background-color var(--t-fast) var(--ease), color var(--t-fast) var(--ease), opacity var(--t-exit) var(--ease-exit), transform var(--t-exit) var(--ease-exit); }
    .menu[data-open="true"] .menu-item { opacity: 1; transform: none;
      transition: background-color var(--t-fast) var(--ease), color var(--t-fast) var(--ease),
        opacity var(--t-enter) var(--ease) min(calc(var(--i, 0) * 15ms), 50ms), transform var(--t-enter) var(--ease) min(calc(var(--i, 0) * 15ms), 50ms); }
    .menu-item:hover, .menu-item:focus-visible { background: var(--fill-2); color: var(--ink); }
    .menu-item[aria-checked="true"] { color: var(--amber); }


    /* ================= VIEW SWITCHING (amicro: exit 140ms, enter 250ms) ================= */
    .vf { opacity: 0; transform: translateY(6px); filter: blur(4px); visibility: hidden; pointer-events: none;
      transition: opacity var(--t-exit) var(--ease-exit), transform var(--t-exit) var(--ease-exit), filter var(--t-exit) var(--ease-exit), visibility 0s linear var(--t-exit); }
    .vf[data-on="true"] { opacity: 1; transform: none; filter: none; visibility: visible; pointer-events: auto;
      transition: opacity var(--t-enter) var(--ease), transform var(--t-enter) var(--ease), filter var(--t-enter) var(--ease), visibility 0s linear 0s; }
    .vlayer { position: absolute; inset: 0; z-index: 3; pointer-events: none !important; }
    .vlayer > * { pointer-events: auto; }
    .scene { position: absolute; inset: 0; transform-origin: 50% 56%; transition: transform 280ms var(--ease); }
    .vehicle { position: absolute; }
    .vehicle svg, .lander svg { display: block; width: 100%; height: auto; overflow: visible; }

    /* nav labels */
    .nav-btn .tip .key { margin-left: 8px; padding: 1px 5px; border-radius: 4px; background: var(--fill-2); color: var(--ink-3); font-size: 10px; }
    .nav-sep { height: 1px; margin: 3px 8px; background: var(--line); }

    /* ================= OVERVIEW VIEW ================= */
    .region-tl { position: absolute; left: 80px; top: 62px; width: 300px; display: flex; flex-direction: column; gap: 12px; }
    .region-tr { position: absolute; right: 14px; top: 62px; width: 252px; display: flex; flex-direction: column; gap: 12px; }
    .region-bl { position: absolute; left: 80px; bottom: 14px; width: min(700px, calc(100% - 520px)); display: flex; flex-direction: column; gap: 10px; }
    .region-br { position: absolute; right: 14px; bottom: 14px; display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
    .ident-kick { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .ident-title { margin-top: 10px; font-size: 26px; line-height: 1.1; font-weight: 300; letter-spacing: -0.02em; }
    .ident-title b { font-weight: 600; }
    .ident-sub { margin-top: 6px; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-4); font-weight: 550; }
    .ident-text { margin-top: 10px; font-size: 12px; line-height: 18px; color: var(--ink-3); }
    .fleet { padding: 4px; }
    .fleet-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%; padding: 9px 10px; border-radius: var(--r-md);
      background: transparent; border: 0; cursor: pointer; text-align: left; color: var(--ink);
      transition: background-color var(--t-fast) var(--ease); }
    .fleet-row:hover { background: var(--fill-2); }
    .fleet-row:focus-visible { outline: 2px solid var(--amber); outline-offset: -2px; }
    .fleet-name { font-size: 12.5px; font-weight: 600; }
    .fleet-name span { margin-left: 6px; font-weight: 400; color: var(--ink-4); font-size: 11px; }
    .fleet-meta { display: flex; align-items: center; gap: 6px; margin-top: 2px; font-size: 10.5px; color: var(--ink-3); }
    .fleet-meta .dot { width: 5px; height: 5px; }
    .fleet-val { font-size: 12px; font-weight: 550; }
    .fleet-go { display: grid; place-items: center; width: 22px; height: 22px; border-radius: var(--r-sm); color: var(--ink-4);
      transition: transform var(--t-fast) var(--ease), color var(--t-fast) var(--ease); }
    .fleet-row:hover .fleet-go { transform: translateX(2px); color: var(--ink); }
    .is-nominal { color: var(--green); } .is-info { color: var(--blue); }

    .sitemap-map { position: relative; height: 150px; border-radius: var(--r-md); overflow: hidden; border: 1px solid var(--line);
      background: radial-gradient(circle at 55% 45%, #8a5a3c, #4d3022 85%); }
    .sitemap-map svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .sitemap-map [data-fly] { cursor: pointer; }
    .sitemap-map [data-fly]:focus-visible { outline: none; }
    .sitemap-map [data-fly]:focus-visible .ring-f, .sitemap-map [data-fly]:hover .ring-f { stroke: #fff; opacity: 1; }
    .ring-f { fill: none; stroke: rgba(255,255,255,0.35); transition: stroke var(--t-fast) var(--ease), opacity var(--t-fast) var(--ease); }
    .o2 { display: grid; grid-template-columns: 22px 1fr 22px; align-items: center; gap: 8px; padding: 7px 0; border-top: 1px solid var(--line); }
    .o2:first-of-type { border-top: 0; padding-top: 0; }
    .o2 .code { font-size: 10px; letter-spacing: 0.1em; color: var(--ink-4); font-weight: 550; }
    .o2 .t { font-size: 11.5px; font-weight: 550; color: var(--ink-3); line-height: 1.25; }
    .o2 .m { font-size: 10px; color: var(--ink-4); margin-top: 1px; }
    .o2.is-complete .t { color: var(--ink); }
    .o2.is-now .t { color: var(--ink); } .o2.is-now .code { color: var(--amber); }
    .o2 .state { display: grid; place-items: center; width: 22px; height: 22px; color: var(--green); }
    .o2 .state .ring { display: block; width: 12px; height: 12px; border-radius: 9999px; border: 1px solid var(--line-2); }
    .o2.is-now .state .ring { border-color: var(--amber); }

    .env { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 12px; padding: 0 4px; }
    .env .v { font-size: 17px; font-weight: 300; letter-spacing: -0.01em; margin-top: 3px; }
    .env .v small { font-size: 10px; margin-left: 3px; color: var(--ink-4); font-weight: 400; }
    .env .sub { font-size: 10px; color: var(--ink-4); margin-top: 1px; }
    .resources { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; padding: 12px 14px; }
    .res .v { font-size: 20px; font-weight: 300; letter-spacing: -0.01em; margin-top: 3px; }
    .res .v small { font-size: 11px; margin-left: 3px; color: var(--ink-4); font-weight: 400; }
    .res .sub { font-size: 10px; color: var(--ink-4); margin-top: 1px; }
    .bar { height: 3px; margin-top: 8px; border-radius: 3px; background: var(--track); overflow: hidden; }
    .bar i { display: block; height: 100%; border-radius: 3px; background: var(--ink); }
    .bar.is-amber i { background: var(--amber); } .bar.is-green i { background: var(--green); } .bar.is-blue i { background: var(--blue); }
    .hint { display: flex; gap: 14px; font-size: 10.5px; color: var(--ink-4); text-shadow: 0 1px 2px rgba(0,0,0,0.6); }
    .hint b { color: var(--ink-2); font-weight: 600; }
    .camdock { display: flex; align-items: center; gap: 6px; padding: 5px; border-radius: var(--r-lg); }
    .seg { position: relative; display: flex; padding: 3px; border-radius: var(--r-md); background: var(--fill-1); }
    .seg-glide { position: absolute; top: 3px; bottom: 3px; left: 0; width: 0; border-radius: 8px; background: var(--fill-3); box-shadow: inset 0 0 0 1px var(--line-2);
      transition: transform var(--t-enter) var(--ease), width var(--t-enter) var(--ease); }
    .seg-btn { position: relative; z-index: 1; padding: 6px 12px; border: 0; border-radius: 8px; background: transparent; color: var(--ink-4); cursor: pointer;
      font-size: 11px; font-weight: 600; letter-spacing: 0.04em; transition: color var(--t-fast) var(--ease); }
    .seg-btn:hover { color: var(--ink); } .seg-btn.is-on { color: var(--ink); }
    .seg-btn:focus-visible { outline: 2px solid var(--amber); outline-offset: 1px; }
    .zoom { display: flex; gap: 4px; padding-left: 6px; margin-left: 2px; border-left: 1px solid var(--line); }
    .zoom .icon-btn { width: 28px; height: 28px; border-radius: var(--r-sm); }

    /* ================= BENTO ================= */
    .bento { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 16px; margin-top: 16px; }
    .b-card { position: relative; padding: 20px; border-radius: var(--r-lg); display: flex; flex-direction: column; gap: 14px; min-width: 0;
      background: rgba(12,11,10,0.5); border: 1px solid var(--line); box-shadow: var(--edge), var(--shadow-md);
      -webkit-backdrop-filter: blur(24px); backdrop-filter: blur(24px);
      transition: transform var(--t-hover) var(--ease), border-color var(--t-hover) var(--ease), background-color var(--t-hover) var(--ease); }
    .b-card:hover { transform: translateY(-4px); border-color: rgba(245,168,87,0.32); background: rgba(22,20,18,0.62); }
    .span-3 { grid-column: span 3; } .span-2 { grid-column: span 2; }
    .b-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
    .b-icon { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; color: var(--c, var(--amber));
      background: color-mix(in srgb, var(--c, var(--amber)) 14%, transparent); border: 1px solid color-mix(in srgb, var(--c, var(--amber)) 38%, transparent); }
    .b-card h3 { font-size: 17px; font-weight: 600; letter-spacing: -0.015em; line-height: 1.25; }
    .b-card p.d { font-size: 13px; line-height: 20px; color: var(--ink-4); margin-top: 6px; }
    .viz { margin-top: auto; padding: 12px; border-radius: var(--r-md); background: var(--fill-1); border: 1px solid var(--line); }
    .obj { display: flex; align-items: center; gap: 10px; padding: 7px 0; font-size: 12px; color: var(--ink-3); border-top: 1px solid var(--line); }
    .obj:first-child { border-top: 0; padding-top: 0; }
    .obj .ring { display: grid; place-items: center; width: 16px; height: 16px; border-radius: 9999px; border: 1px solid var(--line-2); flex: none; }
    .obj.is-now { color: var(--ink); }
    .obj.is-now .ring { border-color: var(--amber); }
    .obj.is-now .ring::after { content: ""; width: 6px; height: 6px; border-radius: 9999px; background: var(--amber); animation: breathe 2s ease-in-out infinite; }
    .obj .st { margin-left: auto; font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-4); font-weight: 550; }

    /* ---------- reveal ---------- */
    .reveal-line .word-mask { display: inline-block; overflow: hidden; vertical-align: top; padding-bottom: 0.08em; }
    .reveal-line .word { display: inline-block; will-change: transform; }

    /* ================= MODAL ================= */
    .modal { position: fixed; inset: 0; z-index: 60; display: grid; place-items: center; padding: 16px; visibility: hidden; pointer-events: none; transition: visibility 0s linear var(--t-exit); }
    .modal[data-open="true"] { visibility: visible; pointer-events: auto; transition-delay: 0s; }
    .modal-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.6); -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); opacity: 0; transition: opacity var(--t-exit) var(--ease-exit); }
    .modal[data-open="true"] .modal-backdrop { opacity: 1; transition: opacity var(--t-enter) var(--ease); }
    .modal-panel { position: relative; width: 100%; max-width: 420px; padding: 24px; border-radius: var(--r-xl); opacity: 0; transform: translateY(12px) scale(0.96);
      transition: opacity var(--t-exit) var(--ease-exit), transform var(--t-exit) var(--ease-exit); }
    .modal-panel:focus { outline: none; }
    .modal[data-open="true"] .modal-panel { opacity: 1; transform: none; transition: opacity var(--t-enter) var(--ease), transform var(--t-enter) var(--ease); }

    /* ================= TOAST ================= */
    .toast { position: fixed; left: 50%; bottom: 24px; z-index: 70; display: flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: var(--r-pill);
      font-size: 12px; font-weight: 550; opacity: 0; transform: translate(-50%, 12px) scale(0.96); visibility: hidden; pointer-events: none;
      transition: opacity var(--t-exit) var(--ease-exit), transform var(--t-exit) var(--ease-exit), visibility 0s linear var(--t-exit); }
    .toast[data-open="true"] { opacity: 1; transform: translate(-50%, 0) scale(1); visibility: visible;
      transition: opacity var(--t-enter) var(--ease), transform var(--t-enter) var(--ease), visibility 0s linear 0s; }

    /* ================= RESPONSIVE ================= */
    @media (max-width: 1100px) {
      .progress-track { width: 150px; }
      .brand-mission { display: none; } .brand-sep { display: none; }
    }
    @media (max-width: 1023px) {
      .section { padding: 64px 16px; }
      .console { height: auto; display: flex; flex-direction: column; gap: 12px; padding: 12px; }
      .stage { position: relative; inset: auto; height: 360px; border-radius: var(--r-lg); order: 2; flex: none; }
      .hud-top { position: relative; inset: auto; order: 1; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px; }
      .hud-top .progress-pill { order: 3; width: 100%; justify-content: space-between; }
      .progress-track { flex: 1; width: auto; }
      .clock { gap: 12px; }
      .hud-nav { position: relative; inset: auto; order: 3; flex-direction: row; justify-content: center; align-self: center; }
      .nav-btn .tip { display: none; }
      .hud-left { position: relative; inset: auto; order: 4; width: 100%; }
      .hud-right { position: relative; inset: auto; order: 5; width: 100%; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .hud-dock { position: relative; inset: auto; order: 6; transform: none; overflow-x: auto; }
      .dock { width: max-content; margin: 0 auto; }
      .callout.rover-callout { left: 6%; top: 8%; } .callout.sector-callout { left: 52%; top: 4%; }
      .rover { top: 62%; }
      .bracket { display: none; }
      .vlayer { display: contents; } .vlayer[data-on="false"] { display: none; }
      .region-tl, .region-tr, .region-bl, .region-br { position: relative; inset: auto; width: 100%; }
      .region-tl { order: 4; } .region-tr { order: 5; } .region-bl { order: 6; } .region-br { order: 7; align-items: stretch; }
      .env { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .resources { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .camdock { flex-wrap: wrap; justify-content: center; }
      .callout.stag-extra { display: none; }
      .span-3 { grid-column: span 3; } .span-2 { grid-column: span 2; }
    }
    @media (max-width: 767px) {
      .bento { grid-template-columns: 1fr; }
      .span-3, .span-2 { grid-column: auto; }
      .hud-right { grid-template-columns: 1fr; }
      .callout.sector-callout { display: none; }
      .clock .grp.hide-sm { display: none; }
    }
    @media (max-width: 479px) {
      .dock-btn { min-width: 58px; padding: 9px 8px 8px; }
      .speed { min-width: 130px; }
    }

    @media (prefers-reduced-motion: reduce) {
      * { transition-duration: 0.01ms !important; transition-delay: 0s !important; animation: none !important; }
    }
    ::-webkit-scrollbar { width: 6px; height: 6px; } ::-webkit-scrollbar-thumb { background: var(--line-2); border-radius: 3px; }
  </style>
</head>

<body>

  <section class="section" aria-labelledby="capabilities-heading">
    <div class="texture" aria-hidden="true"></div>
    <div class="aurora" aria-hidden="true"></div>

    <div class="wrap">

      <!-- ===== feature premise ===== -->
      <header style="max-width: 680px; margin-bottom: 48px;">
        <div data-fade class="chip is-plain" style="margin-bottom: 20px;">
          <span class="dot pulse" style="color: var(--amber);"></span>Aether Planetary Ops · Capabilities
        </div>
        <h1 id="capabilities-heading" class="display-lg reveal-line" style="margin-bottom: 20px;">Command every sol from one calm console.</h1>
        <p data-fade class="body-md" style="max-width: 560px; margin-bottom: 28px;">
          Aether brings rover telemetry, traverse planning and science operations into a single mission console, so the team sees position, power and objectives at a glance and acts without switching tools.
        </p>
        <div data-fade style="display: flex; flex-wrap: wrap; gap: 12px;">
          <button type="button" class="btn btn-primary" data-modal-open aria-haspopup="dialog">
            <iconify-icon icon="solar:play-linear" width="16"></iconify-icon>Open console
          </button>
          <a href="#capabilities" class="btn btn-secondary">Explore capabilities</a>
        </div>
      </header>

      <!-- ===== primary capability: live rover operations ===== -->
      <div class="frame-meta" data-fade>
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <span class="lbl">Primary capability</span>
          <span style="font-size: 13px; font-weight: 600; letter-spacing: -0.01em;">Live rover operations</span>
        </div>
        <span class="chip is-green"><span class="dot"></span>Interactive demo · simulated data</span>
      </div>

      <div id="console" class="frame" data-fade>
        <span class="bracket tl"></span><span class="bracket tr"></span><span class="bracket bl"></span><span class="bracket br"></span>
        <div class="frame-inner">
          <div class="console">

            <!-- terrain stage -->
            <div class="stage" id="stage" aria-hidden="true">
              <div class="scene" id="scene">
              <svg class="fill" viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <filter id="grain" x="0" y="0" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4"></feTurbulence>
                    <feColorMatrix type="saturate" values="0"></feColorMatrix>
                  </filter>
                  <radialGradient id="glowSpot" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stop-color="#ffd9ae" stop-opacity="0.35"></stop>
                    <stop offset="1" stop-color="#ffd9ae" stop-opacity="0"></stop>
                  </radialGradient>
                </defs>

                <!-- distant dunes -->
                <path d="M0,230 C160,190 300,215 460,198 C640,180 760,214 920,196 C1040,184 1120,200 1200,190 L1200,330 L0,330 Z" fill="#7c4f35" opacity="0.55"></path>
                <path d="M0,300 C200,262 380,292 560,274 C760,254 940,290 1200,262 L1200,420 L0,420 Z" fill="#8b5a3d" opacity="0.5"></path>

                <!-- layered outcrop (Sector 04) -->
                <g transform="translate(640 70)">
                  <ellipse cx="190" cy="148" rx="230" ry="28" fill="#6a412b" opacity="0.7"></ellipse>
                  <path d="M20,138 L40,112 L330,108 L360,138 Z" fill="#b57a4e"></path>
                  <path d="M20,138 L360,138 L372,150 L10,150 Z" fill="#8c5a3a"></path>
                  <path d="M62,112 L84,84 L300,80 L322,110 Z" fill="#c4885a"></path>
                  <path d="M62,112 L322,110 L330,122 L52,124 Z" fill="#9a6642"></path>
                  <path d="M104,84 L124,58 L268,56 L286,82 Z" fill="#cf9363"></path>
                  <path d="M104,84 L286,82 L292,94 L98,96 Z" fill="#a46f48"></path>
                  <path d="M146,58 L160,40 L236,38 L250,56 Z" fill="#d89c6c"></path>
                </g>

                <!-- faceted rocks -->
                <g>
                  <polygon points="140,470 210,420 290,432 330,478 270,512 180,508" fill="#6f4529"></polygon>
                  <polygon points="140,470 210,420 232,470 180,508" fill="#835234"></polygon>
                  <polygon points="210,420 290,432 232,470" fill="#9b6540"></polygon>
                  <polygon points="232,470 290,432 330,478 270,512" fill="#5a3722"></polygon>
                  <ellipse cx="242" cy="520" rx="110" ry="14" fill="#3a2214" opacity="0.4"></ellipse>
                </g>
                <polygon points="60,230 110,216 140,236 98,252" fill="#5d3a25" opacity="0.85"></polygon>
                <polygon points="1010,300 1056,288 1078,306 1036,318" fill="#5d3a25" opacity="0.8"></polygon>
                <polygon points="820,560 860,548 884,566 846,578" fill="#6a412b" opacity="0.9"></polygon>
                <polygon points="1060,610 1120,596 1150,620 1096,636" fill="#6f4529" opacity="0.9"></polygon>
                <ellipse cx="340" cy="270" rx="18" ry="5" fill="#4a2c1a" opacity="0.6"></ellipse>
                <ellipse cx="930" cy="400" rx="22" ry="6" fill="#4a2c1a" opacity="0.5"></ellipse>

                <!-- route to target -->
                <path id="trailPath" class="trail" d="M606,720 C598,640 612,560 630,500 C660,420 690,330 706,238" fill="none" stroke="rgba(248,246,242,0.7)" stroke-width="2" stroke-linecap="round"></path>
                <circle cx="706" cy="236" r="26" fill="url(#glowSpot)"></circle>
                <circle cx="706" cy="236" r="9" fill="none" stroke="#f5a857" stroke-width="1.5"></circle>
                <circle cx="706" cy="236" r="16" fill="none" stroke="rgba(245,168,87,0.45)" stroke-width="1">
                  <animate attributeName="r" values="14;22;14" dur="3s" repeatCount="indefinite"></animate>
                  <animate attributeName="opacity" values="0.7;0.1;0.7" dur="3s" repeatCount="indefinite"></animate>
                </circle>
                <circle cx="706" cy="236" r="3" fill="#f5a857"></circle>

                <rect width="1200" height="720" filter="url(#grain)" class="grain"></rect>
              </svg>

              <!-- rover -->
              <div class="rover" id="rover">
                <svg viewBox="0 0 300 240" aria-hidden="true">
                  <ellipse cx="150" cy="208" rx="118" ry="20" fill="#2a170c" opacity="0.5"></ellipse>
                  <!-- mast -->
                  <rect x="222" y="34" width="7" height="90" rx="2" fill="#a39b90"></rect>
                  <rect x="208" y="20" width="34" height="16" rx="3" fill="#d8d2c6"></rect>
                  <rect x="212" y="24" width="7" height="7" rx="2" fill="#3a342d"></rect>
                  <!-- rear wheels -->
                  <rect x="226" y="108" width="24" height="56" rx="9" fill="#1f1a16"></rect>
                  <rect x="226" y="108" width="24" height="10" rx="5" fill="#2e2822"></rect>
                  <!-- body faces -->
                  <polygon points="62,114 136,144 136,190 62,162" fill="#8a8378"></polygon>
                  <polygon points="136,144 252,110 252,154 136,190" fill="#a8a196"></polygon>
                  <!-- solar deck -->
                  <polygon points="62,114 178,84 252,110 136,144" fill="#cfc8bd"></polygon>
                  <g stroke="#8d867b" stroke-width="1" opacity="0.8">
                    <line x1="91" y1="106" x2="165" y2="132"></line><line x1="120" y1="99" x2="194" y2="125"></line>
                    <line x1="149" y1="92" x2="223" y2="118"></line>
                    <line x1="86" y1="123" x2="196" y2="92"></line><line x1="111" y1="133" x2="221" y2="102"></line>
                  </g>
                  <ellipse cx="100" cy="122" rx="17" ry="9" fill="#ece6da"></ellipse>
                  <rect x="196" y="128" width="9" height="9" rx="2" fill="#ffd9ae"></rect>
                  <rect x="194" y="126" width="13" height="13" rx="4" fill="#ffd9ae" opacity="0.28"></rect>
                  <!-- front wheels -->
                  <rect x="46" y="140" width="28" height="60" rx="10" fill="#1f1a16"></rect>
                  <rect x="46" y="140" width="28" height="11" rx="5" fill="#2e2822"></rect>
                  <rect x="122" y="166" width="28" height="52" rx="10" fill="#1f1a16"></rect>
                  <rect x="122" y="166" width="28" height="10" rx="5" fill="#2e2822"></rect>
                </svg>
              </div>

              <!-- overview-only world objects -->
              <div class="lander vehicle vf" data-view="overview" data-on="false" style="left: 38%; top: 17%; width: 64px;">
                <svg viewBox="0 0 64 120" aria-hidden="true">
                  <ellipse cx="32" cy="112" rx="30" ry="6" fill="#2a170c" opacity="0.45"></ellipse>
                  <polygon points="32,2 46,34 46,92 18,92 18,34" fill="#d8d2c6"></polygon>
                  <polygon points="32,2 46,34 32,34" fill="#bdb6a9"></polygon>
                  <rect x="18" y="56" width="28" height="4" fill="#8a8378"></rect>
                  <rect x="26" y="40" width="12" height="8" rx="2" fill="#3a342d"></rect>
                  <path d="M18,86 L4,110 M46,86 L60,110 M32,92 L32,112" stroke="#a39b90" stroke-width="3" stroke-linecap="round"></path>
                </svg>
              </div>
              <div class="vehicle vf" data-view="overview" data-on="false" style="left: 70%; top: 58%; width: 78px;">
                <svg viewBox="0 0 90 56" aria-hidden="true">
                  <ellipse cx="45" cy="50" rx="40" ry="5" fill="#2a170c" opacity="0.45"></ellipse>
                  <rect x="6" y="14" width="56" height="26" rx="3" fill="#a8a196"></rect>
                  <rect x="62" y="22" width="22" height="18" rx="3" fill="#cfc8bd"></rect>
                  <rect x="12" y="38" width="14" height="12" rx="4" fill="#1f1a16"></rect><rect x="40" y="38" width="14" height="12" rx="4" fill="#1f1a16"></rect><rect x="66" y="38" width="14" height="12" rx="4" fill="#1f1a16"></rect>
                </svg>
              </div>
              <div class="vehicle vf" data-view="overview" data-on="false" style="left: 34%; top: 54%; width: 56px;">
                <svg viewBox="0 0 70 50" aria-hidden="true">
                  <ellipse cx="35" cy="45" rx="30" ry="4" fill="#2a170c" opacity="0.45"></ellipse>
                  <polygon points="8,20 26,12 62,22 44,32" fill="#cfc8bd"></polygon>
                  <polygon points="8,20 44,32 44,38 8,26" fill="#8a8378"></polygon><polygon points="44,32 62,22 62,28 44,38" fill="#a8a196"></polygon>
                  <rect x="10" y="26" width="9" height="14" rx="4" fill="#1f1a16"></rect><rect x="46" y="28" width="9" height="14" rx="4" fill="#1f1a16"></rect>
                </svg>
              </div>
              </div><!-- /scene -->

              <div class="vignette"></div>

              <!-- callouts -->
              <div class="callout rover-callout vf" data-view="rover" data-on="true">
                <div class="glass card">
                  <p class="lbl-sm" style="color: var(--ink);"><b>ATLAS-01</b> <span style="font-weight: 400; color: var(--ink-3);">Rover</span></p>
                  <p class="lbl-sm" style="color: var(--amber); margin-top: 3px;"><span id="coStatus">● Navigating</span> · <span id="coSpeed">1.4</span> m/s</p>
                  <p class="lbl-sm" style="margin-top: 6px; padding: 4px 8px; border-radius: 6px; background: rgba(255,255,255,0.1); display: flex; justify-content: space-between; gap: 18px; color: var(--ink);"><span style="color: var(--ink-3);">Battery</span><b>91%</b></p>
                </div>
                <div class="stem"></div>
              </div>
              <div class="callout sector-callout vf" data-view="rover" data-on="true">
                <p class="lbl-sm" style="color: var(--ink-2); margin-bottom: 2px;">Sector 04</p>
                <p class="lbl-sm" style="color: var(--amber-ink); font-weight: 400;">● Layered outcrop · Target</p>
              </div>

              <!-- overview labels -->
              <div class="callout vf" data-view="overview" data-on="false" style="left: 42%; top: 9%;"><div class="glass card"><p class="lbl-sm" style="color: var(--ink);"><b>IX-7</b> <span style="font-weight: 400; color: var(--ink-3);">HERMES</span></p><p class="lbl-sm" style="color: var(--green); margin-top: 3px;">● Ready</p></div><div class="stem" style="height: 34px;"></div></div>
              <div class="callout vf" data-view="overview" data-on="false" style="left: 54%; top: 33%;"><div class="glass card"><p class="lbl-sm" style="color: var(--ink);"><b>ATLAS-01</b> <span style="font-weight: 400; color: var(--ink-3);">Rover</span></p><p class="lbl-sm" style="color: var(--green); margin-top: 3px;" id="ovAtlasStatus">● Navigating</p></div><div class="stem" style="height: 30px;"></div></div>
              <div class="callout stag-extra vf" data-view="overview" data-on="false" style="left: 70%; top: 48%;"><div class="glass card"><p class="lbl-sm" style="color: var(--ink);"><b>CARGO-03</b></p></div><div class="stem" style="height: 18px;"></div></div>
              <div class="callout stag-extra vf" data-view="overview" data-on="false" style="left: 33%; top: 45%;"><div class="glass card"><p class="lbl-sm" style="color: var(--ink);"><b>EXPLORER-12</b></p></div><div class="stem" style="height: 18px;"></div></div>
            </div>

            <!-- top bar -->
            <div class="hud-top">
              <div class="brand">
                <span class="brand-mark" aria-hidden="true"><iconify-icon icon="solar:planet-2-linear" width="24"></iconify-icon></span>
                <span class="brand-name">Aether</span>
                <span class="brand-sep"></span>
                <div class="brand-mission"><div class="m1">Mission</div><div class="m2">IX-7 · Hesper Basin</div></div>
              </div>

              <div class="glass progress-pill" role="group" aria-label="Mission progress">
                <span class="lbl-sm" style="color: var(--ink-3); letter-spacing: 0.14em; white-space: nowrap;">Mission progress</span>
                <div class="progress-track"><div class="progress-fill" id="missionBar"></div></div>
                <span class="progress-val" id="missionPct">0%</span>
                <span class="lbl-sm" id="missionObj" style="color: var(--ink-4);">0/5</span>
              </div>

              <div class="clock">
                <div class="grp hide-sm"><div class="lbl">Sol 048 · LMST</div><div class="v">15:48</div></div>
                <div class="grp"><div class="lbl">UTC</div><div class="v" id="utc">18:32:59</div></div>
                <div class="grp hide-sm" style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
                  <div class="lbl">Link</div>
                  <span class="signal" role="img" aria-label="Link strength: 69%, direct to Earth" title="Direct-to-Earth · 69%"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i></span>
                </div>
                <div style="display: flex; gap: 2px;">
                  <button type="button" class="tool-btn" id="dimToggle" aria-pressed="false" aria-label="Dim terrain view" title="Dim terrain view">
                    <span class="icon-swap" data-icon-swap data-state="sun" style="--sz:16px;">
                      <iconify-icon class="icon-swap-item is-on" data-icon="sun" icon="solar:sun-2-linear" width="16"></iconify-icon>
                      <iconify-icon class="icon-swap-item" data-icon="moon" icon="solar:moon-linear" width="16"></iconify-icon>
                    </span>
                  </button>
                  <button type="button" class="tool-btn" id="soundToggle" aria-pressed="false" aria-label="Mute audio" title="Audio">
                    <span class="icon-swap" data-icon-swap data-state="on" style="--sz:16px;">
                      <iconify-icon class="icon-swap-item is-on" data-icon="on" icon="solar:volume-loud-linear" width="16"></iconify-icon>
                      <iconify-icon class="icon-swap-item" data-icon="off" icon="solar:volume-cross-linear" width="16"></iconify-icon>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <!-- left vertical nav -->
            <nav class="glass hud-nav" aria-label="Views">
              <button type="button" class="nav-btn" data-nav="overview" aria-label="Overview"><iconify-icon icon="solar:map-arrow-up-linear" width="18"></iconify-icon><span class="tip">Overview<span class="key">1</span></span></button>
              <button type="button" class="nav-btn" data-nav="spacecraft" aria-label="Spacecraft"><iconify-icon icon="solar:rocket-2-linear" width="18"></iconify-icon><span class="tip">Spacecraft<span class="key">2</span></span></button>
              <button type="button" class="nav-btn is-active" data-nav="rover" aria-label="Rover ops" aria-current="true"><iconify-icon icon="solar:delivery-linear" width="18"></iconify-icon><span class="tip">Rover ops<span class="key">3</span></span></button>
              <span class="nav-sep" aria-hidden="true"></span>
              <button type="button" class="nav-btn" data-nav="systems" aria-label="Systems"><iconify-icon icon="solar:pulse-2-linear" width="18"></iconify-icon><span class="tip">Systems<span class="key">4</span></span></button>
              <button type="button" class="nav-btn" data-nav="journal" aria-label="Journal"><iconify-icon icon="solar:checklist-minimalistic-linear" width="18"></iconify-icon><span class="badge"></span><span class="tip">Journal<span class="key">5</span></span></button>
            </nav>

            <div class="vf vlayer" data-view="rover" data-on="true">
            <!-- left panel -->
            <aside class="hud-left" aria-label="Rover operations">
              <div class="rover-head">
                <p class="lbl">Rover operations</p>
                <h2>ATLAS-01</h2>
                <p class="sub">Six-wheel science rover · Autonomous nav</p>
                <span class="chip" id="statusChip"><span class="dot pulse"></span><span id="statusText">Navigating</span></span>
              </div>
              <div class="glass stats">
                <div class="stats-row">
                  <div><p class="lbl">Speed</p><p class="stat" style="color: var(--amber); margin-top: 6px;"><span id="tSpeed">1.41</span><small>m/s</small></p></div>
                  <div><p class="lbl">Battery</p><p class="stat" style="margin-top: 6px;">90.7<small>%</small></p></div>
                </div>
                <div class="rule" aria-hidden="true"></div>
                <svg class="spark" viewBox="0 0 220 52" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0,44 L150,16 L158,6 L164,30 L170,12 L180,26 L190,14 L200,28 L210,16 L220,22" stroke="#f5a857" stroke-width="1.5" stroke-linejoin="round"></path>
                  <path d="M0,50 L150,50 L154,30" stroke="rgba(248,246,242,0.45)" stroke-width="1"></path>
                </svg>
                <dl class="rows">
                  <div><dt>Odometer</dt><dd><span id="tOdo">1309.5</span> m</dd></div>
                  <div><dt>To Sector 04</dt><dd><span id="tDist">18.9</span> m</dd></div>
                  <div><dt>Heading</dt><dd>40°</dd></div>
                  <div><dt>Pitch / roll</dt><dd>−5.3° / 0.3°</dd></div>
                  <div><dt>Position (E, N)</dt><dd>−6.9, +35.5 m</dd></div>
                  <div><dt>Motor temp</dt><dd>−0.2 °C</dd></div>
                  <div><dt>Route progress</dt><dd class="is-amber"><span id="tProg">58</span>%</dd></div>
                </dl>
              </div>
            </aside>

            <!-- right panels -->
            <aside class="hud-right" aria-label="Traverse and science">
              <section class="glass panel" aria-label="Traverse map">
                <div class="panel-head"><span class="lbl-sm" style="color: var(--ink-2); letter-spacing: 0.08em;">Traverse · Sector 04</span><span class="lbl-sm" style="color: var(--ink-4);">Route 04-A</span></div>
                <div class="minimap">
                  <svg viewBox="0 0 220 150" fill="none" aria-hidden="true">
                    <circle cx="58" cy="52" r="15" stroke="rgba(248,246,242,0.5)" stroke-dasharray="3 3"></circle>
                    <path d="M58,52 C90,66 118,76 142,102" stroke="rgba(248,246,242,0.7)" stroke-width="1.3" stroke-dasharray="3 3"></path>
                    <path d="M118,76 C140,82 156,94 166,116" stroke="#fff" stroke-width="1.8"></path>
                    <circle cx="118" cy="76" r="3" fill="#f5a857"></circle>
                    <circle cx="166" cy="116" r="3" fill="#fff"></circle>
                    <rect x="188" y="62" width="4" height="4" fill="#fff"></rect><rect x="200" y="30" width="3" height="3" fill="#fff" opacity="0.7"></rect>
                    <circle cx="112" cy="130" r="7" stroke="#fff" stroke-width="1"></circle><circle cx="112" cy="130" r="1.6" fill="#fff"></circle>
                    <text x="206" y="14" fill="#f8f6f2" font-size="7" text-anchor="middle" font-weight="600">N</text>
                    <line x1="206" y1="17" x2="206" y2="26" stroke="#f8f6f2" stroke-width="1"></line>
                  </svg>
                  <span class="scale">20 m ━━━━</span><span class="scale" style="left: auto; right: 8px;">Click to fly</span>
                </div>
                <div class="coords">
                  <span class="t">22.61°S · 312.08°E</span>
                  <span style="display: inline-flex; align-items: center; gap: 8px;">
                    <button type="button" class="icon-btn" id="copyCoords" aria-label="Copy coordinates" title="Copy coordinates">
                      <span class="icon-swap" data-icon-swap data-state="copy" style="--sz:14px;">
                        <iconify-icon class="icon-swap-item is-on" data-icon="copy" icon="solar:copy-linear" width="14"></iconify-icon>
                        <iconify-icon class="icon-swap-item" data-icon="check" icon="solar:check-read-linear" width="14"></iconify-icon>
                      </span>
                    </button>
                  </span>
                </div>
              </section>

              <section class="glass panel" aria-label="Science">
                <div class="panel-head" style="margin-bottom: 8px;"><span class="lbl-sm" style="color: var(--ink-2); letter-spacing: 0.1em;">Science</span><span class="lbl-sm" id="sciState" style="color: var(--ink-4);">Idle</span></div>
                <p style="font-size: 11.5px; line-height: 17px; color: var(--ink-3);" id="sciText">Drive to Sector 04 and scan the layered outcrop to identify a coring target.</p>
                <div style="display: flex; justify-content: space-between; margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--line);">
                  <span class="lbl-sm" style="color: var(--ink-4);">Sample cache</span><span class="lbl-sm" id="cacheCount" style="color: var(--ink-3);">0 / 3</span>
                </div>
                <div class="slots" id="slots">
                  <div class="slot" data-slot data-icon-swap data-state="empty"><span class="icon-swap-item is-on" data-icon="empty">Empty</span><span class="icon-swap-item" data-icon="full"><iconify-icon icon="solar:check-read-linear" width="12"></iconify-icon><em style="font-style: normal;" data-core>Core</em></span></div>
                  <div class="slot" data-slot data-icon-swap data-state="empty"><span class="icon-swap-item is-on" data-icon="empty">Empty</span><span class="icon-swap-item" data-icon="full"><iconify-icon icon="solar:check-read-linear" width="12"></iconify-icon><em style="font-style: normal;" data-core>Core</em></span></div>
                  <div class="slot" data-slot data-icon-swap data-state="empty"><span class="icon-swap-item is-on" data-icon="empty">Empty</span><span class="icon-swap-item" data-icon="full"><iconify-icon icon="solar:check-read-linear" width="12"></iconify-icon><em style="font-style: normal;" data-core>Core</em></span></div>
                </div>
              </section>
            </aside>

            <!-- bottom control dock -->
            <div class="hud-dock">
              <div class="glass dock" role="toolbar" aria-label="Rover commands">
                <button type="button" class="dock-btn is-active" data-dock="move" aria-label="Pause traverse" aria-pressed="true">
                  <span class="icon-swap" data-icon-swap data-state="pause">
                    <iconify-icon class="icon-swap-item" data-icon="play" icon="solar:play-linear" width="16"></iconify-icon>
                    <iconify-icon class="icon-swap-item is-on" data-icon="pause" icon="solar:pause-linear" width="16"></iconify-icon>
                  </span>
                  <span class="label">Move</span>
                </button>
                <button type="button" class="dock-btn" data-dock="stop"><iconify-icon icon="solar:stop-linear" width="16"></iconify-icon><span class="label">Stop</span></button>
                <button type="button" class="dock-btn" data-dock="scan"><iconify-icon icon="solar:radar-2-linear" width="16"></iconify-icon><span class="label">Scan</span></button>
                <button type="button" class="dock-btn" data-dock="collect"><iconify-icon icon="solar:test-tube-linear" width="16"></iconify-icon><span class="label">Collect</span></button>
                <button type="button" class="dock-btn" data-dock="return"><iconify-icon icon="solar:home-2-linear" width="16"></iconify-icon><span class="label">Return</span></button>

                <span class="dock-sep" aria-hidden="true"></span>

                <div class="speed">
                  <div class="speed-top">
                    <span class="lbl-sm" style="color: var(--ink-3); letter-spacing: 0.14em; white-space: nowrap;">Speed limit</span>
                    <div style="position: relative;" data-dropdown>
                      <button type="button" class="speed-trigger" data-dropdown-trigger aria-haspopup="menu" aria-expanded="false" aria-controls="speedMenu">
                        <span id="speedLabel">1.6 m/s</span>
                        <iconify-icon class="chev" icon="solar:alt-arrow-down-linear" width="14"></iconify-icon>
                      </button>
                      <div id="speedMenu" class="glass glass-strong menu" role="menu" aria-label="Speed limit presets" data-dropdown-menu data-open="false">
                        <button type="button" role="menuitemradio" aria-checked="false" class="menu-item" data-speed="1.0" style="--i:0;" tabindex="-1"><span>1.0 m/s</span><span class="icon-swap" style="--sz:14px;"><iconify-icon class="icon-swap-item" icon="solar:check-read-linear" width="14"></iconify-icon></span></button>
                        <button type="button" role="menuitemradio" aria-checked="true" class="menu-item" data-speed="1.6" style="--i:1;" tabindex="-1"><span>1.6 m/s</span><span class="icon-swap" style="--sz:14px;"><iconify-icon class="icon-swap-item is-on" icon="solar:check-read-linear" width="14"></iconify-icon></span></button>
                        <button type="button" role="menuitemradio" aria-checked="false" class="menu-item" data-speed="2.0" style="--i:2;" tabindex="-1"><span>2.0 m/s</span><span class="icon-swap" style="--sz:14px;"><iconify-icon class="icon-swap-item" icon="solar:check-read-linear" width="14"></iconify-icon></span></button>
                      </div>
                    </div>
                  </div>
                  <input id="speedRange" class="range" type="range" min="0.5" max="2.5" step="0.1" value="1.6" aria-label="Speed limit in metres per second">
                </div>
              </div>
            </div>

            </div><!-- /rover layer -->

            <!-- ============ OVERVIEW VIEW ============ -->
            <div class="vf vlayer" data-view="overview" data-on="false">
              <div class="region-tl">
                <div class="ident">
                  <div class="ident-kick"><span class="lbl">Mission overview</span><span class="chip is-green"><span class="dot"></span>IX-7 · Ready</span></div>
                  <div class="ident-title"><b>Hesper Basin</b> Site 2</div>
                  <div class="ident-sub">Sol 048 · Surface operations</div>
                  <p class="ident-text">IX-7 HERMES is on the pad with ATLAS-01 at the service dock. Today’s plan: verify the lander, hot-fire the engines, and return a core from the layered outcrop in Sector 04.</p>
                </div>
                <div class="glass fleet" role="list" aria-label="Fleet">
                  <button type="button" class="fleet-row" role="listitem" data-fleet="IX-7"><div><div class="fleet-name">IX-7<span>Lander</span></div><div class="fleet-meta is-nominal"><span class="dot"></span><span style="color: var(--ink-3);">Ready</span></div></div><div style="display: flex; align-items: center; gap: 6px;"><span class="fleet-val">78%</span><span class="fleet-go"><iconify-icon icon="solar:alt-arrow-right-linear" width="14"></iconify-icon></span></div></button>
                  <button type="button" class="fleet-row" role="listitem" data-fleet="ATLAS-01"><div><div class="fleet-name">ATLAS-01<span>Rover</span></div><div class="fleet-meta is-nominal" id="fleetAtlasMeta"><span class="dot"></span><span style="color: var(--ink-3);" id="fleetAtlasStatus">Navigating</span></div></div><div style="display: flex; align-items: center; gap: 6px;"><span class="fleet-val">46%</span><span class="fleet-go"><iconify-icon icon="solar:alt-arrow-right-linear" width="14"></iconify-icon></span></div></button>
                  <button type="button" class="fleet-row" role="listitem" data-fleet="CARGO-03"><div><div class="fleet-name">CARGO-03<span>Hauler</span></div><div class="fleet-meta is-info"><span class="dot"></span><span style="color: var(--ink-3);">Transit · 2.3 m/s</span></div></div><span class="fleet-go"><iconify-icon icon="solar:alt-arrow-right-linear" width="14"></iconify-icon></span></button>
                  <button type="button" class="fleet-row" role="listitem" data-fleet="EXPLORER-12"><div><div class="fleet-name">EXPLORER-12<span>Survey</span></div><div class="fleet-meta is-info"><span class="dot"></span><span style="color: var(--ink-3);">Ridge traverse</span></div></div><span class="fleet-go"><iconify-icon icon="solar:alt-arrow-right-linear" width="14"></iconify-icon></span></button>
                </div>
              </div>

              <div class="region-tr">
                <section class="glass panel" aria-label="Site map">
                  <div class="panel-head"><span class="lbl-sm" style="color: var(--ink-2); letter-spacing: 0.08em;">Hesper Basin · Site 2</span><span class="lbl-sm" style="color: var(--ink-4);">Orbital</span></div>
                  <div class="sitemap-map" id="siteMap">
                    <svg viewBox="0 0 220 150" fill="none" role="group" aria-label="Site map — select a marker to fly the camera there">
                      <circle cx="148" cy="44" r="22" stroke="rgba(248,246,242,0.18)" stroke-dasharray="3 3"></circle>
                      <path d="M92,92 C112,80 128,62 148,44" stroke="rgba(248,246,242,0.55)" stroke-dasharray="3 3"></path>
                      <g data-fly="IX-7" tabindex="0" role="button" aria-label="Fly to IX-7"><circle class="ring-f" cx="70" cy="104" r="11"></circle><rect x="66" y="100" width="8" height="8" fill="#92dcae"></rect></g>
                      <g data-fly="ATLAS-01" tabindex="0" role="button" aria-label="Fly to ATLAS-01"><circle class="ring-f" cx="92" cy="92" r="9"></circle><circle cx="92" cy="92" r="3.5" fill="#f5a857"></circle></g>
                      <g data-fly="Sector 04" tabindex="0" role="button" aria-label="Fly to Sector 04"><circle class="ring-f" cx="148" cy="44" r="9" style="stroke: rgba(245,168,87,0.7);"></circle><circle cx="148" cy="44" r="2.5" fill="#f5a857"></circle></g>
                      <g data-fly="CARGO-03" tabindex="0" role="button" aria-label="Fly to CARGO-03"><circle class="ring-f" cx="176" cy="112" r="9"></circle><circle cx="176" cy="112" r="3" fill="#9cc2f0"></circle></g>
                      <g data-fly="EXPLORER-12" tabindex="0" role="button" aria-label="Fly to EXPLORER-12"><circle class="ring-f" cx="40" cy="48" r="9"></circle><circle cx="40" cy="48" r="3" fill="#9cc2f0"></circle></g>
                    </svg>
                  </div>
                  <div class="coords"><span class="t">22.61°S · 312.08°E</span><span class="t">Click to fly</span></div>
                </section>

                <section class="glass panel" aria-label="Objectives">
                  <div class="panel-head"><span class="lbl-sm" style="color: var(--ink-2); letter-spacing: 0.1em;">Objectives</span><span class="lbl-sm" id="objCount" style="color: var(--ink-4);">2 / 5</span></div>
                  <div id="objList">
                    <div class="o2 is-complete" data-obj="0"><span class="code">01</span><div><div class="t">Complete systems check</div><div class="m">IX-7 · Landing site</div></div><span class="state icon-swap" data-icon-swap data-state="done" style="--sz:22px;"><iconify-icon class="icon-swap-item is-on" data-icon="done" icon="solar:check-read-linear" width="16"></iconify-icon><span class="icon-swap-item" data-icon="todo"><i class="ring"></i></span></span></div>
                    <div class="o2 is-complete" data-obj="1"><span class="code">02</span><div><div class="t">Propulsion hot-fire &amp; hover</div><div class="m">IX-7 · Landing site</div></div><span class="state icon-swap" data-icon-swap data-state="done" style="--sz:22px;"><iconify-icon class="icon-swap-item is-on" data-icon="done" icon="solar:check-read-linear" width="16"></iconify-icon><span class="icon-swap-item" data-icon="todo"><i class="ring"></i></span></span></div>
                    <div class="o2" data-obj="2"><span class="code">03</span><div><div class="t">Survey geological Sector 04</div><div class="m">ATLAS-01 · Sector 04</div></div><span class="state icon-swap" data-icon-swap data-state="todo" style="--sz:22px;"><iconify-icon class="icon-swap-item" data-icon="done" icon="solar:check-read-linear" width="16"></iconify-icon><span class="icon-swap-item is-on" data-icon="todo"><i class="ring"></i></span></span></div>
                    <div class="o2" data-obj="3"><span class="code">04</span><div><div class="t">Collect core sample</div><div class="m">ATLAS-01 · Sector 04</div></div><span class="state icon-swap" data-icon-swap data-state="todo" style="--sz:22px;"><iconify-icon class="icon-swap-item" data-icon="done" icon="solar:check-read-linear" width="16"></iconify-icon><span class="icon-swap-item is-on" data-icon="todo"><i class="ring"></i></span></span></div>
                    <div class="o2" data-obj="4"><span class="code">05</span><div><div class="t">Return sample to IX-7</div><div class="m">ATLAS-01 · Rover dock</div></div><span class="state icon-swap" data-icon-swap data-state="todo" style="--sz:22px;"><iconify-icon class="icon-swap-item" data-icon="done" icon="solar:check-read-linear" width="16"></iconify-icon><span class="icon-swap-item is-on" data-icon="todo"><i class="ring"></i></span></span></div>
                  </div>
                </section>
              </div>

              <div class="region-bl">
                <div class="env" aria-label="Environment">
                  <div><div class="lbl">Temp</div><div class="v">−17.9<small>°C</small></div></div>
                  <div><div class="lbl">Wind</div><div class="v">5.9<small>m/s</small></div></div>
                  <div><div class="lbl">Pressure</div><div class="v">0.619<small>kPa</small></div></div>
                  <div><div class="lbl">Dust τ</div><div class="v">0.52</div></div>
                  <div><div class="lbl">Irradiance</div><div class="v">147<small>W/m²</small></div></div>
                  <div><div class="lbl">Radiation</div><div class="v">Low</div><div class="sub">10.1 µGy/h</div></div>
                </div>
                <div class="glass resources" aria-label="Resources">
                  <div class="res"><div class="lbl">Power</div><div class="v">77.9<small>%</small></div><div class="sub">−0.92 kW net</div><div class="bar is-amber"><i style="width: 77.9%;"></i></div></div>
                  <div class="res"><div class="lbl">Propellant</div><div class="v">51.4<small>%</small></div><div class="sub">16.5 t CH₄/LOX</div><div class="bar"><i style="width: 51.4%;"></i></div></div>
                  <div class="res"><div class="lbl">Oxygen</div><div class="v">92.1<small>%</small></div><div class="sub">Nominal</div><div class="bar is-green"><i style="width: 92.1%;"></i></div></div>
                  <div class="res"><div class="lbl">Water</div><div class="v">63.8<small>%</small></div><div class="sub">Nominal</div><div class="bar is-blue"><i style="width: 63.8%;"></i></div></div>
                </div>
              </div>

              <div class="region-br">
                <div class="hint"><span><b>Click</b> a vehicle to inspect</span><span><b>Double-click</b> terrain to fly</span></div>
                <div class="glass camdock" role="group" aria-label="Camera">
                  <span class="lbl" style="padding: 0 6px 0 8px;">Camera</span>
                  <div class="seg" role="tablist" aria-label="Camera preset" id="seg">
                    <span class="seg-glide" id="segGlide" aria-hidden="true"></span>
                    <button type="button" role="tab" aria-selected="true" class="seg-btn is-on" data-cam="site">Site</button>
                    <button type="button" role="tab" aria-selected="false" class="seg-btn" data-cam="tactical">Tactical</button>
                    <button type="button" role="tab" aria-selected="false" class="seg-btn" data-cam="atlas">ATLAS</button>
                  </div>
                  <div class="zoom">
                    <button type="button" class="icon-btn" id="zoomIn" aria-label="Zoom in" title="Zoom in"><iconify-icon icon="solar:add-circle-linear" width="16"></iconify-icon></button>
                    <button type="button" class="icon-btn" id="zoomOut" aria-label="Zoom out" title="Zoom out"><iconify-icon icon="solar:minus-circle-linear" width="16"></iconify-icon></button>
                  </div>
                </div>
              </div>
            </div><!-- /overview layer -->

          </div>
        </div>
      </div>

      <!-- ===== supporting capabilities (bento) ===== -->
      <div id="capabilities" class="bento">

        <article class="b-card span-3" data-fade>
          <div class="b-top"><span class="b-icon" style="--c: var(--amber);"><iconify-icon icon="solar:pulse-2-linear" width="20"></iconify-icon></span><span class="chip">Clarity</span></div>
          <div>
            <h3>Telemetry you can read at a glance</h3>
            <p class="d">Speed, battery, heading, pitch and roll, motor temperature and route progress share one dense, tabular readout, so numbers never jump while they update.</p>
          </div>
          <div class="viz">
            <svg viewBox="0 0 220 48" width="100%" height="48" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="M0,40 L60,28 L120,12 L150,20 L162,8 L172,24 L186,12 L200,26 L220,18" stroke="#f5a857" stroke-width="1.5" stroke-linejoin="round"></path></svg>
            <dl class="rows" style="margin-top: 6px;">
              <div><dt>Heading</dt><dd>40°</dd></div>
              <div><dt>Pitch / roll</dt><dd>−5.3° / 0.3°</dd></div>
              <div><dt>Motor temp</dt><dd>−0.2 °C</dd></div>
            </dl>
          </div>
        </article>

        <article class="b-card span-3" data-fade>
          <div class="b-top"><span class="b-icon" style="--c: var(--blue);"><iconify-icon icon="solar:routing-2-linear" width="20"></iconify-icon></span><span class="chip is-blue">Navigation</span></div>
          <div>
            <h3>Plan the route, then watch it unfold</h3>
            <p class="d">Route 04-A to Sector 04 is drawn on a terrain minimap with scale, coordinates and a click-to-fly shortcut, so the next move is always visible.</p>
          </div>
          <div class="viz">
            <svg viewBox="0 0 320 96" width="100%" height="96" fill="none" aria-hidden="true">
              <path d="M16,76 C70,70 100,44 150,40 C200,36 240,30 296,18" stroke="rgba(248,246,242,0.55)" stroke-width="1.5" stroke-dasharray="3 5"></path>
              <path d="M16,76 C70,70 100,44 150,40" stroke="#9cc2f0" stroke-width="2"></path>
              <circle cx="16" cy="76" r="4" fill="#f8f6f2"></circle><circle cx="150" cy="40" r="4" fill="#9cc2f0"></circle>
              <circle cx="296" cy="18" r="7" stroke="#f5a857" stroke-width="1.5"></circle><circle cx="296" cy="18" r="2.5" fill="#f5a857"></circle>
              <text x="16" y="92" fill="rgba(248,246,242,0.55)" font-size="8" letter-spacing="1.2">BASE</text>
              <text x="150" y="58" fill="#9cc2f0" font-size="8" letter-spacing="1.2" text-anchor="middle">ATLAS-01</text>
              <text x="296" y="38" fill="#f5a857" font-size="8" letter-spacing="1.2" text-anchor="end">SECTOR 04</text>
            </svg>
          </div>
        </article>

        <article class="b-card span-2" data-fade>
          <div class="b-top"><span class="b-icon" style="--c: var(--green);"><iconify-icon icon="solar:test-tube-linear" width="20"></iconify-icon></span><span class="chip is-green">Accuracy</span></div>
          <div>
            <h3>Sample cache, tracked</h3>
            <p class="d">Three slots show what has been collected and what is still empty.</p>
          </div>
          <div class="viz">
            <div class="slots" style="margin-top: 0;">
              <div class="slot is-full"><span><iconify-icon icon="solar:check-read-linear" width="12"></iconify-icon>Core</span></div>
              <div class="slot" style="border-style: dashed; border-color: rgba(245,168,87,0.5); color: var(--amber);"><span>Queued</span></div>
              <div class="slot" style="border-style: dashed;"><span>Empty</span></div>
            </div>
          </div>
        </article>

        <article class="b-card span-2" data-fade>
          <div class="b-top"><span class="b-icon" style="--c: var(--amber);"><iconify-icon icon="solar:checklist-minimalistic-linear" width="20"></iconify-icon></span><span class="chip">Focus</span></div>
          <div>
            <h3>Objectives with a clear finish</h3>
            <p class="d">Five objectives from lander checks to sample return roll up into one mission progress bar.</p>
          </div>
          <div class="viz">
            <div class="obj"><span class="ring" style="border-color: var(--green); color: var(--green);"><iconify-icon icon="solar:check-read-linear" width="11"></iconify-icon></span>Complete systems check<span class="st">Done</span></div>
            <div class="obj"><span class="ring" style="border-color: var(--green); color: var(--green);"><iconify-icon icon="solar:check-read-linear" width="11"></iconify-icon></span>Propulsion hot-fire &amp; hover<span class="st">Done</span></div>
            <div class="obj is-now"><span class="ring"></span>Survey geological Sector 04<span class="st">Now</span></div>
            <div class="obj"><span class="ring"></span>Collect core sample<span class="st">Next</span></div>
            <div class="obj"><span class="ring"></span>Return sample to IX-7<span class="st">Queued</span></div>
          </div>
        </article>

        <article class="b-card span-2" data-fade>
          <div class="b-top"><span class="b-icon" style="--c: var(--blue);"><iconify-icon icon="solar:radar-2-linear" width="20"></iconify-icon></span><span class="chip is-blue">Awareness</span></div>
          <div>
            <h3>Mission clock and link, always on</h3>
            <p class="d">Sol, local mars time, UTC and the direct-to-Earth link stay pinned to the corner of the console.</p>
          </div>
          <div class="viz" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div><p class="lbl">Sol 048 · LMST</p><p style="font-size: 20px; font-weight: 300; margin-top: 4px;">15:48</p></div>
            <div><p class="lbl">UTC</p><p style="font-size: 20px; font-weight: 300; margin-top: 4px;" id="utc2">18:32:59</p></div>
            <div style="grid-column: 1 / -1; display: flex; align-items: center; justify-content: space-between; padding-top: 10px; border-top: 1px solid var(--line);">
              <span class="lbl">Link</span>
              <span class="signal" role="img" aria-label="Link strength: 69%, direct to Earth" title="Direct-to-Earth · 69%"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i></span>
            </div>
          </div>
        </article>

      </div>
    </div>
  </section>

  <!-- ======================= MODAL ======================= -->
  <div id="consoleModal" class="modal" data-open="false" aria-hidden="true">
    <div class="modal-backdrop" data-modal-close></div>
    <div class="modal-panel glass glass-strong" role="dialog" aria-modal="true" aria-labelledby="modalTitle" aria-describedby="modalDesc" tabindex="-1">
      <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;">
        <div>
          <p class="lbl" style="margin-bottom: 4px;">Aether Planetary Ops</p>
          <h2 id="modalTitle" style="font-size: 20px; font-weight: 600; letter-spacing: -0.015em;">Open command console</h2>
        </div>
        <button type="button" class="icon-btn is-lg" data-modal-close aria-label="Close dialog"><iconify-icon icon="solar:close-circle-linear" width="18"></iconify-icon></button>
      </div>
      <p id="modalDesc" style="margin-top: 12px; font-size: 13px; line-height: 20px; color: var(--ink-4);">
        Link to ATLAS-01 and start a live session. Telemetry streams while you are connected, and commands queue until the rover acknowledges them.
      </p>
      <dl class="rows" style="margin-top: 16px;">
        <div><dt>Rover</dt><dd>ATLAS-01</dd></div>
        <div><dt>Mission</dt><dd>IX-7 · Hesper Basin</dd></div>
        <div><dt>Target</dt><dd class="is-amber">Sector 04</dd></div>
        <div><dt>Link</dt><dd style="color: var(--green);">Nominal</dd></div>
      </dl>
      <div style="margin-top: 24px; display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 12px;">
        <button type="button" class="btn btn-secondary" data-modal-close>Cancel</button>
        <button type="button" class="btn btn-primary" id="modalConfirm">Connect</button>
      </div>
    </div>
  </div>

  <!-- ======================= TOAST ======================= -->
  <div id="toast" class="toast glass glass-strong" role="status" aria-live="polite" data-open="false">
    <iconify-icon icon="solar:check-read-linear" width="16" style="color: var(--green);"></iconify-icon>
    <span id="toastText">Done</span>
  </div>

  <script>
    (function () {
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var lenis = null;
      var $ = function (id) { return document.getElementById(id); };

      /* ---------- haptics (web vibration where supported) ---------- */
      var HAPTICS = { light: [8], medium: [16], success: [10, 40, 10], error: [30, 40, 30] };
      function haptic(type) { try { if (navigator.vibrate) navigator.vibrate(HAPTICS[type] || HAPTICS.light); } catch (e) {} }

      /* ---------- smooth scroll ---------- */
      if (!reduced && window.Lenis) {
        lenis = new Lenis({ smoothWheel: true, lerp: 0.1 });
        (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
      }

      /* ---------- icon swap ---------- */
      function swapIcon(root, key) {
        if (!root || root.getAttribute('data-state') === key) return;
        root.setAttribute('data-state', key);
        root.querySelectorAll('[data-icon]').forEach(function (el) {
          el.classList.toggle('is-on', el.getAttribute('data-icon') === key);
        });
      }

      /* ---------- toast ---------- */
      var toast = $('toast'), toastText = $('toastText'), toastTimer = null;
      function showToast(message) {
        toastText.textContent = message;
        toast.setAttribute('data-open', 'true');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { toast.setAttribute('data-open', 'false'); }, 1800);
      }

      /* ---------- clocks ---------- */
      function tick() {
        var t = new Date().toISOString().substr(11, 8);
        $('utc').textContent = t; $('utc2').textContent = t;
      }
      tick(); setInterval(tick, 1000);

      /* ---------- simulation state ---------- */
      var S = { running: true, arrived: false, scanned: false, returning: false, limit: 1.6,
                odo: 1309.5, dist: 18.9, startDist: 18.9, cache: 0, o: [true, true, false, false, false] };
      var rover = $('rover'), trail = $('trailPath');

      function setStatus(text, tone) {
        $('statusText').textContent = text;
        $('coStatus').textContent = '● ' + text;
        var chip = $('statusChip');
        chip.classList.toggle('is-green', tone === 'green');
        chip.classList.toggle('is-plain', tone === 'plain');
        $('coStatus').style.color = tone === 'green' ? 'var(--green)' : tone === 'plain' ? 'var(--ink-3)' : 'var(--amber)';
        $('fleetAtlasStatus').textContent = text;
        $('ovAtlasStatus').textContent = '● ' + text;
      }
      function doneCount() { return S.o.filter(Boolean).length; }
      function setMission() {
        var n = doneCount(), pct = n * 20;
        $('missionBar').style.width = pct + '%';
        $('missionPct').textContent = pct + '%';
        $('missionObj').textContent = n + '/5';
        renderObjectives();
      }
      function render() {
        var v = S.running ? Math.min(1.41, S.limit) : 0;
        $('tSpeed').textContent = v.toFixed(2);
        $('coSpeed').textContent = v.toFixed(1);
        $('tOdo').textContent = S.odo.toFixed(1);
        $('tDist').textContent = S.dist.toFixed(1);
        $('tProg').textContent = Math.round(58 + (1 - S.dist / S.startDist) * 42);
        rover.classList.toggle('is-moving', S.running);
        trail.classList.toggle('is-moving', S.running);
      }
      function arrive() {
        S.arrived = true; S.running = false; S.dist = 0;
        setStatus('On target', 'green');
        $('sciState').textContent = 'Ready';
        $('sciText').textContent = 'Outcrop in range. Scan to identify a coring target.';
        syncMove(); setMission(); render();
        haptic('success'); showToast('Arrived at Sector 04');
      }
      setInterval(function () {
        if (!S.running || S.arrived) return;
        var v = Math.min(1.41, S.limit);
        S.odo += v; S.dist = Math.max(0, S.dist - v);
        if (S.dist <= 0) arrive(); else render();
      }, 1000);

      /* ---------- dock ---------- */
      var dockBtns = [].slice.call(document.querySelectorAll('[data-dock]'));
      var moveBtn = document.querySelector('[data-dock="move"]');
      function setActive(btn) { dockBtns.forEach(function (b) { b.classList.toggle('is-active', b === btn); }); }
      function syncMove() {
        swapIcon(moveBtn.querySelector('[data-icon-swap]'), S.running ? 'pause' : 'play');
        moveBtn.setAttribute('aria-label', S.running ? 'Pause traverse' : 'Start traverse');
        moveBtn.setAttribute('aria-pressed', S.running ? 'true' : 'false');
        setActive(S.running ? moveBtn : document.querySelector('[data-dock="stop"]'));
      }
      function settleDock() { setTimeout(syncMove, 1200); }

      dockBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var kind = btn.getAttribute('data-dock');
          haptic('light');
          if (kind === 'move') {
            if (S.arrived) { showToast('Already on target'); haptic('error'); return; }
            S.running = !S.running;
            setStatus(S.running ? 'Navigating' : 'Holding', S.running ? 'amber' : 'plain');
            syncMove(); render();
          } else if (kind === 'stop') {
            S.running = false;
            setStatus(S.arrived ? 'On target' : 'Holding', S.arrived ? 'green' : 'plain');
            syncMove(); render();
          } else if (kind === 'scan') {
            setActive(btn);
            if (!S.arrived) { haptic('error'); showToast('Out of range · ' + S.dist.toFixed(1) + ' m to Sector 04'); settleDock(); return; }
            showToast('Scanning layered outcrop…');
            setTimeout(function () {
              S.scanned = true; S.o[2] = true;
              $('sciState').textContent = 'Target set';
              $('sciText').textContent = 'Coring target identified. Collect a sample.';
              setMission(); haptic('success'); showToast('Coring target identified');
            }, 1000);
            settleDock();
          } else if (kind === 'collect') {
            setActive(btn);
            if (!S.arrived || !S.scanned) { haptic('error'); showToast(S.arrived ? 'Scan the outcrop first' : 'Reach Sector 04 first'); settleDock(); return; }
            if (S.cache >= 3) { haptic('error'); showToast('Sample cache is full'); settleDock(); return; }
            var slot = document.querySelectorAll('#slots [data-slot]')[S.cache];
            slot.querySelector('[data-core]').textContent = 'Core 0' + (S.cache + 1);
            swapIcon(slot, 'full'); slot.classList.add('is-full');
            S.cache += 1; S.o[3] = true;
            $('cacheCount').textContent = S.cache + ' / 3';
            $('sciState').textContent = 'Sampled';
            setMission(); haptic('success'); showToast('Sample ' + S.cache + ' stored');
            settleDock();
          } else if (kind === 'return') {
            setActive(btn);
            S.running = false; S.returning = true; if (S.cache > 0) S.o[4] = true;
            setStatus('Returning', 'amber'); setMission(); render();
            showToast('Return route queued'); settleDock();
          }
        });
      });

      /* ---------- views (nav) ---------- */
      var VIEWS = { overview: true, rover: true };
      var navBtns = [].slice.call(document.querySelectorAll('[data-nav]'));
      var NAV_KEYS = { '1': 'overview', '2': 'spacecraft', '3': 'rover', '4': 'systems', '5': 'journal' };
      function setView(v) {
        if (!VIEWS[v]) { haptic('error'); showToast(v.charAt(0).toUpperCase() + v.slice(1) + ' is not part of this demo'); return; }
        navBtns.forEach(function (x) {
          var on = x.getAttribute('data-nav') === v;
          x.classList.toggle('is-active', on);
          if (on) x.setAttribute('aria-current', 'true'); else x.removeAttribute('aria-current');
        });
        document.querySelectorAll('[data-view]').forEach(function (el) { el.setAttribute('data-on', el.getAttribute('data-view') === v ? 'true' : 'false'); });
        if (v === 'overview') requestAnimationFrame(moveGlide);
        haptic('light');
      }
      navBtns.forEach(function (b) { b.addEventListener('click', function () { setView(b.getAttribute('data-nav')); }); });
      document.addEventListener('keydown', function (e) {
        if (modalIsOpen() || e.metaKey || e.ctrlKey || e.altKey) return;
        var t = e.target && e.target.tagName;
        if (t === 'INPUT' || t === 'TEXTAREA') return;
        if (NAV_KEYS[e.key]) setView(NAV_KEYS[e.key]);
      });

      /* ---------- overview: objectives, fleet, map, camera ---------- */
      function renderObjectives() {
        var firstOpen = S.o.indexOf(false);
        document.querySelectorAll('#objList [data-obj]').forEach(function (row) {
          var i = parseInt(row.getAttribute('data-obj'), 10), done = S.o[i];
          row.classList.toggle('is-complete', done);
          row.classList.toggle('is-now', i === firstOpen);
          swapIcon(row.querySelector('[data-icon-swap]'), done ? 'done' : 'todo');
        });
        $('objCount').textContent = doneCount() + ' / 5';
      }

      var scene = $('scene'), cam = 'site', zoom = 1;
      var CAMS = { site: 1, tactical: 1.1, atlas: 1.22 };
      function applyCam() {
        scene.style.transform = 'scale(' + (CAMS[cam] * zoom).toFixed(3) + ')';
      }
      var segBtns = [].slice.call(document.querySelectorAll('[data-cam]'));
      function moveGlide() {
        var on = document.querySelector('.seg-btn.is-on'), g = $('segGlide');
        if (!on || !on.offsetWidth) return;
        g.style.width = on.offsetWidth + 'px';
        g.style.transform = 'translateX(' + on.offsetLeft + 'px)';
      }
      function setCam(c, silent) {
        cam = c;
        segBtns.forEach(function (b) { var on = b.getAttribute('data-cam') === c; b.classList.toggle('is-on', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
        moveGlide(); applyCam();
        if (!silent) haptic('light');
      }
      segBtns.forEach(function (b) { b.addEventListener('click', function () { setCam(b.getAttribute('data-cam')); }); });
      $('zoomIn').addEventListener('click', function () { zoom = Math.min(1.3, zoom + 0.08); applyCam(); haptic('light'); });
      $('zoomOut').addEventListener('click', function () { zoom = Math.max(1, zoom - 0.08); applyCam(); haptic('light'); });
      window.addEventListener('resize', moveGlide);

      function flyTo(name) {
        haptic('light');
        if (name === 'ATLAS-01') setCam('atlas', true);
        showToast('Camera flying to ' + name);
      }
      document.querySelectorAll('[data-fleet]').forEach(function (b) { b.addEventListener('click', function () { flyTo(b.getAttribute('data-fleet')); }); });
      document.querySelectorAll('[data-fly]').forEach(function (g) {
        g.addEventListener('click', function () { flyTo(g.getAttribute('data-fly')); });
        g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flyTo(g.getAttribute('data-fly')); } });
      });
      $('stage').parentNode.addEventListener('dblclick', function (e) {
        if (!document.querySelector('.vlayer[data-view="overview"][data-on="true"]')) return;
        if (e.target.closest('.glass, button, [data-fly]')) return;
        showToast('Camera flying to selected terrain'); haptic('light');
      });

      /* ---------- top toggles (icon swap) ---------- */
      $('dimToggle').addEventListener('click', function () {
        var on = $('stage').classList.toggle('is-dim');
        this.setAttribute('aria-pressed', on ? 'true' : 'false');
        swapIcon(this.querySelector('[data-icon-swap]'), on ? 'moon' : 'sun'); haptic('light');
      });
      $('soundToggle').addEventListener('click', function () {
        var muted = this.getAttribute('aria-pressed') !== 'true';
        this.setAttribute('aria-pressed', muted ? 'true' : 'false');
        this.setAttribute('aria-label', muted ? 'Unmute audio' : 'Mute audio');
        swapIcon(this.querySelector('[data-icon-swap]'), muted ? 'off' : 'on'); haptic('light');
      });

      /* ---------- copy coordinates (icon swap) ---------- */
      var copyBtn = $('copyCoords'), copyTimer = null;
      function copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
        return new Promise(function (resolve, reject) {
          try {
            var ta = document.createElement('textarea');
            ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
            document.body.appendChild(ta); ta.select();
            var ok = document.execCommand('copy'); document.body.removeChild(ta);
            ok ? resolve() : reject();
          } catch (e) { reject(e); }
        });
      }
      copyBtn.addEventListener('click', function () {
        copyText('22.61°S, 312.08°E').then(function () {
          swapIcon(copyBtn.querySelector('[data-icon-swap]'), 'check'); copyBtn.classList.add('is-done');
          haptic('success'); showToast('Coordinates copied');
          clearTimeout(copyTimer);
          copyTimer = setTimeout(function () { swapIcon(copyBtn.querySelector('[data-icon-swap]'), 'copy'); copyBtn.classList.remove('is-done'); }, 1600);
        }, function () { haptic('error'); showToast('Copy failed'); });
      });

      /* ---------- speed limit: range + dropdown presets ---------- */
      var range = $('speedRange'), speedLabel = $('speedLabel');
      var dd = document.querySelector('[data-dropdown]');
      var ddTrigger = dd.querySelector('[data-dropdown-trigger]');
      var ddMenu = dd.querySelector('[data-dropdown-menu]');
      var ddItems = [].slice.call(ddMenu.querySelectorAll('[data-speed]'));

      function applySpeed(v) {
        S.limit = v;
        speedLabel.textContent = v.toFixed(1) + ' m/s';
        range.style.setProperty('--p', ((v - 0.5) / 2 * 100) + '%');
        ddItems.forEach(function (it) {
          var on = Math.abs(parseFloat(it.getAttribute('data-speed')) - v) < 0.05;
          it.setAttribute('aria-checked', on ? 'true' : 'false');
          it.querySelector('.icon-swap-item').classList.toggle('is-on', on);
        });
        render();
      }
      range.addEventListener('input', function () { applySpeed(parseFloat(range.value)); });
      applySpeed(1.6);

      function ddIsOpen() { return ddMenu.getAttribute('data-open') === 'true'; }
      function ddSet(open, returnFocus) {
        ddMenu.setAttribute('data-open', open ? 'true' : 'false');
        ddTrigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        ddItems.forEach(function (it) { it.tabIndex = open ? 0 : -1; });
        if (open) {
          var sel = ddItems.filter(function (i) { return i.getAttribute('aria-checked') === 'true'; })[0] || ddItems[0];
          requestAnimationFrame(function () { sel.focus(); });
        } else if (returnFocus) { ddTrigger.focus(); }
      }
      ddTrigger.addEventListener('click', function () { ddSet(!ddIsOpen(), false); haptic('light'); });
      ddTrigger.addEventListener('keydown', function (e) { if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); ddSet(true, false); } });
      ddItems.forEach(function (item, idx) {
        item.addEventListener('click', function () {
          var v = parseFloat(item.getAttribute('data-speed'));
          range.value = v; applySpeed(v); haptic('light'); ddSet(false, true);
        });
        item.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowDown') { e.preventDefault(); ddItems[(idx + 1) % ddItems.length].focus(); }
          else if (e.key === 'ArrowUp') { e.preventDefault(); ddItems[(idx - 1 + ddItems.length) % ddItems.length].focus(); }
          else if (e.key === 'Tab') { ddSet(false, false); }
        });
      });
      document.addEventListener('click', function (e) { if (ddIsOpen() && !dd.contains(e.target)) ddSet(false, false); });

      /* ---------- modal ---------- */
      var modal = $('consoleModal'), modalPanel = modal.querySelector('.modal-panel'), modalOpener = null;
      var FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      function modalIsOpen() { return modal.getAttribute('data-open') === 'true'; }
      function modalOpen(opener) {
        modalOpener = opener || document.activeElement;
        modal.setAttribute('data-open', 'true'); modal.setAttribute('aria-hidden', 'false');
        if (lenis) lenis.stop(); else document.documentElement.style.overflow = 'hidden';
        haptic('light');
        requestAnimationFrame(function () { $('modalConfirm').focus(); });
      }
      function modalClose(restoreFocus) {
        modal.setAttribute('data-open', 'false'); modal.setAttribute('aria-hidden', 'true');
        if (lenis) lenis.start(); else document.documentElement.style.overflow = '';
        if (restoreFocus !== false && modalOpener && modalOpener.focus) modalOpener.focus();
      }
      document.querySelectorAll('[data-modal-open]').forEach(function (b) { b.addEventListener('click', function () { modalOpen(b); }); });
      modal.querySelectorAll('[data-modal-close]').forEach(function (b) { b.addEventListener('click', function () { modalClose(true); }); });
      $('modalConfirm').addEventListener('click', function () {
        modalClose(false); haptic('success'); showToast('Connected to ATLAS-01');
        var target = $('console');
        if (lenis) lenis.scrollTo(target, { offset: -24 });
        else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          if (modalIsOpen()) { e.preventDefault(); modalClose(true); }
          else if (ddIsOpen()) { e.preventDefault(); ddSet(false, true); }
          return;
        }
        if (e.key === 'Tab' && modalIsOpen()) {
          var nodes = [].slice.call(modalPanel.querySelectorAll(FOCUSABLE));
          if (!nodes.length) return;
          var first = nodes[0], last = nodes[nodes.length - 1];
          if (e.shiftKey && (document.activeElement === first || document.activeElement === modalPanel)) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });

      /* ---------- initial render ---------- */
      render(); renderObjectives(); applyCam(); moveGlide();

      /* ---------- masked word reveal ---------- */
      document.querySelectorAll('.reveal-line').forEach(function (line) {
        var words = line.textContent.trim().split(/\s+/);
        line.setAttribute('aria-label', words.join(' '));
        line.innerHTML = words.map(function (w) { return '<span class="word-mask" aria-hidden="true"><span class="word">' + w + '</span></span>'; }).join(' ');
      });

      if (reduced || !(window.gsap && window.ScrollTrigger)) { setMission(); return; }

      /* ---------- GSAP ScrollTrigger (all one-shots < 300ms) ---------- */
      gsap.registerPlugin(ScrollTrigger);
      gsap.config({ nullTargetWarn: false });
      var ease = 'expo.out';
      if (window.CustomEase) { gsap.registerPlugin(CustomEase); CustomEase.create('amicro', '0.16, 1, 0.3, 1'); ease = 'amicro'; }
      var ENTER = 0.25;

      gsap.from('.reveal-line .word', { yPercent: 110, duration: ENTER, ease: ease, delay: function (i) { return 0.05 + Math.min(i * 0.015, 0.05); } });

      gsap.utils.toArray('[data-fade]').forEach(function (el, i) {
        gsap.from(el, { y: 16, opacity: 0, duration: ENTER, ease: ease, delay: Math.min((i % 3) * 0.015, 0.05),
          scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
      });

      ScrollTrigger.create({ trigger: '#console', start: 'top 75%', once: true, onEnter: function () {
        setMission(); /* 0% → 7% via the bar's 250ms ease-out transition */
        gsap.from('.hud-left, .hud-right > *, .hud-nav', { opacity: 0, y: 10, duration: ENTER, ease: ease, stagger: 0.015, clearProps: 'all' });
      } });
    })();
  </script>
</body>
</html>

```
```types/rover.ts
export type RoverStatus =
  | 'docked'
  | 'navigating'
  | 'holding'
  | 'on-target'
  | 'scanning'
  | 'collecting'
  | 'returning'
  | 'transferring';

export interface RoverState {
  t: number;
  status: RoverStatus;
  speed: number;
  battery: number;
  odometer: number;
  motorTemp: number;
  speedLimit: number;
  scanned: boolean;
  samples: number;
  /** 0–1 dust coverage on the deck solar array. */
  panelDust: number;
  /** 0–1.4 drill heat; ≥ 1 overheats. */
  drillHeat: number;
  drillOverheated: boolean;
  /** Seconds left in an operator-requested cooling cycle. */
  drillCooling: number;
  reachedTarget: boolean;
  sampleDelivered: boolean;
  timer: number;
  speedHistory: number[];
  batteryHistory: number[];
}

export type ToastTone = 'ok' | 'warn' | 'info';

export interface ToastMessage {
  id: number;
  text: string;
  tone: ToastTone;
}

export interface MapPoint {
  x: number;
  z: number;
}

```
```utils/terrain.ts
function hash(x: number, z: number): number {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

export function valueNoise(x: number, z: number): number {
  const xi = Math.floor(x);
  const zi = Math.floor(z);
  const xf = x - xi;
  const zf = z - zi;
  const u = xf * xf * (3 - 2 * xf);
  const v = zf * zf * (3 - 2 * zf);
  const a = hash(xi, zi);
  const b = hash(xi + 1, zi);
  const c = hash(xi, zi + 1);
  const d = hash(xi + 1, zi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function smoothstep(a: number, b: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

const BASE_CENTER = { x: 16, z: 6 };

/** Ground height in meters at world (x, z). The base area is graded flat. North is −z. */
export function terrainHeight(x: number, z: number): number {
  let raw = 0;
  raw += (valueNoise(x * 0.028, z * 0.028) - 0.5) * 6;
  raw += (valueNoise(x * 0.09 + 13, z * 0.09 - 7) - 0.5) * 1.5;
  const fine = (valueNoise(x * 0.35 - 4, z * 0.35 + 9) - 0.5) * 0.22;
  const d = Math.hypot(x - BASE_CENTER.x, z - BASE_CENTER.z);
  const blend = smoothstep(24, 42, d);
  return raw * blend + fine;
}

```
```data/mission.ts
export const mission = {
  code: 'IX-7',
  site: 'Hesper Basin',
  siteName: 'Hesper Basin Site 2',
  sol: 48,
  coords: '22.61°S · 312.08°E',
  sector: 'Delta Ridge',
  sectorType: 'Layered sediments · C-012',
  route: 'Route 04-A',
  summary:
    'IX-7 HERMES is on the pad with ATLAS-01 at the service dock. Today’s plan: verify the lander, hot-fire the engines, and return a core from the layered outcrop in Sector 04.',
};

export const rover = {
  name: 'ARES-1',
  kind: 'Rover',
  description: 'Six-wheel science rover · Autonomous nav',
};

export const lander = {
  name: 'IX-7',
  kind: 'Hermes',
  description: 'Crew ascent vehicle · Methalox · 3 engines',
};

/** Fixed site positions in world meters. North is −z. */
export const sitePositions = {
  lander: { x: 0, z: 0 },
  dock: { x: 11, z: 4 },
  habitat: { x: 23, z: 6 },
  depot: { x: 18, z: 12 },
  tower: { x: 34, z: -3 },
  solar: { x: 36, z: 19 },
  sector: { x: 27, z: -37 },
  explorerCenter: { x: -26, z: -14 },
};

/** ATLAS-01 traverse from the service dock to the Sector 04 approach point. */
export const routeWaypoints: [number, number][] = [
  [11, 4],
  [12, -6],
  [17, -16],
  [21, -24],
  [24, -31],
];

/** CARGO-03 closed loop; the first point is the depot. */
export const cargoLoop: [number, number][] = [
  [18, 12],
  [26, 14],
  [30, 8],
  [27, 0],
  [18, 1],
  [14, 8],
];

export const sectorPosition = sitePositions.sector;

```
```utils/route.ts
import * as THREE from 'three';
import { routeWaypoints } from '../data/mission';
import { terrainHeight } from './terrain';

const curve = new THREE.CatmullRomCurve3(routeWaypoints.map(([x, z]) => new THREE.Vector3(x, 0, z)));

export const ROUTE_LENGTH = curve.getLength();

function clamp01(t: number): number {
  return Math.min(1, Math.max(0, t));
}

export function routePoint(t: number): THREE.Vector3 {
  const p = curve.getPointAt(clamp01(t));
  p.y = terrainHeight(p.x, p.z);
  return p;
}

export function routeTangent(t: number): THREE.Vector3 {
  const v = curve.getTangentAt(clamp01(t));
  v.y = 0;
  return v.normalize();
}

export function routeSamples(count: number): { x: number; z: number }[] {
  return Array.from({ length: count + 1 }, (_, i) => {
    const p = curve.getPointAt(i / count);
    return { x: p.x, z: p.z };
  });
}

```
```components/stage/MarsStage.tsx
import React, { useEffect, useRef } from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import * as THREE from 'three';
import { hotspots as hotspotDefs } from '../../data/hotspots';
import { sitePositions } from '../../data/mission';
import type { RegionDef } from '../../data/regions';
import type { CalloutId, CameraState, HotspotId, MissionState, PickId } from '../../types/mission';
import type { MapPoint } from '../../types/rover';
import { ROUTE_LENGTH, routePoint, routeTangent } from '../../utils/route';
import { buildBase } from '../../utils/scene/base';
import { desiredCamera } from '../../utils/scene/camera';
import { buildTacticalOverlay } from '../../utils/scene/tactical';
import { createDust } from '../../utils/scene/effects';
import { buildGround, buildMountains, buildRocks } from '../../utils/scene/ground';
import { disposeScene, freezeStatic } from '../../utils/scene/helpers';
import { buildLander } from '../../utils/scene/lander';
import { buildOutcrop, buildRoute } from '../../utils/scene/sector';
import { buildCargo, buildExplorer, buildRover } from '../../utils/scene/vehicles';
import { terrainHeight } from '../../utils/terrain';
import { cargoPose, explorerPose } from '../../utils/vehicles';

interface MarsStageProps {
  simRef: React.MutableRefObject<MissionState>;
  cameraRef: React.MutableRefObject<CameraState>;
  callouts: Partial<Record<CalloutId, React.ReactNode>>;
  /** Interactive part markers projected from the rover / lander rigs. */
  hotspots?: Partial<Record<HotspotId, React.ReactNode>>;
  onPick: (id: PickId) => void;
  onFlyTo: (p: MapPoint) => void;
  /** Region drives terrain palette, rock density, ridge height and sky. */
  region: RegionDef;
}

const CALLOUT_ORDER: CalloutId[] = ['sector', 'explorer', 'cargo', 'lander', 'rover'];

export function MarsStage({ simRef, cameraRef, callouts, hotspots = {}, onPick, onFlyTo, region }: MarsStageProps) {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<Partial<Record<CalloutId, HTMLDivElement | null>>>({});
  const hotRefs = useRef<Partial<Record<HotspotId, HTMLDivElement | null>>>({});
  const onPickRef = useRef(onPick);
  const onFlyRef = useRef(onFlyTo);
  onPickRef.current = onPick;
  onFlyRef.current = onFlyTo;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    const canvas = renderer.domElement;

    const scene = new THREE.Scene();
    const look$ = region.scene;
    const sky = new THREE.Color(look$.sky);
    scene.background = sky;
    scene.fog = new THREE.Fog(sky, 60, 340);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 8000);

    scene.add(new THREE.HemisphereLight('#ffe2c4', '#5a3424', 1.15));
    const sun = new THREE.DirectionalLight('#ffe3c2', 2.3);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -45, right: 45, top: 45, bottom: -45, far: 200 });
    sun.shadow.camera.updateProjectionMatrix();
    sun.shadow.bias = -0.0005;
    scene.add(sun, sun.target);

    const ground = buildGround(look$.ground);
    const base = buildBase();
    const statics = [ground, buildRocks(look$.rockCount, look$.rocks), buildMountains(look$.mountain, look$.mountainScale), base.group, buildRoute()];
    scene.add(...statics);
    const tactical = buildTacticalOverlay();
    scene.add(tactical.group);
    const clearSky = new THREE.Color(look$.sky);
    const stormSky = new THREE.Color(look$.stormSky);
    const outcrop = buildOutcrop();
    [...statics, outcrop.group].forEach(freezeStatic);
    const lander = buildLander();
    const lp = sitePositions.lander;
    const landerBase = new THREE.Vector3(lp.x, terrainHeight(lp.x, lp.z) + 0.1, lp.z);
    lander.root.position.copy(landerBase);
    const rover = buildRover();
    rover.group.rotation.order = 'YXZ';
    const cargo = buildCargo();
    const explorer = buildExplorer();
    const dust = createDust();
    dust.points.position.copy(landerBase);
    scene.add(outcrop.group, lander.root, rover.group, cargo.group, explorer.group, dust.points);

    lander.root.userData.pick = 'lander';
    rover.group.userData.pick = 'rover';
    cargo.group.userData.pick = 'cargo';
    explorer.group.userData.pick = 'explorer';
    outcrop.group.userData.pick = 'sector';
    const pickables: THREE.Object3D[] = [lander.root, rover.group, cargo.group, explorer.group, outcrop.group, ...base.pickables];

    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const aim = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
    };
    const pickAt = (e: MouseEvent): PickId | null => {
      aim(e);
      for (const hit of raycaster.intersectObjects(pickables, true)) {
        let o: THREE.Object3D | null = hit.object;
        while (o) {
          if (o.userData.pick) return o.userData.pick as PickId;
          o = o.parent;
        }
      }
      return null;
    };
    const onClick = (e: MouseEvent) => {
      const id = pickAt(e);
      if (id) onPickRef.current(id);
    };
    const onDbl = (e: MouseEvent) => {
      aim(e);
      const hit = raycaster.intersectObject(ground)[0];
      if (hit) onFlyRef.current({ x: hit.point.x, z: hit.point.z });
    };
    let hoverQueued = false;
    const onMove = (e: MouseEvent) => {
      if (hoverQueued) return;
      hoverQueued = true;
      requestAnimationFrame(() => {
        hoverQueued = false;
        canvas.style.cursor = pickAt(e) ? 'pointer' : 'default';
      });
    };
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('dblclick', onDbl);
    canvas.addEventListener('pointermove', onMove);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      renderer.setSize(w, h);
      camera.aspect = w / Math.max(1, h);
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    let displayT = simRef.current.rover.t;
    let yaw = 0;
    let first = true;
    let last = performance.now();
    const camPos = new THREE.Vector3();
    const camLook = new THREE.Vector3();
    const desired = new THREE.Vector3();
    const look = new THREE.Vector3();
    const tmp = new THREE.Vector3();
    const hotPos = new THREE.Vector3();
    const anchors: Record<CalloutId, { pos: THREE.Vector3; visible: boolean }> = {
      sector: { pos: outcrop.top.clone(), visible: true },
      explorer: { pos: new THREE.Vector3(), visible: true },
      cargo: { pos: new THREE.Vector3(), visible: true },
      lander: { pos: new THREE.Vector3(), visible: true },
      rover: { pos: new THREE.Vector3(), visible: true },
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const sim = simRef.current;
      const L = sim.lander;

      // Weather: storms darken the sky, pull the fog in and dim the solar field.
      const storm = sim.weather.intensity;
      sky.copy(clearSky).lerp(stormSky, storm);
      const fog = scene.fog as THREE.Fog;
      fog.color.copy(sky);
      fog.near = 60 - storm * 35;
      fog.far = 340 - storm * 200;
      base.panelMat.color.setScalar(Math.max(0.35, 1 - storm * 0.45 - sim.resources.arrayDust * 0.5));
      tactical.update(cameraRef.current.mode === 'tactical', sim.comms.open, sim.weather.phase !== 'clear');

      // Rover
      const prevT = displayT;
      displayT += (sim.rover.t - displayT) * Math.min(1, dt * 5);
      const p = routePoint(displayT);
      const tan = routeTangent(displayT);
      const face = sim.rover.status === 'returning' ? tan.clone().negate() : tan;
      const targetYaw = Math.atan2(face.x, face.z);
      if (first) yaw = targetYaw;
      const diff = Math.atan2(Math.sin(targetYaw - yaw), Math.cos(targetYaw - yaw));
      yaw += diff * Math.min(1, dt * 3);
      const fx = Math.sin(yaw);
      const fz = Math.cos(yaw);
      const pitch = Math.atan2(terrainHeight(p.x + fx, p.z + fz) - terrainHeight(p.x - fx, p.z - fz), 2);
      const roll = Math.atan2(terrainHeight(p.x + fz, p.z - fx) - terrainHeight(p.x - fz, p.z + fx), 2);
      const moving = sim.rover.status === 'navigating' || sim.rover.status === 'returning';
      rover.group.position.set(p.x, p.y + (moving ? Math.sin(now / 175) * 0.012 : 0), p.z);
      rover.group.rotation.set(-pitch, yaw, roll);
      const dist = Math.abs(displayT - prevT) * ROUTE_LENGTH;
      rover.wheels.forEach((w) => (w.rotation.x += dist / 0.36));
      if (rover.beacon) rover.beacon.visible = Math.floor(now / 600) % 2 === 0;
      anchors.rover.pos.set(p.x, p.y + 3.3, p.z);

      // Lander
      let bodyY = 0;
      let bodyX = 0;
      let tilt = 0;
      if (L.phase === 'hotfire') bodyY = L.hover;
      if (L.phase === 'ascent' || L.phase === 'departed') {
        bodyY = L.altitude;
        bodyX = L.downrange;
        tilt = -Math.min(0.45, L.phaseTime * 0.03);
      }
      lander.body.position.set(bodyX, bodyY, 0);
      lander.body.rotation.z = tilt;
      lander.legs.position.y = L.phase === 'hotfire' ? L.hover : 0;
      lander.body.visible = L.phase !== 'departed';
      const firing = L.enginesOn;
      lander.flame.visible = firing;
      lander.glow.visible = firing;
      if (firing) {
        const f = 0.85 + Math.random() * 0.3;
        const len = L.phase === 'ascent' ? 1.7 : L.phase === 'countdown' ? 1.1 : 0.85;
        lander.flame.scale.set(f, len * f, f);
        lander.glow.scale.setScalar(L.phase === 'ascent' ? 9 + L.altitude * 0.012 : 7);
        lander.light.intensity = 6 + Math.random() * 2;
      } else {
        lander.light.intensity = 0;
      }
      dust.update(dt, firing && bodyY < 30 ? 1 : 0);
      const rocketPos = new THREE.Vector3(landerBase.x + bodyX, landerBase.y + bodyY + 8, landerBase.z);
      anchors.lander.pos.set(landerBase.x + bodyX, landerBase.y + bodyY + 16.4, landerBase.z);
      anchors.lander.visible = L.phase !== 'departed' && bodyY < 80;

      // Fleet
      const cp = cargoPose(sim.vehicles.cargoU);
      cargo.group.position.set(cp.x, terrainHeight(cp.x, cp.z), cp.z);
      cargo.group.rotation.y = cp.yaw;
      if (sim.vehicles.cargoDwell <= 0) cargo.wheels.forEach((w) => (w.rotation.x += (2 * dt) / 0.45));
      anchors.cargo.pos.set(cp.x, cargo.group.position.y + 3.4, cp.z);
      const ep = explorerPose(sim.vehicles.explorerT);
      explorer.group.position.set(ep.x, terrainHeight(ep.x, ep.z), ep.z);
      explorer.group.rotation.y = ep.yaw;
      explorer.wheels.forEach((w) => (w.rotation.x += (0.6 * dt) / 0.28));
      if (explorer.beacon) explorer.beacon.visible = Math.floor(now / 800) % 2 === 0;
      anchors.explorer.pos.set(ep.x, explorer.group.position.y + 3, ep.z);

      // Camera
      const rate = desiredCamera(
        cameraRef.current,
        { roverPos: p, routeDir: tan, landerPos: landerBase, rocketPos, lander: L },
        desired,
        look
      );
      if (first) {
        camPos.copy(desired);
        camLook.copy(look);
        first = false;
      } else {
        const k = 1 - Math.exp(-dt * rate);
        camPos.lerp(desired, k);
        camLook.lerp(look, k);
      }
      camera.position.copy(camPos);
      camera.lookAt(camLook);

      const shadowCenter = tmp.set(camLook.x, 0, camLook.z);
      if (shadowCenter.distanceTo(landerBase) > 200) shadowCenter.copy(landerBase);
      sun.position.set(shadowCenter.x + 30, 50, shadowCenter.z + 12);
      sun.target.position.copy(shadowCenter);

      const w = container.clientWidth;
      const h = container.clientHeight;
      CALLOUT_ORDER.forEach((id) => {
        const el = tagRefs.current[id];
        if (!el) return;
        const v = tmp.copy(anchors[id].pos).project(camera);
        const visible = anchors[id].visible && v.z < 1 && Math.abs(v.x) < 1.1 && Math.abs(v.y) < 1.1;
        el.style.transform = `translate3d(${(((v.x + 1) / 2) * w).toFixed(1)}px, ${(((1 - v.y) / 2) * h).toFixed(1)}px, 0)`;
        el.style.opacity = visible ? '1' : '0';
      });

      rover.group.updateMatrixWorld();
      lander.root.updateMatrixWorld();
      const landerParked = lander.body.visible && bodyY < 1;
      hotspotDefs.forEach((def) => {
        const el = hotRefs.current[def.id];
        if (!el) return;
        hotPos.set(def.offset[0], def.offset[1], def.offset[2]);
        (def.vehicle === 'rover' ? rover.group : lander.body).localToWorld(hotPos);
        const v = hotPos.project(camera);
        const visible = (def.vehicle === 'rover' || landerParked) && v.z < 1 && Math.abs(v.x) < 0.98 && Math.abs(v.y) < 0.98;
        el.style.transform = `translate3d(${(((v.x + 1) / 2) * w).toFixed(1)}px, ${(((1 - v.y) / 2) * h).toFixed(1)}px, 0)`;
        el.style.opacity = visible ? '1' : '0';
        el.style.visibility = visible ? 'visible' : 'hidden';
      });

      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(frame);

    // Pause the render loop while the tab is hidden; resume without a dt spike.
    const onVisibility = () => {
      if (document.hidden) {
        renderer.setAnimationLoop(null);
      } else {
        last = performance.now();
        renderer.setAnimationLoop(frame);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      renderer.setAnimationLoop(null);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('dblclick', onDbl);
      canvas.removeEventListener('pointermove', onMove);
      disposeScene(scene);
      renderer.dispose();
      container.removeChild(canvas);
    };
  }, [simRef, cameraRef, region]);

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="absolute inset-0" aria-label={t.stage.view(t.regions[region.id].name)} role="img" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {CALLOUT_ORDER.map((id) =>
          callouts[id] ? (
            <div
              key={id}
              ref={(el) => {
                tagRefs.current[id] = el;
              }}
              className="absolute left-0 top-0 opacity-0 transition-opacity duration-200"
            >
              {callouts[id]}
            </div>
          ) : null
        )}
        {hotspotDefs.map((h) =>
          hotspots[h.id] ? (
            <div
              key={h.id}
              ref={(el) => {
                hotRefs.current[h.id] = el;
              }}
              className="invisible absolute left-0 top-0 z-[1] opacity-0 transition-[opacity,visibility] duration-200 focus-within:z-[2]"
            >
              {hotspots[h.id]}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

```
```components/stage/StageCallout.tsx
import React from 'react';

interface StageCalloutProps {
  stem: number;
  children: React.ReactNode;
}

/** On-stage label: content sits at the top of a 1px stem that ends in a dot at the anchor point. */
export function StageCallout({ stem, children }: StageCalloutProps) {
  return (
    <div className="relative">
      <span className="absolute -left-[3px] -top-[3px] h-[6px] w-[6px] rounded-full bg-ink shadow-[0_0_0_2px_rgba(0,0,0,0.25)]" />
      <span className="absolute left-0 w-px bg-ink-3" style={{ top: -stem, height: stem }} />
      <div className="stage-text absolute left-2 whitespace-nowrap" style={{ top: -stem - 4 }}>
        {children}
      </div>
    </div>
  );
}

```
```data/navigation.ts
import { ActivityIcon, ClipboardListIcon, CloudSunIcon, CompassIcon, LayoutGridIcon, MicroscopeIcon, SatelliteDishIcon, SettingsIcon } from 'lucide-react';
import type { GameView } from '../types/game';

export const navItems: { id: GameView; icon: typeof CompassIcon; key: string; dividerBefore?: boolean }[] = [
  { id: 'command', icon: LayoutGridIcon, key: '1' },
  { id: 'navigation', icon: CompassIcon, key: '2' },
  { id: 'science', icon: MicroscopeIcon, key: '3' },
  { id: 'systems', icon: ActivityIcon, key: '4' },
  { id: 'environment', icon: CloudSunIcon, key: '5' },
  { id: 'comms', icon: SatelliteDishIcon, key: '6' },
  { id: 'reports', icon: ClipboardListIcon, key: '7', dividerBefore: true },
  { id: 'settings', icon: SettingsIcon, key: '8' },
];

```
```components/stage/StageLabels.tsx
import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import { lander, rover } from '../../data/mission';
import type { LanderPhase } from '../../types/mission';
import type { RoverState } from '../../types/rover';
import { landerStatus, roverStatus, toneText } from '../../utils/status';
import { StageCallout } from './StageCallout';

export function RoverLabel({ state, showBattery }: { state: RoverState; showBattery: boolean }) {
  const meta = roverStatus(state.status);
  const moving = state.status === 'navigating' || state.status === 'returning';
  return (
    <StageCallout stem={showBattery ? 100 : 60}>
      <div className="text-[13px] font-semibold tracking-[0.02em] text-ink">
        {rover.name} <span className="ml-1 font-normal text-ink-3">{rover.kind}</span>
      </div>
      <div className={`mt-0.5 flex items-center gap-1.5 text-[10px] font-[550] uppercase tracking-[0.12em] ${toneText[meta.tone]}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {meta.label}
        {moving && ` · ${state.speed.toFixed(1)} m/s`}
      </div>
      {showBattery && (
        <div className="glass mt-2 flex w-[140px] items-center justify-between rounded-md px-2.5 py-1.5 text-[10px] font-[600] uppercase tracking-[0.12em] text-ink">
          Battery <span>{Math.round(state.battery)}%</span>
        </div>
      )}
    </StageCallout>
  );
}

/** Game-driven rover tag: name plus what ARES-1 is doing right now. */
export function RoverTag({ status, tone }: { status: string; tone: 'amber' | 'green' | 'neutral' | 'red' }) {
  const { t } = useI18n();
  const color = tone === 'amber' ? 'text-amber' : tone === 'green' ? 'text-green' : tone === 'red' ? 'text-red' : 'text-ink-3';
  return (
    <StageCallout stem={70}>
      <div className="text-[13px] font-semibold tracking-[0.04em] text-ink">
        {rover.name} <span className="ml-1 font-normal text-ink-3">{t.stage.roverKind}</span>
      </div>
      <div className={`mt-0.5 flex items-center gap-1.5 text-[10px] font-[550] uppercase tracking-[0.12em] ${color}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {status}
      </div>
    </StageCallout>
  );
}

export function LanderLabel({ phase }: { phase: LanderPhase }) {
  const meta = landerStatus(phase);
  return (
    <StageCallout stem={70}>
      <div className="text-[13px] font-semibold tracking-[0.04em] text-ink">
        {lander.name} <span className="ml-1 font-normal uppercase text-ink-3">{lander.kind}</span>
      </div>
      <div className={`mt-0.5 flex items-center gap-1.5 text-[10px] font-[550] uppercase tracking-[0.12em] ${toneText[meta.tone]}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {meta.label}
      </div>
    </StageCallout>
  );
}

export function SectorLabel() {
  const { t } = useI18n();
  return (
    <StageCallout stem={64}>
      <div className="text-[12px] font-semibold text-ink">{t.stage.ridge}</div>
      <div className="mt-0.5 flex items-center gap-1.5 text-[10px] font-[550] uppercase tracking-[0.12em] text-ink-3">
        <span className="h-1.5 w-1.5 rounded-full bg-ink-3" />
        {t.stage.ridgeType}
      </div>
    </StageCallout>
  );
}

export function VehicleLabel({ name }: { name: string }) {
  return (
    <StageCallout stem={32}>
      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink">{name}</div>
    </StageCallout>
  );
}

```
```types/mission.ts
import type { MapPoint, RoverState, ToastTone } from './rover';

export type LanderPhase = 'standby' | 'checking' | 'checked' | 'hotfire' | 'ready' | 'countdown' | 'ascent' | 'departed';

export interface LanderState {
  phase: LanderPhase;
  phaseTime: number;
  checkIndex: number;
  hover: number;
  countdown: number;
  altitude: number;
  velocity: number;
  downrange: number;
  maxQ: boolean;
  enginesOn: boolean;
  tankPressure: number;
  engineTemp: number;
  peakAltitude: number;
  peakVelocity: number;
}

export interface Resources {
  /** Base battery state of charge, %. */
  power: number;
  propellant: number;
  oxygen: number;
  water: number;
  /** Solar field generation, kW. */
  solarKw: number;
  /** Generation minus load, kW. */
  netKw: number;
  /** 0–1 dust cover on the base solar field. */
  arrayDust: number;
}

export interface Environment {
  temp: number;
  wind: number;
  pressure: number;
  dust: number;
  irradiance: number;
  radiation: number;
}

export interface Vehicles {
  cargoU: number;
  cargoDwell: number;
  explorerT: number;
}

/** Earth link windows: commands only uplink while `open`; otherwise they queue. */
export interface CommsState {
  enabled: boolean;
  open: boolean;
  /** Seconds left in the current open/closed window. */
  remaining: number;
  /** 0–1 signal quality while open. */
  strength: number;
  /** 0–1 high-gain antenna pointing calibration; drifts down over time. */
  calibration: number;
}

export type WeatherPhase = 'clear' | 'warning' | 'storm';

export interface WeatherState {
  phase: WeatherPhase;
  /** Seconds left in the current phase. */
  timer: number;
  /** Total length of the current phase, seconds. */
  duration: number;
  /** 0–1 storm strength (0 outside storms). */
  intensity: number;
}

export type FaultSystem = 'drill' | 'rover-power' | 'base-power' | 'antenna';

export interface Fault {
  id: number;
  system: FaultSystem;
  title: string;
  severity: 'warn' | 'critical';
  at: number;
  resolvedAt: number | null;
}

/** Commands the dock / hotspots can issue. Only some can be queued for uplink. */
export type CommandKind =
  | 'move'
  | 'scan'
  | 'collect'
  | 'return'
  | 'check'
  | 'hotfire'
  | 'clean'
  | 'cooldown'
  | 'calibrate'
  | 'stop'
  | 'launch';

export type CommandOutcome = 'executed' | 'queued' | 'rejected';

export interface QueuedCommand {
  id: number;
  kind: CommandKind;
}

export interface CommandRecord {
  id: number;
  kind: CommandKind;
  outcome: CommandOutcome;
  detail: string;
  at: number;
  /** Issued while a dust storm was active. */
  inStorm: boolean;
}

export interface MissionState {
  rover: RoverState;
  lander: LanderState;
  resources: Resources;
  env: Environment;
  vehicles: Vehicles;
  comms: CommsState;
  weather: WeatherState;
  faults: Fault[];
  queue: QueuedCommand[];
  commandLog: CommandRecord[];
  elapsed: number;
  startOdometer: number;
  startPropellant: number;
}

export type JournalCategory = 'command' | 'telemetry' | 'comms' | 'warning' | 'mission';
export type JournalStatus = 'success' | 'waiting' | 'error';

export interface JournalEntry {
  id: number;
  utc: string;
  lmst: string;
  source: string;
  category: JournalCategory;
  status: JournalStatus;
  title: string;
  detail: string;
  target?: MapPoint;
}

export type LogInput = Omit<JournalEntry, 'id' | 'utc' | 'lmst' | 'status'> & { status?: JournalStatus };

export interface SimEvent {
  toast?: { text: string; tone: ToastTone };
  log?: LogInput;
}

export type ViewId = 'overview' | 'spacecraft' | 'rover' | 'systems' | 'journal';
export type CameraMode = 'site' | 'tactical' | 'atlas';
export type CalloutId = 'lander' | 'rover' | 'cargo' | 'explorer' | 'sector';
export type PickId = CalloutId | 'habitat' | 'tower' | 'solar' | 'dock';
export type ObjectiveState = 'complete' | 'active' | 'open' | 'blocked';
export type HotspotId = 'drill' | 'solar' | 'navcam' | 'engine' | 'antenna' | 'airlock';
export type BentoTab = 'live' | 'capabilities';

export interface CameraState {
  mode: CameraMode;
  zoom: number;
  focus: MapPoint | null;
  frame: 'base' | 'lander';
}

```
```data/launch.ts
export const checkSubsystems = [
  { name: 'Avionics', detail: 'Flight computers A/B in sync' },
  { name: 'Power', detail: 'Bus 28.1 V · batteries nominal' },
  { name: 'Propulsion', detail: 'CH₄ / LOX tanks pressurised' },
  { name: 'Comms', detail: 'X-band lock · relay TGO-2' },
  { name: 'Life support', detail: 'Cabin 101 kPa · O₂ nominal' },
  { name: 'GNC', detail: 'IMU aligned · star tracker lock' },
];

export const CHECK_STEP = 0.85;
export const HOTFIRE_DURATION = 7.5;
export const HOTFIRE_ENGINE_OFF = 7;
export const COUNTDOWN_START = 10;
export const ASCENT_DURATION = 14;

export const countdownMilestones = [
  { t: 10, label: 'Terminal count' },
  { t: 6, label: 'Ignition sequence start' },
  { t: 3, label: 'Engines to full thrust' },
  { t: 0, label: 'Liftoff' },
];

```
```utils/time.ts
const SESSION_START = Date.now();
const LMST_START_MINUTES = 15 * 60 + 48;

export function utcString(d: Date = new Date()): string {
  return d.toISOString().slice(11, 19);
}

export function lmstString(d: Date = new Date()): string {
  const minutes = LMST_START_MINUTES + Math.floor((d.getTime() - SESSION_START) / 61650);
  return `${String(Math.floor(minutes / 60) % 24).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}

export function formatDuration(seconds: number): string {
  const s = Math.floor(seconds);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

```
```utils/vehicles.ts
import * as THREE from 'three';
import { cargoLoop, sitePositions } from '../data/mission';

const loop = new THREE.CatmullRomCurve3(
  cargoLoop.map(([x, z]) => new THREE.Vector3(x, 0, z)),
  true
);

export const CARGO_LOOP_LENGTH = loop.getLength();

export interface Pose {
  x: number;
  z: number;
  yaw: number;
}

export function cargoPose(u: number): Pose {
  const w = ((u % 1) + 1) % 1;
  const p = loop.getPointAt(w);
  const tan = loop.getTangentAt(w);
  return { x: p.x, z: p.z, yaw: Math.atan2(tan.x, tan.z) };
}

export function explorerPose(t: number): Pose {
  const c = sitePositions.explorerCenter;
  const a = t * 0.035;
  const x = c.x + Math.cos(a) * 14;
  const z = c.z + Math.sin(a * 1.6) * 6;
  const dx = -Math.sin(a) * 14;
  const dz = Math.cos(a * 1.6) * 6 * 1.6;
  return { x, z, yaw: Math.atan2(dx, dz) };
}

```
```utils/sim/rover.ts
import { sitePositions } from '../../data/mission';
import type { SimEvent } from '../../types/mission';
import type { RoverState } from '../../types/rover';
import { ROUTE_LENGTH } from '../route';

/** Heat at which the drill trips and the temperature it must fall back to. */
export const DRILL_TRIP = 1;
export const DRILL_RESET = 0.35;
const COOL_RATE = 0.035;
const COOL_RATE_CYCLE = 0.12;

export function createRover(): RoverState {
  return {
    t: 0,
    status: 'docked',
    speed: 0,
    battery: 95.3,
    odometer: 1284.6,
    motorTemp: -14,
    speedLimit: 1.6,
    scanned: false,
    samples: 0,
    panelDust: 0.34,
    drillHeat: 0,
    drillOverheated: false,
    drillCooling: 0,
    reachedTarget: false,
    sampleDelivered: false,
    timer: 0,
    speedHistory: Array.from({ length: 48 }, () => 0),
    batteryHistory: Array.from({ length: 48 }, (_, i) => 91 + i * 0.09),
  };
}

export function isRoverMoving(r: RoverState): boolean {
  return r.status === 'navigating' || r.status === 'returning';
}

export function isRoverBusy(r: RoverState): boolean {
  return r.status === 'scanning' || r.status === 'collecting' || r.status === 'transferring';
}

/** Seconds until the drill is usable again at the current cooling rate. */
export function drillCooldownSeconds(r: RoverState): number {
  const rate = r.drillCooling > 0 ? COOL_RATE_CYCLE : COOL_RATE;
  return Math.max(1, Math.ceil((r.drillHeat - DRILL_RESET) / rate));
}

export function stepRover(prev: RoverState, dt: number, storm = 0): { next: RoverState; events: SimEvent[] } {
  const s: RoverState = { ...prev };
  const events: SimEvent[] = [];
  const moving = isRoverMoving(s);
  const target = moving ? s.speedLimit * 0.88 * (1 - 0.25 * storm) + (Math.random() - 0.5) * 0.12 : 0;
  s.speed += (target - s.speed) * Math.min(1, dt * 3);
  if (!moving && s.speed < 0.02) s.speed = 0;
  const dist = moving ? s.speed * dt : 0;

  if (s.status === 'navigating') {
    s.t = Math.min(1, s.t + dist / ROUTE_LENGTH);
    if (s.t >= 1) {
      s.status = 'on-target';
      s.reachedTarget = true;
      events.push({
        toast: { text: 'Arrived at Sector 04 · ready to scan', tone: 'ok' },
        log: {
          source: 'ATLAS-01',
          category: 'telemetry',
          title: 'Arrived at Sector 04',
          detail: `Layered outcrop in range · battery ${s.battery.toFixed(1)}%`,
          target: sitePositions.sector,
        },
      });
    }
  } else if (s.status === 'returning') {
    s.t = Math.max(0, s.t - dist / ROUTE_LENGTH);
    if (s.t <= 0) {
      if (s.samples > 0 && !s.sampleDelivered) {
        s.status = 'transferring';
        s.timer = 2.2;
        events.push({
          toast: { text: 'Docked · transferring sample to IX-7', tone: 'info' },
          log: {
            source: 'ATLAS-01',
            category: 'telemetry',
            status: 'waiting',
            title: 'Docked at service bay',
            detail: `Transferring ${s.samples} core${s.samples > 1 ? 's' : ''} to IX-7`,
            target: sitePositions.dock,
          },
        });
      } else {
        s.status = 'docked';
        events.push({
          toast: { text: 'ATLAS-01 docked · charging', tone: 'ok' },
          log: {
            source: 'ATLAS-01',
            category: 'telemetry',
            title: 'Rover docked · charging',
            detail: `Battery ${s.battery.toFixed(1)}%`,
            target: sitePositions.dock,
          },
        });
      }
    }
  }

  s.odometer += dist;
  s.panelDust = Math.min(0.9, s.panelDust + dist * 0.0012 + dt * (0.00015 + 0.004 * storm));
  if (s.status === 'docked') s.battery = Math.min(100, s.battery + dt * 0.04 * (1 - s.panelDust * 0.6) * (1 - 0.6 * storm));
  else s.battery = Math.max(0, s.battery - dist * 0.004 - dt * 0.0012 - (isRoverBusy(s) ? dt * 0.012 : 0));
  s.motorTemp += (-14 + s.speed * 9 - s.motorTemp) * dt * 0.2;

  // Drill thermal model: coring heats, everything else cools (faster during a cooling cycle).
  if (s.status === 'collecting') s.drillHeat += dt * 0.3;
  else s.drillHeat = Math.max(0, s.drillHeat - dt * (s.drillCooling > 0 ? COOL_RATE_CYCLE : COOL_RATE));
  s.drillCooling = Math.max(0, s.drillCooling - dt);

  if (isRoverBusy(s)) {
    s.timer -= dt;
    if (s.timer <= 0) {
      if (s.status === 'scanning') {
        s.scanned = true;
        s.status = 'on-target';
        events.push({
          toast: { text: 'Scan complete · coring target identified', tone: 'ok' },
          log: {
            source: 'ATLAS-01',
            category: 'telemetry',
            title: 'Outcrop scan complete',
            detail: 'Coring target in the lower sulfate layer',
            target: sitePositions.sector,
          },
        });
      } else if (s.status === 'collecting') {
        s.samples += 1;
        s.status = 'on-target';
        events.push({
          toast: { text: `Core 0${s.samples} sealed in cache`, tone: 'ok' },
          log: {
            source: 'ATLAS-01',
            category: 'telemetry',
            title: `Core 0${s.samples} sealed`,
            detail: `Sample cache ${s.samples}/3 · drill ${Math.round(s.drillHeat * 100)}% heat`,
            target: sitePositions.sector,
          },
        });
      } else {
        s.sampleDelivered = true;
        s.status = 'docked';
        events.push({
          toast: { text: 'Sample transferred to IX-7', tone: 'ok' },
          log: {
            source: 'IX-7',
            category: 'mission',
            title: 'Sample transferred · airlock sealed',
            detail: `${s.samples} core${s.samples > 1 ? 's' : ''} secured for ascent`,
            target: sitePositions.lander,
          },
        });
      }
    }
  }

  if (!s.drillOverheated && s.drillHeat >= DRILL_TRIP) s.drillOverheated = true;
  else if (s.drillOverheated && s.drillHeat <= DRILL_RESET) s.drillOverheated = false;
  return { next: s, events };
}

```
```utils/sim/lander.ts
import { ASCENT_DURATION, CHECK_STEP, COUNTDOWN_START, HOTFIRE_DURATION, HOTFIRE_ENGINE_OFF, checkSubsystems } from '../../data/launch';
import { sitePositions } from '../../data/mission';
import type { LanderState, SimEvent } from '../../types/mission';

export function createLander(): LanderState {
  return {
    phase: 'standby',
    phaseTime: 0,
    checkIndex: 0,
    hover: 0,
    countdown: COUNTDOWN_START,
    altitude: 0,
    velocity: 0,
    downrange: 0,
    maxQ: false,
    enginesOn: false,
    tankPressure: 2.41,
    engineTemp: -21,
    peakAltitude: 0,
    peakVelocity: 0,
  };
}

export function isLanderBusy(l: LanderState): boolean {
  return l.phase === 'hotfire' || l.phase === 'countdown' || l.phase === 'ascent';
}

function ease(x: number): number {
  const t = Math.min(1, Math.max(0, x));
  return t * t * (3 - 2 * t);
}

function hoverProfile(t: number): number {
  if (t < 1.5) return 0;
  if (t < 3.5) return 3 * ease((t - 1.5) / 2);
  if (t < 5) return 3;
  return 3 * (1 - ease((t - 5) / 1.8));
}

const at = sitePositions.lander;

/** `countHold` true holds the terminal count (link lost or critical fault). */
export function stepLander(prev: LanderState, dt: number, countHold = false): { next: LanderState; events: SimEvent[] } {
  const l: LanderState = { ...prev };
  const events: SimEvent[] = [];
  const before = l.phaseTime;
  l.phaseTime += dt;

  switch (l.phase) {
    case 'checking': {
      l.checkIndex = Math.min(checkSubsystems.length, Math.floor(l.phaseTime / CHECK_STEP));
      if (l.checkIndex >= checkSubsystems.length) {
        l.phase = 'checked';
        l.phaseTime = 0;
        events.push({
          toast: { text: 'Systems check complete · hot-fire unlocked', tone: 'ok' },
          log: { source: 'IX-7', category: 'telemetry', title: 'Systems check complete', detail: '6/6 subsystems nominal', target: at },
        });
      }
      break;
    }
    case 'hotfire': {
      l.hover = hoverProfile(l.phaseTime);
      l.enginesOn = l.phaseTime < HOTFIRE_ENGINE_OFF;
      if (l.phaseTime >= HOTFIRE_DURATION) {
        l.phase = 'ready';
        l.phaseTime = 0;
        l.hover = 0;
        l.enginesOn = false;
        events.push({
          toast: { text: 'Hot-fire & hover nominal', tone: 'ok' },
          log: {
            source: 'IX-7',
            category: 'telemetry',
            title: 'Propulsion hot-fire & hover complete',
            detail: 'Peak hover 3.0 m · 3/3 engines nominal',
            target: at,
          },
        });
      }
      break;
    }
    case 'countdown': {
      if (countHold) break;
      const prevC = l.countdown;
      l.countdown = Math.max(0, l.countdown - dt);
      if (prevC > 6 && l.countdown <= 6) {
        events.push({ log: { source: 'IX-7', category: 'telemetry', title: 'T-6 · ignition sequence start', detail: 'Turbopumps spinning up', target: at } });
      }
      if (prevC > 3 && l.countdown <= 3) {
        l.enginesOn = true;
        events.push({ log: { source: 'IX-7', category: 'telemetry', title: 'T-3 · engines to full thrust', detail: '3/3 engines at 100%', target: at } });
      }
      if (l.countdown <= 0) {
        l.phase = 'ascent';
        l.phaseTime = 0;
        l.enginesOn = true;
        events.push({
          toast: { text: 'Liftoff · IX-7 Hermes', tone: 'ok' },
          log: { source: 'IX-7', category: 'mission', title: 'Liftoff', detail: 'IX-7 Hermes has cleared the pad', target: at },
        });
      }
      break;
    }
    case 'ascent': {
      const t = l.phaseTime;
      l.altitude = 3 * t * t + 0.6 * t * t * t;
      l.velocity = 6 * t + 1.8 * t * t;
      l.downrange = 0.05 * t * t * t;
      l.maxQ = t > 5 && t < 8;
      l.peakAltitude = Math.max(l.peakAltitude, l.altitude);
      l.peakVelocity = Math.max(l.peakVelocity, l.velocity);
      if (before < 5 && t >= 5) {
        events.push({ log: { source: 'IX-7', category: 'telemetry', title: 'Max-Q', detail: 'Structural loads nominal · throttling to 72%' } });
      }
      if (t >= ASCENT_DURATION) {
        l.phase = 'departed';
        l.enginesOn = false;
        l.maxQ = false;
        events.push({
          toast: { text: 'IX-7 en route to orbit', tone: 'ok' },
          log: {
            source: 'IX-7',
            category: 'mission',
            title: 'Loss of signal · en route to orbit',
            detail: `Altitude ${(l.altitude / 1000).toFixed(2)} km · ${Math.round(l.velocity)} m/s`,
          },
        });
      }
      break;
    }
    default:
      break;
  }

  const pressureTarget = l.phase === 'countdown' || l.phase === 'ascent' || l.phase === 'hotfire' ? 2.92 : 2.41;
  l.tankPressure += (pressureTarget - l.tankPressure) * Math.min(1, dt * 0.8);
  const tempTarget = l.enginesOn ? 1180 : -21;
  l.engineTemp += (tempTarget - l.engineTemp) * Math.min(1, dt * (l.enginesOn ? 1.4 : 0.15));
  return { next: l, events };
}

```
```utils/sim/mission.ts
import { sitePositions } from '../../data/mission';
import type { Fault, MissionState, SimEvent } from '../../types/mission';
import { CARGO_LOOP_LENGTH } from '../vehicles';
import { formatDuration } from '../time';
import { LINK_CLOSED_S, createComms, stepComms, type CommsChange } from './comms';
import { activeFault, openFault, resolveFault } from './faults';
import { createLander, isLanderBusy, stepLander } from './lander';
import { LOW_RESERVE, baseLoadKw, solarFieldKw, stepPower } from './power';
import { createRover, isRoverMoving, stepRover } from './rover';
import { STORM_WARNING_S, createWeather, stepWeather } from './weather';

export function createMission(commsEnabled = true): MissionState {
  const arrayDust = 0.14;
  const rover = createRover();
  const lander = createLander();
  const solarKw = solarFieldKw(175, arrayDust);
  return {
    rover,
    lander,
    resources: { power: 78.4, propellant: 61, oxygen: 92, water: 64, solarKw, netKw: solarKw - baseLoadKw(lander, rover), arrayDust },
    env: { temp: -16.2, wind: 6.6, pressure: 0.619, dust: 0.54, irradiance: 175, radiation: 10 },
    vehicles: { cargoU: 0.15, cargoDwell: 0, explorerT: 0 },
    comms: createComms(commsEnabled),
    weather: createWeather(),
    faults: [],
    queue: [],
    commandLog: [],
    elapsed: 0,
    startOdometer: 1284.6,
    startPropellant: 61,
  };
}

const COMMS_INTERVAL = 75;
const ENV_INTERVAL = 110;

/** Opens/resolves a fault from a condition and reports the transition. */
function track(
  faults: Fault[],
  events: SimEvent[],
  at: number,
  cond: { system: Fault['system']; active: boolean; clear: boolean; title: string; severity: Fault['severity']; source: string },
  messages: { open: string; resolved: string; openDetail: string; resolvedDetail: string }
): Fault[] {
  if (cond.active) {
    const r = openFault(faults, cond.system, cond.title, cond.severity, at);
    if (r.opened) {
      events.push({
        toast: { text: messages.open, tone: 'warn' },
        log: { source: cond.source, category: 'warning', status: 'error', title: cond.title, detail: messages.openDetail },
      });
    }
    return r.faults;
  }
  if (cond.clear) {
    const r = resolveFault(faults, cond.system, at);
    if (r.resolved) {
      events.push({
        toast: { text: messages.resolved, tone: 'ok' },
        log: { source: cond.source, category: 'warning', status: 'success', title: `${cond.title} · resolved`, detail: messages.resolvedDetail },
      });
    }
    return r.faults;
  }
  return faults;
}

export function stepMission(prev: MissionState, dt: number): { next: MissionState; events: SimEvent[]; commsChange: CommsChange } {
  const events: SimEvent[] = [];
  const elapsed = prev.elapsed + dt;

  // Weather
  const weatherRes = stepWeather(prev.weather, dt);
  const weather = weatherRes.next;
  const storm = weather.intensity;
  if (weatherRes.change === 'warning') {
    events.push({
      toast: { text: `Dust front inbound · storm in ${STORM_WARNING_S} s`, tone: 'warn' },
      log: { source: 'ENV', category: 'warning', status: 'waiting', title: 'Dust front inbound', detail: 'Expect reduced solar output and link quality' },
    });
  } else if (weatherRes.change === 'storm') {
    events.push({
      toast: { text: 'Dust storm · solar output and link degraded', tone: 'warn' },
      log: {
        source: 'ENV',
        category: 'warning',
        status: 'waiting',
        title: 'Dust storm over Hesper Basin',
        detail: `Expected ${Math.round(weather.duration)} s · weather NO-GO for launch`,
      },
    });
  } else if (weatherRes.change === 'cleared') {
    events.push({
      toast: { text: 'Storm cleared · systems recovering', tone: 'ok' },
      log: { source: 'ENV', category: 'warning', status: 'success', title: 'Dust storm cleared', detail: 'Visibility and irradiance recovering' },
    });
  }

  // Comms
  const commsRes = stepComms(prev.comms, dt, storm);
  const comms = commsRes.next;
  if (commsRes.change === 'closed') {
    const counting = prev.lander.phase === 'countdown';
    events.push({
      toast: counting
        ? { text: `Link lost · count holding at T-${Math.ceil(prev.lander.countdown)}`, tone: 'warn' }
        : prev.queue.length
          ? undefined
          : { text: `Loss of signal · commands will queue for ${formatDuration(LINK_CLOSED_S)}`, tone: 'info' },
      log: {
        source: 'GROUND',
        category: 'comms',
        status: 'waiting',
        title: 'Loss of signal · relay TGO-2 below horizon',
        detail: `Next window in ${formatDuration(comms.remaining)}`,
      },
    });
  } else if (commsRes.change === 'opened') {
    events.push({
      toast: prev.lander.phase === 'countdown' ? { text: 'Link acquired · count resuming', tone: 'ok' } : undefined,
      log: {
        source: 'GROUND',
        category: 'comms',
        title: 'Acquisition of signal · relay TGO-2',
        detail: prev.queue.length ? `Uplinking ${prev.queue.length} queued command${prev.queue.length > 1 ? 's' : ''}` : 'Uplink open',
      },
    });
  }

  // Lander — terminal count holds on lost link or a critical power fault.
  const powerCritical = !!activeFault(prev.faults, 'base-power');
  const landerRes = stepLander(prev.lander, dt, !comms.open || powerCritical);
  const lander = landerRes.next;
  events.push(...landerRes.events);

  let rover = prev.rover;
  if (isLanderBusy(lander) && isRoverMoving(rover)) {
    rover = { ...rover, status: 'holding' };
    events.push({
      toast: { text: 'ATLAS-01 holding · IX-7 propulsion active', tone: 'warn' },
      log: { source: 'ATLAS-01', category: 'telemetry', status: 'waiting', title: 'Traverse paused', detail: 'Holding for IX-7 propulsion activity' },
    });
  }
  const roverRes = stepRover(rover, dt, storm);
  events.push(...roverRes.events);

  // Environment
  const env = {
    ...prev.env,
    temp: -16.2 + Math.sin(elapsed * 0.01) * 0.8 - storm * 2.5,
    wind: 6.6 + Math.sin(elapsed * 0.13) * 0.7 + (Math.random() - 0.5) * 0.2 + storm * 12,
    irradiance: (175 + Math.sin(elapsed * 0.02) * 6) * (1 - 0.6 * storm),
    dust: 0.54 + Math.sin(elapsed * 0.004) * 0.05 + storm * 0.9,
  };

  // Power
  const res = { ...prev.resources };
  res.arrayDust = Math.min(0.7, Math.max(0.12, res.arrayDust + dt * (0.004 * storm - 0.0015 * (1 - storm))));
  res.solarKw = solarFieldKw(env.irradiance, res.arrayDust);
  res.netKw = res.solarKw - baseLoadKw(lander, roverRes.next);
  res.power = stepPower(res.power, res.netKw, dt);
  if (lander.enginesOn) res.propellant = Math.max(0, res.propellant - dt * (lander.phase === 'ascent' ? 2.4 : 0.85));
  res.oxygen = Math.max(0, res.oxygen - dt * 0.0008);

  // Faults
  const r = roverRes.next;
  let faults = prev.faults;
  faults = track(
    faults,
    events,
    elapsed,
    { system: 'drill', active: r.drillOverheated, clear: !r.drillOverheated, title: 'Drill overheated', severity: 'critical', source: 'ATLAS-01' },
    {
      open: 'Drill overheated · coring blocked',
      resolved: 'Drill cooled · coring available',
      openDetail: `Bit heat ${Math.round(r.drillHeat * 100)}% · let it cool or run Inspect Drill`,
      resolvedDetail: 'Bit temperature within limits',
    }
  );
  faults = track(
    faults,
    events,
    elapsed,
    {
      system: 'rover-power',
      active: r.battery < LOW_RESERVE,
      clear: r.battery > LOW_RESERVE + 5,
      title: 'ATLAS-01 low power reserve',
      severity: 'warn',
      source: 'ATLAS-01',
    },
    {
      open: 'Low power reserve · return ATLAS-01 to dock',
      resolved: 'ATLAS-01 reserve restored',
      openDetail: `Battery ${r.battery.toFixed(1)}% · drive and science locked`,
      resolvedDetail: `Battery ${r.battery.toFixed(1)}%`,
    }
  );
  faults = track(
    faults,
    events,
    elapsed,
    { system: 'base-power', active: res.power < 25, clear: res.power > 30, title: 'Base power low', severity: 'critical', source: 'IX-7' },
    {
      open: 'Base power low · launch power NO-GO',
      resolved: 'Base power recovered',
      openDetail: `${res.power.toFixed(1)}% · net ${res.netKw.toFixed(2)} kW`,
      resolvedDetail: `${res.power.toFixed(1)}%`,
    }
  );
  faults = track(
    faults,
    events,
    elapsed,
    {
      system: 'antenna',
      active: comms.calibration < 0.55,
      clear: comms.calibration >= 0.9,
      title: 'High-gain antenna drift',
      severity: 'warn',
      source: 'IX-7',
    },
    {
      open: 'Antenna drift · calibrate to restore signal',
      resolved: 'Antenna calibrated',
      openDetail: `Pointing ${Math.round(comms.calibration * 100)}% · signal degraded`,
      resolvedDetail: 'Pointing 100%',
    }
  );
  if (lander.phase === 'countdown' && !powerCritical && activeFault(faults, 'base-power')) {
    events.push({ toast: { text: `Count holding at T-${Math.ceil(lander.countdown)} · power fault`, tone: 'warn' } });
  }

  // Fleet
  const veh = { ...prev.vehicles, explorerT: prev.vehicles.explorerT + dt };
  if (veh.cargoDwell > 0) {
    veh.cargoDwell = Math.max(0, veh.cargoDwell - dt);
  } else {
    veh.cargoU += (2 * dt) / CARGO_LOOP_LENGTH;
    if (veh.cargoU >= 1) {
      veh.cargoU -= 1;
      veh.cargoDwell = 12;
      res.water = Math.min(100, res.water + 0.4);
      events.push({
        log: {
          source: 'CARGO-03',
          category: 'telemetry',
          title: 'Arrived at depot — consumables transfer',
          detail: '412 kg · water, N₂, spares',
          target: sitePositions.depot,
        },
      });
    }
  }

  if (comms.open && Math.floor(elapsed / COMMS_INTERVAL) > Math.floor(prev.elapsed / COMMS_INTERVAL)) {
    events.push({
      log: {
        source: 'GROUND',
        category: 'comms',
        title: 'Telemetry downlink — relay TGO-2',
        detail: `${Math.round(comms.strength * 100)}% signal · ${150 + Math.round(Math.random() * 20)} ms`,
      },
    });
  }
  if (Math.floor(elapsed / ENV_INTERVAL) > Math.floor(prev.elapsed / ENV_INTERVAL)) {
    events.push({
      log: {
        source: 'ENV',
        category: 'telemetry',
        title: 'Weather update',
        detail: `Dust τ ${env.dust.toFixed(2)} · wind ${env.wind.toFixed(1)} m/s · ${env.temp.toFixed(1)} °C`,
      },
    });
  }

  return {
    next: { ...prev, lander, rover: r, resources: res, env, vehicles: veh, comms, weather, faults, elapsed },
    events,
    commsChange: commsRes.change,
  };
}

```
```utils/status.ts
import type { LanderPhase } from '../types/mission';
import type { RoverStatus } from '../types/rover';

export type Tone = 'amber' | 'green' | 'blue' | 'plain';

export interface StatusMeta {
  label: string;
  tone: Tone;
  live: boolean;
}

const ROVER: Record<RoverStatus, StatusMeta> = {
  docked: { label: 'Docked', tone: 'green', live: false },
  navigating: { label: 'Navigating', tone: 'amber', live: true },
  returning: { label: 'Returning', tone: 'amber', live: true },
  holding: { label: 'Holding', tone: 'plain', live: false },
  'on-target': { label: 'On target', tone: 'green', live: false },
  scanning: { label: 'Scanning', tone: 'blue', live: true },
  collecting: { label: 'Coring', tone: 'blue', live: true },
  transferring: { label: 'Transferring', tone: 'blue', live: true },
};

const LANDER: Record<LanderPhase, StatusMeta> = {
  standby: { label: 'Standby', tone: 'green', live: false },
  checking: { label: 'Systems check', tone: 'blue', live: true },
  checked: { label: 'Checked', tone: 'green', live: false },
  hotfire: { label: 'Hot-fire', tone: 'amber', live: true },
  ready: { label: 'Ready', tone: 'green', live: false },
  countdown: { label: 'Countdown', tone: 'amber', live: true },
  ascent: { label: 'Ascent', tone: 'amber', live: true },
  departed: { label: 'Departed', tone: 'plain', live: false },
};

export function roverStatus(s: RoverStatus): StatusMeta {
  return ROVER[s];
}

export function landerStatus(p: LanderPhase): StatusMeta {
  return LANDER[p];
}

export const toneText: Record<Tone, string> = {
  amber: 'text-amber',
  green: 'text-green',
  blue: 'text-blue',
  plain: 'text-ink-3',
};

export const toneChip: Record<Tone, string> = {
  amber: 'text-amber bg-amber-soft border-[rgba(245,168,87,0.32)]',
  green: 'text-green bg-green-soft border-[rgba(146,220,174,0.3)]',
  blue: 'text-blue bg-blue-soft border-[rgba(156,194,240,0.3)]',
  plain: 'text-ink-3 bg-fill-1 border-line-2',
};

```
```utils/scene/helpers.ts
import * as THREE from 'three';

export function seeded(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Radially jitters vertices; identical positions move identically so faces stay closed. */
export function jitter<T extends THREE.BufferGeometry>(geo: T, amount: number, seed: number): T {
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const k =
      Math.sin(Math.round(v.x * 1000) * 12.9898 + Math.round(v.y * 1000) * 78.233 + Math.round(v.z * 1000) * 37.719 + seed) *
      43758.5453;
    const f = k - Math.floor(k);
    v.multiplyScalar(1 + (f - 0.5) * amount);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

export function std(color: string, roughness = 0.8, metalness = 0, flatShading = false): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness, flatShading });
}

/** Adds a shadow-casting mesh to a parent at a position. */
export function addMesh(
  parent: THREE.Object3D,
  geo: THREE.BufferGeometry,
  mat: THREE.Material,
  x: number,
  y: number,
  z: number
): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

/** A cylinder strut between two points. */
export function strut(parent: THREE.Object3D, a: THREE.Vector3, b: THREE.Vector3, radius: number, mat: THREE.Material): THREE.Mesh {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, len, 8), mat);
  m.position.copy(a).addScaledVector(dir, 0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  m.castShadow = true;
  parent.add(m);
  return m;
}

export function speckleTexture(repeat: number): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const img = ctx.createImageData(size, size);
  const rand = seeded(7);
  for (let i = 0; i < size * size; i++) {
    let v = 212 + rand() * 43;
    if (rand() < 0.05) v = 140 + rand() * 40;
    img.data[i * 4] = v;
    img.data[i * 4 + 1] = v * 0.97;
    img.data[i * 4 + 2] = v * 0.94;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

let solarCache: THREE.CanvasTexture | null = null;
export function solarTexture(): THREE.CanvasTexture {
  if (solarCache) return solarCache;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.fillStyle = '#4f555e';
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = '#9aa1aa';
  ctx.lineWidth = 2;
  for (let i = 0; i <= 128; i += 16) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 128);
    ctx.stroke();
  }
  for (let i = 0; i <= 128; i += 32) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(128, i);
    ctx.stroke();
  }
  solarCache = new THREE.CanvasTexture(canvas);
  solarCache.colorSpace = THREE.SRGBColorSpace;
  return solarCache;
}

export function glowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,248,230,1)');
  g.addColorStop(0.3, 'rgba(255,190,110,0.8)');
  g.addColorStop(1, 'rgba(255,140,60,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Bakes matrices once for objects that never move, skipping per-frame matrix recomposition. */
export function freezeStatic(obj: THREE.Object3D): void {
  obj.updateMatrixWorld(true);
  obj.traverse((o) => {
    o.matrixAutoUpdate = false;
  });
}

export function disposeScene(scene: THREE.Scene): void {
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
    if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
    else if (mat) mat.dispose();
  });
  solarCache = null;
}

```
```utils/scene/ground.ts
import * as THREE from 'three';
import { sitePositions } from '../../data/mission';
import { routeSamples } from '../route';
import { terrainHeight, valueNoise } from '../terrain';
import { jitter, seeded, speckleTexture } from './helpers';

export function buildGround(color = '#c99069'): THREE.Mesh {
  const geo = new THREE.PlaneGeometry(640, 640, 280, 280);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const base = new THREE.Color(color);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    pos.setY(i, terrainHeight(x, z));
    const n = 0.86 + valueNoise(x * 0.06 + 40, z * 0.06) * 0.24;
    colors[i * 3] = base.r * n;
    colors[i * 3 + 1] = base.g * n;
    colors[i * 3 + 2] = base.b * n;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  const tex = speckleTexture(150);
  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({ vertexColors: true, map: tex, bumpMap: tex, bumpScale: 1.4, roughness: 1 })
  );
  mesh.receiveShadow = true;
  mesh.name = 'ground';
  return mesh;
}

const ROCK_VARIANTS = 6;

/** Scattered rocks as a handful of InstancedMeshes (one draw call per shape variant). */
export function buildRocks(count = 170, paletteHex: string[] = ['#8d5d42', '#7b513a', '#9b6a4c', '#6f4733']): THREE.Group {
  const group = new THREE.Group();
  const rand = seeded(42);
  const avoid = routeSamples(80);
  const palette = paletteHex.map((c) => new THREE.Color(c));
  const buckets: THREE.Object3D[][] = Array.from({ length: ROCK_VARIANTS }, () => []);
  const colors: THREE.Color[][] = Array.from({ length: ROCK_VARIANTS }, () => []);

  let placed = 0;
  let tries = 0;
  while (placed < count && tries < 6000) {
    tries++;
    const x = (rand() - 0.5) * 220;
    const z = (rand() - 0.5) * 220 - 10;
    if (Math.hypot(x - 16, z - 6) < 27) continue;
    if (avoid.some((p) => Math.hypot(p.x - x, p.z - z) < 3.2)) continue;
    if (Math.hypot(x - sitePositions.sector.x, z - sitePositions.sector.z) < 12) continue;
    const big = rand() < 0.08;
    const s = big ? 1.6 + rand() * 1.8 : 0.15 + Math.pow(rand(), 2) * 0.9;
    const d = new THREE.Object3D();
    d.scale.set(s * (1 + rand() * 0.6), s * (0.45 + rand() * 0.3), s * (0.8 + rand() * 0.5));
    d.rotation.set(rand() * 0.4, rand() * Math.PI * 2, rand() * 0.3);
    d.position.set(x, terrainHeight(x, z) + s * 0.12, z);
    d.updateMatrix();
    const v = Math.floor(rand() * ROCK_VARIANTS);
    buckets[v].push(d);
    colors[v].push(palette[Math.floor(rand() * palette.length)]);
    placed++;
  }

  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.95, flatShading: true });
  buckets.forEach((items, v) => {
    if (!items.length) return;
    const mesh = new THREE.InstancedMesh(jitter(new THREE.DodecahedronGeometry(1, 0), 0.55, v * 17 + 1), material, items.length);
    items.forEach((d, i) => {
      mesh.setMatrixAt(i, d.matrix);
      mesh.setColorAt(i, colors[v][i]);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  });
  return group;
}

export function buildMountains(color = '#a2735a', scale = 1): THREE.Group {
  const group = new THREE.Group();
  const rand = seeded(9);
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 1, flatShading: true });
  for (let i = 0; i < 34; i++) {
    const a = (i / 34) * Math.PI * 2 + rand() * 0.12;
    const r = 190 + rand() * 90;
    const h = (28 + rand() * 70) * scale;
    const radius = 34 + rand() * 40;
    const geo = jitter(new THREE.ConeGeometry(radius, h, 7, 3), 0.35, i * 3);
    const m = new THREE.Mesh(geo, mat);
    m.position.set(16 + Math.cos(a) * r, h / 2 - 6, 6 + Math.sin(a) * r);
    m.rotation.y = rand() * Math.PI;
    group.add(m);
  }
  return group;
}

```
```utils/scene/lander.ts
import * as THREE from 'three';
import { addMesh, glowTexture, solarTexture, std, strut } from './helpers';

export interface LanderRig {
  root: THREE.Group;
  body: THREE.Group;
  legs: THREE.Group;
  flame: THREE.Group;
  glow: THREE.Sprite;
  light: THREE.PointLight;
}

/** IX-7 Hermes: ogive ascent vehicle on four landing legs. Height ≈ 15 m. */
export function buildLander(): LanderRig {
  const root = new THREE.Group();
  const body = new THREE.Group();
  const legs = new THREE.Group();
  root.add(body, legs);

  const metal = std('#8f8b84', 0.45, 0.55);
  const dark = std('#2c2926', 0.8, 0.3);
  const gold = std('#c59a4c', 0.35, 0.8);
  const white = std('#e6e0d6', 0.6);

  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    addMesh(body, new THREE.CylinderGeometry(0.28, 0.5, 0.9, 16, 1, true), dark, Math.cos(a) * 0.75, 1.45, Math.sin(a) * 0.75);
  }
  addMesh(body, new THREE.CylinderGeometry(1.85, 1.95, 1.1, 32), gold, 0, 2.45, 0);
  addMesh(body, new THREE.CylinderGeometry(1.7, 1.8, 8, 32), metal, 0, 7, 0);
  [5, 8, 10.8].forEach((y) => addMesh(body, new THREE.CylinderGeometry(1.74, 1.74, 0.12, 32), dark, 0, y, 0));

  const profile: THREE.Vector2[] = [];
  for (let i = 0; i <= 14; i++) {
    const a = (i / 14) * (Math.PI / 2);
    profile.push(new THREE.Vector2(Math.max(0.001, 1.7 * Math.pow(Math.cos(a), 0.75)), 3.6 * Math.sin(a)));
  }
  addMesh(body, new THREE.LatheGeometry(profile, 32), metal, 0, 11, 0);
  addMesh(body, new THREE.CylinderGeometry(0.04, 0.04, 0.9, 6), white, 0, 15, 0);
  addMesh(body, new THREE.SphereGeometry(0.45, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2.4), white, 0, 15.3, 0);

  addMesh(body, new THREE.BoxGeometry(0.9, 1.3, 0.5), white, 0, 4.4, 1.85);
  const panelMat = new THREE.MeshStandardMaterial({ map: solarTexture(), roughness: 0.45, metalness: 0.35 });
  [-1, 1].forEach((side) => {
    const wing = addMesh(body, new THREE.BoxGeometry(2.6, 0.05, 1.1), panelMat, side * 3.1, 8.2, 0);
    wing.rotation.z = side * 0.35;
  });

  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const top = new THREE.Vector3(Math.cos(a) * 1.75, 4, Math.sin(a) * 1.75);
    const foot = new THREE.Vector3(Math.cos(a) * 4, 0.18, Math.sin(a) * 4);
    const knee = new THREE.Vector3(Math.cos(a) * 1.8, 2.2, Math.sin(a) * 1.8);
    strut(legs, top, foot, 0.08, white);
    strut(legs, knee, foot, 0.05, white);
    addMesh(legs, new THREE.CylinderGeometry(0.38, 0.45, 0.12, 16), white, foot.x, 0.08, foot.z);
  }

  const flame = new THREE.Group();
  flame.position.y = 1.0;
  flame.visible = false;
  const outer = new THREE.Mesh(
    new THREE.ConeGeometry(1.1, 6, 20, 1, true),
    new THREE.MeshBasicMaterial({ color: '#ff9f4a', transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
  );
  outer.rotation.x = Math.PI;
  outer.position.y = -3;
  const inner = new THREE.Mesh(
    new THREE.ConeGeometry(0.55, 3.6, 16, 1, true),
    new THREE.MeshBasicMaterial({ color: '#fff0c8', transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
  );
  inner.rotation.x = Math.PI;
  inner.position.y = -1.8;
  flame.add(outer, inner);
  body.add(flame);

  const glow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture(),
      color: '#ffc27a',
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    })
  );
  glow.position.y = -0.5;
  glow.scale.setScalar(7);
  glow.visible = false;
  body.add(glow);

  const light = new THREE.PointLight('#ffae5c', 0, 60, 1);
  light.position.y = -0.5;
  body.add(light);

  return { root, body, legs, flame, glow, light };
}

```
```utils/scene/base.ts
import * as THREE from 'three';
import { sitePositions } from '../../data/mission';
import { terrainHeight } from '../terrain';
import { addMesh, solarTexture, std, strut } from './helpers';

export interface BaseRig {
  group: THREE.Group;
  /** Clickable infrastructure; each carries userData.pick. */
  pickables: THREE.Object3D[];
  /** Shared solar panel material, dimmed during dust storms. */
  panelMat: THREE.MeshStandardMaterial;
}

function picked(parent: THREE.Group, id: string): THREE.Group {
  const g = new THREE.Group();
  g.userData.pick = id;
  parent.add(g);
  return g;
}

/** Static base infrastructure: pad, rover dock, habitat, depot, comms tower and solar field. */
export function buildBase(): BaseRig {
  const group = new THREE.Group();
  const white = std('#e9e4dc', 0.55);
  const dark = std('#3a302a', 0.9);
  const padMat = std('#6d5444', 1);

  const { lander, dock, habitat, depot, tower, solar } = sitePositions;
  const pad = addMesh(group, new THREE.CylinderGeometry(7, 7.2, 0.16, 48), padMat, lander.x, terrainHeight(lander.x, lander.z) + 0.02, lander.z);
  pad.castShadow = false;
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(5.6, 5.8, 64),
    new THREE.MeshBasicMaterial({ color: '#f2ebe0', transparent: true, opacity: 0.35, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(lander.x, 0.12, lander.z);
  group.add(ring);

  const dockG = picked(group, 'dock');
  const dy = terrainHeight(dock.x, dock.z);
  const dockPad = addMesh(dockG, new THREE.BoxGeometry(4.4, 0.12, 5.4), dark, dock.x, dy + 0.06, dock.z);
  dockPad.castShadow = false;
  addMesh(dockG, new THREE.BoxGeometry(0.5, 1.6, 0.5), dark, dock.x - 2.7, dy + 0.8, dock.z + 1.6);
  addMesh(dockG, new THREE.SphereGeometry(0.16, 12, 8), new THREE.MeshBasicMaterial({ color: '#7fe0a5' }), dock.x - 2.7, dy + 1.72, dock.z + 1.6);

  const habG = picked(group, 'habitat');
  const hy = terrainHeight(habitat.x, habitat.z);
  const main = addMesh(habG, new THREE.CylinderGeometry(2, 2, 7, 28), white, habitat.x, hy + 2.4, habitat.z);
  main.rotation.z = Math.PI / 2;
  [-3.5, 3.5].forEach((dx) => addMesh(habG, new THREE.SphereGeometry(2, 24, 16), white, habitat.x + dx, hy + 2.4, habitat.z));
  const side = addMesh(habG, new THREE.CylinderGeometry(1.5, 1.5, 4.5, 24), white, habitat.x - 2, hy + 2.1, habitat.z + 3);
  side.rotation.x = Math.PI / 2;
  [-3, 0, 3].forEach((dx) =>
    [-1.2, 1.2].forEach((dz) => addMesh(habG, new THREE.BoxGeometry(0.2, 0.9, 0.2), dark, habitat.x + dx, hy + 0.45, habitat.z + dz))
  );

  const depotPad = addMesh(group, new THREE.BoxGeometry(5, 0.1, 4), dark, depot.x, terrainHeight(depot.x, depot.z) + 0.05, depot.z);
  depotPad.castShadow = false;

  const towerG = picked(group, 'tower');
  const ty = terrainHeight(tower.x, tower.z);
  const corners = [
    [-0.9, -0.9],
    [0.9, -0.9],
    [0.9, 0.9],
    [-0.9, 0.9],
  ];
  corners.forEach(([cx, cz]) =>
    strut(towerG, new THREE.Vector3(tower.x + cx, ty, tower.z + cz), new THREE.Vector3(tower.x + cx * 0.3, ty + 15, tower.z + cz * 0.3), 0.06, dark)
  );
  for (let y = 2; y < 15; y += 2.2) {
    const k = 1 - (y / 15) * 0.7;
    for (let i = 0; i < 4; i++) {
      const [ax, az] = corners[i];
      const [bx, bz] = corners[(i + 1) % 4];
      strut(towerG, new THREE.Vector3(tower.x + ax * k, ty + y, tower.z + az * k), new THREE.Vector3(tower.x + bx * k, ty + y + 1.1, tower.z + bz * k), 0.03, dark);
    }
  }
  // Invisible proxy so the thin truss is easy to click.
  const towerHit = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 17, 8), new THREE.MeshBasicMaterial({ visible: false }));
  towerHit.position.set(tower.x, ty + 8.5, tower.z);
  towerG.add(towerHit);
  const dish = addMesh(towerG, new THREE.SphereGeometry(1.8, 24, 12, 0, Math.PI * 2, 0, Math.PI / 3.2), white, tower.x, ty + 15.6, tower.z);
  dish.rotation.x = Math.PI + 0.6;

  const solarG = picked(group, 'solar');
  const panelMat = new THREE.MeshStandardMaterial({ map: solarTexture(), roughness: 0.4, metalness: 0.4 });
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      const x = solar.x + (c - 1.5) * 3;
      const z = solar.z + (r - 1) * 3.4;
      const y = terrainHeight(x, z);
      addMesh(solarG, new THREE.CylinderGeometry(0.05, 0.05, 1.1, 6), dark, x, y + 0.55, z);
      const p = addMesh(solarG, new THREE.BoxGeometry(2.6, 0.05, 1.5), panelMat, x, y + 1.15, z);
      p.rotation.x = -0.55;
    }
  }
  return { group, pickables: [dockG, habG, towerG, solarG], panelMat };
}

```
```utils/scene/vehicles.ts
import * as THREE from 'three';
import { addMesh, solarTexture, std } from './helpers';

export interface VehicleRig {
  group: THREE.Group;
  wheels: THREE.Mesh[];
  beacon?: THREE.Mesh;
}

function addWheels(group: THREE.Group, xs: number[], zs: number[], radius: number, width: number, y: number): THREE.Mesh[] {
  const geo = new THREE.CylinderGeometry(radius, radius, width, 18);
  geo.rotateZ(Math.PI / 2);
  const mat = std('#2b2622', 0.9);
  const wheels: THREE.Mesh[] = [];
  xs.forEach((x) => zs.forEach((z) => wheels.push(addMesh(group, geo, mat, x, y, z))));
  return wheels;
}

/** ATLAS-01 six-wheel science rover. Front faces +z. */
export function buildRover(): VehicleRig {
  const group = new THREE.Group();
  const white = std('#e6dfd3', 0.6);
  const dark = std('#2b2622', 0.9);
  addMesh(group, new THREE.BoxGeometry(1.45, 0.55, 2.05), white, 0, 0.98, 0);
  addMesh(group, new THREE.BoxGeometry(1.8, 0.08, 2.3), new THREE.MeshStandardMaterial({ map: solarTexture(), roughness: 0.45, metalness: 0.35 }), 0, 1.3, 0);
  addMesh(group, new THREE.SphereGeometry(0.3, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2), white, -0.45, 1.34, -0.5);
  addMesh(group, new THREE.CylinderGeometry(0.05, 0.05, 1.5, 10), white, 0.3, 2.05, 0.75);
  addMesh(group, new THREE.BoxGeometry(0.5, 0.18, 0.24), white, 0.3, 2.85, 0.75);
  const beacon = addMesh(group, new THREE.BoxGeometry(0.12, 0.06, 0.12), new THREE.MeshBasicMaterial({ color: '#ffd77e' }), 0.45, 1.36, -0.3);
  [-0.95, 0.95].forEach((x) => addMesh(group, new THREE.BoxGeometry(0.08, 0.08, 1.9), dark, x, 0.78, 0));
  const wheels = addWheels(group, [-0.95, 0.95], [-0.8, 0, 0.8], 0.36, 0.3, 0.38);
  return { group, wheels, beacon };
}

/** CARGO-03 hauler: cab plus cargo container on six wheels. */
export function buildCargo(): VehicleRig {
  const group = new THREE.Group();
  const white = std('#ece6dc', 0.55);
  const dark = std('#3a302a', 0.85);
  addMesh(group, new THREE.BoxGeometry(2.2, 0.35, 4.6), dark, 0, 0.75, 0);
  addMesh(group, new THREE.BoxGeometry(2.1, 1.5, 3), white, 0, 1.7, -0.7);
  addMesh(group, new THREE.BoxGeometry(2.1, 1.2, 1.3), white, 0, 1.55, 1.65);
  addMesh(group, new THREE.BoxGeometry(1.9, 0.5, 0.05), std('#2d3238', 0.3, 0.4), 0, 1.8, 2.31);
  const wheels = addWheels(group, [-1.15, 1.15], [-1.6, 0, 1.6], 0.45, 0.35, 0.45);
  return { group, wheels };
}

/** EXPLORER-12 small survey scout with a tall sensor mast. */
export function buildExplorer(): VehicleRig {
  const group = new THREE.Group();
  const white = std('#e2dbcf', 0.6);
  addMesh(group, new THREE.BoxGeometry(1, 0.4, 1.4), white, 0, 0.6, 0);
  addMesh(group, new THREE.CylinderGeometry(0.035, 0.035, 1.6, 8), white, 0, 1.6, 0.4);
  addMesh(group, new THREE.SphereGeometry(0.18, 12, 8), white, 0, 2.45, 0.4);
  const beacon = addMesh(group, new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: '#9cc2f0' }), 0, 2.7, 0.4);
  const wheels = addWheels(group, [-0.6, 0.6], [-0.5, 0.5], 0.28, 0.2, 0.28);
  return { group, wheels, beacon };
}

```
```utils/scene/sector.ts
import * as THREE from 'three';
import { sectorPosition } from '../../data/mission';
import { routePoint } from '../route';
import { terrainHeight } from '../terrain';
import { jitter } from './helpers';

export function buildOutcrop(): { group: THREE.Group; top: THREE.Vector3 } {
  const group = new THREE.Group();
  const { x, z } = sectorPosition;
  const baseY = terrainHeight(x, z) - 0.4;
  const colors = ['#a7714d', '#8e5c40', '#b07a55', '#93603f', '#a46e4b'];
  const layers = 5;
  for (let i = 0; i < layers; i++) {
    const geo = jitter(new THREE.BoxGeometry(17 - i * 2.4, 0.95, 11 - i * 1.6, 4, 1, 3), 0.08, i * 9);
    const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: colors[i], roughness: 0.95, flatShading: true }));
    mesh.position.set((i % 2) * 0.5 - 0.25, baseY + i * 0.88, -i * 0.4);
    mesh.rotation.y = 0.25 + (i % 3) * 0.06;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }
  group.position.set(x, 0, z);
  return { group, top: new THREE.Vector3(x - 1.5, baseY + layers * 0.88 + 0.6, z - 1) };
}

export function buildRoute(): THREE.Group {
  const group = new THREE.Group();
  const pts = Array.from({ length: 240 }, (_, i) => {
    const p = routePoint(i / 239);
    p.y += 0.08;
    return p;
  });
  const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineDashedMaterial({ color: '#f6efe6', dashSize: 0.45, gapSize: 0.55, transparent: true, opacity: 0.8 })
  );
  line.computeLineDistances();
  group.add(line);

  const end = routePoint(1);
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(1.3, 1.42, 48),
    new THREE.MeshBasicMaterial({ color: '#f6efe6', transparent: true, opacity: 0.75, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(end.x, end.y + 0.08, end.z);
  group.add(ring);
  return group;
}

```
```utils/scene/effects.ts
import * as THREE from 'three';
import { seeded } from './helpers';

export interface DustRig {
  points: THREE.Points;
  update: (dt: number, strength: number) => void;
}

/** Radial dust blown outward from the pad while engines fire near the ground. */
export function createDust(): DustRig {
  const count = 420;
  const rand = seeded(3);
  const positions = new Float32Array(count * 3);
  const radii = new Float32Array(count);
  const angles = new Float32Array(count);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    radii[i] = 1.5 + rand() * 14;
    angles[i] = rand() * Math.PI * 2;
    speeds[i] = 3 + rand() * 6;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ color: '#c99673', size: 1.1, transparent: true, opacity: 0, depthWrite: false });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;

  const update = (dt: number, strength: number) => {
    mat.opacity += (strength * 0.55 - mat.opacity) * Math.min(1, dt * 3);
    points.visible = mat.opacity > 0.01;
    if (!points.visible) return;
    for (let i = 0; i < count; i++) {
      radii[i] += speeds[i] * dt * (0.4 + strength);
      if (radii[i] > 18) radii[i] = 1.5;
      const r = radii[i];
      positions[i * 3] = Math.cos(angles[i]) * r;
      positions[i * 3 + 1] = 0.2 + (r / 18) * 2.2 * (0.5 + Math.sin(i) * 0.5);
      positions[i * 3 + 2] = Math.sin(angles[i]) * r;
    }
    geo.attributes.position.needsUpdate = true;
  };
  return { points, update };
}

```
```utils/scene/camera.ts
import * as THREE from 'three';
import type { CameraState, LanderState } from '../../types/mission';
import { terrainHeight } from '../terrain';

interface CameraContext {
  roverPos: THREE.Vector3;
  routeDir: THREE.Vector3;
  landerPos: THREE.Vector3;
  rocketPos: THREE.Vector3;
  lander: LanderState;
}

/** Resolves where the camera wants to be and look at for the current mode. */
export function desiredCamera(cam: CameraState, ctx: CameraContext, pos: THREE.Vector3, look: THREE.Vector3): number {
  const z = cam.zoom;
  const { landerPos: l, lander } = ctx;

  if (lander.phase === 'countdown') {
    pos.set(l.x - 24, l.y + 9, l.z + 40);
    look.set(l.x, l.y + 7, l.z);
    return 2.4;
  }
  if (lander.phase === 'ascent') {
    const alt = ctx.rocketPos.y - l.y;
    pos.set(l.x - 30, l.y + 10 + alt * 0.5, l.z + 52 + alt * 0.08);
    look.copy(ctx.rocketPos);
    return 4;
  }
  if (cam.focus) {
    const fh = terrainHeight(cam.focus.x, cam.focus.z);
    pos.set(cam.focus.x - 10 * z, fh + 26 * z, cam.focus.z + 30 * z);
    look.set(cam.focus.x, fh, cam.focus.z);
    return 2.4;
  }
  if (cam.mode === 'atlas') {
    const t = ctx.routeDir;
    const right = new THREE.Vector3(-t.z, 0, t.x);
    pos
      .copy(ctx.roverPos)
      .addScaledVector(t, -10 * z)
      .addScaledVector(right, -2.2 * z)
      .add(new THREE.Vector3(0, 5.6 * z, 0));
    look.copy(ctx.roverPos).addScaledVector(t, 7).add(new THREE.Vector3(0, 0.4, 0));
    return 2.4;
  }
  if (cam.mode === 'tactical') {
    pos.set(12, 95 * z, -12 + 28 * z);
    look.set(12, 0, -12);
    return 2.4;
  }
  if (cam.frame === 'lander') {
    pos.set(l.x - 14 * z, l.y + 2 + 9 * z, l.z + 30 * z);
    look.set(l.x, l.y + 6 + (ctx.rocketPos.y - l.y - 8), l.z);
    return 2.4;
  }
  pos.set(4 - 22 * z, 2 + 20 * z, 6 + 50 * z);
  look.set(8, 3, -6);
  return 2.4;
}

```
```components/shared/Toast.tsx
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react';
import type { ToastMessage } from '../../types/rover';

const ICONS = { ok: CheckIcon, warn: TriangleAlertIcon, info: InfoIcon };
const COLORS = { ok: 'text-green', warn: 'text-amber', info: 'text-blue' };

export function Toast({ toast }: { toast: ToastMessage | null }) {
  return (
    <div role="status" aria-live="polite" className="pointer-events-none flex justify-center">
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ opacity: 0, y: 4, transition: { duration: 0.14, ease: [0.25, 0.46, 0.45, 0.94] } }}
            className="glass flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] text-ink"
          >
            {React.createElement(ICONS[toast.tone], { size: 14, strokeWidth: 1.8, className: COLORS[toast.tone] })}
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

```
```components/layout/TopBar.tsx
import React from 'react';
import { DEADLINE_SOL } from '../../data/pillars';
import type { RegionDef } from '../../data/regions';
import { useI18n } from '../../contexts/LanguageContext';
import type { GamePhase, GameState, TimeSpeed } from '../../types/game';
import { formatLmst } from '../../utils/tone';
import { ActHud } from '../campaign/ActHud';
import { LanguageSwitch } from './LanguageSwitch';
import { TimeControls } from './TimeControls';

interface TopBarProps {
  game: GameState;
  region: RegionDef;
  phase: GamePhase;
  lmst: number;
  paused: boolean;
  onTogglePause: () => void;
  speed: TimeSpeed;
  onSpeed: (s: TimeSpeed) => void;
}

export function TopBar({ game, region, phase, lmst, paused, onTogglePause, speed, onSpeed }: TopBarProps) {
  const { t } = useI18n();
  const playing = phase === 'uplink' || phase === 'executing' || phase === 'night';
  return (
    <header className="stage-text absolute inset-x-0 top-0 z-20 grid grid-cols-[1fr_auto] items-center gap-3 px-4 pt-3 md:grid-cols-[1fr_auto_1fr] lg:px-[22px]">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex items-center gap-2.5">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 2.5 17.5 17h-3.2L10 8.6 5.7 17H2.5L10 2.5Z" stroke="var(--amber)" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <div className="leading-tight">
            <div className="text-[12px] font-[650] uppercase tracking-[0.34em] text-ink">Ares</div>
            <div className="hidden text-[10px] uppercase tracking-[0.2em] text-ink-4 sm:block">{t.topBar.opsCommand}</div>
          </div>
        </div>
        <span className="hidden h-7 w-px bg-line-2 xl:block" />
        <div className="hidden leading-tight xl:block">
          <div className="hud-label">{region.coords}</div>
          <div className="text-[13px] font-medium text-ink">{t.regions[region.id].name}</div>
        </div>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <ActHud game={game} />
        <div className="glass flex h-10 items-center gap-4 rounded-full px-4">
          <div className="leading-tight">
            <span className="hud-label">{t.common.sol}</span>
            <div className="text-[14px] font-[650] text-ink">
              {game.sol}
              <span className="font-normal text-ink-4"> / {DEADLINE_SOL}</span>
            </div>
          </div>
          <span className="h-6 w-px bg-line-2" />
          <div className="leading-tight">
            <span className="hud-label">{t.topBar.lmst}</span>
            <div className="text-[14px] font-medium text-ink">{formatLmst(lmst)}</div>
          </div>
          <span className="h-6 w-px bg-line-2" />
          <div className="leading-tight">
            <span className="hud-label">{t.topBar.phase}</span>
            <div className={`whitespace-nowrap text-[12.5px] font-[600] ${playing ? 'text-amber' : 'text-ink'}`}>{paused && playing ? t.phase.paused : t.phase[phase]}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <div className="hidden items-center gap-2 rounded-full bg-fill-1 px-3 py-1.5 2xl:flex" title={t.topBar.lightTime}>
          <span className="h-1.5 w-1.5 rounded-full bg-red breathe" aria-hidden="true" />
          <span className="whitespace-nowrap text-[11px] font-[600] uppercase tracking-[0.12em] text-ink-2">{t.topBar.delay(game.delayMin)}</span>
        </div>
        <LanguageSwitch className="glass rounded-full" />
        <TimeControls paused={paused} onTogglePause={onTogglePause} speed={speed} onSpeed={onSpeed} speedLocked={phase === 'executing'} disabled={!playing} />
      </div>
    </header>
  );
}

```
```components/layout/NavRail.tsx
import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import { navItems } from '../../data/navigation';
import type { GameView } from '../../types/game';

interface NavRailProps {
  active: GameView;
  onSelect: (id: GameView) => void;
  alert?: boolean;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export function NavRail({ active, onSelect, alert = false, orientation = 'vertical', className = '' }: NavRailProps) {
  const { t } = useI18n();
  const vertical = orientation === 'vertical';
  return (
    <nav
      aria-label={t.nav.aria}
      className={`glass flex items-center gap-1.5 p-2 ${vertical ? 'flex-col rounded-[26px]' : 'scroll-quiet justify-start overflow-x-auto rounded-full sm:justify-center'} ${className}`}
    >
      {navItems.map(({ id, icon: Icon, key, dividerBefore }) => {
        const isActive = active === id;
        const label = t.nav[id];
        return (
          <React.Fragment key={id}>
            {dividerBefore && <span className={`shrink-0 bg-line-2 ${vertical ? 'my-1 h-px w-6' : 'mx-1 h-6 w-px'}`} aria-hidden="true" />}
            <button
              type="button"
              onClick={() => onSelect(id)}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className={`group relative grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors duration-150 lg:h-[38px] lg:w-[38px] ${
                isActive ? 'bg-fill-3 text-ink shadow-[inset_0_0_0_1px_var(--line-2)]' : 'text-ink-3 hover:bg-fill-2 hover:text-ink'
              }`}
            >
              <Icon size={17} strokeWidth={1.4} />
              {id === 'reports' && alert && <span className="absolute right-[7px] top-[7px] h-1.5 w-1.5 rounded-full bg-red" />}
              {vertical && (
                <span className="glass pointer-events-none absolute left-full ml-3 flex -translate-x-1 items-center gap-2 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[12px] text-ink opacity-0 transition-[opacity,transform] duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                  {label}
                  <kbd className="rounded border border-line-2 px-1 text-[10px] text-ink-4">{key}</kbd>
                </span>
              )}
            </button>
          </React.Fragment>
        );
      })}
    </nav>
  );
}

```
```components/layout/CameraControls.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import type { CameraMode } from '../../types/mission';
import { menuEnterTransition } from '../../utils/motion';

interface CameraControlsProps {
  mode: CameraMode;
  onMode: (m: CameraMode) => void;
  onZoom: (dir: 1 | -1) => void;
  showHints?: boolean;
}

const MODES: { id: CameraMode; key: 'site' | 'tactical' | 'rover' }[] = [
  { id: 'site', key: 'site' },
  { id: 'tactical', key: 'tactical' },
  { id: 'atlas', key: 'rover' },
];

export function CameraControls({ mode, onMode, onZoom }: CameraControlsProps) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-end gap-2.5">
      <div className="glass flex items-center gap-1 rounded-2xl p-1.5">
        <span className="hud-label px-2.5 text-ink-3">{t.camera.label}</span>
        <div role="tablist" aria-label={t.camera.mode} className="flex items-center rounded-xl bg-fill-1 p-0.5">
          {MODES.map((m) => {
            const on = m.id === mode;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => onMode(m.id)}
                className={`relative whitespace-nowrap rounded-[10px] px-3 py-1.5 text-[10.5px] font-[600] uppercase tracking-[0.1em] transition-colors duration-150 ${
                  on ? 'text-ink' : 'text-ink-3 hover:text-ink'
                }`}
              >
                {on && <motion.span layoutId="camera-glide" className="absolute inset-0 rounded-[10px] bg-fill-3 shadow-[inset_0_0_0_1px_var(--line-2)]" transition={menuEnterTransition} />}
                <span className="relative">{t.camera[m.key]}</span>
              </button>
            );
          })}
        </div>
        <span className="mx-1 h-6 w-px bg-line" aria-hidden="true" />
        <button
          type="button"
          aria-label={t.camera.zoomIn}
          onClick={() => onZoom(1)}
          className="grid h-8 w-8 place-items-center rounded-lg text-ink-3 transition-colors duration-150 hover:bg-fill-2 hover:text-ink"
        >
          <PlusIcon size={15} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label={t.camera.zoomOut}
          onClick={() => onZoom(-1)}
          className="grid h-8 w-8 place-items-center rounded-lg text-ink-3 transition-colors duration-150 hover:bg-fill-2 hover:text-ink"
        >
          <MinusIcon size={15} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

```
```docs/threejs.md
https://github.com/CloudAI-X/threejs-skills/tree/main/skills

Three.js Skills for Claude Code
Skill files that give Claude Code current, verified knowledge of three.js, so the code it writes runs on the release you actually install.

The skills target three.js r186 (three@0.186), React Three Fiber 9.8 with drei 10.7, and gltf-transform 4.5. Rendering examples use WebGLRenderer, directly or through React Three Fiber; the WebGPU and TSL section in every skill covers WebGPURenderer.

Why
Claude Code knows three.js from its training data, which mixes many releases. A lot changed between r160 and r186: RGBELoader became HDRLoader, Clock gave way to Timer, PostProcessing became RenderPipeline, WebGL 1 support is gone, and the three.js docs now tell LLMs to use WebGPURenderer with TSL for custom shaders and materials. These skills give Claude Code the current API, working examples, and a Common Mistakes list of the outdated patterns models still reach for.

Installation
With the skills CLI:

npx skills add cloudai-x/threejs-skills
Or manually. Claude Code loads skills from ~/.claude/skills/ (all your projects) or .claude/skills/ (one project):

git clone https://github.com/CloudAI-X/threejs-skills.git

# all your projects
mkdir -p ~/.claude/skills && cp -r threejs-skills/skills/* ~/.claude/skills/

# or one project (run from the project root)
mkdir -p .claude/skills && cp -r threejs-skills/skills/* .claude/skills/
Skills Included
Skill	Covers
threejs-fundamentals	Scene, cameras, renderer setup, animation loop, object hierarchy, transforms
threejs-geometry	Built-in shapes, BufferGeometry, merging, instancing, BatchedMesh, points, lines
threejs-materials	Material types, PBR, blending, stencil, recompiles, node materials
threejs-lighting	Light types and physical units, shadows, HDR environments, light probes
threejs-textures	Loading, color spaces, UV channels, texture types, render targets, memory
threejs-animation	Keyframes, the animation mixer, skeletal and morph animation, blending
threejs-loaders	glTF with Draco, meshopt and KTX2, other formats, HDR, progress, disposal
threejs-shaders	ShaderMaterial and RawShaderMaterial, shader chunks, TSL and node materials
threejs-postprocessing	EffectComposer, built-in renderer effects, the WebGPU RenderPipeline
threejs-interaction	Raycasting, camera controls, transform gizmos, drag and box selection
threejs-performance	Measuring frame cost, draw calls, GPU memory, fill rate, compile stalls
threejs-react-three-fiber	React Three Fiber 9 and a verified set of drei helpers, on WebGL or WebGPU
threejs-asset-pipeline	gltf-transform: Draco, meshopt, KTX2, WebP, and the matching loader setup
How It Works
Claude Code loads a skill when your request matches its description. When you ask it to:

create a 3D scene → threejs-fundamentals
add lights and shadows → threejs-lighting
load a glTF model → threejs-loaders
write a custom shader or screen effect → threejs-shaders and threejs-postprocessing
make a slow scene faster → threejs-performance
build the scene with React → threejs-react-three-fiber
shrink a glTF before shipping it → threejs-asset-pipeline
Skill File Structure
Every skill follows the same layout:

---
name: threejs-<topic>
description: "What the skill covers. Use when ..."
---

# Three.js <Topic>

Targets three.js r186. Examples use WebGLRenderer; the WebGPU and TSL section uses WebGPURenderer.

## Quick Start          a complete, runnable example
## <topic sections>     the API with working examples
## WebGPU and TSL       the same topic under WebGPURenderer
## Common Mistakes      outdated or wrong code → the r186 fix, with the reason
## See Also             related skills
Verification
The skills were checked against the published three@0.186.1 package and the official Migration Guide, and against @react-three/fiber@9.8.2, @react-three/drei@10.7.9, @gltf-transform/cli@4.5.1 and gltfjsx@6.5.3 where they apply:

every three.js, React Three Fiber, drei and gltf-transform import path, and every THREE.* class used in an example, exists in its package
every JavaScript block parses as an ES module
shader chunk names exist, and no removed or renamed API appears in example code
every gltf-transform command and flag exists in the CLI, and every React Three Fiber element maps to a three.js class
every skill was reviewed against the library source, with rendering, timing and shader claims measured where possible
If you find something that is wrong on the current release, please open an issue with the skill name, the line and the three.js version you use.

License
MIT, see LICENSE.

Acknowledgments
Three.js - the 3D library these skills document
```
```docs/reszpo.md
Property	Value
name	responsive-design
description	Implement modern responsive layouts using container queries, fluid typography, CSS Grid, and mobile-first breakpoint strategies. Use when building adaptive interfaces, implementing fluid layouts, or creating component-level responsive behavior.
keywords	responsive, mobile-first, layout, css, web-design, ux-design, best-practices
Responsive Design
Master modern responsive design techniques to create interfaces that adapt seamlessly across all screen sizes and device contexts.
When to Use This Skill
Implementing mobile-first responsive layouts
Using container queries for component-based responsiveness
Creating fluid typography and spacing scales
Building complex layouts with CSS Grid and Flexbox
Designing breakpoint strategies for design systems
Implementing responsive images and media
Creating adaptive navigation patterns
Building responsive tables and data displays
Core Capabilities
1. Container Queries
Component-level responsiveness independent of viewport
Container query units (cqi, cqw, cqh)
Style queries for conditional styling
Fallbacks for browser support
2. Fluid Typography & Spacing
CSS clamp() for fluid scaling
Viewport-relative units (vw, vh, dvh)
Fluid type scales with min/max bounds
Responsive spacing systems
3. Layout Patterns
CSS Grid for 2D layouts
Flexbox for 1D distribution
Intrinsic layouts (content-based sizing)
Subgrid for nested grid alignment
4. Breakpoint Strategy
Mobile-first media queries
Content-based breakpoints
Design token integration
Feature queries (@supports)
Quick Reference
Modern Breakpoint Scale
/* Mobile-first breakpoints */
/* Base: Mobile (< 640px) */
@media (min-width: 640px) {
  /* sm: Landscape phones, small tablets */
}
@media (min-width: 768px) {
  /* md: Tablets */
}
@media (min-width: 1024px) {
  /* lg: Laptops, small desktops */
}
@media (min-width: 1280px) {
  /* xl: Desktops */
}
@media (min-width: 1536px) {
  /* 2xl: Large desktops */
}

/* Tailwind CSS equivalent */
/* sm:  @media (min-width: 640px) */
/* md:  @media (min-width: 768px) */
/* lg:  @media (min-width: 1024px) */
/* xl:  @media (min-width: 1280px) */
/* 2xl: @media (min-width: 1536px) */
Key Patterns
Pattern 1: Container Queries
/* Define a containment context */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Query the container, not the viewport */
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1rem;
  }

  .card-image {
    aspect-ratio: 1;
  }
}

@container card (min-width: 600px) {
  .card {
    grid-template-columns: 250px 1fr;
  }

  .card-title {
    font-size: 1.5rem;
  }
}

/* Container query units */
.card-title {
  /* 5% of container width, clamped between 1rem and 2rem */
  font-size: clamp(1rem, 5cqi, 2rem);
}
// React component with container queries
function ResponsiveCard({ title, image, description }) {
  return (
    <div className="@container">
      <article className="flex flex-col @md:flex-row @md:gap-4">
        <img
          src={image}
          alt=""
          className="w-full @md:w-48 @lg:w-64 aspect-video @md:aspect-square object-cover"
        />
        <div className="p-4 @md:p-0">
          <h2 className="text-lg @md:text-xl @lg:text-2xl font-semibold">
            {title}
          </h2>
          <p className="mt-2 text-muted-foreground @md:line-clamp-3">
            {description}
          </p>
        </div>
      </article>
    </div>
  );
}
Pattern 2: Fluid Typography
/* Fluid type scale using clamp() */
:root {
  /* Min size, preferred (fluid), max size */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1rem + 1.25vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
  --text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
  --text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem);
}

/* Usage */
h1 {
  font-size: var(--text-4xl);
}
h2 {
  font-size: var(--text-3xl);
}
h3 {
  font-size: var(--text-2xl);
}
p {
  font-size: var(--text-base);
}

/* Fluid spacing scale */
:root {
  --space-xs: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
  --space-sm: clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem);
  --space-md: clamp(1rem, 0.8rem + 1vw, 1.5rem);
  --space-lg: clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem);
  --space-xl: clamp(2rem, 1.5rem + 2.5vw, 4rem);
}
// Utility function for fluid values
function fluidValue(
  minSize: number,
  maxSize: number,
  minWidth = 320,
  maxWidth = 1280,
) {
  const slope = (maxSize - minSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minSize;

  return `clamp(${minSize}rem, ${yAxisIntersection.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxSize}rem)`;
}

// Generate fluid type scale
const fluidTypeScale = {
  sm: fluidValue(0.875, 1),
  base: fluidValue(1, 1.125),
  lg: fluidValue(1.25, 1.5),
  xl: fluidValue(1.5, 2),
  "2xl": fluidValue(2, 3),
};
Pattern 3: CSS Grid Responsive Layout
/* Auto-fit grid - items wrap automatically */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 1.5rem;
}

/* Auto-fill grid - maintains empty columns */
.grid-auto-fill {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

/* Responsive grid with named areas */
.page-layout {
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "sidebar"
    "footer";
  gap: 1rem;
}

@media (min-width: 768px) {
  .page-layout {
    grid-template-columns: 1fr 300px;
    grid-template-areas:
      "header header"
      "main sidebar"
      "footer footer";
  }
}

@media (min-width: 1024px) {
  .page-layout {
    grid-template-columns: 250px 1fr 300px;
    grid-template-areas:
      "header header header"
      "nav main sidebar"
      "footer footer footer";
  }
}

.header {
  grid-area: header;
}
.main {
  grid-area: main;
}
.sidebar {
  grid-area: sidebar;
}
.footer {
  grid-area: footer;
}
// Responsive grid component
function ResponsiveGrid({ children, minItemWidth = "250px", gap = "1.5rem" }) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${minItemWidth}, 100%), 1fr))`,
        gap,
      }}
    >
      {children}
    </div>
  );
}

// Usage with Tailwind
function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
Pattern 4: Responsive Navigation
function ResponsiveNav({ items }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative">
      {/* Mobile menu button */}
      <button
        className="lg:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="nav-menu"
      >
        <span className="sr-only">Toggle navigation</span>
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Navigation links */}
      <ul
        id="nav-menu"
        className={cn(
          // Base: hidden on mobile
          "absolute top-full left-0 right-0 bg-background border-b",
          "flex flex-col",
          // Mobile: slide down
          isOpen ? "flex" : "hidden",
          // Desktop: always visible, horizontal
          "lg:static lg:flex lg:flex-row lg:border-0 lg:bg-transparent",
        )}
      >
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={cn(
                "block px-4 py-3",
                "lg:px-3 lg:py-2",
                "hover:bg-muted lg:hover:bg-transparent lg:hover:text-primary",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
Pattern 5: Responsive Images
// Responsive image with art direction
function ResponsiveHero() {
  return (
    <picture>
      {/* Art direction: different crops for different screens */}
      <source
        media="(min-width: 1024px)"
        srcSet="/hero-wide.webp"
        type="image/webp"
      />
      <source
        media="(min-width: 768px)"
        srcSet="/hero-medium.webp"
        type="image/webp"
      />
      <source srcSet="/hero-mobile.webp" type="image/webp" />

      {/* Fallback */}
      <img
        src="/hero-mobile.jpg"
        alt="Hero image description"
        className="w-full h-auto"
        loading="eager"
        fetchpriority="high"
      />
    </picture>
  );
}

// Responsive image with srcset for resolution switching
function ProductImage({ product }) {
  return (
    <img
      src={product.image}
      srcSet={`
        ${product.image}?w=400 400w,
        ${product.image}?w=800 800w,
        ${product.image}?w=1200 1200w
      `}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      alt={product.name}
      className="w-full h-auto object-cover"
      loading="lazy"
    />
  );
}
Pattern 6: Responsive Tables
// Responsive table with horizontal scroll
function ResponsiveTable({ data, columns }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="text-left p-3">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className="p-3">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Card-based table for mobile
function ResponsiveDataTable({ data, columns }) {
  return (
    <>
      {/* Desktop table */}
      <table className="hidden md:table w-full">
        {/* ... standard table */}
      </table>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {data.map((row, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-2">
            {columns.map((col) => (
              <div key={col.key} className="flex justify-between">
                <span className="font-medium text-muted-foreground">
                  {col.label}
                </span>
                <span>{row[col.key]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
Viewport Units
/* Standard viewport units */
.full-height {
  height: 100vh; /* May cause issues on mobile */
}

/* Dynamic viewport units (recommended for mobile) */
.full-height-dynamic {
  height: 100dvh; /* Accounts for mobile browser UI */
}

/* Small viewport (minimum) */
.min-full-height {
  min-height: 100svh;
}

/* Large viewport (maximum) */
.max-full-height {
  max-height: 100lvh;
}

/* Viewport-relative font sizing */
.hero-title {
  /* 5vw with min/max bounds */
  font-size: clamp(2rem, 5vw, 4rem);
}
Best Practices
Mobile-First: Start with mobile styles, enhance for larger screens
Content Breakpoints: Set breakpoints based on content, not devices
Fluid Over Fixed: Use fluid values for typography and spacing
Container Queries: Use for component-level responsiveness
Test Real Devices: Simulators don't catch all issues
Performance: Optimize images, lazy load off-screen content
Touch Targets: Maintain 44x44px minimum on mobile
Logical Properties: Use inline/block for internationalization
Common Issues
Horizontal Overflow: Content breaking out of viewport
Fixed Widths: Using px instead of relative units
Viewport Height: 100vh issues on mobile browsers
Font Size: Text too small on mobile
Touch Targets: Buttons too small to tap accurately
Aspect Ratio: Images squishing or stretching
Z-Index Stacking: Overlays breaking on different screens
```
```utils/motion.ts
import type { Transition } from 'framer-motion';

/**
 * Motion tokens (Amicro design system §4): every one-shot animation stays under 300ms,
 * entrances ease out on [0.16, 1, 0.3, 1], exits are shorter and use the exit curve.
 */
export const enterTransition: Transition = { duration: 0.25, ease: [0.16, 1, 0.3, 1] };
export const exitTransition: Transition = { duration: 0.14, ease: [0.25, 0.46, 0.45, 0.94] };
export const iconEnterTransition: Transition = { duration: 0.2, ease: [0.16, 1, 0.3, 1] };
export const iconExitTransition: Transition = { duration: 0.12, ease: [0.25, 0.46, 0.45, 0.94] };
export const menuEnterTransition: Transition = { duration: 0.2, ease: [0.16, 1, 0.3, 1] };
export const modalSpring: Transition = { type: 'spring', duration: 0.25, bounce: 0.15 };
export const hoverSpring: Transition = { type: 'spring', stiffness: 400, damping: 28 };

/** Stagger capped so a full list finishes inside the timing budget. */
export function stagger(index: number): number {
  return Math.min(index * 0.015, 0.05);
}

```
```components/shared/Modal.tsx
import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { enterTransition, exitTransition, modalSpring } from '../../utils/motion';

interface ModalProps {
  open: boolean;
  labelledBy: string;
  onClose: () => void;
  closeOnBackdrop?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  className?: string;
  children: React.ReactNode;
}

const FOCUSABLE = 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Shared dialog shell. Backdrop fades in 200ms / out 140ms; the panel springs in
 * (0.25s, bounce 0.15) from scale 0.96 + blur and exits faster on the exit curve.
 * Focus is trapped while open and restored on close.
 */
export function Modal({ open, labelledBy, onClose, closeOnBackdrop = true, initialFocusRef, className = '', children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const id = window.requestAnimationFrame(() => {
      const target = initialFocusRef?.current ?? panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      target?.focus();
    });
    return () => {
      window.cancelAnimationFrame(id);
      restoreRef.current?.focus?.();
    };
  }, [open, initialFocusRef]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== 'Tab' || !panelRef.current) return;
    const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/60 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { ...enterTransition, duration: 0.2 } }}
          exit={{ opacity: 0, transition: exitTransition }}
          onClick={closeOnBackdrop ? onClose : undefined}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            onKeyDown={onKeyDown}
            onClick={(e) => e.stopPropagation()}
            className={`glass glass-strong w-full rounded-[22px] ${className}`}
            style={{ willChange: 'transform, opacity, filter' }}
            initial={{ opacity: 0, scale: 0.96, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', transition: modalSpring }}
            exit={{ opacity: 0, scale: 0.98, y: 4, filter: 'blur(2px)', transition: exitTransition }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```
```utils/sim/comms.ts
import type { CommsState } from '../../types/mission';

export const LINK_OPEN_S = 90;
export const LINK_CLOSED_S = 45;
/** Signal below this is a no-go for launch and raises an antenna fault. */
export const WEAK_SIGNAL = 0.5;

export type CommsChange = 'opened' | 'closed' | null;

export function createComms(enabled: boolean): CommsState {
  return { enabled, open: true, remaining: enabled ? 60 : 0, strength: 0.82, calibration: 1 };
}

/**
 * Alternates open/closed link windows. Signal rises and falls across each pass and is scaled
 * by antenna calibration and storm intensity; storms also burn open windows faster.
 */
export function stepComms(prev: CommsState, dt: number, storm: number): { next: CommsState; change: CommsChange } {
  const calibration = Math.max(0.2, prev.calibration - dt * (0.0025 + 0.006 * storm));
  const quality = (0.4 + 0.6 * calibration) * (1 - 0.45 * storm);
  if (!prev.enabled) {
    return { next: { ...prev, open: true, remaining: 0, calibration, strength: 0.86 * quality }, change: null };
  }
  let open = prev.open;
  let remaining = prev.remaining - dt * (open ? 1 + 0.6 * storm : 1);
  let change: CommsChange = null;
  if (remaining <= 0) {
    open = !open;
    remaining += open ? LINK_OPEN_S : LINK_CLOSED_S;
    change = open ? 'opened' : 'closed';
  }
  const pass = Math.min(1, Math.max(0, 1 - remaining / LINK_OPEN_S));
  const strength = open ? (0.3 + 0.65 * Math.sin(Math.PI * pass)) * quality + 0.12 * (1 - storm) : 0;
  return { next: { ...prev, open, remaining, calibration, strength: Math.min(1, strength) }, change };
}

/** 0–5 signal bars for the link indicator. */
export function signalBars(c: CommsState): number {
  return c.open ? Math.max(1, Math.ceil(c.strength * 5)) : 0;
}

```
```utils/haptics.ts
export type HapticType = 'light' | 'medium' | 'success' | 'error';

const PATTERNS: Record<HapticType, number | number[]> = {
  light: 8,
  medium: 16,
  success: [10, 40, 10],
  error: [30, 40, 30],
};

let enabled = true;

/** User setting; independent of prefers-reduced-motion. */
export function setHapticsEnabled(on: boolean): void {
  enabled = on;
}

/** Web vibration where supported; silently no-ops elsewhere or when disabled. */
export function haptic(type: HapticType = 'light'): void {
  if (!enabled) return;
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') navigator.vibrate(PATTERNS[type]);
  } catch {
    /* unsupported */
  }
}

```
```data/hotspots.ts
import type { HotspotId } from '../types/mission';

export interface HotspotDef {
  id: HotspotId;
  vehicle: 'rover' | 'lander';
  name: string;
  part: string;
  /** Local offset on the vehicle rig (rover group / lander body), meters. */
  offset: [number, number, number];
  /** Camera zoom used when inspecting this part. */
  zoom: number;
}

export const hotspots: HotspotDef[] = [
  { id: 'drill', vehicle: 'rover', name: 'Coring drill', part: 'ATLAS-01 · Arm', offset: [0, 0.8, 1.15], zoom: 0.45 },
  { id: 'solar', vehicle: 'rover', name: 'Solar array', part: 'ATLAS-01 · Deck', offset: [-0.55, 1.36, -0.65], zoom: 0.45 },
  { id: 'navcam', vehicle: 'rover', name: 'Navigation camera', part: 'ATLAS-01 · Mast', offset: [0.3, 2.85, 0.75], zoom: 0.45 },
  { id: 'engine', vehicle: 'lander', name: 'Main engines', part: 'IX-7 · Aft section', offset: [0, 1.5, 0], zoom: 1 },
  { id: 'airlock', vehicle: 'lander', name: 'Sample airlock', part: 'IX-7 · Service bay', offset: [0, 4.4, 1.95], zoom: 1 },
  { id: 'antenna', vehicle: 'lander', name: 'High-gain antenna', part: 'IX-7 · Upper stage', offset: [-1.75, 10.4, 0.3], zoom: 1 },
];

```
```components/shared/SignalBars.tsx
import React from 'react';

interface SignalBarsProps {
  /** Active bars, 0–5. */
  bars: number;
  label: string;
}

const HEIGHTS = [4, 6, 8, 10, 12];

export function SignalBars({ bars, label }: SignalBarsProps) {
  return (
    <span role="img" aria-label={label} title={label} className="flex h-3 items-end gap-[2px]">
      {HEIGHTS.map((h, i) => (
        <span
          key={h}
          className={`w-[3px] rounded-[1px] transition-colors duration-200 ${i < bars ? 'bg-blue' : 'bg-ink-5'}`}
          style={{ height: h }}
        />
      ))}
    </span>
  );
}

```
```components/drawer/BentoDrawer.tsx
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUpIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import type { GameState } from '../../types/game';
import { queuedMb } from '../../utils/game/comms';
import { farmOutput, pillarsDone } from '../../utils/game/pillars';
import { MissionData } from './MissionData';

interface BentoDrawerProps {
  open: boolean;
  onToggle: () => void;
  game: GameState;
}

const EASE_ENTER = [0.16, 1, 0.3, 1] as const;
const EASE_EXIT = [0.25, 0.46, 0.45, 0.94] as const;

/** Pull-up tray along the bottom edge of the stage. Collapsed it is a slim status strip. */
export function BentoDrawer({ open, onToggle, game }: BentoDrawerProps) {
  const { t } = useI18n();
  const d = t.drawer;
  const r = game.rover;
  return (
    <section aria-label={d.title} className="glass glass-strong absolute inset-x-0 bottom-0 z-30 hidden lg:block" style={{ borderLeft: 0, borderRight: 0, borderBottom: 0 }}>
      <motion.div
        onPanEnd={(_, info) => {
          if (info.offset.y < -24 && !open) onToggle();
          else if (info.offset.y > 24 && open) onToggle();
        }}
        className="flex h-11 touch-none select-none items-center gap-4 px-5"
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls="bento-drawer-body"
          className="-ml-2 flex h-8 items-center gap-2 rounded-lg px-2 text-ink transition-colors duration-150 hover:bg-fill-2"
        >
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2, ease: EASE_ENTER }} className="grid place-items-center">
            <ChevronUpIcon size={15} strokeWidth={1.6} />
          </motion.span>
          <span className="whitespace-nowrap text-[11px] font-[600] uppercase tracking-[0.14em]">{d.title}</span>
          <kbd className="rounded-[5px] border border-line-2 px-1.5 font-sans text-[10px] font-[550] text-ink-3">B</kbd>
        </button>

        <dl className="ml-auto flex items-center gap-5 whitespace-nowrap">
          <MiniStat label={d.battery} value={`${Math.round(r.battery)}%`} tone={r.battery < 30 ? 'text-red' : 'text-ink'} />
          <MiniStat label={d.wheels} value={`${Math.round(r.wheels)}%`} tone={r.wheels < 35 ? 'text-red' : 'text-ink'} />
          <MiniStat label={d.power} value={`${farmOutput(game)} W`} />
          <MiniStat label={d.data} value={`${queuedMb(game)} MB`} tone={game.dataQueue.length ? 'text-blue' : 'text-ink'} />
          {game.storm.sols > 0 && <MiniStat label={d.storm} value={d.stormSols(game.storm.sols)} tone="text-red" />}
          <MiniStat label={d.pillars} value={`${pillarsDone(game)}/4`} className="hidden xl:flex" />
        </dl>
      </motion.div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="bento-drawer-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.26, ease: EASE_ENTER } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.18, ease: EASE_EXIT } }}
            className="overflow-hidden"
          >
            <div className="scroll-quiet max-h-[min(46dvh,460px)] overflow-y-auto px-5 pb-5 pt-1">
              <MissionData game={game} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function MiniStat({ label, value, tone = 'text-ink', className = 'flex' }: { label: string; value: string; tone?: string; className?: string }) {
  return (
    <div className={`${className} items-baseline gap-2`}>
      <dt className="hud-label">{label}</dt>
      <dd className={`text-[12px] font-[550] ${tone}`}>{value}</dd>
    </div>
  );
}

```
```utils/sim/weather.ts
import type { WeatherState } from '../../types/mission';

export const STORM_WARNING_S = 20;
const RAMP_S = 8;

export type WeatherChange = 'warning' | 'storm' | 'cleared' | null;

function between(a: number, b: number): number {
  return a + Math.random() * (b - a);
}

export function createWeather(): WeatherState {
  // First front arrives early so new operators meet it during the traverse.
  return { phase: 'clear', timer: 150, duration: 150, intensity: 0 };
}

/** clear (3–4 min) → warning (20 s) → storm (40–60 s, ramped) → clear. */
export function stepWeather(prev: WeatherState, dt: number): { next: WeatherState; change: WeatherChange } {
  let { phase, timer, duration } = prev;
  timer -= dt;
  let change: WeatherChange = null;
  if (timer <= 0) {
    if (phase === 'clear') {
      phase = 'warning';
      duration = STORM_WARNING_S;
      change = 'warning';
    } else if (phase === 'warning') {
      phase = 'storm';
      duration = between(40, 60);
      change = 'storm';
    } else {
      phase = 'clear';
      duration = between(180, 240);
      change = 'cleared';
    }
    timer = duration;
  }
  const into = duration - timer;
  const intensity = phase === 'storm' ? Math.max(0, Math.min(1, into / RAMP_S, timer / RAMP_S)) : 0;
  return { next: { phase, timer, duration, intensity }, change };
}

export function weatherLabel(w: WeatherState): string {
  if (w.phase === 'storm') return `Dust storm · ${Math.ceil(w.timer)} s`;
  if (w.phase === 'warning') return `Dust front inbound · ${Math.ceil(w.timer)} s`;
  return 'Clear';
}

```
```utils/sim/faults.ts
import type { Fault, FaultSystem } from '../../types/mission';

let nextFaultId = 1;

export function activeFault(faults: Fault[], system: FaultSystem): Fault | undefined {
  return faults.find((f) => f.system === system && f.resolvedAt === null);
}

export function activeFaults(faults: Fault[]): Fault[] {
  return faults.filter((f) => f.resolvedAt === null);
}

/** Opens a fault unless one is already active for the system. Returns the new list and whether it opened. */
export function openFault(
  faults: Fault[],
  system: FaultSystem,
  title: string,
  severity: Fault['severity'],
  at: number
): { faults: Fault[]; opened: boolean } {
  if (activeFault(faults, system)) return { faults, opened: false };
  return { faults: [...faults, { id: nextFaultId++, system, title, severity, at, resolvedAt: null }], opened: true };
}

export function resolveFault(faults: Fault[], system: FaultSystem, at: number): { faults: Fault[]; resolved: boolean } {
  if (!activeFault(faults, system)) return { faults, resolved: false };
  return { faults: faults.map((f) => (f.system === system && f.resolvedAt === null ? { ...f, resolvedAt: at } : f)), resolved: true };
}

```
```utils/sim/power.ts
import type { LanderState } from '../../types/mission';
import type { RoverState } from '../../types/rover';

/** Nameplate output of the base solar field at 175 W/m² and clean panels. */
const FIELD_KW = 4.2;
const BASE_LOAD_KW = 2.6;
/** % state of charge gained per kW·s of net power. */
const SOC_PER_KWS = 0.08;

export function solarFieldKw(irradiance: number, arrayDust: number): number {
  return Math.max(0, (irradiance / 175) * FIELD_KW * (1 - arrayDust));
}

export function baseLoadKw(lander: LanderState, rover: RoverState): number {
  let load = BASE_LOAD_KW;
  if (rover.status === 'docked') load += 0.6;
  if (lander.phase === 'checking') load += 0.4;
  if (lander.phase === 'hotfire') load += 0.8;
  if (lander.phase === 'countdown') load += 1.2;
  return load;
}

export function stepPower(power: number, netKw: number, dt: number): number {
  return Math.min(100, Math.max(0, power + netKw * SOC_PER_KWS * dt));
}

/** Rover reserve below which drive and science commands are refused. */
export const LOW_RESERVE = 15;

```
```utils/scene/tactical.ts
import * as THREE from 'three';
import { sitePositions } from '../../data/mission';
import { routePoint } from '../route';
import { terrainHeight } from '../terrain';

const COVERAGE_RADIUS = 70;

/** Flat ground ring at a point. */
function groundRing(inner: number, outer: number, color: string, opacity: number): THREE.Mesh {
  const m = new THREE.Mesh(
    new THREE.RingGeometry(inner, outer, 96),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false })
  );
  m.rotation.x = -Math.PI / 2;
  m.renderOrder = 2;
  return m;
}

/** Steepest point along the traverse, sampled from terrain height. */
function steepestRoutePoint(): THREE.Vector3 {
  let best = 0;
  let at = routePoint(0.5);
  const N = 80;
  for (let i = 1; i < N; i++) {
    const a = routePoint((i - 1) / N);
    const b = routePoint(i / N);
    const run = Math.hypot(b.x - a.x, b.z - a.z) || 1;
    const slope = Math.abs(b.y - a.y) / run;
    if (slope > best) {
      best = slope;
      at = b;
    }
  }
  return new THREE.Vector3(at.x, at.y, at.z);
}

/**
 * Tactical-camera overlay: link coverage around the antenna tower, the steepest route
 * segment, and the inbound storm direction. Static (no animation) so it respects reduced motion.
 */
export function buildTacticalOverlay() {
  const group = new THREE.Group();
  group.visible = false;
  const { tower, lander } = sitePositions;

  const coverage = groundRing(COVERAGE_RADIUS - 0.8, COVERAGE_RADIUS, '#9cc2f0', 0.55);
  coverage.position.set(tower.x, terrainHeight(tower.x, tower.z) + 0.3, tower.z);
  const coverageFill = new THREE.Mesh(
    new THREE.CircleGeometry(COVERAGE_RADIUS, 96),
    new THREE.MeshBasicMaterial({ color: '#9cc2f0', transparent: true, opacity: 0.06, side: THREE.DoubleSide, depthWrite: false })
  );
  coverageFill.rotation.x = -Math.PI / 2;
  coverageFill.position.copy(coverage.position);
  group.add(coverage, coverageFill);

  const steep = steepestRoutePoint();
  const risk = groundRing(1.8, 2.4, '#f5a857', 0.9);
  risk.position.set(steep.x, steep.y + 0.25, steep.z);
  const riskPost = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 4, 6), new THREE.MeshBasicMaterial({ color: '#f5a857' }));
  riskPost.position.set(steep.x, steep.y + 2, steep.z);
  group.add(risk, riskPost);

  // Storm front: a chevron upwind of the base pointing at the landing site.
  const stormGroup = new THREE.Group();
  const chevron = new THREE.Shape();
  chevron.moveTo(0, 6);
  chevron.lineTo(5, -3);
  chevron.lineTo(0, 0);
  chevron.lineTo(-5, -3);
  chevron.closePath();
  const stormMat = new THREE.MeshBasicMaterial({ color: '#f5a857', transparent: true, opacity: 0.75, side: THREE.DoubleSide, depthWrite: false });
  for (let i = 0; i < 3; i++) {
    const m = new THREE.Mesh(new THREE.ShapeGeometry(chevron), stormMat);
    m.rotation.x = -Math.PI / 2;
    m.position.set(0, 0, i * 9);
    stormGroup.add(m);
  }
  const from = new THREE.Vector3(lander.x + 55, 0, lander.z - 35);
  const dir = new THREE.Vector3(lander.x - from.x, 0, lander.z - from.z).normalize();
  stormGroup.position.set(from.x, terrainHeight(from.x, from.z) + 0.6, from.z);
  stormGroup.rotation.y = Math.atan2(dir.x, dir.z) + Math.PI;
  group.add(stormGroup);

  const coverageMat = coverage.material as THREE.MeshBasicMaterial;
  return {
    group,
    update(visible: boolean, linkOpen: boolean, stormInbound: boolean) {
      group.visible = visible;
      if (!visible) return;
      coverageMat.color.set(linkOpen ? '#9cc2f0' : '#8a8580');
      coverageMat.opacity = linkOpen ? 0.55 : 0.3;
      stormGroup.visible = stormInbound;
    },
  };
}

```
```docs/ARES-Operations-Command-Ja-te-kterveze-si-dokumentum-1.md
# ARES: Operations Command – Játéktervezési dokumentum

Nov 1, 2026 · @Tuliop

## Áttekintés

Az ARES: Operations Command egy böngészőben futó, egyjátékos szimulációs-stratégiai játék. A játékos a Földi Irányítóközpont Missziófelelőse, és Sol 500-ig kell egy marsi leszállóhelyet emberi legénység fogadására alkalmassá minősítenie.

| Elem | Leírás |
| --- | --- |
| Műfaj | szimulációs-stratégiai, erőforrás- és prioritáskezelés |
| Platform | webböngésző, online kapcsolat nélkül is játszható |
| Játékmód | single player, nincs többjátékos mód |
| Szerep | Missziófelelős (Mission Director), az ARES-1 rover távirányítója |
| Időkeret | egy játék Sol 1-től Sol 500-ig tart |
| Központi feszültség | négy AI-tanácsadó ütköző javaslata, korlátos cselekvési pont, jelkésleltetés |
| Hangulat | NASA ihlette irányítóközpont, sötét felület, borostyán kiemelések |

A játékos nem vezeti közvetlenül a rovert. Minden Sol elején megkapja a négy szakági tanácsadó javaslatát, parancssort állít össze belőlük, elküldi, majd kezeli azt, ami a jelkésleltetés alatt a Marson történik. Minden Sol-nak ára van: amit az egyik tanácsadónak megadsz, azt a másiktól veszed el.

## Történet

2031-ben az ARES-1 rover a Jezero-kráterben dolgozik, és a Delta Ridge rétegzett üledékei felé tart. Egy orbiter szokatlan ásványi mintázatot mért ott, ami egykori vízre és esetleg mikrobiális életre utal.

A **Perihelion** legénységi űrhajó indulási ablaka rögzített. Ha a landolási hely nincs minősítve Sol 500-ig, az ablak lezárul, és a következő csak 26 hónap múlva nyílik. A játékos ebben a határidőben dönt: ő a Missziófelelős a Földi Irányítóközpontban, és a végső szó az övé.

Az ARES Programot a NASA és a nemzetközi űrügynökségek indították azzal a céllal, hogy a Mars készen álljon az első emberi kolónia fogadására. A rovert műholdas kapcsolaton, telemetrián és a Command Console felületén keresztül lehet irányítani. A döntésekhez négy szakági csapat (NAV, SYS, SCI, COMM) ad tanácsot, de ezek érdekei folyamatosan ütköznek.

A történet feszültsége egyszerű: a Mars nem vár, a jel percekig utazik, és minden rossz parancsnak napokra szóló következménye lehet.

## Cél: a Habitat Zero minősítés

A játékos akkor nyer, ha Sol 500-ig mind a négy pillér teljesül. Egyetlen hiányzó pillér is elveszíti a játékot, mert ekkor a Perihelion ablaka lezárul.

| Pillér | Teljesítési feltétel | Fő feladatok | Fő tanácsadó |
| --- | --- | --- | --- |
| Víz | a felszín alatti jégkészlet feltérképezve és megerősítve | radaros és fúrásos felmérés a Delta Ridge környékén, mérési adatok feltöltése | SCI, NAV |
| Energia | napelemfarm és RTG együtt legalább 400 W stabil termelés | napelemfarm telepítése és karbantartása, RTG-töltöttség és akkumulátor kezelése | SYS |
| Kommunikáció | relétorony áll, a DSN-kapcsolat megszakítás nélküli | relétorony felállítása, DSN- és orbiter-ablakok beosztása | COMM |
| Tudomány | a C-012 mintatubus (biosignature-jelölt) sikeresen leküldve a Földre | szennyeződésmentes mintavétel, tárolás, elemzés, adatfeltöltés | SCI, COMM |

A pillérek lefedik a koncepció négy mérföldkövét: földtani kutatás és bio-aláírás keresése, erőforrások feltárása, infrastruktúra kiépítése, adatcsomagok visszajuttatása a Földre a Deep Space Networkön (DSN) keresztül.

## Tanácsadók és bizalmi rendszer

A négy NPC-szakértő minden Sol elején javaslatot tesz, a játékos dönt, és a döntésnek következménye van. A tanácsadók érdekei szándékosan ütköznek, így egyik javaslatot sem lehet mindig teljesíteni.

| Tanácsadó | Mit javasol | Mit kér a játékostól | Tipikus ütközés |
| --- | --- | --- | --- |
| NAV (Navigation) | útvonal, waypointok, veszélykerülés | biztonságos, de hosszabb utat | SCI a rövid, kockázatos út mellett érvel |
| SYS (Systems & Power) | akkumulátor, hő, alkatrészek | pihentetné a rovert, spórolna az energiával | SCI fúrni akar, SYS leállítaná a rovert |
| SCI (Science) | spektroszkópia, fúrás, mintatárolás | kockázatos, de értékes célpontokat | NAV és SYS az óvatosabb megoldást kéri |
| COMM (Comms) | DSN, orbiter relék, adatcsomagok | a sávszélesség és a feltöltési ablakok beosztását | SCI nagy adatcsomagot küldene szűk ablakban |

### Bizalmi rendszer

Mindegyik tanácsadónál van egy bizalmi mérő. A játékos döntései mozgatják: egy elfogadott javaslat növeli, egy rendszeres elutasítás csökkenti.

- Ha valamelyiket rendszeresen figyelmen kívül hagyod, romlik a teljesítménye, és pontatlanabb javaslatokat ad, például rossz terepbecslést.
- Ha mindig csak egyiküknek engedsz, a többi terület leromlik.
- A játékos így nem nyerhet azzal, hogy egyetlen tanácsadót követ: a bizalmat el kell osztani.

Javasolt sávok a mérő 0 és 100 közötti skáláján (a prototípusnál hangolandó):

| Bizalom | Hatás a tanácsadóra |
| --- | --- |
| 70-100 | pontos becslések, alternatív megoldást is felkínál |
| 30-69 | normál működés |
| 0-29 | pontatlan javaslatok, hibás becslések, lassabb munka |

## Rendszerek

A játék öt egymásba kapcsolódó rendszerre épül, és mindegyik ugyanazt a korlátos készletet terheli: energiát, időt, alkatrészt és sávszélességet.

| Rendszer | Működés | Mit dönt a játékos |
| --- | --- | --- |
| Jelkésleltetés | a jel oda-vissza 4-24 percig utazik; a parancsokat előre kell programozni, és végrehajtás közben nem állíthatók le | milyen hosszú parancssort küld el, és mennyi tartalékot hagy a váratlan eseményekre |
| Energia és hő | éjszaka a hőmérséklet -68 °C-ig csökken, a fűtés meríti az akkumulátort; napelemek, RTG és akkumulátor adja az áramot | melegít vagy mozog; mit kapcsol ki a spóroláshoz |
| Kopás és inventory | sérülnek a kerekek, törik a fúrófej, fogynak a mintatubusok; a készlet korlátos | mikor fúr, mikor cserél alkatrészt, mit tart tartalékban |
| Kommunikációs ablakok | a Madrid és Goldstone DSN-állomások átfedése korlátozott; az MRO és a TGO relé áthaladásakor szűk az adatsáv | mikor és milyen sorrendben küldi fel az adatcsomagokat |
| Mintavétel | egy rossz mintavétel szennyeződést okoz, és érvénytelenné teszi a tudományos eredményt | melyik célpontot, milyen eszközzel és milyen biztonsági lépésekkel mintázza |

### Cselekvési pontok

Minden Sol-on korlátos számú parancsot lehet kiadni. Egy parancs egy cselekvési pontba kerül, és nem lehet mindent egyszerre elvégezni. A prioritások meghatározása adja a játék fő feszültségét.

### Idő-kontroll

A játék szüneteltethető, és manuálisan gyorsítható 1x, 5x és 20x sebességre, ha nincs aktív művelet. Bármikor lehet menteni, és ehhez nincs szükség online kapcsolatra.

## Hibák, események és nehézségek

A játék nehézségét nem a gyors reflex adja, hanem az, hogy minden hiba egy előre meghozott döntés következménye. Az események véletlenszerűen érkeznek, a játékos pedig a jelkésleltetés miatt csak utólag reagálhat.

| Esemény | Kiváltó ok | Következmény | Ellenlépés |
| --- | --- | --- | --- |
| Porvihar | globális vihar, magas porátlátszatlanság | a napenergia csökken, romlik a kamera és a kapcsolat | túlélő üzemmód, fogyasztás visszavétele, tartalék akkumulátor |
| Éjszakai hideg | -68 °C körüli hőmérséklet | a fűtés meríti az akkumulátort | melegítés mozgás helyett, napközbeni töltés |
| Kopás | sziklás terep, sok fúrás | sérült kerék, törött fúrófej, lassabb mozgás | alkatrészcsere, óvatosabb útvonal |
| Kapcsolatkiesés | szűk DSN-ablak, MRO és TGO áthaladás | az adatcsomag nem megy fel, a parancs késik | a feltöltés áttervezése a következő ablakra |
| Szélroham | hirtelen megugró szélsebesség | a rover megáll, vagy a mérés elromlik | a mozgás szüneteltetése, tartalékidő a tervben |
| Szennyeződés | hibás mintavétel | a tudományos eredmény érvénytelen | új minta, és a tubus feláldozása |
| Szoftverhiba | hibás waypoint-feltöltés | a rover safe módba lép, és órákig nem reagál | a waypointok ellenőrzése a küldés előtt |
| Hibás tanács | egy tanácsadó bizalma alacsony | pontatlan becslés, például rossz terepbecslés | a bizalom helyreállítása, kereszt-ellenőrzés más tanácsadóval |

Az események egymásra épülhetnek: egy vihar alatt a fűtés, a gyenge kapcsolat és a lemerülő akkumulátor együtt okoz kényszerhelyzetet.

## Nehézségi szintek

A három szint ugyanazt a küldetést más szorítással játszatja: a különbség a késleltetés, a hibák gyakorisága és a tartalékok mennyisége.

| Szint | Jellemző | Visszavonás |
| --- | --- | --- |
| Felfedező | enyhébb késleltetés, ritkább hibák, több tartalék alkatrész | van |
| Mérnök | az alapélmény, kiegyensúlyozott | van |
| Missziófelelős | hosszú késleltetés, gyakori viharok, szűk erőforrások | nincs |

A Missziófelelős szinten permadeath is választható: egy mentési slot van, és nincs újratöltés.

## Győzelem, vereség és pontozás

A játékos akkor nyer, ha mind a négy pillér teljesül Sol 500-ig. A győzelem után Bronz, Ezüst vagy Arany minősítést kap.

### Vereség

| Feltétel | Mikor következik be |
| --- | --- |
| A rover elvesztése | végzetes sérülés, vagy a rover tartósan működésképtelen |
| Hiányzó pillér Sol 500-nál | az idő lejár, és legalább egy pillér nem teljesült |
| A C-012 minta végleges elvesztése | a minta megsemmisül vagy használhatatlanná válik, és nincs pótlás |

### Pontozás

A minősítés három szempontból áll össze, és minden Sol lezárásakor frissül.

| Szempont | Mit mér |
| --- | --- |
| Hatékonyság | erőforrás-takarékosság, a cselekvési pontok kihasználása, a határidőhöz képest megtakarított Sol |
| Kockázatkezelés | elkerült hibák, a kritikus események kezelése, a bizalmi mérők egyensúlya |
| Tudományos érték | a minták minősége, a C-012 feltöltése, a megerősített jégkészlet pontossága |

A pontos küszöbértékeket (mennyi pont kell a Bronzhoz, az Ezüsthöz és az Arannyal) a prototípus tesztelése után érdemes rögzíteni.

## Újrajátszhatóság

Minden új játék más lefolyású, mert a viharok időzítése és a hibaesemények véletlenszerűen alakulnak. Három indulási régió eltérő terepet és kockázatot ad.

| Régió | Jellemző (javaslat, a tartalomtervezésnél véglegesítendő) |
| --- | --- |
| Jezero | az alapküldetés színhelye: üledékes rétegek, a Delta Ridge felé vezető út |
| Terra Sirenum | meredekebb, szakadékosabb terep, nehezebb útvonalválasztás |
| Hellas | mély medence, más por- és hőviszonyok, eltérő kommunikációs ablakok |

A játékos eredménylistát és személyes rekordokat is kap, ezek offline is működnek.

## Felület és vizuális irány

A felület egy sötét, natív macOS-alkalmazásra emlékeztető irányítóközpont: a marsi panoráma tölti ki a teret, fölötte matt üvegszerű (glassmorphism) HUD-panelek lebegnek bento-rácsban. A négy hivatkozott kép mind ezt az irányt mutatja.

### Elrendezés

- **Bal oldalsáv:** fő nézetek, például Overview, Rover, Science, Navigation, Comms, Environment, Inventory, Reports, Settings.
- **Központi nézet:** a rover és a terep élő panorámája, rárakódó pontokkal (célpont, rétegzett kőzet, útvonal, távolság).
- **Alsó panelsor:** rover-állapot, energia, navigáció, kommunikáció, tudomány, inventory, rendszeregészség, küldetési idővonal, legutóbbi események.
- **Alsó parancssáv:** Drive, Sample, Analyze, Navigate, Uplink és a Send Command gomb; mellette egy Auto/Safe kapcsoló.
- **Fejléc:** Sol-számláló és időbélyeg, a küldetés neve.

### Színek és jelzések

| Szín | Jelentés |
| --- | --- |
| Borostyán | aktív cél, kijelölt parancs, kiemelés |
| Zöld | működő, nominális rendszer |
| Kék | kommunikációs csatornák |
| Piros | veszély, hiba, kapcsolatkiesés (a képeken a Live jelzés is) |

### Tanácsadói panelek

A NAV, SYS, SCI és COMM javaslata külön panelben jelenik meg, a bizalmi mérőjükkel együtt. A második kép három oldalpanelje (NAV, SCI, SYS, COMM) adja ehhez az irányt.

### Egyeztetendő a képekkel

A képeken a Sol-számláló 482, 784 és 1284, a játékban viszont Sol 1 és Sol 500 között fut. A felületben a küldetés tényleges Sol-értékét kell mutatni, a képeken látható számok csak helyfoglalók.

```
```types/game.ts
import type { Msg } from './i18n';

export type AdvisorId = 'nav' | 'sys' | 'sci' | 'comm';
export type PillarId = 'water' | 'power' | 'comms' | 'science';
export type DifficultyId = 'explorer' | 'engineer' | 'director';
export type RegionId = 'jezero' | 'sirenum' | 'hellas';
export type ActId = 'discovery' | 'expansion' | 'survival' | 'finalApproach';
export type CommandId =
  | 'drive'
  | 'navigate'
  | 'survey'
  | 'drill'
  | 'selectTarget'
  | 'siteSurvey'
  | 'spectroscopy'
  | 'prep'
  | 'sample'
  | 'sealSample'
  | 'checkSample'
  | 'analyze'
  | 'preparePacket'
  | 'uplink'
  | 'deploySolar'
  | 'buildRelay'
  | 'heat'
  | 'repair'
  | 'rest';
export type GameView = 'command' | 'navigation' | 'science' | 'systems' | 'environment' | 'comms' | 'reports' | 'settings';
export type GamePhase = 'planning' | 'uplink' | 'executing' | 'night' | 'report';
export type TimeSpeed = 1 | 5 | 20;
export type Tone = 'amber' | 'green' | 'blue' | 'red' | 'neutral';
export type EventKind =
  | 'storm'
  | 'stormEnd'
  | 'cold'
  | 'wear'
  | 'commsLoss'
  | 'wind'
  | 'contamination'
  | 'software'
  | 'badAdvice'
  | 'brownout'
  | 'discovery'
  | 'favorableWindow'
  | 'technology'
  | 'dustLoad'
  | 'milestone';
export type Medal = 'gold' | 'silver' | 'bronze';
export type C012State = 'none' | 'selected' | 'surveyed' | 'spectrographed' | 'sampled' | 'sealed' | 'checked' | 'analyzed' | 'packetReady' | 'uplinked';
export type Station = 'Madrid' | 'Goldstone' | 'MRO' | 'TGO' | 'Relay';

export interface QueueItem {
  uid: number;
  command: CommandId;
  source: AdvisorId | 'manual';
  proposalId?: string;
}

export interface Proposal {
  id: string;
  advisor: AdvisorId;
  title: Msg;
  rationale: Msg;
  commands: CommandId[];
  /** Advisor-reported estimate. Noisy when trust is low. */
  estimate: Msg;
  pillar: PillarId | null;
  stance: 'push' | 'conserve';
  alternative?: boolean;
}

export interface AdvisorState {
  trust: number;
  ignoredStreak: number;
  accepted: number;
  justifiedRejections: number;
}

export interface CommsWindow {
  station: Station;
  /** LMST hours 0–24. */
  start: number;
  end: number;
  mbps: number;
}

export interface DataPacket {
  id: number;
  kind: 'ice' | 'c012';
  mb: number;
}

export interface EnvironmentState {
  dayTempC: number;
  pressurePa: number;
  windMs: number;
  dustIndex: number;
  solarIrradiance: number;
  daylightHours: number;
  visibilityKm: number;
  /** 0.48–1.15 multiplier for science accuracy and contamination risk. */
  scienceQuality: number;
}

export interface SampleRecord {
  id: 'C-012';
  state: C012State;
  location: string;
  selectedSol: number | null;
  collectedSol: number | null;
  type: 'biosignatureCandidate';
  mineralogy: string[];
  quality: number;
  contaminated: boolean | null;
  storage: 'uncollected' | 'arm' | 'tube' | 'cache';
  analysis: 'pending' | 'organicsDetected' | 'inconclusive';
  uploaded: boolean;
}

export interface Inventory {
  drillBits: number;
  tubes: number;
  spares: number;
  solarKits: number;
  relayKits: number;
}

export interface RoverHealth {
  /** Battery state of charge, %. */
  battery: number;
  /** Wheel health, %. */
  wheels: number;
  /** Current drill bit health, %. */
  drill: number;
  /** Deck panel dust cover 0–1. */
  dust: number;
  safeModeSols: number;
  brownouts: number;
}

export interface PillarProgress {
  water: { coverage: number; cores: number; uplinked: boolean };
  power: { farmW: number; rtgW: number; streak: number };
  comms: { relay: number; streak: number };
  science: { c012: C012State; voidedTubes: number };
}

export interface GameEvent {
  id: number;
  sol: number;
  kind: EventKind;
  title: Msg;
  detail: Msg;
  tone: Tone;
  counter?: CommandId;
  /** Related events share a chain id so cause and consequences remain visible. */
  chainId?: string;
  chainStep?: number;
}

export interface StepResult {
  command: CommandId;
  source: AdvisorId | 'manual';
  ok: boolean;
  skipped?: boolean;
  title: Msg;
  detail: Msg;
  routeAfter: number;
  event?: GameEvent;
}

export interface ScoreBreakdown {
  efficiency: number;
  risk: number;
  science: number;
  total: number;
}

export interface SolReport {
  sol: number;
  steps: StepResult[];
  events: GameEvent[];
  batteryBefore: number;
  batteryAfter: number;
  routeBefore: number;
  routeAfter: number;
  trustDelta: Record<AdvisorId, number>;
  pillarsBefore: Record<PillarId, number>;
  pillarsAfter: Record<PillarId, number>;
  score: ScoreBreakdown;
  apUsed: number;
  apBudget: number;
  nightTemp: number;
  heated: boolean;
  environment: EnvironmentState;
  act: ActId;
  restSkip?: number;
}

export interface GameOutcome {
  result: 'victory' | 'defeat';
  reason: Msg;
  medal: Medal | null;
}

export interface GameStats {
  apUsed: number;
  apAvailable: number;
  faults: number;
  crisesHandled: number;
  discoveries: number;
  eventChainsBroken: number;
}

export interface GameState {
  version: 3;
  runId: string;
  slot: number;
  seed: number;
  rng: number;
  difficulty: DifficultyId;
  region: RegionId;
  permadeath: boolean;
  sol: number;
  act: ActId;
  delayMin: number;
  /** 0–1 progress along the traverse to Delta Ridge. */
  route: number;
  waypointsVerified: boolean;
  sterile: boolean;
  environment: EnvironmentState;
  sample: SampleRecord;
  rover: RoverHealth;
  inventory: Inventory;
  pillars: PillarProgress;
  storm: { sols: number; intensity: number; chainId: string | null; chainStep: number };
  windows: CommsWindow[];
  dataQueue: DataPacket[];
  advisors: Record<AdvisorId, AdvisorState>;
  proposals: Proposal[];
  apBudget: number;
  events: GameEvent[];
  reports: SolReport[];
  score: ScoreBreakdown;
  stats: GameStats;
  outcome: GameOutcome | null;
  nextId: number;
  startedAt: number;
}

export interface SlotSummary {
  slot: number;
  savedAt: number;
  sol: number;
  difficulty: DifficultyId;
  region: RegionId;
  permadeath: boolean;
  pillarsDone: number;
  ended: boolean;
}

export interface LeaderboardEntry {
  id: string;
  date: number;
  difficulty: DifficultyId;
  region: RegionId;
  score: number;
  medal: Medal | null;
  sol: number;
  result: 'victory' | 'defeat';
  permadeath: boolean;
}

export interface NewGameOptions {
  difficulty: DifficultyId;
  region: RegionId;
  slot: number;
  permadeath: boolean;
  seed?: number;
}

```
```data/advisors.ts
import { AntennaIcon, CompassIcon, CpuIcon, MicroscopeIcon } from 'lucide-react';
import type { AdvisorId, PillarId } from '../types/game';

export const advisorOrder: AdvisorId[] = ['nav', 'sci', 'sys', 'comm'];

export const advisors: Record<
  AdvisorId,
  { code: string; name: string; role: string; lead: string; icon: typeof CompassIcon; pillars: PillarId[]; wants: string }
> = {
  nav: {
    code: 'NAV',
    name: 'Navigation',
    role: 'Route, waypoints, hazard avoidance',
    lead: 'Dr. Imani Okafor',
    icon: CompassIcon,
    pillars: ['water'],
    wants: 'Safe, verified routes even if they are longer',
  },
  sci: {
    code: 'SCI',
    name: 'Science',
    role: 'Spectroscopy, drilling, sample custody',
    lead: 'Dr. Lena Varga',
    icon: MicroscopeIcon,
    pillars: ['water', 'science'],
    wants: 'Risky but valuable targets, sooner',
  },
  sys: {
    code: 'SYS',
    name: 'Systems & Power',
    role: 'Battery, thermal, parts, power farm',
    lead: 'Marco Bellini',
    icon: CpuIcon,
    pillars: ['power'],
    wants: 'Rest the rover and protect the battery',
  },
  comm: {
    code: 'COMM',
    name: 'Communications',
    role: 'DSN, orbiter relays, data packets',
    lead: 'Aiko Tanaka',
    icon: AntennaIcon,
    pillars: ['comms', 'science'],
    wants: 'Bandwidth and uplink windows planned around data',
  },
};

/** Trust bands from the design doc (0–29 unreliable, 30–69 normal, 70–100 high). */
export const TRUST_HIGH = 70;
export const TRUST_LOW = 30;
export const TRUST_START = 55;

```
```data/gameCommands.ts
import {
  AntennaIcon,
  BatteryChargingIcon,
  CheckCheckIcon,
  CompassIcon,
  CrosshairIcon,
  FileArchiveIcon,
  FlameIcon,
  FlaskConicalIcon,
  MicroscopeIcon,
  NavigationIcon,
  PackageCheckIcon,
  PickaxeIcon,
  RadarIcon,
  SatelliteDishIcon,
  ScanSearchIcon,
  ShieldCheckIcon,
  SunIcon,
  TestTubeIcon,
  WrenchIcon,
} from 'lucide-react';
import type { AdvisorId, CommandId } from '../types/game';

export interface CommandDef {
  id: CommandId;
  icon: typeof SunIcon;
  /** Battery cost in % (negative = gain). */
  power: number;
  owner: AdvisorId;
  /** Planning complexity: simple = 1 AP, complex = 2 AP, critical = 3 AP. */
  complexity: 'simple' | 'complex' | 'critical';
}

export const commandDefs: Record<CommandId, CommandDef> = {
  drive: { id: 'drive', icon: NavigationIcon, power: 12, owner: 'nav', complexity: 'simple' },
  navigate: { id: 'navigate', icon: CompassIcon, power: 3, owner: 'nav', complexity: 'simple' },
  survey: { id: 'survey', icon: RadarIcon, power: 8, owner: 'sci', complexity: 'complex' },
  drill: { id: 'drill', icon: PickaxeIcon, power: 12, owner: 'sci', complexity: 'critical' },
  selectTarget: { id: 'selectTarget', icon: CrosshairIcon, power: 1, owner: 'sci', complexity: 'simple' },
  siteSurvey: { id: 'siteSurvey', icon: ScanSearchIcon, power: 5, owner: 'sci', complexity: 'complex' },
  spectroscopy: { id: 'spectroscopy', icon: MicroscopeIcon, power: 7, owner: 'sci', complexity: 'complex' },
  prep: { id: 'prep', icon: ShieldCheckIcon, power: 3, owner: 'sci', complexity: 'simple' },
  sample: { id: 'sample', icon: TestTubeIcon, power: 10, owner: 'sci', complexity: 'critical' },
  sealSample: { id: 'sealSample', icon: PackageCheckIcon, power: 2, owner: 'sci', complexity: 'simple' },
  checkSample: { id: 'checkSample', icon: CheckCheckIcon, power: 3, owner: 'sci', complexity: 'complex' },
  analyze: { id: 'analyze', icon: FlaskConicalIcon, power: 6, owner: 'sci', complexity: 'complex' },
  preparePacket: { id: 'preparePacket', icon: FileArchiveIcon, power: 2, owner: 'comm', complexity: 'simple' },
  uplink: { id: 'uplink', icon: SatelliteDishIcon, power: 4, owner: 'comm', complexity: 'complex' },
  deploySolar: { id: 'deploySolar', icon: SunIcon, power: 8, owner: 'sys', complexity: 'critical' },
  buildRelay: { id: 'buildRelay', icon: AntennaIcon, power: 9, owner: 'comm', complexity: 'critical' },
  heat: { id: 'heat', icon: FlameIcon, power: 0, owner: 'sys', complexity: 'simple' },
  repair: { id: 'repair', icon: WrenchIcon, power: 5, owner: 'sys', complexity: 'complex' },
  rest: { id: 'rest', icon: BatteryChargingIcon, power: -20, owner: 'sys', complexity: 'simple' },
};

/** Manual palette order in the sequence dock. Act locks are applied at render time. */
export function commandAp(id: CommandId): number {
  const complexity = commandDefs[id].complexity;
  return complexity === 'critical' ? 3 : complexity === 'complex' ? 2 : 1;
}

export function sequenceAp(commands: CommandId[]): number {
  return commands.reduce((sum, id) => sum + commandAp(id), 0);
}

export const paletteOrder: CommandId[] = [
  'drive',
  'navigate',
  'survey',
  'drill',
  'selectTarget',
  'siteSurvey',
  'spectroscopy',
  'prep',
  'sample',
  'sealSample',
  'checkSample',
  'analyze',
  'preparePacket',
  'uplink',
  'deploySolar',
  'buildRelay',
  'heat',
  'repair',
  'rest',
];

```
```data/pillars.ts
import { DropletIcon, RadioTowerIcon, SparklesIcon, ZapIcon } from 'lucide-react';
import type { AdvisorId, PillarId } from '../types/game';

export const pillarOrder: PillarId[] = ['water', 'power', 'comms', 'science'];

export const pillars: Record<PillarId, { name: string; goal: string; icon: typeof ZapIcon; owners: AdvisorId[] }> = {
  water: { name: 'Water', goal: 'Subsurface ice mapped, cored and confirmed', icon: DropletIcon, owners: ['sci', 'nav'] },
  power: { name: 'Power', goal: 'Solar farm + RTG ≥ 400 W for 3 Sols', icon: ZapIcon, owners: ['sys'] },
  comms: { name: 'Comms', goal: 'Relay tower up, DSN link unbroken for 5 Sols', icon: RadioTowerIcon, owners: ['comm'] },
  science: { name: 'Science', goal: 'C-012 cored clean, analyzed and uplinked', icon: SparklesIcon, owners: ['sci', 'comm'] },
};

export const POWER_TARGET_W = 400;
export const POWER_STREAK = 3;
export const COMMS_STREAK = 5;
export const ICE_CORES = 2;
export const SOLAR_KIT_W = 70;
export const RELAY_SEGMENT = 34;
/** Route progress gates. */
export const SURVEY_RANGE = 0.3;
export const DRILL_RANGE = 0.5;
export const DEADLINE_SOL = 500;

```
```data/difficulty.ts
import type { DifficultyId, Inventory } from '../types/game';

export interface DifficultyDef {
  id: DifficultyId;
  name: string;
  blurb: string;
  ap: number;
  delay: [number, number];
  faultMult: number;
  stormChance: number;
  undo: boolean;
  inventory: Inventory;
}

export const difficulties: DifficultyDef[] = [
  {
    id: 'explorer',
    name: 'Explorer',
    blurb: 'Shorter delay, rarer faults, extra spares. Undo last Sol.',
    ap: 6,
    delay: [4, 12],
    faultMult: 0.6,
    stormChance: 0.025,
    undo: true,
    inventory: { drillBits: 4, tubes: 5, spares: 6, solarKits: 7, relayKits: 4 },
  },
  {
    id: 'engineer',
    name: 'Engineer',
    blurb: 'The core experience. Balanced risk. Undo available.',
    ap: 5,
    delay: [4, 20],
    faultMult: 1,
    stormChance: 0.04,
    undo: true,
    inventory: { drillBits: 3, tubes: 4, spares: 4, solarKits: 6, relayKits: 3 },
  },
  {
    id: 'director',
    name: 'Mission Director',
    blurb: 'Long delay, frequent storms, tight resources. No undo.',
    ap: 4,
    delay: [8, 24],
    faultMult: 1.4,
    stormChance: 0.065,
    undo: false,
    inventory: { drillBits: 2, tubes: 3, spares: 2, solarKits: 6, relayKits: 3 },
  },
];

export function difficultyDef(id: DifficultyId): DifficultyDef {
  return difficulties.find((d) => d.id === id) ?? difficulties[1];
}

```
```data/regions.ts
import type { RegionId } from '../types/game';

export interface RegionDef {
  id: RegionId;
  name: string;
  blurb: string;
  coords: string;
  driveFactor: number;
  wearMult: number;
  stormMult: number;
  nightTemp: number;
  coldChance: number;
  /** Multiplier on orbiter relay passes. */
  relayMult: number;
  scene: {
    ground: string;
    rocks: string[];
    rockCount: number;
    mountain: string;
    mountainScale: number;
    sky: string;
    stormSky: string;
  };
}

export const regions: RegionDef[] = [
  {
    id: 'jezero',
    name: 'Jezero Crater',
    blurb: 'Sedimentary delta. The baseline road to Delta Ridge.',
    coords: '18.44°N · 77.45°E',
    driveFactor: 1,
    wearMult: 1,
    stormMult: 1,
    nightTemp: -68,
    coldChance: 0.08,
    relayMult: 1,
    scene: {
      ground: '#c99069',
      rocks: ['#8d5d42', '#7b513a', '#9b6a4c', '#6f4733'],
      rockCount: 170,
      mountain: '#a2735a',
      mountainScale: 1,
      sky: '#a5785a',
      stormSky: '#6f5242',
    },
  },
  {
    id: 'sirenum',
    name: 'Terra Sirenum',
    blurb: 'Steep, broken highlands. Harder routes, more wheel wear.',
    coords: '39.70°S · 150.00°W',
    driveFactor: 0.8,
    wearMult: 1.5,
    stormMult: 0.9,
    nightTemp: -74,
    coldChance: 0.1,
    relayMult: 1,
    scene: {
      ground: '#b07656',
      rocks: ['#6e4632', '#5d3b2b', '#7f5440', '#4f3426'],
      rockCount: 300,
      mountain: '#8a5f49',
      mountainScale: 1.6,
      sky: '#9c6f55',
      stormSky: '#62483a',
    },
  },
  {
    id: 'hellas',
    name: 'Hellas Basin',
    blurb: 'Deep basin. Colder nights, more dust, shifted relay passes.',
    coords: '42.40°S · 70.50°E',
    driveFactor: 1.05,
    wearMult: 0.9,
    stormMult: 1.6,
    nightTemp: -82,
    coldChance: 0.16,
    relayMult: 0.7,
    scene: {
      ground: '#d3a07a',
      rocks: ['#9a6c50', '#8a5e44', '#a87a5c', '#7a5038'],
      rockCount: 110,
      mountain: '#b48467',
      mountainScale: 1.25,
      sky: '#b38665',
      stormSky: '#7a5a47',
    },
  },
];

export function regionDef(id: RegionId): RegionDef {
  return regions.find((r) => r.id === id) ?? regions[0];
}

```
```data/scoring.ts
import type { Medal } from '../types/game';

/** First-pass medal thresholds on the 0–3000 total. Tune after playtesting. */
export const medalThresholds: { medal: Medal; min: number; label: string }[] = [
  { medal: 'gold', min: 2200, label: 'Gold' },
  { medal: 'silver', min: 1700, label: 'Silver' },
  { medal: 'bronze', min: 0, label: 'Bronze' },
];

export const scoreAxes = [
  { id: 'efficiency', label: 'Efficiency', hint: 'Resources saved, action points used, Sols to spare' },
  { id: 'risk', label: 'Risk management', hint: 'Faults avoided, crises handled, advisor trust balance' },
  { id: 'science', label: 'Science value', hint: 'Sample quality, C-012 uplink, ice map accuracy' },
] as const;

```
```data/events.ts
import type { CommandId, EventKind, Tone } from '../types/game';

/** Event catalogue: tone and the recommended counter-move offered next Sol. Labels live in i18n. */
export const eventMeta: Record<EventKind, { tone: Tone; counter?: CommandId }> = {
  storm: { tone: 'red', counter: 'rest' },
  stormEnd: { tone: 'green' },
  cold: { tone: 'red', counter: 'heat' },
  wear: { tone: 'red', counter: 'repair' },
  commsLoss: { tone: 'red', counter: 'uplink' },
  wind: { tone: 'amber', counter: 'navigate' },
  contamination: { tone: 'red', counter: 'prep' },
  software: { tone: 'red', counter: 'navigate' },
  badAdvice: { tone: 'amber' },
  brownout: { tone: 'red', counter: 'rest' },
  discovery: { tone: 'green', counter: 'siteSurvey' },
  favorableWindow: { tone: 'blue', counter: 'uplink' },
  technology: { tone: 'green' },
  dustLoad: { tone: 'amber', counter: 'rest' },
  milestone: { tone: 'green' },
};

```
```utils/game/rng.ts
/** Serializable mulberry32 RNG: the state is a single uint32 stored on the game. */
export interface Rng {
  next: () => number;
  chance: (p: number) => boolean;
  range: (a: number, b: number) => number;
  int: (a: number, b: number) => number;
  state: () => number;
}

export function makeRng(seed: number): Rng {
  let s = seed >>> 0;
  const next = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    next,
    chance: (p) => next() < p,
    range: (a, b) => a + next() * (b - a),
    int: (a, b) => Math.floor(a + next() * (b - a + 1)),
    state: () => s,
  };
}

export function randomSeed(): number {
  return Math.floor(Math.random() * 2 ** 31);
}

```
```utils/game/comms.ts
import { difficultyDef } from '../../data/difficulty';
import { regionDef } from '../../data/regions';
import type { CommsWindow, GameState } from '../../types/game';
import type { Rng } from './rng';

/** One-way light time drifts across the campaign with orbital geometry. */
export function delayForSol(game: Pick<GameState, 'difficulty'>, sol: number): number {
  const [lo, hi] = difficultyDef(game.difficulty).delay;
  const phase = 0.5 - 0.5 * Math.cos((sol / 500) * Math.PI * 2 * 0.9 + 0.4);
  return Math.round(lo + (hi - lo) * phase);
}

/** Today's DSN overlaps and orbiter passes. The relay adds a long persistent window once built. */
export function generateWindows(game: Pick<GameState, 'region' | 'pillars'>, rng: Rng): CommsWindow[] {
  const region = regionDef(game.region);
  const madrid = rng.range(6, 9);
  const gold = rng.range(14, 17);
  const w: CommsWindow[] = [
    { station: 'Madrid', start: madrid, end: madrid + rng.range(1.2, 2.4), mbps: 0.25 },
    { station: 'Goldstone', start: gold, end: gold + rng.range(1, 2.2), mbps: 0.25 },
  ];
  if (rng.chance(0.85 * region.relayMult)) {
    const s = rng.range(3, 12);
    w.push({ station: 'MRO', start: s, end: s + rng.range(0.15, 0.3), mbps: 2 });
  }
  if (rng.chance(0.75 * region.relayMult)) {
    const s = rng.range(12, 22);
    w.push({ station: 'TGO', start: s, end: s + rng.range(0.12, 0.25), mbps: 1.6 });
  }
  if (game.pillars.comms.relay >= 100) w.push({ station: 'Relay', start: 9, end: 15, mbps: 0.18 });
  return w.sort((a, b) => a.start - b.start);
}

/** Megabytes that today's windows can carry, cut by storms. */
export function windowCapacity(windows: CommsWindow[], storm: number, dustIndex = 0): number {
  const raw = windows.reduce((sum, w) => sum + ((w.end - w.start) * 3600 * w.mbps) / 8, 0);
  const atmosphericLoss = Math.max(storm * 0.5, dustIndex * 0.22);
  return Math.round(raw * (1 - atmosphericLoss));
}

export function queuedMb(game: Pick<GameState, 'dataQueue'>): number {
  return game.dataQueue.reduce((s, p) => s + p.mb, 0);
}

```
```utils/game/pillars.ts
import { COMMS_STREAK, ICE_CORES, POWER_STREAK, POWER_TARGET_W, pillarOrder } from '../../data/pillars';
import type { GameState, PillarId } from '../../types/game';
import type { Dict } from '../../types/i18n';

export type PillarStepKey = keyof Dict['pillarSteps'];

export function farmOutput(game: Pick<GameState, 'pillars' | 'storm'>): number {
  return Math.round(game.pillars.power.farmW * (1 - 0.55 * game.storm.intensity) + game.pillars.power.rtgW);
}

export function pillarComplete(game: GameState, id: PillarId): boolean {
  const p = game.pillars;
  switch (id) {
    case 'water':
      return p.water.coverage >= 100 && p.water.cores >= ICE_CORES && p.water.uplinked;
    case 'power':
      return p.power.streak >= POWER_STREAK;
    case 'comms':
      return p.comms.relay >= 100 && p.comms.streak >= COMMS_STREAK;
    case 'science':
      return p.science.c012 === 'uplinked';
  }
}

export interface PillarStep {
  /** Key into the dictionary's `pillarSteps`. */
  label: PillarStepKey;
  done: boolean;
  value?: string;
}

export function pillarSteps(game: GameState, id: PillarId): PillarStep[] {
  const p = game.pillars;
  switch (id) {
    case 'water':
      return [
        { label: 'coverage', done: p.water.coverage >= 100, value: `${Math.round(p.water.coverage)}%` },
        { label: 'cores', done: p.water.cores >= ICE_CORES, value: `${p.water.cores}/${ICE_CORES}` },
        { label: 'iceUplinked', done: p.water.uplinked },
      ];
    case 'power':
      return [
        { label: 'farmOutput', done: farmOutput(game) >= POWER_TARGET_W, value: `${farmOutput(game)}/${POWER_TARGET_W} W` },
        { label: 'stableSols', done: p.power.streak >= POWER_STREAK, value: `${p.power.streak}/${POWER_STREAK}` },
      ];
    case 'comms':
      return [
        { label: 'relay', done: p.comms.relay >= 100, value: `${Math.round(p.comms.relay)}%` },
        { label: 'unbroken', done: p.comms.streak >= COMMS_STREAK, value: `${p.comms.streak}/${COMMS_STREAK}` },
      ];
    case 'science':
      return [
        { label: 'c012Cored', done: ['sampled', 'sealed', 'checked', 'analyzed', 'packetReady', 'uplinked'].includes(p.science.c012) },
        { label: 'analyzed', done: ['analyzed', 'packetReady', 'uplinked'].includes(p.science.c012) },
        { label: 'onEarth', done: p.science.c012 === 'uplinked' },
      ];
  }
}

/** 0–1 progress used by the HUD. */
export function pillarProgress(game: GameState, id: PillarId): number {
  const p = game.pillars;
  switch (id) {
    case 'water':
      return Math.min(1, (p.water.coverage / 100) * 0.4 + (Math.min(p.water.cores, ICE_CORES) / ICE_CORES) * 0.4 + (p.water.uplinked ? 0.2 : 0));
    case 'power':
      return Math.min(1, Math.min(1, farmOutput(game) / POWER_TARGET_W) * 0.7 + (Math.min(p.power.streak, POWER_STREAK) / POWER_STREAK) * 0.3);
    case 'comms':
      return Math.min(1, (p.comms.relay / 100) * 0.6 + (Math.min(p.comms.streak, COMMS_STREAK) / COMMS_STREAK) * 0.4);
    case 'science':
      return {
        none: 0,
        selected: 0.08,
        surveyed: 0.16,
        spectrographed: 0.27,
        sampled: 0.4,
        sealed: 0.52,
        checked: 0.64,
        analyzed: 0.76,
        packetReady: 0.88,
        uplinked: 1,
      }[p.science.c012];
  }
}

export function allPillarProgress(game: GameState): Record<PillarId, number> {
  return Object.fromEntries(pillarOrder.map((id) => [id, pillarProgress(game, id)])) as Record<PillarId, number>;
}

export function pillarsDone(game: GameState): number {
  return pillarOrder.filter((id) => pillarComplete(game, id)).length;
}

```
```utils/game/scoring.ts
import { difficultyDef } from '../../data/difficulty';
import { DEADLINE_SOL } from '../../data/pillars';
import { medalThresholds } from '../../data/scoring';
import type { GameState, Medal, ScoreBreakdown } from '../../types/game';

const clamp = (v: number, lo = 0, hi = 1000) => Math.round(Math.min(hi, Math.max(lo, v)));

export function computeScore(game: GameState, victory = false): ScoreBreakdown {
  const start = difficultyDef(game.difficulty).inventory;
  const inv = game.inventory;
  const keys = Object.keys(start) as (keyof typeof start)[];
  const kept = keys.reduce((s, k) => s + (start[k] ? inv[k] / start[k] : 1), 0) / keys.length;
  const apUtil = game.stats.apAvailable ? game.stats.apUsed / game.stats.apAvailable : 0;
  const spare = victory ? (DEADLINE_SOL - game.sol) / DEADLINE_SOL : 0;
  const efficiency = clamp(380 * apUtil + 320 * kept + 300 * spare);

  const trusts = Object.values(game.advisors).map((a) => a.trust);
  const imbalance = Math.max(...trusts) - Math.min(...trusts);
  const justified = Object.values(game.advisors).reduce((sum, a) => sum + a.justifiedRejections, 0);
  const risk = clamp(1000 - game.stats.faults * 22 + game.stats.crisesHandled * 18 + game.stats.eventChainsBroken * 20 + justified * 3 - imbalance * 3);

  const p = game.pillars;
  const c012 = {
    none: 0, selected: 25, surveyed: 55, spectrographed: 95, sampled: 140,
    sealed: 180, checked: 225, analyzed: 290, packetReady: 350, uplinked: 420,
  }[p.science.c012];
  const science = clamp(c012 + game.sample.quality * 1.2 + game.stats.discoveries * 18 + p.water.coverage * 2.2 + Math.min(p.water.cores, 3) * 55 + (p.water.uplinked ? 110 : 0) - p.science.voidedTubes * 45);

  return { efficiency, risk, science, total: efficiency + risk + science };
}

export function medalFor(total: number): Medal {
  return (medalThresholds.find((m) => total >= m.min) ?? medalThresholds[medalThresholds.length - 1]).medal;
}

```
```utils/game/proposals.ts
import { unlockedCommands } from '../../data/acts';
import { TRUST_HIGH, TRUST_LOW, advisorOrder } from '../../data/advisors';
import { DRILL_RANGE, ICE_CORES, POWER_TARGET_W, SURVEY_RANGE } from '../../data/pillars';
import type { AdvisorId, GameState, Proposal } from '../../types/game';
import type { Msg } from '../../types/i18n';
import { m } from '../msg';
import { queuedMb, windowCapacity } from './comms';
import { farmOutput } from './pillars';
import type { Rng } from './rng';

type Draft = Omit<Proposal, 'id' | 'advisor' | 'estimate'> & { truth: Msg; noisy: Msg };

function navDrafts(g: GameState): Draft[] {
  const out: Draft[] = [];
  const left = Math.round((1 - g.route) * 4.2 * 10) / 10;
  if (g.route < 1) {
    out.push({
      title: g.waypointsVerified ? m('navDriveVerified') : m('navVerifyDrive'),
      rationale: g.waypointsVerified ? m('navDriveVerifiedWhy') : m('navVerifyDriveWhy'),
      commands: g.waypointsVerified ? ['drive'] : ['navigate', 'drive'],
      pillar: 'water',
      stance: 'push',
      truth: m('navDriveTruth', { km: left, verified: g.waypointsVerified ? 1 : '' }),
      noisy: m('navDriveNoisy', { km: Math.max(0.2, left - 1.4).toFixed(1) }),
    });
    out.push({
      title: m('navDoubleLeg'),
      rationale: m('navDoubleLegWhy'),
      commands: g.waypointsVerified ? ['drive', 'drive'] : ['navigate', 'drive', 'drive'],
      pillar: 'water',
      stance: 'push',
      alternative: true,
      truth: m('navDoubleLegTruth'),
      noisy: m('navDoubleLegNoisy'),
    });
  } else {
    out.push({
      title: m('navHoldRidge'),
      rationale: m('navHoldRidgeWhy'),
      commands: ['survey'],
      pillar: 'water',
      stance: 'push',
      truth: m('coverageChange', { from: Math.round(g.pillars.water.coverage), to: Math.min(100, Math.round(g.pillars.water.coverage + 20)) }),
      noisy: m('coveragePlus', { n: 40 }),
    });
  }
  return out;
}

function sciDrafts(g: GameState): Draft[] {
  const w = g.pillars.water;
  const stage = g.sample.state;
  const out: Draft[] = [];
  const lifecycle: Partial<Record<typeof stage, { title: Msg; why: Msg; commands: Proposal['commands']; estimate: Msg }>> = {
    none: { title: m('sciSelectTarget'), why: m('sciSelectTargetWhy'), commands: ['selectTarget'], estimate: m('scienceStageEstimate', { n: 1, total: 9 }) },
    selected: { title: m('sciSiteSurvey'), why: m('sciSiteSurveyWhy'), commands: ['siteSurvey'], estimate: m('scienceQualityEstimate', { quality: Math.round(g.environment.scienceQuality * 100) }) },
    surveyed: { title: m('sciSpectroscopy'), why: m('sciSpectroscopyWhy'), commands: ['spectroscopy'], estimate: m('scienceStageEstimate', { n: 3, total: 9 }) },
    spectrographed: {
      title: g.sterile ? m('sciCoreNow') : m('sciPrepCore'),
      why: g.sterile ? m('sciCoreNowWhy') : m('sciPrepCoreWhy'),
      commands: g.sterile ? ['sample'] : ['prep', 'sample'],
      estimate: m('contamRisk', { sterile: g.sterile ? 1 : '' }),
    },
    sampled: { title: m('sciSealSample'), why: m('sciSealSampleWhy'), commands: ['sealSample'], estimate: m('sampleQualityEstimate', { quality: g.sample.quality }) },
    sealed: { title: m('sciCheckSample'), why: m('sciCheckSampleWhy'), commands: ['checkSample'], estimate: m('scienceStageEstimate', { n: 6, total: 9 }) },
    checked: { title: m('sciAnalyze'), why: m('sciAnalyzeWhy'), commands: ['analyze'], estimate: m('sampleQualityEstimate', { quality: g.sample.quality }) },
    analyzed: { title: m('sciPreparePacket'), why: m('sciPreparePacketWhy'), commands: ['preparePacket'], estimate: m('packetMb', { mb: 900 }) },
    packetReady: { title: m('sciAwaitUplink'), why: m('sciAwaitUplinkWhy'), commands: ['uplink'], estimate: m('packetMb', { mb: 900 }) },
  };
  if (g.route >= 0.72 && stage !== 'uplinked') {
    const next = lifecycle[stage];
    if (next) {
      out.push({ title: next.title, rationale: next.why, commands: next.commands, pillar: 'science', stance: 'push', truth: next.estimate, noisy: m('scienceEstimateUncertain') });
    }
  }
  if (stage === 'spectrographed' && !g.sterile) {
    out.push({
      title: m('sciCoreNow'),
      rationale: m('sciCoreNowWhy'),
      commands: ['sample'],
      pillar: 'science',
      stance: 'push',
      alternative: true,
      truth: m('contamRisk', { sterile: '' }),
      noisy: m('contamLow'),
    });
  }
  if (g.route >= DRILL_RANGE && w.coverage >= 60 && w.cores < ICE_CORES) {
    out.push({
      title: m('sciDrill'),
      rationale: m('sciDrillWhy'),
      commands: ['drill'],
      pillar: 'water',
      stance: 'push',
      truth: m('drillWear', { pct: Math.round(g.rover.drill) }),
      noisy: m('drillWearLow'),
    });
  }
  if (g.route >= SURVEY_RANGE && w.coverage < 100) {
    out.push({
      title: m('sciSurvey'),
      rationale: m('sciSurveyWhy'),
      commands: ['survey'],
      pillar: 'water',
      stance: 'push',
      truth: m('surveyTruth'),
      noisy: m('coveragePlus', { n: 35 }),
    });
  }
  if (g.route < 1) {
    out.push({
      title: m('sciDirect'),
      rationale: m('sciDirectWhy'),
      commands: ['drive'],
      pillar: 'science',
      stance: 'push',
      truth: g.waypointsVerified ? m('waypointsOk') : m('waypointsRisk'),
      noisy: m('faultLow'),
    });
  }
  return out;
}

function sysDrafts(g: GameState): Draft[] {
  const out: Draft[] = [];
  const r = g.rover;
  if (r.battery < 45 || g.storm.sols > 0) {
    out.push({
      title: g.storm.sols > 0 ? m('sysSurvival') : m('sysRecharge'),
      rationale: g.storm.sols > 0 ? m('sysSurvivalWhy') : m('sysRechargeWhy'),
      commands: ['rest', 'heat'],
      pillar: 'power',
      stance: 'conserve',
      truth: m('batteryChange', { from: Math.round(r.battery), to: Math.min(100, Math.round(r.battery + 18)) }),
      noisy: m('batteryFine', { n: Math.round(r.battery + 15) }),
    });
  }
  if ((r.wheels < 55 || r.drill < 40) && g.inventory.spares > 0) {
    out.push({
      title: r.wheels < r.drill ? m('sysSwapWheel') : m('sysReplaceBit'),
      rationale: m('sysRepairWhy'),
      commands: ['repair'],
      pillar: null,
      stance: 'conserve',
      truth: m('wearTruth', { w: Math.round(r.wheels), d: Math.round(r.drill) }),
      noisy: m('wheelsNoisy', { w: Math.round(r.wheels + 20) }),
    });
  }
  if (farmOutput(g) < POWER_TARGET_W && g.inventory.solarKits > 0) {
    out.push({
      title: m('sysSolar'),
      rationale: m('sysSolarWhy'),
      commands: ['deploySolar'],
      pillar: 'power',
      stance: 'push',
      truth: m('wattChange', { from: farmOutput(g), to: farmOutput(g) + 70 }),
      noisy: m('wattChange', { from: farmOutput(g), to: farmOutput(g) + 140 }),
    });
  }
  out.push({
    title: m('sysHeat'),
    rationale: m('sysHeatWhy', { t: g.region === 'hellas' ? '−82' : g.region === 'sirenum' ? '−74' : '−68' }),
    commands: ['heat'],
    pillar: 'power',
    stance: 'conserve',
    truth: m('heatTruth'),
    noisy: m('heatNoisy'),
  });
  return out;
}

function commDrafts(g: GameState): Draft[] {
  const out: Draft[] = [];
  const cap = windowCapacity(g.windows, g.storm.intensity, g.environment.dustIndex);
  if (g.dataQueue.length) {
    out.push({
      title: m('commUplink'),
      rationale: m('commUplinkWhy', { mb: queuedMb(g), cap }),
      commands: ['uplink'],
      pillar: g.dataQueue.some((p) => p.kind === 'c012') ? 'science' : 'water',
      stance: 'push',
      truth: m('capacity', { mb: cap }),
      noisy: m('capacity', { mb: cap * 2 }),
    });
  }
  if (g.pillars.comms.relay < 100 && g.inventory.relayKits > 0) {
    out.push({
      title: m('commRelay'),
      rationale: m('commRelayWhy'),
      commands: ['buildRelay'],
      pillar: 'comms',
      stance: 'push',
      truth: m('towerChange', { from: Math.round(g.pillars.comms.relay), to: Math.min(100, Math.round(g.pillars.comms.relay + 34)) }),
      noisy: m('towerNoisy'),
    });
  }
  if (!out.length) {
    out.push({
      title: m('commHold'),
      rationale: m('commHoldWhy'),
      commands: ['uplink'],
      pillar: 'comms',
      stance: 'conserve',
      truth: m('routine'),
      noisy: m('routine'),
    });
  }
  return out;
}

const DRAFTERS: Record<AdvisorId, (g: GameState) => Draft[]> = { nav: navDrafts, sci: sciDrafts, sys: sysDrafts, comm: commDrafts };

/** One proposal per advisor; a second (alternative) when trust is high. Low trust yields noisy estimates. */
export function generateProposals(game: GameState, rng: Rng): Proposal[] {
  const out: Proposal[] = [];
  advisorOrder.forEach((id) => {
    const trust = game.advisors[id].trust;
    const unlocked = unlockedCommands(game.sol);
    const drafts = DRAFTERS[id](game).filter((d) => d.commands.every((c) => unlocked.has(c)));
    const primary = drafts.filter((d) => !d.alternative);
    const pool = primary.length ? primary : drafts;
    if (!pool.length) return;
    const picks = [pool[0]];
    if (trust >= TRUST_HIGH) {
      const alt = drafts.find((d) => d !== pool[0]);
      if (alt) picks.push({ ...alt, alternative: true });
    }
    picks.forEach((d, i) => {
      const noisy = trust < TRUST_LOW && rng.chance(0.7);
      out.push({
        id: `${game.sol}-${id}-${i}`,
        advisor: id,
        title: d.title,
        rationale: d.rationale,
        commands: d.commands,
        pillar: d.pillar,
        stance: d.stance,
        alternative: i > 0,
        estimate: noisy ? d.noisy : d.truth,
      });
    });
  });
  return out;
}

export interface Conflict {
  a: AdvisorId;
  b: AdvisorId;
  text: Msg;
}

/** Flags the classic tensions from the design doc. */
export function findConflicts(proposals: Proposal[]): Conflict[] {
  const first = (id: AdvisorId) => proposals.find((p) => p.advisor === id && !p.alternative);
  const sci = first('sci');
  const sys = first('sys');
  const nav = first('nav');
  const comm = first('comm');
  const out: Conflict[] = [];
  if (sci && sys && sys.stance === 'conserve' && sci.commands.some((c) => c === 'drill' || c === 'sample' || c === 'survey')) {
    out.push({ a: 'sci', b: 'sys', text: m('conflictSciSys') });
  }
  if (sci && nav && sci.commands.includes('drive') && !sci.commands.includes('navigate') && nav.commands.includes('navigate')) {
    out.push({ a: 'sci', b: 'nav', text: m('conflictSciNav') });
  }
  if (comm && sci && comm.commands.includes('uplink') && sci.commands.includes('analyze')) {
    out.push({ a: 'sci', b: 'comm', text: m('conflictSciComm') });
  }
  return out;
}

```
```utils/game/commands.ts
import { TRUST_LOW } from '../../data/advisors';
import { difficultyDef } from '../../data/difficulty';
import { eventMeta } from '../../data/events';
import { commandDefs } from '../../data/gameCommands';
import { DRILL_RANGE, ICE_CORES, RELAY_SEGMENT, SOLAR_KIT_W, SURVEY_RANGE } from '../../data/pillars';
import { regionDef } from '../../data/regions';
import type { EventKind, GameEvent, GameState, QueueItem, StepResult } from '../../types/game';
import type { Msg } from '../../types/i18n';
import { m } from '../msg';
import { driveEnvironmentFactor } from './environment';
import { windowCapacity } from './comms';
import type { Rng } from './rng';

export interface ExecContext {
  g: GameState;
  rng: Rng;
  safe: boolean;
  events: GameEvent[];
  flags: { safeMode: boolean; heated: boolean; linkLost: boolean };
}

export function makeEvent(g: GameState, kind: EventKind, title: Msg, detail: Msg, chain?: { id: string; step: number }): GameEvent {
  const meta = eventMeta[kind];
  return {
    id: g.nextId++,
    sol: g.sol,
    kind,
    title,
    detail,
    tone: meta.tone,
    counter: meta.counter,
    chainId: chain?.id,
    chainStep: chain?.step,
  };
}

const clamp = (v: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, v));

/** Executes one queued command against the mutable draft and reports what happened. */
export function executeStep(ctx: ExecContext, item: QueueItem): StepResult {
  const { g, rng, safe } = ctx;
  const def = commandDefs[item.command];
  const diff = difficultyDef(g.difficulty);
  const region = regionDef(g.region);
  const risk = (p: number) => p * diff.faultMult * (safe ? 0.5 : 1);
  const base = { command: item.command, source: item.source };
  const cmd = { cmd: item.command };
  const result = (ok: boolean, title: Msg, detail: Msg, event?: GameEvent): StepResult => {
    if (event) ctx.events.push(event);
    if (event && event.tone === 'red') g.stats.faults += 1;
    return { ...base, ok, title, detail, routeAfter: g.route, event };
  };

  if (ctx.flags.safeMode) return { ...base, ok: false, skipped: true, title: m('stepSkipped', cmd), detail: m('safeModeNoResponse'), routeAfter: g.route };

  if (def.power > 0 && g.rover.battery < def.power + 4)
    return result(false, m('stepRefused', cmd), m('batteryFloor', { battery: Math.round(g.rover.battery), floor: def.power + 4 }));

  // Bad advice: following a low-trust advisor can carry a wrong estimate.
  const advisorTrust = item.source === 'manual' ? 100 : g.advisors[item.source].trust;
  let badAdvice: GameEvent | undefined;
  if (item.source !== 'manual' && advisorTrust < TRUST_LOW && rng.chance(0.35)) {
    const code = item.source.toUpperCase();
    if (item.command === 'drive') {
      g.rover.wheels = clamp(g.rover.wheels - 12);
      badAdvice = makeEvent(g, 'badAdvice', m('badTerrain', { code }), m('badTerrainDetail'));
    } else {
      g.rover.battery = clamp(g.rover.battery - 8);
      badAdvice = makeEvent(g, 'badAdvice', m('badPower', { code }), m('badPowerDetail'));
    }
  }
  const pay = () => {
    g.rover.battery = clamp(g.rover.battery - Math.max(0, def.power));
  };

  switch (item.command) {
    case 'drive': {
      if (g.route >= 1) return result(false, m('driveSkipped'), m('atRidge'), badAdvice);
      if (!g.waypointsVerified && rng.chance(risk(0.24))) {
        pay();
        ctx.flags.safeMode = true;
        g.rover.safeModeSols = 1;
        return result(false, m('softwareFault'), m('badUpload'), makeEvent(g, 'software', m('safeModeEntered'), m('safeModeDetail')));
      }
      pay();
      const gust = rng.chance(risk(0.05 + g.storm.intensity * 0.15));
      const factor = region.driveFactor * driveEnvironmentFactor(g.environment) * (g.rover.wheels < 40 ? 0.6 : 1) * (1 - 0.3 * g.storm.intensity) * (gust ? 0.5 : 1);
      const gain = 0.13 * factor;
      const before = g.route;
      g.route = Math.min(1, g.route + gain);
      g.waypointsVerified = false;
      g.rover.wheels = clamp(g.rover.wheels - (3 + rng.next() * 3) * region.wearMult * (safe ? 0.6 : 1));
      g.rover.dust = Math.min(0.9, g.rover.dust + 0.015);
      let event: GameEvent | undefined = badAdvice;
      if (gust) event = makeEvent(g, 'wind', m('windHalt'), m('windHaltDetail'));
      else if (rng.chance(risk((g.rover.wheels < 35 ? 0.16 : 0.035) * region.wearMult))) {
        g.rover.wheels = clamp(g.rover.wheels - 15);
        event = makeEvent(g, 'wear', m('wheelCrack'), m('wheelCrackDetail'));
      }
      const arrived = g.route >= 1 && before < 1;
      if (arrived) ctx.events.push(makeEvent(g, 'milestone', m('arrivedRidge'), m('arrivedRidgeDetail')));
      return result(true, arrived ? m('arrivedRidge') : m('driveDone'), m('driveDetail', { m: Math.round((g.route - before) * 4200), pct: Math.round(g.route * 100) }), event);
    }
    case 'navigate':
      pay();
      g.waypointsVerified = true;
      return result(true, m('waypointsVerified'), m('waypointsVerifiedDetail'), badAdvice);
    case 'survey': {
      if (g.route < SURVEY_RANGE) return result(false, m('surveyOutOfRange'), m('surveyRange', { pct: Math.round(SURVEY_RANGE * 100) }), badAdvice);
      if (g.pillars.water.coverage >= 100) return result(false, m('surveyRedundant'), m('iceMapComplete'), badAdvice);
      pay();
      const mult = g.advisors.sci.trust < TRUST_LOW ? 0.7 : 1;
      g.pillars.water.coverage = Math.min(100, g.pillars.water.coverage + 20 * mult);
      return result(true, m('surveyDone'), m('iceMapPct', { pct: Math.round(g.pillars.water.coverage) }), badAdvice);
    }
    case 'drill': {
      if (g.route < DRILL_RANGE) return result(false, m('drillOutOfRange'), m('drillRange'), badAdvice);
      if (g.pillars.water.coverage < 60) return result(false, m('drillRefused'), m('drillMapLow'), badAdvice);
      if (g.rover.drill <= 0 && g.inventory.drillBits <= 0) return result(false, m('drillUnavailable'), m('noBits'), badAdvice);
      pay();
      g.rover.drill = clamp(g.rover.drill - 18 * (safe ? 0.7 : 1));
      let event = badAdvice;
      if (g.rover.drill <= 0 || rng.chance(risk(0.05))) {
        if (g.inventory.drillBits > 0) {
          g.inventory.drillBits -= 1;
          g.rover.drill = 100;
          event = makeEvent(g, 'wear', m('bitBroke'), m('bitSwapped'));
        } else {
          g.rover.drill = 0;
          event = makeEvent(g, 'wear', m('bitBroke'), m('noBitsLeft'));
        }
        return result(false, m('iceCoreLost'), m('bitFailure'), event);
      }
      g.pillars.water.cores += 1;
      if (g.pillars.water.cores >= ICE_CORES && !g.pillars.water.uplinked && !g.dataQueue.some((p) => p.kind === 'ice')) {
        g.dataQueue.push({ id: g.nextId++, kind: 'ice', mb: 420 });
      }
      return result(true, m('iceCoreOk'), m('coresCount', { n: g.pillars.water.cores, max: ICE_CORES }), event);
    }
    case 'selectTarget':
      if (g.route < 0.72) return result(false, m('targetOutOfRange'), m('targetNeedsRidge'), badAdvice);
      if (g.sample.state !== 'none') return result(false, m('targetAlreadySelected'), m('sampleStageDetail'), badAdvice);
      pay();
      g.sample.state = 'selected';
      g.sample.selectedSol = g.sol;
      g.pillars.science.c012 = 'selected';
      return result(true, m('targetSelected'), m('targetSelectedDetail'), badAdvice);
    case 'siteSurvey':
      if (g.sample.state !== 'selected') return result(false, m('surveyNeedsTarget'), m('selectTargetFirst'), badAdvice);
      pay();
      g.sample.state = 'surveyed';
      g.pillars.science.c012 = 'surveyed';
      return result(true, m('siteSurveyDone'), m('siteSurveyDetail', { quality: Math.round(g.environment.scienceQuality * 100) }), badAdvice);
    case 'spectroscopy':
      if (g.sample.state !== 'surveyed') return result(false, m('spectroscopyBlocked'), m('surveyFirst'), badAdvice);
      pay();
      g.sample.state = 'spectrographed';
      g.sample.mineralogy = ['clay', 'sulfate', 'carbonate'];
      g.pillars.science.c012 = 'spectrographed';
      return result(true, m('spectroscopyDone'), m('spectroscopyDetail'), badAdvice);
    case 'prep':
      pay();
      g.sterile = true;
      return result(true, m('prepDone'), m('prepDetail'), badAdvice);
    case 'sample': {
      if (g.route < 1) return result(false, m('sampleOutOfReach'), m('c012AtRidge'), badAdvice);
      if (g.sample.state !== 'spectrographed') return result(false, m('sampleNotReady'), m('spectroscopyFirst'), badAdvice);
      if (g.inventory.tubes <= 0) return result(false, m('noTubes'), m('inventoryEmpty'), badAdvice);
      pay();
      g.inventory.tubes -= 1;
      const contam = rng.chance(risk((g.sterile ? 0.05 : 0.33) * (1.25 - g.environment.scienceQuality)));
      g.sterile = false;
      g.sample.state = 'sampled';
      g.sample.collectedSol = g.sol;
      g.sample.contaminated = contam;
      g.sample.storage = 'arm';
      g.sample.quality = Math.round(clamp(55 + g.environment.scienceQuality * 35 - (contam ? 40 : 0)));
      if (contam) {
        g.pillars.science.voidedTubes += 1;
        g.sample.state = 'spectrographed';
        g.sample.storage = 'uncollected';
        g.pillars.science.c012 = 'spectrographed';
        return result(false, m('c012Contaminated'), m('tubeVoided', { n: g.inventory.tubes }), makeEvent(g, 'contamination', m('contaminated'), m('contaminatedDetail')));
      }
      g.pillars.science.c012 = 'sampled';
      return result(true, m('c012Collected'), m('tubesLeft', { n: g.inventory.tubes }), badAdvice);
    }
    case 'sealSample':
      if (g.sample.state !== 'sampled' || g.sample.contaminated) return result(false, m('sealBlocked'), m('validSampleNeeded'), badAdvice);
      pay();
      g.sample.state = 'sealed';
      g.sample.storage = 'tube';
      g.pillars.science.c012 = 'sealed';
      ctx.events.push(makeEvent(g, 'milestone', m('c012Sealed'), m('c012SealedDetail')));
      return result(true, m('c012Sealed'), m('sampleStored'), badAdvice);
    case 'checkSample':
      if (g.sample.state !== 'sealed') return result(false, m('checkBlocked'), m('sealFirst'), badAdvice);
      pay();
      g.sample.state = 'checked';
      g.sample.storage = 'cache';
      g.pillars.science.c012 = 'checked';
      return result(true, m('sampleChecked'), m('sampleCheckedDetail', { quality: g.sample.quality }), badAdvice);
    case 'analyze': {
      if (g.sample.state !== 'checked') return result(false, m('nothingToAnalyze'), m('checkFirst'), badAdvice);
      pay();
      g.sample.state = 'analyzed';
      g.sample.analysis = g.sample.quality >= 70 ? 'organicsDetected' : 'inconclusive';
      g.pillars.science.c012 = 'analyzed';
      return result(true, m('c012Analyzed'), m('analysisDetail', { quality: g.sample.quality }), badAdvice);
    }
    case 'preparePacket':
      if (g.sample.state !== 'analyzed') return result(false, m('packetBlocked'), m('analyzeFirst'), badAdvice);
      pay();
      g.sample.state = 'packetReady';
      g.pillars.science.c012 = 'packetReady';
      if (!g.dataQueue.some((p) => p.kind === 'c012')) g.dataQueue.push({ id: g.nextId++, kind: 'c012', mb: 900 });
      return result(true, m('packetPrepared'), m('packetQueued'), badAdvice);
    case 'uplink': {
      pay();
      if (ctx.flags.linkLost || rng.chance(risk(0.07 + g.storm.intensity * 0.18))) {
        ctx.flags.linkLost = true;
        return result(false, m('uplinkFailed'), m('noAos'), makeEvent(g, 'commsLoss', m('linkLoss'), m('linkLossDetail')));
      }
      let cap = windowCapacity(g.windows, g.storm.intensity, g.environment.dustIndex);
      const sent: string[] = [];
      while (g.dataQueue.length && cap > 0) {
        const p = g.dataQueue[0];
        if (p.mb <= cap) {
          cap -= p.mb;
          g.dataQueue.shift();
          sent.push(p.kind);
          if (p.kind === 'ice') g.pillars.water.uplinked = true;
          if (p.kind === 'c012') {
            g.pillars.science.c012 = 'uplinked';
            g.sample.state = 'uplinked';
            g.sample.uploaded = true;
            ctx.events.push(makeEvent(g, 'milestone', m('c012OnEarth'), m('c012OnEarthDetail')));
          }
        } else {
          p.mb -= cap;
          cap = 0;
        }
      }
      const detail = sent.length ? m('delivered', { kinds: sent.join(',') }) : g.dataQueue.length ? m('partial', { mb: g.dataQueue[0].mb }) : m('routine');
      return result(true, m('uplinkDone'), detail, badAdvice);
    }
    case 'deploySolar':
      if (g.inventory.solarKits <= 0) return result(false, m('noSolarKits'), m('inventoryEmpty'), badAdvice);
      pay();
      g.inventory.solarKits -= 1;
      g.pillars.power.farmW += SOLAR_KIT_W;
      return result(true, m('solarDeployed'), m('farmInstalled', { w: g.pillars.power.farmW }), badAdvice);
    case 'buildRelay':
      if (g.pillars.comms.relay >= 100) return result(false, m('relayComplete'), m('nothingToBuild'), badAdvice);
      if (g.inventory.relayKits <= 0) return result(false, m('noRelay'), m('inventoryEmpty'), badAdvice);
      pay();
      g.inventory.relayKits -= 1;
      const plannedGain = RELAY_SEGMENT * (g.advisors.comm.trust < TRUST_LOW ? 0.7 : 1);
      const finalKitGain = g.inventory.relayKits === 0 ? 100 - g.pillars.comms.relay : 0;
      g.pillars.comms.relay = Math.min(100, g.pillars.comms.relay + Math.max(plannedGain, finalKitGain));
      if (g.pillars.comms.relay >= 100) ctx.events.push(makeEvent(g, 'milestone', m('relayOnline'), m('relayOnlineDetail')));
      return result(true, m('relayRaised'), m('towerPct', { pct: Math.round(g.pillars.comms.relay) }), badAdvice);
    case 'heat':
      ctx.flags.heated = true;
      return result(true, m('heatScheduled'), m('heatDetail'), badAdvice);
    case 'repair': {
      if (g.inventory.spares <= 0) return result(false, m('noSpares'), m('inventoryEmpty'), badAdvice);
      pay();
      g.inventory.spares -= 1;
      if (g.rover.wheels <= g.rover.drill) {
        g.rover.wheels = clamp(g.rover.wheels + 40);
        return result(true, m('wheelSwapped'), m('wheelsPct', { pct: Math.round(g.rover.wheels) }), badAdvice);
      }
      g.rover.drill = clamp(g.rover.drill + 45);
      return result(true, m('drillServiced'), m('drillPct', { pct: Math.round(g.rover.drill) }), badAdvice);
    }
    case 'rest': {
      const gain = 20 * (1 - g.rover.dust * 0.6) * (1 - 0.6 * g.storm.intensity) + 4;
      g.rover.battery = clamp(g.rover.battery + gain);
      g.rover.dust = Math.max(0.05, g.rover.dust - 0.08);
      return result(true, m('rested'), m('batteryGain', { n: Math.round(gain) }), badAdvice);
    }
  }
}

```
```utils/game/setup.ts
import { actForSol } from '../../data/acts';
import { TRUST_START } from '../../data/advisors';
import { difficultyDef } from '../../data/difficulty';
import type { GameState, NewGameOptions } from '../../types/game';
import { m } from '../msg';
import { delayForSol, generateWindows } from './comms';
import { generateEnvironment } from './environment';
import { generateProposals } from './proposals';
import { makeRng, randomSeed } from './rng';
import { computeScore } from './scoring';

/** Prepares the briefing for `game.sol`: delay, comms windows, proposals and AP budget. */
export function prepareSol(game: GameState): GameState {
  const g: GameState = { ...game };
  const rng = makeRng(g.rng);
  g.act = actForSol(g.sol).id;
  g.environment = generateEnvironment(g, rng);
  g.delayMin = delayForSol(g, g.sol);
  g.windows = generateWindows(g, rng);
  g.proposals = generateProposals(g, rng);
  g.apBudget = Math.max(2, difficultyDef(g.difficulty).ap - (g.rover.safeModeSols > 0 ? 2 : 0));
  g.rng = rng.state();
  return g;
}

export function createGame(opts: NewGameOptions): GameState {
  const diff = difficultyDef(opts.difficulty);
  const seed = opts.seed ?? randomSeed();
  const advisor = () => ({ trust: TRUST_START, ignoredStreak: 0, accepted: 0, justifiedRejections: 0 });
  const base: GameState = {
    version: 3,
    runId: `${Date.now().toString(36)}-${seed.toString(36)}`,
    slot: opts.slot,
    seed,
    rng: seed,
    difficulty: opts.difficulty,
    region: opts.region,
    permadeath: opts.difficulty === 'director' && opts.permadeath,
    sol: 1,
    act: 'discovery',
    delayMin: 0,
    route: 0,
    waypointsVerified: false,
    sterile: false,
    environment: { dayTempC: -8, pressurePa: 675, windMs: 5, dustIndex: 0.18, solarIrradiance: 520, daylightHours: 12.1, visibilityKm: 27, scienceQuality: 0.98 },
    sample: {
      id: 'C-012',
      state: 'none',
      location: 'Delta Ridge',
      selectedSol: null,
      collectedSol: null,
      type: 'biosignatureCandidate',
      mineralogy: [],
      quality: 0,
      contaminated: null,
      storage: 'uncollected',
      analysis: 'pending',
      uploaded: false,
    },
    rover: { battery: 88, wheels: 100, drill: 100, dust: 0.18, safeModeSols: 0, brownouts: 0 },
    inventory: { ...diff.inventory },
    pillars: {
      water: { coverage: 0, cores: 0, uplinked: false },
      power: { farmW: 0, rtgW: 110, streak: 0 },
      comms: { relay: 0, streak: 0 },
      science: { c012: 'none', voidedTubes: 0 },
    },
    storm: { sols: 0, intensity: 0, chainId: null, chainStep: 0 },
    windows: [],
    dataQueue: [],
    advisors: { nav: advisor(), sci: advisor(), sys: advisor(), comm: advisor() },
    proposals: [],
    apBudget: diff.ap,
    events: [],
    reports: [],
    score: { efficiency: 0, risk: 0, science: 0, total: 0 },
    stats: { apUsed: 0, apAvailable: 0, faults: 0, crisesHandled: 0, discoveries: 0, eventChainsBroken: 0 },
    outcome: null,
    nextId: 1,
    startedAt: Date.now(),
  };
  base.events.push({
    id: base.nextId++,
    sol: 1,
    kind: 'milestone',
    title: m('missionStart'),
    detail: m('missionStartDetail'),
    tone: 'green',
  });
  base.score = computeScore(base);
  return prepareSol(base);
}

```
```utils/game/resolve.ts
import { actForSol } from '../../data/acts';
import { advisorOrder } from '../../data/advisors';
import { difficultyDef } from '../../data/difficulty';
import { sequenceAp } from '../../data/gameCommands';
import { DEADLINE_SOL, POWER_TARGET_W, pillarOrder } from '../../data/pillars';
import { regionDef } from '../../data/regions';
import type { AdvisorId, GameEvent, GameState, QueueItem, SolReport, StepResult } from '../../types/game';
import { type ExecContext, executeStep, makeEvent } from './commands';
import { solarChargeFactor } from './environment';
import { allPillarProgress, farmOutput, pillarComplete } from './pillars';
import { m } from '../msg';
import { makeRng } from './rng';
import { computeScore, medalFor } from './scoring';
import { prepareSol } from './setup';

const clamp = (v: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, v));

function clone(g: GameState): GameState {
  return JSON.parse(JSON.stringify(g)) as GameState;
}

/**
 * Resolves one Sol deterministically from the seeded RNG: executes the sequence, runs the night,
 * rolls events, moves trust, checks pillars and win/lose, then prepares the next briefing.
 */
export function resolveSol(game: GameState, queue: QueueItem[], safe: boolean, acceptedIds: string[]): { next: GameState; report: SolReport } {
  const g = clone(game);
  const rng = makeRng(g.rng);
  const diff = difficultyDef(g.difficulty);
  const region = regionDef(g.region);
  const act = actForSol(g.sol);
  const events: GameEvent[] = [];
  const pillarsBefore = allPillarProgress(g);
  const batteryBefore = g.rover.battery;
  const routeBefore = g.route;
  const ctx: ExecContext = { g, rng, safe, events, flags: { safeMode: false, heated: false, linkLost: false } };

  if (g.rover.safeModeSols > 0) g.rover.safeModeSols -= 1;

  // Day: execute in order. Commands cannot be cancelled once sent.
  const steps: StepResult[] = queue.map((item) => executeStep(ctx, item));
  const apUsed = sequenceAp(queue.map((item) => item.command)) + (safe ? 1 : 0);
  g.stats.apUsed += apUsed;
  g.stats.apAvailable += g.apBudget;

  // Daytime charge and dust load come from the live environment telemetry.
  const solarFactor = solarChargeFactor(g.environment);
  g.rover.battery = clamp(g.rover.battery + 10 * solarFactor * (1 - g.rover.dust * 0.6) + 3);
  g.rover.dust = Math.min(0.95, g.rover.dust + 0.004 + g.environment.dustIndex * 0.018 + g.storm.intensity * 0.025);
  if (g.environment.dustIndex > 0.72 && !queue.some((q) => q.command === 'rest')) {
    const chainId = g.storm.chainId ?? `dust-${g.sol}-${g.nextId}`;
    events.push(makeEvent(g, 'dustLoad', m('dustLoadEvent'), m('dustLoadDetail', { pct: Math.round(g.rover.dust * 100) }), { id: chainId, step: Math.max(1, g.storm.chainStep + 1) }));
  }

  // Night.
  const extremeCold = rng.chance(region.coldChance * act.hazardMult * (1 + g.storm.intensity));
  const nightTemp = Math.round(region.nightTemp + (g.environment.dayTempC - region.nightTemp - 58) * 0.2 + (rng.next() - 0.5) * 6 - (extremeCold ? 9 : 0));
  if (ctx.flags.heated) {
    g.rover.battery = clamp(g.rover.battery - 6);
    if (extremeCold) g.stats.crisesHandled += 1;
  } else {
    g.rover.battery = clamp(g.rover.battery - (15 + (extremeCold ? 10 : 0)));
    if (extremeCold || (g.rover.battery < 30 && rng.chance(0.35 * diff.faultMult))) {
      const hitWheels = rng.chance(0.5);
      if (hitWheels) g.rover.wheels = clamp(g.rover.wheels - 8);
      else g.rover.drill = clamp(g.rover.drill - 12);
      const chainId = g.storm.chainId ?? `cold-${g.sol}-${g.nextId}`;
      const e = makeEvent(g, 'cold', m('coldSoak', { t: nightTemp }), hitWheels ? m('coldSoakWheels') : m('coldSoakDrill'), { id: chainId, step: g.storm.chainId ? g.storm.chainStep + 1 : 1 });
      events.push(e);
      g.stats.faults += 1;
    }
  }
  if (g.rover.battery <= 0) {
    g.rover.brownouts += 1;
    events.push(makeEvent(g, 'brownout', m('brownout'), g.rover.brownouts >= 2 ? m('brownoutSecond') : m('brownoutFirst')));
    g.stats.faults += 1;
    g.rover.battery = 6;
  } else {
    g.rover.brownouts = 0;
  }

  // Weather.
  if (g.storm.sols > 0) {
    g.storm.chainStep += 1;
    g.storm.sols -= 1;
    if (g.storm.sols === 0) {
      g.storm.intensity = 0;
      events.push(makeEvent(g, 'stormEnd', m('stormCleared'), m('stormClearedDetail'), g.storm.chainId ? { id: g.storm.chainId, step: g.storm.chainStep + 1 } : undefined));
      if (g.rover.battery > 30) {
        g.stats.crisesHandled += 1;
        g.stats.eventChainsBroken += 1;
      }
      g.storm.chainId = null;
      g.storm.chainStep = 0;
    }
  } else if (rng.chance(diff.stormChance * region.stormMult * act.hazardMult)) {
    g.storm.sols = rng.int(3, 7);
    g.storm.intensity = rng.range(0.55, 0.95);
    g.storm.chainId = `storm-${g.sol}-${g.nextId}`;
    g.storm.chainStep = 1;
    events.push(makeEvent(g, 'storm', m('stormIncoming'), m('stormIncomingDetail', { n: g.storm.sols }), { id: g.storm.chainId, step: 1 }));
  }

  // Positive opportunities reward exploration and informed risk.
  if (!g.storm.sols && rng.chance(act.opportunityChance)) {
    if (rng.chance(0.55)) {
      g.pillars.water.coverage = Math.min(100, g.pillars.water.coverage + 8);
      g.stats.discoveries += 1;
      events.push(makeEvent(g, 'discovery', m('unexpectedDiscovery'), m('unexpectedDiscoveryDetail')));
    } else {
      let bonusMb = 250;
      const delivered: string[] = [];
      while (g.dataQueue.length && bonusMb > 0) {
        const packet = g.dataQueue[0];
        if (packet.mb <= bonusMb) {
          bonusMb -= packet.mb;
          g.dataQueue.shift();
          delivered.push(packet.kind);
          if (packet.kind === 'ice') g.pillars.water.uplinked = true;
          if (packet.kind === 'c012') {
            g.pillars.science.c012 = 'uplinked';
            g.sample.state = 'uplinked';
            g.sample.uploaded = true;
          }
        } else {
          packet.mb -= bonusMb;
          bonusMb = 0;
        }
      }
      events.push(makeEvent(g, 'favorableWindow', m('favorableWindow'), m('favorableWindowDetail', { mb: 250 - bonusMb, packets: delivered.join(',') || 'telemetry' })));
    }
  }

  // Pillar streaks.
  g.pillars.power.rtgW = Math.max(90, +(g.pillars.power.rtgW - 0.02).toFixed(2));
  g.pillars.power.streak = farmOutput(g) >= POWER_TARGET_W ? g.pillars.power.streak + 1 : 0;
  if (g.pillars.comms.relay >= 100) g.pillars.comms.streak = ctx.flags.linkLost ? 0 : g.pillars.comms.streak + 1;
  else if (ctx.flags.linkLost) g.pillars.comms.streak = 0;

  // Trust: accepted advice builds it; repeatedly ignored advisors lose it.
  const trustDelta = { nav: 0, sci: 0, sys: 0, comm: 0 } as Record<AdvisorId, number>;
  advisorOrder.forEach((id) => {
    const a = g.advisors[id];
    const accepted = game.proposals.some((p) => p.advisor === id && acceptedIds.includes(p.id));
    let d: number;
    if (accepted) {
      const own = steps.filter((s) => s.source === id);
      d = 6 + (own.length && own.every((s) => s.ok) ? 2 : 0);
      a.ignoredStreak = 0;
      a.accepted += 1;
    } else {
      const proposal = game.proposals.find((p) => p.advisor === id && !p.alternative);
      const executed = new Set(queue.map((q) => q.command));
      const sameGoal = proposal?.commands.some((c) => executed.has(c)) || (proposal?.stance === 'conserve' && (executed.has('rest') || executed.has('heat') || executed.has('repair')));
      const protectedPillar = proposal?.pillar ? allPillarProgress(g)[proposal.pillar] > pillarsBefore[proposal.pillar] : false;
      const justified = !!proposal && (sameGoal || protectedPillar);
      if (justified) {
        a.ignoredStreak = 0;
        a.justifiedRejections += 1;
        d = 1;
      } else {
        a.ignoredStreak += 1;
        d = a.ignoredStreak >= 2 ? -6 : -2;
      }
    }
    const before = a.trust;
    a.trust = clamp(a.trust + d);
    trustDelta[id] = Math.round(a.trust - before);
  });

  // Outcome.
  const victory = pillarOrder.every((id) => pillarComplete(g, id));
  if (victory) {
    const score = computeScore(g, true);
    g.score = score;
    g.outcome = { result: 'victory', reason: m('winReason', { sol: g.sol }), medal: medalFor(score.total) };
  } else if (g.rover.wheels <= 0 || g.rover.brownouts >= 2) {
    g.outcome = { result: 'defeat', reason: g.rover.wheels <= 0 ? m('lossWheels') : m('lossBrownouts'), medal: null };
  } else if ((g.sample.state === 'none' || g.sample.contaminated) && g.inventory.tubes <= 0) {
    g.outcome = { result: 'defeat', reason: m('lossC012'), medal: null };
  } else if (g.sol >= DEADLINE_SOL) {
    g.outcome = { result: 'defeat', reason: m('lossDeadline'), medal: null };
  }
  if (!victory) g.score = computeScore(g);

  const previousAct = g.act;
  const nextAct = actForSol(g.sol + 1).id;
  if (!g.outcome && nextAct !== previousAct) {
    events.push(makeEvent(g, 'technology', m('actUnlocked', { act: nextAct }), m('actUnlockedDetail', { sol: g.sol + 1 })));
  }

  const report: SolReport = {
    sol: g.sol,
    steps,
    events,
    batteryBefore,
    batteryAfter: g.rover.battery,
    routeBefore,
    routeAfter: g.route,
    trustDelta,
    pillarsBefore,
    pillarsAfter: allPillarProgress(g),
    score: g.score,
    apUsed,
    apBudget: g.apBudget,
    nightTemp,
    heated: ctx.flags.heated,
    environment: g.environment,
    act: g.act,
  };

  g.events = [...events.slice().reverse(), ...g.events].slice(0, 200);
  g.reports = [report, ...g.reports].slice(0, 40);
  g.rng = rng.state();
  if (g.outcome) return { next: g, report };
  g.sol += 1;
  g.act = nextAct;
  return { next: prepareSol(g), report };
}

```
```utils/game/checklist.ts
import { commandDefs } from '../../data/gameCommands';
import type { GameState, QueueItem } from '../../types/game';
import type { Msg } from '../../types/i18n';
import { m } from '../msg';
import { queuedMb, windowCapacity } from './comms';

export interface CheckItem {
  id: string;
  level: 'warn' | 'ok';
  text: Msg;
}

/** Pre-send review of the sequence. Warnings never block — the Director decides. */
export function preSendChecklist(game: GameState, queue: QueueItem[], safe: boolean): CheckItem[] {
  const out: CheckItem[] = [];
  const cmds = queue.map((q) => q.command);
  if (!cmds.length) out.push({ id: 'empty', level: 'warn', text: m('chkEmpty') });

  let verified = game.waypointsVerified;
  let unverifiedDrive = false;
  let unpreppedSample = false;
  let sterile = game.sterile;
  cmds.forEach((c) => {
    if (c === 'navigate') verified = true;
    if (c === 'drive') {
      if (!verified) unverifiedDrive = true;
      verified = false;
    }
    if (c === 'prep') sterile = true;
    if (c === 'sample' && !sterile) unpreppedSample = true;
  });
  if (unverifiedDrive) out.push({ id: 'waypoints', level: 'warn', text: m('chkWaypoints') });
  if (unpreppedSample) out.push({ id: 'sterile', level: 'warn', text: m('chkSterile') });

  const drain = cmds.reduce((s, c) => s + commandDefs[c].power, 0);
  const heated = cmds.includes('heat');
  const projected = game.rover.battery - Math.max(0, drain) + 10 - (heated ? 6 : 15);
  if (projected < 25) out.push({ id: 'battery', level: 'warn', text: m('chkBatteryLow', { pct: Math.max(0, Math.round(projected)), heated: heated ? 1 : '' }) });
  else out.push({ id: 'battery', level: 'ok', text: m('chkBatteryOk', { pct: Math.round(Math.min(100, projected)) }) });

  if (cmds.includes('uplink')) {
    const cap = windowCapacity(game.windows, game.storm.intensity, game.environment.dustIndex);
    const need = queuedMb(game) + (cmds.includes('preparePacket') ? 900 : 0);
    if (need > cap) out.push({ id: 'uplink', level: 'warn', text: m('chkUplinkPartial', { cap, need }) });
    else out.push({ id: 'uplink', level: 'ok', text: m('chkUplinkOk', { cap }) });
  }
  if (game.storm.sols > 0 && !safe) out.push({ id: 'safe', level: 'warn', text: m('chkStorm') });
  return out;
}

```
```utils/storage.ts
import type { GameState, LeaderboardEntry, SlotSummary } from '../types/game';
import { pillarsDone } from './game/pillars';

const SLOT_KEY = (slot: number) => `aether.slot.${slot}.v1`;
const LB_KEY = 'aether.leaderboard.v1';
export const SLOT_COUNT = 3;

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/** Upgrades v2 campaigns without discarding the player's run. Text records remain readable through the i18n fallback. */
function migrate(raw: unknown): GameState | null {
  if (!raw || typeof raw !== 'object') return null;
  const version = (raw as { version?: number }).version;
  const g = raw as GameState;
  if (version === 3) return g;
  if (version !== 2) return null;
  const c012 = g.pillars?.science?.c012;
  const migratedSampleState = c012 === 'uplinked' ? 'uplinked' : c012 === 'analyzed' ? 'analyzed' : c012 === 'sealed' ? 'sealed' : 'none';
  const fallbackEnvironment = {
    dayTempC: -8,
    pressurePa: 675,
    windMs: 5,
    dustIndex: g.rover?.dust ?? 0.18,
    solarIrradiance: 520,
    daylightHours: 12.1,
    visibilityKm: 27,
    scienceQuality: 0.98,
  };
  const migrated = {
    ...g,
    version: 3 as const,
    act: g.sol <= 100 ? 'discovery' : g.sol <= 250 ? 'expansion' : g.sol <= 375 ? 'survival' : 'finalApproach',
    environment: g.environment ?? fallbackEnvironment,
    sample: g.sample ?? {
      id: 'C-012',
      state: migratedSampleState,
      location: 'Delta Ridge',
      selectedSol: c012 === 'none' ? null : Math.max(1, g.sol - 2),
      collectedSol: c012 === 'none' ? null : Math.max(1, g.sol - 1),
      type: 'biosignatureCandidate' as const,
      mineralogy: c012 === 'none' ? [] : ['clay', 'sulfate'],
      quality: c012 === 'none' ? 0 : 82,
      contaminated: c012 === 'none' ? null : false,
      storage: c012 === 'none' ? ('uncollected' as const) : ('tube' as const),
      analysis: c012 === 'analyzed' || c012 === 'uplinked' ? ('organicsDetected' as const) : ('pending' as const),
      uploaded: c012 === 'uplinked',
    },
    pillars: {
      ...g.pillars,
      science: { ...g.pillars.science, c012: migratedSampleState },
    },
    reports: (g.reports ?? []).map((report) => ({
      ...report,
      environment: report.environment ?? fallbackEnvironment,
      act: report.act ?? (report.sol <= 100 ? 'discovery' : report.sol <= 250 ? 'expansion' : report.sol <= 375 ? 'survival' : 'finalApproach'),
    })),
    storm: {
      ...g.storm,
      chainId: g.storm?.sols > 0 ? `legacy-storm-${g.sol}` : null,
      chainStep: g.storm?.sols > 0 ? 1 : 0,
    },
    advisors: Object.fromEntries(
      Object.entries(g.advisors).map(([id, a]) => [id, { ...a, justifiedRejections: (a as { justifiedRejections?: number }).justifiedRejections ?? 0 }])
    ) as GameState['advisors'],
    stats: { ...g.stats, discoveries: g.stats?.discoveries ?? 0, eventChainsBroken: g.stats?.eventChainsBroken ?? 0 },
  } satisfies GameState;
  return migrated;
}

export function saveGame(game: GameState): boolean {
  return write(SLOT_KEY(game.slot), { savedAt: Date.now(), game });
}

export function loadGame(slot: number): GameState | null {
  const data = read<{ savedAt: number; game: unknown }>(SLOT_KEY(slot));
  const game = migrate(data?.game);
  if (game && (data?.game as { version?: number })?.version !== 3) saveGame(game);
  return game;
}

export function deleteSlot(slot: number): void {
  try {
    localStorage.removeItem(SLOT_KEY(slot));
  } catch {
    /* storage unavailable */
  }
}

export function listSlots(): (SlotSummary | null)[] {
  return Array.from({ length: SLOT_COUNT }, (_, slot) => {
    const data = read<{ savedAt: number; game: unknown }>(SLOT_KEY(slot));
    const g = migrate(data?.game);
    if (!g) return null;
    return {
      slot,
      savedAt: data?.savedAt ?? Date.now(),
      sol: g.sol,
      difficulty: g.difficulty,
      region: g.region,
      permadeath: g.permadeath,
      pillarsDone: pillarsDone(g),
      ended: !!g.outcome,
    };
  });
}

export function loadLeaderboard(): LeaderboardEntry[] {
  return read<LeaderboardEntry[]>(LB_KEY) ?? [];
}

export function recordRun(game: GameState): void {
  if (!game.outcome) return;
  const list = loadLeaderboard();
  if (list.some((e) => e.id === game.runId)) return;
  list.push({
    id: game.runId,
    date: Date.now(),
    difficulty: game.difficulty,
    region: game.region,
    score: game.outcome.result === 'victory' ? game.score.total : Math.round(game.score.total * 0.5),
    medal: game.outcome.medal,
    sol: game.sol,
    result: game.outcome.result,
    permadeath: game.permadeath,
  });
  list.sort((a, b) => b.score - a.score);
  write(LB_KEY, list.slice(0, 50));
}

```
```hooks/useStageDriver.ts
import { useEffect, useRef } from 'react';
import type { CommandId } from '../types/game';
import type { MissionState } from '../types/mission';
import { createMission, stepMission } from '../utils/sim/mission';

export interface StageTarget {
  /** 0–1 route progress the rover should be at. */
  route: number;
  /** Command currently playing out, if any. */
  action: CommandId | null;
  /** 0–1 storm intensity. */
  storm: number;
  linkOpen: boolean;
  /** Playback multiplier for rover drive speed. */
  speed: number;
}

const TICK = 0.1;
const WORK: CommandId[] = ['survey', 'drill', 'sample', 'analyze', 'prep', 'navigate', 'deploySolar', 'buildRelay', 'repair'];

/**
 * Keeps a MissionState-shaped ref alive for the 3D stage. The ambient sim (fleet, sky, wheels)
 * keeps running; the rover route, weather and link are driven by the turn-based game.
 */
export function useStageDriver(target: StageTarget) {
  const simRef = useRef<MissionState>(createMission(false));
  const targetRef = useRef(target);
  targetRef.current = target;

  useEffect(() => {
    const t = targetRef.current;
    const r = simRef.current.rover;
    simRef.current = { ...simRef.current, rover: { ...r, t: t.route, status: t.route >= 1 ? 'on-target' : 'holding' } };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      const tgt = targetRef.current;
      const { next } = stepMission(simRef.current, TICK);
      const rv = { ...next.rover, speedLimit: 1.6 * Math.min(4, tgt.speed), timer: 999, drillHeat: 0, drillOverheated: false, battery: 80 };
      const gap = tgt.route - rv.t;
      if (gap > 0.002) {
        rv.status = 'navigating';
      } else if (gap < -0.002) {
        rv.status = 'returning';
      } else {
        rv.t = tgt.route;
        rv.status = tgt.action && WORK.includes(tgt.action) ? 'scanning' : tgt.route >= 1 ? 'on-target' : 'holding';
      }
      if (rv.status === 'navigating' && rv.t > tgt.route) rv.t = tgt.route;
      if (rv.status === 'returning' && rv.t < tgt.route) rv.t = tgt.route;
      if (rv.t <= 0 && rv.status !== 'navigating') {
        rv.t = 0;
        rv.status = 'holding';
      }
      const prevI = simRef.current.weather.intensity;
      const intensity = prevI + (tgt.storm - prevI) * 0.04;
      simRef.current = {
        ...next,
        rover: rv,
        weather: { phase: intensity > 0.05 ? 'storm' : 'clear', timer: 999, duration: 999, intensity },
        comms: { ...next.comms, open: tgt.linkOpen, calibration: 1 },
        faults: [],
      };
    }, TICK * 1000);
    return () => window.clearInterval(id);
  }, []);

  return simRef;
}

```
```utils/sound.ts
let ctx: AudioContext | null = null;
let enabled = true;

export function setSoundEnabled(on: boolean): void {
  enabled = on;
}

type Cue = 'send' | 'alert' | 'ok' | 'tick';

const CUES: Record<Cue, { freq: number[]; dur: number; type: OscillatorType; gain: number }> = {
  send: { freq: [520, 780], dur: 0.09, type: 'sine', gain: 0.05 },
  alert: { freq: [440, 330], dur: 0.12, type: 'triangle', gain: 0.06 },
  ok: { freq: [660, 990], dur: 0.07, type: 'sine', gain: 0.04 },
  tick: { freq: [1200], dur: 0.03, type: 'sine', gain: 0.02 },
};

/** Short synthesized console blips. Silent when disabled or unsupported. */
export function playCue(cue: Cue): void {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx = ctx ?? new AC();
    const c = CUES[cue];
    c.freq.forEach((f, i) => {
      const t0 = ctx!.currentTime + i * c.dur;
      const osc = ctx!.createOscillator();
      const g = ctx!.createGain();
      osc.type = c.type;
      osc.frequency.value = f;
      g.gain.setValueAtTime(c.gain, t0);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + c.dur);
      osc.connect(g).connect(ctx!.destination);
      osc.start(t0);
      osc.stop(t0 + c.dur + 0.02);
    });
  } catch {
    /* audio unavailable */
  }
}

```
```hooks/useGame.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import { unlockedCommands } from '../data/acts';
import { difficultyDef } from '../data/difficulty';
import { commandAp, sequenceAp } from '../data/gameCommands';
import { useI18n } from '../contexts/LanguageContext';
import type { CommandId, GamePhase, GameState, NewGameOptions, Proposal, QueueItem, SolReport, TimeSpeed } from '../types/game';
import type { ToastMessage, ToastTone } from '../types/rover';
import { resolveSol } from '../utils/game/resolve';
import { createGame } from '../utils/game/setup';
import { haptic } from '../utils/haptics';
import { playCue } from '../utils/sound';
import { deleteSlot, loadGame, recordRun, saveGame } from '../utils/storage';

export type Screen = 'title' | 'setup' | 'leaderboard' | 'game';

interface Playback {
  report: SolReport;
  next: GameState;
  elapsed: number;
  uplinkDur: number;
  done?: boolean;
}

interface Snapshot {
  game: GameState;
  queue: QueueItem[];
  accepted: string[];
  safe: boolean;
}

export const STEP_S = 2.4;
export const NIGHT_S = 2.6;

function playbackPhase(pb: Playback): GamePhase {
  if (pb.elapsed < pb.uplinkDur) return 'uplink';
  if (pb.elapsed < pb.uplinkDur + pb.report.steps.length * STEP_S) return 'executing';
  return 'night';
}

export function useGame(startScreen: 'title' | 'game') {
  const [screen, setScreen] = useState<Screen>(startScreen === 'game' ? 'game' : 'title');
  const [game, setGame] = useState<GameState | null>(() =>
    startScreen === 'game' ? createGame({ difficulty: 'engineer', region: 'jezero', slot: 0, permadeath: false, seed: 4242 }) : null
  );
  const [basePhase, setPhase] = useState<GamePhase>('planning');
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [accepted, setAccepted] = useState<string[]>([]);
  const [safe, setSafe] = useState(false);
  const [speed, setSpeed] = useState<TimeSpeed>(1);
  const [paused, setPaused] = useState(false);
  const [playback, setPlayback] = useState<Playback | null>(null);
  const phase: GamePhase = playback ? playbackPhase(playback) : basePhase;
  const [report, setReport] = useState<SolReport | null>(null);
  const [debriefOpen, setDebriefOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const i18n = useI18n();
  const tr = useRef(i18n);
  tr.current = i18n;
  const snapshot = useRef<Snapshot | null>(null);
  const uid = useRef(1);
  const revealed = useRef(-1);

  const notify = useCallback((text: string, tone: ToastTone = 'info') => {
    setToast({ id: Date.now() + Math.random(), text, tone });
    haptic(tone === 'warn' ? 'error' : tone === 'ok' ? 'success' : 'light');
  }, []);
  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(id);
  }, [toast]);

  const queueAp = sequenceAp(queue.map((item) => item.command));
  const capacity = game ? game.apBudget - (safe ? 1 : 0) : 0;

  const resetPlanning = useCallback(() => {
    setQueue([]);
    setAccepted([]);
    setPhase('planning');
    setPlayback(null);
    revealed.current = -1;
  }, []);

  // ——— Setup & saves ———
  const startNew = useCallback(
    (opts: NewGameOptions) => {
      const g = createGame(opts);
      saveGame(g);
      setGame(g);
      setSafe(false);
      setSpeed(1);
      setPaused(false);
      setReport(null);
      setDebriefOpen(false);
      snapshot.current = null;
      resetPlanning();
      setScreen('game');
      notify(tr.current.t.toast.started, 'ok');
    },
    [notify, resetPlanning]
  );

  const loadSlot = useCallback(
    (slot: number) => {
      const g = loadGame(slot);
      if (!g) {
        notify(tr.current.t.toast.slotEmpty, 'warn');
        return;
      }
      setGame(g);
      setReport(null);
      setDebriefOpen(!!g.outcome);
      snapshot.current = null;
      resetPlanning();
      setScreen('game');
      notify(tr.current.t.toast.loaded(slot + 1, g.sol), 'ok');
    },
    [notify, resetPlanning]
  );

  const saveNow = useCallback(
    (slot?: number) => {
      if (!game) return;
      const g = slot === undefined || game.permadeath ? game : { ...game, slot };
      if (saveGame(g)) {
        setGame(g);
        notify(tr.current.t.toast.saved(g.slot + 1), 'ok');
      } else notify(tr.current.t.toast.saveFailed, 'warn');
    },
    [game, notify]
  );

  const quitToTitle = useCallback(() => {
    if (game && !game.outcome && phase === 'planning') saveGame(game);
    setScreen('title');
    setDebriefOpen(false);
  }, [game, phase]);

  // ——— Sequence building ———
  const addCommand = useCallback(
    (command: CommandId) => {
      if (phase !== 'planning' || !game) return;
      if (!unlockedCommands(game.sol).has(command)) {
        notify(tr.current.t.toast.commandLocked, 'warn');
        return;
      }
      const cost = commandAp(command);
      if (queueAp + cost > capacity) {
        notify(tr.current.t.toast.noAp(capacity), 'warn');
        return;
      }
      setQueue((q) => [...q, { uid: uid.current++, command, source: 'manual' }]);
      playCue('tick');
    },
    [phase, game, queueAp, capacity, notify]
  );

  const acceptProposal = useCallback(
    (p: Proposal) => {
      if (phase !== 'planning') return;
      if (accepted.includes(p.id)) {
        setAccepted((a) => a.filter((id) => id !== p.id));
        setQueue((q) => q.filter((i) => i.proposalId !== p.id));
        return;
      }
      const cost = sequenceAp(p.commands);
      if (queueAp + cost > capacity) {
        notify(tr.current.t.toast.needsAp(cost, capacity - queueAp), 'warn');
        return;
      }
      setAccepted((a) => [...a, p.id]);
      setQueue((q) => [...q, ...p.commands.map((command) => ({ uid: uid.current++, command, source: p.advisor, proposalId: p.id }))]);
      playCue('tick');
    },
    [phase, accepted, queueAp, capacity, notify]
  );

  const removeItem = useCallback(
    (id: number) => {
      if (phase !== 'planning') return;
      setQueue((q) => {
        const item = q.find((i) => i.uid === id);
        const next = q.filter((i) => i.uid !== id);
        if (item?.proposalId && !next.some((i) => i.proposalId === item.proposalId)) {
          setAccepted((a) => a.filter((p) => p !== item.proposalId));
        }
        return next;
      });
    },
    [phase]
  );

  const moveItem = useCallback(
    (id: number, dir: -1 | 1) => {
      if (phase !== 'planning') return;
      setQueue((q) => {
        const i = q.findIndex((x) => x.uid === id);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= q.length) return q;
        const next = q.slice();
        [next[i], next[j]] = [next[j], next[i]];
        return next;
      });
    },
    [phase]
  );

  const toggleSafe = useCallback(() => {
    if (phase !== 'planning') return;
    if (!safe && queueAp >= (game?.apBudget ?? 0)) {
      notify(tr.current.t.toast.safeNeedsAp, 'warn');
      return;
    }
    setSafe((s) => !s);
  }, [phase, safe, queueAp, game, notify]);

  // ——— Send & playback ———
  const send = useCallback(() => {
    if (!game || phase !== 'planning' || game.outcome) return;
    snapshot.current = { game, queue, accepted, safe };
    const res = resolveSol(game, queue, safe, accepted);
    setPlayback({ ...res, elapsed: 0, uplinkDur: Math.max(2, game.delayMin * 0.5) });
    revealed.current = -1;
    setPhase('uplink');
    setPaused(false);
    playCue('send');
    haptic('medium');
  }, [game, phase, queue, accepted, safe]);

  const finishSol = useCallback(
    (pb: Playback) => {
      const next = pb.next;
      setGame(next);
      if (next.outcome) {
        recordRun(next);
        if (next.permadeath && next.outcome.result === 'defeat') deleteSlot(next.slot);
        else saveGame(next);
      } else saveGame(next);
      setReport(pb.report);
      setPhase('report');
      setPlayback(null);
      if (pb.report.events.some((e) => e.tone === 'red')) playCue('alert');
      else playCue('ok');
    },
    []
  );

  const effSpeed = phase === 'executing' ? 1 : speed;
  useEffect(() => {
    if (!playback || paused) return;
    const id = window.setInterval(() => {
      setPlayback((pb) => {
        if (!pb || pb.done) return pb;
        const elapsed = pb.elapsed + 0.1 * effSpeed;
        const execStart = pb.uplinkDur;
        const execEnd = execStart + pb.report.steps.length * STEP_S;
        const nightEnd = execEnd + NIGHT_S;
        if (elapsed >= nightEnd) {
          window.setTimeout(() => finishSol(pb), 0);
          return { ...pb, elapsed: nightEnd, done: true };
        }
        const nextPhase: GamePhase = elapsed < execStart ? 'uplink' : elapsed < execEnd ? 'executing' : 'night';
        if (nextPhase === 'executing') {
          const idx = Math.floor((elapsed - execStart) / STEP_S);
          const doneIdx = idx - 1;
          if (doneIdx > revealed.current) {
            revealed.current = doneIdx;
            const s = pb.report.steps[doneIdx];
            if (s) window.setTimeout(() => notify(tr.current.f(s.title), s.ok ? 'ok' : 'warn'), 0);
          }
        } else if (nextPhase === 'night' && revealed.current < pb.report.steps.length - 1) {
          revealed.current = pb.report.steps.length - 1;
          const s = pb.report.steps[revealed.current];
          if (s) window.setTimeout(() => notify(tr.current.f(s.title), s.ok ? 'ok' : 'warn'), 0);
        }
        return { ...pb, elapsed };
      });
    }, 100);
    return () => window.clearInterval(id);
  }, [playback !== null, paused, effSpeed, finishSol, notify]); // eslint-disable-line react-hooks/exhaustive-deps

  const continueAfterReport = useCallback(() => {
    setReport(null);
    if (game?.outcome) {
      setDebriefOpen(true);
      return;
    }
    resetPlanning();
  }, [game, resetPlanning]);

  const canUndo = !!game && !!snapshot.current && difficultyDef(game.difficulty).undo && !game.permadeath && phase === 'report';
  const undo = useCallback(() => {
    const s = snapshot.current;
    if (!s || !canUndo) return;
    setGame(s.game);
    saveGame(s.game);
    setReport(null);
    setDebriefOpen(false);
    setPlayback(null);
    setQueue(s.queue);
    setAccepted(s.accepted);
    setSafe(s.safe);
    setPhase('planning');
    snapshot.current = null;
    notify(tr.current.t.toast.restored(s.game.sol), 'info');
  }, [canUndo, notify]);

  /** Resolves several idle Sols (rest + heat) without playback; stops early on red events. */
  const restSols = useCallback(
    (count: number) => {
      if (!game || phase !== 'planning' || game.outcome) return;
      let g = game;
      let last: SolReport | null = null;
      let ran = 0;
      for (let i = 0; i < count; i++) {
        const q: QueueItem[] = [
          { uid: uid.current++, command: 'rest', source: 'manual' },
          { uid: uid.current++, command: 'heat', source: 'manual' },
        ];
        const res = resolveSol(g, q, false, []);
        g = res.next;
        last = res.report;
        ran++;
        if (g.outcome || res.report.events.some((e) => e.tone === 'red')) break;
      }
      snapshot.current = null;
      if (last) finishSol({ next: g, report: { ...last, restSkip: ran }, elapsed: 0, uplinkDur: 0 });
    },
    [game, phase, finishSol]
  );

  const progress = playback
    ? (() => {
        const execStart = playback.uplinkDur;
        const total = execStart + playback.report.steps.length * STEP_S + NIGHT_S;
        const stepIdx = Math.min(playback.report.steps.length - 1, Math.floor((playback.elapsed - execStart) / STEP_S));
        return {
          uplinkLeft: Math.max(0, execStart - playback.elapsed),
          uplinkDur: execStart,
          stepIndex: playback.elapsed < execStart ? -1 : stepIdx,
          fraction: playback.elapsed / total,
          steps: playback.report.steps,
        };
      })()
    : null;

  const apUsed = queueAp + (safe ? 1 : 0);

  return {
    screen,
    setScreen,
    game,
    phase,
    queue,
    accepted,
    safe,
    speed,
    setSpeed,
    paused,
    togglePause: () => setPaused((p) => !p),
    progress,
    playbackNext: playback?.next ?? null,
    report,
    debriefOpen,
    closeDebrief: () => setDebriefOpen(false),
    toast,
    notify,
    capacity,
    apUsed,
    startNew,
    loadSlot,
    saveNow,
    quitToTitle,
    addCommand,
    acceptProposal,
    removeItem,
    moveItem,
    toggleSafe,
    clearQueue: () => {
      setQueue([]);
      setAccepted([]);
    },
    send,
    continueAfterReport,
    canUndo,
    undo,
    restSols,
    commandLabel: (c: CommandId) => i18n.t.commands[c].label,
  };
}

```
```utils/tone.ts
import type { Tone } from '../types/game';

export const toneText: Record<Tone, string> = {
  amber: 'text-amber',
  green: 'text-green',
  blue: 'text-blue',
  red: 'text-red',
  neutral: 'text-ink-3',
};

export const toneBg: Record<Tone, string> = {
  amber: 'bg-amber',
  green: 'bg-green',
  blue: 'bg-blue',
  red: 'bg-red',
  neutral: 'bg-ink-4',
};

export function trustTone(trust: number): Tone {
  if (trust >= 70) return 'green';
  if (trust < 30) return 'red';
  return 'neutral';
}

export function healthTone(v: number): Tone {
  if (v < 30) return 'red';
  if (v < 55) return 'amber';
  return 'green';
}

export function formatLmst(hours: number): string {
  const h = ((hours % 24) + 24) % 24;
  const hh = Math.floor(h);
  const mm = Math.floor((h - hh) * 60);
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

```
```components/shared/Meter.tsx
import React from 'react';
import { motion } from 'framer-motion';
import type { Tone } from '../../types/game';
import { toneBg, toneText } from '../../utils/tone';

interface MeterProps {
  label: string;
  value: string;
  /** 0–1 fill. */
  fraction: number;
  tone?: Tone;
  /** Optional target marker 0–1. */
  marker?: number;
}

export function Meter({ label, value, fraction, tone = 'neutral', marker }: MeterProps) {
  const pct = Math.round(Math.min(1, Math.max(0, fraction)) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[12px] text-ink-3">{label}</span>
        <span className={`text-[12px] font-[600] ${tone === 'neutral' ? 'text-ink' : toneText[tone]}`}>{value}</span>
      </div>
      <div className="relative mt-1.5 h-1 rounded-full bg-track" role="meter" aria-label={label} aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <motion.span
          className={`absolute inset-y-0 left-0 rounded-full ${tone === 'neutral' ? 'bg-ink-2' : toneBg[tone]}`}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        />
        {marker !== undefined && <span className="absolute -top-1 h-3 w-px bg-ink" style={{ left: `${marker * 100}%` }} aria-hidden="true" />}
      </div>
    </div>
  );
}

```
```components/shared/Panel.tsx
import React from 'react';

interface PanelProps {
  title: string;
  aside?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  as?: 'section' | 'div';
}

/** Glass HUD panel with a quiet header row. */
export function Panel({ title, aside, className = '', children, as = 'section' }: PanelProps) {
  const Tag = as;
  return (
    <Tag className={`glass rounded-[18px] p-4 ${className}`} aria-label={as === 'section' ? title : undefined}>
      <header className="mb-3 flex items-center justify-between gap-3">
        <h2 className="hud-label text-ink-3">{title}</h2>
        {aside}
      </header>
      {children}
    </Tag>
  );
}

```
```components/advisors/TrustMeter.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../../contexts/LanguageContext';
import { enterTransition } from '../../utils/motion';
import { toneBg, toneText, trustTone } from '../../utils/tone';

export function TrustMeter({ trust, compact = false }: { trust: number; compact?: boolean }) {
  const { t } = useI18n();
  const tone = trustTone(trust);
  const band = trust >= 70 ? t.advisor.band.high : trust < 30 ? t.advisor.band.low : t.advisor.band.normal;
  return (
    <div className="flex items-center gap-2" title={`${t.advisor.trust} ${Math.round(trust)} · ${band}`}>
      {!compact && <span className="hud-label">{t.advisor.trust}</span>}
      <span className="relative h-1 w-12 overflow-hidden rounded-full bg-track" role="meter" aria-label={t.advisor.trustAria} aria-valuenow={Math.round(trust)} aria-valuemin={0} aria-valuemax={100}>
        <motion.span
          className={`absolute inset-y-0 left-0 rounded-full ${tone === 'neutral' ? 'bg-ink-2' : toneBg[tone]}`}
          initial={false}
          animate={{ width: `${trust}%` }}
          transition={enterTransition}
        />
      </span>
      <span className={`w-6 text-right text-[12px] font-[650] ${tone === 'neutral' ? 'text-ink' : toneText[tone]}`}>{Math.round(trust)}</span>
    </div>
  );
}

```
```components/advisors/AdvisorCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, PlusIcon, TriangleAlertIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { TRUST_LOW, advisors } from '../../data/advisors';
import { commandDefs, sequenceAp } from '../../data/gameCommands';
import type { AdvisorId, AdvisorState, Proposal } from '../../types/game';
import type { Msg } from '../../types/i18n';
import { enterTransition, stagger } from '../../utils/motion';
import { IconSwap, IconSwapItem } from '../shared/IconSwap';
import { TrustMeter } from './TrustMeter';

interface AdvisorCardProps {
  id: AdvisorId;
  state: AdvisorState;
  proposals: Proposal[];
  accepted: string[];
  onAccept: (p: Proposal) => void;
  locked: boolean;
  conflict?: Msg;
  compact?: boolean;
  index?: number;
}

export function AdvisorCard({ id, state, proposals, accepted, onAccept, locked, conflict, compact = false, index = 0 }: AdvisorCardProps) {
  const { t, f } = useI18n();
  const meta = advisors[id];
  const Icon = meta.icon;
  const lowTrust = state.trust < TRUST_LOW;
  const isAccepted = proposals.some((p) => accepted.includes(p.id));

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...enterTransition, delay: stagger(index) }}
      aria-label={t.advisor.aria(meta.code)}
      className={`glass rounded-[18px] ${compact ? 'p-3' : 'p-4'} transition-[box-shadow] duration-200 ${isAccepted ? 'shadow-[inset_0_0_0_1px_var(--amber)]' : ''}`}
    >
      <header className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fill-2 text-ink">
          <Icon size={15} strokeWidth={1.5} />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="flex items-baseline gap-2">
            <span className="text-[13px] font-[650] tracking-[0.06em] text-ink">{meta.code}</span>
            <span className="truncate text-[11.5px] text-ink-4">{t.advisors[id].name}</span>
          </div>
          {!compact && <div className="truncate text-[11px] text-ink-4">{meta.lead}</div>}
        </div>
        <TrustMeter trust={state.trust} compact={compact} />
      </header>

      <div className={`${compact ? 'mt-2.5 space-y-2' : 'mt-3.5 space-y-3'}`}>
        {proposals.map((p) => {
          const on = accepted.includes(p.id);
          return (
            <div key={p.id} className={p.alternative ? 'border-t border-line pt-3' : ''}>
              {p.alternative && <div className="mb-1 text-[10.5px] font-[600] text-green">{t.advisor.alternative}</div>}
              <h3 className={`${compact ? 'text-[12.5px]' : 'text-[13.5px]'} font-[600] leading-snug text-ink`}>{f(p.title)}</h3>
              {!compact && <p className="mt-1 text-[12px] leading-relaxed text-ink-3">{f(p.rationale)}</p>}
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {p.commands.map((c, i) => {
                  const C = commandDefs[c].icon;
                  return (
                    <span key={`${c}-${i}`} className="inline-flex items-center gap-1 rounded-md bg-fill-2 px-1.5 py-0.5 text-[11px] font-[550] text-ink-2">
                      <C size={11} strokeWidth={1.6} />
                      {t.commands[c].short}
                    </span>
                  );
                })}
                {p.pillar && <span className="text-[11px] text-ink-4">→ {t.pillars[p.pillar].name}</span>}
              </div>
              <div className="mt-2 flex items-center justify-between gap-2">
                <p className={`min-w-0 text-[11.5px] ${lowTrust ? 'text-amber' : 'text-ink-3'}`}>
                  {lowTrust && <TriangleAlertIcon size={11} strokeWidth={1.8} className="mr-1 inline -translate-y-px" aria-label={t.advisor.lowConfidence} />}
                  {t.advisor.est} {f(p.estimate)}
                </p>
                <button
                  type="button"
                  disabled={locked}
                  onClick={() => onAccept(p)}
                  aria-pressed={on}
                  className={`inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[11.5px] font-[600] transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${
                    on ? 'bg-amber text-obsidian hover:brightness-110' : 'border border-line-2 text-ink hover:border-amber hover:text-amber'
                  }`}
                >
                  <IconSwap>
                    <IconSwapItem key={on ? 'on' : 'off'}>{on ? <CheckIcon size={12} strokeWidth={2.2} /> : <PlusIcon size={12} strokeWidth={2} />}</IconSwapItem>
                  </IconSwap>
                  {on ? t.advisor.accepted : t.advisor.accept(sequenceAp(p.commands))}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {conflict && (
        <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-amber-soft px-2.5 py-1.5 text-[11.5px] leading-snug text-amber-ink">
          <TriangleAlertIcon size={12} strokeWidth={1.8} className="mt-0.5 shrink-0 text-amber" />
          {f(conflict)}
        </p>
      )}
      {state.ignoredStreak >= 2 && !compact && <p className="mt-2 text-[11px] text-ink-4">{t.advisor.ignored(state.ignoredStreak)}</p>}
    </motion.article>
  );
}

```
```components/pillars/PillarsHud.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { DEADLINE_SOL, pillarOrder, pillars } from '../../data/pillars';
import type { GameState } from '../../types/game';
import { pillarComplete, pillarProgress, pillarSteps } from '../../utils/game/pillars';
import { enterTransition } from '../../utils/motion';

/** Habitat Zero certification: the four pillars that win the game. */
export function PillarsHud({ game, layout = 'row' }: { game: GameState; layout?: 'row' | 'grid' }) {
  const { t } = useI18n();
  const left = DEADLINE_SOL - game.sol;
  return (
    <section aria-label={t.pillarsHud.aria} className={`glass rounded-[18px] p-1.5 ${layout === 'row' ? 'flex items-stretch gap-1' : 'grid grid-cols-2 gap-1'}`}>
      <div className={`hidden flex-col justify-center px-3 leading-tight ${layout === 'row' ? '2xl:flex' : ''}`}>
        <span className="hud-label">{t.pillarsHud.title}</span>
        <span className={`mt-1 whitespace-nowrap text-[12px] font-[600] ${left < 60 ? 'text-red' : 'text-ink'}`}>{t.pillarsHud.solsLeft(left)}</span>
      </div>
      {pillarOrder.map((id) => {
        const Icon = pillars[id].icon;
        const done = pillarComplete(game, id);
        const pct = Math.round(pillarProgress(game, id) * 100);
        const next = pillarSteps(game, id).find((s) => !s.done);
        return (
          <div key={id} className="group relative flex min-w-[104px] flex-1 items-center gap-2.5 rounded-[13px] px-2.5 py-2" title={t.pillars[id].goal}>
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${done ? 'bg-green-soft text-green' : 'bg-fill-2 text-ink-2'}`}>
              {done ? <CheckIcon size={14} strokeWidth={2} /> : <Icon size={14} strokeWidth={1.6} />}
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[12px] font-[600] text-ink">{t.pillars[id].name}</span>
                <span className={`text-[11px] font-[600] ${done ? 'text-green' : 'text-ink-3'}`}>{pct}%</span>
              </div>
              <span className="relative mt-1.5 block h-[3px] overflow-hidden rounded-full bg-track">
                <motion.span
                  className={`absolute inset-y-0 left-0 rounded-full ${done ? 'bg-green' : 'bg-amber'}`}
                  initial={false}
                  animate={{ width: `${pct}%` }}
                  transition={enterTransition}
                />
              </span>
              <span className="mt-1 block truncate text-[10.5px] text-ink-4">
                {done ? t.pillarsHud.certified : next ? `${t.pillarSteps[next.label]}${next.value ? ` · ${next.value}` : ''}` : ''}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}

```
```components/layout/TimeControls.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { PauseIcon, PlayIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import type { TimeSpeed } from '../../types/game';
import { menuEnterTransition } from '../../utils/motion';
import { IconSwap, IconSwapItem } from '../shared/IconSwap';

interface TimeControlsProps {
  paused: boolean;
  onTogglePause: () => void;
  speed: TimeSpeed;
  onSpeed: (s: TimeSpeed) => void;
  /** Speed-up is locked while a sequence executes. */
  speedLocked: boolean;
  disabled: boolean;
}

const SPEEDS: TimeSpeed[] = [1, 5, 20];

export function TimeControls({ paused, onTogglePause, speed, onSpeed, speedLocked, disabled }: TimeControlsProps) {
  const { t } = useI18n();
  return (
    <div className="glass flex items-center gap-1 rounded-full p-1" role="group" aria-label={t.time.aria}>
      <button
        type="button"
        onClick={onTogglePause}
        disabled={disabled}
        aria-label={paused ? t.time.resume : t.time.pause}
        aria-pressed={paused}
        className={`grid h-8 w-8 place-items-center rounded-full transition-colors duration-150 disabled:opacity-40 ${paused ? 'bg-amber text-obsidian' : 'text-ink-2 hover:bg-fill-2 hover:text-ink'}`}
      >
        <IconSwap>
          <IconSwapItem key={paused ? 'play' : 'pause'}>{paused ? <PlayIcon size={14} strokeWidth={2} /> : <PauseIcon size={14} strokeWidth={2} />}</IconSwapItem>
        </IconSwap>
      </button>
      {SPEEDS.map((s) => {
        const on = speed === s;
        const locked = (speedLocked && s !== 1) || disabled;
        return (
          <button
            key={s}
            type="button"
            onClick={() => onSpeed(s)}
            disabled={locked}
            aria-pressed={on}
            title={speedLocked && s !== 1 ? t.time.locked : t.time.playback(s)}
            className={`relative h-8 min-w-[36px] rounded-full px-2 text-[11.5px] font-[650] transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-35 ${on ? 'text-ink' : 'text-ink-3 hover:text-ink'}`}
          >
            {on && <motion.span layoutId="speed-glide" className="absolute inset-0 rounded-full bg-fill-3 shadow-[inset_0_0_0_1px_var(--line-2)]" transition={menuEnterTransition} />}
            <span className="relative">{s}×</span>
          </button>
        );
      })}
    </div>
  );
}

```
```components/sequence/PreSendChecklist.tsx
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, SendIcon, TriangleAlertIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import type { CheckItem } from '../../utils/game/checklist';
import { exitTransition, menuEnterTransition, stagger } from '../../utils/motion';

interface PreSendChecklistProps {
  open: boolean;
  items: CheckItem[];
  delayMin: number;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Last look before the sequence is committed. Once sent it cannot be recalled. */
export function PreSendChecklist({ open, items, delayMin, onConfirm, onCancel }: PreSendChecklistProps) {
  const { t, f } = useI18n();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label={t.checklist.title}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: menuEnterTransition }}
          exit={{ opacity: 0, y: 4, transition: exitTransition }}
          className="glass glass-strong absolute bottom-full right-0 z-10 mb-2 w-[min(380px,calc(100vw-32px))] rounded-[18px] p-4"
        >
          <h3 className="text-[14px] font-[650] text-ink">{t.checklist.title}</h3>
          <p className="mt-0.5 text-[12px] text-ink-3">{t.checklist.arrives(delayMin)}</p>
          <ul className="mt-3 space-y-2">
            {items.map((i, idx) => (
              <motion.li
                key={i.id}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0, transition: { ...menuEnterTransition, delay: stagger(idx) } }}
                className="flex items-start gap-2 text-[12.5px] leading-snug"
              >
                {i.level === 'warn' ? (
                  <TriangleAlertIcon size={14} strokeWidth={1.8} className="mt-0.5 shrink-0 text-amber" />
                ) : (
                  <CheckIcon size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-green" />
                )}
                <span className={i.level === 'warn' ? 'text-ink' : 'text-ink-3'}>{f(i.text)}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={onCancel} className="h-9 whitespace-nowrap rounded-full px-4 text-[12.5px] font-[600] text-ink-2 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
              {t.checklist.back}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full bg-amber px-4 text-[12.5px] font-[650] text-obsidian transition-[filter] duration-150 hover:brightness-110"
            >
              <SendIcon size={13} strokeWidth={2} />
              {t.checklist.sendAnyway}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```
```components/sequence/SequenceDock.tsx
import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, MoonIcon, SendIcon, ShieldIcon, XIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { commandUnlockSol, unlockedCommands } from '../../data/acts';
import { advisors } from '../../data/advisors';
import { commandAp, commandDefs, paletteOrder, sequenceAp } from '../../data/gameCommands';
import type { CommandId, GameState, QueueItem } from '../../types/game';
import { preSendChecklist } from '../../utils/game/checklist';
import { exitTransition, menuEnterTransition } from '../../utils/motion';
import { PreSendChecklist } from './PreSendChecklist';

interface SequenceDockProps {
  game: GameState;
  queue: QueueItem[];
  safe: boolean;
  capacity: number;
  onAdd: (c: CommandId) => void;
  onRemove: (uid: number) => void;
  onMove: (uid: number, dir: -1 | 1) => void;
  onToggleSafe: () => void;
  onSend: () => void;
  onRest: (sols: number) => void;
}

export function SequenceDock({ game, queue, safe, capacity, onAdd, onRemove, onMove, onToggleSafe, onSend, onRest }: SequenceDockProps) {
  const { t } = useI18n();
  const [confirm, setConfirm] = useState(false);
  const checks = useMemo(() => preSendChecklist(game, queue, safe), [game, queue, safe]);
  const warnings = checks.filter((c) => c.level === 'warn');
  const queueAp = sequenceAp(queue.map((item) => item.command));
  const full = queueAp >= capacity;
  const unlocked = useMemo(() => unlockedCommands(game.sol), [game.sol]);

  const trySend = () => {
    if (warnings.length) setConfirm(true);
    else onSend();
  };

  return (
    <section aria-label={t.dock.aria} className="glass glass-strong relative w-full rounded-[22px] p-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-1">
        <div className="leading-tight">
          <h2 className="text-[13px] font-[650] text-ink">{t.dock.title(game.sol)}</h2>
          <p className="text-[11px] text-ink-4">{t.dock.executes(game.delayMin)}</p>
        </div>
        <div className="flex items-center gap-2" aria-label={t.dock.apAria(queueAp + (safe ? 1 : 0), game.apBudget)}>
          <span className="hud-label">{t.common.ap}</span>
          <span className="flex gap-1">
            {Array.from({ length: game.apBudget }, (_, i) => {
              const used = i < queueAp;
              const safeSlot = safe && i === game.apBudget - 1;
              return <span key={i} className={`h-2.5 w-2.5 rounded-full transition-colors duration-150 ${safeSlot ? 'bg-blue' : used ? 'bg-amber' : 'bg-ink-5'}`} />;
            })}
          </span>
          {game.rover.safeModeSols > 0 && <span className="text-[11px] text-red">{t.dock.safeModePenalty}</span>}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => onRest(3)}
            title={t.dock.restTitle}
            className="hidden h-9 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[12px] font-[600] text-ink-3 transition-colors duration-150 hover:bg-fill-2 hover:text-ink sm:inline-flex"
          >
            <MoonIcon size={13} strokeWidth={1.8} />
            {t.dock.rest}
          </button>
          <button
            type="button"
            role="switch"
            aria-checked={safe}
            onClick={onToggleSafe}
            title={t.dock.safeTitle}
            className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-[12px] font-[600] transition-colors duration-150 ${
              safe ? 'border-blue bg-blue-soft text-blue' : 'border-line-2 text-ink-3 hover:text-ink'
            }`}
          >
            <ShieldIcon size={13} strokeWidth={1.8} />
            {safe ? t.dock.safe : t.dock.auto}
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={trySend}
              className="inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full bg-amber px-4 text-[12.5px] font-[650] text-obsidian transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.97]"
            >
              <SendIcon size={13} strokeWidth={2} />
              {t.dock.send}
              {warnings.length > 0 && <span className="grid h-4 min-w-[16px] place-items-center rounded-full bg-obsidian px-1 text-[10px] text-amber">{warnings.length}</span>}
            </button>
            <PreSendChecklist
              open={confirm}
              items={checks}
              delayMin={game.delayMin}
              onCancel={() => setConfirm(false)}
              onConfirm={() => {
                setConfirm(false);
                onSend();
              }}
            />
          </div>
        </div>
      </div>

      <ol className="scroll-quiet mt-3 flex min-h-[46px] items-center gap-1.5 overflow-x-auto rounded-[14px] bg-fill-1 p-1.5" aria-label={t.dock.queueAria}>
        <AnimatePresence initial={false}>
          {queue.map((item, i) => {
            const Icon = commandDefs[item.command].icon;
            const tc = t.commands[item.command];
            return (
              <motion.li
                key={item.uid}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1, transition: menuEnterTransition }}
                exit={{ opacity: 0, scale: 0.96, transition: exitTransition }}
                className="group flex shrink-0 items-center gap-1.5 rounded-[11px] bg-fill-2 py-1 pl-2 pr-1 shadow-[inset_0_0_0_1px_var(--line)]"
              >
                <span className="text-[10.5px] font-[650] text-ink-4">{i + 1}</span>
                <Icon size={13} strokeWidth={1.7} className="text-amber" />
                <span className="whitespace-nowrap text-[12px] font-[600] text-ink">{tc.short}</span>
                <span className="text-[10px] font-[600] tracking-[0.06em] text-ink-4">{item.source === 'manual' ? t.common.you : advisors[item.source].code}</span>
                <span className="flex opacity-60 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
                  <button type="button" aria-label={t.dock.moveEarlier(tc.label)} disabled={i === 0} onClick={() => onMove(item.uid, -1)} className="grid h-6 w-5 place-items-center rounded text-ink-3 hover:text-ink disabled:opacity-30">
                    <ChevronLeftIcon size={12} />
                  </button>
                  <button type="button" aria-label={t.dock.moveLater(tc.label)} disabled={i === queue.length - 1} onClick={() => onMove(item.uid, 1)} className="grid h-6 w-5 place-items-center rounded text-ink-3 hover:text-ink disabled:opacity-30">
                    <ChevronRightIcon size={12} />
                  </button>
                  <button type="button" aria-label={t.dock.remove(tc.label)} onClick={() => onRemove(item.uid)} className="grid h-6 w-6 place-items-center rounded text-ink-3 hover:text-red">
                    <XIcon size={12} />
                  </button>
                </span>
              </motion.li>
            );
          })}
        </AnimatePresence>
        {!queue.length && <li className="px-2 text-[12px] text-ink-4">{t.dock.empty}</li>}
      </ol>

      <div className="scroll-quiet mt-2 flex gap-1 overflow-x-auto" role="toolbar" aria-label={t.dock.paletteAria}>
        {paletteOrder.map((id) => {
          const def = commandDefs[id];
          const tc = t.commands[id];
          const Icon = def.icon;
          const locked = !unlocked.has(id);
          const cost = commandAp(id);
          const unaffordable = queueAp + cost > capacity;
          return (
            <button
              key={id}
              type="button"
              disabled={full || locked || unaffordable}
              onClick={() => onAdd(id)}
              title={locked ? t.dock.unlocks(commandUnlockSol(id)) : `${tc.label} · ${tc.description} · ${t.dock.apCost(cost)}${def.power ? ` · ${t.dock.battery(def.power)}` : ''}`}
              className="relative flex h-12 min-w-[60px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-[12px] px-2 text-ink-3 transition-colors duration-150 hover:bg-fill-2 hover:text-ink disabled:cursor-not-allowed disabled:opacity-35"
            >
              <Icon size={15} strokeWidth={1.5} />
              <span className="whitespace-nowrap text-[10.5px] font-[600]">{tc.short} · {cost}</span>
              {locked && <span className="absolute right-1 top-1 text-[8px] font-[700] text-amber">S{commandUnlockSol(id)}</span>}
            </button>
          );
        })}
      </div>
    </section>
  );
}

```
```components/sequence/ExecutionFeed.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, LoaderIcon, MinusIcon, MoonIcon, SatelliteDishIcon, XIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { advisors } from '../../data/advisors';
import { commandDefs } from '../../data/gameCommands';
import type { GamePhase, StepResult } from '../../types/game';
import { IconSwap, IconSwapItem } from '../shared/IconSwap';

interface ExecutionFeedProps {
  phase: GamePhase;
  delayMin: number;
  uplinkLeft: number;
  uplinkDur: number;
  stepIndex: number;
  steps: StepResult[];
  paused: boolean;
}

/** Replaces the dock while the sequence is in flight. Results arrive as telemetry, in order. */
export function ExecutionFeed({ phase, delayMin, uplinkLeft, uplinkDur, stepIndex, steps, paused }: ExecutionFeedProps) {
  const { t } = useI18n();
  const transit = phase === 'uplink';
  const night = phase === 'night';
  const minsLeft = Math.ceil((uplinkLeft / Math.max(0.01, uplinkDur)) * delayMin);
  return (
    <section aria-label={t.feed.aria} aria-live="polite" className="glass glass-strong w-full rounded-[22px] p-4">
      <div className="flex items-center gap-3">
        <span className={`grid h-9 w-9 place-items-center rounded-full transition-colors duration-200 ${transit ? 'bg-blue-soft text-blue' : night ? 'bg-fill-2 text-ink-2' : 'bg-amber-soft text-amber'}`}>
          <IconSwap>
            <IconSwapItem key={transit ? 'transit' : night ? 'night' : 'exec'}>
              {transit ? <SatelliteDishIcon size={16} strokeWidth={1.6} /> : night ? <MoonIcon size={16} strokeWidth={1.6} /> : <LoaderIcon size={16} strokeWidth={1.6} className={paused ? '' : 'animate-spin'} />}
            </IconSwapItem>
          </IconSwap>
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <h2 className="text-[13.5px] font-[650] text-ink">{transit ? t.feed.transit : night ? t.feed.night : t.feed.executing}</h2>
          <p className="text-[11.5px] text-ink-3">
            {transit ? t.feed.arrives(minsLeft, delayMin) : night ? t.feed.nightSub : t.feed.step(Math.max(1, stepIndex + 1), steps.length)}
            {paused && t.feed.paused}
          </p>
        </div>
      </div>
      {transit && (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-track">
          <motion.div className="h-full rounded-full bg-blue" initial={false} animate={{ width: `${(1 - uplinkLeft / Math.max(0.01, uplinkDur)) * 100}%` }} transition={{ duration: 0.1, ease: 'linear' }} />
        </div>
      )}
      <ol className="scroll-quiet mt-3 flex gap-1.5 overflow-x-auto">
        {steps.map((s, i) => {
          const Icon = commandDefs[s.command].icon;
          const done = night || i < stepIndex;
          const active = !night && i === stepIndex;
          return (
            <li
              key={`${s.command}-${i}`}
              className={`flex shrink-0 items-center gap-1.5 rounded-[11px] px-2 py-1.5 text-[12px] transition-colors duration-200 ${
                active ? 'bg-amber-soft text-ink shadow-[inset_0_0_0_1px_var(--amber)]' : done ? 'bg-fill-2 text-ink-2' : 'bg-fill-1 text-ink-4'
              }`}
            >
              <Icon size={13} strokeWidth={1.7} className={active ? 'text-amber' : ''} />
              <span className="whitespace-nowrap font-[600]">{t.commands[s.command].short}</span>
              <span className="text-[10px] text-ink-4">{s.source === 'manual' ? t.common.you : advisors[s.source].code}</span>
              {done &&
                (s.skipped ? (
                  <MinusIcon size={12} className="text-ink-4" aria-label={t.feed.skipped} />
                ) : s.ok ? (
                  <CheckIcon size={12} strokeWidth={2.2} className="text-green" aria-label={t.feed.success} />
                ) : (
                  <XIcon size={12} strokeWidth={2.2} className="text-red" aria-label={t.feed.failed} />
                ))}
            </li>
          );
        })}
        {!steps.length && <li className="text-[12px] text-ink-4">{t.feed.idle}</li>}
      </ol>
    </section>
  );
}

```
```components/views/NavigationPanel.tsx
import React from 'react';
import { CheckIcon, TriangleAlertIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { DRILL_RANGE, SURVEY_RANGE } from '../../data/pillars';
import { regionDef } from '../../data/regions';
import type { GameState } from '../../types/game';
import { healthTone } from '../../utils/tone';
import { Meter } from '../shared/Meter';
import { Panel } from '../shared/Panel';

const ROUTE_KM = 4.2;
const POINTS: [number, number][] = [
  [16, 150],
  [62, 140],
  [102, 112],
  [142, 94],
  [192, 82],
  [232, 60],
  [272, 36],
  [318, 18],
];

const SEGS = POINTS.slice(1).map((p, i) => Math.hypot(p[0] - POINTS[i][0], p[1] - POINTS[i][1]));
const TOTAL = SEGS.reduce((a, b) => a + b, 0);

function pointAt(t: number): [number, number] {
  let d = Math.min(1, Math.max(0, t)) * TOTAL;
  for (let i = 0; i < SEGS.length; i++) {
    if (d <= SEGS[i]) {
      const k = d / SEGS[i];
      return [POINTS[i][0] + (POINTS[i + 1][0] - POINTS[i][0]) * k, POINTS[i][1] + (POINTS[i + 1][1] - POINTS[i][1]) * k];
    }
    d -= SEGS[i];
  }
  return POINTS[POINTS.length - 1];
}

export function NavigationPanel({ game }: { game: GameState }) {
  const { t } = useI18n();
  const region = regionDef(game.region);
  const left = (1 - game.route) * ROUTE_KM;
  const perDrive = 0.13 * region.driveFactor * (game.rover.wheels < 40 ? 0.6 : 1) * (1 - 0.3 * game.storm.intensity);
  const drivesLeft = game.route >= 1 ? 0 : Math.ceil((1 - game.route) / perDrive);
  const pts = POINTS.map((p) => p.join(',')).join(' ');
  const [rx, ry] = pointAt(game.route);
  return (
    <Panel title={t.navigation.title} aside={<span className="text-[11px] text-ink-4">{t.regions[game.region].name}</span>}>
      <svg viewBox="0 0 334 170" className="w-full" role="img" aria-label={t.navigation.routeAria(Math.round(game.route * 100))}>
        <polyline points={pts} fill="none" stroke="var(--line-2)" strokeWidth="2" strokeDasharray="3 5" strokeLinejoin="round" />
        <polyline points={pts} fill="none" stroke="var(--amber)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${game.route} 1`} />
        {[SURVEY_RANGE, DRILL_RANGE].map((r, i) => {
          const [x, y] = pointAt(r);
          return <circle key={r} cx={x} cy={y} r="3.5" fill="var(--bg)" stroke={i === 0 ? 'var(--blue)' : 'var(--green)'} strokeWidth="1.5" />;
        })}
        <circle cx={POINTS[7][0]} cy={POINTS[7][1]} r="4" fill="none" stroke="var(--ink-3)" strokeWidth="1.2" />
        <circle cx={rx} cy={ry} r="6" fill="var(--amber)" stroke="var(--bg)" strokeWidth="2" />
        <text x="16" y="166" fill="var(--ink-4)" fontSize="9">
          {t.navigation.landing}
        </text>
        <text x="306" y="12" fill="var(--ink-3)" fontSize="9" textAnchor="end">
          {t.navigation.ridge}
        </text>
      </svg>
      <div className="mt-1 flex gap-4 text-[11px] text-ink-4">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full border border-blue" />
          {t.navigation.radarRange}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full border border-green" />
          {t.navigation.drillRange}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-3">
        <div>
          <dt className="hud-label">{t.navigation.remaining}</dt>
          <dd className="mt-1 text-[18px] font-[650] text-ink">{left.toFixed(1)} km</dd>
        </div>
        <div>
          <dt className="hud-label">{t.navigation.drivesLeft}</dt>
          <dd className="mt-1 text-[18px] font-[650] text-ink">~{drivesLeft}</dd>
        </div>
        <div>
          <dt className="hud-label">{t.navigation.perDrive}</dt>
          <dd className="mt-1 text-[18px] font-[650] text-ink">{Math.round(perDrive * ROUTE_KM * 1000)} m</dd>
        </div>
      </dl>

      <div className="mt-4 space-y-3">
        <Meter label={t.navigation.wheels} value={`${Math.round(game.rover.wheels)}%`} fraction={game.rover.wheels / 100} tone={healthTone(game.rover.wheels)} />
        <Meter label={t.navigation.wear} value={`×${region.wearMult.toFixed(1)}`} fraction={region.wearMult / 2} />
      </div>

      <p className={`mt-4 flex items-start gap-2 rounded-lg px-3 py-2 text-[12px] text-ink ${game.waypointsVerified ? 'bg-green-soft' : 'bg-amber-soft'}`}>
        {game.waypointsVerified ? <CheckIcon size={14} className="mt-0.5 shrink-0 text-green" /> : <TriangleAlertIcon size={14} className="mt-0.5 shrink-0 text-amber" />}
        {game.waypointsVerified ? t.navigation.verified : t.navigation.unverified}
      </p>
    </Panel>
  );
}

```
```components/views/SciencePanel.tsx
import React from 'react';
import { CheckIcon, ShieldCheckIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { DRILL_RANGE, ICE_CORES, SURVEY_RANGE } from '../../data/pillars';
import type { C012State, GameState } from '../../types/game';
import { healthTone } from '../../utils/tone';
import { Meter } from '../shared/Meter';
import { Panel } from '../shared/Panel';

const CUSTODY: Exclude<C012State, 'none'>[] = ['selected', 'surveyed', 'spectrographed', 'sampled', 'sealed', 'checked', 'analyzed', 'packetReady', 'uplinked'];
const ORDER: C012State[] = ['none', ...CUSTODY];

export function SciencePanel({ game }: { game: GameState }) {
  const { t } = useI18n();
  const w = game.pillars.water;
  const sample = game.sample;
  const reached = ORDER.indexOf(sample.state);
  return (
    <div className="flex flex-col gap-3">
      <Panel title={t.science.custody} aside={<span className="text-[11px] text-ink-4">{t.science.candidate}</span>}>
        <ol className="relative grid gap-x-5 gap-y-3 pl-6 xl:grid-cols-2">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-line-2" aria-hidden="true" />
          {CUSTODY.map((id, i) => {
            const done = reached >= i + 1;
            const next = reached === i;
            const c = t.science.steps[id];
            return (
              <li key={id} className="relative min-h-[38px]">
                <span className={`absolute -left-6 top-0.5 grid h-[15px] w-[15px] place-items-center rounded-full ${done ? 'bg-green text-obsidian' : next ? 'border-2 border-amber bg-obsidian' : 'border border-line-2 bg-obsidian'}`}>
                  {done && <CheckIcon size={10} strokeWidth={3} />}
                </span>
                <div className={`text-[12.5px] font-[600] ${done ? 'text-ink' : next ? 'text-amber' : 'text-ink-3'}`}>{c.label}</div>
                <div className="text-[11px] leading-snug text-ink-4">{c.hint}</div>
              </li>
            );
          })}
        </ol>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-3 text-[12px] sm:grid-cols-3">
          <SampleDatum label={t.science.quality} value={sample.quality ? `${sample.quality}%` : t.science.pending} />
          <SampleDatum label={t.science.storage} value={t.science.storageValues[sample.storage]} />
          <SampleDatum label={t.science.mineralogy} value={sample.mineralogy.length ? sample.mineralogy.join(' · ') : t.science.pending} />
          <SampleDatum label={t.science.selectedSol} value={sample.selectedSol ? `Sol ${sample.selectedSol}` : '—'} />
          <SampleDatum label={t.science.collectedSol} value={sample.collectedSol ? `Sol ${sample.collectedSol}` : '—'} />
          <div>
            <dt className="hud-label">{t.science.tool}</dt>
            <dd className={`mt-1 flex items-center gap-1 text-[12.5px] font-[600] ${game.sterile ? 'text-green' : 'text-ink-3'}`}>
              <ShieldCheckIcon size={13} /> {game.sterile ? t.science.sterile : t.science.notPrepped}
            </dd>
          </div>
        </dl>
        <div className="mt-3 flex gap-4 text-[11.5px] text-ink-3">
          <span>{t.science.tubes}: <strong className="text-ink">{game.inventory.tubes}</strong></span>
          <span>{t.science.voided}: <strong className={game.pillars.science.voidedTubes ? 'text-red' : 'text-ink'}>{game.pillars.science.voidedTubes}</strong></span>
        </div>
      </Panel>

      <Panel title={t.science.ice}>
        <div className="space-y-3">
          <Meter label={t.science.coverage} value={`${Math.round(w.coverage)}%`} fraction={w.coverage / 100} tone={w.coverage >= 100 ? 'green' : 'amber'} marker={0.6} />
          <Meter label={t.science.cores} value={`${w.cores}/${ICE_CORES}`} fraction={w.cores / ICE_CORES} tone={w.cores >= ICE_CORES ? 'green' : 'amber'} />
          <Meter label={t.science.bit} value={t.science.bitValue(Math.round(game.rover.drill), game.inventory.drillBits)} fraction={game.rover.drill / 100} tone={healthTone(game.rover.drill)} />
        </div>
        <p className="mt-3 text-[11.5px] leading-relaxed text-ink-4">
          {t.science.note(Math.round(SURVEY_RANGE * 100), Math.round(DRILL_RANGE * 100))}
          {w.uplinked && <span className="text-green">{t.science.delivered}</span>}
        </p>
      </Panel>
    </div>
  );
}

function SampleDatum({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="hud-label">{label}</dt>
      <dd className="mt-1 truncate text-[12.5px] font-[600] text-ink" title={value}>{value}</dd>
    </div>
  );
}

```
```components/views/SystemsPanel.tsx
import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import { POWER_STREAK, POWER_TARGET_W } from '../../data/pillars';
import { regionDef } from '../../data/regions';
import type { GameState } from '../../types/game';
import { farmOutput } from '../../utils/game/pillars';
import { healthTone } from '../../utils/tone';
import { Meter } from '../shared/Meter';
import { Panel } from '../shared/Panel';
import { InventoryList } from './InventoryList';

export function SystemsPanel({ game }: { game: GameState }) {
  const { t } = useI18n();
  const out = farmOutput(game);
  const region = regionDef(game.region);
  const p = game.pillars.power;
  return (
    <div className="flex flex-col gap-3">
      <Panel title={t.systems.power}>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[30px] font-[650] leading-none text-ink">
              {out}
              <span className="text-[14px] font-normal text-ink-4"> / {POWER_TARGET_W} W</span>
            </div>
            <p className="mt-1.5 text-[11.5px] text-ink-3">
              {t.systems.farm(p.farmW, Math.round(p.rtgW))}
              {game.storm.sols > 0 && <span className="text-red">{t.systems.storm(Math.round(game.storm.intensity * 55))}</span>}
            </p>
          </div>
          <div className="text-right">
            <div className="hud-label">{t.systems.stable}</div>
            <div className={`mt-1 whitespace-nowrap text-[16px] font-[650] ${p.streak >= POWER_STREAK ? 'text-green' : 'text-ink'}`}>
              {t.systems.sols(Math.min(p.streak, POWER_STREAK), POWER_STREAK)}
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Meter label={t.systems.toward} value={`${Math.round((out / POWER_TARGET_W) * 100)}%`} fraction={out / POWER_TARGET_W} tone={out >= POWER_TARGET_W ? 'green' : 'amber'} />
        </div>
      </Panel>

      <Panel title={t.systems.rover}>
        <div className="space-y-3">
          <Meter label={t.systems.battery} value={`${Math.round(game.rover.battery)}%`} fraction={game.rover.battery / 100} tone={healthTone(game.rover.battery)} />
          <Meter label={t.systems.wheels} value={`${Math.round(game.rover.wheels)}%`} fraction={game.rover.wheels / 100} tone={healthTone(game.rover.wheels)} />
          <Meter label={t.systems.drill} value={`${Math.round(game.rover.drill)}%`} fraction={game.rover.drill / 100} tone={healthTone(game.rover.drill)} />
          <Meter label={t.systems.dust} value={`${Math.round(game.rover.dust * 100)}%`} fraction={game.rover.dust} tone={game.rover.dust > 0.5 ? 'amber' : 'neutral'} />
        </div>
        <p className="mt-3 text-[11.5px] leading-relaxed text-ink-4">
          {t.systems.night(region.nightTemp)}
          {game.rover.brownouts > 0 && <span className="text-red">{t.systems.brownout}</span>}
        </p>
      </Panel>

      <Panel title={t.systems.inventory}>
        <InventoryList game={game} />
      </Panel>
    </div>
  );
}

```
```components/views/InventoryList.tsx
import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import { difficultyDef } from '../../data/difficulty';
import type { GameState, Inventory } from '../../types/game';

const ROWS: (keyof Inventory)[] = ['drillBits', 'tubes', 'spares', 'solarKits', 'relayKits'];

export function InventoryList({ game }: { game: GameState }) {
  const { t } = useI18n();
  const start = difficultyDef(game.difficulty).inventory;
  return (
    <ul className="divide-y divide-line">
      {ROWS.map((id) => {
        const v = game.inventory[id];
        const max = start[id];
        return (
          <li key={id} className="flex items-center justify-between gap-3 py-2 text-[12.5px]">
            <span className="truncate text-ink-3">{t.inventory[id]}</span>
            <span className="flex items-center gap-2">
              <span className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: max }, (_, i) => (
                  <span key={i} className={`h-2 w-1.5 rounded-[1px] ${i < v ? (v <= 1 ? 'bg-red' : 'bg-ink-2') : 'bg-ink-5'}`} />
                ))}
              </span>
              <span className={`w-9 text-right font-[600] ${v === 0 ? 'text-red' : 'text-ink'}`}>
                {v}/{max}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

```
```components/views/CommsPanel.tsx
import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import { COMMS_STREAK } from '../../data/pillars';
import type { GameState, Station } from '../../types/game';
import { queuedMb, windowCapacity } from '../../utils/game/comms';
import { Meter } from '../shared/Meter';
import { Panel } from '../shared/Panel';

const STATIONS: Station[] = ['Madrid', 'Goldstone', 'MRO', 'TGO', 'Relay'];

export function CommsPanel({ game }: { game: GameState }) {
  const { t } = useI18n();
  const cap = windowCapacity(game.windows, game.storm.intensity, game.environment.dustIndex);
  const need = queuedMb(game);
  const c = game.pillars.comms;
  return (
    <div className="flex flex-col gap-3">
      <Panel title={t.comms.windows(game.sol)} aside={<span className="whitespace-nowrap text-[11px] font-[600] text-blue">{t.comms.capacity(cap)}</span>}>
        <div className="space-y-2" role="list" aria-label={t.comms.listAria}>
          {STATIONS.map((st) => {
            const ws = game.windows.filter((w) => w.station === st);
            return (
              <div key={st} role="listitem" className="grid grid-cols-[72px_1fr] items-center gap-2">
                <span className={`text-[11.5px] ${ws.length ? 'text-ink-2' : 'text-ink-4'}`}>{st}</span>
                <div className="relative h-4 rounded bg-fill-1">
                  {ws.map((w, i) => (
                    <span
                      key={i}
                      className="absolute inset-y-0.5 rounded-sm bg-blue"
                      style={{ left: `${(w.start / 24) * 100}%`, width: `${Math.max(1.2, ((w.end - w.start) / 24) * 100)}%` }}
                      title={`${st} · ${w.start.toFixed(1)}–${w.end.toFixed(1)} h · ${w.mbps} Mbps`}
                    />
                  ))}
                  {!ws.length && <span className="absolute inset-0 grid place-items-center text-[10px] text-ink-4">{st === 'Relay' ? t.comms.notBuilt : t.comms.noPass}</span>}
                </div>
              </div>
            );
          })}
          <div className="grid grid-cols-[72px_1fr] gap-2 text-[10px] text-ink-4">
            <span />
            <span className="flex justify-between">
              <span>00</span>
              <span>06</span>
              <span>12</span>
              <span>18</span>
              <span>{t.comms.axisEnd}</span>
            </span>
          </div>
        </div>
        {game.storm.sols > 0 && <p className="mt-2 text-[11.5px] text-red">{t.comms.storm}</p>}
      </Panel>

      <Panel title={t.comms.queue} aside={<span className={`whitespace-nowrap text-[11px] font-[600] ${need > cap ? 'text-amber' : 'text-ink-3'}`}>{t.comms.waiting(need)}</span>}>
        {game.dataQueue.length ? (
          <ul className="space-y-2">
            {game.dataQueue.map((p) => (
              <li key={p.id} className="flex items-center justify-between rounded-lg bg-fill-1 px-3 py-2 text-[12.5px]">
                <span className="text-ink">{t.packets[p.kind]}</span>
                <span className="text-ink-3">{p.mb} MB</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[12px] text-ink-4">{t.comms.queueEmpty}</p>
        )}
      </Panel>

      <Panel title={t.comms.relay}>
        <div className="space-y-3">
          <Meter label={t.comms.tower} value={t.comms.towerValue(Math.round(c.relay), game.inventory.relayKits)} fraction={c.relay / 100} tone={c.relay >= 100 ? 'green' : 'blue'} />
          <Meter
            label={t.comms.unbroken}
            value={t.systems.sols(Math.min(c.streak, COMMS_STREAK), COMMS_STREAK)}
            fraction={Math.min(1, c.streak / COMMS_STREAK)}
            tone={c.streak >= COMMS_STREAK ? 'green' : 'blue'}
          />
        </div>
        <p className="mt-3 text-[11.5px] text-ink-4">{t.comms.note(game.delayMin)}</p>
      </Panel>
    </div>
  );
}

```
```components/views/EventsLog.tsx
import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import type { GameEvent } from '../../types/game';
import { toneBg } from '../../utils/tone';

export function EventsLog({ events, limit = 12 }: { events: GameEvent[]; limit?: number }) {
  const { t, f } = useI18n();
  if (!events.length) return <p className="text-[12px] text-ink-4">{t.eventsLog.none}</p>;
  return (
    <ol className="space-y-2.5">
      {events.slice(0, limit).map((e) => {
        const counterLabel = t.events[e.kind].counter;
        return (
          <li key={e.id} className="grid grid-cols-[52px_8px_1fr] items-start gap-2 text-[12px]">
            <span className="pt-px text-[11px] text-ink-4">
              {t.common.sol} {e.sol}
            </span>
            <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${toneBg[e.tone]}`} aria-hidden="true" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-[600] text-ink">{f(e.title)}</span>
                {e.chainStep && e.chainStep > 1 ? <span className="rounded bg-fill-2 px-1.5 py-0.5 text-[9.5px] font-[600] text-ink-4">{t.eventsLog.chain(e.chainStep)}</span> : null}
              </div>
              <div className="text-ink-3">{f(e.detail)}</div>
              {e.counter && counterLabel && <div className="mt-0.5 text-[11px] text-amber">{t.eventsLog.counter(counterLabel, t.commands[e.counter].short)}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

```
```components/views/ReportsPanel.tsx
import React from 'react';
import { TrophyIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { scoreAxes } from '../../data/scoring';
import type { GameState } from '../../types/game';
import { medalFor } from '../../utils/game/scoring';
import { MedalBadge } from '../endgame/MedalBadge';
import { Meter } from '../shared/Meter';
import { Panel } from '../shared/Panel';
import { EventsLog } from './EventsLog';

interface ReportsPanelProps {
  game: GameState;
  onLeaderboard: () => void;
}

export function ReportsPanel({ game, onLeaderboard }: ReportsPanelProps) {
  const { t } = useI18n();
  const projected = medalFor(game.score.total);
  return (
    <div className="flex flex-col gap-3">
      <Panel
        title={t.reports.score}
        aside={
          <button type="button" onClick={onLeaderboard} className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-[11.5px] font-[600] text-ink-3 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
            <TrophyIcon size={13} strokeWidth={1.7} />
            {t.reports.records}
          </button>
        }
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[30px] font-[650] leading-none text-ink">{game.score.total}</div>
            <div className="mt-1 text-[11.5px] text-ink-4">{t.reports.of}</div>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-ink-3">
            {t.reports.pace}
            <MedalBadge medal={projected} />
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {scoreAxes.map((a) => (
            <div key={a.id}>
              <Meter label={t.scoreAxes[a.id].label} value={String(game.score[a.id])} fraction={game.score[a.id] / 1000} tone="amber" />
              <p className="mt-1 text-[11px] text-ink-4">{t.scoreAxes[a.id].hint}</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title={t.reports.missionLearning}>
        <dl className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-[12px] bg-fill-1 p-3"><dt className="hud-label">{t.reports.discoveries}</dt><dd className="mt-1 text-[19px] font-[650] text-green">{game.stats.discoveries}</dd></div>
          <div className="rounded-[12px] bg-fill-1 p-3"><dt className="hud-label">{t.reports.chains}</dt><dd className="mt-1 text-[19px] font-[650] text-blue">{game.stats.eventChainsBroken}</dd></div>
          <div className="rounded-[12px] bg-fill-1 p-3"><dt className="hud-label">{t.reports.justified}</dt><dd className="mt-1 text-[19px] font-[650] text-amber">{Object.values(game.advisors).reduce((sum, a) => sum + a.justifiedRejections, 0)}</dd></div>
        </dl>
      </Panel>

      <Panel title={t.reports.log}>
        {game.reports.length ? (
          <ul className="divide-y divide-line">
            {game.reports.slice(0, 8).map((r) => {
              const failed = r.steps.filter((s) => !s.ok).length;
              const red = r.events.filter((e) => e.tone === 'red').length;
              return (
                <li key={r.sol} className="flex items-center justify-between py-2 text-[12px]">
                  <span className="font-[600] text-ink">
                    {t.common.sol} {r.sol}
                    {r.restSkip ? <span className="font-normal text-ink-4">{t.reports.rested(r.restSkip)}</span> : null}
                  </span>
                  <span className="text-ink-3">
                    {t.reports.ok(r.steps.length - failed, r.steps.length)}
                    {red > 0 && <span className="text-red">{t.reports.alerts(red)}</span>}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-[12px] text-ink-4">{t.reports.empty}</p>
        )}
      </Panel>

      <Panel title={t.reports.events}>
        <EventsLog events={game.events} limit={14} />
      </Panel>
    </div>
  );
}

```
```components/endgame/MedalBadge.tsx
import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import type { Medal } from '../../types/game';

const COLOR: Record<Medal, string> = {
  gold: '#e8c15a',
  silver: '#c9ccd2',
  bronze: '#c48a5a',
};

export function MedalBadge({ medal, size = 'sm' }: { medal: Medal | null; size?: 'sm' | 'lg' }) {
  const { t } = useI18n();
  if (!medal) return <span className="text-[12px] text-ink-4">—</span>;
  const color = COLOR[medal];
  const lg = size === 'lg';
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border font-[650] ${lg ? 'px-3 py-1 text-[13px]' : 'px-2 py-0.5 text-[11px]'}`} style={{ borderColor: color, color }}>
      <span className={`rounded-full ${lg ? 'h-2.5 w-2.5' : 'h-1.5 w-1.5'}`} style={{ background: color }} aria-hidden="true" />
      {t.medals[medal]}
    </span>
  );
}

```
```components/views/SettingsPanel.tsx
import React, { useState } from 'react';
import { GlobeIcon, LogOutIcon, MoonIcon, SaveIcon, SunIcon, Volume2Icon, VolumeXIcon, VibrateIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import type { GameState } from '../../types/game';
import { listSlots } from '../../utils/storage';
import { LanguageSwitch } from '../layout/LanguageSwitch';
import { IconSwap, IconSwapItem } from '../shared/IconSwap';
import { Panel } from '../shared/Panel';

interface SettingsPanelProps {
  game: GameState;
  canLoad: boolean;
  onSave: (slot: number) => void;
  onLoad: (slot: number) => void;
  onQuit: () => void;
  soundOn: boolean;
  onToggleSound: () => void;
  lightGlass: boolean;
  onToggleGlass: () => void;
  hapticsOn: boolean;
  onToggleHaptics: () => void;
}

function Switch({ on, label, onToggle }: { on: boolean; label: string; onToggle: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={onToggle} className={`relative h-6 w-10 shrink-0 rounded-full transition-colors duration-150 ${on ? 'bg-green' : 'bg-fill-3'}`}>
      <span className={`absolute top-1 h-4 w-4 rounded-full bg-ink transition-transform duration-150 ${on ? 'translate-x-5' : 'translate-x-1'}`} />
    </button>
  );
}

export function SettingsPanel(p: SettingsPanelProps) {
  const { t } = useI18n();
  const [slots, setSlots] = useState(listSlots);
  const refresh = () => setSlots(listSlots());
  const row = 'flex items-center justify-between gap-3 py-2.5';
  return (
    <div className="flex flex-col gap-3">
      <Panel title={t.settings.slots} aside={<span className="text-[11px] text-ink-4">{t.settings.offline}</span>}>
        {p.game.permadeath && <p className="mb-3 rounded-lg bg-amber-soft px-3 py-2 text-[12px] text-ink">{t.settings.permadeath(p.game.slot + 1)}</p>}
        <ul className="space-y-2">
          {slots.map((s, i) => {
            const current = p.game.slot === i;
            return (
              <li key={i} className={`flex items-center gap-3 rounded-[12px] px-3 py-2.5 ${current ? 'bg-fill-2' : 'bg-fill-1'}`}>
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="text-[12.5px] font-[600] text-ink">
                    {t.settings.slot(i + 1)}
                    {current && <span className="ml-1.5 text-[11px] font-normal text-amber">{t.settings.current}</span>}
                  </div>
                  <div className="truncate text-[11.5px] text-ink-4">
                    {s
                      ? `${t.common.sol} ${s.sol} · ${t.difficulty[s.difficulty].name} · ${t.regions[s.region].name} · ${s.pillarsDone}/4${s.ended ? t.settings.ended : ''}`
                      : t.common.empty}
                  </div>
                </div>
                <button
                  type="button"
                  disabled={p.game.permadeath && !current}
                  onClick={() => {
                    p.onSave(i);
                    refresh();
                  }}
                  className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full border border-line-2 px-3 text-[11.5px] font-[600] text-ink transition-colors duration-150 hover:border-amber hover:text-amber disabled:opacity-35"
                >
                  <SaveIcon size={12} />
                  {t.settings.save}
                </button>
                <button
                  type="button"
                  disabled={!s || !p.canLoad}
                  onClick={() => p.onLoad(i)}
                  className="h-8 whitespace-nowrap rounded-full px-3 text-[11.5px] font-[600] text-ink-3 transition-colors duration-150 hover:bg-fill-2 hover:text-ink disabled:opacity-35"
                >
                  {t.settings.load}
                </button>
              </li>
            );
          })}
        </ul>
      </Panel>

      <Panel title={t.settings.console}>
        <div className="divide-y divide-line">
          <div className={row}>
            <span className="flex items-center gap-2 text-[12.5px] text-ink">
              <GlobeIcon size={14} />
              {t.settings.language}
            </span>
            <LanguageSwitch />
          </div>
          <div className={row}>
            <span className="flex items-center gap-2 text-[12.5px] text-ink">
              <IconSwap>
                <IconSwapItem key={p.soundOn ? 'on' : 'off'}>{p.soundOn ? <Volume2Icon size={14} /> : <VolumeXIcon size={14} />}</IconSwapItem>
              </IconSwap>
              {t.settings.sound}
            </span>
            <Switch on={p.soundOn} label={t.settings.sound} onToggle={p.onToggleSound} />
          </div>
          <div className={row}>
            <span className="flex items-center gap-2 text-[12.5px] text-ink">
              <VibrateIcon size={14} />
              {t.settings.haptics}
            </span>
            <Switch on={p.hapticsOn} label={t.settings.haptics} onToggle={p.onToggleHaptics} />
          </div>
          <div className={row}>
            <span className="flex items-center gap-2 text-[12.5px] text-ink">
              <IconSwap>
                <IconSwapItem key={p.lightGlass ? 'sun' : 'moon'}>{p.lightGlass ? <SunIcon size={14} /> : <MoonIcon size={14} />}</IconSwapItem>
              </IconSwap>
              {t.settings.glass}
            </span>
            <Switch on={p.lightGlass} label={t.settings.glass} onToggle={p.onToggleGlass} />
          </div>
        </div>
      </Panel>

      <button
        type="button"
        onClick={p.onQuit}
        className="glass inline-flex h-11 items-center justify-center gap-2 rounded-full text-[12.5px] font-[600] text-ink-2 transition-colors duration-150 hover:text-ink"
      >
        <LogOutIcon size={14} />
        {t.settings.quit}
      </button>
    </div>
  );
}

```
```components/title/Leaderboard.tsx
import React, { useMemo, useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { difficulties } from '../../data/difficulty';
import { regions } from '../../data/regions';
import type { DifficultyId, RegionId } from '../../types/game';
import { loadLeaderboard } from '../../utils/storage';
import { MedalBadge } from '../endgame/MedalBadge';

type Filter<T> = T | 'all';

export function Leaderboard({ onBack }: { onBack: () => void }) {
  const { t } = useI18n();
  const all = useMemo(loadLeaderboard, []);
  const [diff, setDiff] = useState<Filter<DifficultyId>>('all');
  const [reg, setReg] = useState<Filter<RegionId>>('all');
  const rows = all.filter((e) => (diff === 'all' || e.difficulty === diff) && (reg === 'all' || e.region === reg));
  const seg = (on: boolean) =>
    `h-8 whitespace-nowrap rounded-full px-3 text-[11.5px] font-[600] transition-colors duration-150 ${on ? 'bg-fill-3 text-ink shadow-[inset_0_0_0_1px_var(--line-2)]' : 'text-ink-3 hover:text-ink'}`;

  return (
    <section aria-labelledby="lb-title" className="glass glass-strong w-full max-w-[760px] rounded-[24px] p-5 md:p-7">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onBack} aria-label={t.common.back} className="grid h-9 w-9 place-items-center rounded-full text-ink-3 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
          <ArrowLeftIcon size={16} />
        </button>
        <div>
          <h1 id="lb-title" className="text-[20px] font-[650] text-ink">
            {t.leaderboard.title}
          </h1>
          <p className="text-[12px] text-ink-4">{t.leaderboard.subtitle}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <div className="scroll-quiet flex gap-1 overflow-x-auto rounded-full bg-fill-1 p-1" role="group" aria-label={t.leaderboard.diffAria}>
          <button type="button" className={seg(diff === 'all')} onClick={() => setDiff('all')}>
            {t.leaderboard.all}
          </button>
          {difficulties.map((d) => (
            <button key={d.id} type="button" className={seg(diff === d.id)} onClick={() => setDiff(d.id)}>
              {t.difficulty[d.id].name}
            </button>
          ))}
        </div>
        <div className="scroll-quiet flex gap-1 overflow-x-auto rounded-full bg-fill-1 p-1" role="group" aria-label={t.leaderboard.regionAria}>
          <button type="button" className={seg(reg === 'all')} onClick={() => setReg('all')}>
            {t.leaderboard.all}
          </button>
          {regions.map((r) => (
            <button key={r.id} type="button" className={seg(reg === r.id)} onClick={() => setReg(r.id)}>
              {t.regions[r.id].name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-[12.5px]">
          <thead>
            <tr className="border-b border-line">
              {t.leaderboard.headers.map((h) => (
                <th key={h} scope="col" className="hud-label py-2 pr-3 font-[550]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((e, i) => (
              <tr key={e.id} className="border-b border-line last:border-0">
                <td className="py-2.5 pr-3 text-ink-4">{i + 1}</td>
                <td className="py-2.5 pr-3 text-[14px] font-[650] text-ink">{e.score}</td>
                <td className="py-2.5 pr-3">
                  <MedalBadge medal={e.medal} />
                </td>
                <td className={`py-2.5 pr-3 font-[600] ${e.result === 'victory' ? 'text-green' : 'text-red'}`}>{e.result === 'victory' ? t.leaderboard.certified : t.leaderboard.lost}</td>
                <td className="py-2.5 pr-3 text-ink-2">
                  {t.difficulty[e.difficulty].name}
                  {e.permadeath && <span className="ml-1 text-[10.5px] text-amber">{t.leaderboard.pd}</span>}
                </td>
                <td className="py-2.5 pr-3 text-ink-2">{t.regions[e.region].name}</td>
                <td className="py-2.5 pr-3 text-ink-3">{e.sol}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <p className="py-8 text-center text-[12.5px] text-ink-4">{t.leaderboard.empty}</p>}
      </div>
    </section>
  );
}

```
```components/title/TitleScreen.tsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PlusIcon, TrophyIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import type { SlotSummary } from '../../types/game';
import { enterTransition } from '../../utils/motion';
import { listSlots } from '../../utils/storage';
import { LanguageSwitch } from '../layout/LanguageSwitch';

interface TitleScreenProps {
  onContinue: (slot: number) => void;
  onNew: () => void;
  onLeaderboard: () => void;
}

export function TitleScreen({ onContinue, onNew, onLeaderboard }: TitleScreenProps) {
  const { t } = useI18n();
  const slots = useMemo(listSlots, []);
  const resumable = slots.filter((s): s is SlotSummary => !!s && !s.ended).sort((a, b) => b.savedAt - a.savedAt);
  const latest = resumable[0];

  return (
    <motion.section aria-labelledby="title-heading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={enterTransition} className="w-full max-w-[1120px]">
      <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="stage-text">
          <p className="text-[12px] uppercase tracking-[0.3em] text-amber-ink">{t.titleScreen.program}</p>
          <h1 id="title-heading" className="mt-3 text-[clamp(3rem,7vw,5.5rem)] font-[300] leading-[0.95] tracking-[0.18em] text-ink">
            ARES
          </h1>
          <p className="mt-2 text-[clamp(0.95rem,1.4vw,1.15rem)] uppercase tracking-[0.42em] text-ink-2">{t.topBar.opsCommand}</p>
          <p className="mt-6 max-w-[520px] text-[14.5px] leading-relaxed text-ink-2">{t.titleScreen.intro}</p>
        </div>

        <div className="glass glass-strong rounded-[24px] p-5 md:p-6">
          <div className="flex flex-col gap-2.5">
            {latest && (
              <button
                type="button"
                onClick={() => onContinue(latest.slot)}
                className="flex h-14 items-center gap-3 rounded-[16px] bg-amber px-5 text-left text-obsidian transition-[filter] duration-150 hover:brightness-110"
              >
                <PlayIcon size={18} strokeWidth={2} />
                <span className="min-w-0 leading-tight">
                  <span className="block text-[14px] font-[700]">{t.titleScreen.continue}</span>
                  <span className="block truncate text-[11.5px] opacity-80">
                    {t.titleScreen.slotSol(latest.slot + 1, latest.sol)} · {t.difficulty[latest.difficulty].name} · {t.regions[latest.region].name}
                  </span>
                </span>
              </button>
            )}
            <button
              type="button"
              onClick={onNew}
              className={`flex h-12 items-center gap-3 rounded-[16px] px-5 text-[14px] font-[650] transition-[filter,background-color] duration-150 ${
                latest ? 'bg-fill-2 text-ink hover:bg-fill-3' : 'h-14 bg-amber text-obsidian hover:brightness-110'
              }`}
            >
              <PlusIcon size={17} strokeWidth={2} />
              {t.titleScreen.newMission}
            </button>
            <button
              type="button"
              onClick={onLeaderboard}
              className="flex h-12 items-center gap-3 rounded-[16px] px-5 text-[14px] font-[600] text-ink-2 transition-colors duration-150 hover:bg-fill-2 hover:text-ink"
            >
              <TrophyIcon size={16} strokeWidth={1.7} />
              {t.titleScreen.leaderboard}
            </button>
          </div>

          {resumable.length > 1 && (
            <div className="mt-4 border-t border-line pt-3">
              <h2 className="hud-label">{t.titleScreen.others}</h2>
              <ul className="mt-2 space-y-1">
                {resumable.slice(1).map((s) => (
                  <li key={s.slot}>
                    <button
                      type="button"
                      onClick={() => onContinue(s.slot)}
                      className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-[12.5px] text-ink-2 transition-colors duration-150 hover:bg-fill-2 hover:text-ink"
                    >
                      <span>{t.titleScreen.slotSol(s.slot + 1, s.sol)}</span>
                      <span className="text-ink-4">
                        {t.difficulty[s.difficulty].name} · {s.pillarsDone}/4
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
            <p className="text-[11px] text-ink-4">{t.titleScreen.footer}</p>
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

```
```components/title/NewMissionSetup.tsx
import React, { useMemo, useState } from 'react';
import { ArrowLeftIcon, RocketIcon, SkullIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { difficulties } from '../../data/difficulty';
import { regions } from '../../data/regions';
import type { DifficultyId, NewGameOptions, RegionId } from '../../types/game';
import { listSlots } from '../../utils/storage';

interface NewMissionSetupProps {
  onBack: () => void;
  onStart: (opts: NewGameOptions) => void;
}

export function NewMissionSetup({ onBack, onStart }: NewMissionSetupProps) {
  const { t } = useI18n();
  const slots = useMemo(listSlots, []);
  const firstEmpty = slots.findIndex((s) => !s);
  const [difficulty, setDifficulty] = useState<DifficultyId>('engineer');
  const [region, setRegion] = useState<RegionId>('jezero');
  const [slot, setSlot] = useState(firstEmpty >= 0 ? firstEmpty : 0);
  const [permadeath, setPermadeath] = useState(false);
  const overwrite = !!slots[slot];

  const card = (on: boolean) =>
    `flex h-full flex-col rounded-[16px] p-4 text-left transition-[background-color,box-shadow] duration-150 ${
      on ? 'bg-fill-2 shadow-[inset_0_0_0_1.5px_var(--amber)]' : 'bg-fill-1 shadow-[inset_0_0_0_1px_var(--line)] hover:bg-fill-2'
    }`;

  return (
    <section aria-labelledby="setup-title" className="glass glass-strong w-full max-w-[920px] rounded-[24px] p-5 md:p-7">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onBack} aria-label={t.common.back} className="grid h-9 w-9 place-items-center rounded-full text-ink-3 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
          <ArrowLeftIcon size={16} />
        </button>
        <div>
          <h1 id="setup-title" className="text-[20px] font-[650] text-ink">
            {t.setup.title}
          </h1>
          <p className="text-[12px] text-ink-4">{t.setup.subtitle}</p>
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="hud-label mb-2.5">{t.setup.difficulty}</legend>
        <div className="grid gap-2.5 sm:grid-cols-3" role="radiogroup">
          {difficulties.map((d) => (
            <button key={d.id} type="button" role="radio" aria-checked={difficulty === d.id} onClick={() => setDifficulty(d.id)} className={card(difficulty === d.id)}>
              <span className="text-[14px] font-[650] text-ink">{t.difficulty[d.id].name}</span>
              <span className="mt-1 text-[12px] leading-snug text-ink-3">{t.difficulty[d.id].blurb}</span>
              <span className="mt-auto pt-3 text-[11px] text-ink-4">{t.setup.apDelay(d.ap, d.delay[0], d.delay[1])}</span>
            </button>
          ))}
        </div>
        {difficulty === 'director' && (
          <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-[14px] bg-fill-1 px-4 py-3">
            <input type="checkbox" checked={permadeath} onChange={(e) => setPermadeath(e.target.checked)} className="h-4 w-4 accent-[var(--amber)]" />
            <SkullIcon size={15} className="text-red" />
            <span className="text-[12.5px] text-ink">
              {t.setup.permadeath}
              <span className="text-ink-4">{t.setup.permadeathHint}</span>
            </span>
          </label>
        )}
      </fieldset>

      <fieldset className="mt-6">
        <legend className="hud-label mb-2.5">{t.setup.region}</legend>
        <div className="grid gap-2.5 sm:grid-cols-3" role="radiogroup">
          {regions.map((r) => (
            <button key={r.id} type="button" role="radio" aria-checked={region === r.id} onClick={() => setRegion(r.id)} className={card(region === r.id)}>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ background: r.scene.ground }} aria-hidden="true" />
                <span className="text-[14px] font-[650] text-ink">{t.regions[r.id].name}</span>
              </span>
              <span className="mt-1 text-[12px] leading-snug text-ink-3">{t.regions[r.id].blurb}</span>
              <span className="mt-auto pt-3 text-[11px] text-ink-4">{t.setup.nights(r.nightTemp, r.coords)}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="hud-label mb-2.5">{t.setup.slot}</legend>
        <div className="grid gap-2 sm:grid-cols-3" role="radiogroup">
          {slots.map((s, i) => (
            <button key={i} type="button" role="radio" aria-checked={slot === i} onClick={() => setSlot(i)} className={`${card(slot === i)} !p-3`}>
              <span className="text-[13px] font-[600] text-ink">{t.settings.slot(i + 1)}</span>
              <span className="text-[11.5px] text-ink-4">{s ? t.setup.slotUsed(s.sol) : t.common.empty}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-7 flex flex-wrap items-center justify-end gap-3">
        {overwrite && <span className="text-[12px] text-amber">{t.setup.overwrite(slot + 1)}</span>}
        <button
          type="button"
          onClick={() => onStart({ difficulty, region, slot, permadeath: difficulty === 'director' && permadeath })}
          className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full bg-amber px-6 text-[13.5px] font-[700] text-obsidian transition-[filter] duration-150 hover:brightness-110"
        >
          <RocketIcon size={15} strokeWidth={2} />
          {t.setup.begin}
        </button>
      </div>
    </section>
  );
}

```
```components/report/SolReport.tsx
import React from 'react';
import { ArrowRightIcon, CheckIcon, MinusIcon, RotateCcwIcon, XIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { advisorOrder, advisors } from '../../data/advisors';
import { pillarOrder } from '../../data/pillars';
import type { SolReport as SolReportData } from '../../types/game';
import { medalFor } from '../../utils/game/scoring';
import { MedalBadge } from '../endgame/MedalBadge';
import { Modal } from '../shared/Modal';
import { EventsLog } from '../views/EventsLog';

interface SolReportProps {
  report: SolReportData | null;
  ended: boolean;
  canUndo: boolean;
  onContinue: () => void;
  onUndo: () => void;
}

export function SolReport({ report, ended, canUndo, onContinue, onUndo }: SolReportProps) {
  const { t, f } = useI18n();
  return (
    <Modal open={!!report} labelledBy="sol-report-title" onClose={onContinue} closeOnBackdrop={false} className="max-w-[760px]">
      {report && (
        <div className="p-5 md:p-7">
          <header className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="hud-label">{t.report.received} · {t.acts[report.act].name}</p>
              <h2 id="sol-report-title" className="mt-1 text-[22px] font-[650] text-ink">
                {t.report.title(report.sol)}
                {report.restSkip ? <span className="ml-2 text-[14px] font-normal text-ink-3">{t.report.rested(report.restSkip)}</span> : null}
              </h2>
            </div>
            <div className="text-right">
              <div className="text-[22px] font-[650] text-ink">{report.score.total}</div>
              <div className="mt-0.5 flex items-center justify-end gap-1.5 text-[11.5px] text-ink-4">
                {t.report.score} <MedalBadge medal={medalFor(report.score.total)} />
              </div>
            </div>
          </header>

          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <section aria-label={t.report.cmdsAria}>
              <h3 className="hud-label mb-2">{t.report.sequence(report.apUsed, report.apBudget)}</h3>
              {report.steps.length ? (
                <ol className="space-y-2">
                  {report.steps.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[12.5px]">
                      <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${s.skipped ? 'bg-fill-3 text-ink-3' : s.ok ? 'bg-green-soft text-green' : 'bg-fill-3 text-red'}`}>
                        {s.skipped ? <MinusIcon size={10} /> : s.ok ? <CheckIcon size={10} strokeWidth={3} /> : <XIcon size={10} strokeWidth={3} />}
                      </span>
                      <div className="min-w-0">
                        <span className="font-[600] text-ink">{f(s.title)}</span>
                        <span className="ml-1.5 text-[10.5px] text-ink-4">{s.source === 'manual' ? t.common.you : advisors[s.source].code}</span>
                        <div className="text-ink-3">{f(s.detail)}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-[12.5px] text-ink-4">{t.report.idle}</p>
              )}
              <p className="mt-3 text-[12px] text-ink-3">
                {t.report.night(report.nightTemp)}
                {report.heated ? t.report.heated : <span className="text-amber">{t.report.unheated}</span>}
                {t.report.battery(Math.round(report.batteryBefore), Math.round(report.batteryAfter))}
              </p>
            </section>

            <section aria-label={t.report.events}>
              <h3 className="hud-label mb-2">{t.report.events}</h3>
              {report.events.length ? <EventsLog events={report.events} /> : <p className="text-[12.5px] text-ink-4">{t.report.quiet}</p>}
            </section>
          </div>

          <dl className="mt-5 grid grid-cols-3 gap-2 rounded-[14px] bg-fill-1 p-3 text-[11.5px] sm:grid-cols-6">
            <ReportReading label={t.environment.temperature} value={`${report.environment.dayTempC} °C`} />
            <ReportReading label={t.environment.pressure} value={`${report.environment.pressurePa} Pa`} />
            <ReportReading label={t.environment.wind} value={`${report.environment.windMs} m/s`} />
            <ReportReading label={t.environment.dust} value={`${Math.round(report.environment.dustIndex * 100)}%`} />
            <ReportReading label={t.environment.solar} value={`${report.environment.solarIrradiance} W/m²`} />
            <ReportReading label={t.environment.visibility} value={`${report.environment.visibilityKm} km`} />
          </dl>

          <div className="mt-6 grid gap-6 border-t border-line pt-5 md:grid-cols-2">
            <section aria-label={t.report.pillars}>
              <h3 className="hud-label mb-2.5">{t.report.pillars}</h3>
              <ul className="space-y-2">
                {pillarOrder.map((id) => {
                  const a = Math.round(report.pillarsBefore[id] * 100);
                  const b = Math.round(report.pillarsAfter[id] * 100);
                  return (
                    <li key={id} className="grid grid-cols-[96px_1fr_70px] items-center gap-2 text-[12px]">
                      <span className="truncate text-ink-2">{t.pillars[id].name}</span>
                      <span className="relative h-1 rounded-full bg-track">
                        <span className="absolute inset-y-0 left-0 rounded-full bg-ink-4" style={{ width: `${a}%` }} />
                        <span className={`absolute inset-y-0 rounded-full ${b >= 100 ? 'bg-green' : 'bg-amber'}`} style={{ left: `${Math.min(a, b)}%`, width: `${Math.abs(b - a)}%` }} />
                      </span>
                      <span className={`text-right font-[600] ${b > a ? 'text-amber' : b < a ? 'text-red' : 'text-ink-3'}`}>
                        {b}%
                        {b !== a && (
                          <span className="font-normal">
                            {' '}
                            ({b > a ? '+' : ''}
                            {b - a})
                          </span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
            <section aria-label={t.report.trust}>
              <h3 className="hud-label mb-2.5">{t.report.trust}</h3>
              <ul className="grid grid-cols-2 gap-2">
                {advisorOrder.map((id) => {
                  const d = report.trustDelta[id];
                  return (
                    <li key={id} className="flex items-center justify-between rounded-lg bg-fill-1 px-3 py-2 text-[12.5px]">
                      <span className="font-[600] text-ink">{advisors[id].code}</span>
                      <span className={`font-[650] ${d > 0 ? 'text-green' : d < 0 ? 'text-red' : 'text-ink-3'}`}>
                        {d > 0 ? '+' : ''}
                        {d}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>

          <footer className="mt-6 flex flex-wrap items-center justify-end gap-2">
            {canUndo && (
              <button type="button" onClick={onUndo} className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[12.5px] font-[600] text-ink-2 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
                <RotateCcwIcon size={14} />
                {t.report.undo}
              </button>
            )}
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-amber px-5 text-[13px] font-[700] text-obsidian transition-[filter] duration-150 hover:brightness-110"
            >
              {ended ? t.report.debrief : t.report.next(report.sol + 1)}
              <ArrowRightIcon size={14} strokeWidth={2} />
            </button>
          </footer>
        </div>
      )}
    </Modal>
  );
}

function ReportReading({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="truncate text-[9.5px] uppercase tracking-[0.07em] text-ink-4">{label}</dt>
      <dd className="mt-0.5 truncate font-[600] text-ink">{value}</dd>
    </div>
  );
}

```
```components/endgame/Debrief.tsx
import React from 'react';
import { HomeIcon, RotateCcwIcon, TrophyIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { scoreAxes } from '../../data/scoring';
import type { GameState } from '../../types/game';
import { pillarsDone } from '../../utils/game/pillars';
import { Meter } from '../shared/Meter';
import { Modal } from '../shared/Modal';
import { MedalBadge } from './MedalBadge';

interface DebriefProps {
  open: boolean;
  game: GameState | null;
  onNew: () => void;
  onLeaderboard: () => void;
  onTitle: () => void;
  onClose: () => void;
}

export function Debrief({ open, game, onNew, onLeaderboard, onTitle, onClose }: DebriefProps) {
  const { t, f } = useI18n();
  const outcome = game?.outcome;
  return (
    <Modal open={open && !!outcome} labelledBy="debrief-title" onClose={onClose} className="max-w-[620px]">
      {game && outcome && (
        <div className="p-6 md:p-8">
          <p className={`hud-label ${outcome.result === 'victory' ? '!text-green' : '!text-red'}`}>{outcome.result === 'victory' ? t.debrief.certified : t.debrief.lost}</p>
          <h2 id="debrief-title" className="mt-2 text-[26px] font-[650] leading-tight text-ink">
            {outcome.result === 'victory' ? t.debrief.winHead : t.debrief.lossHead}
          </h2>
          <p className="mt-2 text-[13.5px] text-ink-3">{f(outcome.reason)}</p>

          <div className="mt-6 flex flex-wrap items-center gap-6 border-y border-line py-5">
            <div>
              <div className="hud-label">{t.debrief.final}</div>
              <div className="mt-1 text-[34px] font-[650] leading-none text-ink">{game.score.total}</div>
            </div>
            <div>
              <div className="hud-label mb-1.5">{t.debrief.rating}</div>
              {outcome.medal ? <MedalBadge medal={outcome.medal} size="lg" /> : <span className="text-[13px] text-ink-4">{t.debrief.noRating}</span>}
            </div>
            <dl className="ml-auto grid grid-cols-3 gap-5 text-[12px]">
              <div>
                <dt className="hud-label">{t.common.sol}</dt>
                <dd className="mt-1 text-[15px] font-[650] text-ink">{game.sol}</dd>
              </div>
              <div>
                <dt className="hud-label">{t.debrief.pillars}</dt>
                <dd className="mt-1 text-[15px] font-[650] text-ink">{pillarsDone(game)}/4</dd>
              </div>
              <div>
                <dt className="hud-label">{t.debrief.faults}</dt>
                <dd className="mt-1 text-[15px] font-[650] text-ink">{game.stats.faults}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-5 space-y-3">
            {scoreAxes.map((a) => (
              <Meter key={a.id} label={t.scoreAxes[a.id].label} value={String(game.score[a.id])} fraction={game.score[a.id] / 1000} tone="amber" />
            ))}
          </div>
          <p className="mt-4 text-[11.5px] text-ink-4">
            {t.difficulty[game.difficulty].name} · {t.regions[game.region].name}
            {game.permadeath && t.debrief.permadeath}
            {t.debrief.saved}
          </p>

          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <button type="button" onClick={onTitle} className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[12.5px] font-[600] text-ink-2 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
              <HomeIcon size={14} />
              {t.debrief.toTitle}
            </button>
            <button type="button" onClick={onLeaderboard} className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[12.5px] font-[600] text-ink-2 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
              <TrophyIcon size={14} />
              {t.debrief.records}
            </button>
            <button type="button" onClick={onNew} className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-amber px-5 text-[13px] font-[700] text-obsidian transition-[filter] duration-150 hover:brightness-110">
              <RotateCcwIcon size={14} strokeWidth={2} />
              {t.debrief.newMission}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

```
```components/drawer/MissionTimeline.tsx
import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import { acts } from '../../data/acts';
import { DEADLINE_SOL } from '../../data/pillars';
import type { GameState } from '../../types/game';

/** Sol 1 → 500 with milestones and storms marked. */
export function MissionTimeline({ game }: { game: GameState }) {
  const { t, f } = useI18n();
  const milestones = game.events.filter((e) => e.kind === 'milestone' && e.sol > 1);
  const storms = game.events.filter((e) => e.kind === 'storm');
  const pct = (sol: number) => `${Math.min(100, (sol / DEADLINE_SOL) * 100)}%`;
  return (
    <div>
      <div className="relative h-8">
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line-2" />
        {acts.slice(1).map((act) => (
          <span key={act.id} className="absolute top-1/2 h-5 w-px -translate-y-1/2 bg-line-2" style={{ left: pct(act.start) }} title={`${t.acts[act.id].name} · ${t.common.sol} ${act.start}`} />
        ))}
        <span className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-amber" style={{ width: pct(game.sol) }} />
        {storms.map((s) => (
          <span key={s.id} className="absolute top-1/2 h-3 w-1 -translate-y-1/2 rounded-sm bg-red" style={{ left: pct(s.sol) }} title={`${t.common.sol} ${s.sol} · ${f(s.title)}`} />
        ))}
        {milestones.map((m) => (
          <span
            key={m.id}
            className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-obsidian bg-green"
            style={{ left: pct(m.sol) }}
            title={`${t.common.sol} ${m.sol} · ${f(m.title)}`}
          />
        ))}
        <span className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber bg-obsidian" style={{ left: pct(game.sol) }} aria-hidden="true" />
      </div>
      <div className="mt-1 flex justify-between text-[10.5px] text-ink-4">
        <span>{t.timeline.landing}</span>
        <span className="text-ink-2">{t.acts[game.act].name} · {t.common.sol} {game.sol}</span>
        <span>{t.timeline.perihelion(DEADLINE_SOL)}</span>
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-ink-3">
        {milestones.slice(0, 5).map((m) => (
          <li key={m.id}>
            <span className="text-ink-4">
              {t.common.sol} {m.sol}
            </span>{' '}
            {f(m.title)}
          </li>
        ))}
        {!milestones.length && <li className="text-ink-4">{t.timeline.empty}</li>}
      </ul>
    </div>
  );
}

```
```components/drawer/MissionData.tsx
import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import type { GameState } from '../../types/game';
import { healthTone } from '../../utils/tone';
import { Meter } from '../shared/Meter';
import { EventsLog } from '../views/EventsLog';
import { InventoryList } from '../views/InventoryList';
import { MissionTimeline } from './MissionTimeline';

/** Drawer body: the long view of the mission, grouped by how often it is consulted. */
export function MissionData({ game }: { game: GameState }) {
  const { t } = useI18n();
  const r = game.rover;
  return (
    <div className="grid gap-x-8 gap-y-6 lg:grid-cols-[1.4fr_1fr_1fr]">
      <section aria-label={t.missionData.timeline} className="lg:col-span-3">
        <h3 className="hud-label mb-2">{t.missionData.timeline}</h3>
        <MissionTimeline game={game} />
      </section>
      <section aria-label={t.missionData.recent}>
        <h3 className="hud-label mb-2.5">{t.missionData.recent}</h3>
        <EventsLog events={game.events} limit={6} />
      </section>
      <section aria-label={t.missionData.health}>
        <h3 className="hud-label mb-2.5">{t.missionData.health}</h3>
        <div className="space-y-3">
          <Meter label={t.systems.battery} value={`${Math.round(r.battery)}%`} fraction={r.battery / 100} tone={healthTone(r.battery)} />
          <Meter label={t.systems.wheels} value={`${Math.round(r.wheels)}%`} fraction={r.wheels / 100} tone={healthTone(r.wheels)} />
          <Meter label={t.systems.drill} value={`${Math.round(r.drill)}%`} fraction={r.drill / 100} tone={healthTone(r.drill)} />
          <Meter label={t.systems.dust} value={`${Math.round(r.dust * 100)}%`} fraction={r.dust} tone={r.dust > 0.5 ? 'amber' : 'neutral'} />
        </div>
      </section>
      <section aria-label={t.missionData.inventory}>
        <h3 className="hud-label mb-1">{t.missionData.inventory}</h3>
        <InventoryList game={game} />
      </section>
    </div>
  );
}

```
```hooks/useCamera.ts
import { useCallback, useRef, useState } from 'react';
import type { CameraMode, CameraState } from '../types/mission';
import type { MapPoint } from '../types/rover';

export function useCamera() {
  const cameraRef = useRef<CameraState>({ mode: 'site', zoom: 1, focus: null, frame: 'base' });
  const [mode, setModeState] = useState<CameraMode>('site');

  const setMode = useCallback((m: CameraMode) => {
    cameraRef.current.mode = m;
    cameraRef.current.focus = null;
    setModeState(m);
  }, []);

  const fly = useCallback((p: MapPoint) => {
    cameraRef.current.focus = p;
  }, []);

  const zoom = useCallback((dir: 1 | -1) => {
    const z = cameraRef.current.zoom * (dir > 0 ? 0.8 : 1.25);
    cameraRef.current.zoom = Math.min(2.2, Math.max(0.45, z));
  }, []);

  return { cameraRef, mode, setMode, fly, zoom };
}

```
```components/game/AdvisorList.tsx
import React from 'react';
import type { AdvisorId, GameState, Proposal } from '../../types/game';
import type { Conflict } from '../../utils/game/proposals';
import { AdvisorCard } from '../advisors/AdvisorCard';

interface AdvisorListProps {
  ids: AdvisorId[];
  game: GameState;
  accepted: string[];
  onAccept: (p: Proposal) => void;
  locked: boolean;
  conflicts: Conflict[];
  compact?: boolean;
  className?: string;
  itemClassName?: string;
}

/** A stack (or swipe row) of advisor cards for the given advisors. */
export function AdvisorList({ ids, game, accepted, onAccept, locked, conflicts, compact = false, className = '', itemClassName = '' }: AdvisorListProps) {
  return (
    <div className={className}>
      {ids.map((id, i) => {
        const conflict = conflicts.find((c) => c.a === id);
        return (
          <div key={`${game.sol}-${id}`} className={itemClassName}>
            <AdvisorCard
              id={id}
              index={i}
              state={game.advisors[id]}
              proposals={game.proposals.filter((p) => p.advisor === id)}
              accepted={accepted}
              onAccept={onAccept}
              locked={locked}
              conflict={conflict?.text}
              compact={compact}
            />
          </div>
        );
      })}
    </div>
  );
}

```
```components/game/ViewPanel.tsx
import React from 'react';
import type { GameState, GameView } from '../../types/game';
import { CommsPanel } from '../views/CommsPanel';
import { EnvironmentPanel } from '../views/EnvironmentPanel';
import { NavigationPanel } from '../views/NavigationPanel';
import { ReportsPanel } from '../views/ReportsPanel';
import { SciencePanel } from '../views/SciencePanel';
import { SettingsPanel } from '../views/SettingsPanel';
import { SystemsPanel } from '../views/SystemsPanel';

export interface SettingsBindings {
  canLoad: boolean;
  onSave: (slot: number) => void;
  onLoad: (slot: number) => void;
  onQuit: () => void;
  soundOn: boolean;
  onToggleSound: () => void;
  lightGlass: boolean;
  onToggleGlass: () => void;
  hapticsOn: boolean;
  onToggleHaptics: () => void;
}

interface ViewPanelProps {
  view: Exclude<GameView, 'command'>;
  game: GameState;
  settings: SettingsBindings;
  onLeaderboard: () => void;
}

export function ViewPanel({ view, game, settings, onLeaderboard }: ViewPanelProps) {
  switch (view) {
    case 'navigation':
      return <NavigationPanel game={game} />;
    case 'science':
      return <SciencePanel game={game} />;
    case 'systems':
      return <SystemsPanel game={game} />;
    case 'environment':
      return <EnvironmentPanel game={game} />;
    case 'comms':
      return <CommsPanel game={game} />;
    case 'reports':
      return <ReportsPanel game={game} onLeaderboard={onLeaderboard} />;
    case 'settings':
      return <SettingsPanel game={game} {...settings} />;
  }
}

```
```components/game/GameScreen.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { advisorOrder } from '../../data/advisors';
import { regionDef } from '../../data/regions';
import { useCamera } from '../../hooks/useCamera';
import { useGame } from '../../hooks/useGame';
import { type StageTarget, useStageDriver } from '../../hooks/useStageDriver';
import type { GameView } from '../../types/game';
import { navItems } from '../../data/navigation';
import { useI18n } from '../../contexts/LanguageContext';
import { findConflicts } from '../../utils/game/proposals';
import { setHapticsEnabled } from '../../utils/haptics';
import { setSoundEnabled } from '../../utils/sound';
import { Debrief } from '../endgame/Debrief';
import { BentoDrawer } from '../drawer/BentoDrawer';
import { MissionData } from '../drawer/MissionData';
import { CameraControls } from '../layout/CameraControls';
import { NavRail } from '../layout/NavRail';
import { TopBar } from '../layout/TopBar';
import { PillarsHud } from '../pillars/PillarsHud';
import { SolReport } from '../report/SolReport';
import { ExecutionFeed } from '../sequence/ExecutionFeed';
import { SequenceDock } from '../sequence/SequenceDock';
import { Toast } from '../shared/Toast';
import { MarsStage } from '../stage/MarsStage';
import { RoverTag, SectorLabel } from '../stage/StageLabels';
import { Leaderboard } from '../title/Leaderboard';
import { NewMissionSetup } from '../title/NewMissionSetup';
import { TitleScreen } from '../title/TitleScreen';
import { AdvisorList } from './AdvisorList';
import { type SettingsBindings, ViewPanel } from './ViewPanel';

interface GameScreenProps {
  startScreen: 'title' | 'game';
  drawerDefaultOpen: boolean;
  hapticsEnabled: boolean;
}

export function GameScreen({ startScreen, drawerDefaultOpen, hapticsEnabled }: GameScreenProps) {
  const { t } = useI18n();
  const g = useGame(startScreen);
  const { game, phase, progress } = g;
  const [view, setView] = useState<GameView>('command');
  const [drawerOpen, setDrawerOpen] = useState(drawerDefaultOpen);
  const [lightGlass, setLightGlass] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [hapticsOn, setHapticsOn] = useState(hapticsEnabled);
  const cam = useCamera();

  useEffect(() => setHapticsOn(hapticsEnabled), [hapticsEnabled]);
  useEffect(() => setHapticsEnabled(hapticsOn), [hapticsOn]);
  useEffect(() => setSoundEnabled(soundOn), [soundOn]);
  useEffect(() => setDrawerOpen(drawerDefaultOpen), [drawerDefaultOpen]);

  const region = useMemo(() => regionDef(game?.region ?? 'jezero'), [game?.region]);
  const inGame = g.screen === 'game' && !!game;
  const planning = phase === 'planning';
  const playing = phase === 'uplink' || phase === 'executing' || phase === 'night';

  // Chase cam while the sequence plays out; back to the site view for planning.
  useEffect(() => {
    if (phase === 'executing') cam.setMode('atlas');
    if (phase === 'planning') cam.setMode('site');
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const step = progress && progress.stepIndex >= 0 ? progress.steps[progress.stepIndex] : null;
  const target: StageTarget = {
    route: phase === 'night' && progress?.steps.length ? progress.steps[progress.steps.length - 1].routeAfter : step ? step.routeAfter : game?.route ?? 0.08,
    action: phase === 'executing' && step ? step.command : null,
    storm: phase === 'night' && g.playbackNext ? g.playbackNext.storm.intensity : game?.storm.intensity ?? 0,
    linkOpen: !(step && step.command === 'uplink' && !step.ok),
    speed: 2,
  };
  const simRef = useStageDriver(target);

  const lmst = progress ? 7.5 + progress.fraction * 20.5 : 7.5;
  const roverStatus = !game
    ? { text: t.stage.standby, tone: 'neutral' as const }
    : phase === 'executing' && step
      ? { text: t.commands[step.command].label, tone: 'amber' as const }
      : phase === 'uplink'
        ? { text: t.stage.awaiting, tone: 'neutral' as const }
        : phase === 'night'
          ? { text: t.stage.sleep, tone: 'neutral' as const }
          : game.rover.safeModeSols > 0
            ? { text: t.stage.safeMode, tone: 'red' as const }
            : { text: t.stage.battery(Math.round(game.rover.battery)), tone: game.rover.battery < 30 ? ('red' as const) : ('green' as const) };

  const conflicts = useMemo(() => (game ? findConflicts(game.proposals) : []), [game]);

  const selectView = useCallback((v: GameView) => setView(v), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('[role="listbox"]') || e.metaKey || e.ctrlKey || e.altKey) return;
      if (!inGame || g.report || g.debriefOpen) return;
      if (e.key === ' ' && playing) {
        e.preventDefault();
        g.togglePause();
        return;
      }
      if (e.key === 'b' || e.key === 'B') {
        setDrawerOpen((v) => !v);
        return;
      }
      if (e.key === 'Escape' && drawerOpen) {
        setDrawerOpen(false);
        return;
      }
      const item = navItems.find((n) => n.key === e.key);
      if (item) setView(item.id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inGame, g, playing, drawerOpen]);

  const settings: SettingsBindings = {
    canLoad: !!game && !game.permadeath && planning,
    onSave: g.saveNow,
    onLoad: (slot) => {
      g.loadSlot(slot);
      setView('command');
    },
    onQuit: g.quitToTitle,
    soundOn,
    onToggleSound: () => setSoundOn((v) => !v),
    lightGlass,
    onToggleGlass: () => setLightGlass((v) => !v),
    hapticsOn,
    onToggleHaptics: () => setHapticsOn((v) => !v),
  };
  const openLeaderboard = () => g.setScreen('leaderboard');
  const reportsAlert = !!game && game.events[0]?.tone === 'red' && view !== 'reports';

  const dock =
    game && inGame ? (
      planning ? (
        <SequenceDock
          game={game}
          queue={g.queue}
          safe={g.safe}
          capacity={g.capacity}
          onAdd={g.addCommand}
          onRemove={g.removeItem}
          onMove={g.moveItem}
          onToggleSafe={g.toggleSafe}
          onSend={g.send}
          onRest={g.restSols}
        />
      ) : progress ? (
        <ExecutionFeed
          phase={phase}
          delayMin={game.delayMin}
          uplinkLeft={progress.uplinkLeft}
          uplinkDur={progress.uplinkDur}
          stepIndex={progress.stepIndex}
          steps={progress.steps}
          paused={g.paused}
        />
      ) : null
    ) : null;

  const advisorProps = game ? { game, accepted: g.accepted, onAccept: g.acceptProposal, locked: !planning, conflicts } : null;

  return (
    <div data-glass={lightGlass ? 'light' : 'dark'} className="min-h-[100dvh] w-full max-w-full overflow-x-clip bg-obsidian font-sans text-ink">
      <main className={`relative w-full overflow-hidden ${inGame ? 'h-[clamp(380px,60dvh,560px)] lg:h-[100dvh] lg:min-h-[760px]' : 'h-[100dvh] min-h-[640px]'}`}>
        <MarsStage
          simRef={simRef}
          cameraRef={cam.cameraRef}
          region={region}
          onPick={() => undefined}
          onFlyTo={cam.fly}
          callouts={inGame ? { rover: <RoverTag status={roverStatus.text} tone={roverStatus.tone} />, sector: <SectorLabel /> } : {}}
        />
        <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: inGame
              ? 'linear-gradient(180deg, rgba(12,11,10,0.5) 0%, rgba(12,11,10,0) 16%, rgba(12,11,10,0) 62%, rgba(12,11,10,0.55) 100%)'
              : 'linear-gradient(180deg, rgba(12,11,10,0.35) 0%, rgba(12,11,10,0.15) 40%, rgba(12,11,10,0.75) 100%)',
          }}
        />

        {!inGame && (
          <div className="absolute inset-0 z-20 grid place-items-center overflow-y-auto p-4 md:p-8">
            {g.screen === 'setup' ? (
              <NewMissionSetup onBack={() => g.setScreen('title')} onStart={(o) => { g.startNew(o); setView('command'); }} />
            ) : g.screen === 'leaderboard' ? (
              <Leaderboard onBack={() => g.setScreen(game && !game.outcome ? 'game' : 'title')} />
            ) : (
              <TitleScreen onContinue={(s) => { g.loadSlot(s); setView('command'); }} onNew={() => g.setScreen('setup')} onLeaderboard={openLeaderboard} />
            )}
          </div>
        )}

        {inGame && game && advisorProps && (
          <>
            <TopBar game={game} region={region} phase={phase} lmst={lmst} paused={g.paused} onTogglePause={g.togglePause} speed={g.speed} onSpeed={g.setSpeed} />

            <NavRail active={view} onSelect={selectView} alert={reportsAlert} className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 lg:flex" />

            <div className="absolute left-1/2 top-[68px] z-10 hidden w-[min(680px,calc(100%-800px))] -translate-x-1/2 xl:block">
              <PillarsHud game={game} />
            </div>

            <aside
              aria-label={view === 'command' ? t.layout.leftCommand : t.layout.leftView}
              className="scroll-quiet absolute bottom-[252px] left-[88px] top-[68px] z-10 hidden w-[320px] flex-col gap-3 overflow-y-auto pb-2 lg:flex xl:w-[350px]"
            >
              <div className="xl:hidden">
                <PillarsHud game={game} layout="grid" />
              </div>
              {view === 'command' ? (
                <AdvisorList ids={['nav', 'sci']} {...advisorProps} className="flex flex-col gap-3" />
              ) : (
                <ViewPanel view={view} game={game} settings={settings} onLeaderboard={openLeaderboard} />
              )}
            </aside>

            <aside
              aria-label={view === 'command' ? t.layout.rightCommand : t.layout.rightView}
              className="scroll-quiet absolute bottom-[252px] right-5 top-[68px] z-10 hidden w-[300px] flex-col gap-3 overflow-y-auto pb-2 lg:flex xl:w-[330px]"
            >
              {view === 'command' ? (
                <AdvisorList ids={['sys', 'comm']} {...advisorProps} className="flex flex-col gap-3" />
              ) : (
                <AdvisorList ids={advisorOrder} {...advisorProps} compact className="flex flex-col gap-2.5" />
              )}
            </aside>

            <div className="absolute left-1/2 top-[148px] z-40 w-full max-w-[520px] -translate-x-1/2 px-4 lg:top-[140px]">
              <Toast toast={g.toast} />
            </div>

            <div className="absolute bottom-[252px] left-1/2 z-10 hidden -translate-x-1/2 2xl:block">
              <CameraControls mode={cam.mode} onMode={cam.setMode} onZoom={cam.zoom} showHints={false} />
            </div>

            <div className="absolute bottom-[56px] left-[88px] right-5 z-20 hidden lg:block">{dock}</div>

            <BentoDrawer open={drawerOpen} onToggle={() => setDrawerOpen((v) => !v)} game={game} />
          </>
        )}
      </main>

      {inGame && game && advisorProps && (
        <div className="space-y-3 px-4 py-4 lg:hidden">
          <NavRail active={view} onSelect={selectView} alert={reportsAlert} orientation="horizontal" />
          <PillarsHud game={game} layout="grid" />
          {dock}
          <section aria-label={t.layout.advisors}>
            <h2 className="hud-label mb-2 px-1">{t.advisor.proposals(game.sol)}</h2>
            <AdvisorList
              ids={advisorOrder}
              {...advisorProps}
              compact={view !== 'command'}
              className="scroll-quiet -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1"
              itemClassName="w-[min(86vw,340px)] shrink-0 snap-start"
            />
          </section>
          {view !== 'command' && <ViewPanel view={view} game={game} settings={settings} onLeaderboard={openLeaderboard} />}
          <div className="flex justify-center">
            <CameraControls mode={cam.mode} onMode={cam.setMode} onZoom={cam.zoom} showHints={false} />
          </div>
          <section aria-label={t.drawer.title} className="glass rounded-[18px] p-4">
            <h2 className="hud-label mb-3">{t.drawer.title}</h2>
            <MissionData game={game} />
          </section>
        </div>
      )}

      <SolReport report={g.report} ended={!!game?.outcome} canUndo={g.canUndo} onContinue={g.continueAfterReport} onUndo={g.undo} />
      <Debrief
        open={g.debriefOpen && g.screen === 'game'}
        game={game}
        onClose={g.closeDebrief}
        onNew={() => g.setScreen('setup')}
        onLeaderboard={openLeaderboard}
        onTitle={g.quitToTitle}
      />
    </div>
  );
}

```
```data/i18n/en.ts
import type { MsgParams } from '../../types/i18n';

type MsgFn = (p: MsgParams) => string;
/** Keeps every message the same callable shape so translations line up key-for-key. */
export function messages<T extends Record<string, MsgFn>>(o: T): { [K in keyof T]: MsgFn } {
  return o;
}

const commands = {
  drive: { label: 'Drive', short: 'Drive', description: 'Advance toward Delta Ridge along the planned line.' },
  navigate: { label: 'Navigate', short: 'Verify', description: 'Plan and verify waypoints before the next drive.' },
  survey: { label: 'Radar survey', short: 'Survey', description: 'Ground-penetrating radar sweep for subsurface ice.' },
  drill: { label: 'Ice core', short: 'Drill', description: 'Drill a confirmation core into a radar ice target.' },
  selectTarget: { label: 'Select C-012', short: 'Target', description: 'Register the biosignature candidate and its coordinates.' },
  siteSurvey: { label: 'Survey sample site', short: 'Site', description: 'Characterize terrain and contamination conditions around C-012.' },
  spectroscopy: { label: 'Remote spectroscopy', short: 'Spectra', description: 'Identify minerals before committing a sample tube.' },
  prep: { label: 'Sterile prep', short: 'Prep', description: 'Clean and calibrate the coring tool before sampling.' },
  sample: { label: 'Collect C-012', short: 'Collect', description: 'Core the biosignature candidate into the sampling arm.' },
  sealSample: { label: 'Seal sample', short: 'Seal', description: 'Transfer C-012 into a sealed sample tube.' },
  checkSample: { label: 'Contamination check', short: 'Check', description: 'Verify sample integrity and transfer it to the cache.' },
  analyze: { label: 'Analyze', short: 'Analyze', description: 'Run on-board analysis on the verified sample.' },
  preparePacket: { label: 'Prepare science packet', short: 'Package', description: 'Compress C-012 results into a verified data product.' },
  uplink: { label: 'Uplink', short: 'Uplink', description: 'Send queued data packets in today’s windows.' },
  deploySolar: { label: 'Deploy solar kit', short: 'Solar', description: 'Unfold one 70 W panel kit into the power farm.' },
  buildRelay: { label: 'Raise relay', short: 'Relay', description: 'Erect one segment of the relay tower.' },
  heat: { label: 'Heat overnight', short: 'Heat', description: 'Run survival heaters tonight. Costs less than a cold soak.' },
  repair: { label: 'Repair', short: 'Repair', description: 'Use a spare part on the most worn system.' },
  rest: { label: 'Rest & charge', short: 'Rest', description: 'Stand down, shake the panel and recharge.' },
};

const packets = { ice: 'Ice reserve map', c012: 'C-012 spectroscopy' };
const cmd = (p: MsgParams) => commands[p.cmd as keyof typeof commands]?.label ?? String(p.cmd);

export const en = {
  code: 'en',
  short: 'EN',
  name: 'English',
  nav: { command: 'Command', navigation: 'Navigation', science: 'Science', systems: 'Systems', environment: 'Environment', comms: 'Comms', reports: 'Reports', settings: 'Settings', aria: 'Console views' },
  phase: { planning: 'Planning', uplink: 'Signal in transit', executing: 'Executing on Mars', night: 'Night ops', report: 'Sol report', paused: 'Paused' },
  advisors: {
    nav: { name: 'Navigation', role: 'Route, waypoints, hazard avoidance', wants: 'Safe, verified routes even if they are longer' },
    sci: { name: 'Science', role: 'Spectroscopy, drilling, sample custody', wants: 'Risky but valuable targets, sooner' },
    sys: { name: 'Systems & Power', role: 'Battery, thermal, parts, power farm', wants: 'Rest the rover and protect the battery' },
    comm: { name: 'Communications', role: 'DSN, orbiter relays, data packets', wants: 'Bandwidth and uplink windows planned around data' },
  },
  commands,
  packets,
  pillars: {
    water: { name: 'Water', goal: 'Subsurface ice mapped, cored and confirmed' },
    power: { name: 'Power', goal: 'Solar farm + RTG ≥ 400 W for 3 Sols' },
    comms: { name: 'Comms', goal: 'Relay tower up, DSN link unbroken for 5 Sols' },
    science: { name: 'Science', goal: 'C-012 cored clean, analyzed and uplinked' },
  },
  pillarSteps: {
    coverage: 'Radar coverage',
    cores: 'Ice cores',
    iceUplinked: 'Ice map uplinked',
    farmOutput: 'Farm + RTG output',
    stableSols: 'Stable Sols',
    relay: 'Relay tower',
    unbroken: 'Unbroken link',
    c012Cored: 'C-012 cored clean',
    analyzed: 'Analyzed on board',
    onEarth: 'Data on Earth',
  },
  difficulty: {
    explorer: { name: 'Explorer', blurb: 'Shorter delay, rarer faults, extra spares. Undo last Sol.' },
    engineer: { name: 'Engineer', blurb: 'The core experience. Balanced risk. Undo available.' },
    director: { name: 'Mission Director', blurb: 'Long delay, frequent storms, tight resources. No undo.' },
  },
  regions: {
    jezero: { name: 'Jezero Crater', blurb: 'Sedimentary delta. The baseline road to Delta Ridge.' },
    sirenum: { name: 'Terra Sirenum', blurb: 'Steep, broken highlands. Harder routes, more wheel wear.' },
    hellas: { name: 'Hellas Basin', blurb: 'Deep basin. Colder nights, more dust, shifted relay passes.' },
  },
  acts: {
    discovery: { name: 'Act I · Discovery', description: 'Scout the landing zone, establish routes and identify C-012.' },
    expansion: { name: 'Act II · Expansion', description: 'Build power and communications infrastructure; confirm water.' },
    survival: { name: 'Act III · Survival', description: 'Environmental pressure peaks. Protect the rover and preserve the mission.' },
    finalApproach: { name: 'Act IV · Final Approach', description: 'Close every Habitat Zero pillar before the Perihelion window.' },
  },
  environment: {
    title: 'Surface environment', live: 'LIVE TELEMETRY', temperature: 'Temperature', pressure: 'Pressure', wind: 'Wind', dust: 'Dust index', solar: 'Solar flux', daylight: 'Daylight', visibility: 'Visibility',
    systemImpact: 'Operational impact', driveEfficiency: 'Traverse efficiency', solarYield: 'Solar yield', scienceQuality: 'Science quality',
    note: 'These readings directly modify movement, charging, communications and sample integrity.', eventChain: 'Active event chain',
    chainActive: (step: number, sols: number) => `Consequence ${step} · ${sols} Sols of elevated risk remain`, chainHint: 'Counter the cause, not only the latest symptom, to break the chain.',
  },
  scoreAxes: {
    efficiency: { label: 'Efficiency', hint: 'Resources saved, action points used, Sols to spare' },
    risk: { label: 'Risk management', hint: 'Faults avoided, crises handled, advisor trust balance' },
    science: { label: 'Science value', hint: 'Sample quality, C-012 uplink, ice map accuracy' },
  },
  medals: { gold: 'Gold', silver: 'Silver', bronze: 'Bronze' },
  events: {
    storm: { label: 'Dust storm', counter: 'Survival mode: rest and cut load' },
    stormEnd: { label: 'Storm cleared', counter: '' },
    cold: { label: 'Night cold', counter: 'Run heaters tonight' },
    wear: { label: 'Wear failure', counter: 'Swap the damaged part' },
    commsLoss: { label: 'Link loss', counter: 'Re-plan the uplink for the next window' },
    wind: { label: 'Wind gust', counter: 'Re-verify the line and leave slack' },
    contamination: { label: 'Contamination', counter: 'Sterile prep before the next core' },
    software: { label: 'Software fault', counter: 'Verify waypoints before driving' },
    badAdvice: { label: 'Bad estimate', counter: '' },
    brownout: { label: 'Brownout', counter: 'Rest and recharge' },
    discovery: { label: 'Scientific opportunity', counter: 'Survey the new return' },
    favorableWindow: { label: 'Favorable relay geometry', counter: 'Use the bonus window' },
    technology: { label: 'Operations unlocked', counter: '' },
    dustLoad: { label: 'Panel dust load', counter: 'Rest and shake the panel' },
    milestone: { label: 'Milestone', counter: '' },
  },
  common: { sol: 'Sol', back: 'Back', you: 'YOU', ap: 'AP', empty: 'Empty', language: 'Language', min: 'min' },
  topBar: { opsCommand: 'Operations Command', lmst: 'LMST', phase: 'Phase', lightTime: 'One-way light time', delay: (n: number) => `Delay ${n} min` },
  time: {
    aria: 'Time controls',
    pause: 'Pause',
    resume: 'Resume',
    locked: 'Locked while commands execute',
    playback: (s: number) => `${s}× playback`,
  },
  camera: { label: 'Camera', mode: 'Camera mode', site: 'Site', tactical: 'Tactical', rover: 'Rover', zoomIn: 'Zoom in', zoomOut: 'Zoom out' },
  advisor: {
    aria: (code: string) => `${code} advisor`,
    trust: 'Trust',
    trustAria: 'Advisor trust',
    band: { high: 'High', normal: 'Normal', low: 'Low' },
    alternative: 'Alternative · high trust',
    est: 'Est.',
    lowConfidence: 'Low confidence',
    accept: (n: number) => `Accept · ${n} AP`,
    accepted: 'Accepted',
    ignored: (n: number) => `Ignored ${n} Sols running · trust falling faster`,
    proposals: (sol: number) => `Advisor proposals · Sol ${sol}`,
  },
  pillarsHud: { aria: 'Habitat Zero pillars', title: 'Habitat Zero', solsLeft: (n: number) => `${n} Sols to Perihelion`, certified: 'Certified' },
  dock: {
    aria: 'Command sequence',
    title: (sol: number) => `Sol ${sol} sequence`,
    executes: (n: number) => `Executes in order after ${n} min`,
    apAria: (used: number, total: number) => `${used} of ${total} action points used`,
    safeModePenalty: '−2 safe mode',
    rest: 'Rest 3 Sols',
    restTitle: 'Resolve up to 3 idle Sols of rest + heat. Stops early on a red event.',
    safe: 'Safe',
    auto: 'Auto',
    safeTitle: 'Adds a safety buffer: halves fault odds and wear. Costs 1 AP.',
    send: 'Send Command',
    queueAria: 'Queued commands',
    paletteAria: 'Add command',
    moveEarlier: (l: string) => `Move ${l} earlier`,
    moveLater: (l: string) => `Move ${l} later`,
    remove: (l: string) => `Remove ${l}`,
    empty: 'Accept advisor proposals or add commands below.',
    battery: (n: number) => `battery ${n > 0 ? '−' : '+'}${Math.abs(n)}%`,
    apCost: (n: number) => `${n} AP`,
    unlocks: (sol: number) => `Unlocks at Sol ${sol}`,
  },
  checklist: {
    title: 'Pre-send checklist',
    arrives: (n: number) => `Arrives in ${n} min · cannot be recalled once sent.`,
    back: 'Back to plan',
    sendAnyway: 'Send anyway',
  },
  feed: {
    aria: 'Sequence in flight',
    transit: 'Signal in transit to Mars',
    night: 'Night on Mars · telemetry closing out',
    executing: 'Executing on Mars · commands cannot be recalled',
    arrives: (m: number, d: number) => `Arrives in ~${m} min of ${d} min light time`,
    nightSub: 'Thermal and power events resolve overnight',
    step: (i: number, n: number) => `Step ${i} of ${n}`,
    paused: ' · paused',
    idle: 'Idle Sol · no commands',
    skipped: 'Skipped',
    success: 'Success',
    failed: 'Failed',
  },
  navigation: {
    title: 'Navigation · Traverse to Delta Ridge',
    routeAria: (pct: number) => `Route ${pct} percent complete`,
    landing: 'LANDING SITE',
    ridge: 'DELTA RIDGE · C-012',
    radarRange: 'Radar range',
    drillRange: 'Drill range',
    remaining: 'Remaining',
    drivesLeft: 'Drives left',
    perDrive: 'Per drive',
    wheels: 'Wheel health',
    wear: 'Terrain wear factor',
    verified: 'Waypoints verified for the next drive.',
    unverified: 'Next drive uses unverified waypoints. Add Navigate first to avoid safe mode.',
  },
  science: {
    custody: 'C-012 · chain of custody',
    candidate: 'Biosignature candidate',
    steps: {
      selected: { label: 'Target selected', hint: 'Coordinates and scientific intent registered' },
      surveyed: { label: 'Site surveyed', hint: 'Terrain and contamination context recorded' },
      spectrographed: { label: 'Spectroscopy complete', hint: 'Clay, sulfate and carbonate signatures resolved' },
      sampled: { label: 'Sample collected', hint: 'Core held by the sampling arm' },
      sealed: { label: 'Tube sealed', hint: 'C-012 transferred into sterile storage' },
      checked: { label: 'Integrity checked', hint: 'Contamination result and quality recorded' },
      analyzed: { label: 'Analyzed on board', hint: 'Organics assessment complete' },
      packetReady: { label: 'Packet prepared', hint: '900 MB verified science product queued' },
      uplinked: { label: 'Data on Earth', hint: 'Delivered through DSN windows' },
    },
    tubes: 'Tubes', voided: 'Voided', tool: 'Tool', sterile: 'Sterile', notPrepped: 'Not prepped',
    quality: 'Quality', storage: 'Storage', mineralogy: 'Mineralogy', selectedSol: 'Selected', collectedSol: 'Collected', pending: 'Pending',
    storageValues: { uncollected: 'Uncollected', arm: 'Sampling arm', tube: 'Sealed tube', cache: 'Science cache' },
    ice: 'Ice survey · Water pillar', coverage: 'Radar coverage', cores: 'Confirmation cores', bit: 'Drill bit',
    bitValue: (pct: number, n: number) => `${pct}% · ${n} spare`,
    note: (s: number, d: number) => `Radar works from ${s}% of the route; drilling needs ${d}% and a map above 60%. The ice map must reach Earth to certify.`,
    delivered: ' Ice map delivered.',
  },
  systems: {
    power: 'Power · Habitat Zero farm',
    farm: (f: number, r: number) => `Farm ${f} W · RTG ${r} W`,
    storm: (n: number) => ` · storm −${n}%`,
    stable: 'Stable',
    sols: (a: number, b: number) => `${a}/${b} Sols`,
    toward: 'Toward certification',
    rover: 'Rover health · ARES-1',
    battery: 'Battery',
    wheels: 'Wheels',
    drill: 'Drill',
    dust: 'Panel dust',
    night: (t: number) => `Nights fall to about ${t} °C. Unheated nights drain ~15% and risk cold damage; heaters cost ~6%.`,
    brownout: ' One brownout logged — another is fatal.',
    inventory: 'Inventory',
  },
  inventory: { drillBits: 'Drill bits', tubes: 'Sample tubes', spares: 'Spare parts', solarKits: 'Solar kits', relayKits: 'Relay segments' },
  comms: {
    windows: (sol: number) => `Today’s windows · Sol ${sol}`,
    capacity: (mb: number) => `${mb} MB capacity`,
    listAria: 'Communication windows',
    notBuilt: 'Not built',
    noPass: 'No pass',
    axisEnd: '24 LMST',
    storm: 'Dust storm halves window capacity.',
    queue: 'Data queue',
    waiting: (mb: number) => `${mb} MB waiting`,
    queueEmpty: 'Nothing waiting. Analyzed samples and completed ice maps appear here.',
    relay: 'Relay & DSN chain · Comms pillar',
    tower: 'Relay tower',
    towerValue: (pct: number, n: number) => `${pct}% · ${n} kits`,
    unbroken: 'Unbroken link',
    note: (d: number) => `One-way light time today: ${d} min. The streak only counts once the relay stands; any link loss resets it.`,
  },
  eventsLog: { none: 'No events yet.', counter: (label: string, short: string) => `Counter: ${label} (${short})`, chain: (n: number) => `Chain consequence ${n}` },
  reports: {
    score: 'Running score',
    records: 'Records',
    of: 'of 3000 · updated each Sol',
    pace: 'Pace',
    log: 'Sol log',
    rested: (n: number) => ` · rested ${n}`,
    ok: (a: number, b: number) => `${a}/${b} ok`,
    alerts: (n: number) => ` · ${n} alert${n > 1 ? 's' : ''}`,
    missionLearning: 'Mission learning',
    discoveries: 'Discoveries',
    chains: 'Chains broken',
    justified: 'Justified calls',
    empty: 'Reports appear after your first Sol.',
    events: 'Events',
  },
  settings: {
    slots: 'Save slots',
    offline: 'Stored on this device · works offline',
    permadeath: (n: number) => `Permadeath run · locked to slot ${n}. Loading is disabled.`,
    slot: (n: number) => `Slot ${n}`,
    current: 'current',
    ended: ' · ended',
    save: 'Save',
    load: 'Load',
    console: 'Console',
    sound: 'Sound cues',
    haptics: 'Haptics',
    glass: 'Frosted light glass',
    language: 'Interface language',
    quit: 'Save & return to title',
  },
  leaderboard: {
    title: 'Personal records',
    subtitle: 'Local leaderboard · per difficulty and region',
    all: 'All',
    diffAria: 'Difficulty filter',
    regionAria: 'Region filter',
    headers: ['#', 'Score', 'Medal', 'Result', 'Difficulty', 'Region', 'Sol'],
    certified: 'Certified',
    lost: 'Lost',
    pd: 'PD',
    empty: 'No finished missions yet. Certify Habitat Zero to set a record.',
  },
  titleScreen: {
    program: 'ARES Program · 2031',
    intro:
      'You are Mission Director. Certify Habitat Zero for the first crew before Sol 500 — or the Perihelion crew window closes for 26 months. Four advisors, limited action points, and a signal that takes minutes to arrive.',
    continue: 'Continue',
    newMission: 'New Mission',
    leaderboard: 'Leaderboard',
    others: 'Other saves',
    slotSol: (slot: number, sol: number) => `Slot ${slot} · Sol ${sol}`,
    footer: 'Single player · saves stay on this device · playable offline',
  },
  setup: {
    title: 'New mission',
    subtitle: 'Same goal every time: certify Habitat Zero by Sol 500.',
    difficulty: 'Difficulty',
    apDelay: (ap: number, a: number, b: number) => `${ap} AP · delay ${a}–${b} min`,
    permadeath: 'Permadeath',
    permadeathHint: ' · one save slot, no reload, deleted on defeat',
    region: 'Landing region',
    nights: (t: number, c: string) => `Nights ${t} °C · ${c}`,
    slot: 'Save slot',
    slotUsed: (sol: number) => `Sol ${sol} · will be overwritten`,
    overwrite: (n: number) => `Slot ${n} has a save — starting overwrites it.`,
    begin: 'Begin Sol 1',
  },
  report: {
    received: 'Telemetry received',
    title: (sol: number) => `Sol ${sol} report`,
    rested: (n: number) => ` · rested ${n} Sol${n > 1 ? 's' : ''}`,
    score: 'score · pace',
    sequence: (a: number, b: number) => `Sequence · ${a}/${b} AP`,
    idle: 'Idle Sol.',
    night: (t: number) => `Night ${t} °C · `,
    heated: 'heaters on',
    unheated: 'unheated',
    battery: (a: number, b: number) => ` · battery ${a}% → ${b}%`,
    events: 'Events',
    quiet: 'Quiet Sol. No anomalies.',
    pillars: 'Habitat Zero',
    trust: 'Advisor trust',
    undo: 'Undo Sol',
    debrief: 'Mission debrief',
    next: (sol: number) => `Continue to Sol ${sol}`,
    cmdsAria: 'Executed commands',
  },
  debrief: {
    certified: 'Habitat Zero certified',
    lost: 'Mission lost',
    winHead: 'Perihelion is go for launch.',
    lossHead: 'The window closes without us.',
    final: 'Final score',
    rating: 'Rating',
    noRating: 'No rating',
    pillars: 'Pillars',
    faults: 'Faults',
    permadeath: ' · permadeath',
    saved: ' · saved to local records',
    toTitle: 'Title',
    records: 'Records',
    newMission: 'New mission',
  },
  drawer: { title: 'Mission data', battery: 'Battery', wheels: 'Wheels', power: 'Power', data: 'Data', storm: 'Storm', stormSols: (n: number) => `${n} Sols`, pillars: 'Pillars' },
  missionData: { timeline: 'Mission timeline', recent: 'Recent events', health: 'Systems health', inventory: 'Inventory' },
  timeline: { landing: 'Sol 1 · Landing', perihelion: (n: number) => `Sol ${n} · Perihelion`, empty: 'Milestones appear as you reach them.' },
  stage: {
    roverKind: 'Rover',
    ridge: 'Delta Ridge',
    ridgeType: 'Layered sediments · C-012 · Target',
    view: (r: string) => `${r} live terrain view`,
    standby: 'Standby',
    awaiting: 'Awaiting uplink',
    sleep: 'Night · sleep mode',
    safeMode: 'Safe mode',
    battery: (n: number) => `Battery ${n}%`,
  },
  layout: { leftCommand: 'NAV and SCI advisors', leftView: 'View panel', rightCommand: 'SYS and COMM advisors', rightView: 'Advisors', advisors: 'Advisors' },
  toast: {
    noAp: (n: number) => `No action points left · ${n} this Sol`,
    needsAp: (n: number, left: number) => `Needs ${n} AP · ${left} left`,
    safeNeedsAp: 'Safe buffer needs 1 free action point',
    started: 'Sol 1 · ARES-1 awaiting your first sequence',
    slotEmpty: 'Save slot is empty or unreadable',
    loaded: (n: number, sol: number) => `Loaded slot ${n} · Sol ${sol}`,
    saved: (n: number) => `Saved to slot ${n}`,
    saveFailed: 'Could not save · storage unavailable',
    commandLocked: 'This operation is not available in the current act.',
    restored: (sol: number) => `Sol ${sol} restored · sequence back in the editor`,
  },
  msg: messages({
    // Step results
    stepSkipped: (p) => `${cmd(p)} skipped`,
    safeModeNoResponse: () => 'Rover in safe mode · not responding',
    stepRefused: (p) => `${cmd(p)} refused`,
    batteryFloor: (p) => `Battery ${p.battery}% · below the ${p.floor}% floor`,
    driveSkipped: () => 'Drive skipped',
    atRidge: () => 'Already on station at Delta Ridge',
    softwareFault: () => 'Software fault · safe mode',
    badUpload: () => 'Unverified waypoint upload rejected',
    driveDone: () => 'Drive complete',
    driveDetail: (p) => `+${p.m} m · route ${p.pct}%`,
    waypointsVerified: () => 'Waypoints verified',
    waypointsVerifiedDetail: () => 'Next drive uploads a checked line',
    surveyOutOfRange: () => 'Survey out of range',
    surveyRange: (p) => `Radar needs route ≥ ${p.pct}%`,
    surveyRedundant: () => 'Survey redundant',
    iceMapComplete: () => 'Ice map already complete',
    surveyDone: () => 'Radar sweep complete',
    iceMapPct: (p) => `Ice map ${p.pct}%`,
    drillOutOfRange: () => 'Drill out of range',
    drillRange: () => 'Get closer to the ice targets',
    drillRefused: () => 'Drill refused',
    drillMapLow: () => 'Ice map below 60% · no confident target',
    drillUnavailable: () => 'Drill unavailable',
    noBits: () => 'No drill bits left',
    iceCoreLost: () => 'Ice core lost',
    bitFailure: () => 'Bit failure mid-core',
    iceCoreOk: () => 'Ice core confirmed',
    coresCount: (p) => `Cores ${p.n}/${p.max}`,
    targetOutOfRange: () => 'C-012 target out of range',
    targetNeedsRidge: () => 'Reach the final Delta Ridge approach first',
    targetAlreadySelected: () => 'C-012 already registered',
    sampleStageDetail: () => 'Continue the current chain-of-custody step',
    targetSelected: () => 'C-012 target selected',
    targetSelectedDetail: () => 'Coordinates, context and scientific intent registered',
    surveyNeedsTarget: () => 'No registered target to survey',
    selectTargetFirst: () => 'Select C-012 before surveying the site',
    siteSurveyDone: () => 'Sample site surveyed',
    siteSurveyDetail: (p) => `Terrain context recorded · science quality ${p.quality}%`,
    spectroscopyBlocked: () => 'Spectroscopy not ready',
    surveyFirst: () => 'Survey the sample site first',
    spectroscopyDone: () => 'Remote spectroscopy complete',
    spectroscopyDetail: () => 'Clay, sulfate and carbonate signatures resolved',
    prepDone: () => 'Sterile prep done',
    prepDetail: () => 'Coring tool cleaned and calibrated',
    sampleOutOfReach: () => 'Sample out of reach',
    c012AtRidge: () => 'C-012 is at Delta Ridge',
    sampleNotReady: () => 'C-012 is not ready to collect',
    spectroscopyFirst: () => 'Complete remote spectroscopy before using a tube',
    noTubes: () => 'No sample tubes',
    inventoryEmpty: () => 'Inventory empty',
    c012Contaminated: () => 'C-012 core contaminated',
    tubeVoided: (p) => `Tube voided · ${p.n} left`,
    c012Collected: () => 'C-012 core collected',
    sealBlocked: () => 'Sample cannot be sealed',
    validSampleNeeded: () => 'A valid core in the sampling arm is required',
    c012Sealed: () => 'C-012 sealed',
    sampleStored: () => 'Tube locked in sterile science storage',
    tubesLeft: (p) => `${p.n} tubes remaining`,
    checkBlocked: () => 'Integrity check not ready',
    sealFirst: () => 'Seal C-012 first',
    sampleChecked: () => 'C-012 integrity verified',
    sampleCheckedDetail: (p) => `Contamination clear · quality ${p.quality}%`,
    nothingToAnalyze: () => 'Nothing to analyze',
    checkFirst: () => 'Complete the contamination check first',
    c012Analyzed: () => 'C-012 analyzed',
    analysisDetail: (p) => `Organics assessment complete · sample quality ${p.quality}%`,
    packetBlocked: () => 'Science packet not ready',
    analyzeFirst: () => 'Analyze the verified sample first',
    packetPrepared: () => 'C-012 science packet prepared',
    packetQueued: () => '900 MB packet queued for Earth',
    uplinkFailed: () => 'Uplink failed',
    noAos: () => 'No acquisition of signal',
    uplinkDone: () => 'Uplink complete',
    delivered: (p) => `Delivered: ${String(p.kinds).split(',').map((k) => packets[k as keyof typeof packets] ?? k).join(', ')}`,
    partial: (p) => `Partial · ${p.mb} MB left`,
    routine: () => 'Routine telemetry',
    noSolarKits: () => 'No solar kits',
    solarDeployed: () => 'Solar kit deployed',
    farmInstalled: (p) => `Farm ${p.w} W installed`,
    relayComplete: () => 'Relay complete',
    nothingToBuild: () => 'Nothing to build',
    noRelay: () => 'No relay segments',
    relayRaised: () => 'Relay segment raised',
    towerPct: (p) => `Tower ${p.pct}%`,
    heatScheduled: () => 'Heaters scheduled',
    heatDetail: () => 'Survival heaters armed for tonight',
    noSpares: () => 'No spare parts',
    wheelSwapped: () => 'Wheel module swapped',
    wheelsPct: (p) => `Wheels ${p.pct}%`,
    drillServiced: () => 'Drill serviced',
    drillPct: (p) => `Drill ${p.pct}%`,
    rested: () => 'Rested and charged',
    batteryGain: (p) => `Battery +${p.n}%`,
    // Events
    badTerrain: (p) => `${p.code} terrain estimate was wrong`,
    badTerrainDetail: () => 'Rougher ground than forecast · wheels −12%',
    badPower: (p) => `${p.code} power estimate was wrong`,
    badPowerDetail: () => 'Activity drew more than forecast · battery −8%',
    safeModeEntered: () => 'Safe mode entered',
    safeModeDetail: () => 'A bad waypoint upload tripped the rover into safe mode. Remaining commands dropped; next Sol has 2 fewer action points.',
    windHalt: () => 'Wind gust halted the drive',
    windHaltDetail: () => 'Autonav paused mid-segment · half the distance made',
    wheelCrack: () => 'Wheel tread cracked',
    wheelCrackDetail: () => 'Rocky segment · wheels −15%',
    arrivedRidge: () => 'Arrived at Delta Ridge',
    arrivedRidgeDetail: () => 'Layered sediments in reach · C-012 target in range',
    bitBroke: () => 'Drill bit broke',
    bitSwapped: () => 'Bit swapped from inventory · core lost',
    noBitsLeft: () => 'No spare bits remain',
    contaminated: () => 'Sample contaminated',
    contaminatedDetail: () => 'Terrestrial organics detected in the tube. The core is invalid.',
    c012SealedDetail: () => 'Biosignature candidate cored clean',
    linkLoss: () => 'Link loss',
    linkLossDetail: () => 'DSN pass dropped. Data stays on board; the unbroken-link streak resets.',
    c012OnEarth: () => 'C-012 data on Earth',
    c012OnEarthDetail: () => 'Biosignature results received by JPL',
    relayOnline: () => 'Relay tower online',
    relayOnlineDetail: () => 'A long daily window opens from tomorrow',
    coldSoak: (p) => `Cold soak · ${p.t} °C`,
    coldSoakWheels: () => 'Unheated night · wheel actuators −8%',
    coldSoakDrill: () => 'Unheated night · drill motor −12%',
    brownout: () => 'Brownout overnight',
    brownoutSecond: () => 'Second consecutive brownout',
    brownoutFirst: () => 'Rover rebooted at dawn. Another brownout could be fatal.',
    stormCleared: () => 'Dust storm cleared',
    stormClearedDetail: () => 'Solar output and link quality recovering',
    stormIncoming: () => 'Dust storm rolling in',
    stormIncomingDetail: (p) => `Expected ${p.n} Sols · solar and link degraded`,
    dustLoadEvent: () => 'Dust accumulating on the deck',
    dustLoadDetail: (p) => `Panel obscuration ${p.pct}% · lower charge expected tomorrow`,
    unexpectedDiscovery: () => 'Unexpected subsurface return',
    unexpectedDiscoveryDetail: () => 'A shallow ice lens adds 8% radar coverage and a new survey opportunity.',
    favorableWindow: () => 'Unexpected relay window',
    favorableWindowDetail: (p) => `Orbiter geometry carried ${p.mb} MB · ${p.packets}`,
    actUnlocked: (p) => `${({ discovery: 'Discovery', expansion: 'Expansion', survival: 'Survival', finalApproach: 'Final Approach' } as Record<string, string>)[String(p.act)] ?? p.act} operations unlocked`,
    actUnlockedDetail: (p) => `Campaign entered a new operational act at Sol ${p.sol}. New procedures and risks are active.`,
    missionStart: () => 'Mission start · ARES-1 on the surface',
    missionStartDetail: () => 'Certify Habitat Zero by Sol 500 before the Perihelion window closes.',
    // Outcomes
    winReason: (p) => `Habitat Zero certified on Sol ${p.sol}`,
    lossWheels: () => 'ARES-1 immobilized · wheels failed',
    lossBrownouts: () => 'ARES-1 lost after repeated brownouts',
    lossC012: () => 'Sample C-012 permanently lost · no tubes left',
    lossDeadline: () => 'Sol 500 reached · Perihelion window closed',
    // Proposals
    navDriveVerified: () => 'Drive the verified line',
    navDriveVerifiedWhy: () => 'Waypoints are checked. Take the long, safe line toward Delta Ridge.',
    navVerifyDrive: () => 'Verify waypoints, then drive',
    navVerifyDriveWhy: () => 'The safe line is longer, but an unverified upload can drop us into safe mode.',
    navDriveTruth: (p) => `${p.km} km to go · fault risk ${p.verified ? 'low' : 'none after verify'}`,
    navDriveNoisy: (p) => `${p.km} km to go · risk negligible`,
    navDoubleLeg: () => 'Double leg toward the ridge',
    navDoubleLegWhy: () => 'Two drive segments today. Burns battery and wheels, but halves the traverse time.',
    navDoubleLegTruth: () => 'Wheel wear ×2 · battery −24%',
    navDoubleLegNoisy: () => 'Wheel wear minimal',
    navHoldRidge: () => 'Hold at Delta Ridge, sweep the flanks',
    navHoldRidgeWhy: () => 'We are on station. Widen the radar footprint before committing the drill.',
    coverageChange: (p) => `Coverage ${p.from}% → ${p.to}%`,
    coveragePlus: (p) => `Coverage +${p.n}%`,
    sciSelectTarget: () => 'Register C-012 as the prime target',
    sciSelectTargetWhy: () => 'The layered ridge is in range. Lock coordinates before committing instruments.',
    sciSiteSurvey: () => 'Characterize the C-012 site',
    sciSiteSurveyWhy: () => 'Terrain and dust context determine whether a clean sample is possible.',
    sciSpectroscopy: () => 'Resolve C-012 mineralogy',
    sciSpectroscopyWhy: () => 'Remote spectra can validate the target before a scarce tube is used.',
    scienceStageEstimate: (p) => `Custody stage ${p.n}/${p.total}`,
    scienceQualityEstimate: (p) => `Expected measurement quality ${p.quality}%`,
    sampleQualityEstimate: (p) => `Recorded sample quality ${p.quality}%`,
    scienceEstimateUncertain: () => 'Environmental estimate uncertain',
    sciCoreNow: () => 'Core C-012 now',
    sciCoreNowWhy: () => 'The biosignature candidate is in reach. Every Sol we wait is a Sol of storm risk.',
    contamRisk: (p) => `Contamination risk ${p.sterile ? 'low' : 'high without prep'}`,
    contamLow: () => 'Contamination risk low',
    sciPrepCore: () => 'Prep, then core C-012',
    sciPrepCoreWhy: () => 'Sterile prep first. Slower, but a contaminated tube is gone for good.',
    contamFive: () => 'Contamination risk ~5%',
    sciSealSample: () => 'Seal C-012 in the sterile tube',
    sciSealSampleWhy: () => 'The core is in the arm. Seal it before movement or dust can compromise custody.',
    sciCheckSample: () => 'Verify C-012 integrity',
    sciCheckSampleWhy: () => 'Check contamination and transfer the tube into the protected cache.',
    sciAnalyze: () => 'Analyze C-012 on board',
    sciAnalyzeWhy: () => 'The verified tube is ready for organics and mineral context analysis.',
    sciPreparePacket: () => 'Prepare the C-012 science product',
    sciPreparePacketWhy: () => 'Package analysis, context and custody records for Earth validation.',
    sciAwaitUplink: () => 'Deliver C-012 to Earth',
    sciAwaitUplinkWhy: () => 'The verified packet is ready. Use a clean DSN or orbiter window.',
    packetMb: (p) => `Creates a ${p.mb} MB data packet`,
    sciDrill: () => 'Drill an ice confirmation core',
    sciDrillWhy: () => 'Radar shows a strong return. A core turns a map into a confirmed reserve.',
    drillWear: (p) => `Drill bit ${p.pct}% · wear −18%`,
    drillWearLow: () => 'Drill wear negligible',
    sciSurvey: () => 'Radar sweep for ice',
    sciSurveyWhy: () => 'We are inside radar range of the ridge. Every sweep sharpens the ice map.',
    surveyTruth: () => 'Coverage +20% · battery −8%',
    sciDirect: () => 'Take the direct line to the ridge',
    sciDirectWhy: () => 'Skip the long way round. The science window will not wait for NAV.',
    waypointsOk: () => 'Waypoints verified',
    waypointsRisk: () => 'Unverified waypoints · fault risk',
    faultLow: () => 'Fault risk low',
    sysSurvival: () => 'Survival mode until the storm passes',
    sysSurvivalWhy: () => 'Solar is crippled. Rest, heat, and protect the battery.',
    sysRecharge: () => 'Stand down and recharge',
    sysRechargeWhy: () => 'Battery is low. A cold night on this charge risks a brownout.',
    batteryChange: (p) => `Battery ${p.from}% → ~${p.to}%`,
    batteryFine: (p) => `Battery fine at ${p.n}%`,
    sysSwapWheel: () => 'Swap the worn wheel module',
    sysReplaceBit: () => 'Replace the drill bit',
    sysRepairWhy: () => 'Wear is past the comfort line. A failure in the field costs far more Sols.',
    wearTruth: (p) => `Wheels ${p.w}% · drill ${p.d}%`,
    wheelsNoisy: (p) => `Wheels ${p.w}%`,
    sysSolar: () => 'Deploy a solar kit',
    sysSolarWhy: () => 'Every panel brings Habitat Zero closer to a stable 400 W.',
    wattChange: (p) => `${p.from} W → ${p.to} W`,
    sysHeat: () => 'Run the heaters tonight',
    sysHeatWhy: (p) => `Overnight low near ${p.t} °C. Heating now beats a cold soak.`,
    heatTruth: () => 'Battery −6% overnight instead of −15%',
    heatNoisy: () => 'Heaters unnecessary',
    commUplink: () => 'Uplink in today’s windows',
    commUplinkWhy: (p) => `${p.mb} MB waiting. Today’s passes carry about ${p.cap} MB.`,
    capacity: (p) => `${p.mb} MB capacity`,
    commRelay: () => 'Raise the next relay segment',
    commRelayWhy: () => 'The relay gives us a long daily window and an unbroken DSN chain.',
    towerChange: (p) => `Tower ${p.from}% → ${p.to}%`,
    towerNoisy: () => 'Tower complete after this segment',
    commHold: () => 'Hold bandwidth, keep the link clean',
    commHoldWhy: () => 'Nothing urgent to send. A routine telemetry pass keeps the DSN chain warm.',
    conflictSciSys: () => 'SCI wants to work the target — SYS asks to rest',
    conflictSciNav: () => 'SCI wants the direct line — NAV wants verified waypoints',
    conflictSciComm: () => 'SCI is adding a large packet — COMM has a narrow window',
    // Checklist
    chkEmpty: () => 'Empty sequence · the rover idles this Sol',
    chkWaypoints: () => 'Drive uses unverified waypoints · safe-mode risk',
    chkSterile: () => 'Sample without sterile prep · high contamination risk',
    chkBatteryLow: (p) => `Battery ~${p.pct}% by dawn${p.heated ? '' : ' · heaters off'}`,
    chkBatteryOk: (p) => `Battery ~${p.pct}% by dawn`,
    chkUplinkPartial: (p) => `Windows carry ${p.cap} MB · ${p.need} MB waiting · partial send`,
    chkUplinkOk: (p) => `Uplink fits today’s windows · ${p.cap} MB`,
    chkStorm: () => 'Storm active · consider the Safe buffer',
  }),
};

```
```types/i18n.ts
import type { en } from '../data/i18n/en';

export type Lang = 'en' | 'hu';
export type Dict = typeof en;
export type MsgKey = keyof Dict['msg'];
export type MsgParams = Record<string, string | number>;

/** Language-neutral game text: a message key plus parameters, rendered at display time. */
export interface Msg {
  k: MsgKey;
  p?: MsgParams;
}

```
```data/i18n/hu.ts
import type { Dict, MsgParams } from '../../types/i18n';
import { messages } from './en';

const commands = {
  drive: { label: 'Haladás', short: 'Haladás', description: 'Előrehaladás a Delta Ridge felé a tervezett útvonalon.' },
  navigate: { label: 'Navigáció', short: 'Ellenőrzés', description: 'Waypointok megtervezése és ellenőrzése a következő haladás előtt.' },
  survey: { label: 'Radaros felmérés', short: 'Felmérés', description: 'Talajradaros pásztázás a felszín alatti jég után.' },
  drill: { label: 'Jégmag', short: 'Fúrás', description: 'Megerősítő magfúrás egy radaron talált jégcélpontba.' },
  selectTarget: { label: 'C-012 kijelölése', short: 'Célpont', description: 'A biosignature-jelölt és koordinátáinak regisztrálása.' },
  siteSurvey: { label: 'Mintaterület felmérése', short: 'Helyszín', description: 'A C-012 körüli terep és szennyeződési körülmények vizsgálata.' },
  spectroscopy: { label: 'Távoli spektroszkópia', short: 'Spektrum', description: 'Ásványok azonosítása mintatubus felhasználása előtt.' },
  prep: { label: 'Steril előkészítés', short: 'Előkész.', description: 'A magfúró tisztítása és kalibrálása mintavétel előtt.' },
  sample: { label: 'C-012 begyűjtése', short: 'Begyűjt', description: 'A biosignature-jelölt magmintájának vétele a mintavevő karba.' },
  sealSample: { label: 'Minta lezárása', short: 'Lezárás', description: 'A C-012 áthelyezése zárt mintatubusba.' },
  checkSample: { label: 'Szennyeződés-ellenőrzés', short: 'Ellenőrzés', description: 'A minta épségének ellenőrzése és áttétele a tárolóba.' },
  analyze: { label: 'Elemzés', short: 'Elemzés', description: 'Fedélzeti elemzés az ellenőrzött mintán.' },
  preparePacket: { label: 'Tudományos csomag készítése', short: 'Csomag', description: 'A C-012 eredményeinek hitelesített adatcsomagba tömörítése.' },
  uplink: { label: 'Feltöltés', short: 'Feltöltés', description: 'A várakozó adatcsomagok küldése a mai ablakokban.' },
  deploySolar: { label: 'Napelemkészlet telepítése', short: 'Napelem', description: 'Egy 70 W-os panelkészlet kihajtása a napelemfarmba.' },
  buildRelay: { label: 'Relétorony építése', short: 'Relé', description: 'A relétorony egy szegmensének felállítása.' },
  heat: { label: 'Éjszakai fűtés', short: 'Fűtés', description: 'Túlélési fűtés ma éjjel. Olcsóbb, mint a kihűlés.' },
  repair: { label: 'Javítás', short: 'Javítás', description: 'Pótalkatrész felhasználása a legkopottabb rendszeren.' },
  rest: { label: 'Pihenés és töltés', short: 'Pihenés', description: 'Leállás, panelrázás és akkumulátortöltés.' },
};

const packets = { ice: 'Jégkészlet-térkép', c012: 'C-012 spektroszkópia' };
const cmd = (p: MsgParams) => commands[p.cmd as keyof typeof commands]?.label ?? String(p.cmd);

export const hu: Dict = {
  code: 'hu',
  short: 'HU',
  name: 'Magyar',
  nav: { command: 'Parancsnokság', navigation: 'Navigáció', science: 'Tudomány', systems: 'Rendszerek', environment: 'Környezet', comms: 'Kommunikáció', reports: 'Jelentések', settings: 'Beállítások', aria: 'Konzolnézetek' },
  phase: { planning: 'Tervezés', uplink: 'Jel úton', executing: 'Végrehajtás a Marson', night: 'Éjszakai üzem', report: 'Sol-jelentés', paused: 'Szüneteltetve' },
  advisors: {
    nav: { name: 'Navigáció', role: 'Útvonal, waypointok, veszélykerülés', wants: 'Biztonságos, ellenőrzött utat, még ha hosszabb is' },
    sci: { name: 'Tudomány', role: 'Spektroszkópia, fúrás, mintakezelés', wants: 'Kockázatos, de értékes célpontokat, mielőbb' },
    sys: { name: 'Rendszerek és energia', role: 'Akkumulátor, hő, alkatrészek, napelemfarm', wants: 'Pihentetné a rovert és védené az akkumulátort' },
    comm: { name: 'Kommunikáció', role: 'DSN, orbiter-relék, adatcsomagok', wants: 'Az adatokhoz igazított sávszélességet és ablakokat' },
  },
  commands,
  packets,
  pillars: {
    water: { name: 'Víz', goal: 'Felszín alatti jég feltérképezve, megfúrva és megerősítve' },
    power: { name: 'Energia', goal: 'Napelemfarm + RTG ≥ 400 W 3 Sol-on át' },
    comms: { name: 'Kommunikáció', goal: 'Áll a relétorony, a DSN-kapcsolat 5 Sol-ig megszakítás nélküli' },
    science: { name: 'Tudomány', goal: 'C-012 tisztán mintázva, elemezve és feltöltve' },
  },
  pillarSteps: {
    coverage: 'Radarlefedettség',
    cores: 'Jégmagok',
    iceUplinked: 'Jégtérkép feltöltve',
    farmOutput: 'Farm + RTG teljesítmény',
    stableSols: 'Stabil Sol-ok',
    relay: 'Relétorony',
    unbroken: 'Megszakítás nélküli kapcsolat',
    c012Cored: 'C-012 tisztán mintázva',
    analyzed: 'Fedélzeten elemezve',
    onEarth: 'Adat a Földön',
  },
  difficulty: {
    explorer: { name: 'Felfedező', blurb: 'Rövidebb késleltetés, ritkább hibák, több tartalék. Az utolsó Sol visszavonható.' },
    engineer: { name: 'Mérnök', blurb: 'Az alapélmény, kiegyensúlyozott kockázattal. Van visszavonás.' },
    director: { name: 'Missziófelelős', blurb: 'Hosszú késleltetés, gyakori viharok, szűk erőforrások. Nincs visszavonás.' },
  },
  regions: {
    jezero: { name: 'Jezero-kráter', blurb: 'Üledékes delta. Az alapútvonal a Delta Ridge felé.' },
    sirenum: { name: 'Terra Sirenum', blurb: 'Meredek, szakadékos felföld. Nehezebb utak, több kerékkopás.' },
    hellas: { name: 'Hellas-medence', blurb: 'Mély medence. Hidegebb éjszakák, több por, eltolt relé-áthaladások.' },
  },
  acts: {
    discovery: { name: 'I. felvonás · Felfedezés', description: 'A leszállóhely felderítése, útvonalak kijelölése és a C-012 azonosítása.' },
    expansion: { name: 'II. felvonás · Terjeszkedés', description: 'Energia- és kommunikációs infrastruktúra építése; a vízkészlet igazolása.' },
    survival: { name: 'III. felvonás · Túlélés', description: 'A környezeti nyomás tetőzik. Védd a rovert és őrizd meg a küldetést.' },
    finalApproach: { name: 'IV. felvonás · Végső megközelítés', description: 'Zárd le a Habitat Zero minden pillérét a Perihelion-ablak előtt.' },
  },
  environment: {
    title: 'Felszíni környezet', live: 'ÉLŐ TELEMETRIA', temperature: 'Hőmérséklet', pressure: 'Nyomás', wind: 'Szél', dust: 'Porindex', solar: 'Napsugárzás', daylight: 'Nappalhossz', visibility: 'Látótáv',
    systemImpact: 'Műveleti hatás', driveEfficiency: 'Haladási hatékonyság', solarYield: 'Napenergia-hozam', scienceQuality: 'Mérési minőség',
    note: 'Ezek az értékek közvetlenül módosítják a mozgást, töltést, kommunikációt és a minta épségét.', eventChain: 'Aktív eseménylánc',
    chainActive: (step: number, sols: number) => `${step}. következmény · még ${sols} Sol emelt kockázat`, chainHint: 'A lánc megszakításához az okot kezeld, ne csak a legutóbbi tünetet.',
  },
  scoreAxes: {
    efficiency: { label: 'Hatékonyság', hint: 'Megtakarított erőforrás, kihasznált akciópont, tartalék Sol-ok' },
    risk: { label: 'Kockázatkezelés', hint: 'Elkerült hibák, kezelt válságok, a bizalom egyensúlya' },
    science: { label: 'Tudományos érték', hint: 'Mintaminőség, C-012 feltöltése, a jégtérkép pontossága' },
  },
  medals: { gold: 'Arany', silver: 'Ezüst', bronze: 'Bronz' },
  events: {
    storm: { label: 'Porvihar', counter: 'Túlélő üzemmód: pihenés és fogyasztáscsökkentés' },
    stormEnd: { label: 'A vihar elült', counter: '' },
    cold: { label: 'Éjszakai hideg', counter: 'Fűtés ma éjjel' },
    wear: { label: 'Kopás miatti hiba', counter: 'A sérült alkatrész cseréje' },
    commsLoss: { label: 'Kapcsolatkiesés', counter: 'A feltöltés áttervezése a következő ablakra' },
    wind: { label: 'Szélroham', counter: 'Az útvonal újraellenőrzése, tartalékidővel' },
    contamination: { label: 'Szennyeződés', counter: 'Steril előkészítés a következő mag előtt' },
    software: { label: 'Szoftverhiba', counter: 'Waypointok ellenőrzése haladás előtt' },
    badAdvice: { label: 'Hibás becslés', counter: '' },
    brownout: { label: 'Áramkimaradás', counter: 'Pihenés és töltés' },
    discovery: { label: 'Tudományos lehetőség', counter: 'Az új jel felmérése' },
    favorableWindow: { label: 'Kedvező relégeometria', counter: 'A bónuszablak kihasználása' },
    technology: { label: 'Új műveletek', counter: '' },
    dustLoad: { label: 'Porlerakódás a panelen', counter: 'Pihenés és panelrázás' },
    milestone: { label: 'Mérföldkő', counter: '' },
  },
  common: { sol: 'Sol', back: 'Vissza', you: 'TE', ap: 'AP', empty: 'Üres', language: 'Nyelv', min: 'perc' },
  topBar: { opsCommand: 'Műveleti Irányítás', lmst: 'LMST', phase: 'Fázis', lightTime: 'Egyirányú jelterjedési idő', delay: (n: number) => `Késés ${n} perc` },
  time: {
    aria: 'Időkezelés',
    pause: 'Szünet',
    resume: 'Folytatás',
    locked: 'Végrehajtás közben zárolva',
    playback: (s: number) => `${s}× lejátszás`,
  },
  camera: { label: 'Kamera', mode: 'Kameramód', site: 'Helyszín', tactical: 'Taktikai', rover: 'Rover', zoomIn: 'Nagyítás', zoomOut: 'Kicsinyítés' },
  advisor: {
    aria: (code: string) => `${code} tanácsadó`,
    trust: 'Bizalom',
    trustAria: 'Tanácsadói bizalom',
    band: { high: 'Magas', normal: 'Normál', low: 'Alacsony' },
    alternative: 'Alternatíva · magas bizalom',
    est: 'Becslés:',
    lowConfidence: 'Bizonytalan becslés',
    accept: (n: number) => `Elfogad · ${n} AP`,
    accepted: 'Elfogadva',
    ignored: (n: number) => `${n} Sol óta mellőzve · a bizalom gyorsabban csökken`,
    proposals: (sol: number) => `Tanácsadói javaslatok · ${sol}. Sol`,
  },
  pillarsHud: { aria: 'Habitat Zero pillérek', title: 'Habitat Zero', solsLeft: (n: number) => `${n} Sol a Perihelionig`, certified: 'Minősítve' },
  dock: {
    aria: 'Parancssor',
    title: (sol: number) => `${sol}. Sol parancssora`,
    executes: (n: number) => `Sorrendben fut le ${n} perc után`,
    apAria: (used: number, total: number) => `${total} akciópontból ${used} felhasználva`,
    safeModePenalty: '−2 safe mód',
    rest: '3 Sol pihenés',
    restTitle: 'Legfeljebb 3 tétlen Sol pihenéssel és fűtéssel. Piros eseménynél megáll.',
    safe: 'Safe',
    auto: 'Auto',
    safeTitle: 'Biztonsági tartalék: felezi a hiba- és kopásesélyt. 1 AP-be kerül.',
    send: 'Parancs küldése',
    queueAria: 'Sorban álló parancsok',
    paletteAria: 'Parancs hozzáadása',
    moveEarlier: (l: string) => `${l} előrébb`,
    moveLater: (l: string) => `${l} hátrébb`,
    remove: (l: string) => `${l} törlése`,
    empty: 'Fogadj el tanácsadói javaslatot, vagy adj hozzá parancsot alább.',
    battery: (n: number) => `akkumulátor ${n > 0 ? '−' : '+'}${Math.abs(n)}%`,
    apCost: (n: number) => `${n} AP`,
    unlocks: (sol: number) => `A(z) ${sol}. Sol-on nyílik meg`,
  },
  checklist: {
    title: 'Küldés előtti ellenőrzőlista',
    arrives: (n: number) => `${n} perc múlva érkezik · elküldés után nem hívható vissza.`,
    back: 'Vissza a tervhez',
    sendAnyway: 'Küldés mégis',
  },
  feed: {
    aria: 'Úton lévő parancssor',
    transit: 'A jel úton van a Mars felé',
    night: 'Éjszaka a Marson · a telemetria lezárul',
    executing: 'Végrehajtás a Marson · a parancsok nem hívhatók vissza',
    arrives: (m: number, d: number) => `Kb. ${m} perc múlva érkezik (${d} perces jelidő)`,
    nightSub: 'A hő- és energiaesemények az éjszaka dőlnek el',
    step: (i: number, n: number) => `${i}. lépés / ${n}`,
    paused: ' · szüneteltetve',
    idle: 'Tétlen Sol · nincs parancs',
    skipped: 'Kihagyva',
    success: 'Sikeres',
    failed: 'Sikertelen',
  },
  navigation: {
    title: 'Navigáció · Út a Delta Ridge-hez',
    routeAria: (pct: number) => `Az útvonal ${pct} százaléka teljesítve`,
    landing: 'LESZÁLLÓHELY',
    ridge: 'DELTA RIDGE · C-012',
    radarRange: 'Radar-hatótáv',
    drillRange: 'Fúrási hatótáv',
    remaining: 'Hátralévő',
    drivesLeft: 'Hátralévő út',
    perDrive: 'Haladásonként',
    wheels: 'Kerekek állapota',
    wear: 'Terepkopási szorzó',
    verified: 'A waypointok ellenőrizve a következő haladáshoz.',
    unverified: 'A következő haladás ellenőrizetlen waypointokat használ. Előbb adj hozzá Navigációt, hogy elkerüld a safe módot.',
  },
  science: {
    custody: 'C-012 · mintakezelési lánc',
    candidate: 'Biosignature-jelölt',
    steps: {
      selected: { label: 'Célpont kijelölve', hint: 'Koordináták és tudományos cél rögzítve' },
      surveyed: { label: 'Helyszín felmérve', hint: 'Terep- és szennyeződési környezet rögzítve' },
      spectrographed: { label: 'Spektroszkópia kész', hint: 'Agyag-, szulfát- és karbonátjel azonosítva' },
      sampled: { label: 'Minta begyűjtve', hint: 'A mag a mintavevő karban' },
      sealed: { label: 'Tubus lezárva', hint: 'A C-012 steril tárolásban' },
      checked: { label: 'Épség ellenőrizve', hint: 'Szennyeződés és minőség rögzítve' },
      analyzed: { label: 'Fedélzeten elemezve', hint: 'A szervesanyag-vizsgálat kész' },
      packetReady: { label: 'Csomag előkészítve', hint: '900 MB-os hitelesített adat várakozik' },
      uplinked: { label: 'Adat a Földön', hint: 'Leküldve a DSN-ablakokon át' },
    },
    tubes: 'Tubusok', voided: 'Érvénytelen', tool: 'Eszköz', sterile: 'Steril', notPrepped: 'Nincs előkészítve',
    quality: 'Minőség', storage: 'Tárolás', mineralogy: 'Ásványtan', selectedSol: 'Kijelölve', collectedSol: 'Begyűjtve', pending: 'Folyamatban',
    storageValues: { uncollected: 'Nincs begyűjtve', arm: 'Mintavevő kar', tube: 'Zárt tubus', cache: 'Tudományos tároló' },
    ice: 'Jégfelmérés · Víz pillér', coverage: 'Radarlefedettség', cores: 'Megerősítő magok', bit: 'Fúrófej',
    bitValue: (pct: number, n: number) => `${pct}% · ${n} tartalék`,
    note: (s: number, d: number) => `A radar az útvonal ${s}%-ától működik; a fúráshoz ${d}% és 60% feletti térkép kell. A minősítéshez a jégtérképnek a Földre kell érnie.`,
    delivered: ' A jégtérkép leküldve.',
  },
  systems: {
    power: 'Energia · Habitat Zero farm',
    farm: (f: number, r: number) => `Farm ${f} W · RTG ${r} W`,
    storm: (n: number) => ` · vihar −${n}%`,
    stable: 'Stabil',
    sols: (a: number, b: number) => `${a}/${b} Sol`,
    toward: 'A minősítésig',
    rover: 'Rover-állapot · ARES-1',
    battery: 'Akkumulátor',
    wheels: 'Kerekek',
    drill: 'Fúró',
    dust: 'Panelpor',
    night: (t: number) => `Éjjel kb. ${t} °C-ig hűl. Fűtés nélkül ~15% merül és hidegkár fenyeget; a fűtés ~6%-ba kerül.`,
    brownout: ' Egy áramkimaradás már volt — a következő végzetes.',
    inventory: 'Készlet',
  },
  inventory: { drillBits: 'Fúrófejek', tubes: 'Mintatubusok', spares: 'Pótalkatrészek', solarKits: 'Napelemkészletek', relayKits: 'Reléelemek' },
  comms: {
    windows: (sol: number) => `Mai ablakok · ${sol}. Sol`,
    capacity: (mb: number) => `${mb} MB kapacitás`,
    listAria: 'Kommunikációs ablakok',
    notBuilt: 'Nincs megépítve',
    noPass: 'Nincs áthaladás',
    axisEnd: '24 LMST',
    storm: 'A porvihar felezi az ablakok kapacitását.',
    queue: 'Adatsor',
    waiting: (mb: number) => `${mb} MB vár`,
    queueEmpty: 'Nincs várakozó adat. Az elemzett minták és a kész jégtérképek itt jelennek meg.',
    relay: 'Relé és DSN-lánc · Kommunikáció pillér',
    tower: 'Relétorony',
    towerValue: (pct: number, n: number) => `${pct}% · ${n} elem`,
    unbroken: 'Megszakítás nélküli kapcsolat',
    note: (d: number) => `Mai egyirányú jelidő: ${d} perc. A sorozat csak a torony felállása után számít; bármilyen kapcsolatkiesés nullázza.`,
  },
  eventsLog: { none: 'Még nincs esemény.', counter: (label: string, short: string) => `Ellenlépés: ${label} (${short})`, chain: (n: number) => `Eseménylánc ${n}. következménye` },
  reports: {
    score: 'Aktuális pontszám',
    records: 'Rekordok',
    of: '3000-ből · minden Sol végén frissül',
    pace: 'Tempó',
    log: 'Sol-napló',
    rested: (n: number) => ` · ${n} Sol pihenés`,
    ok: (a: number, b: number) => `${a}/${b} sikeres`,
    alerts: (n: number) => ` · ${n} riasztás`,
    missionLearning: 'Küldetési tanulságok',
    discoveries: 'Felfedezések',
    chains: 'Megszakított láncok',
    justified: 'Indokolt döntések',
    empty: 'A jelentések az első Sol után jelennek meg.',
    events: 'Események',
  },
  settings: {
    slots: 'Mentési helyek',
    offline: 'Ezen az eszközön tárolva · offline is működik',
    permadeath: (n: number) => `Permadeath játék · a(z) ${n}. helyhez kötve. A betöltés tiltva.`,
    slot: (n: number) => `${n}. hely`,
    current: 'aktuális',
    ended: ' · befejezett',
    save: 'Mentés',
    load: 'Betöltés',
    console: 'Konzol',
    sound: 'Hangjelzések',
    haptics: 'Rezgés',
    glass: 'Világos matt üveg',
    language: 'Felület nyelve',
    quit: 'Mentés és vissza a címképernyőre',
  },
  leaderboard: {
    title: 'Személyes rekordok',
    subtitle: 'Helyi eredménylista · nehézség és régió szerint',
    all: 'Mind',
    diffAria: 'Szűrés nehézségre',
    regionAria: 'Szűrés régióra',
    headers: ['#', 'Pont', 'Érem', 'Eredmény', 'Nehézség', 'Régió', 'Sol'],
    certified: 'Minősítve',
    lost: 'Elvesztve',
    pd: 'PD',
    empty: 'Még nincs befejezett küldetés. Minősítsd a Habitat Zerót egy rekordért.',
  },
  titleScreen: {
    program: 'ARES Program · 2031',
    intro:
      'Te vagy a Missziófelelős. Minősítsd a Habitat Zerót az első legénységnek Sol 500 előtt — különben a Perihelion indulási ablaka 26 hónapra bezárul. Négy tanácsadó, korlátos akciópont, és egy jel, amely percekig utazik.',
    continue: 'Folytatás',
    newMission: 'Új küldetés',
    leaderboard: 'Eredménylista',
    others: 'További mentések',
    slotSol: (slot: number, sol: number) => `${slot}. hely · ${sol}. Sol`,
    footer: 'Egyjátékos · a mentések ezen az eszközön maradnak · offline is játszható',
  },
  setup: {
    title: 'Új küldetés',
    subtitle: 'A cél mindig ugyanaz: minősítsd a Habitat Zerót Sol 500-ig.',
    difficulty: 'Nehézség',
    apDelay: (ap: number, a: number, b: number) => `${ap} AP · késés ${a}–${b} perc`,
    permadeath: 'Permadeath',
    permadeathHint: ' · egy mentési hely, nincs újratöltés, vereségkor törlődik',
    region: 'Leszállási régió',
    nights: (t: number, c: string) => `Éjjel ${t} °C · ${c}`,
    slot: 'Mentési hely',
    slotUsed: (sol: number) => `${sol}. Sol · felülíródik`,
    overwrite: (n: number) => `A(z) ${n}. helyen van mentés — az indítás felülírja.`,
    begin: 'Sol 1 indítása',
  },
  report: {
    received: 'Telemetria megérkezett',
    title: (sol: number) => `${sol}. Sol jelentése`,
    rested: (n: number) => ` · ${n} Sol pihenés`,
    score: 'pont · tempó',
    sequence: (a: number, b: number) => `Parancssor · ${a}/${b} AP`,
    idle: 'Tétlen Sol.',
    night: (t: number) => `Éjszaka ${t} °C · `,
    heated: 'fűtés be',
    unheated: 'fűtés nélkül',
    battery: (a: number, b: number) => ` · akkumulátor ${a}% → ${b}%`,
    events: 'Események',
    quiet: 'Csendes Sol. Nincs rendellenesség.',
    pillars: 'Habitat Zero',
    trust: 'Tanácsadói bizalom',
    undo: 'Sol visszavonása',
    debrief: 'Küldetésértékelés',
    next: (sol: number) => `Tovább a(z) ${sol}. Sol-ra`,
    cmdsAria: 'Végrehajtott parancsok',
  },
  debrief: {
    certified: 'Habitat Zero minősítve',
    lost: 'A küldetés elveszett',
    winHead: 'A Perihelion indulhat.',
    lossHead: 'Az ablak nélkülünk zárul be.',
    final: 'Végső pontszám',
    rating: 'Minősítés',
    noRating: 'Nincs minősítés',
    pillars: 'Pillérek',
    faults: 'Hibák',
    permadeath: ' · permadeath',
    saved: ' · mentve a helyi rekordokba',
    toTitle: 'Címképernyő',
    records: 'Rekordok',
    newMission: 'Új küldetés',
  },
  drawer: { title: 'Küldetésadatok', battery: 'Akku', wheels: 'Kerekek', power: 'Energia', data: 'Adat', storm: 'Vihar', stormSols: (n: number) => `${n} Sol`, pillars: 'Pillérek' },
  missionData: { timeline: 'Küldetés idővonala', recent: 'Legutóbbi események', health: 'Rendszerállapot', inventory: 'Készlet' },
  timeline: { landing: 'Sol 1 · Leszállás', perihelion: (n: number) => `Sol ${n} · Perihelion`, empty: 'A mérföldkövek itt jelennek meg, ahogy eléred őket.' },
  stage: {
    roverKind: 'Rover',
    ridge: 'Delta Ridge',
    ridgeType: 'Rétegzett üledék · C-012 · Célpont',
    view: (r: string) => `${r} élő terepnézet`,
    standby: 'Készenlét',
    awaiting: 'Feltöltésre vár',
    sleep: 'Éjszaka · alvó mód',
    safeMode: 'Safe mód',
    battery: (n: number) => `Akkumulátor ${n}%`,
  },
  layout: { leftCommand: 'NAV és SCI tanácsadók', leftView: 'Nézetpanel', rightCommand: 'SYS és COMM tanácsadók', rightView: 'Tanácsadók', advisors: 'Tanácsadók' },
  toast: {
    noAp: (n: number) => `Elfogyott az akciópont · ${n} ezen a Sol-on`,
    needsAp: (n: number, left: number) => `${n} AP kell · ${left} maradt`,
    safeNeedsAp: 'A Safe tartalékhoz 1 szabad akciópont kell',
    started: 'Sol 1 · az ARES-1 várja az első parancssorodat',
    slotEmpty: 'A mentési hely üres vagy olvashatatlan',
    loaded: (n: number, sol: number) => `${n}. hely betöltve · ${sol}. Sol`,
    saved: (n: number) => `Mentve a(z) ${n}. helyre`,
    saveFailed: 'Mentés sikertelen · a tárhely nem elérhető',
    commandLocked: 'Ez a művelet a jelenlegi felvonásban még nem elérhető.',
    restored: (sol: number) => `${sol}. Sol visszaállítva · a parancssor újra szerkeszthető`,
  },
  msg: messages({
    stepSkipped: (p) => `${cmd(p)} kihagyva`,
    safeModeNoResponse: () => 'A rover safe módban · nem válaszol',
    stepRefused: (p) => `${cmd(p)} elutasítva`,
    batteryFloor: (p) => `Akkumulátor ${p.battery}% · a ${p.floor}%-os küszöb alatt`,
    driveSkipped: () => 'Haladás kihagyva',
    atRidge: () => 'Már a Delta Ridge-nél áll',
    softwareFault: () => 'Szoftverhiba · safe mód',
    badUpload: () => 'Ellenőrizetlen waypoint-feltöltés elutasítva',
    driveDone: () => 'Haladás kész',
    driveDetail: (p) => `+${p.m} m · útvonal ${p.pct}%`,
    waypointsVerified: () => 'Waypointok ellenőrizve',
    waypointsVerifiedDetail: () => 'A következő haladás ellenőrzött útvonalat tölt fel',
    surveyOutOfRange: () => 'Felmérés hatótávon kívül',
    surveyRange: (p) => `A radarhoz legalább ${p.pct}%-os útvonal kell`,
    surveyRedundant: () => 'Felesleges felmérés',
    iceMapComplete: () => 'A jégtérkép már kész',
    surveyDone: () => 'Radaros pásztázás kész',
    iceMapPct: (p) => `Jégtérkép ${p.pct}%`,
    drillOutOfRange: () => 'Fúrás hatótávon kívül',
    drillRange: () => 'Menj közelebb a jégcélpontokhoz',
    drillRefused: () => 'Fúrás elutasítva',
    drillMapLow: () => 'A jégtérkép 60% alatt · nincs biztos célpont',
    drillUnavailable: () => 'A fúró nem elérhető',
    noBits: () => 'Elfogytak a fúrófejek',
    iceCoreLost: () => 'Jégmag elveszett',
    bitFailure: () => 'Fúrófejhiba fúrás közben',
    iceCoreOk: () => 'Jégmag megerősítve',
    coresCount: (p) => `Magok ${p.n}/${p.max}`,
    targetOutOfRange: () => 'A C-012 célpont nincs hatótávban',
    targetNeedsRidge: () => 'Előbb érd el a Delta Ridge végső megközelítését',
    targetAlreadySelected: () => 'A C-012 már regisztrálva van',
    sampleStageDetail: () => 'Folytasd a jelenlegi mintakezelési lépést',
    targetSelected: () => 'C-012 célpont kijelölve',
    targetSelectedDetail: () => 'Koordináták, környezet és tudományos cél rögzítve',
    surveyNeedsTarget: () => 'Nincs felmérhető regisztrált célpont',
    selectTargetFirst: () => 'A helyszín felmérése előtt jelöld ki a C-012-t',
    siteSurveyDone: () => 'Mintaterület felmérve',
    siteSurveyDetail: (p) => `Terepi környezet rögzítve · mérési minőség ${p.quality}%`,
    spectroscopyBlocked: () => 'A spektroszkópia még nem indítható',
    surveyFirst: () => 'Előbb mérd fel a mintaterületet',
    spectroscopyDone: () => 'Távoli spektroszkópia kész',
    spectroscopyDetail: () => 'Agyag-, szulfát- és karbonátjel azonosítva',
    prepDone: () => 'Steril előkészítés kész',
    prepDetail: () => 'A magfúró megtisztítva és kalibrálva',
    sampleOutOfReach: () => 'A minta nem elérhető',
    c012AtRidge: () => 'A C-012 a Delta Ridge-nél van',
    sampleNotReady: () => 'A C-012 még nem gyűjthető be',
    spectroscopyFirst: () => 'A tubus felhasználása előtt végezd el a távoli spektroszkópiát',
    noTubes: () => 'Nincs mintatubus',
    inventoryEmpty: () => 'A készlet üres',
    c012Contaminated: () => 'A C-012 mag szennyeződött',
    tubeVoided: (p) => `Tubus érvénytelenítve · ${p.n} maradt`,
    c012Collected: () => 'C-012 mag begyűjtve',
    sealBlocked: () => 'A minta nem zárható le',
    validSampleNeeded: () => 'Érvényes magnak kell lennie a mintavevő karban',
    c012Sealed: () => 'C-012 lezárva',
    sampleStored: () => 'A tubus steril tudományos tárolóba zárva',
    tubesLeft: (p) => `${p.n} tubus maradt`,
    checkBlocked: () => 'Az épségellenőrzés még nem indítható',
    sealFirst: () => 'Előbb zárd le a C-012-t',
    sampleChecked: () => 'A C-012 épsége ellenőrizve',
    sampleCheckedDetail: (p) => `Nincs szennyeződés · minőség ${p.quality}%`,
    nothingToAnalyze: () => 'Nincs mit elemezni',
    checkFirst: () => 'Előbb végezd el a szennyeződés-ellenőrzést',
    c012Analyzed: () => 'C-012 elemezve',
    analysisDetail: (p) => `Szervesanyag-vizsgálat kész · mintaminőség ${p.quality}%`,
    packetBlocked: () => 'A tudományos csomag még nem készíthető el',
    analyzeFirst: () => 'Előbb elemezd az ellenőrzött mintát',
    packetPrepared: () => 'C-012 tudományos csomag elkészült',
    packetQueued: () => '900 MB-os csomag vár a Földre küldésre',
    uplinkFailed: () => 'Feltöltés sikertelen',
    noAos: () => 'Nincs jelvétel',
    uplinkDone: () => 'Feltöltés kész',
    delivered: (p) => `Leküldve: ${String(p.kinds).split(',').map((k) => packets[k as keyof typeof packets] ?? k).join(', ')}`,
    partial: (p) => `Részleges · ${p.mb} MB maradt`,
    routine: () => 'Rutin telemetria',
    noSolarKits: () => 'Nincs napelemkészlet',
    solarDeployed: () => 'Napelemkészlet telepítve',
    farmInstalled: (p) => `A farm ${p.w} W beépítve`,
    relayComplete: () => 'A relé kész',
    nothingToBuild: () => 'Nincs mit építeni',
    noRelay: () => 'Nincs reléelem',
    relayRaised: () => 'Reléelem felállítva',
    towerPct: (p) => `Torony ${p.pct}%`,
    heatScheduled: () => 'Fűtés beütemezve',
    heatDetail: () => 'A túlélési fűtés élesítve ma éjjelre',
    noSpares: () => 'Nincs pótalkatrész',
    wheelSwapped: () => 'Kerékmodul kicserélve',
    wheelsPct: (p) => `Kerekek ${p.pct}%`,
    drillServiced: () => 'Fúró szervizelve',
    drillPct: (p) => `Fúró ${p.pct}%`,
    rested: () => 'Pihent és töltött',
    batteryGain: (p) => `Akkumulátor +${p.n}%`,
    badTerrain: (p) => `${p.code} terepbecslése hibás volt`,
    badTerrainDetail: () => 'Durvább terep a vártnál · kerekek −12%',
    badPower: (p) => `${p.code} energiabecslése hibás volt`,
    badPowerDetail: () => 'A művelet többet fogyasztott a vártnál · akkumulátor −8%',
    safeModeEntered: () => 'Safe módba lépett',
    safeModeDetail: () => 'Egy hibás waypoint-feltöltés safe módba vitte a rovert. A további parancsok elvesztek; a következő Sol-on 2-vel kevesebb akciópont jár.',
    windHalt: () => 'Szélroham állította meg a haladást',
    windHaltDetail: () => 'Az autonavigáció félúton megállt · csak a táv fele teljesült',
    wheelCrack: () => 'Megrepedt a kerékfutófelület',
    wheelCrackDetail: () => 'Sziklás szakasz · kerekek −15%',
    arrivedRidge: () => 'Megérkezett a Delta Ridge-hez',
    arrivedRidgeDetail: () => 'A rétegzett üledék elérhető · a C-012 célpont hatótávon belül',
    bitBroke: () => 'Eltört a fúrófej',
    bitSwapped: () => 'Fúrófej cserélve a készletből · a mag elveszett',
    noBitsLeft: () => 'Nem maradt tartalék fúrófej',
    contaminated: () => 'A minta szennyeződött',
    contaminatedDetail: () => 'Földi eredetű szerves anyag a tubusban. A mag érvénytelen.',
    c012SealedDetail: () => 'A biosignature-jelölt tisztán mintázva',
    linkLoss: () => 'Kapcsolatkiesés',
    linkLossDetail: () => 'A DSN-áthaladás megszakadt. Az adat a fedélzeten marad; a kapcsolati sorozat nullázódik.',
    c012OnEarth: () => 'A C-012 adatai a Földön',
    c012OnEarthDetail: () => 'A JPL megkapta a biosignature-eredményeket',
    relayOnline: () => 'A relétorony üzemel',
    relayOnlineDetail: () => 'Holnaptól hosszú napi ablak nyílik',
    coldSoak: (p) => `Kihűlés · ${p.t} °C`,
    coldSoakWheels: () => 'Fűtetlen éjszaka · kerékaktuátorok −8%',
    coldSoakDrill: () => 'Fűtetlen éjszaka · fúrómotor −12%',
    brownout: () => 'Éjszakai áramkimaradás',
    brownoutSecond: () => 'Második egymást követő áramkimaradás',
    brownoutFirst: () => 'A rover hajnalban újraindult. Egy újabb kimaradás végzetes lehet.',
    stormCleared: () => 'A porvihar elült',
    stormClearedDetail: () => 'A napenergia és a kapcsolat minősége helyreáll',
    stormIncoming: () => 'Porvihar közeledik',
    stormIncomingDetail: (p) => `Várhatóan ${p.n} Sol · gyengébb napenergia és kapcsolat`,
    dustLoadEvent: () => 'Por gyűlik a rover fedélzetén',
    dustLoadDetail: (p) => `Paneltakarás ${p.pct}% · holnap alacsonyabb töltés várható`,
    unexpectedDiscovery: () => 'Váratlan felszín alatti jel',
    unexpectedDiscoveryDetail: () => 'Egy sekély jéglencse 8% radarlefedettséget és új felmérési lehetőséget ad.',
    favorableWindow: () => 'Váratlan reléablak',
    favorableWindowDetail: (p) => `Az orbiter geometriája ${p.mb} MB-ot vitt le · ${p.packets}`,
    actUnlocked: (p) => `${({ discovery: 'Felfedezés', expansion: 'Terjeszkedés', survival: 'Túlélés', finalApproach: 'Végső megközelítés' } as Record<string, string>)[String(p.act)] ?? p.act} műveletei feloldva`,
    actUnlockedDetail: (p) => `A kampány új műveleti felvonásba lépett a(z) ${p.sol}. Sol-on. Új eljárások és kockázatok aktívak.`,
    missionStart: () => 'Küldetés indul · az ARES-1 a felszínen',
    missionStartDetail: () => 'Minősítsd a Habitat Zerót Sol 500-ig, mielőtt a Perihelion ablaka bezárul.',
    winReason: (p) => `Habitat Zero minősítve a(z) ${p.sol}. Sol-on`,
    lossWheels: () => 'Az ARES-1 mozgásképtelen · a kerekek tönkrementek',
    lossBrownouts: () => 'Az ARES-1 elveszett ismételt áramkimaradások után',
    lossC012: () => 'A C-012 minta végleg elveszett · nincs több tubus',
    lossDeadline: () => 'Elérkezett a Sol 500 · a Perihelion ablaka bezárult',
    navDriveVerified: () => 'Haladás az ellenőrzött úton',
    navDriveVerifiedWhy: () => 'A waypointok ellenőrizve. Menjünk a hosszú, biztonságos úton a Delta Ridge felé.',
    navVerifyDrive: () => 'Waypointok ellenőrzése, majd haladás',
    navVerifyDriveWhy: () => 'A biztonságos út hosszabb, de egy ellenőrizetlen feltöltés safe módba vihet.',
    navDriveTruth: (p) => `${p.km} km van hátra · hibakockázat ${p.verified ? 'alacsony' : 'ellenőrzés után nincs'}`,
    navDriveNoisy: (p) => `${p.km} km van hátra · elhanyagolható kockázat`,
    navDoubleLeg: () => 'Dupla szakasz a gerinc felé',
    navDoubleLegWhy: () => 'Ma két haladási szakasz. Meríti az akkut és koptatja a kerekeket, de felezi az utat.',
    navDoubleLegTruth: () => 'Kerékkopás ×2 · akkumulátor −24%',
    navDoubleLegNoisy: () => 'Minimális kerékkopás',
    navHoldRidge: () => 'Maradjunk a Delta Ridge-nél, pásztázzuk a lejtőket',
    navHoldRidgeWhy: () => 'Megérkeztünk. Bővítsük a radar lefedettségét, mielőtt fúrunk.',
    coverageChange: (p) => `Lefedettség ${p.from}% → ${p.to}%`,
    coveragePlus: (p) => `Lefedettség +${p.n}%`,
    sciSelectTarget: () => 'A C-012 elsődleges célpontként rögzítése',
    sciSelectTargetWhy: () => 'A rétegzett gerinc hatótávban van. Rögzítsük a koordinátákat a műszerek bevetése előtt.',
    sciSiteSurvey: () => 'A C-012 helyszínének vizsgálata',
    sciSiteSurveyWhy: () => 'A terep- és porkörnyezet határozza meg, lehetséges-e tiszta mintát venni.',
    sciSpectroscopy: () => 'A C-012 ásványtanának meghatározása',
    sciSpectroscopyWhy: () => 'A távoli spektrum igazolhatja a célpontot, mielőtt felhasználunk egy ritka tubust.',
    scienceStageEstimate: (p) => `Mintakezelési szint ${p.n}/${p.total}`,
    scienceQualityEstimate: (p) => `Várható mérési minőség ${p.quality}%`,
    sampleQualityEstimate: (p) => `Rögzített mintaminőség ${p.quality}%`,
    scienceEstimateUncertain: () => 'A környezeti becslés bizonytalan',
    sciCoreNow: () => 'C-012 mintázása most',
    sciCoreNowWhy: () => 'A biosignature-jelölt elérhető. Minden várakozó Sol újabb viharkockázat.',
    contamRisk: (p) => `Szennyeződési kockázat ${p.sterile ? 'alacsony' : 'magas előkészítés nélkül'}`,
    contamLow: () => 'Alacsony szennyeződési kockázat',
    sciPrepCore: () => 'Előkészítés, majd C-012 mintázása',
    sciPrepCoreWhy: () => 'Előbb steril előkészítés. Lassabb, de egy szennyezett tubus végleg elveszett.',
    contamFive: () => 'Szennyeződési kockázat ~5%',
    sciSealSample: () => 'A C-012 steril tubusba zárása',
    sciSealSampleWhy: () => 'A mag a karban van. Zárjuk le, mielőtt mozgás vagy por veszélyezteti a mintaláncot.',
    sciCheckSample: () => 'A C-012 épségének ellenőrzése',
    sciCheckSampleWhy: () => 'Ellenőrizzük a szennyeződést, majd tegyük a tubust a védett tárolóba.',
    sciAnalyze: () => 'A C-012 fedélzeti elemzése',
    sciAnalyzeWhy: () => 'Az ellenőrzött tubus készen áll a szervesanyag- és ásványtani elemzésre.',
    sciPreparePacket: () => 'C-012 tudományos termék készítése',
    sciPreparePacketWhy: () => 'Csomagoljuk össze az elemzést, a környezetet és a mintakezelési naplót földi hitelesítésre.',
    sciAwaitUplink: () => 'A C-012 eredményeinek leküldése',
    sciAwaitUplinkWhy: () => 'A hitelesített csomag kész. Használjunk tiszta DSN- vagy orbiterablakot.',
    packetMb: (p) => `${p.mb} MB-os adatcsomagot hoz létre`,
    sciDrill: () => 'Megerősítő jégmag fúrása',
    sciDrillWhy: () => 'A radar erős visszaverődést mutat. Egy mag a térképből megerősített készletet csinál.',
    drillWear: (p) => `Fúrófej ${p.pct}% · kopás −18%`,
    drillWearLow: () => 'Elhanyagolható fúrókopás',
    sciSurvey: () => 'Radaros pásztázás jég után',
    sciSurveyWhy: () => 'A gerinc radar-hatótávján belül vagyunk. Minden pásztázás élesíti a jégtérképet.',
    surveyTruth: () => 'Lefedettség +20% · akkumulátor −8%',
    sciDirect: () => 'Egyenesen a gerinchez',
    sciDirectWhy: () => 'Hagyjuk a kerülőt. A tudományos ablak nem vár a NAV-ra.',
    waypointsOk: () => 'Waypointok ellenőrizve',
    waypointsRisk: () => 'Ellenőrizetlen waypointok · hibakockázat',
    faultLow: () => 'Alacsony hibakockázat',
    sysSurvival: () => 'Túlélő üzemmód, amíg el nem ül a vihar',
    sysSurvivalWhy: () => 'A napenergia megbénult. Pihenés, fűtés és az akkumulátor védelme.',
    sysRecharge: () => 'Leállás és töltés',
    sysRechargeWhy: () => 'Alacsony az akkumulátor. Egy hideg éjszaka ezzel a töltéssel áramkimaradást kockáztat.',
    batteryChange: (p) => `Akkumulátor ${p.from}% → ~${p.to}%`,
    batteryFine: (p) => `Az akkumulátor rendben, ${p.n}%`,
    sysSwapWheel: () => 'A kopott kerékmodul cseréje',
    sysReplaceBit: () => 'A fúrófej cseréje',
    sysRepairWhy: () => 'A kopás átlépte a komfortszintet. Egy terepi hiba sokkal több Sol-ba kerül.',
    wearTruth: (p) => `Kerekek ${p.w}% · fúró ${p.d}%`,
    wheelsNoisy: (p) => `Kerekek ${p.w}%`,
    sysSolar: () => 'Napelemkészlet telepítése',
    sysSolarWhy: () => 'Minden panel közelebb visz a stabil 400 W-hoz.',
    wattChange: (p) => `${p.from} W → ${p.to} W`,
    sysHeat: () => 'Fűtés ma éjjel',
    sysHeatWhy: (p) => `Éjszakai minimum kb. ${p.t} °C. Most fűteni jobb, mint kihűlni.`,
    heatTruth: () => 'Akkumulátor −6% éjjel −15% helyett',
    heatNoisy: () => 'A fűtés felesleges',
    commUplink: () => 'Feltöltés a mai ablakokban',
    commUplinkWhy: (p) => `${p.mb} MB vár. A mai áthaladások kb. ${p.cap} MB-ot visznek.`,
    capacity: (p) => `${p.mb} MB kapacitás`,
    commRelay: () => 'A következő reléelem felállítása',
    commRelayWhy: () => 'A relé hosszú napi ablakot és megszakítás nélküli DSN-láncot ad.',
    towerChange: (p) => `Torony ${p.from}% → ${p.to}%`,
    towerNoisy: () => 'Ezzel az elemmel kész a torony',
    commHold: () => 'Sávszélesség tartása, tiszta kapcsolat',
    commHoldWhy: () => 'Nincs sürgős küldenivaló. Egy rutin telemetriás áthaladás melegen tartja a DSN-láncot.',
    conflictSciSys: () => 'A SCI dolgozna a célponton — a SYS pihenést kér',
    conflictSciNav: () => 'A SCI az egyenes utat akarja — a NAV ellenőrzött waypointokat',
    conflictSciComm: () => 'A SCI nagy csomagot ad hozzá — a COMM ablaka szűk',
    chkEmpty: () => 'Üres parancssor · a rover ezen a Sol-on tétlen',
    chkWaypoints: () => 'A haladás ellenőrizetlen waypointokat használ · safe-mód kockázat',
    chkSterile: () => 'Mintavétel steril előkészítés nélkül · magas szennyeződési kockázat',
    chkBatteryLow: (p) => `Akkumulátor ~${p.pct}% hajnalra${p.heated ? '' : ' · fűtés nélkül'}`,
    chkBatteryOk: (p) => `Akkumulátor ~${p.pct}% hajnalra`,
    chkUplinkPartial: (p) => `Az ablakok ${p.cap} MB-ot visznek · ${p.need} MB vár · részleges küldés`,
    chkUplinkOk: (p) => `A feltöltés belefér a mai ablakokba · ${p.cap} MB`,
    chkStorm: () => 'Vihar van · fontold meg a Safe tartalékot',
  }),
};

```
```contexts/LanguageContext.tsx
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { en } from '../data/i18n/en';
import { hu } from '../data/i18n/hu';
import type { Dict, Lang, Msg } from '../types/i18n';

interface LanguageValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  /** Renders language-neutral game text. */
  f: (m: Msg | string) => string;
}

const STORAGE_KEY = 'aether.lang';
const dicts: Record<Lang, Dict> = { en, hu };

const LanguageContext = createContext<LanguageValue | null>(null);

function initialLang(fallback: Lang): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'hu') return saved;
  } catch {
    /* storage unavailable */
  }
  return fallback;
}

export function LanguageProvider({ defaultLang, children }: { defaultLang: Lang; children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => initialLang(defaultLang));

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageValue>(() => {
    const t = dicts[lang];
    return {
      lang,
      setLang,
      t,
      f: (m) => {
        if (typeof m === 'string') return m;
        const fn = t.msg[m.k];
        return fn ? fn(m.p ?? {}) : String(m.k);
      },
    };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useI18n must be used inside LanguageProvider');
  return ctx;
}

export const languages: { id: Lang; label: string; short: string }[] = [
  { id: 'en', label: en.name, short: en.short },
  { id: 'hu', label: hu.name, short: hu.short },
];

```
```components/shared/IconSwap.tsx
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { iconEnterTransition, iconExitTransition } from '../../utils/motion';

/** Cross-fades between icons keyed by state (play ↔ pause, sun ↔ moon). */
export function IconSwap({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative grid place-items-center">
      <AnimatePresence mode="popLayout" initial={false}>
        {children}
      </AnimatePresence>
    </span>
  );
}

export const IconSwapItem = React.forwardRef<HTMLSpanElement, { children: React.ReactNode }>(function IconSwapItem({ children }, ref) {
  return (
    <motion.span
      ref={ref}
      className="grid place-items-center"
      initial={{ opacity: 0, scale: 0.6, filter: 'blur(2px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', transition: iconEnterTransition }}
      exit={{ opacity: 0, scale: 0.6, filter: 'blur(2px)', transition: iconExitTransition }}
    >
      {children}
    </motion.span>
  );
});

```
```components/shared/Dropdown.tsx
import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { exitTransition, menuEnterTransition, stagger } from '../../utils/motion';

export interface DropdownOption<T extends string> {
  value: T;
  label: string;
  hint?: string;
}

interface DropdownProps<T extends string> {
  label: string;
  value: T;
  options: DropdownOption<T>[];
  onChange: (v: T) => void;
  /** Text shown on the trigger; defaults to the selected option label. */
  display?: React.ReactNode;
  icon?: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

/** Accessible listbox dropdown: arrow keys move, Enter selects, Escape closes. */
export function Dropdown<T extends string>({ label, value, options, onChange, display, icon, align = 'right', className = '' }: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => Math.max(0, options.findIndex((o) => o.value === value)));
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('pointerdown', onDown);
    requestAnimationFrame(() => listRef.current?.focus());
    return () => window.removeEventListener('pointerdown', onDown);
  }, [open, options, value]);

  const choose = (v: T) => {
    onChange(v);
    setOpen(false);
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      choose(options[active].value);
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      e.stopPropagation();
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label={`${label}: ${selected?.label ?? ''}`}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-9 items-center gap-1.5 rounded-full px-2.5 text-[11.5px] font-[650] uppercase tracking-[0.1em] text-ink-2 transition-colors duration-150 hover:bg-fill-2 hover:text-ink"
      >
        {icon}
        {display ?? selected?.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={menuEnterTransition} className="grid place-items-center">
          <ChevronDownIcon size={13} strokeWidth={1.8} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={`${id}-list`}
            role="listbox"
            tabIndex={-1}
            aria-label={label}
            aria-activedescendant={`${id}-${active}`}
            onKeyDown={onListKey}
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: menuEnterTransition }}
            exit={{ opacity: 0, y: -2, scale: 0.98, transition: exitTransition }}
            className={`glass glass-strong absolute top-full z-50 mt-1.5 min-w-[168px] rounded-[14px] p-1 outline-none ${align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'}`}
          >
            {options.map((o, i) => {
              const on = o.value === value;
              return (
                <motion.li
                  key={o.value}
                  id={`${id}-${i}`}
                  role="option"
                  aria-selected={on}
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0, transition: { ...menuEnterTransition, delay: stagger(i) } }}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(o.value)}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-[12.5px] ${i === active ? 'bg-fill-2 text-ink' : 'text-ink-2'}`}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-[600]">{o.label}</span>
                    {o.hint && <span className="block text-[11px] text-ink-4">{o.hint}</span>}
                  </span>
                  {on && <CheckIcon size={13} strokeWidth={2.2} className="text-amber" />}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

```
```components/layout/LanguageSwitch.tsx
import React from 'react';
import { GlobeIcon } from 'lucide-react';
import { languages, useI18n } from '../../contexts/LanguageContext';
import type { Lang } from '../../types/i18n';
import { Dropdown } from '../shared/Dropdown';

export function LanguageSwitch({ align = 'right', className = '' }: { align?: 'left' | 'right'; className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <Dropdown<Lang>
      label={t.common.language}
      value={lang}
      onChange={setLang}
      align={align}
      className={className}
      icon={<GlobeIcon size={14} strokeWidth={1.6} />}
      display={languages.find((l) => l.id === lang)?.short}
      options={languages.map((l) => ({ value: l.id, label: l.label, hint: l.short }))}
    />
  );
}

```
```utils/msg.ts
import type { Msg, MsgKey, MsgParams } from '../types/i18n';

/** Builds language-neutral game text; rendered later with the active dictionary. */
export function m(k: MsgKey, p?: MsgParams): Msg {
  return p ? { k, p } : { k };
}

```
```docs/ARES-Operations-Command-Ja-te-klei-ra-s.md
# ARES: Operations Command – Játékleírás

Nov 1, 2026 · @Tuliop

## Egy mondatban

Az ARES: Operations Command egy prémium, böngészőben futó marsi küldetésirányítási játék, amelyben Missziófelelősként 500 Sol alatt kell eldöntened, hogy az emberiség leszállhat-e a Marson.

Nem rovert vezetsz, hanem egy egész küldetést: kutatást, energiát, kommunikációt és kockázatot egyszerre. Minden adat, amit a képernyőn látsz, egy valódi szimulációból jön, és minden döntésednek ára van.

| Elem | Leírás |
| --- | --- |
| Műfaj | stratégiai, erőforrás- és küldetésszimulátor |
| Játékmód | egyjátékos |
| Platform | asztali böngésző, másodlagosan mobil és tablet |
| Futás | kliensoldali, internetkapcsolat nélkül is játszható |
| Küldetés | a Habitat Zero minősítés megszerzése |
| Időkeret | Sol 1-500 |
| Hangulat | NASA ihlette irányítóközpont, sötét üvegfelület, a Mars panorámájával a középpontban |

## A fantázia

A játékos a Föld irányítótermében ül, és egy másik bolygó sorsáról dönt. A Marsot nem közvetlenül éli át: telemetriából, műholdképekből, tanácsadói jelentésekből és késve érkező visszajelzésekből rakja össze, mi történik odakint.

Ez a távolság adja a játék hangulatát. A játékos nem hős a terepen, hanem az, aki felelősséget vállal egy olyan döntésért, amelynek eredményét percekkel később látja csak.

A játékos feladatai a küldetés minden szintjén döntést kívánnak:

- merre induljon a rover, és mekkora kockázatot vállaljon az úton;
- milyen kutatást végezzen, és melyik célpontból vegyen mintát;
- hogyan gazdálkodjon az energiával, melegítsen vagy mozogjon;
- mikor és mit töltsön fel a szűk kommunikációs ablakokban.

A döntések hosszú távú következményekkel járnak. Aki ma lemond egy mérésről, hogy kíméli az akkumulátort, azt egy későbbi vihar idején fogja érezni.

## A történet és a tét

2031-ben az ARES Program a Jezero-kráterben dolgozik azon, hogy a Mars készen álljon az első emberi legénység fogadására. Az ARES-1 hatkerekű rover a Delta Ridge rétegzett üledékei felé tart, ahol egy orbiter szokatlan ásványi mintázatot mért. Ez egykori vízre és esetleg mikrobiális életre utal.

A **Perihelion** legénységi űrhajó indulási ablaka rögzített. Ha a landolási hely nincs minősítve Sol 500-ig, az ablak lezárul, és a következő csak 26 hónap múlva nyílik.

A küldetés célja a **Habitat Zero** minősítés, amelyhez négy pillér mindegyikét teljesíteni kell:

| Pillér | Követelmény |
| --- | --- |
| Víz | a felszín alatti jégkészlet feltérképezése és megerősítése |
| Energia | legalább 400 W stabil összesített termelés a napelemfarm és az RTG együttes működéséből |
| Kommunikáció | működő relétorony és igazoltan stabil DSN-kapcsolat |
| Tudomány | a C-012 mintatubus (biosignature-jelölt) sikeres földi továbbítása |

A játék nem elégszik meg egy százalékos mutatóval: minden pillér külön előfeltétel-listát és bizonyítékot kap, és a Sol 500 önmagában nem jelent győzelmet.

## A Sol-ciklus

A játék alapköre a Sol: egy marsi nap hat lépésben, amelyek ritmust adnak a tervezésnek, a várakozásnak és a következményeknek.

| Lépés | Mi történik | Mit érez a játékos |
| --- | --- | --- |
| 1. Mission Briefing | friss telemetria és az előző Sol eseményeinek összefoglalója | tájékozódik: mi változott, amíg nem figyelt |
| 2. Advisor Reports | a négy tanácsadó bemutatja a saját javaslatát | hallgatja a vitát, és kereszt-ellenőrzi az érveket |
| 3. Strategic Planning | kiválasztja a napi prioritásokat | mérlegel: mit ad fel azért, hogy másra jusson ereje |
| 4. Command Configuration | összeállítja a parancssort, ellenőrzi az erőforrásokat és a kockázatokat | tervez, és számol: elég az energia, belefér az ablakba |
| 5. Send Command | a parancs véglegesen elindul a Mars felé | a visszavonhatatlan pillanat |
| 6. Execution & Debrief | a műveletek végrehajtódnak, az események feldolgozásra kerülnek, lezárul a Sol | feszültség, majd a döntések következménye |

### Cselekvési pontok

Minden Sol meghatározott cselekvési pontot (AP) ad. A kiinduló javaslat napi 4 AP: egy egyszerű művelet 1 AP, egy komplex 2 AP, egy kritikus infrastruktúra-művelet 2-3 AP. A pontos értékeket a prototípus tesztelése alapján kell hangolni.

Egy parancs nem gombnyomás. Van célpontja, időigénye, AP-költsége, energiaigénye, szükséges készlete, előfeltétele, várható eredménye és kockázati értéke, és hibával is végződhet.

### Jelkésleltetés

A jel oda-vissza 4 és 24 perc között utazik. A játékos egyetlen parancscsomagot állít össze, amely az elküldés után véglegesen rögzül. A rover a beérkezés után hajtja végre. Ha közben új parancs születik, az csak egy későbbi kommunikációs ablakban érkezhet meg, és a vészparancsoknak is van késleltetésük.

### Időkezelés

A Sol a stratégiai kör. Az 1x, 5x és 20x sebesség csak a műveletek végrehajtásának és animációjának tempóját gyorsítja, így a küldetés ideje nem keveredik a felület sebességével.

## A négy tanácsadó

A játékosnak négy szakági vezető áll a rendelkezésére, és mindegyik a saját területét védi. Egyikük sem ad egyszerű szöveget: mindegyiknek saját szakmai modellje, prioritása, bizalmi értéke és döntési logikája van.

| Tanácsadó | Fő prioritás | Fő konfliktus |
| --- | --- | --- |
| NAV | biztonságos navigáció | SCI rövidebb útvonalat akar |
| SYS | energia és rendszerbiztonság | SCI nagy energiaigényű kutatást akar |
| SCI | tudományos eredmények | SYS tartalékot követel |
| COMM | adatátvitel és kapcsolat | SCI nagyobb adatcsomagokat küldene |

A játék feszültsége abból jön, hogy egyik javaslatot sem lehet mindig teljesíteni, és a játékos minden Sol-on választ: kinek ad igazat, és melyik terület fizeti meg az árát.

### Bizalom

Mindegyik tanácsadó 0 és 100 közötti bizalmi értéket kap.

| Bizalom | Hatás |
| --- | --- |
| 70-100 | pontosabb becslések, alternatív javaslatok |
| 30-69 | normál teljesítmény |
| 0-29 | bizonytalanabb becslések, gyengébb javaslatok |

A bizalom nem csak az elfogadott javaslatokon múlik. Aki indokoltan, a tanácsadó szakmai szempontjait figyelembe véve utasít el egy javaslatot, azzal is építheti a bizalmat. Aki viszont mindig csak egy tanácsadóra hallgat, annak a többi terület romlik.

### Offline és determinisztikus

Az első verzióban a tanácsadók szabályalapú, determinisztikus logikával működnek, ezért a játék internetkapcsolat nélkül is teljes értékű. Később opcionális generatív réteg természetesebb párbeszéddé alakíthatja a már kiszámított javaslatokat, de a játékállapotot és a szabályokat továbbra is a szimuláció határozza meg.

## Az élő Mars

A játék világa nem díszlet: a hőmérséklet, a légköri nyomás, a szél, a porindex, a napsugárzás, a napszak és a terep közvetlenül hat a rover mozgására, a napelemekre, az akkumulátorra, a kommunikációra és a tudományos mérésekre. A porviharok sem előzmény nélkül érkeznek: számít a régió, az aktuális időjárás, a korábbi események és a globális porviszonyok.

A kilenc modul eseményeken keresztül hat egymásra, ezért egyetlen környezeti változás láncreakciót indíthat el.

&#91;embedded content: eseménylánc · egy porvihar hat lépésben\]

Nem minden lánc büntet: az események váratlan tudományos felfedezést, új útvonalat, kedvező időjárási szakaszt vagy technológiai lehetőséget is hozhatnak. A játékos ellenintézkedésekkel megszakíthatja a láncot, például fogyasztókat kapcsolhat ki prioritás szerint.

## A tudományos kaland

A tudomány a történet szíve: itt dől el, hogy a Delta Ridge üledékei valóban egykori életről árulkodnak-e. Egy minta útja a felfedezéstől a Földig kilenc lépés, és mindegyiken el lehet rontani valamit.

1. Célpont kiválasztása.
2. Helyszíni felmérés.
3. Spektroszkópiai vizsgálat.
4. Fúrás vagy mintavétel.
5. Mintatubus lezárása.
6. Szennyeződés-ellenőrzés.
7. Elemzés.
8. Adatcsomag előkészítése.
9. Földre történő feltöltés.

Minden mintának egyedi azonosítója van, és a játék nyilvántartja a mintavételi helyet, a Sol-értéket, a típust, az ásványi összetételt, a minőségi besorolást, a szennyeződési és tárolási állapotot, az elemzési eredményt és a feltöltési állapotot.

A **C-012** a küldetés különleges objektuma: egy bioszignatúra-jelölt minta. Az elvesztése vagy szennyeződése kritikus következménnyel jár, és a játék a szennyezett mintát nem fogadja el érvényesként. Ezért a rossz mintavétel nem apró baki, hanem olyan döntés, amelyet a játékos napokig nyomon követ.

A tudomány nem csak teher. A váratlan felfedezések, új útvonalak és kedvező időjárási szakaszok jutalmazzák a kockázatvállalást.

## A négy felvonás

A 500 Sol négy fejezetre oszlik. Mindegyik új eseményeket, új műveleteket, nehezebb döntéseket és új technológiai lehetőségeket hoz, és más érzelmi hangsúlyt ad a küldetésnek.

| Fejezet | Sol | Fő cél | Hangsúly |
| --- | --- | --- | --- |
| I. Discovery | 1-100 | a rover és a környezet megismerése | kíváncsiság, tanulás |
| II. Expansion | 101-250 | erőforrások és infrastruktúra | építkezés, bővülő lehetőségek |
| III. Survival | 251-375 | stabil működés és veszélykezelés | nyomás, tartalékok kimerülése |
| IV. Final Approach | 376-500 | a négy pillér teljesítése | döntő pillanatok, számonkérés |

A hangsúly oszlop a tervezői szándékot rögzíti, a konkrét tartalom a balanszolás során véglegesedik.

A Sol 500 nem automatikusan győzelmet jelent. Az utolsó fejezet végén a játék minden kötelező feltételt külön ellenőriz, és csak az nyer, aki mindegyiket igazolni tudja.

## Élménytechnikák

A játék élvezetét tizenkét tudatosan tervezett technika adja. Mindegyik ugyanarra épül: a játékos döntése valódi, mérhető következménnyel jár.

| Technika | Hogyan működik | Mit ad a játékosnak |
| --- | --- | --- |
| Késleltetett következmény | a parancscsomagot előre kell programozni, a jel 4-24 percig utazik | tervezési mélység és kivárás feszültsége |
| Visszavonhatatlan pillanat | a Send Command után a csomag nem módosítható | a döntés súlya |
| Szűkös keret | napi cselekvési pontok, korlátos energia, készlet és sávszélesség | nincs tökéletes nap, mindig le kell mondani valamiről |
| Vitázó tanácsadók | a négy szakági vezető érdekei ütköznek | dilemma, nem kényelmes igen-nem választás |
| Bizalom mint tét | a tanácsadók pontossága a bizalom függvénye | hosszú távú kapcsolat, amit ápolni kell |
| Láncolt események | egy esemény több rendszerben okoz következményt | a világ egy rendszer, nem eseménylista |
| Nem csak büntetés | felfedezések, új útvonalak, kedvező időjárás, technológiai lehetőségek | a kockázatvállalásnak van jutalma |
| Informált kockázat | a parancsoknál és a waypointoknál látszik a távolság, az energiaigény és a kockázati érték | számolós, mégis izgalmas döntés |
| Kritikus tárgy | a C-012 mintát el lehet veszíteni vagy szennyezni | személyes tét egyetlen mintatubuson |
| Valódi műszerek | a kijelzett érték mind a szimulációból jön | a felület hiteles, a játékos megbízhat benne |
| Reprodukálható világ | seed-alapú események, azonos döntéssor azonos eredmény | tanulható rendszer, újrajátszható kihívás |
| Fejlődő lehetőségek | a fejezetek új műveleteket és technológiákat oldanak fel | folyamatos újdonság az 500 Sol alatt |

### Javaslat a későbbre

A reprodukálható seed alapot adhat megosztható kihívásokhoz: két játékos ugyanazzal a világgal indulhat, és összehasonlíthatja, ki hogyan döntött. Ez nem szerepel a fejlesztési tervben, ezért külön döntést igényel.

## Nehézség és újrajátszhatóság

A három nehézségi szint ugyanazt a küldetést más szorítással kínálja. A permadeath külön kapcsolható, és a mentési és visszatöltési szabályokat a szint határozza meg.

| Szint | Jellemző |
| --- | --- |
| Explorer | több tartalék, enyhébb események |
| Engineer | kiegyensúlyozott alapélmény |
| Mission Director | szűk erőforrások, komoly kockázatok |

Az újrajátszhatóságot három dolog adja:

- a seed-alapú események, amelyek minden új játékban más viharokat és hibákat hoznak;
- a döntések következményei, amelyek egy másik tanácsadói egyensúllyal más történetet írnak;
- a későbbi régiók (Terra Sirenum, Hellas), amelyek új terepet és kockázatot adnak.

A küldetés végén a játékos minősítést kap (Bronz, Ezüst vagy Arany) a hatékonyság, a kockázatkezelés és a tudományos érték alapján.

## Látvány, hangulat és felület

A felület a négy referenciakép legjobb tulajdonságait egyesíti: egy prémium, sötét irányítóközpont, amelyben a fotórealisztikus marsi panoráma tölti ki a teret, fölötte matt üvegszerű HUD-panelek lebegnek. Arany napkelte, por a levegőben, hosszú árnyékok, obszidiánfekete és grafit felületek adják a hangulatot.

| Terület | Tartalom |
| --- | --- |
| Fejléc | ARES-logó és küldetésazonosító, aktuális Sol, marsi dátum és idő, kommunikációs állapot, globális küldetésállapot |
| Bal oldalsáv | Command Center, Navigation, Rover, Science, Systems, Communications, Environment, Inventory, Mission Reports, Settings |
| Központi panoráma | Mars-terep, ARES-1, waypointok, mintavételi helyek, útvonalak és veszélyzónák, távolságok és célpontok |
| Alsó panelek | Rover Health, Power, Navigation, Communications, Science, Inventory, Mission Timeline, Recent Events |
| Parancskonzol | Drive, Navigate, Sample, Analyze, Repair, Deploy, Uplink, Send Command |

A színek jelentést hordoznak: a borostyán az aktív célt, a zöld a működő rendszert, a kék a kommunikációs csatornákat jelöli.

Minden fő modul saját részletes nézetet kap, de a legfontosabb információ a központi képernyőről mindig elérhető. A térkép interaktív, a grafikonok valódi szimulációs adatokat mutatnak, a gombok pedig tényleges műveleteket indítanak.

### Terep és mobil

A marsi terep kezdetben 2.5D/3D hibrid megjelenítés. Mobilon a navigáció alsó menübe kerül, a panoráma és a térkép külön, teljes szélességű nézetet kap, az információs panelek egymás alatt jelennek meg, és a kritikus státuszok mindig láthatók maradnak. A parancskonzol mobilon is kezelhető, a 3D nézet pedig soha nem takarhatja el a fontos tartalmat.

## Technológia, ami az élményt hordozza

A játék elve a Simulation First: előbb a szimulációs motor és az adatmodellek készülnek el, és erre épül a felület. Így a dashboard lecserélhető vagy átalakítható anélkül, hogy a játékmenetet újra kellene írni.

### Alapelvek

- **Simulation First:** a játéklogika nem függ a felülettől.
- **Data Driven:** a küldetések, események, tanácsadói személyiségek, régiók és nehézségi szintek konfigurálható adatok.
- **Determinisztikus szimuláció:** a véletlen magértékből generálódik, egy mentés és döntéssor ugyanazt az eredményt adja.
- **Valódi következmények:** a műveletek erőforrást fogyasztanak, időt igényelnek, és hibával is végződhetnek.
- **Bővíthetőség:** új roverek, régiók, kutatóegységek és infrastruktúrák később is hozzáadhatók.

### Kilenc modul

A motort kilenc modul alkotja: Mission, Simulation, Rover, Environment, Power, Science, Communication, Advisor és Event Engine. A modulok nem módosítják egymás adatait közvetlenül, minden fontos változás központi eseményeken keresztül történik. Emiatt épülnek a rendszerek egymásra.

### Technológiai stack

| Terület | Technológia |
| --- | --- |
| Alkalmazás | React és TypeScript |
| Build | Vite |
| 3D megjelenítés | Three.js, szükség esetén React Three Fiber |
| Grafikonok | Recharts |
| Állapotkezelés | Zustand |
| Mentés | IndexedDB, Dexie |
| Validáció | Zod |
| Tesztelés | Vitest, Playwright |

Az első verzióhoz nem kell szerver, adatbázis vagy külső AI-szolgáltatás. A mentés verziószámot, seed értéket, az aktuális Sol-t, a teljes játékállapotot és az eseménynaplót tartalmazza, és a későbbi frissítések után is betölthető marad.

## Első kiadás és bővítések

Az első játszható verzió (MVP) egy teljes, rövidített küldetésciklus működését bizonyítja. A motor architektúrája már az 500 Sol-os küldetésre készül, a tartalom viszont még nem feltétlenül tölti ki mind az 500 Sol-t.

1. Egy Jezero régió.
2. Egy ARES-1 rover.
3. Sol-alapú játékmenet.
4. Négy működő tanácsadó.
5. Alapvető energia- és akkumulátorrendszer.
6. Rovermozgás és waypointok.
7. Alapvető tudományos mintavétel.
8. Kommunikációs késleltetés.
9. Legalább nyolc eseménytípus.
10. Parancssor és Send Command funkció.
11. Működő mentés és visszatöltés.
12. Egy prémium, működő dashboard.

A siker mércéje: a játékos végig tud játszani egy teljes Sol-ciklust, a döntései ténylegesen megváltoztatják a Mars és a rover állapotát, és a dashboard minden fontos információt a működő szimulációból jelenít meg.

### Későbbi bővítések

- Terra Sirenum és Hellas régió.
- További roverek és autonóm drónok.
- Fejlettebb kutatóeszközök és technológiai kutatási fa.
- Többféle infrastruktúra és Habitat Zero építési rendszer.
- Részletesebb 3D terep.
- Fejlettebb tanácsadói párbeszédek.
- További küldetések és az emberi expedíció előkészítése.

```
```data/acts.ts
import type { ActId, CommandId } from '../types/game';

export interface ActDef {
  id: ActId;
  start: number;
  end: number;
  commandUnlocks: CommandId[];
  hazardMult: number;
  opportunityChance: number;
}

export const acts: ActDef[] = [
  {
    id: 'discovery',
    start: 1,
    end: 100,
    commandUnlocks: ['drive', 'navigate', 'survey', 'selectTarget', 'siteSurvey', 'spectroscopy', 'prep', 'uplink', 'heat', 'repair', 'rest'],
    hazardMult: 0.75,
    opportunityChance: 0.075,
  },
  {
    id: 'expansion',
    start: 101,
    end: 250,
    commandUnlocks: ['drill', 'deploySolar', 'buildRelay'],
    hazardMult: 0.95,
    opportunityChance: 0.06,
  },
  {
    id: 'survival',
    start: 251,
    end: 375,
    commandUnlocks: ['sample', 'sealSample', 'checkSample'],
    hazardMult: 1.3,
    opportunityChance: 0.045,
  },
  {
    id: 'finalApproach',
    start: 376,
    end: 500,
    commandUnlocks: ['analyze', 'preparePacket'],
    hazardMult: 1.15,
    opportunityChance: 0.055,
  },
];

export function actForSol(sol: number): ActDef {
  return acts.find((a) => sol >= a.start && sol <= a.end) ?? acts[acts.length - 1];
}

export function unlockedCommands(sol: number): Set<CommandId> {
  const out = new Set<CommandId>();
  acts.filter((a) => a.start <= sol).forEach((a) => a.commandUnlocks.forEach((c) => out.add(c)));
  return out;
}

export function commandUnlockSol(command: CommandId): number {
  return acts.find((a) => a.commandUnlocks.includes(command))?.start ?? 1;
}

```
```utils/game/environment.ts
import { actForSol } from '../../data/acts';
import { regionDef } from '../../data/regions';
import type { EnvironmentState, GameState } from '../../types/game';
import type { Rng } from './rng';

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Deterministic daily environmental telemetry. Every displayed value feeds at least one system. */
export function generateEnvironment(game: Pick<GameState, 'region' | 'sol' | 'storm' | 'environment'>, rng: Rng): EnvironmentState {
  const region = regionDef(game.region);
  const act = actForSol(game.sol);
  const seasonal = Math.sin((game.sol / 500) * Math.PI * 2 + 0.7);
  const storm = game.storm.intensity;
  const inheritedDust = game.environment?.dustIndex ?? 0.18;
  const windMs = clamp(4 + region.stormMult * 2 + storm * 24 + rng.range(-2.5, 3.5), 0.5, 35);
  const dustIndex = clamp(inheritedDust * 0.72 + storm * 0.34 + windMs / 150 + rng.range(-0.025, 0.025), 0.04, 0.98);
  const daylightHours = clamp(12.2 + seasonal * 0.8 - storm * 1.4, 8.5, 13.5);
  const solarIrradiance = Math.round(clamp(590 + seasonal * 55 - dustIndex * 330 - storm * 130 + rng.range(-25, 25), 90, 680));
  const pressurePa = Math.round(660 + (game.region === 'hellas' ? 170 : game.region === 'sirenum' ? -60 : 15) + rng.range(-18, 18) + storm * 22);
  const dayTempC = Math.round(region.nightTemp + 62 + seasonal * 5 - storm * 7 + rng.range(-3, 3));
  const visibilityKm = +clamp(32 - dustIndex * 27 - storm * 8, 1.2, 32).toFixed(1);
  const scienceQuality = +clamp(1.08 - dustIndex * 0.45 - Math.max(0, windMs - 16) * 0.012 + (act.id === 'discovery' ? 0.04 : 0), 0.48, 1.15).toFixed(2);
  return { dayTempC, pressurePa, windMs: +windMs.toFixed(1), dustIndex: +dustIndex.toFixed(2), solarIrradiance, daylightHours: +daylightHours.toFixed(1), visibilityKm, scienceQuality };
}

export function solarChargeFactor(env: EnvironmentState): number {
  return clamp((env.solarIrradiance / 590) * (env.daylightHours / 12), 0.15, 1.2);
}

export function driveEnvironmentFactor(env: EnvironmentState): number {
  return clamp(1 - Math.max(0, env.windMs - 12) * 0.018 - env.dustIndex * 0.16, 0.45, 1.05);
}

```
```components/views/EnvironmentPanel.tsx
import React from 'react';
import { CloudSunIcon, EyeIcon, GaugeIcon, RadiationIcon, SunIcon, ThermometerIcon, WindIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import type { GameState } from '../../types/game';
import { driveEnvironmentFactor, solarChargeFactor } from '../../utils/game/environment';
import { Meter } from '../shared/Meter';
import { Panel } from '../shared/Panel';

export function EnvironmentPanel({ game }: { game: GameState }) {
  const { t } = useI18n();
  const e = game.environment;
  const drive = driveEnvironmentFactor(e);
  const solar = solarChargeFactor(e);
  const readings = [
    { icon: ThermometerIcon, label: t.environment.temperature, value: `${e.dayTempC} °C` },
    { icon: GaugeIcon, label: t.environment.pressure, value: `${e.pressurePa} Pa` },
    { icon: WindIcon, label: t.environment.wind, value: `${e.windMs} m/s` },
    { icon: RadiationIcon, label: t.environment.dust, value: `${Math.round(e.dustIndex * 100)}%` },
    { icon: SunIcon, label: t.environment.solar, value: `${e.solarIrradiance} W/m²` },
    { icon: CloudSunIcon, label: t.environment.daylight, value: `${e.daylightHours} h` },
    { icon: EyeIcon, label: t.environment.visibility, value: `${e.visibilityKm} km` },
  ];
  return (
    <div className="flex flex-col gap-3">
      <Panel title={t.environment.title} aside={<span className="text-[11px] text-ink-4">{t.environment.live}</span>}>
        <dl className="grid grid-cols-2 gap-2">
          {readings.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-[12px] bg-fill-1 p-3">
              <dt className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.08em] text-ink-4">
                <Icon size={12} strokeWidth={1.6} />
                {label}
              </dt>
              <dd className="mt-1 text-[16px] font-[650] text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </Panel>
      <Panel title={t.environment.systemImpact}>
        <div className="space-y-3">
          <Meter label={t.environment.driveEfficiency} value={`${Math.round(drive * 100)}%`} fraction={drive} tone={drive < 0.7 ? 'amber' : 'green'} />
          <Meter label={t.environment.solarYield} value={`${Math.round(solar * 100)}%`} fraction={solar} tone={solar < 0.55 ? 'red' : solar < 0.8 ? 'amber' : 'green'} />
          <Meter label={t.environment.scienceQuality} value={`${Math.round(e.scienceQuality * 100)}%`} fraction={e.scienceQuality} tone={e.scienceQuality < 0.7 ? 'amber' : 'blue'} />
        </div>
        <p className="mt-3 text-[11.5px] leading-relaxed text-ink-4">{t.environment.note}</p>
      </Panel>
      {game.storm.chainId && (
        <Panel title={t.environment.eventChain}>
          <p className="text-[12.5px] text-ink-2">{t.environment.chainActive(game.storm.chainStep, game.storm.sols)}</p>
          <p className="mt-1 text-[11.5px] text-ink-4">{t.environment.chainHint}</p>
        </Panel>
      )}
    </div>
  );
}

```
```components/campaign/ActHud.tsx
import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import { actForSol } from '../../data/acts';
import type { GameState } from '../../types/game';

export function ActHud({ game }: { game: GameState }) {
  const { t } = useI18n();
  const act = actForSol(game.sol);
  const fraction = (game.sol - act.start + 1) / (act.end - act.start + 1);
  return (
    <div className="glass flex min-w-[180px] items-center gap-3 rounded-full px-3.5 py-2" title={t.acts[act.id].description}>
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-soft text-[11px] font-[700] text-amber">
        {act.id === 'discovery' ? 'I' : act.id === 'expansion' ? 'II' : act.id === 'survival' ? 'III' : 'IV'}
      </span>
      <div className="min-w-0 flex-1 leading-tight">
        <div className="truncate text-[11.5px] font-[650] text-ink">{t.acts[act.id].name}</div>
        <div className="mt-1 h-[3px] overflow-hidden rounded-full bg-track">
          <span className="block h-full rounded-full bg-amber" style={{ width: `${Math.min(100, fraction * 100)}%` }} />
        </div>
      </div>
    </div>
  );
}

```
```docs/ARES_2051_ACT_I_DISCOVERY_COMPLETE.md

ARES MISSION 2051 — Campaign Narrative Specification

Document ID: ARES_2051_ACT_I_DISCOVERY_COMPLETE.md
Status: Canonical Design Document
Framework Version: Integrated Systems, AP, & Advisor Trust Models

CANONICAL CONFIGURATION MATRIX

A küldetések logikai futtatása előtt a játék motorja az alábbi, rögzített adatbázist használja elsődleges referenciaként.

1. Advisor Baseline Directory

• NAV: Dr. Imani Okafor (41, nigériai-brit). Fókusz: Kiszámíthatóság, biztonság, igazolt útvonalak. Titok: Rejtett Delta-gerinc instabilitási adatok.
• SCI: Dr. Lena Varga (36, magyar). Fókusz: Felfedezés, innováció, marsi anomáliák. Titok: Delta-gerinc nem azonosított kémiai mintái.
• SYS: Dr. Marco Bellini (48, olasz). Fókusz: Zárt körfolyamatok, gépépség, strukturális integritás. Titok: A Sabatier-reaktor hibás katalizátorágya.
• COMM: Alex Mercer (29, kanadai). Fókusz: Transzparencia, morál, mentális egészség. Titok: Legénységi metaadat-figyelő algoritmus / Földi szabotázs-akták.

2. Trust Range Thresholds

• 81% – 100% (Absolute Loyalty): AP-költség csökkenés (-1 AP az adott részlegnél), titkok feltárulnak.
• 36% – 80% (Operational Baseline): Alapértelmezett értékek és viselkedés.
• 15% – 35% (Passive Friction): Súrlódási adó (+1 AP Friction Tax minden részleg-akcióra). Információ-visszatartás.
• 0% – 14% (Open Defiance): Parancsok megtagadása, automatikus belső erőforrás-lefoglalási projektek indítása.

PHASE 1: ARRIVAL (SOL 1–3)


MISSION 001 — THE FIRST BREATH

• Sol: 1 | Priority: Critical
• Location / Environment: Chryse Planitia, Landing Zone Alpha. Külső légnyomás: 0.6 kPa. Háttérsugárzás: 22 mSv/év.
• Narrative Briefing: Az ARES-1 sikeresen landolt. A modulok épek, de a hosszú távú életfenntartás inaktív. 36 órányi vészhelyzeti oxigéntartalék van érvényben. A Sabatier és a WRS rendszerek hidegindításra várnak.

Advisor Dialogues & Conflicts

• SYS (Marco): "Parancsnok, 36 óránk van, mielőtt megfulladunk. Azonnal az oxigéngenerálásra és a légfrissítő hálózatra kell irányítani az összes energiát! A víz megvár minket."
• SCI (Lena): "Marco a múltban él! Hidrogén- és tiszta vízáramlás nélkül az elektrolízis cellák órákon belül kiszáradnak és tönkremennek. A WRS-t kell elsőként stabilizálni, különben az oxigénrendszer is leáll!"
• NAV (Imani): "A leszállási telemetria szerint a dűnék elmozdulása miatt az elsődleges külső jégbányászati útvonal bizonytalan. Óvatosan kell elosztanunk az energiát, ha mozgatni akarjuk a nehézgépeket."
• COMM (Alex): "A telepesek látják a kijelzőkön a visszaszámlálást. Ha nem kapnak egyértelmű, transzparens tájékoztatást a rendszerek állapotáról, pánik tör ki, mielőtt az első Sol véget érne."

Player Decisions

• A. Prioritás: Oxigéngenerálás indítása azonnal.
	• Immediate Cost/Resource: +25% Oxigéntartalék, -15% Vízellátási stabilitás, Power: -20 kW. AP: -3 AP.
	• Trust Changes: SYS +10, SCI -10.
	• Hidden Variables: M001_Priority = OXYGEN.
	• Delayed Consequence (Sol 4): A WRS csöveiben lévő maradék víz megfagy az inaktivitás miatt, a Sol 4-en a WRS hatékonysága 90%-ról 75%-ra esik.
• B. Prioritás: WRS vízújrahasznosítás aktiválása.
	• Immediate Cost/Resource: +20% Vízellátási stabilitás, -10% Oxigéntartalék, Power: -15 kW. AP: -3 AP.
	• Trust Changes: SCI +10, SYS -10.
	• Hidden Variables: M001_Priority = WATER.
	• Delayed Consequence (Sol 4): Az oxigénszint kritikus határra süllyed, vészhelyzeti AP-levonást okozva a legénység fáradtsága miatt (Sol 4 Base AP: 10 helyett 6).
• C. Szimultán indítás (Overclocking mindkét rendszeren).
	• Immediate Cost/Resource: +15% Oxigén, +15% Víz. Power: -45 kW (Grid terhelési riasztás). AP: -5 AP.
	• Trust Changes: SYS -5, SCI -5 (Kockázatosnak tartják a parancsnokot).
	• Hidden Variables: M001_Priority = BOTH, Sabatier_Wear_Multiplier = 2.0.
	• Delayed Consequence (Sol 14): A Sabatier katalizátorágyának rejtett kopása korán eszkalálódik, Marco titka hamarabb kiderül.

UI Integration

A központi kijelzőn villogni kezd a választott rendszer ikonja, miközben a lekapcsolt ág sötétben marad a sematikus hálózati térképen.

MISSION 002 — THE UNVERIFIED ROUTE

• Sol: 2 | Priority: High
• Location / Environment: Delta Ridge északi pereme. Instabil regolith dűnék.
• Narrative Briefing: A távolsági spektrométerek tiszta jég jelenlétét mutatják a Delta-gerinc mélyén. Az útvonalat azonban a legutóbbi porvihar teljesen átírta. Egy felderítő rovert kell kiküldeni a mintákért.

Advisor Dialogues & Conflicts

• NAV (Imani): "Nem engedélyezhetem ezt az útvonalat. A terep nincs igazolva, a műholdképek vakok. Előbb egy radar-drónt kell küldenünk, különben elveszítjük a rovert."
• SCI (Lena): "Ha várunk, a hőmérsékleti ingadozás szublimálja a felszínhöz közeli jégréteget, és a spektrométeres adatok pontatlanná válnak. Most kell lépnünk!"
• SYS (Marco): "Ha a rover elakad, a kimentése értékes energiát és hidrogént fog felemészteni a telepekről."
• COMM (Alex): "A legénység tudni akarja, hogy miért kockáztatjuk a drága felszerelést a második napon. Ha drónt küldünk, az megnyugtatja őket."

Player Decisions

• A. A rover azonnali indítása (SCI javaslat).
	• Immediate Cost/Resource: AP: -2 AP. Rover állapot: Risk of Damage.
	• Trust Changes: SCI +10, NAV -10.
	• Hidden Variables: M002_Delta_Route = DIRECT. Roll 1-100: Ha <40, Rover_Damaged = TRUE.
	• Delayed Consequence (Sol 5): Ha Rover_Damaged == TRUE, Lena a Sol 5-ön elismeri, hogy a begyűjtött minták gyanús kémiai vegyületeket tartalmaznak (Delta_Ridge_Contaminated = TRUE), de a rover javítása 4 AP-be kerül.
• B. Radar-drón küldése útvonal-ellenőrzésre (NAV javaslat).
	• Immediate Cost/Resource: AP: -4 AP (Magas koordinációs költség). Power: -5 kW.
	• Trust Changes: NAV +10, SCI -5.
	• Hidden Variables: M002_Delta_Route = SCOUTED, Rover_Damaged = FALSE.
	• Delayed Consequence (Sol 9): Imani hálás lesz a Parancsnok óvatosságáért, és automatikusan megnyit egy biztonságos, alternatív bányászati folyosót az Act II-ben.
• C. Az expedíció elhalasztása és alternatív forrás keresése.
	• Immediate Cost/Resource: Vízellátás: -10%. Morál: -5%. AP: 0 AP.
	• Trust Changes: SCI -15, NAV -5.
	• Hidden Variables: M002_Delta_Route = ABANDONED.
	• Delayed Consequence (Sol 14): A kolónia vízszűkébe kerül, ami miatt a Sabatier reaktort kényszerűen túl kell pörgetni.

UI Integration

A NAV almenüben a Delta Ridge szektor "Unverified" (Ellenőrizetlen) státuszban marad, piros felkiáltójellel.

MISSION 003 — THE SABATIER IMPULSE

• Sol: 3 | Priority: High
• Location / Environment: Hab-1 Központi Mérnöki Blokk.
• Narrative Briefing: A Sabatier-reaktor első teljes gőzzel való indítása közben a COMM részleg kritikus szoftveres anomáliát észlel. A belső kamra nyomásértékei nem frissülnek a fő UI-on.

Advisor Dialogues & Conflicts

• COMM (Alex): "A szoftveres telemetria vak. Nem látjuk a hidrogén-nitrogén arányt. Azonnali leállítást és kód-diagnosztikát javaslok. Nem kockáztathatunk egy robbanást!"
• SYS (Marco): (Idegesen) "Ha most leállítjuk, a katalizátorágyak lehűlnek. Az újraindítás napokig tart és felemészti a megmaradt energiánkat. A gép stabil, mennünk kell tovább manuális szeleppel!"
• SCI (Lena): "Ha a reaktor leáll, nincs víztermelés a WRS számára. Választanunk kell a szoftveres biztonság és a fizikai valóság között."
• NAV (Imani): "Ha a reaktor megsérül, a bázis pozíciója tarthatatlanná válik. Én Mercernek adok igazat."

Player Decisions

• A. Kényszerített indítás manuális szeleppel (SYS javaslat).
	• Immediate Cost/Resource: Sabatier termelés: +25%. AP: -1 AP. Power: -15 kW.
	• Trust Changes: SYS +15, COMM -15.
	• Conditional Dialogue: Ha a Sol 1-en a játékos a C. Szimultán indítást választotta: Marco halkan megjegyzi: "Köszönöm, Parancsnok. Nem bírta volna ki a rendszer a hűtési ciklust."
	• Hidden Variables: Sabatier_Blind_Run = TRUE, Structural_Micro_Fractures + 10.
	• Delayed Consequence (Sol 22): A reaktor belső mikroszkopikus repedései miatt egy váratlan gázszivárgás történik a mérnöki blokkban, ami lezárja a SYS részleg parancsait 2 Solra, hacsak a játékos nem rendelkezik egy korábban feltárt ásványi összetevővel a javításhoz.
• B. Biztonsági leállítás és szoftveres debug (COMM javaslat).
	• Immediate Cost/Resource: AP: -4 AP. Sabatier output: 0 erre a Solra. Oxigéntartalék: -15%.
	• Trust Changes: COMM +15, SYS -15.
	• Hidden Variables: Sabatier_Blind_Run = FALSE.
	• Delayed Consequence (Sol 5): A reaktor szoftvere tiszta lesz, de az oxigén- és víztartalékok kritikus szintre esnek, elindítva az életfenntartó rendszerek stabilizációs krízisét.

PHASE 2: STABILIZATION (SOL 4–7)


MISSION 004 — LIFE SUPPORT CRUNCH

• Sol: 5 | Priority: Critical
• Location / Environment: Hab-1 Elsődleges Életfenntartó Csomópont.
• Narrative Briefing: A bázis elérte az első stabilizációs küszöböt, de a korábbi döntések számlája megérkezett. A rendszerek egyensúlya felborult, a telepesek fizikai fáradtsága eléri a kritikus szintet.

Advisor Dialogues & Conflicts

• SYS (Marco): (Ha M001_Priority == OXYGEN) "Ahogy mondtam, az oxigén megvan, de a WRS csövei elfagytak. A jég elzárja a keringést. AP-t kell áldoznunk a manuális leolvasztásra!"
• SCI (Lena): (Ha M001_Priority == WATER) "A vízrendszerünk tökéletes, de a légnyomás ingadozik. A legénység feje fáj, a koncentráció csökken. Ha nem kalibráljuk újra az elektrolízist, leáll a munka."
• COMM (Alex): "A telepesek érzik a feszültséget. Ha a Parancsnok nem vonja be őket a döntésekbe, a morál visszafordíthatatlanul zuhanni kezd."
• NAV (Imani): "Bármit is választ, Parancsnok, a nehézgépek üzemanyagát ne pazaroljuk fűtésre."

Conditional Dialogue (Öröklődés-ellenőrzés)

• Ha a Sol 2-n a játékos a rovert küldte és Delta_Ridge_Contaminated == TRUE:
Lena (SCI): "Parancsnok, a Delta-gerincről hozott minták reaktív perklorátokat tartalmaznak. Ez mérgezi a WRS szűrőit. Ha nem tisztítjuk meg azonnal, a tiszta vízhozamunk 30%-kal csökken!"

Player Decisions

• A. Sürgősségi AP-átirányítás a karbantartásra (Manuális leolvasztás / kalibráció).
	• Immediate Cost/Resource: AP: -5 AP (A Sol fele elvész). Rendszer integritás: +20%. Power: -10 kW.
	• Trust Changes: SYS +10, SCI +5.
	• Hidden Variables: LS_Crunch_Resolved = COORD.
• B. Vegyi adalékanyagok használata a szűrők tisztítására (Gyors, de korrozív megoldás).
	• Immediate Cost/Resource: AP: -1 AP. WRS hatékonyság: Ideiglenesen visszaáll 90%-ra.
	• Trust Changes: SCI +15, SYS -15 (Marco gyűlöli a korrozív anyagokat).
	• Hidden Variables: LS_Crunch_Resolved = CHEMICAL, Sabatier_Wear_Multiplier + 1.5.
	• Delayed Consequence (Sol 19): A vegyi anyagok kikezdik a másodlagos szelepeket, ami egy későbbi Solon hirtelen nyomásesést okoz a hidrogén-visszaforgatónál.

MISSION 005 — THE DEEP RADAR

• Sol: 7 | Priority: Medium
• Location / Environment: Hab-1 Külső Antenna-mező. Erősödő napszél.
• Narrative Briefing: A NAV részleg az első mélyradaros letapogatást végzi a bázis alatt, hogy kijelölje a jövőbeli lakómodulok helyét. A radar azonban egy hatalmas, föld alatti üreget (Láva-csatornát) mutat, aminek a mélyéről szabálytalan elektromágneses impulzusok szivárognak fel.

Advisor Dialogues & Conflicts

• NAV (Imani): "A láva-csatorna tökéletes védelmet nyújtana a sugárzás ellen, de a mélyéből jövő jel zavarja a rovereink irányítását. Le kell pecsételnünk a bejáratot, amíg nem tudjuk, mi az."
• SCI (Lena): "Lepecsételni? Ez egy egyedülálló geológiai vagy talán... asztrobiológiai jelenség! Azonnal le kell küldenünk egy mélységi szondát, hogy rögzítsük a frekvenciát."
• COMM (Alex): "A jel frekvenciája kísértetiesen hasonlít azokra a régi földi katonai kódolásokra, amiket a háború utolsó napjaiban használtak. Parancsnok, ezt meg kell hallgatnunk."
• SYS (Marco): "Engem nem érdekel a jel, de a láva-csatorna szerkezeti stabilitása igen. Ha oda leköltözünk, a bázis sugárzásvédelme 95%-ra nő. Ez tény, a többi csak fantáziálás."

Player Decisions

• A. A jel azonnali izolálása és a csatorna lezárása (NAV/SYS prioritás).
	• Immediate Cost/Resource: Sugárzás elleni védelem: Előkészítve (+10% jövőbeli bónusz). AP: -2 AP.
	• Trust Changes: NAV +10, SYS +10, SCI -15, COMM -10.
	• Hidden Variables: Anomalous_Signal_State = ISOLATED.
	• Delayed Consequence (Sol 25): A jel izolálása miatt a SCI részleg lemarad az első frekvenciaváltásról. A Sol 25-ön a mélyből jövő anomália felerősödik, és közvetlenül a bázis fő áramellátását kezdi szívni, mert nem lett időben dekódolva.
• B. Szonda leeresztése és a jel folyamatos monitorozása (SCI/COMM prioritás).
	• Immediate Cost/Resource: AP: -4 AP. Tudományos adatok: +30 SCI pont. Power: -5 kW.
	• Trust Changes: SCI +15, COMM +15, NAV -10, SYS -5.
	• Hidden Variables: Anomalous_Signal_State = MONITORED.
	• Delayed Consequence (Sol 14 / Sol 25): A rögzített adatokból Lena a Sol 14-en rájön, hogy a jel nem természetes eredetű (Signal_Is_Artificial = TRUE), ami teljesen átírja az Act I utolsó harmadának narratíváját.

PHASE 3: EXPLORATION (SOL 8–12)


MISSION 006 — THE SOLAR FLARE

• Sol: 10 | Priority: Critical
• Location / Environment: Marsi felszín / Láva-csatorna bejárata. Solar Particle Event (SPE): 4500 mSv/év.
• Narrative Briefing: A COMM részleg riasztást ad ki: egy gyilkos erejű napkitörés éri el a Marsot 6 órán belül. A felszíni Hab-1 modulok pajzsa nem bírja el a terhelést. Minden telepest és kritikus mobil berendezést be kell menekíteni a föld alatti láva-csatornába. A logisztika kritikus: a nehéz WRS komponensek és az antennák áthelyezése időbe és AP-be kerül.
[ SOLAR FLARE ALERT: 4500 mSv/year ]
                 │
  ┌──────────────┴──────────────┐
  ▼                             ▼
[ DECISION A: SLOW & SAFE ]   [ DECISION B: FAST EVAC ]
• Cost: 100% AP (All Sols)    • Cost: 1 AP
• Systems: 100% Intact        • Systems: 20% Damage
• Morale: Stable              • Morale: Critical Drop

Advisor Dialogues & Conflicts

• NAV (Imani): "A menekülési útvonal szűk. Ha a roverek egyszerre indulnak meg a nehéz gépekkel, elakadnak a csatorna szájában, és kint égünk el a sugárzásban. A legénységet kell előrehoznunk, a felszerelést hátrahagyva!"
• SYS (Marco): "Ha a felszínen hagyjuk a Sabatier másodlagos hűtőegységeit, a sugárzás és a töltött részecskék tönkreteszik az elektronikát. Romokban lesz a kolónia, ha elmúlik a vihar!"
• COMM (Alex): "Az emberek rettegnek. Ha azt látják, hogy a gépeket többre tartjuk az életüknél, fellázadnak. Az evakuációnak transzparensnek és emberközpontúnak kell lennie!"
• SCI (Lena): (Ha Anomalous_Signal_State == MONITORED) "A láva-csatorna mélyén lévő jel a napkitöréssel szinkronban felerősödött. Ha lent leszünk, közvetlen közelről vizsgálhatjuk meg, de a műszereket is le kell vinnünk!"

Player Decisions

• A. Lassú, szisztematikus evakuálás (Minden AP-t feláldozunk a biztonságért).
	• Immediate Cost/Resource: AP: 100% AP (0 AP marad más parancsra ezen a Solon). Rendszerek állapota: 100% védett. Morál: Stabil.
	• Trust Changes: NAV +10, COMM +10, SYS +5.
	• Hidden Variables: Evacuation_Strategy = PERFECT.
	• Delayed Consequence (Sol 13): A bázis zökkenőmentesen kezdi meg az Act II-t a föld alatt, nincs szerkezeti sérülés.
• B. Rohamtempójú menekülés (A nehéz berendezések egy részét a felszínen hagyjuk).
	• Immediate Cost/Resource: AP: -1 AP (Rengeteg AP marad másra). Anyagi kár: A felszíni rendszerek Integrity értéke -20%-kal csökken a sugárzás okozta elektronikai degradáció miatt. Morál: -15%.
	• Trust Changes: SYS -20, NAV +5, COMM -10.
	• Hidden Variables: Evacuation_Strategy = RUSHED.
	• Delayed Consequence (Sol 13 / Sol 22): Az Act II kezdetén a víz- és oxigéntermelés alapból -15%-os hatékonysággal indul az elektronikai sérülések miatt. Marco rejtett reaktorproblémája közelebb kerül a kritikus ponthoz.
• C. A COMM hálózat feláldozása (Az antennákat kint hagyjuk, hogy mentsük a WRS-t).
	• Immediate Cost/Resource: AP: -3 AP. COMM infrastruktúra: Súlyosan sérült. WRS: Biztonságban.
	• Trust Changes: COMM -20, SYS +15, SCI +5.
	• Hidden Variables: Evacuation_Strategy = SACRIFICED_COMM.
	• Delayed Consequence (Sol 11–13): A következő 3 Solban a bázis "süket" lesz. A COMM részleg parancsai dupla AP-ba kerülnek a belső hálózat szétesése miatt. Alex Mercer elhidegül a Parancsnoktól.

PHASE 4: EXPANSION (SOL 13–18)


MISSION 007 — THE UNDERGROUND WATER MATRIX

• Sol: 15 | Priority: High
• Location / Environment: Föld alatti Láva-csatorna, Sötét Zóna.
• Narrative Briefing: A kolónia sikeresen átköltözött a föld alá. A túlélés érdekében ki kell építeni a stabil, állandó vízhálózatot. Lena egy hatalmas, megkövesedett jéglencsét talált a csatorna falában, de az kitermelés szempontjából veszélyes helyen van.

Advisor Dialogues & Conflicts

• SCI (Lena): "Ez a jéglencse tiszta, ásványi anyagokban gazdag. Ha ide fúrunk, a WRS hatékonysága tartósan +20%-kal nő. Ez a kolónia aranybányája!"
• NAV (Imani): "A radarom szerint a jéglencse feletti bazaltréteg mikro-repedésekkel teli. Ha ott fúrunk, beomolhat az egész szektor, elvágva a Hab-1-et a menekülési útvonaltól."
• SYS (Marco): "A fúróberendezések működtetése a zárt csatornában megemeli a rezgést. Ha a bazalt instabil, a Sabatier reaktor csővezetékei is elszakadhatnak."
• COMM (Alex): "A telepesek unják a sötétséget és a korlátozott vízadagokat. Ha megnyitjuk ezt a forrást, a morál szárnyalni fog. Megéri a kockázatot."

Conditional Dialogue (Öröklődés-ellenőrzés)

• Ha a Sol 2-n a játékos az A opciót választotta (M002_Delta_Route == DIRECT):
Imani (NAV): "Emlékeztetném a Parancsnokot a Delta-gerincre. Ott is szerencsénk volt / elakadtunk. Nem alapozhatjuk a stratégiánkat a szerencsére!"

Player Decisions

• A. Ellenőrzött, lassú fúrás megerősített tartópillérekkel (Biztonsági protokoll).
	• Immediate Cost/Resource: AP: -6 AP (Hatalmas munkaerő-igény). Erőforrás: +10% Vízellátás. Power: -20 kW.
	• Trust Changes: NAV +15, SYS +10, SCI -10 (Lena szerint elvesztegetett idő).
	• Hidden Variables: Subterranean_Mining = SAFE.
• B. Gyorsított, agresszív repesztéses fúrás (SCI javaslat).
	• Immediate Cost/Resource: AP: -2 AP. Erőforrás: +30% Vízellátás (Azonnali bőség).
	• Trust Changes: SCI +20, NAV -20, SYS -10.
	• Hidden Variables: Subterranean_Mining = AGGRESSIVE, Structural_Micro_Fractures + 25.
	• Delayed Consequence (Sol 22): A felgyülemlett strukturális feszültség miatt a Sol 22-es mérnöki krízis során a bázis mennyezete megreped, és a javítási költségek megduplázódnak.

PHASE 5: CONFLICT (SOL 19–24)


MISSION 008 — THE WHISPER IN THE CODE

• Sol: 21 | Priority: High
• Location / Environment: COMM Adatközpont, Föld alatti bázis.
• Narrative Briefing: Alex Mercer egy titkos találkozóra hívja a Parancsnokot a COMM adatszobába. Felfedezte, hogy a mélyből jövő jel nemcsak statikus zaj, hanem egy kódolt üzenet, ami belső adatokat szivárogtat ki. Ezzel egy időben Marco rejtett Sabatier-problémája (ha korábban overclockolták) fizikailag is jelentkezik: a reaktor teljesítménye ingadozik.

Advisor Dialogues & Conflicts

• COMM (Alex): "Parancsnok, a jel dekódolása során rábukkantam valami másra is. Marco Bellini eltitkolta előlünk, hogy a Sabatier reaktor katalizátorágya selejtes. Tudatosan kockáztatta az életünket az indulás óta! Követelem, hogy hozzuk ezt nyilvánosságra a legénység előtt."
• SYS (Marco): (Szemtől szemben, feszülten) "Igen, elhallgattam. Mert ha elmondom a Földön, most nem lennénk itt, hanem ott égtünk volna el a háborúban! Ha Alex ezt nyilvánosságra hozza, a telepesek bizalma összeomlik, és meglincselnek. A reaktort meg tudom javítani, de nyugalom kell hozzá."
• SCI (Lena): "A kód... az üzenet, amit Alex talált, nem földi technológia. Ha Marco hazudott, az marsi szempontból másodlagos. A jel forrását kell elérnünk!"
• NAV (Imani): "A parancsnoki lánc nem bomolhat fel. Ha Marco hibázott is, a nyilvános vádaskodás lázadáshoz vezet. Alexnek hallgatnia kell."

Player Decisions

• A. Teljes transzparencia: Marco titkának nyilvánosságra hozatala (COMM javaslat).
	• Immediate Cost/Resource: Morál: -25% (Pánik és düh). SYS Trust: Azonnal 10%-ra esik (Open Defiance állapot). COMM Trust: +25%. AP Generation Penalty: -2 AP a következő 3 Solon a belső vizsgálatok miatt.
	• Hidden Variables: Marco_Secret_Exposed = TRUE.
	• Delayed Consequence (Sol 28): Marco teljesen elzárkózik az együttműködéstől, és a Sol 28-as végső krízisnél nem hajlandó megosztani az áramhálózat vészhelyzeti bypass kódjait, ami kényszerű erőforrás-veszteséget okoz.
• B. A titok elfojtása és Marco támogatása (SYS védelme).
	• Immediate Cost/Resource: SYS Trust: +20% (Hálás). COMM Trust: Azonnal 15%-ra esik (Passive Friction adó érvénybe lép). Morál: Stabil (egyelőre). AP: -2 AP (A fájlok törlése).
	• Hidden Variables: Marco_Secret_Exposed = FALSE, Alex_Subversion_Index + 0.3.
	• Delayed Consequence (Sol 25): Alex Mercer titokban szabotálni kezdi a Parancsnok belső jelentéseit. A Sol 25-ös UI kijelzőn a valós Morál értékek hamisítva jelennek meg, elrejtve egy készülő föld alatti sztrájkot.

PHASE 6: REVELATION (SOL 25–30)


MISSION 009 — THE MARS PARADOX

• Sol: 28 | Priority: Critical
• Location / Environment: A Láva-csatorna legmélyebb pontja, Az Anomália Epicentruma.
• Narrative Briefing: Elérkezett az Act I végkifejlete. A mélyből jövő jel frekvenciája állandósult, és egy fizikai struktúrát azonosítottak a bazaltréteg alatt: egy ősi, mesterségesen létrehozott hermetikus kamrát. A kamra megnyitása hatalmas energiakisülést okoz, ami túlterheli a kolónia jelenlegi akkutelepeit. Választani kell a teljes tudományos áttörés és a bázis fizikai túlélése között.
                  ┌────────────────────────────────────────┐
                  │       ACT I SEASON FINALE: SOL 28      │
                  └────────────────────────────────────────┘
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
     [ DECISION A: OPEN VAULT ]                    [ DECISION B: DRAIN SIGNAL ]
  • SCI Trust:  +25                             • SYS Trust:  +25
  • SYS Trust:  -30 (Defiance)                  • SCI Trust:  -30 (Friction)
  • Unlock:     Alien Tech Branch               • Benefit:    Grid 100% Stabilized
  • Ending:     The Scientific Directorate      • Ending:     The Survival Regime

Advisor Dialogues & Conflicts

• SCI (Lena): "Ez az! Ezért jöttünk! A kamra falaiban idegen technológiai minták vannak. Ha megnyitjuk, megváltoztatjuk az emberiség jövőjét. Ne törődjön az akkumulátorokkal, Parancsnok, szakítsa át a zárat!"
• SYS (Marco): "Ha áttöri azt a zárat, az indukciós lökés kisüti a teljes hálózatot. A WRS leáll, az elektrolízis cellák felrobbannak. Tiszta öngyilkosság a kutatásért feláldozni az életünket!"
• NAV (Imani): "A szoftverem nem tudja kiszámítani a kockázatot. Parancsnok, a biztonság azt diktálja, hogy lassan, lépésről lépésre merítsük le a kamra energiáját, még ha ez hetekbe is telik."
• COMM (Alex): "Az emberek látják a mélyből jövő fényt. Ha eltitkoljuk előlük, mi van odalent, vagy ha veszélybe sodorjuk a bázist, a parancsnokságnak vége. Döntsön bölcsen."

Player Decisions

• A. A kamra azonnali megnyitása (SCI prioritás — Tudományos Áttörés).
	• Immediate Cost/Resource: Power Grid Collapse (Minden részleg lekapcsol, kivéve a kritikus életfenntartást). Akkumulátorok: 0 kWh. AP Base a következő Act elején: 5 AP. Tudományos adatok: +150 SCI pont (Feloldja az alternatív "Xeno-Infrastruktúra" technológiai fát az Act II-ben).
	• Trust Changes: SCI +25, SYS -30, NAV -15.
	• Narrative Output: A bázis sötétségbe borul, de a kamra feltárul. Az emberiség rájön, hogy nincs egyedül a Marson.
	• Campaign Ending Alignment: Lépés a The Scientific Directorate vagy a The Fragmented Colony végkimenetelek felé.
• B. Az energia levezetése és a kamra lezárása (SYS/NAV prioritás — Biztonság mindenekelőtt).
	• Immediate Cost/Resource: Power: 100% stabil (+500 kWh teljes töltöttség az akkukban). AP Base a következő Act elején: 12 AP (Maximális hatékonyság). Nyersanyag-tartalékok: Biztosítva.
	• Trust Changes: SYS +25, NAV +15, SCI -30 (Passive Friction állapotba kerül).
	• Hidden Variables: Vault_Status = SEALED.
	• Narrative Output: A bázis biztonságban van, a zárt láncú rendszerek tökéletesen futnak. Lena Varga azonban megfogadja, hogy a Parancsnok háta mögött fogja folytatni a kutatást.
	• Campaign Ending Alignment: Lépés a The Survival Regime vagy a The United Human Colony végkimenetelek felé.

UI INTEGRATION & ENGINE RULES FOR ACT I

1. The Callback Engine: Minden Sol lezárásakor a motor ellenőrzi az aktív flag-eket (Rover_Damaged, Sabatier_Blind_Run, Marco_Secret_Exposed). Ha egy flag egyezik egy küldetés feltételével, a hozzá tartozó dialógus-blokk felülírja a standard szövegeket.
2. Friction Tax Display: Ha a játékos megnyitja a SCI menüt, és a Trust < 35%, a gombok felett egy piros lakatos ikon jelenik meg: "+1 AP Friction Tax Active (Low Trust)".
Az Act I — Discovery teljes, 30 Solos, elágazó struktúrájú narratív dokumentuma ezzel hivatalosan kész és programozható. Minden döntés közvetlen és rejtett láncolatot alkot.
Hogyan folytassuk a fejlesztést a projekt ütemterve alapján?
1. Step 4: Act II — The Foundation megtervezése (Ahol a bázis fizikai bővítése, az új oxigéngenerátorok és az Act I-ből örökölt kamra-státusz határozza meg a túlélést).
2. Technológiai Fa (Research Tree) kidolgozása (Szeretnéd látni, hogy a megszerzett SCI pontokból milyen konkrét WRS, Sabatier vagy Xeno-technológiákat lehet kifejleszteni az AP hatékonyság növelésére)?

```
```docs/ARES_2051_SURVIVAL_ECONOMY_AND_ROBOTICS_FRAMEWORK.md

ARES MISSION 2051 — Systems & Economic Specification

Document ID: ARES_2051_SURVIVAL_ECONOMY_AND_ROBOTICS_FRAMEWORK.md
Status: Core Mathematical & Economic Specification
System Architecture: Closed-Loop Resource Engine & Autonomous Robotics Network

0. CHRONOLOGICAL RECONCILIATION & DEADLINES

Hogy feloldjuk a történeti idővonal ellentmondásait, a játék kánonját az alábbi három szigorúan elkülönített idősíkra és határidőre osztjuk:
2030                  2035                  2045                      2051
┌─────────────────────┬─────────────────────┬─────────────────────────┬─────────────────────┐
│ III. Világháború    │ Diagnózis: A Föld   │ A Föld megsemmisülése.  │ Az ARES-1 bázis     │
│ nukleáris katasztrófa│ köpenye megsérült.  │ Utolsó evakuációs hajók │ 500 Solos kampánya  │
│                     │ 10 év az indításig. │ elhagyják a felszínt.   │ a Mars kolonizálására│
└─────────────────────┴─────────────────────┴─────────────────────────┴─────────────────────┘
                                            ▲                         ▲
                                            │   6 ÉV MÉLYŰRI TRANZIT  │
                                            └─────────────────────────┘
• 2030 – 2035: A III. Világháború és az azt követő globális összeomlás, valamint a magma réteget ért törés felfedezése.
• 2035 – 2045 (The 10-Year Evacuation Chase): A marsi infrastruktúra-tervek kidolgozása, az ARES-1 expedíció megtervezése, az ISS-alapú rendszerek átalakítása és a gigantikus menekülthajók gyártása a Földön, a bolygó 2045-ös végső felrobbanásáig.
• 2045 – 2051 (The Deep Space Transit): Az ARES-1 előőrs és a menekültek első hullámainak 6 éves mélyűri utazása a Mars felé kriofázisban és szub-fénysebességű pályán.
• 2051 (The 500-Sol Construction Window): A játékmenet idősíkja. A Parancsnok megérkezik a Marsra. Pontosan 500 Sol áll rendelkezésre az állandó földalatti infrastruktúra és a zárt körfolyamatok teljes stabilizálására, mielőtt a Föld pusztulását túlélő, mélyűrben keringő második és harmadik menekülthullám (több millió ember) megérkezik és belép a Mars pályájára. Minden Sol csúszás vagy rendszerleállás közvetlenül csökkenti a befogadható emberek létszámát.

1. RESOURCE ECONOMY MODEL

A játék gazdasági motorja megmaradási törvényeken alapuló áramlási egyenleteket használ. A nyersanyagok tárolási kapacitása véges, a túltöltés veszteséget generál.

Core Fleet Metrics (Baseline: Per 100 Colonists / Per Sol)

• Víz (\(H_{2}O\)): Alapvető emberi szükséglet és az elektrolízis elsődleges forrása. Fogyasztás: 40 kg / Sol.
• Oxigén (\(O_{2}\)): Légzési gáz. Fogyasztás: 32 kg / Sol.
• Hidrogén (\(H_{2}\)): A Sabatier-reaktor üzemanyaga. Nem fogyasztja a legénység, kizárólag vegyi alapanyag.
• Szén-dioxid (\(CO_{2}\)): A marsi atmoszférából korlátlanul kivonható gáz, a Sabatier-reaktor bemeneti forrása.
• Élelmiszer: Hidroponikus és szintetikus tápanyag. Fogyasztás: 50 egység / Sol.
• Nyersanyag (Regolith/Fém): Az építés és a karbantartás fizikai alapanyaga.

2. LIFE SUPPORT SYSTEMS: FLOW EQUATIONS

A zárt láncú létfenntartó rendszerek összefüggő matematikai modellje naponta frissül a Sol-váltás fázisában.
                  ┌────────────────────────────────────────┐
                  │        Atmospheric Intake (CO2)        │
                  └────────────────────────────────────────┘
                                       │
                                       ▼
┌───────────────────┐       ┌───────────────────┐       ┌───────────────────┐
│  Ice Harvesting   │ ────► │ Sabatier Reactor  │ ────► │    Methane Gas    │
│  (Raw H2O Input)  │       │ (H2O Generation)  │       │  (Vented/Stored)  │
└───────────────────┘       └───────────────────┘       └───────────────────┘
          │                           │
          ▼                           ▼
┌──────────────────────────────────────────────────────────┐
│               Water Recovery System (WRS)                │
└──────────────────────────────────────────────────────────┘
                              │
                              ▼ Purified H2O
┌──────────────────────────────────────────────────────────┐
│                    Electrolysis Unit                     │
└──────────────────────────────────────────────────────────┘
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
     Oxygen Generation (O2)        Hydrogen Recovery (H2)

Pure Chemical Conversions

1. Sabatier-reaktor hozamgörbe:
\(\text{Output\ }H_{2}O=\min \left(\text{Input\ }CO_{2},\frac{\text{Input\ }H_{2}}{4}\right)\times 0.81\times \text{Sabatier\ Integrity\ \%}\)
2. WRS tisztítási egyenlet:
\(\text{Purified\ }H_{2}O=\left(\text{Wastewater}+\text{Sabatier\ }H_{2}O+\text{Raw\ Ice\ Input}\right)\times \text{WRS\ Efficiency\ \%}\)
Alapértelmezett WRS Hatékonyság: 90% (\(\text{Integrity} \ge 75\%\)).
3. Elektrolízis és Oxigén-visszanyerés:
\(\text{Output\ }O_{2}=\text{Purified\ }H_{2}O\times 0.888\times \text{Electrolysis\ Integrity\ \%}\)
\(\text{Recovered\ }H_{2}=\text{Purified\ }H_{2}O\times 0.111\times \text{Electrolysis\ Integrity\ \%}\)

3. POWER GRID & ENVIRONMENTAL VARIATION

Az energiatermelés leírása időszeletekre (Nappal = 14 óra, Éjszaka = 10 óra) bomlik le a marsi Solon belül.

Generation & Consumption Balance Matrix

• Solar Array Output Formula:
\(P_{\text{Solar}}=100\text{\ kW}\times \left(1.0-\text{Dust\ Accumulation\ \%}\right)\times \text{Weather\ Multiplier}\)
	• Weather Multiplier: Tiszta idő = 1.0 | Részleges porvihar = 0.4 | Globális porvihar = 0.1
	• Dust Accumulation: +1% passzív porlerakódás minden Sol végén.
• RTG Output:
\(P_{\text{RTG}}=20\text{\ kW}\quad (\text{Konstans, éjjel-nappal, időjárástól független})\)

Battery Bank Simulation (Base Capacity: 500 kWh)

\(\text{Net\ Day\ Power}=\left(P_{\text{Solar}}+P_{\text{RTG}}-P_{\text{Colony\ Consumption}}\right)\times 14\text{ óra}\)
\(\text{Net\ Night\ Power}=\left(P_{\text{RTG}}-P_{\text{Colony\ Consumption}}\right)\times 10\text{ óra}\)
Ha a net éjszakai egyenleg lemeríti a gáttartalékot 0 kWh alá, a Grid Failure Hierarchy azonnal lekapcsolja a laboratóriumokat (SCI), majd a navigációs hálózatot (NAV).

4. ARES ROBOTICS NETWORK (ARN)

A kolónia 200 autonóm robotja négy, szigorúan specializált, 50-50 egységből álló flottára oszlik. A robotok elosztása határozza meg a feladatok fizikai végrehajtásának idejét és sikerét.
                       ┌─────────────────────────┐
                       │   TOTAL ROBOT POOL: 200 │
                       └─────────────────────────┘
                                    │
         ┌───────────────┬──────────┴────┬───────────────┐
         ▼               ▼               ▼               ▼
    NAV Fleet       SCI Fleet       SYS Fleet       COMM Fleet
    (50 Units)      (50 Units)      (50 Units)      (50 Units)

Regional Fleet Specialization Mechanics

1. NAV Fleet (Imani Okafor): Útvonalbiztosítás, topográfiai letapogatás, terepstabilizálás.
	• Különleges hatás: Minden 10 aktív NAV robot 15%-kal csökkenti a felszíni roverek sérülési esélyét a felderítések során.
2. SCI Fleet (Lena Varga): Mélyfúrás, spektrometriai mérések, jéglencse-bányászat.
	• Különleges hatás: Növeli a kitermelt nyersanyagok tisztasági együtthatóját. 20 SCI robot aktív jégbányászatra rendelése +10 kg extra nyersanyagbónuszt ad.
3. SYS Fleet (Marco Bellini): Strukturális javítás, napelem-tisztítás, modulépítés.
	• Különleges hatás: 5 SYS robot kiküldése tisztításra eltávolít 5% porlerakódást a napelemekről (AP költség helyett robot-munkaórát égetve).
4. COMM Fleet (Alex Mercer): Adatfolyam-optimalizálás, hálózati megfigyelés, telepeskoordináció.
	• Különleges hatás: Ha legalább 10 COMM robot belső biztonsági üzemmódon fut, a lázadási index és a Morál passzív bomlása 25%-kal lelassul.

Wear, Friction, and Repair Models for Robots

A robotok nincsenek biztonságban a marsi elemekkel szemben. Minden felszíni munka során amortizációt szenvednek el.
\(\text{Robot\ Chassis\ Degradation\ /\ Sol}=\text{Base\ Wear\ (2\%)}\times \text{Environmental\ Multiplier}\)
• Environmental Multiplier: Tiszta idő = 1.0 | Solar Flare = 3.0 | Porvihar = 5.0
• Robot Failure Point: Ha egy flotta átlagos állapota 50% alá esik, a robotok hatékonysága feleződik. 25% alatt az egységek leállnak. Javításuk flotttánként 1 Sol időt és 20 egység Nyersanyagot igényel.

5. AP & TIME ECONOMY INTEGRATION

A játék két gazdasági erőforrást vet össze a parancsok kiadásakor: a Parancsnoki sávszélességet (AP) és a Robotflotta kapacitást (Robot-Units).

Operational Task Command Requirements (Examples)


Feladat Megnevezése	Szükséges Részleg	Parancsnoki Költség (AP)	Minimális Robotigény	Végrehajtási Idő
Napelemek portalanítása	SYS	1 AP	5 SYS Robot	Azonnali (Következő Sol eleje)
Mélyre hatoló Jégbányászat	SCI / NAV	3 AP	20 SCI + 5 NAV Robot	2 Sol
Lávacsatorna megerősítése	SYS	4 AP	15 SYS Robot	3 Sol
Antennák kalibrálása	COMM	2 AP	10 COMM Robot	1 Sol


6. FAILURE & RECOVERY SIMULATION

Ha egy alrendszer integritása a kritikus határérték alá esik, automatikus vészhelyzeti protokoll lép életbe.

Cascading Failure Rules

• WRS Failure (<25% Integrity): A csövek eltömődnek vagy megrepednek. A szennyvíz tisztítatlanul ömlik a bázis alá. A Vízellátás azonnal adósságba lép. A telepesek Morálja naponta -10 pontot esik.
• Electrolysis Failure (<25% Integrity): Az oxigéntermelés leáll. A bázis vészhelyzeti tartályokra kapcsol. Ha a tartályok 0-ra futnak, a telepesek egészsége körönként 25%-ot zuhan.

Emergency Rescue Mechanics

Ha a robotokat porvihar vagy omlás éri (pl. a Mission 002 vagy Mission 007 agresszív döntései miatt), a játékosnak a következő Sol elején kötelezően el kell indítania egy Mentőakciót.
• Mentőakció költsége: 5 AP + 10 szabad SYS vagy NAV robot zárolása 1 teljes Solra. Ha a játékos nem indítja el az akciót, az elakadt robotflotta véglegesen megsemmisül, csökkentve a részleg maximális kapacitását 50-ről a megmaradt szintre.

7. CAMPAIGN DEADLINE PENALTY ENGINE

Az Act I-VI során elkövetett minden logisztikai vagy építési hiba közvetlenül a játék végső kimenetelét terheli a Marsi Menekült Befogadási Indexen (Mars Evacuation Capacity Index - MECI) keresztül.
                       ┌─────────────────────────┐
                       │     BASE SOL CAPACITY   │
                       │     (500 Sols Total)    │
                       └─────────────────────────┘
                                    │
      ┌─────────────────────────────┴─────────────────────────────┐
      ▼                                                           ▼
[ ON TIME: 100% SUCCESS ]                                   [ Sols Delayed by Repairs ]
• 10,000,000 Lives Saved                                    • -250,000 Lives Per Sol Lost
• UN Colony / Republic Endings                              • Survival Regime / Fragmentation Endings

The Delayed Timeline Algorithm

A játék zárt rendszere fixen rögzíti, hogy az ARES-1 bázisnak melyik Act végére milyen infrastrukturális szintet kell elérnie. Ha a játékos javítások vagy robot-elakadások miatt kicsúszik a Sol-határidőkből:
1. A menekülthajók első hulláma nem tud biztonságosan leszállni a kijelölt Solon, mert a lávacsatorna nincs megerősítve, vagy a WRS nem bírja el a terhelést.
2. MECI Büntetés: Minden egyes Sol késés az Act-határidőkhöz képest 250 000 földi menekült életébe kerül, akik a pályán keringő transzporthajókban halnak meg az oxigén elfogyása miatt.
3. Endgame Módosító: Ez a matematikai veszteség közvetlenül kizárja a pozitív, demokratikus befejezéseket (pl. The United Human Colony), és a játékost kényszerűen a diktatórikus vagy militarista végkifejletek felé tolja (The Survival Regime), mivel a marsi társadalom nem bírja el a káoszt és a veszteség miatti belső bűntudatot.

UI INTEGRATION & SYSTEM HOOKS

A kezelőfelület főképernyőjén a négy Advisor ikonja mellett egy dedikált ARN (Robotics Grid) panel kap helyet. Ez a panel mutatja a szabad/foglalt robotok számát és a flották kopási szintjét. Ha egy parancs kiadásakor a szükséges robotszám nem áll rendelkezésre, a "Execute Command" gomb inaktívvá válik, és felvillan a hiányzó részleg kódja (pl. SYS Robot Shortage).
Az ARES Autonomous Robotics Network mechanikája és a túlélési rendszerek teljes matematikai és gazdasági modellje ezzel véglegesen specifikálásra került. A játék gazdasági és logisztikai motorja készen áll a kódolásra és az elágazások kezelésére.
Hogyan haladjunk tovább az ütemterv szerint?
1. Step 2: Advisor Trust & Rebellion System (A bizalmi rendszer részletes matematikai és aktiválási szabályai, a szabotázsok és önálló részlegakciók mechanikája, valamint a UI adatmanipuláció beépítése)?
2. Step 3: Act I — Discovery Véglegesítése (A teljes 30 Solos küldetéslánc finomhangolása, immár az ARN robotelágazások és a gazdasági bemenetek/kimenetek pontos értékeinek integrálásával)?

```
```docs/ARES_2051_SURVIVAL_SYSTEMS_AND_AP_FRAMEWORK.md

ARES MISSION 2051 — Systems & Gameplay Design Document

Document ID: ARES_2051_SURVIVAL_SYSTEMS_AND_AP_FRAMEWORK.md
Status: Core Gameplay Specification
Target Architecture: NAV, SCI, SYS, COMM Integrated Core

1. THE CORE ENGINE: AP & SOL MECHANICS

The game's loop operates on a discrete time-step engine where 1 Sol (Martian Day) constitutes one full turn. Time progressing is a non-linear resource expenditure framework driven by Action Points (AP).
       [ MORALE / HEALTH ]
                │
                ▼
┌───────────────────────────────┐
│     BASE SOL CAPACITY         │ ───► Modified by Infrastructure State
└───────────────────────────────┘
                │
                ▼
┌───────────────────────────────┐
│    DEPARTMENTAL TRUST EXAM    │ ───► Low Trust ( < 35 ) = Friction Tax (+1 AP / Action)
└───────────────────────────────┘
                │
                ▼
┌───────────────────────────────┐
│    NET AVAILABLE SOL AP       │
└───────────────────────────────┘

AP Capacity & Generation Model

Every Sol begins with a Base AP Generation of 10 AP. This represents the baseline cognitive and physical bandwidth of the Command Staff.
The total pool is dynamically scaled at the start of each Sol based on three layers:
\(\text{Net\ Sol\ AP}=\text{Base\ AP\ (10)}+\text{Infrastructure\ Modifiers}-\text{Friction\ Taxes}-\text{Environmental\ Penalties}\)

AP Modifiers & Friction Architecture


Morale & Health Bottlenecks

• Critical Deprivation: If Morale drops below 30% OR life support falls into Oxygen/Water debt, the Base AP is reduced to 6 AP due to physiological and psychological exhaustion.

Departmental Friction Tax

• Each of the four departments (NAV, SCI, SYS, COMM) requires coordination.
• If a Department’s Trust metric drops below 35%, that department enters a state of Passive Non-Cooperation.
• Any command executed within that department’s UI sub-menu or associated mission line costs +1 AP extra (Friction Tax). This tax stacks if multiple departments are alienated.

Environmental Disruptions

• Active surface anomalies (e.g., Radiation Spikes, Dust Storms) inflict a global penalty of -2 to -4 AP per Sol if any tasks are attempted on the Martian surface.

2. SURVIVAL SYSTEMS: PHYSICAL CLOSED-LOOP INFRASTRUCTURE

The survival loop of ARES-1 is an interdependent, multi-stage physical simulation. Resources are not generated out of nothing; they flow through a rigid, conservation-of-mass chemical loop.
                   ┌───────────────────────────────────────┐
                   │          Atmospheric Intake           │
                   └───────────────────────────────────────┘
                                       │ (CO2)
                                       ▼
┌───────────────────┐  (H2)   ┌───────────────────┐  (CH4)   ┌───────────────────┐
│ External Ice Mine │ ──────► │ Sabatier Reactor  │ ──────►  │ Fuel Storage / Vent│
└───────────────────┘         └───────────────────┘          └───────────────────┘
          │                             │
          │ (H2O)                       │ (H2O)
          ▼                             ▼
┌──────────────────────────────────────────────────────────┐
│                 Water Recovery System (WRS)              │
└──────────────────────────────────────────────────────────┘
                                │
                                │ (Purified H2O)
                                ▼
┌──────────────────────────────────────────────────────────┐
│                     Electrolysis Unit                    │
└──────────────────────────────────────────────────────────┘
                                │
                                ├──────────────────────────┐
                                ▼                          ▼
                      ┌───────────────────┐      ┌───────────────────┐
                      │  Oxygen Storage   │      │ Hydrogen Recycle  │
                      └───────────────────┘      └───────────────────┘

Chemical Loop Equations & Operational Balance


Stage 1: Carbon Dioxide & Hydrogen Processing (Sabatier Reactor)

The Sabatier Reactor inputs raw atmospheric Carbon Dioxide (\(CO_{2}\)) captured by the environmental intakes and Hydrogen (\(H_{2}\)) to produce Methane (\(CH_{4}\)) and Water (\(H_{2}O\)):
\(CO_{2}+4H_{2}\xrightarrow{\text{Sabatier\ Catalyst}}CH_{4}+2H_{2}O\)
• System Impact: The Methane (\(CH_{4}\)) is either stored for surface operations or safely vented. The generated Water (\(H_{2}O\)) is fed directly into the WRS input queue.

Stage 2: Purification (Water Recovery System - WRS)

The WRS aggregates unpurified water from the Sabatier output, wastewater from the habitats, and raw melted Martian regolith ice.
\(\text{Gross\ Input\ }H_{2}O\times \text{WRS\ Efficiency\ \%}=\text{Purified\ }H_{2}O\)
• System Impact: A higher efficiency percentage reduces the mass of water lost to irrecoverable toxic sludge during processing.

Stage 3: Life Support Generation (Electrolysis Unit)

Purified water from the WRS is split using electrical energy to yield breathable Oxygen (\(O_{2}\)) and recover Hydrogen (\(H_{2}\)):
\(2H_{2}O\xrightarrow{\text{Electrolysis}}2H_{2}+O_{2}\)
• System Impact: The Oxygen (\(O_{2}\)) feeds the habitat life support systems. The recovered Hydrogen (\(H_{2}\)) is piped back into the Sabatier Reactor to maintain the loop, minimizing the need for new Hydrogen extraction from raw ice.

Base Resource Values (Per 100 Colonists / Sol)


System Component	Resource Input	Resource Output	Base Power Cost	Base AP Maintenance
Sabatier Reactor	44 kg \(CO_{2}\) + 8 kg \(H_{2}\)	16 kg \(CH_{4}\) + 36 kg \(H_{2}O\)	15 kW	1 AP / Sol
WRS Unit	40 kg Wastewater	36 kg Purified \(H_{2}O\) (90% Base Eff.)	10 kW	1 AP / Sol
Electrolysis Unit	36 kg Purified \(H_{2}O\)	32 kg \(O_{2}\) + 4 kg \(H_{2}\)	25 kW	1 AP / Sol
External Ice Mine	N/A	50 kg Raw \(H_{2}O\) Ice	30 kW	3 AP / Harvest


3. POWER GRID & ENERGY ARCHITECTURE

The colony's infrastructure requires constant power synchronization. Energy is managed through generation sources, storage banks, and priority grids.

Generation Sources

• Solar Array Fields: High yield during clear peak hours (+100 kW Base). Zero yield at night. Yield degrades permanently due to dust accumulation (-1% per Sol, cleared via 2 AP EVA maintenance) and drops by up to 90% during global Dust Storms.
• Radioisotope Thermoelectric Generators (RTGs): Constant, unchanging baseline power (+20 kW Stable). Unaffected by night, storms, or dust.

Storage Grid (Battery Banks)

• Excess power generated during peak solar hours automatically charges the battery banks.
• Capacity: Base battery banks hold 500 kWh.
• Drain Phase: During the night cycle, the entire colony draws from the batteries. If batteries hit 0 kWh before dawn, a Grid Collapse occurs.

Grid Failure Hierarchy

If power consumption exceeds production and storage drops to 0, the system automatically shuts down infrastructure down the following priority ladder until stability is reached:
1. SCI (Laboratories & Sensor Arrays): Scientific research halts; data generation freezes.
2. NAV (Comms/Radar & Drone Terminals): Surface rovers cannot be guided; no new map data.
3. SYS (Sabatier & WRS): The physical loop stops. The colony relies exclusively on pressurized reserves.
4. CRITICAL LIFE SUPPORT (Habitat Heating & Oxygen Circulation): If unpowered for more than 12 hours, Colonist Health drops by 25% per Sol. Morale drops by 30% per Sol.

4. DEGRADATION, ANOMALIES, AND LONG-TERM RADIATION


Degradation & Wear Metrics

Every operational piece of infrastructure possesses a Condition Integrity Metric (100% to 0%).
• Passive Wear: Running a system under standard parameters reduces its Integrity by 2% per Sol.
• Overclocking: Running a system at 150% capacity doubles output but inflicts 8% Integrity degradation per Sol.
• Malfunction Thresholds:
	• At <75% Integrity: System efficiency drops by 15% (e.g., WRS loses water mass).
	• At <50% Integrity: A system failure risk rolls at the start of every Sol (20% chance of emergency shutdown).
	• At <25% Integrity: The system suffers a critical failure, venting inputs and halting completely until repaired.

Long-Term Surface Radiation Architecture

Radiation on the Martian surface is not a temporary encounter; it is a persistent, structural game mechanic.
┌──────────────────────────────────────────────────────────┐
│                   Surface Radiation Level                │
└──────────────────────────────────────────────────────────┘
                            │
                            ├──────────────────────────────┐
                            ▼                              ▼
              ┌───────────────────────────┐  ┌───────────────────────────┐
              │     Lava-Tube Habitat     │  │   Surface Living Modules  │
              │  (95% Shielding Baseline) │  │  (30% Shielding Baseline) │
              └───────────────────────────┘  └───────────────────────────┘
                            │                              │
                            ▼                              ▼
              ┌───────────────────────────┐  ┌───────────────────────────┐
              │ Safe Long-Term Operations │  │ Accumulating Dose Metric  │
              └───────────────────────────┘  └───────────────────────────┘
                                                           │
                                                           ▼
                                             ┌───────────────────────────┐
                                             │ Degradation Penalties     │
                                             │ • Morale Decay            │
                                             │ • Operational Efficiency  │
                                             │ • AP Surcharges           │
                                             └───────────────────────────┘

Ambient Surface State

The surface radiation level fluctuates between 20 mSv/year (Baseline) and 5000 mSv/year (Solar Particle Events).

Structural Shielding

• Surface Living Modules: Offer 30% radiation shielding. Exposure inside these structures slowly accumulates over Sols, causing baseline Morale decay and increasing human medical emergencies.
• Lava-Tube Sub-surface Habitats: Offer 95% radiation shielding. Moving living quarters under the regolith neutralizes ambient radiation risks.

Surface Operations (EVA) Surcharges

Every action executed on the surface (mining, solar cleaning, scouting) exposes crew members. If the background radiation is high due to a recent solar flare, performing an EVA incurs a permanent AP surcharge (+2 AP per action) because crews must execute extensive decontamination, suit checks, and medical screens.

5. RECONCILIATION WITH THE "INVISIBLE CONSEQUENCE" PRINCIPLE

To uphold the Choice-Driven Narrative Adventure standard, systemic variables are deeply tied to narrative state flags rather than simple, predictable resource adjustments.
                                  ┌─────────────────────────┐
                                  │ PLAYER CHOICE (Sol 5)   │
                                  └─────────────────────────┘
                                               │
                                               ▼
                              ┌───────────────────────────────────┐
                              │  Systemic Variable Adjusted       │
                              │  (e.g., Corrosive Methane Vented) │
                              └───────────────────────────────────┘
                                               │
                                               ▼
                              ┌───────────────────────────────────┐
                              │     Invisible State Flag Set      │
                              │     "Delta_Ridge_Contaminated"    │
                              └───────────────────────────────────┘
                                               │
                                               ▼
       ( 40 Sols Later... )                    │
 ──────────────────────────────────────────────┼──────────────────────────────────────────────
                                               ▼
                              ┌───────────────────────────────────┐
                              │       Trigger System Check        │
                              └───────────────────────────────────┘
                                               │
                         ┌─────────────────────┴─────────────────────┐
                         ▼                                           ▼
            [ Flag = TRUE ]                             [ Flag = FALSE ]
  ┌───────────────────────────────────┐               ┌───────────────────────────────────┐
  │ Event Triggered:                  │               │ Event Triggered:                  │
  │ Regolith Drill Failure            │               │ Safe Geological Harvest           │
  │ (WRS Filter Damaged, -30% Eff)    │               │ (+40 kg Pure Water)               │
  └───────────────────────────────────┘               └───────────────────────────────────┘

The Delayed Consequence Pipeline

1. The Choice: The player makes a choice to bypass a safety protocol to save 3 AP on Sol 5 (e.g., venting corrosive methane into an unmapped cave system to keep the Sabatier running).
2. The Invisible Flag: The game engine registers zero immediate negative feedback. It adjusts no immediate UI resource numbers down. Instead, it sets an internal boolean state flag: Sabatier_Corrosive_Vent = TRUE.
3. The Silent Incubation: Sols pass normally. The player believes the risk was avoided.
4. The Trigger Event: On Sol 45, the player commands an expansion task to connect the WRS lines to a new sub-surface ice deposit located near that cave system.
5. The Payback: The game engine checks the flag. Because Sabatier_Corrosive_Vent == TRUE, the ice deposit is found to be acidic. The WRS filters are instantly corroded from within, causing an unexpected, catastrophic 30% drop in efficiency, requiring a major narrative emergency mission and a 6 AP repair cost to fix.

Game State Variable Matrix

The system tracks these invisible metrics underneath the primary resource UI:
• Structural_Micro_Fractures (Integer 0-100): Tracks shortcut structural decisions. Triggers random blowout events when pressure increases in late-game acts.
• Crew_Subversion_Index (Float 0.0-1.0): Multiplier on how likely a department is to hide system malfunctions from the Commander based on low trust. High subversion means the player won't receive warnings about system degradation until the system completely fails.
The foundational physics, resource loops, power architecture, and invisible decision frameworks for ARES MISSION 2051 are now mathematically established.
To progress down our design roadmap, should we move to:
1. Step 2: Advisor Character Profiles (Defining the psychology, personal arcs, and hidden agendas of Marco Bellini, Lena Varga, Imani Okafor, and Alex Mercer)?
2. Step 3: Act I — Discovery Finalization (Fleshing out the complete 30 Sol progression using these newly defined survival systems)?

```
```docs/ARES_2051_MASTER_INDEX.md
# ARES MISSION 2051 — Master Index

Document ID: ARES_2051_MASTER_INDEX.md
Státusz: Élő dokumentum — a specifikáció és a kód közötti egyetlen nyilvántartás
Utolsó felülvizsgálat: 2026-11-01 (ennek a designnak a tényleges forráskódja alapján, csak olvasási audit)

---

## 0. Miért van erre szükség

A projektben két, egymástól eltérő játékkoncepció dokumentációja él egymás mellett:

| Kánon | Dokumentumok | Mit ír le | Kód állapota |
|---|---|---|---|
| **A — Operations Command** (rover-küldetés) | `ARES-Operations-Command-Ja-te-kterveze-si-dokumentum-1.md`, `ARES-Operations-Command-Ja-te-klei-ra-s.md` | Egy ARES-1 rover, 4 tanácsadó, 4 pillér (víz, energia, kommunikáció, tudomány), 4 felvonás, Habitat Zero minősítés | **Ez fut a játékban** |
| **B — MISSION 2051** (kolónia-túlélés) | `ARES_2051_SURVIVAL_SYSTEMS_AND_AP_FRAMEWORK.md`, `ARES_2051_SURVIVAL_ECONOMY_AND_ROBOTICS_FRAMEWORK.md`, `ARES_2051_ACT_I_DISCOVERY_COMPLETE.md` | 100 telepesre vetített zárt életfenntartás, 100 kW-os hálózat, 200 robot, Trust & Rebellion, MECI, 6 felvonás | **Csak specifikáció** |

> **Fontos eltérés a GitHub-audithoz képest.** A `Winmix713/aeplanton` repóról készült audit olyan fájlokra hivatkozik (`utils/colony/lifeSupport.ts`, `colonyNight`/`tick.ts`, `data/missions.ts`, `robots.ts`, `RoboticsPanel.tsx`, `ap.ts`, `MECI_TOTAL`), amelyek **ebben a designban nem léteznek**. Ez a fork a korábbi, rover-alapú állapotot tartalmazza. Az audit P0/P1 megállapításai a repóra érvényesek; itt a teljes B-kánon még **NOT STARTED**. Mielőtt bármelyik ág tovább épül, el kell dönteni, melyik a hivatalos forrás (lásd 7. fejezet, D-01).

---

## 1. Státuszjelölések

| Státusz | Jelentés |
|---|---|
| `IMPLEMENTED` | Kódban megvalósult **és** automatizált teszt igazolja. Teszt nélkül nem adható. |
| `PARTIAL` | Kódban létezik, de egyszerűsítve, vagy hiányzik a teszt. |
| `DIVERGENT` | Kódban létezik, de a specifikációtól eltérő szabállyal. |
| `NOT STARTED` | Csak a dokumentációban szerepel. |
| `CONFLICT` | A specifikációk egymásnak ellentmondanak — előbb dönteni kell. |
| `AUDIT-ONLY` | Csak a külső auditban szerepel, nincs mögötte forrásdokumentum a repóban. |

Jelenleg a projektben **nincs tesztkeretrendszer** (a `package.json`-ban nincs `scripts` szekció), ezért egyetlen mechanika sem kaphat `IMPLEMENTED` státuszt.

---

## 2. Dokumentum-nyilvántartás

| ID | Fájl | Kánon | Tartalom | Szerep |
|---|---|---|---|---|
| DOC-A1 | `ARES-Operations-Command-Ja-te-kterveze-si-dokumentum-1.md` | A | Tervezési dokumentum: tanácsadók, bizalom, rendszerek, AP, nehézség, győzelem/vereség | A futó játék alapja |
| DOC-A2 | `ARES-Operations-Command-Ja-te-klei-ra-s.md` | A | Játékleírás: Sol-ciklus, 9 lépéses tudományos lánc, 4 felvonás, első kiadás (12 pont) | A futó játék alapja |
| DOC-B1 | `ARES_2051_SURVIVAL_SYSTEMS_AND_AP_FRAMEWORK.md` | B | §1 AP & Sol motor · §2 zárt körfolyamat · §3 energiahálózat · §4 kopás és sugárzás · §5 rejtett következmények | Rendszer-specifikáció |
| DOC-B2 | `ARES_2051_SURVIVAL_ECONOMY_AND_ROBOTICS_FRAMEWORK.md` | B | §0 idővonal · §1 erőforrások · §2 áramlási egyenletek · §3 hálózat · §4 ARN robotika · §5 AP + robot · §6 hibaláncok · §7 MECI | Gazdasági specifikáció |
| DOC-B3 | `ARES_2051_ACT_I_DISCOVERY_COMPLETE.md` | B | Tanácsadói névjegyzék és titkok · Trust-sávok · M001–M009 (Sol 1–30, 6 fázis) · Callback Engine | Narratív specifikáció |
| DOC-UI | `design-5.md` | — | Aether Planetary Ops vizuális rendszer | UI-forrás, mindkét kánonra érvényes |
| DOC-3D | `threejs.md`, `reszpo.md`, `aether-capabilities-fora.md` | — | 3D-stage és reszponzív irányelvek | Technikai referencia |

---

## 3. Kódtérkép (ebben a designban)

| Terület | Belépési pont | Megjegyzés |
|---|---|---|
| Stratégiai játékállapot | `types/game.ts`, `hooks/useGame.ts` | `GameState` v3 — az egyetlen igazságforrás |
| Sol-feloldás | `utils/game/resolve.ts` | Nappali töltés, éjszakai merítés, bizalomváltozás, győzelem/vereség |
| Parancsok és AP | `data/gameCommands.ts`, `utils/game/commands.ts` | Komplexitás szerinti AP-költség (1 / 2 / 3) |
| Kezdőállapot, napi AP | `utils/game/setup.ts`, `data/difficulty.ts` | Explorer 6 · Engineer 5 · Director 4 AP; Safe Mode −2, minimum 2 |
| Tanácsadók | `data/advisors.ts`, `utils/game/proposals.ts` | NAV / SCI / SYS / COMM, folytonos 0–100 bizalom |
| Pillérek | `data/pillars.ts`, `utils/game/pillars.ts` | Víz, energia, kommunikáció, tudomány; `DEADLINE_SOL = 500` |
| Felvonások | `data/acts.ts` | 4 felvonás, parancsfeloldásokkal |
| Események, környezet | `data/events.ts`, `utils/game/environment.ts` | Viharok, hibák, lehetőségek |
| Pontozás | `data/scoring.ts`, `utils/game/scoring.ts` | Hatékonyság / kockázat / tudomány, érmek |
| Mentés | `utils/storage.ts` | `aether.slot.{n}.v1`, 3 slot, v2 → v3 migráció |
| Valós idejű vizuális szimuláció | `utils/sim/*.ts`, `components/stage/MarsStage.tsx` | `MissionState`, 100 ms-os tick |
| Híd a két réteg között | `hooks/useStageDriver.ts` | Egyirányú: stratégiai → vizuális; az akkumulátort fixen 80-ra állítja |
| Lokalizáció | `data/i18n/en.ts`, `data/i18n/hu.ts`, `contexts/LanguageContext.tsx` | EN / HU |

**Nem létező fájlok** (az audit hivatkozik rájuk): `utils/colony/`, `lifeSupport.ts`, `tick.ts`, `ap.ts`, `data/missions.ts`, `robots.ts`, `RoboticsPanel.tsx`.

---

## 4. Követhetőségi mátrix (B-kánon → kód)

| ID | Mechanika | Forrás | Kód | Státusz | Eltérés / megjegyzés |
|---|---|---|---|---|---|
| SYS-01 | Napi alap AP = 10 | DOC-B1 §1 | `data/difficulty.ts` (6 / 5 / 4) | `DIVERGENT` | Más skála; a nehézség adja az AP-t |
| SYS-02 | Kritikus hiány: alap AP → 6 (morál < 30% vagy O₂/víz-adósság) | DOC-B1 §1 | — | `NOT STARTED` | Nincs morál és nincs életfenntartás |
| SYS-03 | Friction Tax: +1 AP az adott részleg parancsaira, halmozódik | DOC-B1 §1, DOC-B3 | — | `NOT STARTED` | Alacsony bizalom most zajos becslést és 0,7× hatást ad (`commands.ts`) |
| SYS-04 | Környezeti büntetés: −2…−4 AP felszíni műveletnél | DOC-B1 §1 | — | `NOT STARTED` | |
| LS-01 | Nyersjég → WRS → tisztított víz | DOC-B1 §2, DOC-B2 §2 | — | `NOT STARTED` | A „víz” itt jégfelmérési pillér, nem anyagmérleg |
| LS-02 | Elektrolízis: 36 kg H₂O → 32 kg O₂ + 4 kg H₂, 25 kW | DOC-B1 §2, DOC-B2 §2 | — | `NOT STARTED` | Sztöchiometria a két dokumentumban egyezik (0,888 / 0,111) |
| LS-03 | Sabatier: CO₂ + H₂ → H₂O + CH₄, külön metántárolás | DOC-B1 §2, DOC-B2 §2 | — | `NOT STARTED` | |
| LS-04 | Fogyasztás 100 főre/Sol: víz 40 kg, O₂ 32 kg, élelem 50 egység | DOC-B2 §1 | — | `NOT STARTED` | |
| LS-05 | Külön készletek: szennyvíz, nyersjég, Sabatier-víz, tisztított víz | Audit P0-1 | — | `NOT STARTED` | |
| PWR-01 | Napelem 100 kW × (1 − por) × időjárás | DOC-B1 §3, DOC-B2 §3 | `utils/sim/power.ts` (4,2 kW, csak vizuális) | `NOT STARTED` | A stratégiai réteg a rover akkumulátorát %-ban kezeli |
| PWR-02 | RTG 20 kW konstans | DOC-B1 §3, DOC-B2 §3 | `resolve.ts` (rover RTG 110 W, −0,02/Sol) | `DIVERGENT` | Rover-léptékű |
| PWR-03 | Akkumulátor 500 kWh, nappali/éjszakai mérleg | DOC-B1 §3, DOC-B2 §3 | `resolve.ts` (rover akkumulátor %) | `DIVERGENT` | |
| PWR-04 | Lekapcsolási sorrend: SCI → NAV → SYS → életfenntartás | DOC-B1 §3 | — | `NOT STARTED` | Brownout most 0% → 6% visszaállás |
| PWR-05 | Töltési / kisütési veszteség | Audit P0-2 | — | `AUDIT-ONLY` | Nincs forrásdokumentumban rögzített érték |
| PWR-06 | Por: +1%/Sol, tisztítás 2 AP vagy 5 SYS robot | DOC-B1 §3, DOC-B2 §3–4 | `resolve.ts` (porfaktor a töltésben) | `PARTIAL` | Nincs tisztítási művelet a por csökkentésére |
| DEG-01 | Integritás: −2%/Sol, túlhajtás −8%, küszöbök 75 / 50 / 25% | DOC-B1 §4 | `utils/sim/faults.ts`, kerékállapot | `PARTIAL` | Csak rover-alkatrészekre |
| RAD-01 | Sugárzás, dózisgyűjtés, lávacsatorna 95% árnyékolás | DOC-B1 §4 | `utils/game/environment.ts` | `PARTIAL` | Ellenőrizni kell, hogy dózist gyűjt-e |
| TR-01 | Trust-sávok 81–100 / 36–80 / 15–35 / 0–14 | DOC-B3 | `data/advisors.ts` (30 / 70, start 55) | `DIVERGENT` | 3 sáv 4 helyett, más határok |
| TR-02 | Loyal: −1 AP a részlegnél, titkok feltárulnak | DOC-B3 | — | `NOT STARTED` | |
| TR-03 | Defiant: parancsmegtagadás, autonóm erőforrás-lefoglaló projektek | DOC-B3, DOC-B2 §7 | — | `NOT STARTED` | |
| TR-04 | Kapcsolatmátrix (NAV–SCI, SYS–COMM) | Audit P0-3 | — | `AUDIT-ONLY` | A három B-dokumentum nem definiálja |
| TR-05 | Crew_Subversion_Index (0,0–1,0) | DOC-B1 §5 | — | `NOT STARTED` | |
| TR-06 | Tanácsadói titkok (Delta-gerinc, katalizátorágy, metaadat-figyelő) | DOC-B3 | — | `NOT STARTED` | |
| ROB-01 | 200 robot, 4 × 50 flotta | DOC-B2 §4 | — | `NOT STARTED` | Egyetlen rover van |
| ROB-02 | Flotta-specialitások (pl. 10 NAV robot → −15% rover-sérülés) | DOC-B2 §4 | — | `NOT STARTED` | |
| ROB-03 | Kopás 2% × környezeti szorzó (1 / 3 / 5), 50% és 25% küszöb | DOC-B2 §4 | — | `NOT STARTED` | |
| ROB-04 | Parancs = AP + robotigény + végrehajtási idő | DOC-B2 §5 | — | `NOT STARTED` | |
| ROB-05 | Mentőakció: 5 AP + 10 robot, különben flottavesztés | DOC-B2 §6 | — | `NOT STARTED` | |
| CMP-01 | 500 Solos kampány | DOC-B2 §0 | `DEADLINE_SOL = 500` | `PARTIAL` | |
| CMP-02 | 6 felvonás (I. Discovery … VI. New Humanity) | Audit P1-4 | `data/acts.ts` (4 felvonás) | `AUDIT-ONLY` | A 6 felvonás Sol-határai nincsenek forrásdokumentumban |
| CMP-03 | Act I: M001–M009, Sol 1–30, 6 fázis | DOC-B3 | — | `NOT STARTED` | A kód Act I-e Sol 1–100 |
| CMP-04 | Rejtett flag-ek és késleltetett következmények (Callback Engine) | DOC-B1 §5, DOC-B3 | — | `NOT STARTED` | |
| MECI-01 | 10 000 000 élet, −250 000 / Sol késés | DOC-B2 §7 | — | `NOT STARTED` | |
| MECI-02 | Felvonásonkénti határidők | DOC-B2 §7 | — | `CONFLICT` | A dokumentum hivatkozik rájuk, de értéket nem ad |
| MECI-03 | Egyidejű víz- és O₂-hiány = egyetlen késési nap | Audit P1-5 | — | `AUDIT-ONLY` | Szabályként rögzíteni kell a B-kánonban |
| END-01 | Befejezések (United Human Colony, Survival Regime, Fragmentation) | DOC-B2 §7 | `resolve.ts` (győzelem / vereség) | `DIVERGENT` | Most bináris kimenet + érem |
| SAVE-01 | Verziózott mentés, migráció | — | `utils/storage.ts` (v3) | `PARTIAL` | Nincs teszt |
| I18N-01 | EN / HU paritás | — | `data/i18n/*` | `PARTIAL` | Nincs kulcs-paritás ellenőrzés |

---

## 5. Belső ellentmondások a specifikációkban

Ezeket a kódolás **előtt** kell feloldani, különben a kód rögzíti a hibát.

| ID | Ellentmondás | Hol | Javasolt feloldás |
|---|---|---|---|
| C-01 | Nappal 14 h + éjszaka 10 h = 24 h, a Sol viszont 24,6 h; az audit 13 h nappalt említ | DOC-B2 §3, audit | Egyetlen konstans: `SOL_HOURS = 24.66`, `DAYLIGHT_HOURS` rögzítve |
| C-02 | Friction „< 35%” vs. „15–35%” — a 35 benne van-e | DOC-B1 §1, DOC-B3 | A sávok zárt egész tartományok: 0–14, 15–35, 36–80, 81–100 |
| C-03 | COMM vezető: Alex Mercer (dokumentum) vs. Aiko Tanaka (kód) | DOC-B3, `data/advisors.ts` | Kánon-döntés (D-01) után egységesíteni |
| C-04 | Act I hossza: Sol 1–30 vs. kódban 1–100 | DOC-B3, `data/acts.ts` | A B-kánon 6 felvonásos Sol-táblája kerüljön be egy forrásdokumentumba |
| C-05 | MECI „Act-határidők” értékek nélkül | DOC-B2 §7 | Felvonásonkénti infrastruktúra-célok és határ-Solok táblázata |
| C-06 | A dokumentumok %-os és kg-os egységeket keverik (M001: „+25% oxigéntartalék”, LS-04: kg/Sol) | DOC-B3, DOC-B2 §1 | A motor kg-ban számol, a UI jelenít meg %-ot |
| C-07 | Teljes hálózati leállás és életfenntartási adósság egyszerre két késési napot okozhat | Audit P1-5 | Sol-onként legfeljebb 1 késési nap (`delaySols += min(1, …)`) |

---

## 6. Fejlesztési ütemterv és kapuk

| Fázis | Cél | Kilépési feltétel |
|---|---|---|
| **0 — Kánon-döntés** | D-01 lezárása; a választott kánon dokumentumai „Canonical” státuszt kapnak | Ez a dokumentum frissítve, C-01…C-07 döntéssel |
| **1 — Canonical Game Rules** | Egyetlen `data/rules.ts`: AP, Trust-sávok, robotok, MECI, idővonal, erőforrás-konstansok | Minden konstans egy helyen, hivatkozással a forrás-ID-ra |
| **2 — Simulation Accuracy** | LS-01…05, PWR-01…06 tiszta függvényekként (`utils/colony/*`) | Anyagmérleg-tesztek zöldek; nincs dupla késés |
| **3 — Advisor Intelligence** | TR-01…06, autonóm projektek, szabotázs, helyreállítás | Sáv-átmenet tesztek; Defiant-ág reprodukálható seed-del |
| **4 — Full Campaign Narrative** | CMP-02…04, mind a 6 felvonás küldetéslánca, befejezések | Minden befejezés elérhető legalább egy seed-del |
| **5 — Validation & QA** | 500 Solos automatizált futtatás, mentési és lokalizációs tesztek | Lásd 8. fejezet |
| **6 — Presentation & Polish** | Hero, küldetésindítás, HUD, kolónia- és tanácsadói képernyők, ARN panel | Vizuális átvétel a `design-5.md` alapján |

A stratégiai `GameState` marad az egyetlen igazságforrás. A `MissionState` csak megjelenít; a `useStageDriver` soha nem írhat vissza erőforrást.

---

## 7. Nyitott döntések

| ID | Kérdés | Opciók | Hatás |
|---|---|---|---|
| D-01 | Melyik a hivatalos kánon? | (a) B-kánon a rover-játékra építve · (b) A-kánon marad, a B elemei fokozatosan · (c) a GitHub-repó állapota lesz az alap, ez a fork archív | Minden további fázist meghatároz |
| D-02 | Felvonások száma és Sol-határai | 4 (kód) · 6 (audit) | CMP-02, MECI-02 |
| D-03 | Az alap AP skálája | 10 + módosítók · nehézségi szintenkénti érték | SYS-01, a teljes egyensúly |
| D-04 | Robotok léptéke a UI-ban | Egyedi egységek · flottaszintű összesítés | ROB-01…05, ARN panel |

---

## 8. Tesztelési követelmények

Előfeltétel: Vitest hozzáadása a `package.json`-hoz (`"test": "vitest run"`), a szimuláció tiszta függvényekben (React nélkül).

| Teszt | Mit igazol | Kapcsolódó ID |
|---|---|---|
| Anyagmérleg | Sol-onként a H, O, C tömeg a rendszerben megmarad (± venting) | LS-01…05 |
| Energiamérleg | Nappali/éjszakai egyenleg, lekapcsolási sorrend pontosan SCI → NAV → SYS → LS | PWR-01…06 |
| AP | Friction Tax részlegenként és halmozva; kritikus hiány → 6 AP | SYS-01…04, TR-02 |
| Trust-átmenetek | 14/15, 35/36, 80/81 határokon a helyes sáv | TR-01, C-02 |
| Késés | Egy Sol alatt legfeljebb +1 `delaySols` | MECI-01…03, C-07 |
| Determinizmus | Azonos seed + parancsok → azonos állapot | Minden |
| 500 Sol | 1000 seed × 3 nehézség; nincs NaN, negatív készlet vagy elakadt állapot | Minden |
| Befejezések | Minden befejezés elérhető | END-01 |
| Mentés | Minden korábbi verzió betölthető és migrálható | SAVE-01 |
| Lokalizáció | EN és HU kulcskészlet azonos | I18N-01 |

---

## 9. Karbantartási szabályok

1. Új mechanika csak ID-val kerülhet ebbe a mátrixba; a kódban a konstans mellé kommentként kerül az ID (pl. `// LS-02`).
2. `IMPLEMENTED` státuszt csak a 8. fejezet szerinti zöld teszt után lehet adni.
3. Ha kód és specifikáció eltér, a mátrix `DIVERGENT` sort kap, és vagy a kód, vagy a dokumentum javul — mindkettő nem maradhat érvényben.
4. Minden auditból származó, forrás nélküli szabály (`AUDIT-ONLY`) vagy bekerül egy B-dokumentumba, vagy törlődik.

```
