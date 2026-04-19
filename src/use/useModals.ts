import { computed, ref } from 'vue'

export type ModalKey = 'privacy' | 'impressum' | null

const active = ref<ModalKey>(null)

export default function useModals() {
  const open = (key: Exclude<ModalKey, null>) => {
    active.value = key
    document.documentElement.style.overflow = 'hidden'
  }
  const close = () => {
    active.value = null
    document.documentElement.style.overflow = ''
  }
  const isOpen = (key: Exclude<ModalKey, null>) => computed(() => active.value === key)

  return { active, open, close, isOpen }
}
