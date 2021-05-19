import { writable } from 'svelte/store'

export const elements = writable<Array<ElementRef>>([])
export const globalOptions = writable<GlobalOptions>({
  offset: 0,
  duration: 500
})
