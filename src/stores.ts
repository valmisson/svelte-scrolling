import { writable } from 'svelte/store'

export const elements = writable<Array<ElementRef>>([])
