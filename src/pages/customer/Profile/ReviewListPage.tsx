import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Card,
  Rating,
  Stack,
  CircularProgress
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { fetchMyReviews } from '../../../api/reviewApi'
import type { Review } from '../../../types/Review/Review'

const ReviewListPage = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchMyReviews()
      .then(setReviews)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Typography fontWeight={600} mb={2}>
        Đánh giá của tôi
      </Typography>

      {reviews.length === 0 && (
        <Typography color="text.secondary">
          Bạn chưa có đánh giá nào
        </Typography>
      )}
      <Box
        sx={{
          maxWidth: 600
        }}
      >
        <Stack spacing={1.5}>
          {reviews.map(review => (
            <Card
              key={review._id}
              sx={{
                p: 1.5,
                cursor: 'pointer',
                '&:hover': { bgcolor: '#fafafa' }
              }}
              onClick={() => {
                if (
                  review.service &&
                  typeof review.service !== 'string'
                ) {
                  navigate(
                    `/services/${review.service.slug}?reviewId=${review._id}`
                  )
                  return
                }

                /* staff */
                if (
                  review.staff &&
                  typeof review.staff !== 'string'
                ) {
                  navigate(`/staffs/${review.staff._id}`)
                }
              }}
            >
              <Stack spacing={0.5}>
                <Rating value={review.rating} readOnly size="small" />

                {review.comment && (
                  <Typography fontSize={14} noWrap>
                    {review.comment}
                  </Typography>
                )}

                {review.service &&
                  typeof review.service !== "string" && (
                    <Typography
                      fontSize={12}
                      color="text.secondary"
                    >
                      Dịch vụ: {review.service.name}
                    </Typography>
                  )}
                {review.staff && typeof review.staff !== "string" && (
                  <Typography fontSize={12} color="text.secondary">
                    Nhân viên: {review.staff.user.name}
                  </Typography>
                )}
              </Stack>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default ReviewListPage
