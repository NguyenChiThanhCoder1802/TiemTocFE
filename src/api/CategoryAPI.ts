import axiosInstance from '../utils/axiosInstance'
import type { ApiResponse } from '../types/ApiResponse'
import type {
  Category,
  CategoryWithServices,
  CategoryStats,
  CreateCategoryPayload,
  UpdateCategoryPayload
} from '../types/Category/Category'

const BASE_URL = '/categories'

/* ======================
   GET CATEGORIES
====================== */
export const fetchCategories = async (params?: {
  isActive?: boolean
}): Promise<Category[]> => {
  const res = await axiosInstance.get<ApiResponse<Category[]>>(BASE_URL, {
    params
  })
  return res.data.data
}

/* ======================
   GET CATEGORY BY ID
====================== */
export const fetchCategoryById = async (
  id: string
): Promise<Category> => {
  const res = await axiosInstance.get<ApiResponse<Category>>(
    `${BASE_URL}/${id}`
  )
  return res.data.data
}

/* ======================
   GET CATEGORY WITH SERVICES
====================== */
export const fetchCategoryWithServices = async (
  id: string
): Promise<CategoryWithServices> => {
  const res = await axiosInstance.get<ApiResponse<CategoryWithServices>>(
    `${BASE_URL}/${id}/with-services`
  )
  return res.data.data
}

/* ======================
   GET CATEGORY STATS
====================== */
export const fetchCategoryStats = async (
  id: string
): Promise<CategoryStats> => {
  const res = await axiosInstance.get<ApiResponse<CategoryStats>>(
    `${BASE_URL}/${id}/stats`
  )
  return res.data.data
}

/* ======================
   CREATE CATEGORY (ADMIN)
====================== */
export const createCategory = async (
  payload: CreateCategoryPayload
): Promise<Category> => {
  const res = await axiosInstance.post<ApiResponse<Category>>(
    BASE_URL,
    payload
  )
  return res.data.data
}

/* ======================
   UPDATE CATEGORY (ADMIN)
====================== */
export const updateCategory = async (
  id: string,
  payload: UpdateCategoryPayload
): Promise<Category> => {
  const res = await axiosInstance.put<ApiResponse<Category>>(
    `${BASE_URL}/${id}`,
    payload
  )
  return res.data.data
}

/* ======================
   DELETE CATEGORY (ADMIN)
====================== */
export const deleteCategory = async (id: string): Promise<void> => {
  await axiosInstance.delete(`${BASE_URL}/${id}`)
}

/* ======================
   RESTORE CATEGORY (ADMIN)
====================== */
export const restoreCategory = async (
  id: string
): Promise<Category> => {
  const res = await axiosInstance.patch<ApiResponse<Category>>(
    `${BASE_URL}/${id}/restore`
  )
  return res.data.data
}

/* ======================
   CHANGE ORDER
====================== */
export const changeCategoryOrder = async (
  id: string,
  order: number
): Promise<Category> => {
  const res = await axiosInstance.patch<ApiResponse<Category>>(
    `${BASE_URL}/${id}/order`,
    { order }
  )
  return res.data.data
}

/* ======================
   BULK UPDATE STATUS
====================== */
export const bulkUpdateCategoryStatus = async (
  categoryIds: string[],
  isActive: boolean
): Promise<{ modifiedCount: number }> => {
  const res = await axiosInstance.patch<
    ApiResponse<{ modifiedCount: number }>
  >(`${BASE_URL}/bulk/status`, {
    categoryIds,
    isActive
  })
  return res.data.data
}
