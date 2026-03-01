// api/PaymentAPI.ts
import axiosInstance from '../utils/axiosInstance'
import type { ApiResponse } from '../types/ApiResponse'
import type { Payment } from '../types/Payment/Payment'
import type { CreatePaymentResponse } from '../types/Payment/CreatePaymentResponse'
import type { PaymentRevenue } from '../types/Payment/PaymentRevenue'

const BASE_URL = '/payments'

/* =====================================================
 * USER – TẠO THANH TOÁN BOOKING (VNPAY)
 * POST /payments/booking/vnpay
 * ===================================================== */
export const createBookingPayment = async (
  bookingId: string
): Promise<CreatePaymentResponse> => {
  const res = await axiosInstance.post<
    ApiResponse<CreatePaymentResponse>
  >('/payments/vnpay', {
    bookingId
  })

  return res.data.data
}
export const getMyPayments = async (): Promise<Payment[]> => {
  const res = await axiosInstance.get<ApiResponse<Payment[]>>(
    `${BASE_URL}/my`
  )

  return res.data.data
}
export const getBookingRevenue = async (
  params?: { from?: string; to?: string }
): Promise<PaymentRevenue> => {
  const res = await axiosInstance.get<ApiResponse<PaymentRevenue>>(
    `${BASE_URL}/admin/revenue`,
    { params }
  )

  return res.data.data
}