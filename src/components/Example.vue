<template>
  <p>{{ modelValue }}</p>
  <FormKit
    v-model="data"
    type="dropdown"
    :options="options"
    :option-loader="resolveOption"
    behavior="overscroll"
    @input="update($event)"
  />
</template>

<!--
h2. Data formats

The data format for the `Example.vue` component has the shape
of an object with the following properties:

```
{ code: 'xx', name: 'Xerxesian' }
```

The data format for FormKit is just a `string`.
-->

<script lang="ts" setup>
import { computed, type PropType } from 'vue'

import { editorRef } from '../editor-ref'
import { useItems } from '../composables/items'

const props = defineProps({
  modelValue: { type: Object as PropType<{ code: string, name: string }>, default: () => ({ value: '' }) },
})

const emit = defineEmits([
  'update:modelValue',
])

// The `editorRef` takes an observable value (in this case the code
// of a item passed on as `modelValue.code`) and links it together.
// The `editorRef` is still editable just as a normal `ref` would be
// with the exception that if the source changed your edits will be overwritten.
//
// This way if the original `ref` changed, the new value is received in the
// `modelValue` prop, the `modelValue.code` value changes, that change is
// then picked up by a watch inside of `editorRef` and the `data` is then
// updated with the latest.
//
// Thanks to this process you can still have control over when the ref's
// value is populated upwards from editor components. In essence, it is a
// one-way synchronized value having its source reactive.
const data = editorRef(computed(() => props.modelValue?.code))

const { options, resolveOption } = useItems()

// The `update` function finds the selected item in the list
// and emits that item.
// This is done so that the Example editor can edit complex objects
// that have been passed on as the `modelValue` prop
// eslint-disable-next-line complexity
function update(code: string) {
  console.log('Example.vue/update(code =', code, ')')

  const item = options.value?.find(i => i.value === code)
  if (item && item.value) {
    console.log('Example.vue/update - emitting event')

    emit('update:modelValue', {
      ...props.modelValue,
      code: item.value,
      name: item.label,
    })

    console.log('Example.vue/update - event emitted')
  } else {
    console.warn('Example.vue/update - option with value', code, 'not found in', options.value)
  }
}
</script>
