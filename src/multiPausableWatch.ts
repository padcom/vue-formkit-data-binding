/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable promise/catch-or-return */
/* eslint-disable require-await */
/* eslint-disable max-lines-per-function */
/* eslint-disable promise/prefer-await-to-callbacks */
import { ref, watch } from 'vue'

type WatchParams = Parameters<typeof watch>
type WatchSource = WatchParams[0]
type WatchHandler = WatchParams[1]
type WatchOptions = WatchParams[2]

export function multiPausableWatch(
  source: WatchSource,
  handler: WatchHandler,
  watchOptions?: WatchOptions,
) {
  const updateDepth = ref(0)

  function pause() {
    return ++updateDepth.value
  }

  function resume() {
    // eslint-disable-next-line no-unsafe-finally
    if (updateDepth.value === 0) throw new Error('Stack underrun error!')

    updateDepth.value--

    if (updateDepth.value === 0) console.log('Updates resumed')
    else console.log('Counting down to 0 t0 resume updates; currently at', updateDepth.value)

    return updateDepth.value
  }

  async function withUpdatesPaused<T>(callback: () => T): Promise<T> {
    pause()
    console.log('Updates are paused with level', updateDepth.value)

    try {
      const result = await callback()
      console.log('Work part of update completed')

      return result
    } finally {
      resume()
    }
  }

  watch(source, (value, oldValue, onCleanup) => {
    if (updateDepth.value !== 0) {
      console.log('Updates are paused - skipping this one')
    } else {
      console.log('Pausable watch triggered')

      handler(value, oldValue, onCleanup)
    }
  }, watchOptions)

  return { withUpdatesPaused }
}
