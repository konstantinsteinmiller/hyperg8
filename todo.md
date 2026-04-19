# hyperg8-webpage — outstanding manual work

Short, precise list. Each line points at a file and what to change.

## Content

- ~~**Game preview images** — wired to `public/images/*.webp`. Replace the file
  in `public/images/` (and update `preview` in `src/data/games.ts`) to swap.~~
- **Open Graph / social share image** → drop a 1200×630 JPG into
  `public/preview/og-cover.jpg`. Referenced by `index.html` for Twitter/Facebook
  link previews. Until present, social cards will show a broken image.
- **Real platform URLs** → `src/data/games.ts`, `platforms[].url` per game
  (currently placeholder homepages: `store.steampowered.com`, `crazygames.com`,
  `wavedash.com`, `itch.io`).
- **Game copy** → tweak `title` / `tagline` / `description` / `genres` in
  `src/data/games.ts` if you want different marketing text.
- **Preview ratio override** → if you want square/portrait previews, change
  `aspect-ratio: 16 / 10;` in `src/components/GameCard.vue` (`.game-card__media-tilt`).

## Legal

- **Privacy policy text** → edit `src/assets/privacy-policy.md` (rendered as the
  `XModal` body via `useMarkdown`).
- **Impressum text** → replace placeholder in `src/data/company.ts`
  → `company.impressumMd`. Also fill `email`, `location`, `founded`, `legalName`.

## In-app purchases (Windows .exe)

- Per game, in `src/data/games.ts`:
  ```
  windowsPurchase: { enabled: true, url: 'https://...', price: '€9.99' }
  ```
  Flip `enabled: true` and add `url` to surface the "Buy for Windows" CTA.

## PayPal consent banner

- Activate the system → `src/data/company.ts` → `payments.enabled = true`
  and set `payments.provider` (`'PayPal'` by default).
- Trigger the banner from your purchase flow:
  ```
  import useConsent from '@/use/useConsent'
  const consent = useConsent()
  // right after login + click "Buy with PayPal":
  consent.request()
  // only load PayPal SDK when `consent.isAccepted.value === true`
  ```
- Banner copy / styling lives in `src/components/ConsentBanner.vue`.

## Branding

- **Company name / email / location** → `src/data/company.ts`.
- **Favicon** → replace `public/favicon.svg`.
- **OG / SEO meta** → `index.html` (`<meta>` tags, title).
- **Brand fonts** → currently Inter + Space Grotesk via Google Fonts in
  `index.html`. Swap or self-host as needed.

## Adding a new platform

1. Add the platform definition in `src/data/platforms.ts` (id, label, color,
   inline 24×24 SVG `path`).
2. Reference it from any game's `platforms` array in `src/data/games.ts`.
   Done — button styling is automatic.

## Deployment

- **GitHub Pages** → first time: create empty `gh-pages` branch, then
  `pnpm deploy:gh`. In repo settings: Pages → branch `gh-pages` → root.
- **Surge** → `pnpm deploy:surge`. First run prompts for email + domain
  (`hyperg8.surge.sh`). Domain is remembered in `dist/CNAME` if you set one.
- **Custom domain** → drop a `CNAME` file with your domain into `public/` so it
  is copied into `dist/` on every build.
- **Sub-path hosting** → already handled (`vite.config.ts` `base: './'`).

## i18n / translations

- **Source of truth** → `src/i18n/locales/en.ts`. Every UI string lives here
  (nav, hero, games, cards, about, footer, modals, consent banner, interlude
  captions). `en` is bundled with the first paint.
- **Stub locales waiting to be filled** (each is `export default {}` and
  silently falls back to `en`):
  `de`, `es`, `fr`, `it`, `pt`, `ru`, `zh`, `ja`, `ko`, `hi`, `ar`.
  Files in `src/i18n/locales/`. Lazy-loaded — the user's browser language
  triggers the import; everyone else stays on the bundled English.
- **To translate a locale**: open e.g. `src/i18n/locales/de.ts`, paste the
  shape of `en.ts`, and translate. Missing keys = English fallback.
- **Add a brand-new locale**: create `src/i18n/locales/<code>.ts`, then add
  the code to `SUPPORTED_LOCALES` (and `RTL_LOCALES` if right-to-left)
  in `src/i18n/index.ts`.
- **Game content (titles / taglines / descriptions)** is currently NOT
  translated — it lives in `src/data/games.ts`. To translate per-locale,
  move each game's strings into i18n keys (e.g. `games.chaos-arena.title`)
  and replace the raw string in `games.ts` with `$t(...)` lookups.
- **Impressum text** is in `src/data/company.ts` (`impressumMd`). Markdown
  per-locale would mean: switch on the active locale and pick a different
  markdown body — easiest is one `impressumMd_<locale>` per language.
- **Privacy policy** is `src/assets/privacy-policy.md`. For per-locale:
  rename to `privacy-policy.en.md` and add `privacy-policy.<locale>.md`,
  then update `PrivacyModal.vue` to import the matching file based on
  `i18n.global.locale.value`.

## Concept-art interludes

- Three parallax interludes sit between Hero/Games, Games/About and About/Footer.
- Art lives in `src/data/sketches.ts` as inline SVG strings (B&W ink style).
  - To swap a layer for real artwork: drop a `.svg` into
    `src/assets/sketches/`, import it `?raw`, and replace the `markup` field
    of the relevant layer (`sketchVariants.<id>.layers[i].markup`).
  - Tweak `speed` per layer for stronger/weaker parallax travel.
  - `caption` shows under each interlude — change per variant.
- Add a fourth variant: extend `sketchVariants` and place
  `<ParallaxInterlude variant="myId" />` anywhere in `App.vue`.

## Nice-to-have (not blocking)

- Replace inline SVG platform icons with the official brand glyphs once you
  have license / brand-kit assets (`src/data/platforms.ts` `icon` field).
- Add a `<noscript>` fallback in `index.html` for SEO crawlers if needed.
- Add screenshots/trailer modal per game → wire a new entry in `useModals`
  and a `<GalleryModal>` triggered from `GameCard.vue`.
