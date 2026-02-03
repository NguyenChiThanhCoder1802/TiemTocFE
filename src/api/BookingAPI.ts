import axiosInstance from '../utils/axiosInstance'
import type { ApiResponse } from '../types/ApiResponse'
import type { Booking } from '../types/Booking/Booking'
import type { CreateBookingPayload } from '../types/Booking/CreateBookingPayload'
import type { PaginatedApiResponse } from '../types/PaginatedResponse'
const BASE_URL = '/bookings'

export const createBooking = async (
  payload: CreateBookingPayload
): Promise<Booking > => {
  const res = await axiosInstance.post<ApiResponse<Booking>>(
    BASE_URL,
    payload
  )
  return res.data.data  
}

export const getMyBookings = async (params?: {
  status?: string
  page?: number
  limit?: number
}): Promise<PaginatedApiResponse<Booking>> => {
  const res = await axiosInstance.get<PaginatedApiResponse<Booking>>(
    `${BASE_URL}/my`,
    { params }
  )

  return res.data
}


export const getBookingDetail = async (
  bookingId: string
): Promise<Booking> => {
  const res = await axiosInstance.get<ApiResponse<Booking>>(
    `${BASE_URL}/${bookingId}`
  )
  return res.data.data
}
export const cancelBooking = async (
  bookingId: string
): Promise<Booking> => {
  const res = await axiosInstance.patch<ApiResponse<Booking>>(
    `${BASE_URL}/${bookingId}/cancel`
  )
  return res.data.data
}
