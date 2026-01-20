/* =========================
   BASIC ENUMS
========================= */

export type BookingType = 'normal' | 'urgent'

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show'

/* =========================
   SERVICE
========================= */

export interface BookingServiceItem {
  service: string
  name: string
  images: string[]
  price: number
  finalPrice: number
  duration: number
}

export interface BookingServiceInput {
  serviceId: string
}

/* =========================
   DISCOUNT
========================= */

export interface BookingDiscountInfo {
  discountPercent: number
  discountAmount: number
  totalDiscount: number
  discountCode?: string | null
}

/* =========================
   BOOKING ENTITY
========================= */

export interface Booking {
  _id: string

  customer: string

  staff?: {
    _id: string
    name?: string
  } | null

  autoAssigned: boolean

  services: BookingServiceItem[]

  bookingDate: string
  startTime: string
  endTime: string

  bookingType: BookingType

  discountCard?: string | null
  discountCode?: string | null
  discountPercent: number
  discountAmount: number

  subTotal: number
  totalDiscount: number
  totalPrice: number
  urgentFee: number

  note?: string | null

  bookingStatus: BookingStatus

  createdAt: string
  updatedAt: string
}

/* =========================
   ESTIMATE RESPONSE (BE)
========================= */

export interface BookingEstimateResponse {
  services: BookingServiceItem[]

  totalDuration: number

  pricing: {
    subTotal: number
    urgentFee: number
    discount: BookingDiscountInfo
    totalPrice: number
  }

  time: {
    startTime: string | null
    endTime: string | null
  }
}

/* =========================
   DRAFT (FE STATE)
========================= */

export interface BookingDraft {
  services: BookingServiceInput[]

  bookingType: BookingType

  bookingDate?: string
  startTime?: string

  staffId?: string | null

  discountCardId?: string | null

  note?: string
}

/* =========================
   API PAYLOAD
========================= */

export type CreateBookingPayload = BookingDraft
