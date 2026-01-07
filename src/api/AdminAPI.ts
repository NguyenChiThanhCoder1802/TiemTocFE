import axiosInstance from "../utils/axiosInstance"
import type { ApiResponse } from "../types/ApiResponse"
import type { AdminDashboardStat } from "../types/Admin/stat"

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