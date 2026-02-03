import axiosInstance from '../utils/axiosInstance'
import type { ApiResponse } from '../types/ApiResponse'
import type { Service } from '../types/HairService/Service'
export interface UploadAvatarResponse {
  avatar: string
}
export interface ToggleFavoriteResponse {
  isFavorited: boolean
  favoriteCount: number
}
/* ======================
   UPLOAD AVATAR
====================== */
export const uploadAvatar = async (
  formData: FormData
): Promise<string> => {
  const res = await axiosInstance.put<
    ApiResponse<UploadAvatarResponse>
  >(
    '/users/me/avatar',
    formData
    // KHÔNG set Content-Type, axios tự set boundary
  )

  return res.data.data.avatar
}
export const toggleFavoriteService = async (
  serviceId: string
): Promise<ToggleFavoriteResponse> => {
  const res = await axiosInstance.post<
    ApiResponse<ToggleFavoriteResponse>
  >(`/users/me/favorites/${serviceId}`)

  return res.data.data
}
export const getMyFavoriteServices = async (): Promise<Service[]> => {
  const res = await axiosInstance.get<
    ApiResponse<Service[]>
  >('/users/me/favorites')

  return res.data.data
}