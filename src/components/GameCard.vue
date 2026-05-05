<template lang="pug">
article.game-card(
  ref="root"
  :id="`game-${game.id}`"
  :style="cssVars"
  @mousemove="onMove"
  @mouseleave="onLeave"
)
  .game-card__halo(aria-hidden="true")
  .game-card__inner
    .game-card__media
      .game-card__media-tilt(ref="tiltRef")
        .game-card__placeholder(aria-hidden="true")
          span(v-if="!hasImage") {{ game.title }}
        img.game-card__image(
          v-if="hasImage"
          :src="game.preview"
          :alt="$t('card.previewAlt', { title: game.title })"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          :class="{ 'is-loaded': imageLoaded }"
          @load="imageLoaded = true"
          @error="onImageError"
        )
        .game-card__shine
      .game-card__chips
        span.game-card__chip(v-for="g in game.genres" :key="g") {{ g }}
    .game-card__body
      header.game-card__header
        h3.game-card__title {{ game.title }}
        p.game-card__tagline {{ game.tagline }}
      p.game-card__desc
        strong.game-card__desc-lead(v-if="game.descriptionLead") {{ game.descriptionLead }}
        | {{ game.description }}
      section.game-card__platforms(:aria-label="$t('card.platformsTitle')")
        h4.game-card__platforms-title {{ $t('card.platformsTitle') }}
        .game-card__platforms-grid
          PlatformButton(
            v-for="link in game.platforms"
            :key="link.platform"
            :link="link"
          )
        .game-card__platforms-empty(v-if="!game.platforms.length")
          | {{ $t('card.notReleased') }}
      section.game-card__purchase(v-if="game.windowsPurchase?.enabled")
        PlatformButton(:link="windowsLink")
        span.game-card__price(v-if="game.windowsPurchase.price") {{ game.windowsPurchase.price }}
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { GameDef, GameLink } from '@/data/games'
import useReveal from '@/use/useReveal'
import PlatformButton from '@/components/PlatformButton.vue'

const props = defineProps<{ game: GameDef }>()

const { t } = useI18n()

const root = ref<HTMLElement | null>(null)
const tiltRef = ref<HTMLElement | null>(null)
const hasImage = ref(true)
const imageLoaded = ref(false)

const onImageError = () => {
  hasImage.value = false
  imageLoaded.value = false
}

useReveal(root, 0.12)

const cssVars = computed(() => ({
  '--accent-a': props.game.accent[0],
  '--accent-b': props.game.accent[1],
}))

const windowsLink = computed<GameLink>(() => ({
  platform: 'windows',
  url: props.game.windowsPurchase?.url,
  upcoming: !props.game.windowsPurchase?.url,
  label: props.game.windowsPurchase?.url ? t('card.windowsLabel') : t('card.windowsSoon'),
}))

const onMove = (e: MouseEvent) => {
  const el = tiltRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  el.style.setProperty('--tilt-x', `${(-y * 6).toFixed(2)}deg`)
  el.style.setProperty('--tilt-y', `${(x * 8).toFixed(2)}deg`)
}

const onLeave = () => {
  const el = tiltRef.value
  if (!el) return
  el.style.setProperty('--tilt-x', '0deg')
  el.style.setProperty('--tilt-y', '0deg')
}
</script>

