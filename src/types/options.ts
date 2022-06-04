export interface HooksOptions {
  element?: HTMLElement,
  offset: number,
  duration: number,
  endPosition: number
}

export interface GlobalOptions {
  offset: number
  duration: number
  easing: (t: number) => number
  onStart?: (options: HooksOptions) => void
  onDone?: (options: HooksOptions) => void
}

export interface SmoothOptions {
  start: number
  end: number
  duration: number
  easing: (t: number) => number
}

export type ScrollToOptions = Partial<GlobalOptions> & {
  ref: string
}
