import '@formkit/themes/genesis'
import '@formkit/pro/genesis'

import { createApp } from 'vue'

import App from './App.vue'

import { registerFormkit } from './formkit'

const app = createApp(App)
registerFormkit(app)
app.mount('#app')
