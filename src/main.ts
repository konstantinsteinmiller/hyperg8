import { createApp } from 'vue'
import App from '@/App.vue'
import { i18n, initLocale } from '@/i18n'
import '@/style.scss'

const app = createApp(App)
app.use(i18n)

// Detect the browser language and lazy-load it before mounting.
// If the user is `en-*` (or anything we don't ship), this resolves instantly
// because `en` is bundled with the first paint — no extra network request.
initLocale().finally(() => app.mount('#app'))
