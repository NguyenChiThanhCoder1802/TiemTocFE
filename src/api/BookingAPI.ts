import axiosInstance from '../utils/axiosInstance'
import type { ApiResponse } from '../types/ApiResponse'
import type { Booking, CreateBookingPayload } from '../types/Booking/Booking'

const BASE_URL = '/bookings'

/* ======================
   GET MY BOOKINGS
====================== */
export const fetchMyBookings = async (): Promise<Booking[]> => {
  const res = await axiosInstance.get<ApiResponse<Booking[]>>(
    `${BASE_URL}/me`
  )
  return res.data.data
}

/* ======================
   CREATE BOOKING
====================== */


export const createBooking = async (
  payload: CreateBookingPayload
): Promise<Booking> => {
  const res = await axiosInstance.post<ApiResponse<Booking>>(
    BASE_URL,
    payload
  )
  return res.data.data
}
