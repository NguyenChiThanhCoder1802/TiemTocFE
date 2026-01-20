import axiosInstance from '../utils/axiosInstance'
import type { ApiResponse } from '../types/ApiResponse'
import type {
  Booking,
  BookingEstimateResponse,
  CreateBookingPayload
} from '../types/Booking/Booking'

const BASE_URL = '/bookings'

/* ======================
   GET MY BOOKINGS
====================== */
export const fetchMyBookings = async (): Promise<Booking[]> => {
  const res = await axiosInstance.get<ApiResponse<Booking[]>>(
    `${BASE_URL}/my-bookings`
  )
  return res.data.data
}

/* ======================
   GET BOOKING DETAIL
====================== */
export const fetchBookingDetail = async (
  bookingId: string
): Promise<Booking> => {
  const res = await axiosInstance.get<ApiResponse<Booking>>(
    `${BASE_URL}/${bookingId}`
  )
  return res.data.data
}

/* ======================
   ESTIMATE BOOKING
====================== */
export const estimateBooking = async (
  payload: CreateBookingPayload
): Promise<BookingEstimateResponse> => {
  const res = await axiosInstance.post<ApiResponse<BookingEstimateResponse>>(
    `${BASE_URL}/estimate`,
    payload
  )
  return res.data.data
}

/* ======================
   CONFIRM BOOKING (CREATE)
====================== */
export const confirmBooking = async (
  payload: CreateBookingPayload
): Promise<Booking> => {
  const res = await axiosInstance.post<ApiResponse<Booking>>(
    `${BASE_URL}/confirm`,
    payload
  )
  return res.data.data
}
