export interface ServiceDiscount {
  percent: number
  startAt?: string
  endAt?: string
  isActive: boolean
}
export interface ServiceCombo {
  originalPrice?: number
  comboPrice?: number
  endAt?: string | Date
}
export interface ServiceLite {
  _id: string
  name: string
  finalPrice: number
  duration: number
}
export interface Service {
  _id: string
  name: string
  slug: string

  description?: string
  category:
    | string
    | {
        _id: string
        name: string
      }
  tags?: string[]

  images: string[]

  /* ================== PRICING ================== */
  price: number
  finalPrice: number

  serviceDiscount?: ServiceDiscount

  duration: number

  /* ================== COMBO ================== */
  isCombo: boolean
  
  combo?: ServiceCombo
  includedServices: Array<string | Service>
  /* ================== STATS ================== */
  bookingCount: number
  weeklyBookingCount: number
  monthlyBookingCount: number

  favoriteCount: number
  viewCount: number
  conversionRate: number

  /* ================== RATING ================== */
  ratingAverage: number
  ratingCount: number

  /* ================== RANKING ================== */
  popularityScore: number
  isFeatured: boolean
  priority: number



  /* ================== STATUS ================== */
  isActive: boolean
  isDeleted: boolean

  createdAt: string
  updatedAt: string
}
