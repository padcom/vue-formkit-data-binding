/* eslint-disable max-lines-per-function */
/* eslint-disable no-use-before-define */
import { createSharedComposable } from '@vueuse/core'
import { type Item } from './items'
import { ref } from 'vue'
import { multiPausableWatch } from '../multiPausableWatch'
import { clone } from '../editor-ref'
import { sleep } from '../utils'

export interface CommonSettings {
  items: Item[]
}

async function loadCommonSettings() {
  console.log('common-settings.ts/saveCommonSettings()')
  await sleep(100)

  return {
    items: [
      { code: 'aa', name: 'aaaaa' },
      { code: 'ab', name: 'aaaaa', deletable: true },
    ],
  }
}

async function saveCommonSettings(commonSettings: CommonSettings) {
  console.log('common-settings.ts/saveCommonSettings(commonSettings =', commonSettings, ')')
  await sleep(1000)
}

export const useCommonSettings = createSharedComposable(() => {
  const commonSettings = ref<CommonSettings>({
    items: [],
  })

  const { withUpdatesPaused } = multiPausableWatch([commonSettings], update, { deep: true })

  function update() {
    console.log('common-settings.ts/update()')

    return withUpdatesPaused(async () => {
      await saveCommonSettings(clone(commonSettings.value))
    })
  }

  function refresh() {
    console.log('common-settings.ts/refresh()')

    return withUpdatesPaused(async () => {
      commonSettings.value = await loadCommonSettings()
    })
  }

  function addItem(code: string, name: string) {
    console.log('common-settings.ts/addItem(code =', code, '; name=', name, ')')
    commonSettings.value.items.push({ code, name })
  }

  function deleteItem(code: string) {
    console.log('common-settings.ts/deleteItem(code =', code, ')')
    const index = commonSettings.value.items.findIndex(item => item.code === code)
    console.log('common-settings.ts/deleteItem() - index =', index)

    if (index !== -1) {
      commonSettings.value.items.splice(index, 1)
    }
  }

  return { commonSettings, refresh, addItem, deleteItem }
})
