export interface GlobalOptions {
  offset: number
  duration: number
  easing: (t: number) => number
}

export interface ScrollToOptions extends GlobalOptions {
  ref: string
}

export interface SmoothOptions {
  start: number
  end: number
  duration: number
  easing: (t: number) => number
}

export interface ElementReference {
  node: HTMLElement
  reference: string
}
