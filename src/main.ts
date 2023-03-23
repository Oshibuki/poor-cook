import generatedRoutes from 'virtual:generated-pages'
import { createPinia } from 'pinia'
import { setupLayouts } from 'virtual:generated-layouts'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/css-vars.scss'
import './styles/index.scss'
import 'uno.css'

const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
