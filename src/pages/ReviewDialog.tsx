import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { createReview, getReviewsByProductId, getReviewsByServiceId } from '../api/reviewApi';
import type { ReviewDto } from '../types/Review';

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
  productId?: number;
  serviceId?: number;
  productName: string;
}

const ReviewDialog = ({ open, onClose, productId, serviceId, productName }: ReviewDialogProps) => {
  const [rating, setRating] = useState<number | null>(5);
  const [content, setContent] = useState('');
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Lấy đánh giá phù hợp khi mở dialog
  useEffect(() => {
    if (!open) return;

    const fetch = async () => {
      try {
        if (productId) {
          const data = await getReviewsByProductId(productId);
          setReviews(data);
        } else if (serviceId) {
          const data = await getReviewsByServiceId(serviceId);
          setReviews(data);
        }
      } catch {
        setReviews([]);
      }
    };

    fetch();
  }, [open, productId, serviceId]);

  // Gửi đánh giá
  const handleSubmit = async () => {
    if (!rating) return;

    try {
      setSubmitting(true);
      const newReview = await createReview({
        rating,
        content,
        productId,
        serviceId,
      });
      setReviews((prev) => [newReview, ...prev]);
      setContent('');
      setRating(5);
    } catch {
      alert('❌ Bạn đã đánh giá mục này trước đó.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Đánh giá: {productName}</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography>Chọn số sao:</Typography>
          <Rating
            value={rating}
            onChange={(_, value) => setRating(value)}
          />
        </Box>
        <TextField
          label="Nội dung đánh giá"
          multiline
          fullWidth
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Typography variant="h6" mt={4}>
          Đánh giá gần đây
        </Typography>
        <List>
          {reviews.map((r) => (
            <Box key={r.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography fontWeight="bold">
                      {r.customerName || 'Người dùng'} -{' '}
                      <Rating value={r.rating} readOnly size="small" />
                    </Typography>
                  }
                  secondary={
                    <>
                      {r.content || '(Không có nội dung)'}
                      <Typography variant="caption" display="block" color="text.secondary">
                        {new Date(r.createdAt).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={submitting}>
          Gửi đánh giá
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDialog;
