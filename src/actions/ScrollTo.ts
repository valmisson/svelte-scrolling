import { get } from 'svelte/store'
import { elements } from '../stores'
import {
  scroll,
  sanitize,
  getElement,
  getPosition
} from '../helpers'

const elementsList = get(elements)

// handle with scrolling
const handle = (event: Event, hash: string): void => {
  event.preventDefault()

  const element = getElement(elementsList, hash)

  if (!element) {
    throw new Error('Element not found')
  }

  const position = getPosition(element)

  scroll(position)
}

const scrollTo = (node: HTMLLinkElement, h: string): void => {
  if (!h) {
    throw new Error('scrollTo require a hash')
  }

  const hash = sanitize(h)

  node.href = hash

  if (node.tagName !== 'A') {
    node.style.cursor = 'pointer'
  }

  node.addEventListener('click', event => handle(event, hash))
  node.addEventListener('touchstart', event => handle(event, hash))
}

export default scrollTo
