import axiosInstance from '../utils/axiosInstance'
import type { Notification, NotificationResponse } from '../types/Notification/Notification'

/* ================= GET MY NOTIFICATIONS ================= */

export const getMyNotificationsApi = async (
  page = 1,
  limit = 10
): Promise<NotificationResponse> => {

  const res = await axiosInstance.get(
    `/notifications/my?page=${page}&limit=${limit}`
  )

  return res.data
}

/* ================= MARK AS READ ================= */

export const markNotificationReadApi = async (
  id: string
): Promise<Notification> => {

  const res = await axiosInstance.patch(
    `/notifications/${id}/read`
  )

  return res.data.data
}

/* ================= MARK ALL AS READ ================= */

export const markAllNotificationsReadApi = async () => {

  const res = await axiosInstance.patch(
    `/notifications/read-all`
  )

  return res.data
}