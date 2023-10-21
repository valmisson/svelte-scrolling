import { get } from 'svelte/store'
import { elements } from '../store'
import { getGlobalOptions } from '../internal/globalOptions'
import type { ScrollToOptions } from '../types/options'
import { sanitize, getElement, getPosition } from '../shared/utils'
import scrolling from '../shared/scrolling'

const elementsList = get(elements)

// handle with scrolling
const handle = async (event: Event, options: ScrollToOptions): Promise<void> => {
  event.preventDefault()

  const { ref, onDone, onStart } = options

  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const duration = options.duration!
  const offset = options.offset!
  const easing = options.easing!

  const element = getElement(elementsList, ref)

  if (!element) {
    throw new Error(`Element reference '${ref}' not found`)
  }

  const endPosition = getPosition(element)

  onStart && onStart({ element, offset, duration, endPosition })

  await scrolling(endPosition, { duration, offset, easing })

  onDone && onDone({ element, offset, duration, endPosition })
}

/**
 * Listens for click (touchstart) events and scrolls to elements with smooth animation
 *
 * @param options - The element reference or global options
 */

const scrollTo = ( // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
  node: HTMLElement,
  options: string | ScrollToOptions
) => {
  if (!options) {
    throw new Error('scrollTo require a options')
  }

  let opts: ScrollToOptions = {
    ref: '',
    ...getGlobalOptions()
  }

  typeof options === 'string'
    ? opts.ref = options
    : opts = Object.assign(opts, options)

  opts.ref = sanitize(opts.ref)

  if (!opts.ref) {
    throw new Error('scrollTo require a reference')
  }

  if (node instanceof HTMLAnchorElement) {
    node.href = `#${opts.ref}`
  }

  if (node instanceof HTMLAnchorElement === false) {
    node.style.cursor = 'pointer'
  }

  const _handler = (event) => handle(event, opts)

  node.addEventListener('click', _handler)
  node.addEventListener('touchstart', _handler)

  return {
    destroy () {
      node.removeEventListener('click', _handler)
      node.removeEventListener('touchstart', _handler)
    }
  }
}

export default scrollTo
