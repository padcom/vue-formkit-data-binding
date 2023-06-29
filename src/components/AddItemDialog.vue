<template>
  <dialog ref="dialog" @close="close('cancel')">
    <h3>Add new item</h3>

    <Example v-model="item" />
    <CloseDialogButton :result="item" />
  </dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import Example from './Example.vue'
import CloseDialogButton from './CloseDialogButton.vue'

import { createDialogContext } from '../dialog'

const item = ref({ name: '', code: ' ' })

const dialog = ref<HTMLDialogElement>()
const { close, showModal } = createDialogContext(dialog)

defineExpose({
  showModal() {
    item.value = { name: '', code: ' ' }

    return showModal()
  },
})
</script>
