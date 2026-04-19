import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/**
 * Lightweight scroll-driven parallax. Sets `--parallax` on the target element
 * to a translated Y in pixels so SCSS can consume it via translate3d.
 *
 * speed > 0 moves slower than scroll (background feel),
 * speed < 0 moves opposite to scroll (foreground pop).
 */
export default function useParallax(target: Ref<HTMLElement | null>, speed = 0.25) {
  let raf = 0

  const update = () => {
    const el = target.value
    if (!el) return
    if (raf) return
    raf = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      const viewport = window.innerHeight || 1
      // distance from viewport center, normalised
      const center = rect.top + rect.height / 2 - viewport / 2
      const offset = -center * speed
      el.style.setProperty('--parallax', `${offset.toFixed(2)}px`)
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

  return { update }
}
