import axios from 'axios'
import type { AxiosRequestHeaders } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false
})

const logoutAndRedirect = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('auth_user')
  window.location.href = '/login'
}

/* ======================================================
   REQUEST INTERCEPTOR
   - Gửi accessToken + refreshToken
====================================================== */
axiosInstance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    const headers = (config.headers ?? {}) as AxiosRequestHeaders

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }

    if (refreshToken) {
      headers['X-Refresh-Token'] = refreshToken
    }

    if (config.data instanceof FormData) {
      delete headers['Content-Type']
    } else {
      headers['Content-Type'] = 'application/json'
    }

    config.headers = headers
    return config
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  response => {
    const newAccessToken =
      response.headers['x-new-access-token'] ||
      response.headers['X-New-Access-Token']

    if (newAccessToken) {
      console.log('🔄 UPDATE ACCESS TOKEN FROM BE')
      localStorage.setItem('accessToken', newAccessToken)
    }

    return response
  },
  error => {
    const status = error.response?.status
    const message = error.response?.data?.message

    if (
      status === 401 &&
      (
        message === 'INVALID_ACCESS_TOKEN' ||
        message === 'REFRESH_TOKEN_EXPIRED_OR_INVALID' ||
        message === 'REFRESH_TOKEN_NOT_PROVIDED'
      )
    ) {
      logoutAndRedirect()
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
