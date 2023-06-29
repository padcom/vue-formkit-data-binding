import { ref, type Ref, type ComputedRef } from 'vue'
import { watchEffect } from 'vue'

export type EditorRef<T> = Ref<T> & {
  reset(): void
}

export function clone<T>(source: T): T {
  return JSON.parse(JSON.stringify(source))
}

/**
 * An "editor"-type ref generator that connects a property (usually 'modelValue')
 * to a ref value that can be locally modified. However, when the prop value changes
 * that means the user started from a different origin and it becomes the current
 * value of data.
 *
 * @param source source for synchronization
 * @returns a ref connected to `source` with the prop changes having higher priority over local edits
 */
export function editorRef<T>(source: Ref<T> | ComputedRef<T>) {
  const data = ref<T>() as EditorRef<T>

  // A small bonus to be able to trigger the reset manually
  data.reset = function() {
    if (source.value === undefined) data.value = undefined as T
    else if (source.value === null) data.value = null as T
    else data.value = clone(source.value)
  }

  // watchEffect has exactly the semantic we're looking for:
  // - it will run as part of the setup function
  // - it will capture the initial value of the source
  // - it will re-run each time the source changes
  watchEffect(data.reset)

  return data
}
