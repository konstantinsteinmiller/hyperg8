/**
 * Hand-drawn-feeling SVG art used by the ParallaxInterlude component.
 *
 * Each variant has three layers (back / mid / front), painted in white-on-dark
 * with slight stroke jitter so they read as pencil/ink concept art. They are
 * deliberately abstract so the studio can later swap them for real artwork
 * by editing the `markup` payload — the component does not care about the
 * inner SVG structure.
 *
 *   To replace with real concept art:
 *   - drop a .svg file into `src/assets/sketches/`
 *   - import it `?raw` and put the markup string into `markup` below.
 */

export interface SketchLayer {
  /** parallax multiplier — larger = more travel during scroll */
  speed: number
  /** vertical offset in viewport-relative units (e.g. "10%") */
  top?: string
  left?: string
  right?: string
  /** maximum width as CSS, e.g. "60vw" */
  width?: string
  /** raw <svg>...</svg> string */
  markup: string
  /** optional opacity override (defaults to layer position) */
  opacity?: number
}

export interface SketchVariant {
  id: string
  /** i18n key for the small caption shown under the interlude */
  captionKey: string
  /** background tint sweep used behind the art */
  glow: [string, string]
  layers: SketchLayer[]
}

/* ---------- shared ink style ---------- */
const ink = `stroke="#f4f6ff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"`
const inkSoft = `stroke="#f4f6ff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.6"`
const inkBold = `stroke="#f4f6ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"`

/* ---------- variant 1 — rodents in motion ---------- */
const v1Back = `
<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- world-map fragment, dotted coastline -->
  <g ${inkSoft}>
    <path d="M40 220 q60 -40 130 -20 t150 10 t160 -30 t180 20 t110 -10" stroke-dasharray="3 7"/>
    <path d="M80 280 q70 30 160 10 t180 -20 t200 30 t150 -10" stroke-dasharray="2 6" opacity="0.5"/>
    <circle cx="170" cy="150" r="60" stroke-dasharray="1 5"/>
    <circle cx="600" cy="120" r="90" stroke-dasharray="1 5"/>
    <circle cx="430" cy="320" r="40" stroke-dasharray="1 5"/>
  </g>
  <!-- compass rose -->
  <g transform="translate(700 300)" ${inkSoft}>
    <circle r="34"/>
    <path d="M0 -30 L8 0 L0 30 L-8 0 Z"/>
    <path d="M-30 0 L0 -8 L30 0 L0 8 Z"/>
    <text x="0" y="-40" text-anchor="middle" font-family="serif" font-size="10" fill="#f4f6ff" stroke="none" opacity="0.8">N</text>
  </g>
</svg>`

const v1Mid = `
<svg viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- big rodent silhouette mid-sprint -->
  <g transform="translate(140 60)" ${inkBold}>
    <path d="M30 180 q40 -90 130 -100 q70 -8 120 28 q40 26 50 70 q4 18 -8 30 q-30 28 -86 28 l-150 0 q-46 0 -56 -22 q-12 -22 0 -34 z"/>
    <!-- ear -->
    <ellipse cx="240" cy="92" rx="22" ry="28" transform="rotate(-20 240 92)"/>
    <!-- eye -->
    <circle cx="278" cy="118" r="3.4" fill="#f4f6ff"/>
    <!-- nose -->
    <circle cx="312" cy="138" r="3" fill="#f4f6ff"/>
    <!-- whiskers -->
    <g ${ink}>
      <path d="M308 140 q40 -8 70 -2"/>
      <path d="M306 146 q40 0 72 8"/>
      <path d="M304 152 q42 6 70 18"/>
    </g>
    <!-- legs in motion -->
    <path d="M120 230 l-26 30 M170 230 l-30 36 M200 230 l-22 40 M240 230 l-32 36"/>
    <!-- tail curl -->
    <path d="M40 200 q-50 -20 -40 -70 q10 -42 60 -28" fill="none"/>
  </g>
  <!-- speed lines -->
  <g ${inkSoft}>
    <path d="M30 100 L130 110"/>
    <path d="M0 140 L150 150"/>
    <path d="M40 190 L120 196"/>
    <path d="M20 240 L150 240"/>
  </g>
</svg>`

