<template lang="pug">
section#top.hero(ref="root")
  .hero__bg(ref="bgRef" aria-hidden="true")
    .hero__blob.hero__blob--a
    .hero__blob.hero__blob--b
    .hero__blob.hero__blob--c
    .hero__grid
  .hero__content
    span.hero__eyebrow {{ $t('hero.eyebrow') }}
    h1.hero__headline
      span {{ $t('hero.headline.part1') }}
      span.hero__headline--accent {{ $t('hero.headline.accent1') }}
      span {{ $t('hero.headline.comma') }}
      br
      span {{ $t('hero.headline.part2') }}
      span.hero__headline--accent {{ $t('hero.headline.accent2') }}
    p.hero__lede {{ $t('hero.lede') }}
    .hero__actions
      button.hero__cta.hero__cta--primary(@click="scrollTo('games')")
        span {{ $t('hero.ctaPrimary') }}
        span.hero__cta-arrow →
      button.hero__cta.hero__cta--ghost(@click="scrollTo('about')")
        span {{ $t('hero.ctaSecondary') }}
    .hero__stats
      .hero__stat
        b 4
        span {{ $t('hero.stats.titles') }}
      .hero__stat
        b 6+
        span {{ $t('hero.stats.platforms') }}
      .hero__stat
        b ∞
        span {{ $t('hero.stats.replays') }}
  .hero__scroll-hint(aria-hidden="true")
    span {{ $t('hero.scrollHint') }}
    span.hero__scroll-line
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useParallax from '@/use/useParallax'

const root = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLElement | null>(null)

useParallax(bgRef, 0.35)

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  const offset = 80
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 130px 20px 80px;
  overflow: hidden;

  /* soft bleed into the interlude that follows — no hard seam */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 18%;
    background: linear-gradient(to bottom, rgba(5, 6, 20, 0), rgba(5, 6, 20, 0.85));
    pointer-events: none;
    z-index: 2;
  }

  &__bg {
    position: absolute;
    inset: -10% -5% -10% -5%;
    z-index: 0;
    transform: translate3d(0, var(--parallax, 0px), 0);
    will-change: transform;
  }

  &__blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.55;
    animation: floaty 12s ease-in-out infinite;

    &--a {
      top: -10%;
      left: -10%;
      width: 56vmax;
      height: 56vmax;
      background: radial-gradient(circle at 30% 30%, #3a59ff, transparent 60%);
      animation-delay: -2s;
    }
    &--b {
      bottom: -20%;
      right: -10%;
      width: 60vmax;
      height: 60vmax;
      background: radial-gradient(circle at 70% 70%, #ff48c6, transparent 65%);
      animation-delay: -6s;
    }
    &--c {
      top: 20%;
      right: 25%;
      width: 30vmax;
      height: 30vmax;
      background: radial-gradient(circle, #00d4ff, transparent 70%);
      opacity: 0.35;
      animation-delay: -9s;
    }
  }

  &__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%);
  }

  &__content {
    position: relative;
    z-index: 1;
    max-width: 880px;
    text-align: center;
    color: #fff;
    animation: fadeUp 0.9s ease-out both;
  }

  &__eyebrow {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    font-size: 0.78rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.78);
    margin-bottom: 22px;
    backdrop-filter: blur(10px);
  }

  &__headline {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 700;
    line-height: 1.04;
    letter-spacing: -0.02em;
    font-size: clamp(2.4rem, 7vw, 5.4rem);
    margin: 0 0 22px;

    &--accent {
      background: linear-gradient(120deg, #5e83ff 0%, #ff7ad9 50%, #00d4ff 100%);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: gradientShift 10s ease infinite;
    }
  }

  &__lede {
    max-width: 640px;
    margin: 0 auto 32px;
    font-size: clamp(1rem, 1.6vw, 1.18rem);
    line-height: 1.6;
    color: rgba(235, 238, 255, 0.78);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    margin-bottom: 56px;
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 26px;
    border-radius: 999px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    border: 1px solid transparent;
    transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease;

    &--primary {
      color: #fff;
      background: linear-gradient(120deg, #3a59ff 0%, #ff48c6 100%);
      background-size: 200% 200%;
      box-shadow: 0 18px 50px -16px rgba(255, 72, 198, 0.6);
      &:hover { transform: translateY(-2px); background-position: 100% 50%; }
    }

    &--ghost {
      color: #fff;
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(255, 255, 255, 0.16);
      backdrop-filter: blur(10px);
      &:hover { background: rgba(255, 255, 255, 0.1); transform: translateY(-2px); }
    }
  }

  &__cta-arrow { transition: transform 220ms ease; }
  &__cta--primary:hover &__cta-arrow { transform: translateX(3px); }

  &__stats {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 28px;
    justify-content: center;
    padding: 16px 22px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(14px);
  }

  &__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgba(235, 238, 255, 0.85);
    b {
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-size: 1.6rem;
      color: #fff;
    }
    span { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.16em; opacity: 0.7; }
  }

  &__scroll-hint {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  &__scroll-line {
    width: 1px;
    height: 38px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.6), transparent);
    animation: floaty 2.4s ease-in-out infinite;
  }
}
</style>
