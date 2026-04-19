/**
 * Central registry of every platform a hyperg8 game can be published on.
 *
 * To add a new platform:
 *   1. add an entry below with a unique id, label, color and SVG icon path
 *   2. reference its id in `data/games.ts` under the relevant game's `platforms` array
 *
 * The "icon" field is a raw inline SVG `path`/`g` payload — kept inline so the
 * site has zero asset dependencies and ships as a single bundle.
 */

export interface PlatformDef {
  id: string
  label: string
  /** brand color used for the button accent */
  color: string
  /** raw SVG inner markup, designed for a 24x24 viewBox */
  icon: string
}

export const platforms: Record<string, PlatformDef> = {
  steam: {
    id: 'steam',
    label: 'Steam',
    color: '#1b2838',
    icon: `<path fill="currentColor" d="M12 2a10 10 0 0 0-9.95 9.06l5.4 2.23a2.83 2.83 0 0 1 1.6-.5l2.4-3.5v-.05a3.77 3.77 0 1 1 3.78 3.78h-.09l-3.45 2.46a2.83 2.83 0 0 1-5.65.18L2.2 14.27A10 10 0 1 0 12 2Zm-3.36 15.13-1.23-.51a2.13 2.13 0 1 0 2.74-2.78l1.27.53a1.57 1.57 0 1 1-2.78 2.76Zm7.1-7.74a2.51 2.51 0 1 1 2.51 2.5 2.51 2.51 0 0 1-2.51-2.5Zm.63 0a1.88 1.88 0 1 0 1.88-1.88 1.88 1.88 0 0 0-1.88 1.88Z"/>`,
  },
  crazygames: {
    id: 'crazygames',
    label: 'CrazyGames',
    color: '#7b3ff2',
    icon: `<path fill="currentColor" d="M12 2 2 7v10l10 5 10-5V7L12 2Zm0 2.3 7.5 3.75L12 11.8 4.5 8.05 12 4.3ZM4 9.7l7 3.5v7.6l-7-3.5V9.7Zm9 11.1v-7.6l7-3.5v7.6l-7 3.5Z"/>`,
  },
  playstore: {
    id: 'playstore',
    label: 'Google Play',
    color: '#34a853',
    icon: `<path fill="currentColor" d="M3.6 2.3a1 1 0 0 0-.6.92v17.56a1 1 0 0 0 .6.92l9.43-9.7-9.43-9.7Zm10.85 11.16-2.4 2.46 7.07 4.05a1 1 0 0 0 1.46-.5l-6.13-6.01Zm6.13-3.92a1 1 0 0 0-1.46-.5l-7.07 4.05 2.4 2.46 6.13-6.01ZM4.34 1.94l9.7 9.97 2.39-2.46L5.27 1.4a1 1 0 0 0-.93.54Zm9.7 10.45L4.34 22.36a1 1 0 0 0 .93.54l11.15-6.4-2.39-2.11Z"/>`,
  },
  appstore: {
    id: 'appstore',
    label: 'App Store',
    color: '#0a84ff',
    icon: `<path fill="currentColor" d="M16.36 12.5c0-2.45 2-3.62 2.09-3.68a4.49 4.49 0 0 0-3.55-1.92c-1.49-.16-2.94.89-3.7.89s-1.94-.86-3.2-.84a4.71 4.71 0 0 0-3.97 2.42c-1.7 2.95-.43 7.32 1.22 9.72.81 1.18 1.77 2.5 3.03 2.45 1.22-.05 1.68-.79 3.16-.79s1.89.79 3.18.76c1.31-.02 2.14-1.2 2.94-2.38a10.4 10.4 0 0 0 1.34-2.74 4.36 4.36 0 0 1-2.54-3.99ZM13.9 4.94a4.4 4.4 0 0 0 1-3.16 4.46 4.46 0 0 0-2.9 1.5 4.16 4.16 0 0 0-1.04 3.04 3.7 3.7 0 0 0 2.94-1.38Z"/>`,
  },
  wavedash: {
    id: 'wavedash',
    label: 'Wavedash',
    color: '#00d4ff',
    icon: `<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3 14c2-3 4-3 6 0s4 3 6 0 4-3 6 0M3 18c2-3 4-3 6 0s4 3 6 0 4-3 6 0M3 10c2-3 4-3 6 0s4 3 6 0"/>`,
  },
  itch: {
    id: 'itch',
    label: 'itch.io',
    color: '#fa5c5c',
    icon: `<path fill="currentColor" d="M3.4 4.2C2.55 4.74 1.13 6.36 1 6.84v.81c0 1.03.96 1.93 1.84 1.93 1.05 0 1.94-.87 1.94-1.91 0 1.04.85 1.91 1.9 1.91 1.06 0 1.88-.87 1.88-1.91 0 1.04.91 1.91 1.97 1.91h.02c1.06 0 1.97-.87 1.97-1.91 0 1.04.81 1.91 1.87 1.91 1.05 0 1.91-.87 1.91-1.91 0 1.04.89 1.91 1.93 1.91.89 0 1.85-.9 1.85-1.93v-.81c-.13-.48-1.55-2.1-2.4-2.64C19.93 4 16.92 3.96 12 3.96c-4.92 0-7.93.04-8.6.24Zm6.6 6.06c-.46.46-.97 1.4-1.07 1.93-.06.31-.18.41-.5.41-.49 0-1.27-.55-1.45-.86-.13-.22-.18-.84-.13-1.4l.05-.55-.5-.04c-.96-.08-1.13.5-1.13 4 0 3.18.05 3.96.27 4.41.34.7.83.83 3.84 1 .92.05 2.4.07 3.62.07 1.22 0 2.7-.02 3.62-.07 3-.17 3.5-.3 3.84-1 .22-.45.27-1.23.27-4.41 0-3.5-.17-4.08-1.13-4l-.5.04.05.55c.05.56 0 1.18-.13 1.4-.18.31-.96.86-1.45.86-.32 0-.44-.1-.5-.41-.1-.53-.61-1.47-1.07-1.93-.45-.46-.49-.49-.99-.49-.5 0-.54.03-.99.49-.46.46-.97 1.4-1.07 1.93-.05.27-.16.4-.42.41h-.04c-.26-.01-.37-.14-.42-.41-.1-.53-.61-1.47-1.07-1.93-.45-.46-.49-.49-.99-.49-.5 0-.54.03-.99.49Zm.7 4.86c-.27 0-.55-.06-.81-.17l-.04.02c-.16.18-.36.4-.69.65-.34.25-.7.42-1.13.42-.43 0-.79-.17-1.13-.42v-.01c.27.74 1.07 1.27 1.97 1.27.73 0 1.39-.34 1.83-.88.44.54 1.1.88 1.83.88.73 0 1.39-.34 1.83-.88.44.54 1.1.88 1.83.88.9 0 1.7-.53 1.97-1.27v.01c-.34.25-.7.42-1.13.42-.43 0-.79-.17-1.13-.42a4.55 4.55 0 0 1-.73-.67c-.26.11-.54.17-.81.17-.27 0-.55-.06-.81-.17a4.55 4.55 0 0 1-.73.67c-.34.25-.7.42-1.13.42-.43 0-.79-.17-1.13-.42a4.55 4.55 0 0 1-.73-.67c-.26.11-.54.17-.81.17Z"/>`,
  },
  windows: {
    id: 'windows',
    label: 'Buy for Windows',
    color: '#0078d6',
    icon: `<path fill="currentColor" d="M3 5.4 10.5 4.4v6.7H3V5.4Zm0 13.2 7.5 1V12.9H3v5.7Zm8.4 1.1L21 21V12.9H11.4v6.8Zm0-15.4V11.1H21V3l-9.6 1.3Z"/>`,
  },
}

export const getPlatform = (id: string): PlatformDef | undefined => platforms[id]
