interface ScrollToOpts {
  ref: string
  offset: number
  duration: number
  delay: number
}

interface SmoothOptions {
  start: number
  end: number
  duration: number
  delay: number
}

interface ElementRef {
  node: HTMLElement
  hash: string
}

/// <reference types="svelte" />
/// <reference types="vite/client" />
