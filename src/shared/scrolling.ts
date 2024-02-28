import smoothScroll from './smoothScroll'
import { getGlobalOptions } from '../internal/globalOptions'
import type { Coord, GlobalOptions } from '../types/options'

const globalOptions = getGlobalOptions()

const scrolling = async (
  coord: Coord,
  opts: GlobalOptions
): Promise<void> => {
  const { duration, easing, offset } = Object.assign(globalOptions, opts)

  const startY = window.pageYOffset
  const startX = window.pageXOffset
  const endX = coord.x + offset
  const endY = coord.y

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
