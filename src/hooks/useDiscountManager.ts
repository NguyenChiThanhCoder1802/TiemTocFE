import { useCallback, useEffect, useState } from 'react'
import type {
  DiscountCard,
  CreateDiscountCardPayload,
  UpdateDiscountCardPayload
} from '../types/Discount/Discount'

import {
  getDiscountCards,
  createDiscountCard,
  updateDiscountCard,
  deleteDiscountCard
} from '../api/discountAPI'

export const useDiscountManager = () => {
  const [discounts, setDiscounts] = useState<DiscountCard[]>([])
  const [loading, setLoading] = useState(false)

  const fetchDiscounts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getDiscountCards()
      setDiscounts(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDiscounts()
  }, [fetchDiscounts])

  const create = async (payload: CreateDiscountCardPayload) => {
    await createDiscountCard(payload)
    await fetchDiscounts()
  }

  const update = async (
    id: string,
    payload: UpdateDiscountCardPayload
  ) => {
    await updateDiscountCard(id, payload)
    await fetchDiscounts()
  }

  const remove = async (id: string) => {
    await deleteDiscountCard(id)
    await fetchDiscounts()
  }

  return {
    discounts,
    loading,
    create,
    update,
    remove
  }
}
