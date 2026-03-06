import { useEffect, useState } from 'react'
import { getMyLatestBooking } from '../api/BookingAPI'
import type { Booking } from '../types/Booking/Booking'

export function useMyLatestBooking(enabled = true) {
  const [booking, setBooking] =
    useState<Booking | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!enabled) return

    setLoading(true)
    getMyLatestBooking()
      .then(setBooking)
      .finally(() => setLoading(false))
  }, [enabled])

  return { booking, loading }
}
