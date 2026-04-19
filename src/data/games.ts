/**
 * The hyperg8 catalogue.
 *
 * To list a game on a new platform: just add a new entry to its `platforms`
 * array. The platform must exist in `data/platforms.ts`.
 *
 *   { platform: 'appstore', url: 'https://apps.apple.com/...' }
 *
 * To temporarily mark a release as upcoming, set `upcoming: true` and omit `url`.
 *
 * Windows-executable in-app-purchases:
 * Set `windowsPurchase.enabled = true` and provide `url` (and optionally `price`)
 * to surface the "Buy for Windows" call-to-action on the card.
 */

export interface GameLink {
  /** id from `platforms.ts` */
  platform: string
  /** outbound URL — omit when `upcoming: true` */
  url?: string
  /** marketing label override, e.g. "Coming soon" */
  label?: string
  /** if true, render disabled with "Coming soon" copy */
  upcoming?: boolean
}

export interface GameDef {
  id: string
  title: string
  tagline: string
  description: string
  /** category chips shown above the title */
  genres: string[]
  /** file inside `public/preview/` — added manually later, missing image falls back to a placeholder */
  preview: string
  /** background gradient stops used by the card glow */
  accent: [string, string]
  platforms: GameLink[]
  windowsPurchase?: {
    enabled: boolean
    url?: string
    price?: string
  }
}

export const games: GameDef[] = [
  {
    id: 'chaos-arena',
    title: 'Chaos Arena',
    tagline: 'Tactical pandemonium, one round at a time.',
    description:
      'A skill-driven action arena where reflexes meet positioning. Pick a fighter, master the meta and survive the storm in fast, replayable matches built for quick sessions and long climbs.',
    genres: ['Action', 'Arena', 'Casual', 'Relaxing', 'PvP'],
    preview: 'images/chaos-arena-promotion-no-cta_800x450.webp',
    accent: ['#ff48c6', '#7b3ff2'],
    platforms: [
      { platform: 'crazygames', url: 'https://www.crazygames.com/' },
      { platform: 'playstore', upcoming: true, label: 'Coming soon' },
      { platform: 'appstore', upcoming: true, label: 'Coming soon' },
    ],
    windowsPurchase: { enabled: false },
  },
  {
    id: 'card-quest',
    title: 'Card Quest',
    tagline: 'Build your deck. Bend your fate.',
    description:
      'A roguelike deck-builder where every encounter rewrites your hand. Forge synergies, unlock rare arcana and chase the perfect run through a constantly mutating world of cards.',
    genres: ['Strategy', 'Card', 'Deck-builder'],
    preview: 'images/card-quest-promotion_800x450.webp',
    accent: ['#5e83ff', '#3a59ff'],
    platforms: [
      { platform: 'steam', upcoming: true, label: 'Coming soon' },
    ],
    windowsPurchase: { enabled: false },
  },
  {
    id: 'rodent-race',
    title: 'Rodent Race',
    tagline: 'A rodent rumble of speed and chaos.',
    description:
      'Sprint, dash and dive through twisting tracks as the fastest rodent in the underbrush. Outsmart rivals with chained power-ups and physics-driven shortcuts in a ferocious race to the finish line.',
    genres: ['Action', 'Arcade', 'Racing'],
    preview: 'images/rodent-race-promotion_800x450.webp',
    accent: ['#ff8a00', '#ff48c6'],
    platforms: [
      { platform: 'steam', url: 'https://store.steampowered.com/' },
    ],
    windowsPurchase: { enabled: false },
  },
  {
    id: 'spinner-machines',
    title: 'Spinner Machines',
    tagline: 'Engineer the perfect spin.',
    description:
      'A turn-based physics duel of clashing tops. Bolt together heads, attack rings and bottoms, then send your machine into the arena to outlast the competition. Smart builds beat brute force.',
    genres: ['Strategy', 'Physics', 'Casual'],
    preview: 'images/spinner-machines-promotion-no-cta_800x500.webp',
    accent: ['#00d4ff', '#3a59ff'],
    platforms: [
      { platform: 'wavedash', url: 'https://wavedash.com/' },
      { platform: 'itch', url: 'https://itch.io/' },
      { platform: 'playstore', upcoming: true, label: 'Maybe later' },
      { platform: 'appstore', upcoming: true, label: 'Maybe later' },
    ],
    windowsPurchase: { enabled: false },
  },
]
