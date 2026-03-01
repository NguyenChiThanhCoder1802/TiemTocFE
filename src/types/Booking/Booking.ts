// types/Booking/Booking.ts
import type {User} from '../Auth/User'
import type {Staff} from '../Staff/Staff'
import type { Payment } from '../Payment/Payment'
export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
export type BookingPaymentStatus =
  | 'unpaid'
  | 'paid'
  | 'failed'

export type BookingType = 'service' | 'combo'

export interface BookingServiceItem {
  service: string
 nameSnapshot?: string
  originalPriceSnapshot?: number
  serviceDiscountPercent?: number
  priceAfterServiceDiscount?: number
  durationSnapshot?: number
  imageSnapshot?: string[]
}
export interface BookingComboSnapshot {
  name: string
  originalPrice: number
  comboPrice: number
  imageSnapshot?: string[]
}
export interface BookingDiscountSnapshot {
  code: string
  discountType: 'percent' | 'fixed'
  discountValue: number
  maxDiscountAmount?: number
  discountAmount: number
}
export interface BookingPrice {
  original: number
  afterServiceDiscount: number
  discountAmount: number
  final: number
}

export interface BookingStaffLite {
  _id: string
  user: {
    _id: string
    name?: string
    email?: string
  }
  position: string
}

export interface Booking {
  _id: string
  customer: User | string
  staff: Staff | string
  bookingType: BookingType
  services: BookingServiceItem[]
  combo?: {
    _id: string
    name: string
  }
   comboSnapshot?: BookingComboSnapshot
  startTime: string
  endTime: string
  duration: number
  price: BookingPrice
  payment?: Payment | null
  status: BookingStatus
   discount?: BookingDiscountSnapshot | null   // 👈 thêm dòng này
  paymentStatus: BookingPaymentStatus
  paymentMethod?: string
  note?: string
  createdAt: string
}
