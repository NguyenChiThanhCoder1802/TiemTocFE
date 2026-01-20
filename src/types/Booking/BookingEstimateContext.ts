import type {
  BookingDraft,
  BookingEstimateResponse
} from './Booking'

export interface BookingEstimateContext {
  draft: BookingDraft
  estimate: BookingEstimateResponse | null
  loading: boolean

  addService: (serviceId: string) => void
  removeService: (serviceId: string) => void
  setTime: (date: string, time: string) => void

  runEstimate: () => Promise<void>
  confirm: () => Promise<void>
  reset: () => void
}
