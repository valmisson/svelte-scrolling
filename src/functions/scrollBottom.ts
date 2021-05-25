import { smoothScroll } from '@helpers'
import { getGlobalOptions } from '@api/globalOptions'

const globalOptions = getGlobalOptions()

const scrollBottom = (
  opts: GlobalOptions
): void => {
  const { duration, offset, easing } = Object.assign(globalOptions, opts)

  const body = document.body
  const html = document.documentElement

  const start = window.pageYOffset
  const end = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.scrollHeight,
    html.clientHeight,
    html.offsetHeight
  ) + offset

  smoothScroll({ start, end, duration, easing }, (position: number) => {
    window.scroll(0, position)
  })
}

export default scrollBottom
