import { get } from 'svelte/store'
import { elements } from '../store'
import { getGlobalOptions } from '../internal/globalOptions'
import { getElement, getPosition, sanitize } from '../shared/utils'
import type { GlobalOptions } from '../types/options'
import scrolling from '../shared/scrolling'

const globalOptions = getGlobalOptions()

/**
 * Scroll to the top of the page
 *
 * @param options - An optional param with global options
 */

export const scrollTop = (
  options?: Partial<GlobalOptions>
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
  options?: Partial<GlobalOptions>
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
 * @param reference - The element reference
 * @param options - An optional param with global options
 */

export const scrollElement = (
  reference: string,
  options?: Partial<GlobalOptions>
): void => {
  if (!reference || typeof reference !== 'string') {
    throw new Error('scrollElement require a reference valid')
  }

  const opts = Object.assign(globalOptions, options)
  const ref = sanitize(reference)

  const elementsList = get(elements)
  const element = getElement(elementsList, ref)

  if (!element) {
    throw new Error(`Element reference '${ref}' not found`)
  }

  scrolling(getPosition(element), opts)
}

/**
 * Scroll to a position on the page
 *
 * @param position - The position
 * @param options - An optional param with global options
 */

export const scrollPosition = (
  position: number,
  options?: Partial<GlobalOptions>
): void => {
  if (!position || typeof position !== 'number') {
    throw new Error('scrollPosition require a position value valid')
  }

  const opts = Object.assign(globalOptions, options)

  scrolling(position, opts)
}
