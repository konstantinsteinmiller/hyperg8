/**
 * English — the source-of-truth locale, bundled with the first paint.
 *
 * Edit copy here freely. Other locale files (`de.ts`, `es.ts`, ...) only need
 * to override the keys they want translated; everything else falls back to en.
 *
 * Game titles, taglines, descriptions live in `src/data/games.ts` (content),
 * not here (UI copy). Move them under `games.<id>.title` later if you decide
 * to translate game content too.
 */

export default {
  nav: {
    games: 'Games',
    studio: 'Studio',
    contact: 'Contact',
    cta: 'Play now',
  },
  hero: {
    eyebrow: '⌁ independent game studio',
    headline: {
      part1: 'Crafting',
      accent1: ' worlds',
      comma: ',',
      part2: 'built for',
      accent2: ' play.',
    },
    lede:
      'hyperg8 is the studio behind Chaos Arena, Nexus Orbiter, Card Quest, Rodent Race, Spinner Machines and Solariancer — bite-sized arcade, action, card, physics and idle games designed for one more round.',
    ctaPrimary: 'See the games',
    ctaSecondary: 'About the studio',
    stats: {
      titles: 'shipped titles',
      platforms: 'platforms',
      replays: 'replays',
    },
    scrollHint: 'Scroll',
  },
  games: {
    eyebrow: '⌁ track record',
    title: 'Games we have shipped.',
    lede:
      'A growing catalogue of very different ways to play. Fling a spinner, flip an orbital drone, draw a fairy card, race a rodent or herd celestial bodies into the Sun — each title is built to be picked up in seconds and replayed for hours.',
  },
  card: {
    platformsTitle: 'Play it on',
    notReleased: 'Not yet released to the public.',
    comingSoon: 'Coming soon',
    windowsLabel: 'Windows .exe',
    windowsSoon: 'Soon',
    previewAlt: '{title} preview',
  },
  about: {
    eyebrow: '⌁ the studio',
    title: 'Small studio. Big play.',
    copy1:
      'hyperg8 is a tiny independent studio chasing the joy of a perfect mechanic. We build games we want to play ourselves: deep enough to master, light enough to fit a coffee break.',
    copy2:
      'Every release is a complete, self-contained experience — no shady price hikes, no dark patterns. Just craft.',
    pillars: {
      design: { title: 'Design first', body: 'Mechanics that respect your time and your intelligence.' },
      replay: { title: 'Built for replay', body: 'Tight loops, fair systems, runs you want to start again.' },
      cross:  { title: 'Cross-platform', body: 'Web, mobile and desktop — play wherever you are.' },
    },
  },
  footer: {
    contact: 'Contact',
    legal: 'Legal',
    impressum: 'Impressum',
    privacy: 'Privacy policy',
    addressLine: '{location} · founded {year}',
    rights: '© {year} {name}. All rights reserved.',
    sub: 'Strategy · Action · Card games — built in {location}.',
  },
  consent: {
    title: 'We use {provider} to process in-app purchases.',
    bodyBefore:
      'Continuing loads {provider} scripts which may set cookies and share technical data with {provider}. See our ',
    policyLink: 'privacy policy',
    bodyAfter: ' for details.',
    decline: 'Decline',
    accept: 'Accept & continue',
    aria: '{provider} payment consent',
  },
  modals: {
    privacyTitle: 'Privacy Policy',
    imprintTitle: 'Imprint',
    close: 'Close',
  },
  interlude: {
    rodents: 'from the studio sketchbook · rodent kinematics',
    cards:   'from the studio sketchbook · arena artwork',
    spinners:'from the studio sketchbook · spinner blueprint',
  },
}
