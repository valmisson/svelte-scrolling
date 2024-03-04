import { get } from 'svelte/store'
import { elements } from '../store'
import { getGlobalOptions } from '../internal/globalOptions'
import { getElement, getPosition, sanitize } from '../shared/utils'
import type { Coord, GlobalOptions } from '../types/options'
import scrolling from '../shared/scrolling'

const globalOptions = getGlobalOptions()

/**
 * Scroll to a position on the page
 *
 * @param position - The position
 * @param options - An optional param with global options
 */

export const scrollPosition = async (
  position: Coord | number,
  options?: Partial<GlobalOptions>
): Promise<void> => {
  if (!position) {
    throw new Error('scrollPosition require a position value valid')
  }

  if (typeof position === 'number') {
    position = { x: 0, y: position }
  }

  const opts = Object.assign(globalOptions, options)
  const endPosition = position
  const { duration, offset, onStart, onDone } = opts

  onStart && onStart({ offset, duration, endPosition })

  await scrolling(endPosition, opts)

  onDone && onDone({ offset, duration, endPosition })
}

/**
 * Scroll to element
 *
 * @param reference - The element reference
 * @param options - An optional param with global options
 */

export const scrollElement = async (
  reference: string,
  options?: Partial<GlobalOptions>
): Promise<void> => {
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

  const endPosition = getPosition(element)

  await scrollPosition(endPosition, opts)
}

/**
 * Scroll to the top of the page
 *
 * @param options - An optional param with global options
 */

export const scrollTop = async (
  options?: Partial<GlobalOptions>
): Promise<void> => {
  const opts = Object.assign(globalOptions, options)
  const endPosition = { x: 0, y: 0 }

  await scrollPosition(endPosition, opts)
}

/**
 * Scroll to the end of the page
 *
 * @param options - An optional param with global options
 */

export const scrollBottom = async (
  options?: Partial<GlobalOptions>
): Promise<void> => {
  const opts = Object.assign(globalOptions, options)

  const body = document.body
  const html = document.documentElement

  const endPosition = {
    x: 0,
    y: Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.scrollHeight,
      html.clientHeight,
      html.offsetHeight
    )
  }

  await scrollPosition(endPosition, opts)
}

/**
 * Scroll to the end of left the page
 *
 * @param options - An optional param with global options
 */

export const scrollLeft = async (
  options?: Partial<GlobalOptions>
): Promise<void> => {
  const opts = Object.assign(globalOptions, options)
  const endPosition = { x: 0, y: 0 }

  await scrollPosition(endPosition, opts)
}

/**
 * Scroll to the end of right the page
 *
 * @param options - An optional param with global options
 */

export const scrollRight = async (
  options?: Partial<GlobalOptions>
): Promise<void> => {
  const opts = Object.assign(globalOptions, options)

  const body = document.body
  const html = document.documentElement

  const endPosition = {
    x: Math.max(
      body.scrollWidth,
      body.offsetWidth,
      html.scrollWidth,
      html.clientWidth,
      html.offsetWidth
    ),
    y: 0
  }

  await scrollPosition(endPosition, opts)
}
