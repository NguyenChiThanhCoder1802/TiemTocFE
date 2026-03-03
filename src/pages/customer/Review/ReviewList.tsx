import { useEffect } from 'react'
import { Stack, CircularProgress, Typography } from '@mui/material'
import ReviewItem from './ReviewItem'
import ReviewFormDialog from './ReviewFormDialog'
import { useReview } from '../../../hooks/useReview'
interface ReviewListProps {
  serviceId?: string
  staffId?: string
}
 
const ReviewList = ({ serviceId, staffId }: ReviewListProps) => {
 const {
  reviews,
  loading,
  editReview,
  setEditReview,
  loadReviews,
  removeReview
} = useReview({ serviceId, staffId })
  

  useEffect(() => {
    loadReviews()
  }, [loadReviews])
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
            onDelete={removeReview}
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
