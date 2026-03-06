export type DiscountType = 'percent' | 'fixed'

export interface UsedByUser {
  userId: string
  usedCount: number
  lastUsedAt: string
}

export interface DiscountCard {
  _id: string

  code: string
  name: string
  description?: string

  discountType: DiscountType
  discountValue: number
  maxDiscountAmount?: number

  minValue: number
  serviceIds?: string[]

  quantity: number
  usedQuantity: number
  userLimit: number
  usedByUsers: UsedByUser[]

  startDate: string
  endDate: string

  isActive: boolean
  isDeleted: boolean

  createdAt: string
  updatedAt: string
}
export interface CreateDiscountCardPayload {
  code: string
  name: string
  description?: string

  discountType: DiscountType
  discountValue: number
  maxDiscountAmount?: number

  minValue?: number
  serviceIds?: string[]

  quantity: number
  userLimit: number

  startDate: string
  endDate: string
}

export interface UpdateDiscountCardPayload
  extends Partial<CreateDiscountCardPayload> {
  isActive?: boolean
}
