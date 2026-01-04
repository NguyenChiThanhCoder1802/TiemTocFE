export type DiscountTargetType = 'service' | 'order'

export type DiscountType = 'percent' | 'fixed'

/* ================= SERVICE DISCOUNT ================= */

export interface ServiceDiscount {
  percent: number
  startAt?: string
  endAt?: string
  isActive: boolean
}

/* ================= DISCOUNT CARD ================= */

export interface DiscountCard {
  _id: string

  /* ===== BASIC ===== */
  code: string
  name: string
  description?: string

  /* ===== TYPE ===== */
  targetType: DiscountTargetType
  discountType: DiscountType

  /* ===== VALUE ===== */
  discountValue: number
  maxDiscountAmount?: number

  /* ===== APPLY CONDITION ===== */
  minValue: number
  hairSalonIds?: string[]

  serviceDiscount?: ServiceDiscount

  /* ===== LIMIT ===== */
  quantity: number
  usedQuantity: number

  userLimit: number
  userCount: number

  appliedUsers?: string[]

  /* ===== TIME ===== */
  startDate: string
  endDate: string

  /* ===== STATUS ===== */
  isActive: boolean
  isDeleted: boolean

  createdAt: string
  updatedAt: string
}

/* ================= PAYLOAD ================= */

export interface CreateDiscountCardPayload {
  code: string
  name: string
  description?: string

  targetType: DiscountTargetType
  discountType: DiscountType

  discountValue: number
  maxDiscountAmount?: number

  minValue: number
  hairSalonIds?: string[]

  quantity: number
  userLimit: number

  startDate: string
  endDate: string
}

export interface UpdateDiscountCardPayload
  extends Partial<CreateDiscountCardPayload> {
  isActive?: boolean
}
