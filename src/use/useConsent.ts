import { computed, ref } from 'vue'

/**
 * GDPR-style consent gate for third-party payment scripts (PayPal, Stripe ...).
 *
 * Flow:
 *   - Anywhere in the purchase flow (e.g. right after the user logs in and
 *     clicks "Buy with PayPal"), call `request()`. The bottom banner appears.
 *   - User clicks Accept  → `isAccepted.value === true`, banner hides, decision
 *     persisted in localStorage. Now safe to load the PayPal SDK.
 *   - User clicks Decline → banner hides, fallback path stays cookie-free.
 *
 * Decision is reset by calling `reset()` (e.g. from a "Manage cookies" button).
 */

type Decision = 'accepted' | 'declined' | null
const STORAGE_KEY = 'hyperg8.paymentConsent.v1'

const decision = ref<Decision>(read())
const isVisible = ref(false)

function read(): Decision {
  if (typeof window === 'undefined') return null
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return v === 'accepted' || v === 'declined' ? v : null
  } catch {
    return null
  }
}

function write(value: Decision) {
  try {
    if (value) window.localStorage.setItem(STORAGE_KEY, value)
    else window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* localStorage unavailable */
  }
}

export default function useConsent() {
  const isAccepted = computed(() => decision.value === 'accepted')
  const isDeclined = computed(() => decision.value === 'declined')
  const isDecided = computed(() => decision.value !== null)

  /** Show the banner unless the user already decided. */
  const request = () => {
    if (decision.value === null) isVisible.value = true
  }

  const accept = () => {
    decision.value = 'accepted'
    write('accepted')
    isVisible.value = false
  }

  const decline = () => {
    decision.value = 'declined'
    write('declined')
    isVisible.value = false
  }

  const reset = () => {
    decision.value = null
    write(null)
    isVisible.value = false
  }

  return { isVisible, isAccepted, isDeclined, isDecided, request, accept, decline, reset }
}
