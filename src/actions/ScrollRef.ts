import { get } from 'svelte/store'
import { sanitize } from '../shared/utils'
import { elements } from '../store'

/**
 * Adds a reference to the elements that `scrollTo` should scroll
 *
 * @param reference - The reference element
 */

const scrollRef = (
  node: HTMLElement,
  reference: string
) => {
  if (!reference) {
    throw new Error('scrollRef require a reference')
  }

  const elementsList = get(elements)

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
