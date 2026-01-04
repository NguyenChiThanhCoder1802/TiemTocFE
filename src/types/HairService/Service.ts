export interface ServiceDiscount {
  percent: number
  startAt?: string
  endAt?: string
  isActive: boolean
}

export interface Service {
  _id: string
  name: string
  slug: string

  description?: string
  category?: string
  tags?: string[]

  images: string[]

  /* ================== PRICING ================== */
  price: number
  finalPrice: number

  serviceDiscount?: ServiceDiscount

  duration: number

  /* ================== COMBO ================== */
  isCombo: boolean
  includedServices: string[]

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

  /* ================== SEO ================== */
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }

  /* ================== STATUS ================== */
  isActive: boolean
  isDeleted: boolean

  createdAt: string
  updatedAt: string
}
