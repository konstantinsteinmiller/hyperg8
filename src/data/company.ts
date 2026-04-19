/** Company-wide info shown in the footer / impressum / SEO. Edit freely. */

/**
 * In-app-purchase configuration. Once `payments.enabled = true`, the consent
 * banner will surface the moment a PayPal flow is requested (see useConsent).
 * Provider is informational — used by the banner copy.
 */
export const payments = {
  enabled: false as boolean,
  provider: 'PayPal' as 'PayPal' | 'Stripe' | string,
  /** Privacy-policy URL or anchor used in the consent banner copy. */
  privacyHref: '#privacy',
}

export const company = {
  name: 'hyperg8',
  legalName: 'hyperg8',
  tagline: 'Strategy, action and card games crafted with care.',
  email: 'hello@hyperg8.com',
  website: 'https://hyperg8.com',
  founded: 2024,
  location: 'Germany',
  /** Free-form impressum body (markdown). Replace with the legally required text. */
  impressumMd: `### Angaben gemäß § 5 TMG

**hyperg8**\n
Wildgrund 4\n
33442 Herzebrock-Clarholz\n
Germany\n

**Kontakt**\n
E-Mail: hello@hyperg8.com

**Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV**\n
Konstantin Steinmiller\n
Wildgrund 4\n
33442 Herzebrock-Clarholz\n
Germany\n`,
}
