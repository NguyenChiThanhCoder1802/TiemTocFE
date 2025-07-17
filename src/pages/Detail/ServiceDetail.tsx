import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchServiceById } from '../../api/servicesAPI';
import type { Service } from '../../types/Service';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { motion } from 'framer-motion';
import type { ReviewDto } from '../../api/reviewApi';
import ReviewDialog from '../ReviewDialog';
import Rating from '@mui/material/Rating';
import { getReviewsByServiceId } from '../../api/reviewApi';
const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openReview, setOpenReview] = useState(false);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null;

  useEffect(() => {
    if (!id) return;
    fetchServiceById(Number(id))
      .then(setService)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    getReviewsByServiceId(Number(id))
      .then(setReviews)
      .catch(() => setReviews([]));
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  if (!service) {
    return (
      <Typography align="center" mt={4}>
        Không tìm thấy dịch vụ
      </Typography>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box maxWidth="1000px" mx="auto" mt={4} px={2}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Quay lại
        </Button>

        <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, p: 2 }}>
          {/* Hình ảnh */}
          <Box
            flex={1}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#f5f5f5',
              borderRadius: 2,
              overflow: 'hidden',
              height: { xs: 300, md: 400 },
              mb: { xs: 2, md: 0 },
              mr: { md: 2 },
            }}
          >
            <CardMedia
              component="img"
              image={service.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
              alt={service.name}
              sx={{
                objectFit: 'contain',
                maxHeight: '100%',
                maxWidth: '100%',
              }}
            />
          </Box>

          {/* Thông tin */}
          <Box flex={2} display="flex" flexDirection="column">
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {service.name}
              </Typography>
              {averageRating !== null && (
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography variant="subtitle1" sx={{ mr: 1 }}>
                    Đánh giá:
                  </Typography>
                  <Rating value={averageRating} precision={0.5} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({reviews.length} đánh giá)
                  </Typography>
                </Box>
              )}
              <Typography variant="body1" color="text.secondary" paragraph>
                {service.description || 'Không có mô tả'}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                Giá: {service.price.toLocaleString()}đ
              </Typography>

              <Button
                variant="outlined"
                onClick={() => setOpenReview(true)}
                startIcon={<RateReviewIcon />}
                sx={{ mt: 2, borderRadius: 2 }}
              >
                Đánh giá
              </Button>

              <ReviewDialog
                open={openReview}
                onClose={() => setOpenReview(false)}
                serviceId={service.id}
                productName={service.name}
              />
            </CardContent>
          </Box>
        </Card>
      </Box>
    </motion.div>
  );
};

export default ServiceDetail;
