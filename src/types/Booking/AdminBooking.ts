import type { Booking } from './Booking'
import type { User } from '../Auth/User'

export interface AdminBooking extends Booking {
  customer: Pick<User, '_id' | 'name'>

  staff?: {
    _id: string
    name?: string
  }
}
