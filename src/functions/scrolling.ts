import { scrolling } from '../helpers'
import { getGlobalOptions } from '../api/globalOptions'

const globalOptions = getGlobalOptions()

type GlobalOptions = {
  offset?: number
  duration?: number
  easing?: (t: number) => number
}

export const scrollTop = (
  options?: GlobalOptions
): void => {
  const opts = Object.assign(globalOptions, options)

  scrolling(0, opts)
}

export const scrollBottom = (
  options?: GlobalOptions
): void => {
  const opts = Object.assign(globalOptions, options)

  const body = document.body
  const html = document.documentElement

  const end = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.scrollHeight,
    html.clientHeight,
    html.offsetHeight
  )

  scrolling(end, opts)
}
