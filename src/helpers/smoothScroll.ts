import { now } from 'svelte/internal'

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

const smoothScroll = (
  options: SmoothOptions,
  callback: (positon: number) => void
): void => {
  const { start, end, duration, easing } = options
  const clock = now()

  const step = () => {
    const elapsed = now() - clock
    const position = currentPosition(
      start, end, elapsed, duration, easing
    )

    callback(position)

    if (elapsed > duration) return

    window.requestAnimationFrame(step)
  }

  window.requestAnimationFrame(step)
}

export default smoothScroll
