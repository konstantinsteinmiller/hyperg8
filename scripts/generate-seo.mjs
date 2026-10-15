/**
 * Regenerates the game catalogue JSON-LD in index.html from src/data/games.ts
 * (the single source of truth). Runs from the pre-commit hook; `pnpm seo` by hand.
 * Needs Node >= 22.18 (imports the .ts file natively).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { games, SITE_URL, seoPreviewImage } from '../src/data/games.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = path.join(root, 'index.html')
const START = '<!-- seo:games:start (generated from src/data/games.ts by scripts/generate-seo.mjs — do not edit) -->'
const END = '<!-- seo:games:end -->'

/** live (non-upcoming or announced) store links add their OS to the listing */
const STORE_OS = { playstore: 'Android', appstore: 'iOS' }

const clean = (s) => s.replace(/`/g, '').replace(/\s+/g, ' ').trim()

const item = (g, i) => {
  const stores = [...new Set(g.platforms.map((p) => STORE_OS[p.platform]).filter(Boolean))]
  return {
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'VideoGame',
      name: g.title,
      ...(g.aliases?.length ? { alternateName: g.aliases } : {}),
      description: clean([g.descriptionLead, g.description].filter(Boolean).join(' ')),
      genre: g.genres,
      gamePlatform: ['Web Browser', ...stores],
      applicationCategory: 'Game',
      operatingSystem: ['Browser', ...stores],
      image: seoPreviewImage(g.id),
      author: { '@type': 'Organization', name: 'hyperg8' },
      publisher: { '@type': 'Organization', name: 'hyperg8' },
      url: `${SITE_URL}/#games`,
    },
  }
}

const ld = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'hyperg8 game catalogue',
  itemListElement: games.map(item),
}

const indent = (s, n) => s.split('\n').map((l) => ' '.repeat(n) + l).join('\n')
const block = `${START}
    <script type="application/ld+json">
${indent(JSON.stringify(ld, null, 2), 6)}
    </script>
    ${END}`

const html = fs.readFileSync(htmlPath, 'utf8')
const a = html.indexOf('<!-- seo:games:start')
const b = html.indexOf(END)
if (a < 0 || b < 0) throw new Error('index.html: seo:games markers not found')
const next = html.slice(0, a) + block + html.slice(b + END.length)
if (next !== html) {
  fs.writeFileSync(htmlPath, next)
  console.log(`seo: regenerated ${games.length} game entries in index.html`)
}
