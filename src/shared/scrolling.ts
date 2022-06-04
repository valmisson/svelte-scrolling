import smoothScroll from './smoothScroll'
import { getGlobalOptions } from '../internal/globalOptions'
import type { GlobalOptions } from '../types/options'

const globalOptions = getGlobalOptions()

const scrolling = async (
  endPosition: number,
  opts: GlobalOptions
): Promise<void> => {
  const { duration, easing, offset } = Object.assign(globalOptions, opts)

  const start = window.pageYOffset
  const end = endPosition + offset

  await smoothScroll({ start, end, duration, easing }, (position: number) => {
    window.scroll(0, position)
  })
}

export default scrolling
