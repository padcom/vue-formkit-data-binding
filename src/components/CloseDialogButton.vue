<template>
  <button @click="close(result)">Close</button>
</template>

<script lang="ts" setup>
import { useDialogContext } from '../dialog'

defineProps({
  result: { type: [String, Object, Number], default: 'ok' },
})

const { close } = useDialogContext()
</script>
