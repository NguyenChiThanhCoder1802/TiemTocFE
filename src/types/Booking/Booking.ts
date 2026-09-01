import type { User } from "../Auth/User"
import type { Staff } from "../Staff/Staff"
import type { Payment } from "../Payment/Payment"

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "no_show"
  | "cancelled"

export type BookingPaymentStatus =
  | "unpaid"
  | "paid"
  | "failed"

export type BookingType = "service" | "combo"

/* ================== SERVICE ================== */

export interface BookingServiceItem {
  service?: string

  nameSnapshot?: string
  slugSnapshot?: string

  originalPriceSnapshot?: number
  serviceDiscountPercent?: number
  priceAfterServiceDiscount?: number

  durationSnapshot?: number

  imageSnapshot?: string[]
}

/* ================== COMBO ================== */

export interface BookingComboSnapshot {
  name: string
  originalPrice: number
  comboPrice: number
  imageSnapshot?: string[]
}

/* ================== DISCOUNT ================== */

export type DiscountType = "percent" | "fixed"

export interface BookingDiscountSnapshot {
  code: string
  discountType: DiscountType
  discountValue: number
  maxDiscountAmount?: number
  discountAmount: number
}

/* ================== PRICE ================== */

export interface BookingPrice {
  original: number
  afterServiceDiscount: number
  discountAmount: number
  final: number
}

/* ================== CUSTOMER ================== */

export interface BookingCustomerLite {
  _id: string
  name: string
  email: string
  avatar?: string
  phone?: string
}

/* ================== STAFF ================== */

export interface BookingStaffLite {
  _id: string
  name: string
  phone?: string
  email?: string
}

/* ================== PAYMENT ================== */

export interface BookingPayment {
  _id?: string
  method: string
  amount: number
  status: "pending" | "success" | "failed" | string
}

/* ================== BOOKING ================== */

export interface Booking {
  _id: string

  customer: User | string | BookingCustomerLite

  staff: Staff | string | BookingStaffLite | null

  bookingType: BookingType

  services: BookingServiceItem[]

  combo:
    | {
        _id: string
        name: string
      }
    | null

  comboSnapshot: BookingComboSnapshot | null

  startTime: string
  endTime: string
  duration: number

  price: BookingPrice

  discount: BookingDiscountSnapshot | null

  discountCard: unknown | null

  payment: Payment | BookingPayment | null

  paymentMethod?: string

  paymentStatus: BookingPaymentStatus

  status: BookingStatus

  cancelReason?: string | null
  cancelledAt?: string | null
  cancelledBy?: string | null

  note?: string

  autoAssigned?: boolean

  createdAt: string
  updatedAt?: string
}