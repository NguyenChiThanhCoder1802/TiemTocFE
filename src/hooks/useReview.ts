import { useCallback, useState } from 'react'
import {
  fetchReviewsByService,
  fetchReviewsByStaff,
  fetchReviewsByBooking,
  deleteReview
} from '../api/ReviewAPI'
import type { Review } from '../types/Review/Review'

interface UseReviewParams {
  serviceId?: string
  staffId?: string
  bookingId?:string
}

export function useReview({ serviceId, staffId ,bookingId}: UseReviewParams) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [editReview, setEditReview] = useState<Review | null>(null)

  const loadReviews = useCallback(async () => {
    setLoading(true)
    try {
      const data = serviceId
        ? await fetchReviewsByService(serviceId)
        : staffId
        ? await fetchReviewsByStaff(staffId)
        : bookingId
        ? await fetchReviewsByBooking(bookingId)
        : []
      setReviews(data)
    } finally {
      setLoading(false)
    }
  }, [serviceId, staffId, bookingId])

  const removeReview = async (id: string) => {
    if (!confirm('Bạn chắc chắn muốn xoá đánh giá này?')) return
    await deleteReview(id)
    await loadReviews()
  }

  return {
    reviews,
    loading,
    editReview,
    setEditReview,
    loadReviews,
    removeReview
  }
}
