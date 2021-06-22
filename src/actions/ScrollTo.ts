import { get } from 'svelte/store'
import { elements } from '../store'
import { getGlobalOptions } from '../internal/globalOptions'
import type { ScrollToOptions } from '../types/options'
import { sanitize, getElement, getPosition } from '../shared/utils'
import scrolling from '../shared/scrolling'

const elementsList = get(elements)
const globalOpts = getGlobalOptions()

// handle with scrolling
const handle = (event: Event, options: ScrollToOptions): void => {
  event.preventDefault()

  const { ref, offset, duration, easing } = options
  const element = getElement(elementsList, ref)

  if (!element) {
    throw new Error('Element not found')
  }

  scrolling(getPosition(element), { duration, offset, easing })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const scrollTo = (
  node: HTMLElement,
  options: ScrollToOptions | string
) => {
  if (!options) {
    throw new Error('scrollTo require a options')
  }

  let opts: ScrollToOptions = {
    ref: '',
    ...globalOpts
  }

  typeof options === 'string'
    ? opts.ref = options
    : opts = Object.assign(options, opts)

  const ref = sanitize(opts.ref)

  if (!ref) {
    throw new Error('scrollTo require a reference')
  }

  opts.ref = ref

  if (node instanceof HTMLLinkElement) {
    node.href = ref
  }

  if (node.tagName !== 'A') {
    node.style.cursor = 'pointer'
  }

  node.addEventListener('click', event => handle(event, opts))
  node.addEventListener('touchstart', event => handle(event, opts))

  return {
    destroy () {
      node.removeEventListener('click', event => handle(event, opts))
      node.removeEventListener('touchstart', event => handle(event, opts))
    }
  }
}

export default scrollTo
