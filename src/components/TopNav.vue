<template lang="pug">
header.top-nav(:class="{ 'is-scrolled': isScrolled, 'is-hidden': isHidden }")
  .top-nav__inner.glass-nav
    a.top-nav__brand(href="#top" @click.prevent="scrollTo('top')")
      span.top-nav__logo
        svg(viewBox="0 0 32 32" aria-hidden="true")
          defs
            linearGradient#g1(x1="0" y1="0" x2="1" y2="1")
              stop(offset="0%" stop-color="#5e83ff")
              stop(offset="100%" stop-color="#ff48c6")
          path(d="M5 26 V6 h4 v8 h14 V6 h4 v20 h-4 v-8 H9 v8 z" fill="url(#g1)")
      span.top-nav__title hyperg8
    nav.top-nav__links(aria-label="Primary")
      a.top-nav__link(
        v-for="item in items"
        :key="item.id"
        :href="`#${item.id}`"
        @click.prevent="scrollTo(item.id)"
      )
        | {{ $t(item.labelKey) }}
    button.top-nav__cta(@click="scrollTo('games')")
      span {{ $t('nav.cta') }}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useScroll from '@/use/useScroll'

const items = [
  { id: 'games', labelKey: 'nav.games' },
  { id: 'about', labelKey: 'nav.studio' },
  { id: 'contact', labelKey: 'nav.contact' },
]

const { isScrolled, scrollY, direction } = useScroll(40)

// Hide the bar when the user scrolls down past the hero, reveal on scroll-up.
const isHidden = computed(() => scrollY.value > 320 && direction.value === 'down')

const scrollTo = (id: string) => {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.getElementById(id)
  if (!el) return
  const offset = 80
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}
</script>

<style lang="scss" scoped>
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
  padding: 14px clamp(12px, 4vw, 32px);
  pointer-events: none;
  transition:
    transform 480ms cubic-bezier(0.22, 1, 0.36, 1),
    padding 320ms ease;

  &.is-scrolled {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  &.is-hidden {
    transform: translateY(-120%);
  }

  &__inner {
    pointer-events: auto;
    margin: 0 auto;
    max-width: 1180px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    border-radius: 999px;
    transition:
      background 380ms ease,
      backdrop-filter 380ms ease,
      box-shadow 380ms ease,
      border-color 380ms ease,
      padding 320ms ease;
  }

  &.is-scrolled &__inner {
    padding: 8px 12px;
    box-shadow:
      0 18px 50px -20px rgba(0, 0, 0, 0.55),
      inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }

  &__brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #fff;
    text-decoration: none;
    padding: 6px 10px;
    border-radius: 999px;
    transition: transform 220ms ease;
    &:hover { transform: translateY(-1px); }
  }

  &__logo {
    width: 28px;
    height: 28px;
    display: inline-grid;
    place-items: center;
    svg { width: 100%; height: 100%; }
  }

  &__title {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 700;
    letter-spacing: 0.02em;
    font-size: 1.05rem;
  }

  &__links {
    display: none;
    align-items: center;
    gap: 4px;
    margin-left: auto;
    margin-right: 4px;
  }

  @media (min-width: 720px) {
    &__links { display: inline-flex; }
  }

  &__link {
    color: rgba(235, 238, 255, 0.72);
    text-decoration: none;
    padding: 8px 14px;
    border-radius: 999px;
    font-weight: 500;
    font-size: 0.92rem;
    transition: color 220ms ease, background 220ms ease, transform 220ms ease;
    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.06);
      transform: translateY(-1px);
    }
  }

  &__cta {
    margin-left: auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 18px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: #fff;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    background: linear-gradient(120deg, #3a59ff 0%, #ff48c6 100%);
    background-size: 200% 200%;
    box-shadow: 0 12px 30px -12px rgba(255, 72, 198, 0.65);
    transition: transform 220ms ease, box-shadow 220ms ease, background-position 600ms ease;
    &:hover {
      transform: translateY(-1px);
      background-position: 100% 50%;
      box-shadow: 0 16px 40px -10px rgba(94, 131, 255, 0.7);
    }
    &:active { transform: translateY(0); }
    @media (min-width: 720px) { margin-left: 0; }
  }
}
</style>
