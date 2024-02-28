
export interface Coord {
  x: number;
  y: number
}

export interface HooksOptions {
  element?: HTMLElement,
  offset: number,
  duration: number,
  endPosition: Coord
}

export interface GlobalOptions {
  offset: number
  duration: number
  passive?: boolean
  easing: (t: number) => number
  onStart?: (options: HooksOptions) => void
  onDone?: (options: HooksOptions) => void
}

export interface SmoothOptions {
  start: Coord;
  end: Coord;
  duration: number
  easing: (t: number) => number
}

export type ScrollToOptions = Partial<GlobalOptions> & {
  ref: string
}
