/* eslint-disable max-nested-callbacks */
import { sleep } from '../utils'
import { createSharedComposable, useAsyncState, until } from '@vueuse/core'
import { computed } from 'vue'

export interface Item {
  code: string
  name: string
  deletable?: boolean
}

async function loadItems() {
  console.log('items/loadItems()')

  // simulate long request
  await sleep(500)

  return [
    { code: 'aa', name: 'Afar' },
    { code: 'ab', name: 'Abkhazian' },
    { code: 'ae', name: 'Avestan' },
    { code: 'af', name: 'Afrikaans' },
    { code: 'ak', name: 'Akan' },
    { code: 'am', name: 'Amharic' },
    { code: 'an', name: 'Aragonese' },
    { code: 'ar', name: 'Arabic' },
  ]
}

export const useItems = createSharedComposable(() => {
  const { state: items, execute: refresh, isReady } = useAsyncState(loadItems, [])

  const options = computed(() => items.value.map(item => ({
    value: item.code,
    label: item.name,
  })))

  async function resolveOption(value: string, cached?: { value: string, label: string }) {
    if (cached?.value === value) return cached

    await until(() => isReady.value).toBe(true)

    return options.value.find(i => value === i.value)
  }

  return { items, options, refresh, resolveOption }
})
