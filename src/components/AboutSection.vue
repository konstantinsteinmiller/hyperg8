<template lang="pug">
section#about.about(ref="root")
  .about__bg(ref="bgRef" aria-hidden="true")
  .about__inner
    .about__col
      span.about__eyebrow {{ $t('about.eyebrow') }}
      h2.about__title {{ $t('about.title') }}
      p.about__copy {{ $t('about.copy1') }}
      p.about__copy {{ $t('about.copy2') }}
      .about__pillars
        .about__pillar
          h3 {{ $t('about.pillars.design.title') }}
          p {{ $t('about.pillars.design.body') }}
        .about__pillar
          h3 {{ $t('about.pillars.replay.title') }}
          p {{ $t('about.pillars.replay.body') }}
        .about__pillar
          h3 {{ $t('about.pillars.cross.title') }}
          p {{ $t('about.pillars.cross.body') }}
    .about__visual(aria-hidden="true")
      .about__shape.about__shape--a
      .about__shape.about__shape--b
      .about__shape.about__shape--c
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useParallax from '@/use/useParallax'

const root = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLElement | null>(null)
useParallax(bgRef, 0.2)
</script>

<style lang="scss" scoped>
.about {
  position: relative;
  padding: clamp(80px, 12vw, 140px) 20px;
  overflow: hidden;

  /* matched fades into the surrounding interludes — no hard cut */
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 16%;
    pointer-events: none;
    z-index: 2;
  }
  &::before {
    top: 0;
    background: linear-gradient(to top, rgba(5, 6, 20, 0), rgba(5, 6, 20, 0.85));
  }
  &::after {
    bottom: 0;
    background: linear-gradient(to bottom, rgba(5, 6, 20, 0), rgba(5, 6, 20, 0.85));
  }

  &__bg {
    position: absolute;
    inset: -10%;
    background:
      radial-gradient(45% 45% at 80% 20%, rgba(0, 212, 255, 0.14), transparent 60%),
      radial-gradient(50% 50% at 10% 80%, rgba(123, 63, 242, 0.16), transparent 65%);
    z-index: 0;
    transform: translate3d(0, var(--parallax, 0px), 0);
    pointer-events: none;
  }

  &__inner {
    position: relative;
    z-index: 1;
    max-width: 1180px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
    align-items: center;

    @media (min-width: 900px) {
      grid-template-columns: 1.2fr 1fr;
      gap: 80px;
    }
  }

  &__eyebrow {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 18px;
  }

  &__title {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 700;
    color: #fff;
    font-size: clamp(2rem, 4.5vw, 3.4rem);
    margin: 0 0 18px;
    letter-spacing: -0.02em;
    line-height: 1.05;
  }

  &__copy {
    color: rgba(235, 238, 255, 0.78);
    line-height: 1.7;
    font-size: 1.02rem;
    max-width: 540px;
    margin: 0 0 14px;
  }

  &__pillars {
    margin-top: 28px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
    @media (min-width: 600px) { grid-template-columns: repeat(3, 1fr); }
  }

  &__pillar {
    padding: 18px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(14px);
    transition: transform 240ms ease, background 240ms ease;
    &:hover { transform: translateY(-3px); background: rgba(255, 255, 255, 0.07); }

    h3 {
      margin: 0 0 6px;
      color: #fff;
      font-size: 1rem;
      font-family: 'Space Grotesk', system-ui, sans-serif;
    }
    p {
      margin: 0;
      color: rgba(235, 238, 255, 0.7);
      font-size: 0.88rem;
      line-height: 1.5;
    }
  }

  &__visual {
    position: relative;
    aspect-ratio: 1 / 1;
    max-width: 460px;
    margin-inline: auto;
    width: 100%;
  }

  &__shape {
    position: absolute;
    border-radius: 28px;
    box-shadow: 0 30px 80px -25px rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(255, 255, 255, 0.08);

    &--a {
      inset: 10% 30% 30% 0;
      background: linear-gradient(135deg, rgba(94, 131, 255, 0.55), rgba(58, 89, 255, 0.2));
      animation: floaty 9s ease-in-out infinite;
    }
    &--b {
      inset: 25% 0 5% 30%;
      background: linear-gradient(135deg, rgba(255, 72, 198, 0.55), rgba(123, 63, 242, 0.25));
      animation: floaty 11s ease-in-out infinite;
      animation-delay: -3s;
    }
    &--c {
      inset: 0 18% 55% 25%;
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.45), rgba(0, 212, 255, 0.1));
      animation: floaty 7s ease-in-out infinite;
      animation-delay: -5s;
    }
  }
}
</style>
