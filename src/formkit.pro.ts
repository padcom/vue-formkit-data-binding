import { createProPlugin, dropdown } from '@formkit/pro'

export default createProPlugin(import.meta.env.VITE_APP_FORMKIT_PRO_KEY, {
  dropdown,
})
