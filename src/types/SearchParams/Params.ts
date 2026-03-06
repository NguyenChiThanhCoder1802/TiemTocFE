export interface FetchServicesParams {
  categoryId?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  discountOnly?: boolean
  sort?: 'priority' | 'newest' | 'price_asc' | 'price_desc' | 'popular'
  page?: number
  limit?: number
}
