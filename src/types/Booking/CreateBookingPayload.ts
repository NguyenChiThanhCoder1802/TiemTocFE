export interface CreateBookingPayload {
  bookingType: 'service' | 'combo'
  services?: {
    service: string
    quantity?: number
  }[]
  bookingId?: string
  combo?: string
  staff?: string
  startTime: string
  note?: string
}