const v1Front = `
<svg viewBox="0 0 800 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- scribbled track + debris -->
  <g ${ink}>
    <path d="M0 200 q200 -60 400 -10 t400 -20" stroke-dasharray="14 10"/>
  </g>
  <g ${inkSoft}>
    <circle cx="120" cy="140" r="3"/>
    <circle cx="180" cy="120" r="2"/>
    <circle cx="260" cy="150" r="3"/>
    <circle cx="640" cy="120" r="3"/>
    <circle cx="710" cy="150" r="2"/>
    <path d="M520 110 l8 -16 l8 16 l-8 6 z"/>
    <path d="M340 90 l6 -12 l6 12 l-6 4 z"/>
  </g>
</svg>`

/* ---------- variant 2 — cards & arena ---------- */
const v2Back = `
<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- arena floor in perspective -->
  <g ${inkSoft}>
    <path d="M0 320 L800 320"/>
    <path d="M150 320 L380 100"/>
    <path d="M650 320 L420 100"/>
    <path d="M380 100 L420 100"/>
    <path d="M70 320 L360 130"/>
    <path d="M730 320 L440 130"/>
    <path d="M260 320 L390 170"/>
    <path d="M540 320 L410 170"/>
  </g>
  <!-- moon / sigil -->
  <g transform="translate(640 90)" ${inkSoft}>
    <circle r="44"/>
    <circle r="44" cx="14" stroke-dasharray="4 6"/>
  </g>
</svg>`

const v2Mid = `
<svg viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- floating playing cards -->
  <g transform="translate(120 60) rotate(-12)" ${inkBold}>
    <rect x="0" y="0" width="120" height="170" rx="10"/>
    <circle cx="60" cy="55" r="14"/>
    <path d="M40 105 L80 105 M40 125 L80 125 M40 145 L80 145" ${ink}/>
  </g>
  <g transform="translate(310 30) rotate(6)" ${inkBold}>
    <rect x="0" y="0" width="120" height="170" rx="10"/>
    <path d="M60 30 L80 80 L60 130 L40 80 Z"/>
    <circle cx="60" cy="80" r="6"/>
  </g>
  <g transform="translate(500 70) rotate(18)" ${inkBold}>
    <rect x="0" y="0" width="120" height="170" rx="10"/>
    <path d="M30 30 L90 30 M30 50 L90 50" ${ink}/>
    <path d="M40 80 q20 -20 40 0 t-40 30 t40 30" ${ink}/>
  </g>
  <!-- fighter silhouette -->
  <g transform="translate(660 110)" ${inkBold}>
    <circle cx="0" cy="0" r="14"/>
    <path d="M0 14 L0 70 M-22 30 L0 50 L26 24 M-16 110 L0 70 L20 110"/>
    <path d="M26 24 L48 8 L60 18" ${ink}/>
  </g>
</svg>`

const v2Front = `
<svg viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g ${ink}>
    <!-- arcane scribbles -->
    <path d="M50 160 q10 -30 30 -10 t30 -20 t30 30 t30 -10"/>
    <path d="M620 60 q30 -10 50 20 t40 -10"/>
  </g>
  <g ${inkSoft}>
    <circle cx="200" cy="40" r="4"/>
    <circle cx="240" cy="60" r="2"/>
    <circle cx="180" cy="80" r="3"/>
    <path d="M740 130 l10 -16 l10 16 l-10 6 z"/>
  </g>
</svg>`

