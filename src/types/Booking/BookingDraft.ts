import type { ObjectId, BookingItemType } from './common'

export interface DraftItem {
  type: BookingItemType
  refId: ObjectId
  name: string
  price: number
  duration: number
}

export interface BookingDraft {
  _id: ObjectId
  customer: ObjectId

  items: DraftItem[]

  staff?: ObjectId | null
  autoAssigned: boolean

  bookingDate?: string
  startTime?: string

  subTotal: number
  totalDuration: number
  totalPrice: number

  createdAt: string
  updatedAt: string
}

export interface CreateBookingDraftPayload {
  items: DraftItem[]
}

export interface UpdateBookingDraftPayload {
  items?: DraftItem[]
  staff?: ObjectId | null
  autoAssigned?: boolean
  bookingDate?: string
  startTime?: string
}
