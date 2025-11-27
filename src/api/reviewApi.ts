// API cho đánh giá dịch vụ và sản phẩm
import axiosInstance from '../utils/axiosInstance';
import type {ReviewDto,CreateReviewDto} from '../types/Review'
const API_URL = import.meta.env.VITE_API_URL;
// tạo đánh giá mới
export const createReview = async (data: CreateReviewDto): Promise<ReviewDto> => {
  const response = await axiosInstance.post(`${API_URL}/review`, data, {
    
  });
  return response.data;
};
// lấy đánh giá theo dịch vụ 
export const getReviewsByServiceId = async (serviceId: number): Promise<ReviewDto[]> => {
  const response = await axiosInstance.get(`${API_URL}/review/service/${serviceId}`);
  return response.data;
};
// lấy đánh giá theo sản phẩm
export const getReviewsByProductId = async (productId: number): Promise<ReviewDto[]> => {
  const response = await axiosInstance.get(`${API_URL}/review/product/${productId}`);
  return response.data;
};
// lấy tất cả đánh giá
export const getAllReviews = async (): Promise<ReviewDto[]> => {
  const response = await axiosInstance.get(`${API_URL}/review`);
  return response.data;
};
