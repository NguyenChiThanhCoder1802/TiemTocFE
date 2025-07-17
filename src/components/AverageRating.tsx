import { Box, Typography, Rating } from '@mui/material';
import type { ReviewDto } from '../api/reviewApi';

interface Props {
  reviews: ReviewDto[];
}

const AverageRating = ({ reviews }: Props) => {
  if (!reviews || reviews.length === 0) return null;

  const average =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <Box display="flex" alignItems="center" mb={1}>
      <Typography variant="subtitle1" sx={{ mr: 1 }}>
        Đánh giá:
      </Typography>
      <Rating value={average} precision={0.5} readOnly />
      <Typography variant="body2" sx={{ ml: 1 }}>
        ({reviews.length} đánh giá)
      </Typography>
    </Box>
  );
};

export default AverageRating;
