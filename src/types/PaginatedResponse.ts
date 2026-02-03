import type { Pagination } from './Pagination'
export interface PaginatedApiResponse<T> {
 message?: string
  data: T[]
  pagination: Pagination
}
