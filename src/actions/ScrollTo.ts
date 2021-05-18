import { get } from 'svelte/store'
import { elements } from '@src/stores'
import {
  sanitize,
  getElement,
  getPosition,
  smoothScroll
} from '@helpers'

const elementsList = get(elements)

// handle with scrolling
const handle = (event: Event, options: ScrollToOpts): void => {
  event.preventDefault()

  const { ref, offset, duration, delay } = options
  const element = getElement(elementsList, ref)

  if (!element) {
    throw new Error('Element not found')
  }

  const start = window.pageYOffset
  const end = getPosition(element) + offset

  smoothScroll({ start, end, duration, delay }, (position: number) => {
    window.scroll(0, position)
  })
}

const scrollTo = (
  node: HTMLLinkElement,
  opts: ScrollToOpts | string
) => {
  if (!opts) {
    throw new Error('scrollTo require a options')
  }

  let options: ScrollToOpts = {
    ref: '',
    offset: 0,
    duration: 500,
    delay: 0
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