<style lang="scss" scoped>
.game-card {
  position: relative;
  border-radius: 28px;
  padding: 1px;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--accent-a) 70%, transparent), color-mix(in srgb, var(--accent-b) 70%, transparent)) border-box;
  box-shadow:
    0 30px 80px -30px rgba(0, 0, 0, 0.7),
    0 1px 0 rgba(255, 255, 255, 0.04) inset;

  &__halo {
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background:
      radial-gradient(60% 60% at 0% 0%, color-mix(in srgb, var(--accent-a) 50%, transparent), transparent 60%),
      radial-gradient(60% 60% at 100% 100%, color-mix(in srgb, var(--accent-b) 45%, transparent), transparent 60%);
    filter: blur(36px);
    opacity: 0.55;
    z-index: -1;
    transition: opacity 360ms ease;
  }

  &:hover &__halo { opacity: 0.9; }

  &__inner {
    position: relative;
    border-radius: inherit;
    background: linear-gradient(180deg, rgba(20, 24, 50, 0.86), rgba(13, 16, 36, 0.92));
    backdrop-filter: blur(18px);
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
    flex: 1 1 auto;

    /* Side-by-side image/body layout only when each card occupies the full
     * row (i.e. between the side-by-side breakpoint and the 2-up grid).
     * Above 1100px the games grid switches to two cards per row, so each
     * card stacks vertically again to keep enough room for content. */
    @media (min-width: 900px) and (max-width: 1099px) {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
    }
  }

  &__media {
    position: relative;
    padding: 22px 22px 0;
    @media (min-width: 900px) and (max-width: 1099px) { padding: 28px 0 28px 28px; }
    perspective: 1100px;
  }

  &__media-tilt {
    position: relative;
    border-radius: 22px;
    overflow: hidden;
    aspect-ratio: 16 / 10;
    background:
      linear-gradient(135deg, color-mix(in srgb, var(--accent-a) 80%, #1a1f3a), color-mix(in srgb, var(--accent-b) 80%, #2a1d3a));
    box-shadow:
      0 30px 60px -25px rgba(0, 0, 0, 0.7),
      inset 0 0 0 1px rgba(255, 255, 255, 0.06);
    transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
    transition: transform 280ms ease;
    will-change: transform;
  }

  &__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    z-index: 1;
    opacity: 0;
    transform: scale(0.86);
    transform-origin: 50% 50%;
    transition:
      opacity 480ms cubic-bezier(0.22, 1, 0.36, 1),
      transform 540ms cubic-bezier(0.22, 1, 0.36, 1);
    will-change: opacity, transform;

    &.is-loaded {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &__image {
      transform: none;
      transition: opacity 200ms linear;
      &.is-loaded { transform: none; }
    }
  }

  &__placeholder {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: rgba(255, 255, 255, 0.85);
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    letter-spacing: 0.04em;
    text-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    background-image:
      radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.12), transparent 60%),
      radial-gradient(circle at 80% 75%, rgba(0, 0, 0, 0.25), transparent 55%);
  }

  &__shine {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 35%;
    background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.18), transparent);
    transform: translateX(-200%) skewX(-20deg);
    pointer-events: none;
  }

  &:hover &__shine { animation: shine 1.4s ease; }

  &__chips {
    position: absolute;
    top: 32px;
    left: 32px;
    right: 32px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    @media (min-width: 900px) and (max-width: 1099px) { left: 38px; right: auto; top: 38px; }
  }

  &__chip {
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__body {
    padding: 22px;
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 18px;
    @media (min-width: 900px) and (max-width: 1099px) { padding: 30px 30px 30px 28px; }
  }

  &__header { display: flex; flex-direction: column; gap: 6px; }

  &__title {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-size: clamp(1.6rem, 2.6vw, 2.1rem);
    font-weight: 700;
    margin: 0;
    line-height: 1.05;
    letter-spacing: -0.01em;
  }

  &__tagline {
    color: color-mix(in srgb, var(--accent-a) 70%, #fff);
    font-style: italic;
    font-size: 1rem;
    margin: 0;
    opacity: 0.95;
  }

  &__desc {
    color: rgba(235, 238, 255, 0.78);
    margin: 0;
    line-height: 1.6;
    font-size: 0.96rem;
  }

  &__desc-lead {
    display: block;
    color: #fff;
    font-weight: 700;
    font-family: 'Space Grotesk', system-ui, sans-serif;
    letter-spacing: 0.02em;
    font-size: 1rem;
    margin-bottom: 6px;
  }

  &__platforms-title {
    margin: 0 0 10px;
    font-size: 0.74rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(235, 238, 255, 0.55);
  }

  &__platforms-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    gap: 10px;
  }

  &__platforms-empty {
    color: rgba(235, 238, 255, 0.55);
    font-style: italic;
    font-size: 0.9rem;
  }

  &__purchase {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-top: 12px;
    border-top: 1px dashed rgba(255, 255, 255, 0.12);
  }

  &__price {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
  }
}

/* reveal recipe */
.game-card.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.game-card.reveal.is-revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>
