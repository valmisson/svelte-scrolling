import type { ActorReference, ElementReference } from '../types/reference'

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

export const getActor = (
  actorsList: Array<ActorReference>,
  reference: string
): ActorReference | null => {
  const actors = actorsList.filter(actor => {
    const actorRef = actor.reference

    return actorRef === reference
  })

  return actors.length ? actors[0] : null
}

export const getPosition = (
  element: HTMLElement
): number => {
  return element.offsetTop
}
