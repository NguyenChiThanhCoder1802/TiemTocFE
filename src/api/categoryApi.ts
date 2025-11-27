import axiosInstance from '../utils/axiosInstance';
import type { Category } from '../types/Category';

const BASE_URL = '/Category';

//Lấy danh sách danh mục
export const fetchCategories = async (): Promise<Category[]> => {
  const res = await axiosInstance.get(BASE_URL);
  return res.data;
};

//Thêm danh mục mới
export const addCategory = async (category: { name: string; type: string }): Promise<Category> => {
  const res = await axiosInstance.post(BASE_URL, category);
  return res.data;
};

//Cập nhật danh mục
export const updateCategory = async (
  id: number,
  category: { name: string; type: string }
): Promise<Category> => {
  const res = await axiosInstance.put(`${BASE_URL}/${id}`, category);
  return res.data;
};

//Xóa danh mục
export const deleteCategory = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${BASE_URL}/${id}`);
};
