import axiosInstance from "../utils/axiosInstance"
import type { ApiResponse } from "../types/ApiResponse"
import type { AdminDashboardStat } from "../types/Admin/stat"
// import type { Booking } from "../types/Booking/Booking"
import type { AdminBooking } from "../types/Booking/AdminBooking"
/* ================= ADMIN API ================= */

export const getAdminDashboardStat = async () => {
  const res = await axiosInstance.get<ApiResponse<AdminDashboardStat>>(
    "/admin/dashboard"
  )

  return res.data.data
}
export const getStaffListApi = (onlyOnline = false) => {
  return axiosInstance.get('/admin/staffs', {
    params: { onlyOnline }
  })
}

export const approveStaffApi = (userId: string) => {
  return axiosInstance.post(`/admin/staffs/${userId}/approve`)
}


export const getAllBookingsApi = async (params?: {
  status?: string
  page?: number
  limit?: number
}) => {
  const res = await axiosInstance.get<{
    data: AdminBooking[]
    pagination: any
  }>("/admin/bookings", { params })

  return res.data
}
/** Duyệt booking */
export const approveBookingApi = (bookingId: string) => {
  return axiosInstance.patch(`/admin/bookings/${bookingId}/approve`)
}

/** Huỷ booking */
export const cancelBookingApi = (
  bookingId: string,
  reason?: string
) => {
  return axiosInstance.patch(
    `/admin/bookings/${bookingId}/cancel`,
    { reason }
  )
}

/** Hoàn thành booking */
export const completeBookingApi = (bookingId: string) => {
  return axiosInstance.patch(
    `/admin/bookings/${bookingId}/complete`
  )
}
// tổng doanh thu 
export const getRevenueDashboardApi = async () => {
  const res = await axiosInstance.get<ApiResponse<any>>(
    "/admin/revenue"
  )

  return res.data.data
}
//doanh thu theo tháng 
export const getOnlineRevenueByMonthApi = async (year: number) => {
  const res = await axiosInstance.get<ApiResponse<any>>(
    "/admin/revenue/online-by-month",
    {
      params: { year }
    }
  )

  return res.data.data
}
// thống kê trạng thái thanh toán vnpay từ khách 
export const getOnlinePaymentStatsApi = async () => {
  const res = await axiosInstance.get<ApiResponse<any>>(
    "/admin/revenue/payment-stats"
  )

  return res.data.data
}