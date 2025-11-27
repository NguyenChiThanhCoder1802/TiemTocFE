import type { Discount, CreateDiscountDto, AppliedDiscount } from '../types/Discount';
import axiosInstance from '../utils/axiosInstance';

// Lấy tất cả mã giảm giá
export const getAllDiscounts = async (): Promise<Discount[]> => {
  const res = await axiosInstance.get('/discount');
  if (!res.data.success) throw new Error(res.data.message || 'Lỗi khi lấy danh sách mã');
  return res.data.data;
};

// Tạo mã giảm giá mới
export const createDiscount = async (data: CreateDiscountDto): Promise<Discount> => {
  const res = await axiosInstance.post('/discount', data);
  if (!res.data.success) throw new Error(res.data.message || 'Không thể tạo mã giảm giá');
  return res.data.data;
};

// Cập nhật mã giảm giá
export const updateDiscount = async (id: number, data: CreateDiscountDto): Promise<void> => {
  const body = { id, ...data }; // API backend yêu cầu id trong body
  const res = await axiosInstance.put('/discount', body);
  if (!res.data.success) throw new Error(res.data.message || 'Không thể cập nhật mã giảm giá');
};

// Xoá mã giảm giá
export const deleteDiscount = async (id: number): Promise<string> => {
  const res = await axiosInstance.delete(`/discount/${id}`);
  if (!res.data.success) throw new Error(res.data.message || 'Không thể xoá mã giảm giá');
  return res.data.message;
};

// Áp dụng mã giảm giá (không cần token nếu public)
export const applyDiscountCode = async (code: string): Promise<AppliedDiscount> => {
  const res = await axiosInstance.post(`/discount/apply/${code}`);
  if (!res.data.success) throw new Error(res.data.message || 'Không thể áp dụng mã giảm giá');
  return res.data.data;
};
