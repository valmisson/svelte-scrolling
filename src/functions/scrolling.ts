import { get } from 'svelte/store'
import { elements } from '../store'
import { getGlobalOptions } from '../internal/globalOptions'
import { getElement, getPosition, sanitize } from '../shared/utils'
import type { ScrollToOptions } from '../types/options'
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
 * @param options - An optional param with global options
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
 * @param options - An optional param with global options
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

/**
 * Scroll to element
 *
 * @param options - The element reference or global options
 */

export const scrollElement = (
  options: string | ScrollToOptions
): void => {
  if (!options) {
    throw new Error('scrollElement require a options')
  }

  let opts: ScrollToOptions = {
    ref: '',
    ...globalOptions
  }

  typeof options === 'string'
    ? opts.ref = options
    : opts = Object.assign(options, opts)

  const ref = sanitize(opts.ref)

  if (!ref) {
    throw new Error('scrollElement require a reference')
  }

  const { offset, duration, easing } = opts

  const elementsList = get(elements)

  const element = getElement(elementsList, ref)

  if (!element) {
    throw new Error(`Element reference '${ref}' not found`)
  }

  scrolling(getPosition(element), { duration, offset, easing })
}
