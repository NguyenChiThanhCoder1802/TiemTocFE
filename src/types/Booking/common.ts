export type ObjectId = string

export type BookingItemType = 'service' | 'combo'

export type BookingStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
