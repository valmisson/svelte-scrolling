import { now } from 'svelte/internal'
import { cubicInOut } from 'svelte/easing'

const currentPosition = (
  start: number,
  end: number,
  elapsed: number,
  duration: number
): number => {
  if (elapsed > duration) return end

  return start + (end - start) * cubicInOut(elapsed / duration)
}

const smoothScroll = (
  options: SmoothOptions,
  callback: (positon: number) => void
): void => {
  const { start, end, duration, delay } = options
  const clock = now() + delay

  const step = () => {
    const elapsed = now() - clock
    const position = currentPosition(start, end, elapsed, duration)

    callback(position)

    if (elapsed > duration) return

    window.requestAnimationFrame(step)
  }

  window.requestAnimationFrame(step)
}

export default smoothScroll
