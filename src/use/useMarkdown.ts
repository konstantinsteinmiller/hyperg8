import { computed, type Ref } from 'vue'
import { marked } from 'marked'

marked.setOptions({
  breaks: true,
  gfm: true,
})

export default function useMarkdown(source: Ref<string> | (() => string)) {
  const html = computed(() => {
    const raw = typeof source === 'function' ? source() : source.value
    return marked.parse(raw || '') as string
  })
  return { html }
}
