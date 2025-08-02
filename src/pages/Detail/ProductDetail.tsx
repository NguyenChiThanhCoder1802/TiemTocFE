import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../../api/productApi';
import { addToCart } from '../../api/apiService';
import type { Product } from '../../types/Product';
import {Box,Typography,Card,CardContent,CardMedia,CircularProgress,Button,} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import ReviewDialog from '../ReviewDialog';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AverageRating from '../../components/AverageRating';
import { useCart } from '../../hooks/useCart';
import { getReviewsByProductId, type ReviewDto } from '../../api/reviewApi';
const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [openReview, setOpenReview] = useState(false)
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { refreshCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (!id) throw new Error('Không tìm thấy ID sản phẩm');
        const data = await fetchProductById(Number(id));
        setProduct(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Lỗi không xác định');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
     if (id) {
    getReviewsByProductId(Number(id))
      .then(setReviews)
      .catch(() => setReviews([]));
  }
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart(product.id, 1);
      await refreshCart();
      enqueueSnackbar('✅ Đã thêm vào giỏ hàng', { variant: 'success', autoHideDuration: 1000, });
    } catch {
      enqueueSnackbar('❌ Không thể thêm vào giỏ hàng', { variant: 'error', autoHideDuration: 1000, });
    }
    
  };

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

  if (!product) {
    return (
      <Typography align="center" mt={4}>
        Không tìm thấy sản phẩm
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
              image={product.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
              alt={product.name}
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
                {product.name}
              </Typography>
              <AverageRating reviews={reviews} />
              <Typography variant="body1" color="text.secondary" paragraph>
                {product.description || 'Không có mô tả'}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                Giá: {product.price.toLocaleString()}đ
              </Typography>

              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                sx={{ mt: 2, borderRadius: 2 }}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button
                variant="outlined"
                onClick={() => setOpenReview(true)}
                startIcon={<RateReviewIcon />}
                sx={{ mt: 2, borderRadius: 2, ml: 2 }}
              >
                Đánh giá
              </Button>
                <ReviewDialog
                  open={openReview}
                  onClose={() => setOpenReview(false)}
                  productId={product.id}
                  productName={product.name}
                />

            </CardContent>
          </Box>
        </Card>
      </Box>
    </motion.div>
  );
};

export default ProductDetail;
