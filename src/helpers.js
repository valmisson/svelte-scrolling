export const sanitize = hash => {
  return hash
    .replace(/[^A-Z0-9]/gi, '')
    .toLowerCase()
}

export const getElement = (elementsList, hash) => {
  const elements = elementsList.filter(element => {
    const elementHash = element.hash

    return elementHash === hash
  })

  return elements.length ? elements[0].node : null
}

export const getPosition = element => {
  const recPosition = element.getBoundingClientRect()

  return parseInt(recPosition.top, 10)
}

export const scroll = position => {
  window.scrollBy({
    top: position,
    left: 0,
    behavior: 'smooth'
  })
}
