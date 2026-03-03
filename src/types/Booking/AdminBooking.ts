// types/Booking/AdminBooking.ts

import type {
  BookingStatus,
  BookingPaymentStatus,
  BookingType
} from "./Booking"

export interface AdminBooking {
  _id: string

  startTime: string
  endTime: string
  duration: number

  bookingType: BookingType
  status: BookingStatus
  paymentStatus: BookingPaymentStatus

  createdAt: string

  customer?: {
    _id: string
    name: string
    email: string
  }

  staff?: {
    _id: string
    position?: string
    user: {
    _id: string
    name: string
    email?: string
  }
  }

  autoAssigned?: boolean

  services: {
    service: string
    nameSnapshot: string
    originalPriceSnapshot?: number
    serviceDiscountPercent?: number
    priceAfterServiceDiscount?: number
    durationSnapshot?: number
  }[]

  price?: {
    original: number
    afterServiceDiscount: number
    discountAmount: number
    final: number
  }
}