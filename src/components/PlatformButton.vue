<template lang="pug">
component.platform-btn(
  :is="tag"
  :class="{ 'platform-btn--upcoming': link.upcoming }"
  :href="link.upcoming ? undefined : link.url"
  :target="link.upcoming ? undefined : '_blank'"
  :rel="link.upcoming ? undefined : 'noopener noreferrer'"
  :aria-disabled="link.upcoming ? 'true' : undefined"
  :style="cssVars"
)
  span.platform-btn__icon(v-html="iconSvg" aria-hidden="true")
  span.platform-btn__text
    span.platform-btn__label {{ platform.label }}
    span.platform-btn__hint(v-if="link.upcoming || link.label")
      | {{ link.label || (link.upcoming ? $t('card.comingSoon') : '') }}
  span.platform-btn__chevron(v-if="!link.upcoming" aria-hidden="true") ↗
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { GameLink } from '@/data/games'
import { getPlatform } from '@/data/platforms'

const props = defineProps<{ link: GameLink }>()

const platform = computed(() => {
  const p = getPlatform(props.link.platform)
  if (!p) {
    return { id: props.link.platform, label: props.link.platform, color: '#888', icon: '' }
  }
  return p
})

const iconSvg = computed(
  () => `<svg viewBox="0 0 24 24" width="20" height="20">${platform.value.icon}</svg>`,
)

const tag = computed(() => (props.link.upcoming ? 'span' : 'a'))

const cssVars = computed(() => ({
  '--platform-color': platform.value.color,
}))
</script>

<style lang="scss" scoped>
.platform-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    background 220ms ease,
    box-shadow 220ms ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, color-mix(in srgb, var(--platform-color) 28%, transparent), transparent 60%);
    opacity: 0;
    transition: opacity 280ms ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--platform-color) 60%, rgba(255, 255, 255, 0.2));
    box-shadow:
      0 18px 36px -18px color-mix(in srgb, var(--platform-color) 70%, transparent),
      inset 0 0 0 1px rgba(255, 255, 255, 0.08);
    &::before { opacity: 1; }
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.06);
    color: var(--platform-color, #fff);
  }

  &__text {
    display: inline-flex;
    flex-direction: column;
    line-height: 1.1;
  }

  &__label { font-weight: 600; }
  &__hint {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.65;
    margin-top: 2px;
  }

  &__chevron {
    margin-left: auto;
    opacity: 0.55;
    transition: transform 220ms ease, opacity 220ms ease;
  }

  &:hover &__chevron {
    opacity: 1;
    transform: translate(2px, -2px);
  }

  &--upcoming {
    cursor: not-allowed;
    opacity: 0.7;
    &:hover { transform: none; box-shadow: none; }
  }
}
</style>
