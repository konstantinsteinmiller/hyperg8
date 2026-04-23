<template lang="pug">
VModal.privacy-modal.no-bg(class="!max-w-2xl" @close="emit('close')")
  template(#title)
    h2.privacy-modal__title {{ $t('modals.privacyTitle') }}
  template(#text)
    .privacy-modal__body(v-html="html")
  template(#buttons)
    XButton(:label="$t('modals.close')" @click="emit('close')")
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import VModal from '@/components/atoms/VModal.vue'
import XButton from '@/components/atoms/XButton.vue'
import useMarkdown from '@/use/useMarkdown'
import useModals from '@/use/useModals'

// Loaded as raw strings so the source markdown can be edited
// independently — Vite re-builds the bundle on save.
import privacyMd from '@/assets/privacy-policy.md?raw'
import chaosArenaEnMd from '@/assets/documentation/rights/chaos-arena-privacy-policy-en.md?raw'
import chaosArenaDeMd from '@/assets/documentation/rights/chaos-arena-privacy-policy-de.md?raw'

const { privacyVariant } = useModals()

const source = computed(() => {
  switch (privacyVariant.value) {
    case 'chaos-arena-en': return chaosArenaEnMd
    case 'chaos-arena-de': return chaosArenaDeMd
    default: return privacyMd
  }
})
const { html } = useMarkdown(source)

const emit = defineEmits(['close'])

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') emit('close')
  }
  document.addEventListener('keydown', onKey)
})
</script>

<style lang="scss" scoped>
.privacy-modal {
  max-height: min(80vh, 720px);
  overflow: hidden;

  &__title {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-size: 1.5rem;
    color: #fff;
    margin: 4px 0 14px;
  }

  &__body {
    text-align: left;
    color: rgba(235, 238, 255, 0.85);
    line-height: 1.65;
    max-height: 60vh;
    overflow-y: auto;
    padding: 4px 6px 4px 0;

    :deep(h1), :deep(h2), :deep(h3) {
      font-family: 'Space Grotesk', system-ui, sans-serif;
      color: #fff;
      margin: 18px 0 8px;
    }
    :deep(h2) { font-size: 1.15rem; }
    :deep(h3) { font-size: 1rem; opacity: 0.92; }
    :deep(p), :deep(li) { font-size: 0.94rem; }
    :deep(p) { margin: 8px 0; }
    :deep(ul), :deep(ol) { padding-left: 1.2em; margin: 8px 0; }
    :deep(a) { color: #92b1ff; text-decoration: underline; }
    :deep(code) {
      background: rgba(255, 255, 255, 0.08);
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 0.85em;
    }
  }
}
</style>
