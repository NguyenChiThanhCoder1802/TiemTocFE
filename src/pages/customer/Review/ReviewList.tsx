import { useCallback, useEffect, useState } from 'react'
import { Stack, CircularProgress, Typography } from '@mui/material'
import ReviewItem from './ReviewItem'
import ReviewFormDialog from './ReviewFormDialog'
import { fetchReviewsByService, deleteReview } from '../../../api/ReviewAPI'
import type { Review } from '../../../types/Review/Review'

interface ReviewListProps {
  serviceId: string
  reloadKey: number
}

const ReviewList = ({ serviceId, reloadKey }: ReviewListProps) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [editReview, setEditReview] = useState<Review | null>(null)

  const loadReviews = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchReviewsByService(serviceId)
      setReviews(data)
    } finally {
      setLoading(false)
    }
  }, [serviceId])

  useEffect(() => {
    loadReviews()
  }, [loadReviews, reloadKey])

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn chắc chắn muốn xoá đánh giá này?')) return
    await deleteReview(id)
    await loadReviews() // reload sau delete
  }

  const handleEdit = (review: Review) => {
    setEditReview(review)
  }

  const handleEditSuccess = async () => {
    setEditReview(null)
    await loadReviews() // reload sau edit
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
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </Stack>

      {editReview && (
        <ReviewFormDialog
          open={true}
          onClose={() => setEditReview(null)}
          serviceId={serviceId}
          review={editReview}
          onSuccess={handleEditSuccess}
        />
      )}
    </>
  )
}

export default ReviewList
