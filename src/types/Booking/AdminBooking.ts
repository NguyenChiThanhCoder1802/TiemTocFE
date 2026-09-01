import type {
  BookingStatus,
  BookingPaymentStatus,
  BookingType,
  BookingDiscountSnapshot,
  BookingComboSnapshot,
  BookingPrice,
  BookingPayment,
} from "./Booking"

export interface AdminBookingCustomer {
  _id: string
  name: string
  email: string
  avatar?: string
  phone?: string
}

export interface AdminBookingStaff {
  _id: string
  name: string
  phone?: string
  email?: string
}

export interface AdminBookingService {
  service?: string

  nameSnapshot: string
  slugSnapshot?: string

  originalPriceSnapshot: number
  serviceDiscountPercent: number
  priceAfterServiceDiscount: number

  durationSnapshot: number

  imageSnapshot?: string[]
}

export interface AdminBooking {
  _id: string

  /* ================== CUSTOMER ================== */

  customer?: AdminBookingCustomer

  /* ================== STAFF ================== */

  staff?: AdminBookingStaff | null

  /* ================== BOOKING ================== */

  bookingType: BookingType

  services: AdminBookingService[]

  combo?: {
    _id: string
    name: string
  } | null

  comboSnapshot?: BookingComboSnapshot | null

  /* ================== TIME ================== */

  startTime: string
  endTime: string
  duration: number

  /* ================== PRICE ================== */

  price: BookingPrice

  /* ================== DISCOUNT ================== */

  discount?: BookingDiscountSnapshot | null

  discountCard?: unknown | null

  /* ================== PAYMENT ================== */

  payment?: BookingPayment | null

  paymentMethod?: string

  paymentStatus: BookingPaymentStatus

  /* ================== STATUS ================== */

  status: BookingStatus

  /* ================== CANCEL ================== */

  cancelReason?: string | null
  cancelledAt?: string | null
  cancelledBy?: string | null

  /* ================== OTHER ================== */

  note?: string

  autoAssigned?: boolean

  createdAt: string
  updatedAt?: string
}