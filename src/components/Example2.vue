<template>
  <select :value="modelValue.code" @input="update(($event.target as HTMLSelectElement).value)">
    <option v-for="item in items" :key="item.code" :value="item.code">
      {{ item.name }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { useItems, type Item } from '../composables/items'

defineProps({
  modelValue: { type: Object as PropType<Item>, required: true },
})

const emit = defineEmits([
  'update:modelValue',
])

const { items } = useItems()

function update(value: string) {
  const item = items.value.find(i => i.code === value)
  if (item) emit('update:modelValue', item)
  else throw new Error(`Unknown value: ${value}`)
}
</script>
