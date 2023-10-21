import type { SmoothOptions } from '../types/options'

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
  callback: (positon: number) => void
): Promise<void> => {
  return new Promise(resolve => {
    const { start, end, duration, easing } = options
    const clock = Date.now()

    const step = () => {
      const elapsed = Date.now() - clock
      const position = currentPosition(
        start, end, elapsed, duration, easing
      )

      callback(position)

      if (elapsed > duration) return resolve()

      window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
  })
}

export default smoothScroll
