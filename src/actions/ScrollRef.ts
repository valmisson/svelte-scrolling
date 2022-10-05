import { get } from 'svelte/store'
import { getActor, sanitize } from '../shared/utils'
import { elements, actors } from '../store'

interface HandleOpts {
  node: HTMLElement,
  ref: string
}

// handle with scrolling
const handleScroll = async (event: Event, options: HandleOpts): Promise<void> => {
  event.preventDefault()

  const { ref, node } = options

  const actorsList = get(actors)

  const actor = getActor(actorsList, ref)

  if (!actor) {
    throw new Error(`Element reference '${ref}' not found`)
  }

  const isVisibile = node.getBoundingClientRect().top < window.innerHeight && node.getBoundingClientRect().bottom > 0
  actor.onStateChange && actor.onStateChange({ active: isVisibile })
}

/**
 * Adds a reference to the elements that `scrollTo` should scroll
 *
 * @param reference - The reference element
 */

const scrollRef = ( // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
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

  window.addEventListener('scroll', (e) => handleScroll(e, { node, ref: sanitize(reference) }))

  return {
    destroy () {
      elementsList.length = 0 // empty the elements list
    }
  }
}

export default scrollRef
