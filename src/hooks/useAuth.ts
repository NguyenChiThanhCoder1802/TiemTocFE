import { useEffect, useState, useCallback } from 'react'
import axiosInstance from '../utils/axiosInstance'
import type { User } from '../types/Auth/User'
import type { AxiosError } from 'axios'

const AUTH_USER_KEY = 'auth_user'

const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const cached = localStorage.getItem(AUTH_USER_KEY)
    return cached ? JSON.parse(cached) as User : null
  })

  const [loading, setLoading] = useState(!user)
const updateAuthUser = (updatedUser: User) => {
  setUser(updatedUser)
  localStorage.setItem(
    AUTH_USER_KEY,
    JSON.stringify(updatedUser)
  )
}
  /* ======================
     FETCH CURRENT USER
  ====================== */
  const refreshUser = useCallback(async () => {
    try {
      const res = await axiosInstance.get<{ data: User }>('/auth/me')
      setUser(res.data.data)
      localStorage.setItem(
        AUTH_USER_KEY,
        JSON.stringify(res.data.data)
      )
    } catch (error) {
      const err = error as AxiosError

      if (err.response?.status === 401) {
        setUser(null)
        localStorage.removeItem(AUTH_USER_KEY)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  /* ======================
     INIT AUTH
  ====================== */
 useEffect(() => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    refreshUser()
  } else {
    setLoading(false)
  }
}, [refreshUser])


  /* ======================
     LOGOUT
  ====================== */
  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout')
    } catch (error) {
      console.warn('Logout failed', error)
    }

    setUser(null)
    localStorage.removeItem(AUTH_USER_KEY)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  return {
    user,
    loading,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'admin',
    isCustomer: user?.role === 'customer',
    refreshUser,
    logout,
    updateAuthUser
  }
}

export default useAuth
