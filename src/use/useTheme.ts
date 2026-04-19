import { ref, readonly } from 'vue'

// Toggle between the default flat theme and the glassmorphism "island" look
// used by the existing atom components (XButton, XInput, XSwitch ...).
const isUseIslandTheme = ref(true)

const setIslandTheme = (value: boolean) => {
  isUseIslandTheme.value = value
}

export default function useTheme() {
  return {
    isUseIslandTheme: readonly(isUseIslandTheme),
    setIslandTheme,
  }
}
