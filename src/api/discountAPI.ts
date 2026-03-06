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


export const createDiscountCard = async (
  payload: CreateDiscountCardPayload
): Promise<DiscountCard> => {
  const res = await axiosInstance.post<DiscountCard>(
    BASE_URL,
    payload
  )
  return res.data
}

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

export const deleteDiscountCard = async (id: string): Promise<void> => {
  await axiosInstance.delete(`${BASE_URL}/${id}`)
}

export const applyDiscountCard = async (
  code: string,
  amount: number,
  serviceIds: string[]
): Promise<{
  discountAmount: number
  finalAmount: number
  discountSnapshot: any
}> => {
  const res = await axiosInstance.post(
    `${BASE_URL}/apply`,
    { code, amount, serviceIds }
  )

  return res.data
}