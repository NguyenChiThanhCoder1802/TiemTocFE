// Lấy thông tin user
import axiosInstance from '../utils/axiosInstance';
import type { ProfileDto } from '../types/ProfileDto';

export const getProfile = async (): Promise<ProfileDto> => {
  const res = await axiosInstance.get('/profile');
  return res.data;
};

export const updateProfile = async (data: ProfileDto): Promise<{ message: string }> => {
  const res = await axiosInstance.put('/profile', data);
  return res.data;
};
