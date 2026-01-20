import { useRef, useState } from 'react'
import { BookingContext } from './BookingContext'
import type {
  BookingDraft,
  BookingEstimateResponse
} from '../../types/Booking/Booking'
import { estimateBooking, confirmBooking } from '../../api/BookingAPI'

const initialDraft: BookingDraft = {
  services: [],
  bookingType: 'normal',
  staffId: null,
  discountCardId: null
}

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [draft, setDraft] = useState<BookingDraft>(initialDraft)
  const [estimate, setEstimate] =
    useState<BookingEstimateResponse | null>(null)
  const [loading, setLoading] = useState(false)

  // ✅ chống gọi estimate lặp
  const estimatingRef = useRef(false)

  const addService = (serviceId: string) => {
    setDraft(d => {
      if (d.services.some(s => s.serviceId === serviceId)) return d
      return { ...d, services: [...d.services, { serviceId }] }
    })
    setEstimate(null)
  }

  const removeService = (serviceId: string) => {
    setDraft(d => ({
      ...d,
      services: d.services.filter(s => s.serviceId !== serviceId)
    }))
    setEstimate(null)
  }

  const setTime = (date: string, datetimeLocal: string) => {
    // datetimeLocal: 2026-01-18T13:16
    const startTime = new Date(datetimeLocal).toISOString()

    setDraft(d => ({
      ...d,
      bookingDate: date,
      startTime
    }))
    setEstimate(null)
  }

  const runEstimate = async () => {
    // ❌ thiếu dữ liệu → không gọi
    if (
      estimatingRef.current ||
      loading ||
      !draft.services.length ||
      !draft.startTime ||
      !draft.bookingDate
    ) return

    estimatingRef.current = true

    try {
      setLoading(true)

      const payload = {
        services: draft.services,
        staffId: draft.staffId ?? null,
        bookingDate: draft.bookingDate,
        startTime: draft.startTime,
        bookingType: draft.bookingType,
        discountCardId: draft.discountCardId ?? null,
        note: draft.note ?? null
      }

      console.log('📤 Estimate Payload:', payload)

      const res = await estimateBooking(payload)
      setEstimate(res)
    } catch (error) {
      console.error('❌ Estimate Error:', error)
    } finally {
      estimatingRef.current = false
      setLoading(false)
    }
  }

  const confirm = async () => {
    if (!estimate) throw new Error('Estimate missing')

    await confirmBooking({
      services: draft.services,
      staffId: draft.staffId ?? null,
      bookingDate: draft.bookingDate!,
      startTime: draft.startTime!,
      bookingType: draft.bookingType,
      discountCardId: draft.discountCardId ?? null,
      note: draft.note ?? null
    })
  }

  const reset = () => {
    setDraft(initialDraft)
    setEstimate(null)
  }

  return (
    <BookingContext.Provider
      value={{
        draft,
        estimate,
        loading,
        addService,
        removeService,
        setTime,
        runEstimate,
        confirm,
        reset
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}
