# hyperg8 — one-pager

The studio site for **hyperg8** — built with **Vue 3 + Vite + TypeScript**, templated in
**Pug**, styled with **Tailwind CSS** and **Sass**, and deployable as a static bundle
to GitHub Pages, Surge, any plain static host, or `localhost`.

```
pnpm install
pnpm dev          # http://localhost:3033
pnpm build        # static bundle in ./dist
pnpm preview      # serve ./dist locally on :3033
```

> Uses **pnpm** (declared via `packageManager` in `package.json`). If you don't have it:
> `npm i -g pnpm` or `corepack enable && corepack prepare pnpm@latest --activate`.

---

## Project map

```
src/
├── atoms/             ← reusable glassmorphism primitives (VModal, XButton, …)
├── components/        ← page sections (TopNav, Hero, GamesSection, GameCard, …)
├── use/               ← composables (useScroll, useParallax, useReveal, useModals, …)
├── data/              ← editable catalogue: games.ts, platforms.ts, company.ts
├── assets/            ← privacy-policy.md (raw-imported, edit freely)
├── App.vue            ← page shell + modal portal
├── main.ts            ← bootstrap
└── style.scss         ← Tailwind + global glass utilities

public/
├── favicon.svg
└── preview/           ← drop game cover images here (rodent-race.jpg, …)
```

---

## Adding a new platform link to a game

Open `src/data/games.ts` and append to the `platforms` array of the relevant game:

```ts
{ platform: 'appstore', url: 'https://apps.apple.com/your-app' }
```

If the platform itself is new (i.e. not Steam/CrazyGames/Play Store/App Store/Wavedash/itch.io
/Windows), register it once in `src/data/platforms.ts` with an id, label, brand color and
inline SVG icon. The button styling is automatic.

To mark something as upcoming:

```ts
{ platform: 'playstore', upcoming: true, label: 'Coming soon' }
```

---

## Enabling the "Buy for Windows" CTA

Each game in `src/data/games.ts` has a `windowsPurchase` block:

```ts
windowsPurchase: {
  enabled: true,
  url: 'https://gumroad.com/...',
  price: '€9.99',
}
```

Flip `enabled` to `true` and the standalone Windows .exe purchase button appears on the card.

---

## Adding game preview images

Drop a `1600x1000` (16:10) image into `public/preview/` matching the `preview` field in
`games.ts`, e.g. `public/preview/rodent-race.jpg`. The card falls back to a styled
placeholder if the image is missing.

---

## Updating legal pages

- **Privacy Policy** lives in `src/assets/privacy-policy.md` — edit in markdown, the
  modal renders it automatically.
- **Impressum** lives in `src/data/company.ts` under `impressumMd` — also markdown.

---

## Deployment

### GitHub Pages
```
pnpm build
pnpm deploy:gh           # pushes ./dist to the `gh-pages` branch
```
Then in the repo settings, enable Pages → branch `gh-pages` → root.

The build uses a relative `base: './'` so the site works from any sub-path.

### Surge.sh
```
pnpm build
pnpm deploy:surge        # prompts for a domain on first run
```

### Plain static host / S3 / nginx
Upload the contents of `./dist` as-is.

### Localhost
```
pnpm dev                 # development with HMR (http://localhost:3033)
pnpm preview             # production build, served locally on :3033
```

---

## Tech notes

- **Pug** is enabled per-file via `<template lang="pug">` — no extra Vite config required.
- **Sass** is enabled per-file via `<style lang="scss" scoped>`.
- **Tailwind** classes can be used freely inside Pug templates and inside `.scss` via `@apply`.
- **Composables** under `src/use/` follow the existing project convention (`useTheme.ts`).
- **Glassmorphism** primitives in `src/atoms/` are reused for the privacy / impressum modals
  via `VModal` + `XButton`.
- **Mobile first**: every breakpoint is `min-width:` based; the layout collapses to a single
  column on phones with full-bleed cards, and a hamburger-free top bar that keeps brand + CTA.
- **Accessibility**: respects `prefers-reduced-motion`, has a visible focus ring, and uses
  semantic landmarks (`<header>`, `<main>`, `<footer>`, `<section>` with ids for in-page nav).
