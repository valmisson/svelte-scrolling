import { getGlobalOptions } from '../internal/globalOptions'
import scrolling from '../shared/scrolling'

const globalOptions = getGlobalOptions()

type GlobalOptions = {
  offset?: number
  duration?: number
  easing?: (t: number) => number
}

/**
 * Scroll to the top of the page
 *
 * @param options - object | undefined
 */

export const scrollTop = (
  options?: GlobalOptions
): void => {
  const opts = Object.assign(globalOptions, options)

  scrolling(0, opts)
}

/**
 * Scroll to the end of the page
 *
 * @param options - object | undefined
 */

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
