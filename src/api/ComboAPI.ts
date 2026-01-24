import axiosInstance from '../utils/axiosInstance'
import type { ApiResponse } from '../types/ApiResponse'
import type { Combo, CreateComboPayload, UpdateComboPayload } from '../types/Combo/Combo'

const BASE_URL = '/combos'

/* ======================
   GET COMBOS
====================== */
export const fetchCombos = async (params?: {
  isActive?: boolean
}): Promise<Combo[]> => {
  const res = await axiosInstance.get<ApiResponse<Combo[]>>(BASE_URL, { params })
  return res.data.data
}

/* ======================
   GET BY ID
====================== */
export const fetchComboById = async (id: string): Promise<Combo> => {
  const res = await axiosInstance.get<ApiResponse<Combo>>(`${BASE_URL}/${id}`)
  return res.data.data
}

/* ======================
   CREATE (ADMIN)
====================== */
export const createCombo = async (
  payload: CreateComboPayload | FormData
): Promise<Combo> => {
  const res = await axiosInstance.post<ApiResponse<Combo>>(
    BASE_URL,
    payload
  )
  return res.data.data
}

/* ======================
   UPDATE (ADMIN)
====================== */
export const updateCombo = async (
  id: string,
  payload: UpdateComboPayload | FormData
): Promise<Combo> => {
  const res = await axiosInstance.put<ApiResponse<Combo>>(
    `${BASE_URL}/${id}`,
    payload
  )
  return res.data.data
}

/* ======================
   DELETE (ADMIN)
====================== */
export const deleteCombo = async (id: string): Promise<void> => {
  await axiosInstance.delete(`${BASE_URL}/${id}`)
}

/* ======================
   RESTORE
====================== */
export const restoreCombo = async (id: string): Promise<Combo> => {
  const res = await axiosInstance.patch<ApiResponse<Combo>>(
    `${BASE_URL}/${id}/restore`
  )
  return res.data.data
}
