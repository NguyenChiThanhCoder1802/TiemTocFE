import axiosInstance from "../utils/axiosInstance"
import type { Staff } from '../types/Staff/Staff'
// import type { StaffReview } from '../types/Staff/StaffReview'

/**
 * GET /staffs
 * Public: danh sách nhân viên (đã duyệt)
 */
export const fetchPublicStaffs = async (): Promise<Staff[]> => {
  const res = await axiosInstance.get('/staffs')
  return res.data.data
}

/**
 * GET /staffs/:id
 * Public: chi tiết nhân viên
 */
export const fetchStaffById = async (id: string): Promise<Staff> => {
  const res = await axiosInstance.get(`/staffs/${id}`)
  return res.data.data
}

/**
 * GET /staffs/:id/reviews
 * Public: đánh giá nhân viên
 */
// export const fetchStaffReviews = async (
//   id: string
// ): Promise<StaffReview[]> => {
//   const res = await axiosInstance.get(`/staffs/${id}/reviews`)
//   return res.data.data
// }
