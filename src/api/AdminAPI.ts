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