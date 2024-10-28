import type { Coord } from 'src/types/options'
import type { ElementReference } from '../types/reference'

export const sanitize = (hash: string): string => {
  return hash
    .replace(/[^A-Z0-9]/gi, '')
    .toLowerCase()
}

export const getElement = (
  elementsList: Array<ElementReference>,
  reference: string
): HTMLElement | null => {
  const element = elementsList.find(el => {
    return el.reference === reference
  })

  if (!element) {
    return document.getElementById(reference)
  }

  return element.node
}

export const getPosition = (
  element: HTMLElement
): Coord => {
  return { y: element.offsetTop, x: element.offsetLeft }
}
