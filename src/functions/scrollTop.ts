import { smoothScroll } from '@helpers'
import { getGlobalOptions } from '@api/globalOptions'

const globalOptions = getGlobalOptions()

const scrollTop = (
  opts?: GlobalOptions
): void => {
  const { duration, offset, easing } = Object.assign(globalOptions, opts)

  const start = window.pageYOffset
  const end = 0 + offset

  smoothScroll({ start, end, duration, easing }, (position: number) => {
    window.scroll(0, position)
  })
}

export default scrollTop
