/* ================== SUB TYPES ================== */
export interface ComboIncludedService {
  service: string
    nameSnapshot: string
  unitPriceSnapshot: number
  durationSnapshot: number
}

export interface ComboPricing {
  originalPrice: number
  comboPrice: number
}

export interface ComboActivePeriod {
  startAt?: string
  endAt?: string
}

export interface ComboStats {
  bookingCount: number
  favoriteCount: number
  viewCount: number
}

export interface ComboRating {
  average: number
  count: number
}

/* ================== MAIN ================== */
export interface Combo {
  _id: string
  name: string
  slug: string
  description?: string
  category?: string
  images: string[]
  tags: string[]

  services: ComboIncludedService[]

  pricing: ComboPricing
  duration: number
  activePeriod?: ComboActivePeriod

  stats: ComboStats
  rating: ComboRating

  popularityScore: number
  isFeatured: boolean
  priority: number

  isActive: boolean
  isDeleted: boolean

  createdAt: string
  updatedAt: string
}

/* ================== PAYLOAD ================== */
export interface CreateComboPayload {
  name: string
  slug: string
  description?: string
  images?: File[]

  tags?: string[]

  services: {
    service: string
    quantity: number
  }[]

  pricing: ComboPricing
  duration: number
  activePeriod?: ComboActivePeriod
  isActive?: boolean
}

export type UpdateComboPayload = Partial<CreateComboPayload>
