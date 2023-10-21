import { writable } from 'svelte/store'
import { cubicInOut } from 'svelte/easing'
import type { GlobalOptions } from '../types/options'
import type { ElementReference } from '../types/reference'

export const elements = writable<Array<ElementReference>>([])
export const globalOptions = writable<GlobalOptions>({
  offset: 0,
  duration: 500,
  passive: true,
  easing: cubicInOut,
  onStart: () => { },
  onDone: () => { }
})
