import smoothScroll from './smoothScroll'
import type { Coord, GlobalOptions } from '../types/options'

const scrolling = async (
  coord: Coord,
  options: GlobalOptions
): Promise<void> => {
  const { duration, easing, offset } = options

  const startY = window.pageYOffset
  const startX = window.pageXOffset
  const endX = coord.x + offset
  const endY = coord.y + offset

  await smoothScroll({
    start: {
      x: startX,
      y: startY
    },
    end: {
      x: endX,
      y: endY
    },
    duration,
    easing
  }, (coord: Coord) => {
    window.scroll(coord.x, coord.y)
  })
}

export default scrolling
