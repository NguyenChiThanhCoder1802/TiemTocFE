import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role?: string;
  [key: string]: unknown;
}
export const getUserRoleFromToken = (token: string | null): string => {
  if (!token) return '';
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.role || '';
  } catch {
    return '';
  }
};
