export function easeInOutQuad(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b
}