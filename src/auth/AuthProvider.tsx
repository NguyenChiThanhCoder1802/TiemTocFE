import React, { useState, useEffect } from 'react';
import { AuthContext, type AuthContextType } from './AuthContext';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  [key: string]: unknown;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra token có hợp lệ và chưa hết hạn
  const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp * 1000 < Date.now()) {
        return false; // Token hết hạn
      }
      return true;
    } catch {
      return false; // Token không hợp lệ
    }
  };

  // Lấy token từ localStorage và kiểm tra
  const getToken = (): string | null => {
    const token = localStorage.getItem('token');
    return isTokenValid(token) ? token : null;
  };

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };
  
  // Khi load lại trang, kiểm tra token hợp lệ
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isTokenValid(token)) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    }
  }, []);

  const value: AuthContextType = { isLoggedIn, login, logout, getToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
