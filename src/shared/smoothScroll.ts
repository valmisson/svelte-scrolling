import type { Coord, SmoothOptions } from '../types/options'

const currentPosition = (
  start: number,
  end: number,
  elapsed: number,
  duration: number,
  easing: (t: number) => number
): number => {
  if (elapsed > duration) return end

  return start + (end - start) * easing(elapsed / duration)
}

const smoothScroll = async (
  options: SmoothOptions,
  callback: (coord: Coord) => void
): Promise<void> => {
  return new Promise((resolve) => {
    const { start, end, duration, easing } = options
    const clock = Date.now()

    const step = () => {
      const elapsed = Date.now() - clock
      const positionX = currentPosition(start.x, end.x, elapsed, duration, easing)
      const positionY = currentPosition(start.y, end.y, elapsed, duration, easing)
      callback({ x: positionX, y: positionY })

      if (elapsed > duration) return resolve()

      window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
  })
}

export default smoothScroll
