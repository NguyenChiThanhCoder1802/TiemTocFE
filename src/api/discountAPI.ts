import axiosInstance from '../utils/axiosInstance'

import type {
  DiscountCard,
  CreateDiscountCardPayload,
  UpdateDiscountCardPayload
} from '../types/Discount/Discount'

const BASE_URL = '/discount-cards'


export const getDiscountCards = async (): Promise<DiscountCard[]> => {
  const res = await axiosInstance.get<DiscountCard[]>(
    BASE_URL
  )
  return res.data
}

/* ======================
   CREATE DISCOUNT CARD (ADMIN)
====================== */
export const createDiscountCard = async (
  payload: CreateDiscountCardPayload
): Promise<DiscountCard> => {
  const res = await axiosInstance.post<DiscountCard>(
    BASE_URL,
    payload
  )
  return res.data
}

/* ======================
   UPDATE DISCOUNT CARD (ADMIN)
====================== */
export const updateDiscountCard = async (
  id: string,
  payload: UpdateDiscountCardPayload
): Promise<DiscountCard> => {
  const res = await axiosInstance.put<DiscountCard>(
    `${BASE_URL}/${id}`,
    payload
  )
  return res.data
}

/* ======================
   DELETE DISCOUNT CARD (ADMIN)
====================== */
export const deleteDiscountCard = async (id: string): Promise<void> => {
  await axiosInstance.delete(`${BASE_URL}/${id}`)
}

/* ======================
   APPLY DISCOUNT (USER)
====================== */
export const applyDiscountCard = async (
  code: string,
  orderTotal: number
): Promise<{
  discountAmount: number
  finalTotal: number
}> => {
  const res = await axiosInstance.post<
    {
      discountAmount: number
      finalTotal: number
    }
  >(`${BASE_URL}/apply`, {
    code,
    orderTotal
  })

  return res.data
}
