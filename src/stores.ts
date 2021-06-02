import { writable } from 'svelte/store'
import { cubicInOut } from 'svelte/easing'
import type {
  ElementReference,
  GlobalOptions
} from './types/options'

export const elements = writable<Array<ElementReference>>([])
export const globalOptions = writable<GlobalOptions>({
  offset: 0,
  duration: 500,
  easing: cubicInOut
})
