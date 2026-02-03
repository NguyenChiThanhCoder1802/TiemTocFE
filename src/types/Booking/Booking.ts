// types/Booking/Booking.ts
import type {User} from '../Auth/User'
import type {Staff} from '../Staff/Staff'
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
  quantity?: number
}

export interface BookingPrice {
  original: number
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
  startTime: string
  endTime: string
  duration: number
  price: BookingPrice
  payment?: string
  paymentStatus: BookingPaymentStatus
  status: BookingStatus
  note?: string
  createdAt: string
}
