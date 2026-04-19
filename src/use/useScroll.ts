import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Tracks vertical scroll state in a way components can react to.
 * - scrollY: current pixel offset
 * - isScrolled: true once the user has scrolled past `threshold` pixels
 * - direction: 'up' | 'down' | 'idle' since the last frame
 */
export default function useScroll(threshold = 24) {
  const scrollY = ref(0)
  const isScrolled = ref(false)
  const direction = ref<'up' | 'down' | 'idle'>('idle')

  let lastY = 0
  let raf = 0

  const onScroll = () => {
    if (raf) return
    raf = requestAnimationFrame(() => {
      const y = window.scrollY || window.pageYOffset || 0
      scrollY.value = y
      isScrolled.value = y > threshold
      if (y > lastY + 1) direction.value = 'down'
      else if (y < lastY - 1) direction.value = 'up'
      lastY = y
      raf = 0
    })
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    if (raf) cancelAnimationFrame(raf)
  })

  return { scrollY, isScrolled, direction }
}
