<template lang="pug">
transition(name="consent")
  aside.consent(
    v-if="visible"
    role="dialog"
    aria-live="polite"
    :aria-label="$t('consent.aria', { provider: payments.provider })"
  )
    .consent__inner
      .consent__icon(aria-hidden="true")
        svg(viewBox="0 0 24 24" width="22" height="22")
          path(
            fill="currentColor"
            d="M12 2 3 6v6c0 5 3.8 9.4 9 10 5.2-.6 9-5 9-10V6l-9-4Zm-1 14-4-4 1.4-1.4L11 13.2l5.6-5.6L18 9l-7 7Z"
          )
      .consent__text
        p.consent__title {{ $t('consent.title', { provider: payments.provider }) }}
        p.consent__copy
          | {{ $t('consent.bodyBefore', { provider: payments.provider }) }}
          a.consent__link(:href="payments.privacyHref" @click="onPolicyClick") {{ $t('consent.policyLink') }}
          | {{ $t('consent.bodyAfter') }}
      .consent__actions
        button.consent__btn.consent__btn--ghost(@click="consent.decline") {{ $t('consent.decline') }}
        button.consent__btn.consent__btn--primary(@click="consent.accept") {{ $t('consent.accept') }}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useConsent from '@/use/useConsent'
import useModals from '@/use/useModals'
import { payments } from '@/data/company'

const consent = useConsent()
const modals = useModals()

// Only render when payments are enabled AND a flow has requested consent.
const visible = computed(() => payments.enabled && consent.isVisible.value)

const onPolicyClick = (e: MouseEvent) => {
  if (payments.privacyHref === '#privacy') {
    e.preventDefault()
    modals.open('privacy')
  }
}
</script>

<style lang="scss" scoped>
.consent {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 70;
  display: flex;
  justify-content: center;
  pointer-events: none;

  &__inner {
    pointer-events: auto;
    width: 100%;
    max-width: 760px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 14px 18px;
    padding: 16px 18px;
    border-radius: 18px;
    background: rgba(8, 10, 24, 0.78);
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.7);
    color: #fff;

    @media (min-width: 720px) {
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
  }

  &__icon {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, #3a59ff, #ff48c6);
    color: #fff;
    box-shadow: 0 8px 20px -8px rgba(255, 72, 198, 0.6);
  }

  &__text { min-width: 0; }

  &__title {
    margin: 0 0 4px;
    font-weight: 600;
    font-size: 0.98rem;
  }

  &__copy {
    margin: 0;
    color: rgba(235, 238, 255, 0.72);
    font-size: 0.86rem;
    line-height: 1.45;
  }

  &__link {
    color: #92b1ff;
    text-decoration: underline;
    text-underline-offset: 3px;
    &:hover { color: #fff; }
  }

  &__actions {
    grid-column: 1 / -1;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    @media (min-width: 720px) { grid-column: auto; }
  }

  &__btn {
    padding: 10px 16px;
    border-radius: 999px;
    font-weight: 600;
    font-size: 0.88rem;
    cursor: pointer;
    border: 1px solid transparent;
    transition: transform 200ms ease, background 200ms ease, box-shadow 200ms ease;

    &--ghost {
      background: rgba(255, 255, 255, 0.04);
      color: rgba(235, 238, 255, 0.85);
      border-color: rgba(255, 255, 255, 0.14);
      &:hover { background: rgba(255, 255, 255, 0.08); transform: translateY(-1px); }
    }

    &--primary {
      color: #fff;
      background: linear-gradient(120deg, #3a59ff 0%, #ff48c6 100%);
      box-shadow: 0 12px 28px -12px rgba(255, 72, 198, 0.6);
      &:hover { transform: translateY(-1px); }
    }
  }
}

.consent-enter-active,
.consent-leave-active { transition: opacity 280ms ease, transform 280ms ease; }
.consent-enter-from,
.consent-leave-to { opacity: 0; transform: translateY(20px); }
</style>
