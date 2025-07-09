import {jwtDecode} from 'jwt-decode';
const API_BASE = import.meta.env.VITE_API_URL + '/account';
export interface JwtPayload {
  name: string;
  nameid: string;
  role: string | string[];
  exp: number;
}
export async function register(user: {
  email: string;
  fullName: string;
  password: string;
  role: string;
}) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Đăng nhập thất bại');
  return data;
}
export interface JwtPayload {
  name: string;
  nameid: string;
  role: string | string[];
  exp: number;
}

export function getDecodedToken(token: string): JwtPayload | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return null; // Token hết hạn
    }
    return decoded;
  } catch {
    return null;
  }
}
// Gửi email quên mật khẩu
export async function forgotPassword(email: string) {
  const res = await fetch(`${API_BASE}/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}
// Đặt lại mật khẩu mới
export async function resetPassword(data: {
  email: string;
  token: string;
  newPassword: string;
}) {
  const res = await fetch(`${API_BASE}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}
