import { get } from 'svelte/store'
import { sanitize } from '@src/helpers'
import { elements } from '@src/stores'

const elementsList = get(elements)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const scrollRef = (
  node: HTMLElement,
  hash: string
) => {
  if (!hash) {
    throw new Error('scrollRef require a hash')
  }

  elementsList.push({
    node,
    hash: sanitize(hash)
  })

  return {
    destroy () {
      elementsList.length = 0 // empty the elements list
    }
  }
}

export default scrollRef
