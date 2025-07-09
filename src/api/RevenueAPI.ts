import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../utils/axiosInstance';

export interface RevenueByDay {
  date: string;
  total: number;
}

export interface RevenueByMonth {
  year: number;
  month: number;
  total: number;
}

interface JwtPayload {
  exp: number;
  role: string | string[];
}

// ✅ Kiểm tra token hợp lệ và vai trò
function checkAdminToken(): void {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Chưa đăng nhập');

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      throw new Error('Phiên đăng nhập đã hết hạn');
    }

    const isAdmin = Array.isArray(decoded.role)
      ? decoded.role.includes('Admin')
      : decoded.role === 'Admin';

    if (!isAdmin) throw new Error('Bạn không có quyền truy cập');
  } catch {
    throw new Error('Token không hợp lệ');
  }
}

// 📌 Lấy doanh thu tổng cộng
export const fetchTotalRevenue = async (): Promise<number> => {
  checkAdminToken();

  const res = await axiosInstance.get('/revenue/total');
  return res.data.totalRevenue;
};

// 📌 Lấy doanh thu theo ngày
export const fetchRevenueByDay = async (): Promise<RevenueByDay[]> => {
  checkAdminToken();

  const res = await axiosInstance.get('/revenue/by-day');
  return res.data;
};

// 📌 Lấy doanh thu theo tháng
export const fetchRevenueByMonth = async (): Promise<RevenueByMonth[]> => {
  checkAdminToken();

  const res = await axiosInstance.get('/revenue/by-month');
  return res.data;
};
// 📌 Doanh thu Booking tổng
export const fetchTotalBookingRevenue = async (): Promise<number> => {
  checkAdminToken();

  const res = await axiosInstance.get('/revenue/booking/total');
  return res.data.totalRevenue;
};

// 📌 Doanh thu Booking theo ngày
export const fetchBookingRevenueByDay = async (): Promise<RevenueByDay[]> => {
  checkAdminToken();

  const res = await axiosInstance.get('/revenue/booking/by-day');
  return res.data;
};

// 📌 Doanh thu Booking theo tháng
export const fetchBookingRevenueByMonth = async (): Promise<RevenueByMonth[]> => {
  checkAdminToken();

  const res = await axiosInstance.get('/revenue/booking/by-month');
  return res.data;
};

