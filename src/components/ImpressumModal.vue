<template lang="pug">
VModal.impressum-modal.no-bg(class="!max-w-xl" @close="emit('close')")
  template(#title)
    h2.impressum-modal__title {{ $t('modals.imprintTitle') }}
  template(#text)
    .impressum-modal__body(v-html="html")
  template(#buttons)
    XButton(:label="$t('modals.close')" @click="emit('close')")
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VModal from '@/components/atoms/VModal.vue'
import XButton from '@/components/atoms/XButton.vue'
import useMarkdown from '@/use/useMarkdown'
import { company } from '@/data/company'

const source = ref(company.impressumMd)
const { html } = useMarkdown(source)

const emit = defineEmits(['close'])
</script>

<style lang="scss" scoped>
.impressum-modal {
  max-height: min(80vh, 720px);

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

    :deep(h1), :deep(h2), :deep(h3) {
      font-family: 'Space Grotesk', system-ui, sans-serif;
      color: #fff;
      margin: 18px 0 8px;
    }
    :deep(h3) { font-size: 1.05rem; }
    :deep(p) { margin: 8px 0; font-size: 0.94rem; }
    :deep(strong) { color: #fff; }
    :deep(blockquote) {
      border-left: 3px solid rgba(255, 255, 255, 0.2);
      padding: 4px 12px;
      margin: 12px 0;
      color: rgba(235, 238, 255, 0.6);
      font-style: italic;
      font-size: 0.86rem;
    }
  }
}
</style>
