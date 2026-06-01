import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
}

const app = createApp(App)

app.use(router)

app.mount('#app')
