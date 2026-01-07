import { useCallback, useEffect, useState } from 'react'
import { Stack, CircularProgress, Typography } from '@mui/material'
import ReviewItem from './ReviewItem'
import ReviewFormDialog from './ReviewFormDialog'
import {
  fetchReviewsByService,
  fetchReviewsByStaff,
  deleteReview
} from '../../../api/ReviewAPI'
import type { Review } from '../../../types/Review/Review'

interface ReviewListProps {
  serviceId?: string
  staffId?: string
  reloadKey: number
}

const ReviewList = ({ serviceId, staffId, reloadKey }: ReviewListProps) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [editReview, setEditReview] = useState<Review | null>(null)

  const loadReviews = useCallback(async () => {
    setLoading(true)
    try {
      const data = serviceId
        ? await fetchReviewsByService(serviceId)
        : staffId
        ? await fetchReviewsByStaff(staffId)
        : []
      setReviews(data)
    } finally {
      setLoading(false)
    }
  }, [serviceId, staffId])

  useEffect(() => {
    loadReviews()
  }, [loadReviews, reloadKey])

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn chắc chắn muốn xoá đánh giá này?')) return
    await deleteReview(id)
    await loadReviews()
  }

  if (loading) return <CircularProgress />

  if (reviews.length === 0)
    return <Typography color="text.secondary">Chưa có đánh giá nào</Typography>

  return (
    <>
      <Stack spacing={3}>
        {reviews.map(r => (
          <ReviewItem
            key={r._id}
            review={r}
            onEdit={setEditReview}
            onDelete={handleDelete}
          />
        ))}
      </Stack>

      {editReview && (
        <ReviewFormDialog
          open
          onClose={() => setEditReview(null)}
          review={editReview}
          serviceId={serviceId}
          staffId={staffId}
          onSuccess={loadReviews}
        />
      )}
    </>
  )
}

export default ReviewList
