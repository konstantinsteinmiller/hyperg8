import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/**
 * Adds `is-revealed` class to the target once it scrolls into the viewport.
 * Pair with the `.reveal` SCSS recipe in `src/style.scss` for a fade-up effect.
 */
export default function useReveal(target: Ref<HTMLElement | null>, threshold = 0.15) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const el = target.value
    if (!el) return
    el.classList.add('reveal')
    observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold },
    )
    observer.observe(el)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}
