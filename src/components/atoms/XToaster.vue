<template>
  <div
    class="fixed top-2 right-2 w-full max-w-80 z-10"
    v-if="toastsList.length"
  >
    <transition-group name="fade">
      <div
        v-for="(toast, index) in toastsList"
        :key="toast.message + index"
        class="relative top-0 right-0 mb-2 toast glass with-bg card"
      >
        <div class="flex justify-between select-none z-20">
          <div
            v-if="!isUsingTheme || theme.isUsePaperTheme.value"
            class="toast-bg -z-10 w-full h-full absolute top-0 left-0 rounded-[12px] bg-black opacity-5 inset-0"
          ></div>
          <div class="px-3 py-2">
            <h4 v-if="toast.title">{{ t(toast.title) ?? toast.title }}</h4>
            <p v-if="toast.message">{{ t(toast.message) ?? toast.message }}</p>
          </div>
          <div
            class="px-3 py-2 flex-shrink border-solid border-l-[1px] flex justify-center items-center cursor-pointer"
            @click="removeToast(toast.id)"
          >
            <span>x</span>
          </div>
        </div>
        <div class="bg absolute top-0 left-0 rounded-3xl bg-transparent opacity-30 inset-0 -z-20" />
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import useToast from '@/use/useToast'
import useTheme from '@/use/useTheme.ts'

const { toastsList, removeToast } = useToast()
const { t } = useI18n()
const { isUsingTheme, isUseIslandTheme } = useTheme()
const theme = useTheme()
</script>

linkInvalidated
