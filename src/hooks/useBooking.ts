import { useContext } from 'react'
import { BookingContext } from '../../src/contexts/booking/BookingContext'
import type { BookingEstimateContext } from '../types/Booking/BookingEstimateContext'

export const useBooking = (): BookingEstimateContext => {
  const ctx = useContext(BookingContext)
  if (!ctx) {
    throw new Error('useBooking must be used inside BookingProvider')
  }
  return ctx
}
