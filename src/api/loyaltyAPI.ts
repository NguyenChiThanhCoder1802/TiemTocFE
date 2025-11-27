//điểm thưởng
import axiosInstance from '../utils/axiosInstance';
// Lấy điểm tích lũy của mỗi user
export const getMyPoints = async (): Promise<number> => {
  const res = await axiosInstance.get('/loyalty/me/points');
  return res.data;
};
