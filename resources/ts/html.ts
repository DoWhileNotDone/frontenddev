export function tag (tag: any, text: string) {
  const el = document.createElement(tag)
  el.textContent = text

  return el
}
