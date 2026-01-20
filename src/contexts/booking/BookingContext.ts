import { createContext } from 'react'
import type { BookingEstimateContext } from '../../types/Booking/BookingEstimateContext'

export const BookingContext =
  createContext<BookingEstimateContext | null>(null)
