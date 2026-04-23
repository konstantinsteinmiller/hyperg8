import { computed, ref } from 'vue'

export type ModalKey = 'privacy' | 'impressum' | null
export type PrivacyVariant = 'default' | 'chaos-arena-en' | 'chaos-arena-de'

const active = ref<ModalKey>(null)
const privacyVariant = ref<PrivacyVariant>('default')

export default function useModals() {
  const open = (key: Exclude<ModalKey, null>, variant: PrivacyVariant = 'default') => {
    active.value = key
    privacyVariant.value = variant
    document.documentElement.style.overflow = 'hidden'
  }
  const close = () => {
    active.value = null
    privacyVariant.value = 'default'
    document.documentElement.style.overflow = ''
  }
  const isOpen = (key: Exclude<ModalKey, null>) => computed(() => active.value === key)

  return { active, privacyVariant, open, close, isOpen }
}
