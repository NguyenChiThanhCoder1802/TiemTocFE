import axios from 'axios';
import type { Category } from '../types/Category';

const BASE_URL = import.meta.env.VITE_API_URL + '/Category';
const API_URL = `${BASE_URL}/Category`;

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};
export const addCategory = async (
  category: { name: string; type: string },
  token: string
): Promise<Category> => {
  const res = await axios.post(API_URL, category, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateCategory = async (
  id: number,
  category: { name: string; type: string },
  token: string
): Promise<Category> => {
  const res = await axios.put(`${API_URL}/${id}`, category, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteCategory = async (
  id: number,
  token: string
): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
