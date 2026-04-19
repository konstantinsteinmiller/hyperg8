/**
 * i18n setup.
 *
 * Strategy:
 *   - English is the source of truth and is BUNDLED into the first paint.
 *     Anyone visiting with `en-*` (or an unsupported locale) gets zero
 *     extra network requests.
 *   - Any other supported locale is LAZY-LOADED on demand: at startup we
 *     detect the browser language and only fetch that locale's chunk.
 *   - Missing keys in any non-English locale silently fall back to `en`
 *     thanks to vue-i18n's `fallbackLocale` setting.
 *
 *   To add a new translation:
 *     1. populate `src/i18n/locales/<locale>.ts` (use en.ts as the schema)
 *     2. nothing else — it's already wired into SUPPORTED_LOCALES below
 *
 *   To add a brand-new locale (i.e. not in SUPPORTED_LOCALES yet):
 *     1. create `src/i18n/locales/<locale>.ts`
 *     2. add its code (e.g. `'tr'`) to SUPPORTED_LOCALES
 */

import { createI18n } from 'vue-i18n'
import en from '@/i18n/locales/en'

export type Locale =
  | 'en' | 'de' | 'es' | 'fr' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'ko' | 'hi' | 'ar'

export const SUPPORTED_LOCALES: Locale[] = [
  'en', 'de', 'es', 'fr', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'hi', 'ar',
]

export const RTL_LOCALES: Locale[] = ['ar']

export const FALLBACK_LOCALE: Locale = 'en'

/** Pick the best locale from `navigator.languages`, falling back to `en`. */
export const detectBrowserLocale = (): Locale => {
  if (typeof navigator === 'undefined') return FALLBACK_LOCALE
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const raw of candidates) {
    if (!raw) continue
    const base = raw.toLowerCase().split('-')[0] as Locale
    if (SUPPORTED_LOCALES.includes(base)) return base
  }
  return FALLBACK_LOCALE
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true, // makes `$t(...)` available in templates without setup()
  locale: FALLBACK_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  missingWarn: false,
  fallbackWarn: false,
  messages: { en },
})

const loadedLocales = new Set<Locale>(['en'])

/** Dynamically import a locale chunk and register it. */
export const loadLocaleMessages = async (locale: Locale): Promise<void> => {
  if (loadedLocales.has(locale)) return
  if (!SUPPORTED_LOCALES.includes(locale)) return
  // Vite's dynamic import — each locale becomes its own chunk.
  const mod = await import(`@/i18n/locales/${locale}.ts`)
  i18n.global.setLocaleMessage(locale, mod.default || {})
  loadedLocales.add(locale)
}

const applyDocumentLang = (locale: Locale): void => {
  if (typeof document === 'undefined') return
  document.documentElement.lang = locale
  document.documentElement.dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr'
}

/** Switch to a locale, lazy-loading its messages first if needed. */
export const setLocale = async (locale: Locale): Promise<void> => {
  if (!SUPPORTED_LOCALES.includes(locale)) locale = FALLBACK_LOCALE
  await loadLocaleMessages(locale)
  i18n.global.locale.value = locale
  applyDocumentLang(locale)
}

/**
 * Boot-time setup: detect browser locale and switch to it.
 * If the user is already on `en` (the bundled default) this is a no-op
 * and the network stays quiet.
 */
export const initLocale = async (): Promise<Locale> => {
  const target = detectBrowserLocale()
  applyDocumentLang(target)
  if (target === FALLBACK_LOCALE) {
    i18n.global.locale.value = FALLBACK_LOCALE
    return FALLBACK_LOCALE
  }
  await setLocale(target)
  return target
}
