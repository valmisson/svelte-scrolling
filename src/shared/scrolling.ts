import smoothScroll from './smoothScroll'
import { getGlobalOptions } from '../internal/globalOptions'
import type { GlobalOptions } from '../types/options'

const globalOptions = getGlobalOptions()

const scrolling = (
  endPosition: number,
  opts?: GlobalOptions
): void => {
  const options = Object.assign(globalOptions, opts)

  const start = window.pageYOffset
  const end = endPosition + options.offset

  smoothScroll({ start, end, ...options }, (position: number) => {
    window.scroll(0, position)
  })
}

export default scrolling
