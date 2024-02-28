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
  const elements = elementsList.filter(element => {
    const elementRef = element.reference

    return elementRef === reference
  })

  return elements.length ? elements[0].node : null
}

export const getPosition = (
  element: HTMLElement
): Coord => {
  return { y: element.offsetTop, x: element.offsetLeft }
}
