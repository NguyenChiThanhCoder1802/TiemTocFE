import { useEffect, useState } from 'react'

const STORAGE_KEY = 'booking_draft'

export interface BookingDraft {
  serviceId?: string
  startTime?: string
  staffId?: string | null
  paymentMethod?: 'cash' | 'vnpay' | 'momo'
  step?: number
}

export function useBookingDraft(initial?: BookingDraft) {
  const [draft, setDraft] = useState<BookingDraft>(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : initial ?? {}
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
  }, [draft])

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY)
    setDraft({})
  }

  return { draft, setDraft, clearDraft }
}
