import type { App } from 'vue'

import { plugin, defaultConfig } from '@formkit/vue'

import formKitProControls from './formkit.pro'

const config = defaultConfig({
  plugins: [formKitProControls],
})

export function registerFormkit(app: App<Element>) {
  app.use(plugin, config)
}
