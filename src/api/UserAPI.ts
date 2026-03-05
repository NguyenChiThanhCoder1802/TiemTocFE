import axiosInstance from '../utils/axiosInstance'
import type { ApiResponse } from '../types/ApiResponse'
import type { Service } from '../types/HairService/Service'
import type { User } from '../types/Auth/User'
export interface UploadAvatarResponse {
  avatar: string
}
export interface ToggleFavoriteResponse {
  isFavorited: boolean
  favoriteCount: number
}
export interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
}

export type UpdateProfilePayload = {
  name?: string
  email?: string
  phone?: string
}
export const updateProfile = async (
  payload: UpdateProfilePayload
): Promise<User> => {
  const res = await axiosInstance.put<
    ApiResponse<User>
  >('/users/me', payload)

  return res.data.data
}
export const changePassword = async (
  payload: ChangePasswordPayload
): Promise<string> => {
  const res = await axiosInstance.put<
    ApiResponse<null>
  >('/users/me/change-password', payload)

  return res.data.message ??''
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