<template lang="pug">
footer#contact.footer
  .footer__inner
    .footer__brand
      span.footer__logo
        svg(viewBox="0 0 32 32" aria-hidden="true")
          defs
            linearGradient#fg(x1="0" y1="0" x2="1" y2="1")
              stop(offset="0%" stop-color="#5e83ff")
              stop(offset="100%" stop-color="#ff48c6")
          path(d="M5 26 V6 h4 v8 h14 V6 h4 v20 h-4 v-8 H9 v8 z" fill="url(#fg)")
      div
        h3.footer__name {{ company.name }}
        p.footer__tagline {{ company.tagline }}
    .footer__contact
      h4 {{ $t('footer.contact') }}
      a.footer__email(:href="`mailto:${company.email}`") {{ company.email }}
      p.footer__address {{ $t('footer.addressLine', { location: company.location, year: company.founded }) }}
    .footer__links
      h4 {{ $t('footer.legal') }}
      button.footer__link(@click="modals.open('impressum')") {{ $t('footer.impressum') }}
      button.footer__link(@click="modals.open('privacy')") {{ $t('footer.privacy') }}
  .footer__base
    span {{ $t('footer.rights', { year, name: company.legalName }) }}
    span.footer__sub {{ $t('footer.sub', { location: company.location }) }}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { company } from '@/data/company'
import useModals from '@/use/useModals'

const modals = useModals()
const year = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  padding: 80px 20px 36px;
  margin-top: 0;
  color: rgba(235, 238, 255, 0.78);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background:
    linear-gradient(180deg, transparent, rgba(7, 8, 21, 0.6) 30%, rgba(7, 8, 21, 0.85)),
    radial-gradient(40% 60% at 50% 0%, rgba(94, 131, 255, 0.18), transparent 60%);

  &__inner {
    max-width: 1180px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 36px;
    @media (min-width: 720px) { grid-template-columns: 2fr 1fr 1fr; }
  }

  &__brand {
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }

  &__logo {
    width: 36px;
    height: 36px;
    display: inline-grid;
    place-items: center;
    svg { width: 100%; height: 100%; }
  }

  &__name {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    color: #fff;
    margin: 0 0 4px;
    font-size: 1.2rem;
  }

  &__tagline {
    margin: 0;
    max-width: 320px;
    font-size: 0.92rem;
    line-height: 1.5;
    color: rgba(235, 238, 255, 0.68);
  }

  h4 {
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: rgba(235, 238, 255, 0.55);
    margin: 0 0 12px;
    font-weight: 600;
  }

  &__email {
    color: #fff;
    text-decoration: none;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.25);
    padding-bottom: 2px;
    transition: border-color 220ms ease;
    &:hover { border-color: #fff; }
  }

  &__address {
    margin: 8px 0 0;
    font-size: 0.86rem;
    color: rgba(235, 238, 255, 0.55);
  }

  &__links {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  &__link {
    background: none;
    border: none;
    padding: 6px 0;
    color: rgba(235, 238, 255, 0.78);
    cursor: pointer;
    font: inherit;
    text-align: left;
    transition: color 220ms ease, transform 220ms ease;
    &:hover { color: #fff; transform: translateX(2px); }
  }

  &__base {
    max-width: 1180px;
    margin: 56px auto 0;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: rgba(235, 238, 255, 0.5);
    font-size: 0.82rem;
    @media (min-width: 720px) { flex-direction: row; justify-content: space-between; }
  }

  &__sub { font-style: italic; }
}
</style>
