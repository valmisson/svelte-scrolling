export const sanitize = (hash: string): string => {
  return hash
    .replace(/[^A-Z0-9]/gi, '')
    .toLowerCase()
}

export const getElement = (
  elementsList: Array<ElementRef>,
  hash: string
): HTMLElement | null => {
  const elements = elementsList.filter(element => {
    const elementHash = element.hash

    return elementHash === hash
  })

  return elements.length ? elements[0].node : null
}

export const getPosition = (
  element: HTMLElement
): number => {
  return element.offsetTop
}
