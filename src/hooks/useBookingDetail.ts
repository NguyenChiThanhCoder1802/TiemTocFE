import { useEffect, useState } from 'react'
import { getBookingDetail } from '../api/BookingAPI'
import type { Booking } from '../types/Booking/Booking'

export function useBookingDetail(bookingId?: string | null) {
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!bookingId) return

    setLoading(true)
    getBookingDetail(bookingId)
      .then(setBooking)
      .finally(() => setLoading(false))
  }, [bookingId])

  return { booking, loading }
}
