// sửa ko cần token
import type { Product } from '../types/Product';
import axiosInstance from '../utils/axiosInstance';
const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axiosInstance.get('/product');
  return res.data;
};

export const addProduct = async (product: Omit<Product, 'id' | 'imageUrl'>): Promise<Product> => {
  const formData = new FormData();
  formData.append('Name', product.name);
  formData.append('Price', product.price.toString());
  formData.append('Description', product.description);
  formData.append('CategoryId', product.categoryId.toString());
  if (product.imageFile) formData.append('Image', product.imageFile);

   const res = await axiosInstance.post('/product', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const updateProduct = async (product: Product): Promise<Product> => {
  const formData = new FormData();
  formData.append('Name', product.name);
  formData.append('Price', product.price.toString());
  formData.append('Description', product.description);
  formData.append('ImageUrl', product.imageUrl || '');
   formData.append('CategoryId', product.categoryId.toString());
  if (product.imageFile) formData.append('Image', product.imageFile);
  const res = await axiosInstance.put(`/product/${product.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/product/${id}`);
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const res = await axiosInstance.get(`/product/${id}`);
  return res.data;
};

export async function fetchProductsByCategory(categoryId: number): Promise<Product[]> {
  const res = await fetch(`${API_URL}/filter?categoryId=${categoryId}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Không thể tải dịch vụ');
  return res.json();
}

