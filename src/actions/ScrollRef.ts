import { get } from 'svelte/store'
import { sanitize } from '../shared/utils'
import { elements } from '../store'

const elementsList = get(elements)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const scrollRef = (
  node: HTMLElement,
  reference: string
) => {
  if (!reference) {
    throw new Error('scrollRef require a hash')
  }

  elementsList.push({
    node,
    reference: sanitize(reference)
  })

  return {
    destroy () {
      elementsList.length = 0 // empty the elements list
    }
  }
}

export default scrollRef
