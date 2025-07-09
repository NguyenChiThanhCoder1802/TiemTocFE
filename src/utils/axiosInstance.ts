// src/utils/axiosInstance.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm token vào headers nếu có
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Xử lý lỗi 401/403 toàn cục (nếu cần)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      alert('Bạn không có quyền truy cập. Vui lòng đăng nhập lại.');
      // Optional: redirect về trang đăng nhập
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
