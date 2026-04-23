<template lang="pug">
.app
  TopNav
  main.app__main
    HeroSection
    ParallaxInterlude(variant="rodents")
    GamesSection
    ParallaxInterlude(variant="cards")
    AboutSection
    ParallaxInterlude(variant="spinners")
  FooterSection

  transition(name="modal")
    PrivacyModal(v-if="modals.active.value === 'privacy'" @close="modals.close")
  transition(name="modal")
    ImpressumModal(v-if="modals.active.value === 'impressum'" @close="modals.close")

  ConsentBanner
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import TopNav from '@/components/TopNav.vue'
import HeroSection from '@/components/HeroSection.vue'
import GamesSection from '@/components/GamesSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import ParallaxInterlude from '@/components/ParallaxInterlude.vue'
import PrivacyModal from '@/components/PrivacyModal.vue'
import ImpressumModal from '@/components/ImpressumModal.vue'
import ConsentBanner from '@/components/ConsentBanner.vue'
import useModals, { type ModalKey, type PrivacyVariant } from '@/use/useModals'

const modals = useModals()

type Target = { modal: Exclude<ModalKey, null>; variant?: PrivacyVariant }
const QUERY_TO_MODAL: Record<string, Target> = {
  'privacy-policy': { modal: 'privacy' },
  'chaos-arena-privacy-policy-en': { modal: 'privacy', variant: 'chaos-arena-en' },
  'chaos-arena-privacy-policy-de': { modal: 'privacy', variant: 'chaos-arena-de' },
  'imprint': { modal: 'impressum' },
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  for (const [key, target] of Object.entries(QUERY_TO_MODAL)) {
    if (params.get(key) === 'true') {
      modals.open(target.modal, target.variant)
      break
    }
  }
})
</script>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__main { flex: 1; }
}

.modal-enter-active,
.modal-leave-active { transition: opacity 280ms ease; }
.modal-enter-from,
.modal-leave-to { opacity: 0; }
</style>
