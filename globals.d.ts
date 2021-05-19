interface GlobalOptions {
  offset: number
  duration: number
  easing: (t: number) => number
}

interface ScrollToOpts extends GlobalOptions {
  ref: string
}

interface SmoothOptions {
  start: number
  end: number
  duration: number
  easing: (t: number) => number
}

interface ElementRef {
  node: HTMLElement
  hash: string
}

/// <reference types="svelte" />
/// <reference types="vite/client" />
