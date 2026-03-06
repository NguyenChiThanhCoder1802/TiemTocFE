export interface Category {
  _id: string
  name: string
  description?: string
  order: number
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

import type { Service } from '../HairService/Service'

export interface CategoryWithServices extends Category {
  services: Service[]
  serviceCount: number
}

export interface CategoryStats {
  category: Category
  stats: {
    totalServices: number
    activeServices: number
    totalBookings: number
    averageRating: number
    totalReviews: number
  }
}

export interface CreateCategoryPayload {
  name: string
  description?: string
  order?: number
  isActive?: boolean
}

export interface UpdateCategoryPayload {
  name?: string
  description?: string
  order?: number
  isActive?: boolean
}
