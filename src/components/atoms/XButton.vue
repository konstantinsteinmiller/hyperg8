<template>
  <button
    :class="{
      'bg-black px-4 py-2 rounded-3xl border-black border-solid border-[1px] text-gray-200 hover:text-white uppercase w-auto focus:outline-none hover:underline':
        !theme.isUseIslandTheme.value,
      'glass select-none': theme.isUseIslandTheme.value,
    }"
    @click="emits('click', $event)"
  >
    <slot name="default">
      <span>{{ label }}</span>
    </slot>

    <div class="button-bg absolute top-0 left-0 rounded-3xl bg-transparent opacity-30 inset-0 -z-20" />
  </button>
</template>

<script setup lang="ts">
import useTheme from '@/use/useTheme.ts'

const theme = useTheme()
defineProps({
  label: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['click'])
</script>
