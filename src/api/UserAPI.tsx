import axiosInstance from '../utils/axiosInstance'
import type { ApiResponse } from '../types/ApiResponse'

export interface UploadAvatarResponse {
  avatar: string
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
