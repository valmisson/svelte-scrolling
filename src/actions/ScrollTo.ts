import { get } from 'svelte/store'
import { elements } from '../stores'
import { getGlobalOptions } from '../api/globalOptions'
import type { ScrollToOptions } from '../types/options'
import {
  sanitize,
  getElement,
  getPosition,
  scrolling
} from '../helpers'

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
  node: HTMLLinkElement,
  opts: ScrollToOptions | string
) => {
  if (!opts) {
    throw new Error('scrollTo require a options')
  }

  let options: ScrollToOptions = {
    ref: '',
    ...globalOpts
  }

  typeof opts === 'string'
    ? options.ref = opts
    : options = Object.assign(options, opts)

  const ref = sanitize(options.ref)

  if (!ref) {
    throw new Error('scrollTo require a reference')
  }

  options.ref = ref
  node.href = ref

  if (node.tagName !== 'A') {
    node.style.cursor = 'pointer'
  }

  node.addEventListener('click', event => handle(event, options))
  node.addEventListener('touchstart', event => handle(event, options))

  return {
    destroy () {
      node.removeEventListener('click', event => handle(event, options))
      node.removeEventListener('touchstart', event => handle(event, options))
    }
  }
}

export default scrollTo
