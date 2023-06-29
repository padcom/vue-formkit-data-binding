<!-- eslint-disable require-atomic-updates -->
<template>
  <div v-for="(item, index) in commonSettings.items" :key="item.code" class="example">
    <Example v-model="commonSettings.items[index]" />
    <button v-if="item.deletable" @click="deleteItem(item.code)">Delete</button>
  </div>

  <p>APP: value3 = {{ commonSettings }}</p>
  <p><button @click="handleAddItem">Add item</button></p>

  <AddItemDialog ref="addItemDialog" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Example from './components/Example.vue'
import { useCommonSettings } from './composables/common-settings'
import AddItemDialog from './components/AddItemDialog.vue'

const { commonSettings, refresh, addItem, deleteItem } = useCommonSettings()

const addItemDialog = ref<typeof AddItemDialog>()

onMounted(refresh)

async function handleAddItem() {
  const result = await addItemDialog.value?.showModal()

  if (result) {
    addItem(result.code, result.name)
  }
}
</script>

<style lang="postcss">
select {
  margin-right: 8px;
}

.example + .example {
  margin: 32px 0px;
}
</style>
