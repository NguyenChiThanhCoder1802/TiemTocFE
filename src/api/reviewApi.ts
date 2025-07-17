// src/api/reviewApi.ts
// import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
const API_URL = import.meta.env.VITE_API_URL;

export interface CreateReviewDto {
  content?: string;
  rating: number;
  serviceId?: number;
  productId?: number;
}

export interface ReviewDto {
  id: number;
  customerId: string;
  customerName: string;
  content?: string;
  rating: number;
  serviceId?: number;
  productId?: number;
  createdAt: string;
}

export const createReview = async (data: CreateReviewDto): Promise<ReviewDto> => {
  const response = await axiosInstance.post(`${API_URL}/review`, data, {
    
  });
  return response.data;
};

export const getReviewsByServiceId = async (serviceId: number): Promise<ReviewDto[]> => {
  const response = await axiosInstance.get(`${API_URL}/review/service/${serviceId}`);
  return response.data;
};

export const getReviewsByProductId = async (productId: number): Promise<ReviewDto[]> => {
  const response = await axiosInstance.get(`${API_URL}/review/product/${productId}`);
  return response.data;
};

export const getAllReviews = async (): Promise<ReviewDto[]> => {
  const response = await axiosInstance.get(`${API_URL}/review`);
  return response.data;
};
