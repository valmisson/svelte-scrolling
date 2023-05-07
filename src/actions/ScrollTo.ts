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

  node.addEventListener('click', event => handle(event, opts), { passive: true })
  node.addEventListener('touchstart', event => handle(event, opts), { passive: true })

  return {
    destroy () {
      node.removeEventListener('click', event => handle(event, opts))
      node.removeEventListener('touchstart', event => handle(event, opts))
    }
  }
}

export default scrollTo
