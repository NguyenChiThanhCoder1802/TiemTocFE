export const formatTagLabel = (tag: string) => {
  return tag
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}