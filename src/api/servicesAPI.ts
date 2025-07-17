import type { Service } from '../types/Service';
const BASE_URL = import.meta.env.VITE_API_URL + '/Service';
export async function fetchServices(): Promise<Service[]> {
  try {
    const res = await fetch(BASE_URL)
     
    if (!res.ok) {
      throw new Error(`Không thể lấy danh sách`);
    }
    return await res.json();
  } catch (error) {
    console.error('❌ Error fetching services:', error);
    throw error;
  }
}

export async function createService(formData: FormData,token : string): Promise<Service> {
  try {
    const res = await fetch(`${BASE_URL}/service-post`, {
      method: 'POST',
      body: formData,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.title || `HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('❌ Lỗi khi tạo dịch vụ:', error);
    throw error;
  }
}

export async function updateService(id: number, formData: FormData, token: string): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      body: formData,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.title || `HTTP error! status: ${res.status}`);
    }
  } catch (error) {
    console.error('❌ Lỗi khi cập nhật dịch vụ:', error);
    throw error;
  }
}
export async function fetchServicesByCategory(categoryId: number): Promise<Service[]> {
  const res = await fetch(`${BASE_URL}/filter?categoryId=${categoryId}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Không thể tải dịch vụ');
  return res.json();
}

export async function deleteService(id: number, token: string): Promise<void> {
  try {
    
    const res = await fetch(`${BASE_URL}/${id}`,{
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(await res.text());
  } catch (error) {
    console.error('❌ Lỗi khi xoá dịch vụ:', error);
    throw error;
  }
}
export async function fetchServiceById(id: number): Promise<Service> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
      throw new Error(`Không thể lấy thông tin dịch vụ với ID: ${id}`);
    }
    return await res.json();
  } catch (error) {
    console.error('❌ Lỗi khi lấy dịch vụ theo ID:', error);
    throw error;
  }
}