/* ---------- variant 3 — spinning machines ---------- */
const v3Back = `
<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- gears / blueprints -->
  <g transform="translate(140 180)" ${inkSoft}>
    <circle r="80"/>
    <circle r="60"/>
    <g>
      <path d="M0 -90 L0 -70 M0 90 L0 70 M-90 0 L-70 0 M90 0 L70 0"/>
      <path d="M-64 -64 L-50 -50 M64 -64 L50 -50 M-64 64 L-50 50 M64 64 L50 50"/>
    </g>
  </g>
  <g transform="translate(640 130)" ${inkSoft}>
    <circle r="60"/>
    <circle r="40"/>
    <path d="M0 -68 L0 -52 M0 68 L0 52 M-68 0 L-52 0 M68 0 L52 0"/>
  </g>
  <!-- blueprint grid -->
  <g ${inkSoft} opacity="0.25">
    <path d="M0 60 L800 60 M0 120 L800 120 M0 180 L800 180 M0 240 L800 240 M0 300 L800 300"/>
    <path d="M100 0 L100 360 M260 0 L260 360 M420 0 L420 360 M580 0 L580 360 M740 0 L740 360"/>
  </g>
</svg>`

const v3Mid = `
<svg viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- spinner top in motion -->
  <g transform="translate(400 160)" ${inkBold}>
    <ellipse cx="0" cy="0" rx="120" ry="22" fill="none"/>
    <ellipse cx="0" cy="-16" rx="92" ry="18" fill="none"/>
    <path d="M-92 -16 L-50 -90 L50 -90 L92 -16 Z"/>
    <path d="M-50 -90 L0 -150 L50 -90"/>
    <path d="M0 -150 L0 -180"/>
    <path d="M-30 0 L0 60 L30 0"/>
    <!-- attack ring teeth -->
    <path d="M-120 0 L-140 -10 M120 0 L140 -10 M-104 -16 L-120 -36 M104 -16 L120 -36"/>
  </g>
  <!-- motion arcs -->
  <g ${ink}>
    <path d="M250 120 q150 -60 300 0" stroke-dasharray="6 8"/>
    <path d="M260 200 q140 60 280 0" stroke-dasharray="6 8" opacity="0.5"/>
  </g>
</svg>`

const v3Front = `
<svg viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g ${ink}>
    <!-- annotation arrows -->
    <path d="M120 60 L210 110"/>
    <path d="M210 110 l-14 -2 l4 12"/>
    <text x="80" y="56" font-family="serif" font-size="14" fill="#f4f6ff" stroke="none">attack ring</text>
    <path d="M680 80 L580 130"/>
    <path d="M580 130 l14 0 l-4 -12"/>
    <text x="640" y="74" font-family="serif" font-size="14" fill="#f4f6ff" stroke="none">stabilizer</text>
  </g>
</svg>`

export const sketchVariants: Record<string, SketchVariant> = {
  rodents: {
    id: 'rodents',
    captionKey: 'interlude.rodents',
    glow: ['rgba(94,131,255,0.18)', 'rgba(255,138,0,0.10)'],
    layers: [
      { speed: 0.08, top: '8%', left: '0%', width: '110vw', opacity: 0.55, markup: v1Back },
      { speed: 0.22, top: '18%', left: '8%', width: '85vw', opacity: 0.85, markup: v1Mid },
      { speed: 0.4, top: '46%', left: '4%', width: '95vw', opacity: 0.75, markup: v1Front },
    ],
  },
  cards: {
    id: 'cards',
    captionKey: 'interlude.cards',
    glow: ['rgba(123,63,242,0.16)', 'rgba(255,72,198,0.12)'],
    layers: [
      { speed: 0.1, top: '6%', left: '0%', width: '110vw', opacity: 0.5, markup: v2Back },
      { speed: 0.24, top: '18%', left: '6%', width: '88vw', opacity: 0.85, markup: v2Mid },
      { speed: 0.42, top: '52%', left: '2%', width: '96vw', opacity: 0.7, markup: v2Front },
    ],
  },
  spinners: {
    id: 'spinners',
    captionKey: 'interlude.spinners',
    glow: ['rgba(0,212,255,0.18)', 'rgba(58,89,255,0.12)'],
    layers: [
      { speed: 0.1, top: '6%', left: '0%', width: '110vw', opacity: 0.45, markup: v3Back },
      { speed: 0.26, top: '14%', left: '4%', width: '92vw', opacity: 0.9, markup: v3Mid },
      { speed: 0.44, top: '54%', left: '2%', width: '96vw', opacity: 0.75, markup: v3Front },
    ],
  },
}
