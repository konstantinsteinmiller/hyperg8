<template lang="pug">
section#games.games(ref="root")
  .games__bg(ref="bgRef" aria-hidden="true")
  .games__inner
    header.games__header
      span.games__eyebrow {{ $t('games.eyebrow') }}
      h2.games__title {{ $t('games.title') }}
      p.games__lede {{ $t('games.lede') }}
    .games__list
      GameCard(v-for="game in games" :key="game.id" :game="game")
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { games } from '@/data/games'
import useParallax from '@/use/useParallax'
import GameCard from '@/components/GameCard.vue'

const root = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLElement | null>(null)
useParallax(bgRef, 0.18)
</script>

<style lang="scss" scoped>
.games {
  position: relative;
  padding: clamp(80px, 12vw, 140px) 20px;
  overflow: hidden;

  /* fade-in at the top + fade-out at the bottom blends into adjacent interludes */
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
      radial-gradient(40% 40% at 20% 10%, rgba(94, 131, 255, 0.18), transparent 60%),
      radial-gradient(40% 40% at 80% 60%, rgba(255, 72, 198, 0.12), transparent 65%);
    z-index: 0;
    transform: translate3d(0, var(--parallax, 0px), 0);
    pointer-events: none;
  }

  &__inner {
    position: relative;
    z-index: 1;
    max-width: 1180px;
    margin: 0 auto;
  }

  &__header {
    text-align: center;
    margin-bottom: 56px;
    color: #fff;
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
    font-size: clamp(2rem, 5vw, 3.6rem);
    margin: 0 0 16px;
    letter-spacing: -0.02em;
    line-height: 1.05;
  }

  &__lede {
    max-width: 620px;
    margin: 0 auto;
    color: rgba(235, 238, 255, 0.72);
    line-height: 1.6;
    font-size: 1.02rem;
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(28px, 4vw, 48px);

    @media (min-width: 1100px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
}
</style>
