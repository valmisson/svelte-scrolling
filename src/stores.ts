import { writable } from 'svelte/store'
import { cubicInOut } from 'svelte/easing'

export const elements = writable<Array<ElementRef>>([])
export const globalOptions = writable<GlobalOptions>({
  offset: 0,
  duration: 500,
  easing: cubicInOut
})
