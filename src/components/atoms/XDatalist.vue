<template>
  <div>
    <datalist
      :id="listId"
      :value="model"
      @change="onChange"
    >
      <option
        v-for="item in items"
        :key="item.id"
        :selected="model === item.value || 'false'"
      >
        {{ item.label || item.name }}
      </option>
    </datalist>
    <input
      tabindex="0"
      autoComplete="on"
      :list="listId"
      :value="t(model)"
      class="w-40 !p-2 !py-1 !pl-3"
      :class="{
        'rounded-3xl p-1 py-0 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white':
          !theme.isUseIslandTheme.value,
        'glass ': theme.isUseIslandTheme.value,
      }"
      @focusin="onFocus($el)"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { v4 as uuidv4 } from 'uuid'
import useTheme from '@/use/useTheme.ts'

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

const { t } = useI18n()
const theme = useTheme()
const listId = uuidv4()
const model = defineModel()
const onChange = (evt: any) => {
  model.value = evt
}
const onFocus = el => {
  model.value = model.value
  console.log('el: ', el)
}
</script>

<style lang="scss" scoped>
::selection {
  background: unset;
  color: unset;
}
</style>
