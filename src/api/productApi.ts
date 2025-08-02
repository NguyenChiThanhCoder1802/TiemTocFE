// api/productApi.ts
import type { Product } from '../types/Product';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_URL}/product`);
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const addProduct = async (product: Omit<Product, 'id' | 'imageUrl'>, token: string): Promise<Product> => {
  const formData = new FormData();
  formData.append('Name', product.name);
  formData.append('Price', product.price.toString());
  formData.append('Description', product.description);
  formData.append('CategoryId', product.categoryId.toString());
  if (product.imageFile) formData.append('Image', product.imageFile);

  const res = await fetch(`${API_URL}/product`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const updateProduct = async (product: Product, token: string): Promise<Product> => {
  const formData = new FormData();
  formData.append('Name', product.name);
  formData.append('Price', product.price.toString());
  formData.append('Description', product.description);
  formData.append('ImageUrl', product.imageUrl || '');
   formData.append('CategoryId', product.categoryId.toString());
  if (product.imageFile) formData.append('Image', product.imageFile);

  const res = await fetch(`${API_URL}/product/${product.id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const deleteProduct = async (id: number, token: string): Promise<void> => {
  const res = await fetch(`${API_URL}/product/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(await res.text());
};
export const fetchProductById = async (id: number): Promise<Product> => {
  const res = await fetch(`${API_URL}/product/${id}`);
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};
export async function fetchProductsByCategory(categoryId: number): Promise<Product[]> {
  const res = await fetch(`${API_URL}/filter?categoryId=${categoryId}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Không thể tải dịch vụ');
  return res.json();
}

