<template>
  <input
    :value="model"
    :class="{
      'name w-40 rounded-3xl p-4 py-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white':
        !theme.isUseIslandTheme.value,
      glass: theme.isUseIslandTheme.value,
    }"
    :placeholder="placeholder"
    @click="emit('click', $event)"
    @input="onInput"
    @focus="isSelectAll && selectAll($el)"
  />
</template>

<script setup lang="ts">
import useTheme from '@/use/useTheme.ts'

const theme = useTheme()
defineProps({
  isSelectAll: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
})

const model = defineModel()
const onInput = (event: Event) => {
  model.value = (event.target as HTMLInputElement).value
}
const emit = defineEmits(['click'])
const selectAll = (node: any) => {
  node.select()
}
</script>
