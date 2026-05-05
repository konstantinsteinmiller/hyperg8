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
  /** optional headline rendered in bold above the description */
  descriptionLead?: string
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
    descriptionLead: 'Pull. Launch. CHAOS.',
    description:
      'Fling your spinner into the arena with one simple swipe and watch the mayhem unfold! Smash into enemies, bounce off walls, and knock out every opponent to claim victory. Easy to pick up, impossible to put down. Jump in, start flinging, and let the chaos begin.',
    genres: ['Action', 'Arena', 'Casual', 'Relaxing', 'PvP'],
    preview: 'images/chaos-arena-promotion-no-cta_800x450.webp',
    accent: ['#ff48c6', '#7b3ff2'],
    platforms: [
      { platform: 'crazygames', url: 'https://www.crazygames.com/game/chaos-arena' },
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
      'Card Quest is a card battle game with Triple Triad game rules and strong fantasy visuals and a campaign to collect all fairy cards.',
    genres: ['Strategy', 'Card', 'Deck-builder', 'TrippleTriad-like'],
    preview: 'images/card-quest-promotion_800x450.webp',
    accent: ['#5e83ff', '#3a59ff'],
    platforms: [
      { platform: 'glitch', url: 'https://glitch.fun/games/f0fbbbdd-4823-4bb6-835d-bf713bf57161/play' },
    ],
    windowsPurchase: { enabled: false },
  },
  {
    id: 'rodent-race',
    title: 'Rodent Race',
    tagline: 'A rodent rumble of speed and chaos.',
    description:
      'Sprint, dash and dive through twisting tracks as the fastest rodent in the underbrush. Outsmart rivals with chained power-ups and physics-driven shortcuts in a ferocious race to the finish line.',
    genres: ['Action', 'Arcade', 'Strategy'],
    preview: 'images/rodent-race-promotion_800x450.webp',
    accent: ['#ff8a00', '#ff48c6'],
    platforms: [
      { platform: 'steam', url: 'https://store.steampowered.com/app/3393800/Beyond_The_Dark/?l=english' },
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
      { platform: 'itch', url: 'https://konstantinsteinmiller.itch.io/spinner-machines' },
    ],
    windowsPurchase: { enabled: false },
  },
  {
    id: 'nexusorbiter',
    title: 'Nexus Orbiter',
    tagline: 'One tap. One drone. Hold the line.',
    description:
      'Tap to flip your orbital drone — auto-fire defense vs bosses, EMPs, homing drones, and glue bombs. Single-finger orbital-defense arcade. Your drone orbits a fragile space station and auto-fires at incoming hazards — tap to flip the orbit direction.',
    genres: ['Arcade', 'Casual', 'One-tap', 'Orbital Defense'],
    preview: 'images/nexusorbiter-promotion_800x450.webp',
    accent: ['#00d4ff', '#a259ff'],
    platforms: [
      { platform: 'glitch', url: 'https://glitch.fun/games/fa0460e3-def6-493e-8ad5-cc7004ed6992/play' },
    ],
    windowsPurchase: { enabled: false },
  },
  {
    id: 'solariancer',
    title: 'Solariancer',
    tagline: 'Herd the cosmos. Feed the Sun.',
    description:
      "Solariancer is a one-touch arcade idle game about herding celestial bodies into the corona of a hungry Sun. The Sun is both the player's primary engine of progress and their constant antagonist — it pulls everything in, but only ripe bodies that have soaked enough heat in orbit pay out when they hit the surface.",
    genres: ['Arcade', 'Simulation', 'One-touch', 'Casual'],
    preview: 'images/solariancer-promotion_800x450.webp',
    accent: ['#ff8a00', '#ff48c6'],
    platforms: [
      { platform: 'itch', url: 'https://konstantinsteinmiller.itch.io/solariancer' },
    ],
    windowsPurchase: { enabled: false },
  },
]
