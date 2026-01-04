import {
  Avatar,
  Stack,
  Typography,
  IconButton,
  Box,
  ImageList,
  ImageListItem
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ReviewStars from './ReviewStars'
import type { Review } from '../../../types/Review/Review'
import useAuth from '../../../hooks/useAuth'

interface ReviewItemProps {
  review: Review
  onEdit: (review: Review) => void
  onDelete: (id: string) => void
}

const ReviewItem = ({ review, onEdit, onDelete }: ReviewItemProps) => {
  const { user } = useAuth() 
  const isOwner = user?._id === review.user._id

  return (
    <Stack direction="row" spacing={2}>
      <Avatar src={review.user.avatar} />

      <Box flex={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight={600}>{review.user.name}</Typography>

          {isOwner && (
            <Stack direction="row" spacing={1}>
              <IconButton size="small" onClick={() => onEdit(review)}>
                <EditIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                color="error"
                onClick={() => onDelete(review._id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          )}
        </Stack>

        <ReviewStars value={review.rating} readOnly />
        <Typography>{review.comment}</Typography>

        {review.images && review.images.length > 0 && (
          <ImageList cols={3} gap={8} sx={{ mt: 1 }}>
            {review.images.map((imgUrl, idx) => (
              <ImageListItem key={idx}>
                <img
                  src={imgUrl}
                  alt={`review-${idx}`}
                  loading="lazy"
                  style={{ borderRadius: 4, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
    </Stack>
  )
}

export default ReviewItem
