// src/api/loyaltyAPI.ts
import axiosInstance from '../utils/axiosInstance';

export const getMyPoints = async (): Promise<number> => {
  const res = await axiosInstance.get('/loyalty/me/points');
  return res.data;
};
