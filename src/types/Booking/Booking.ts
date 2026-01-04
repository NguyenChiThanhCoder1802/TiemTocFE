export type PaymentMethod = 'cash' | 'card' | 'vnpay' | 'momo'
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'canceled'

export interface BookingServiceItem {
  service: string
  name: string
  price: number
  duration: number
  isCombo: boolean
  includedServices: string[]
}

export interface CreateBookingPayload {
  bookingDate: string
  staff?: string
  services: { service: string }[]
  discountCard?: string
  paymentMethod?: PaymentMethod
  amountPaid?: number
  notes?: string
}

export interface Booking {
  _id: string
  user: string
  staff?: string
  bookingDate: string
  status: BookingStatus
  services: BookingServiceItem[]
  discountCard?: string
  discountAmount: number
  totalPrice: number
  finalPrice: number
  paymentMethod?: PaymentMethod
  amountPaid: number
  isPaid: boolean
  notes?: string
  createdAt: string
  updatedAt: string
}
