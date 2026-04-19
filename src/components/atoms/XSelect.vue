<template>
  <div>
    <select
      :id="listId"
      v-model="model"
      class="w-40 !py-1 !px-3"
      :class="{
        'rounded-3xl p-1 py-0 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white':
          !theme.isUseIslandTheme.value,
        'glass ': theme.isUseIslandTheme.value,
      }"
    >
      <option
        v-for="item in items"
        :key="item.id"
        :value="item.value"
      >
        {{ item.label || item.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import useTheme from '@/use/useTheme.ts'

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

const theme = useTheme()
const listId = uuidv4()
const model = defineModel()
</script>

<style lang="scss" scoped>
::selection {
  background: unset;
  color: unset;
}
</style>
