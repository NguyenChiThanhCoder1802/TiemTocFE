import axiosInstance from '../utils/axiosInstance'
import type { ApiResponse } from '../types/ApiResponse'
import type { Booking } from '../types/Booking/Booking'

import type { PaginatedApiResponse } from '../types/PaginatedResponse'
const BASE_URL = '/bookings'
export const checkAllStaffAvailability = async (
  startTime: string,
  duration: number
): Promise<Record<string, boolean>> => {
  const res = await axiosInstance.get(
    '/bookings/check-availability',
    {
      params: { startTime, duration }
    }
  )

  return res.data.availability
}
export const previewBooking = async (payload: {
  bookingType: 'service' | 'combo'
  services?: { service: string }[]
  combo?: string
  discountCode?: string | null
}): Promise<{
  price: {
    original: number
    afterServiceDiscount: number
    discountAmount: number
    final: number
  }
}> => {
  const res = await axiosInstance.post(
    `${BASE_URL}/preview`,
    payload
  )

  return res.data
}
export const createBooking = async (payload: {
  staff: string
  bookingType: 'service' | 'combo'
  services?: { service: string }[]
  combo?: string
  startTime: string
  paymentMethod: 'cash' | 'vnpay' | 'momo'
  note?: string
  discountCode?: string | null
}): Promise<Booking> => {
  const res = await axiosInstance.post<ApiResponse<Booking>>(
    `${BASE_URL}`,
    payload
  )

  return res.data.data
}
export const fetchBookingById = async (id: string) => {
  const res = await axiosInstance.get(`/bookings/${id}`)
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
export const getMyLatestBooking = async (): Promise<Booking | null> => {
  const res = await axiosInstance.get<
    PaginatedApiResponse<Booking>
  >(`${BASE_URL}/my`, {
    params: {
      page: 1,
      limit: 1
    }
  })

  return res.data.data[0] || null
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
