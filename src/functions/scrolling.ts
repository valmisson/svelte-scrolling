import { get } from 'svelte/store'
import { elements } from '../store'
import { getGlobalOptions } from '../internal/globalOptions'
import { getElement, getPosition, sanitize } from '../shared/utils'
import type { Coord, GlobalOptions } from '../types/options'
import scrolling from '../shared/scrolling'

const globalOptions = getGlobalOptions()

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

  const { duration, offset, onStart, onDone } = opts

  onStart && onStart({ offset, duration, endPosition })

  await scrolling(endPosition, opts)

  onDone && onDone({ offset, duration, endPosition })
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

  const { duration, offset, onStart, onDone } = opts

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

  const { duration, offset, onStart, onDone } = opts

  const elementsList = get(elements)
  const element = getElement(elementsList, ref)

  if (!element) {
    throw new Error(`Element reference '${ref}' not found`)
  }

  const endPosition = getPosition(element)

  onStart && onStart({ element, offset, duration, endPosition })

  await scrolling(endPosition, opts)

  onDone && onDone({ element, offset, duration, endPosition })
}

/**
 * Scroll to a position on the page
 *
 * @param position - The position
 * @param options - An optional param with global options
 */

export const scrollPosition = async (
  position: Coord,
  options?: Partial<GlobalOptions>
): Promise<void> => {
  if (!position || typeof position !== 'number') {
    throw new Error('scrollPosition require a position value valid')
  }

  const opts = Object.assign(globalOptions, options)
  const endPosition = position
  const { duration, offset, onStart, onDone } = opts

  onStart && onStart({ offset, duration, endPosition })

  await scrolling(endPosition, opts)

  onDone && onDone({ offset, duration, endPosition })
}
