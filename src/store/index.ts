import { writable } from 'svelte/store'
import { cubicInOut } from 'svelte/easing'
import { noop } from 'svelte/internal'
import type { GlobalOptions } from '../types/options'
import type { ElementReference, ActorReference } from '../types/reference'

export const elements = writable<Array<ElementReference>>([])
export const actors = writable<Array<ActorReference>>([])
export const globalOptions = writable<GlobalOptions>({
  offset: 0,
  duration: 500,
  easing: cubicInOut,
  onStart: noop,
  onDone: noop
})
