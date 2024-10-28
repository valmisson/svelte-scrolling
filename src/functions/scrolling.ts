import { get } from 'svelte/store'
import { elements } from '../store'
import { mergeGlobalOptions } from '../internal/globalOptions'
import { getElement, getPosition, sanitize } from '../shared/utils'
import scrolling from '../shared/scrolling'
import type { Coord, GlobalOptions } from '../types/options'

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

  const endPosition = position
  const _options = mergeGlobalOptions(options)
  const { duration, offset, onStart, onDone } = _options

  onStart?.({ offset, duration, endPosition })

  await scrolling(endPosition, _options)

  onDone?.({ offset, duration, endPosition })
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

  const ref = sanitize(reference)

  const elementsList = get(elements)
  const element = getElement(elementsList, ref)

  if (!element) {
    throw new Error(`Element reference '${ref}' not found`)
  }

  const endPosition = getPosition(element)

  await scrollPosition(endPosition, mergeGlobalOptions(options))
}

/**
 * Scroll to the top of the page
 *
 * @param options - An optional param with global options
 */

export const scrollTop = async (
  options?: Partial<GlobalOptions>
): Promise<void> => {
  await scrollPosition({ x: 0, y: 0 }, mergeGlobalOptions(options))
}

/**
 * Scroll to the end of the page
 *
 * @param options - An optional param with global options
 */

export const scrollBottom = async (
  options?: Partial<GlobalOptions>
): Promise<void> => {
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

  await scrollPosition(endPosition, mergeGlobalOptions(options))
}

/**
 * Scroll to the end of left the page
 *
 * @param options - An optional param with global options
 */

export const scrollLeft = async (
  options?: Partial<GlobalOptions>
): Promise<void> => {
  await scrollPosition({ x: 0, y: 0 }, mergeGlobalOptions(options))
}

/**
 * Scroll to the end of right the page
 *
 * @param options - An optional param with global options
 */

export const scrollRight = async (
  options?: Partial<GlobalOptions>
): Promise<void> => {
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

  await scrollPosition(endPosition, mergeGlobalOptions(options))
}
