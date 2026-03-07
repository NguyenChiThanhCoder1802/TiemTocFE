import axiosInstance from '../utils/axiosInstance'
import {jwtDecode} from 'jwt-decode';

import type { User } from '../types/Auth/User';
export interface LoginPayload {
  email: string
  password: string
}
export interface RegisterPayload {
  email: string
  name: string
  password: string
  confirmpassword:string
}
export interface JwtPayload {
 id:string
  email: string;
  role: string | string[];
  exp: number;
}
export interface UserInfo {
  id: string
  name: string
  email: string
  role: string | string[]
}

export interface AuthResponse {
  message: string
  data: {
    accessToken: string
    refreshToken: string
    user: UserInfo
  }
}

export const loginApi = async (payload: LoginPayload) => {
  const res = await axiosInstance.post<AuthResponse>(
    '/auth/login',
    payload
  )

  return res.data.data
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

export const registerApi = async (payload: RegisterPayload) => {
  const res = await axiosInstance.post<AuthResponse>(
    '/auth/register',
    payload
  )
  console.log(res)
  return res.data.data
}

export const verifyOtpApi = async (payload: {email: string, otp: string }) => {
  const res = await axiosInstance.post<{ message: string }>(
    '/auth/verify-otp',
    payload
  )

  return res.data
}


export const forgotPasswordApi = async (email: string) => {
  const res = await axiosInstance.post<{ message: string }>(
    '/auth/forgot-password',
    { email }
  )

  return res.data
}
export const resetPasswordApi = async (payload: {
  email: string
  otp: string
  newPassword: string
}) => {
  const res = await axiosInstance.post<{ message: string }>(
    '/auth/reset-password',
    payload
  )

  return res.data
}
export const getAllUsersApi = async (): Promise<User[]> => {
  const res = await axiosInstance.get('/auth/users')
  return res.data.users
}
export const getMeApi = async () => {
  const res = await axiosInstance.get('/auth/me')
  return res.data.data
}
