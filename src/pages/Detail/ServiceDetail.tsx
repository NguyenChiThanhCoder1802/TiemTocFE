import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchServiceById } from '../../api/servicesAPI';
import type { Service } from '../../types/Service';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Rating,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { motion } from 'framer-motion';
import type { ReviewDto } from '../../api/reviewApi';
import { getReviewsByServiceId } from '../../api/reviewApi';
import ReviewDialog from '../ReviewDialog';

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openReview, setOpenReview] = useState(false);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const handleBooking = () => {
  navigate(`/booking`);
};

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
      <Box maxWidth="1200px" mx="auto" mt={4} px={2}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Quay lại
        </Button>

        <Card sx={{ p: 3 }}>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
            {/* Media section (left) */}
            <Box flex={1}>
              {/* Main Image */}
              <Box mb={2}>
                <img
                  src={service.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt="Ảnh chính"
                  style={{
                    width: '90%',
                    maxHeight: 500,
                    objectFit: 'cover',
                    borderRadius: 50,
                  }}
                />
              </Box>

              {/*Ảnh phụ */}
              {(service.additionalImageUrls?.length ?? 0) > 0 && (
                <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
                  {service.additionalImageUrls?.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Ảnh phụ ${idx + 1}`}
                      style={{
                        width: '20%',
                        height: 120,
                        objectFit: 'cover',
                        borderRadius: 6,
                      }}
                    />
                  ))}
                </Box>
              )}

              {/* Videos */}
              {Array.isArray(service.videoUrls) && service.videoUrls.length > 0 && (
                <Box display="flex" flexDirection="column" gap={2}>
                  {service.videoUrls.map((videoUrl, idx) => (
                    <video key={idx} width="100%" height="500" controls style={{ borderRadius: 8 }}>
                      <source src={videoUrl} type="video/mp4" />
                      Trình duyệt của bạn không hỗ trợ phát video.
                    </video>
                  ))}
                </Box>
              )}
            </Box>

            {/* Info section (right) */}
            <Box flex={1}>
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

                <Typography variant="body1" color="text.secondary" paragraph sx={{ whiteSpace: 'pre-line' }}>
                  {service.description || 'Không có mô tả'}
                </Typography>
                <Typography variant="body1" mt={1}>
                        Thời lượng: {service.durationInMinutes} phút
                </Typography>
                <Typography variant="h6" color="error">
                  Giá: {service.price.toLocaleString()}đ
                </Typography>

                
                  <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBooking}
                  sx={{ mt: 2, borderRadius: 2, mr: 2 }}
                >
                  Đặt lịch ngay
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setOpenReview(true)}
                  startIcon={<RateReviewIcon />}
                  sx={{ mt: 3, borderRadius: 2 }}
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
          </Box>
        </Card>
      </Box>
    </motion.div>
  );
};

export default ServiceDetail;
