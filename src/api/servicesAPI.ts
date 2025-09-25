// src/api/servicesAPI.ts
import type { Service } from '../types/Service';
import axiosInstance from '../utils/axiosInstance';
import type { ServicePopularityDto} from '../types/Service'
const BASE_URL = '/Service';

export async function fetchServices(): Promise<Service[]> {
  try {
    const res = await axiosInstance.get<Service[]>(BASE_URL);
    return res.data;
  } catch (error) {
    console.error('❌ Error fetching services:', error);
    throw error;
  }
}
export async function GetTopPopularServicesAsync(topN: number = 5): Promise<ServicePopularityDto[]> {
  try{
      const res = await axiosInstance.get<ServicePopularityDto[]>(`${BASE_URL}/top-popular`,{ params: { topN },});
      return res.data
  }
  catch (error) {
    console.error('❌ Error fetching services:', error);
    throw error;
  }
  
}

export async function createService(formData: FormData): Promise<Service> {
  try {
    for (const [key, value] of formData.entries()) {
      console.log(`FormData => ${key}:`, value);
    }
    const res = await axiosInstance.post<Service>(`${BASE_URL}/Service-Post`, formData);
    return res.data;
  } catch (error: any) {
    console.error('❌ Lỗi khi tạo dịch vụ:', error.response?.data || error.message);
    throw error;
  }
}

export async function updateService(id: number, formData: FormData): Promise<void> {
  try {
    await axiosInstance.put(`${BASE_URL}/${id}`, formData);
  } catch (error: any) {
    console.error('❌ Lỗi khi cập nhật dịch vụ:', error.response?.data || error.message);
    throw error;
  }
}

export async function fetchServicesByCategory(categoryId: number): Promise<Service[]> {
  try {
    const res = await axiosInstance.get<Service[]>(`${BASE_URL}/filter`, {
      params: { categoryId },
    });
    return res.data;
  } catch (error) {
    console.error('❌ Lỗi khi lọc dịch vụ:', error);
    throw error;
  }
}

export async function deleteService(id: number): Promise<void> {
  try {
    await axiosInstance.delete(`${BASE_URL}/${id}`);
  } catch (error: any) {
    console.error('❌ Lỗi khi xoá dịch vụ:', error.response?.data || error.message);
    throw error;
  }
}

export async function fetchServiceById(id: number): Promise<Service> {
  try {
    const res = await axiosInstance.get<Service>(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error: any) {
    console.error('❌ Lỗi khi lấy dịch vụ theo ID:', error.response?.data || error.message);
    throw error;
  }
}
