export type NotificationType =
  | 'booking_success'
  | 'payment_success'
  | 'booking_completed'
  | 'review_request'
export interface NotificationBookingService {
  nameSnapshot: string
  imageSnapshot?: string[]
}

export interface NotificationBooking {
  _id: string
  services: NotificationBookingService[]
}
export interface Notification {
  _id: string
  user: string

  title: string
  message: string

  type: NotificationType

  booking?: NotificationBooking

  payment?: string

  isRead: boolean

  createdAt: string
  updatedAt: string
}

export interface NotificationPagination {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface NotificationResponse {
  success: boolean
  data: Notification[]
  pagination: NotificationPagination
}