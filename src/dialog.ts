import { createInjectionState } from '@vueuse/core'
import type { Ref } from 'vue'

const [createDialogContext, useDialogContextWithoutErrorHandling] = createInjectionState((
  dialog: Ref<HTMLDialogElement | undefined>,
) => {
  function showModal() {
    return new Promise((resolve, reject) => {
      if (!dialog.value) {
        reject(new Error('No dialog ref available'))
      } else {
        dialog.value.returnValue = ''
        dialog.value.addEventListener('close', () => {
          resolve(JSON.parse(dialog.value?.returnValue || ''))
        }, { once: true })
        dialog.value.showModal()
      }
    })
  }

  function show() {
    if (!dialog.value) throw new Error('No dialog ref available')
    dialog.value.returnValue = ''
    dialog.value?.show()
  }

  function close(returnValue?: any) {
    if (!dialog.value) throw new Error('No dialog ref available')
    if (returnValue !== undefined) {
      dialog.value.close(JSON.stringify(returnValue))
    }
  }

  return { dialog, showModal, show, close }
})

function useDialogContext() {
  const context = useDialogContextWithoutErrorHandling()
  if (!context) throw new Error('This component needs to live in the context of a dialog')

  return context
}

export { createDialogContext, useDialogContext }
