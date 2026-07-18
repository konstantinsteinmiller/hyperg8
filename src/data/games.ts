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
    preview: 'images/chaos-arena-promotion_800x450.webp',
    accent: ['#ff48c6', '#7b3ff2'],
    platforms: [
      { platform: 'crazygames', url: 'https://www.crazygames.com/game/chaos-arena' },
      { platform: 'playstore', upcoming: true, label: 'Coming soon' },
      { platform: 'appstore', upcoming: true, label: 'Coming soon' },
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
      { platform: 'crazygames', url: 'https://www.crazygames.com/game/nexusorbiter' },
      { platform: 'playgama', url: 'https://playgama.com/game/nexusorbiter' },
      // { platform: 'glitch', url: 'https://www.glitch.fun/games/fa0460e3-def6-493e-8ad5-cc7004ed6992' },
      // { platform: 'wavedash', url: 'https://wavedash.com/games/nexusorbiter' },
    ],
    windowsPurchase: { enabled: false },
  },
  {
    id: 'merge-idle-war',
    title: 'Merge Idle War',
    tagline: `Merge elemental units into a 20-tier army and crush endless enemy waves. Combos, fever gold rushes, meteor storms — the war never stops!`,
    description:
      `Merge Idle War is a hybrid-casual merge auto-battler. Tap to spawn recruits, drag matching units together to forge ever-stronger elemental fighters — from Living Droplet to the black-hole-wielding Cosmic Mass — and drop them into the arena, where they battle endless waves on their own. Chain kills into combos, ignite FEVER for double gold, unleash the Meteor Storm ultimate and buy permanent upgrades. Bosses enrage, the gate cracks, but the war never ends — how far can you push?`,
    genres: ['Arcade', 'HyperCasual', 'Merge', 'Incremental'],
    preview: 'images/merge-idle-war-promotion_800x450.webp',
    accent: ['#00d4ff', '#ff595f'],
    platforms: [
      { platform: 'crazygames', url: 'https://www.crazygames.com/game/merge-idle-war' },
      // { platform: 'playgama', url: 'https://playgama.com/game/epicrolla' },
    ],
    windowsPurchase: { enabled: false },
  },
  {
    id: 'epicrolla',
    title: 'Epicrolla',
    tagline: 'One tap to switch directions. Endless rolling fun.',
    description:
      'Tap to navigate the rolling ball through a winding course of rifts, coins, and obstacles. ' +
      'Epicrolla is a one-touch arcade game about timing and precision. The ball rolls forward automatically, and the player taps to switch its direction of movement, navigating through increasingly challenging levels.',
    genres: ['Arcade', 'HyperCasual', 'One-tap', 'Dodge'],
    preview: 'images/epicrolla-promotion_800x450.webp',
    accent: ['#00d4ff', '#a259ff'],
    platforms: [
      { platform: 'crazygames', url: 'https://www.crazygames.com/game/epicrolla' },
      // { platform: 'playgama', url: 'https://playgama.com/game/epicrolla' },
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
      { platform: 'playgama', url: 'https://playgama.com/game/card-quest' },
      { platform: 'glitch', url: 'https://www.glitch.fun/games/f0fbbbdd-4823-4bb6-835d-bf713bf57161' },
    ],
    windowsPurchase: { enabled: false },
  },
  {
    id: 'spin-and-mow',
    title: 'Spin&Mow',
    tagline: 'A precision platformer with satisfying cuts.',
    description:
      'Two gears, one chain, a whole jungle to mow down. Swing your saw-bot island-to-island, slice grass, dodge obstacles, climb 20 hand-tuned stages.',
    genres: ['Platform', 'Arcade', 'Precision', 'Casual'],
    preview: 'images/spin-and-mow-promotion_800x450.webp',
    accent: ['#ff8a00', '#ff48c6'],
    platforms: [
      { platform: 'playgama', url: 'https://playgama.com/game/spinmow' },
    ],
    windowsPurchase: { enabled: false },
  },
  {
    id: 'splinter-king',
    title: 'Splinter King',
    tagline: 'An overpowered version of an bullet hell.',
    description:
      'An overpowered version of an bullet hell.',
    genres: ["Bullet Hell", "Arcade", "Survivors", "Casual"],
    preview: 'images/splinter-king-promotion_800x450.webp',
    accent: ['#ff8a00', '#ff48c6'],
    platforms: [
      { platform: 'playgama', upcoming: true, url: 'https://playgama.com/game/splinter-king' },
    ],
    windowsPurchase: { enabled: false },
  },
  {
    id: 'supa-tic-tac-toe',
    title: 'Supa Tic Tac Toe',
    tagline: 'Deckbuilder meets tic tac toe, live the fantasy!',
    description:
      'Tic Tac Toe is too boring, then use skills that you can build from your deck and destroy the enemy! Supa Tic Tac Toe is a card-based twist on the classic tic tac toe game. Players build a deck of unique cards, each with special abilities that can turn the tide of the game.',
    genres: ['Deckbuilder', 'Arcade', 'Casual', 'Strategy'],
    preview: 'images/supa-tic-tac-toe-promotion_800x450.webp',
    accent: ['#ff8a00', '#ff48c6'],
    platforms: [
      { platform: 'playgama', url: 'https://playgama.com/game/supa-tic-tac-toe' },
      { platform: 'itch', url: 'https://konstantinsteinmiller.itch.io/supa-tic-tac-toe' },
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
    preview: 'images/spinner-machines-promotion_800x450.webp',
    accent: ['#00d4ff', '#3a59ff'],
    platforms: [
      { platform: 'itch', url: 'https://konstantinsteinmiller.itch.io/spinner-machines' },
    ],
    windowsPurchase: { enabled: false },
  },
  {
    id: 'midnight-analog',
    title: 'Midnight Analog',
    tagline: 'It\'s 3AM and the Wi-Fi\'s down — so every doodle in your notebook becomes a frantic 5-second game. A hand-drawn micro-game rush.',
    description:
      "It's 3 AM at a lakeside cabin. The power's out, the Wi-Fi's down, and you can't sleep — so you scribble strange ideas in a spiral notebook, and each becomes a frantic five-second doodle game. Plug a thrashing router cable, swat mosquitoes, go Super Saiyan, stomp bugs, tune a TV antenna through the static, and more. Survive a night of escalating micro-games and a boss on three hearts, until the morning sun rises. It's all hand-drawn ballpoint on paper.",
    genres: ['Arcade', 'Simulation', 'One-touch', 'Casual'],
    preview: 'images/midnight-analog-promotion_800x450.webp',
    accent: ['#5e83ff', '#3a59ff'],
    platforms: [
      { platform: 'itch', url: 'https://konstantinsteinmiller.itch.io/midnight-analog' },
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
