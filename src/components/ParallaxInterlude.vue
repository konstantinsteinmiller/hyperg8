<template lang="pug">
section.interlude(
  ref="root"
  :class="`interlude--${variant}`"
  :style="cssVars"
  :aria-label="`Concept art interlude: ${variant}`"
)
  .interlude__fade.interlude__fade--top(aria-hidden="true")
  .interlude__glow(aria-hidden="true")
  .interlude__layer(
    v-for="(layer, idx) in sketch.layers"
    :key="idx"
    ref="layerRefs"
    :data-speed="layer.speed"
    :style="layerStyle(layer)"
    aria-hidden="true"
  )
    .interlude__art(v-html="layer.markup")
  p.interlude__caption {{ $t(sketch.captionKey) }}
  .interlude__fade.interlude__fade--bottom(aria-hidden="true")
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { sketchVariants, type SketchLayer } from '@/data/sketches'

const props = defineProps<{
  variant: keyof typeof sketchVariants
  /** override interlude height (default 80svh on desktop, 60svh mobile via SCSS) */
  height?: string
}>()

const sketch = computed(() => sketchVariants[props.variant])

const root = ref<HTMLElement | null>(null)
const layerRefs = ref<HTMLElement[]>([])

const cssVars = computed(() => ({
  '--glow-a': sketch.value.glow[0],
  '--glow-b': sketch.value.glow[1],
  '--interlude-h': props.height || '',
}))

const layerStyle = (layer: SketchLayer) => ({
  top: layer.top || '0',
  left: layer.left || '0',
  right: layer.right || 'auto',
  width: layer.width || '100%',
  opacity: layer.opacity ?? 1,
})

let raf = 0
const update = () => {
  if (raf) return
  raf = requestAnimationFrame(() => {
    const el = root.value
    if (!el) { raf = 0; return }
    const rect = el.getBoundingClientRect()
    const viewport = window.innerHeight || 1
    // distance from viewport center, normalized to [-1, 1]ish
    const center = rect.top + rect.height / 2 - viewport / 2
    for (const node of layerRefs.value) {
      const speed = parseFloat(node.dataset.speed || '0.2')
      // back layers also drift slightly horizontally for parallax depth
      const tx = center * speed * -0.06
      const ty = center * speed * -1
      node.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`
    }
    raf = 0
  })
}

onMounted(() => {
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
  update()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<style lang="scss" scoped>
.interlude {
  position: relative;
  width: 100%;
  /* a tall band so the parallax travel feels real */
  height: var(--interlude-h, 70svh);
  min-height: 420px;
  overflow: hidden;
  isolation: isolate;
  /* fully transparent body — the soft fades handle the section seam */
  background: transparent;

  @media (min-width: 900px) {
    height: var(--interlude-h, 86svh);
    min-height: 540px;
  }

  /* soft gradient that bleeds into the section above & below — kills the hard cut */
  &__fade {
    position: absolute;
    left: 0;
    right: 0;
    height: 26%;
    z-index: 4;
    pointer-events: none;

    &--top {
      top: 0;
      background: linear-gradient(to bottom, rgba(5, 6, 20, 0.95), rgba(5, 6, 20, 0));
    }
    &--bottom {
      bottom: 0;
      background: linear-gradient(to top, rgba(5, 6, 20, 0.95), rgba(5, 6, 20, 0));
    }
  }

  /* coloured wash behind the art — tints the interlude per variant */
  &__glow {
    position: absolute;
    inset: -10%;
    z-index: 0;
    background:
      radial-gradient(40% 40% at 25% 30%, var(--glow-a), transparent 60%),
      radial-gradient(45% 45% at 78% 70%, var(--glow-b), transparent 65%);
    filter: blur(20px);
    pointer-events: none;
  }

  &__layer {
    position: absolute;
    z-index: 2;
    will-change: transform;
    pointer-events: none;
    transition: opacity 600ms ease;
  }

  &__art {
    width: 100%;
    height: auto;

    :deep(svg) {
      width: 100%;
      height: auto;
      display: block;
      /* light pencil-shimmer */
      filter: drop-shadow(0 0 6px rgba(244, 246, 255, 0.08));
    }

    /* draw-in animation when the interlude scrolls into view */
    :deep(svg path),
    :deep(svg circle),
    :deep(svg ellipse),
    :deep(svg rect) {
      stroke-dasharray: 1200;
      stroke-dashoffset: 1200;
      animation: ink-in 1.6s ease-out forwards;
    }
  }

  /* stagger the draw across layers */
  &__layer:nth-child(3) :deep(svg path) { animation-delay: 0.05s; }
  &__layer:nth-child(4) :deep(svg path) { animation-delay: 0.18s; }
  &__layer:nth-child(5) :deep(svg path) { animation-delay: 0.32s; }

  &__caption {
    position: absolute;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    color: rgba(244, 246, 255, 0.55);
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    text-align: center;
    padding: 6px 14px;
    border-radius: 999px;
    background: rgba(8, 10, 24, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(10px);
    white-space: nowrap;
    max-width: calc(100% - 32px);
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@keyframes ink-in {
  to { stroke-dashoffset: 0; }
}

/* honour reduced-motion: skip the draw-in and parallax */
@media (prefers-reduced-motion: reduce) {
  .interlude__art :deep(svg path),
  .interlude__art :deep(svg circle),
  .interlude__art :deep(svg ellipse),
  .interlude__art :deep(svg rect) {
    stroke-dasharray: none;
    stroke-dashoffset: 0;
    animation: none;
  }
  .interlude__layer { transform: none !important; }
}
</style>
