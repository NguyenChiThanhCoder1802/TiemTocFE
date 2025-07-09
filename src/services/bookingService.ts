import axiosInstance from '../utils/axiosInstance';
import { jwtDecode } from 'jwt-decode';

const API_BASE = '/booking'; // đã cấu hình baseURL trong axiosInstance

interface JwtPayload {
  exp: number;
  role: string | string[];
}

function isAdmin(): boolean {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Chưa đăng nhập');

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      throw new Error('Phiên đăng nhập đã hết hạn');
    }

    const role = decoded.role;
    return Array.isArray(role) ? role.includes('Admin') : role === 'Admin';
  } catch {
    throw new Error('Token không hợp lệ');
  }
}

// 🟢 Tạo đặt lịch mới (người dùng)
export async function createBooking(booking: unknown) {
  const res = await axiosInstance.post(API_BASE, booking);
  return res.data;
}

// 🟢 Lấy lịch sử đặt lịch của người dùng
export const fetchMyBookings = async () => {
  const res = await axiosInstance.get(`${API_BASE}/my-bookings`);
  return res.data;
};

// 🔒 Lấy tất cả lịch đặt (Admin)
export const fetchAllBookings = async () => {
  if (!isAdmin()) throw new Error('Bạn không có quyền truy cập');
  const res = await axiosInstance.get(`${API_BASE}/all`);
  return res.data;
};

// 🔒 Xóa lịch đặt (Admin)
export const deleteBookingById = async (id: number) => {
  if (!isAdmin()) throw new Error('Bạn không có quyền xóa');
  const res = await axiosInstance.delete(`${API_BASE}/${id}`);
  return res.data;
};

// 🔒 Cập nhật trạng thái đặt lịch (Admin)
export const updateBookingStatus = async (id: number, status: string) => {
  if (!isAdmin()) throw new Error('Bạn không có quyền cập nhật');
  const res = await axiosInstance.put(`${API_BASE}/${id}/status`, { status });
  return res.data;
};
// 🟢 Lấy chi tiết lịch đặt theo ID (user hoặc admin đều dùng được)
export const fetchBookingById = async (id: number) => {
  const res = await axiosInstance.get(`${API_BASE}/${id}`);
  return res.data;
};
