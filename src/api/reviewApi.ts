import axiosInstance from '../utils/axiosInstance'
import type { Review } from '../types/Review/Review'
import type { ApiResponse } from '../types/ApiResponse'

const BASE_URL = '/reviews'

/* ======================
   GET REVIEWS BY SERVICE
====================== */
export const fetchReviewsByService = async (
  serviceId: string
): Promise<Review[]> => {
  const res = await axiosInstance.get<ApiResponse<Review[]>>(
    `${BASE_URL}/service/${serviceId}`
  )
  return res.data.data
}
export const fetchReviewsByStaff = async (
  staffId: string
): Promise<Review[]> => {
  const res = await axiosInstance.get<ApiResponse<Review[]>>(
    `${BASE_URL}/staff/${staffId}`
  )
  return res.data.data
}
export const fetchMyReviews = async () => {
  const res = await axiosInstance.get('/reviews/me')
  return res.data.data
}
export const fetchReviewsByBooking = async (
  bookingId: string
): Promise<Review[]> => {
  const res = await axiosInstance.get<ApiResponse<Review[]>>(
    `${BASE_URL}/booking/${bookingId}`
  )
  return res.data.data
}
/* ======================
   CREATE REVIEW
====================== */
export const createReview = async (
  formData: FormData
): Promise<Review> => {
  const res = await axiosInstance.post<ApiResponse<Review>>(
    BASE_URL,
    formData,
    // Let the browser set the Content-Type (including boundary) for FormData
  )
  return res.data.data
}

/* ======================
   UPDATE REVIEW
====================== */
export const updateReview = async (
  id: string,
  formData: FormData
): Promise<Review> => {
  const res = await axiosInstance.put<ApiResponse<Review>>(
    `${BASE_URL}/${id}`,
    formData,
    // Let the browser set the Content-Type (including boundary) for FormData
  )
  return res.data.data
}

/* ======================
   DELETE REVIEW
====================== */
export const deleteReview = async (id: string): Promise<void> => {
  await axiosInstance.delete(`${BASE_URL}/${id}`)
}
