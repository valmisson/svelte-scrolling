import { scrolling } from '@helpers'

export const scrollTop = (
  options?: GlobalOptions
): void => {
  scrolling(0, options)
}

export const scrollBottom = (
  options?: GlobalOptions
): void => {
  const body = document.body
  const html = document.documentElement

  const end = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.scrollHeight,
    html.clientHeight,
    html.offsetHeight
  )

  scrolling(end, options)
}