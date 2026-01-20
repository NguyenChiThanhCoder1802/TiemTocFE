import type { Service } from '../types/HairService/Service'

export const getCategoryName = (category: Service['category']): string => {
  if (!category) return ''

  if (typeof category === 'string') {
    return category
  }

  return category.name || ''
}
export const getCategoryId = (
  category?: Service['category']
): string | null => {
  if (!category) return null
  if (typeof category === 'string') return category
  return category._id
}