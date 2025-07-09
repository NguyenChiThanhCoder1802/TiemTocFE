import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { addToCart, fetchProducts } from '../../api/apiService';
import type { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack'; // ⬅️ thêm dòng này

const MotionBox = motion(Box);

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { enqueueSnackbar } = useSnackbar(); // ⬅️ hook để dùng toast

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error('Lỗi khi tải sản phẩm:', err);
        enqueueSnackbar('❌ Không tải được sản phẩm!', { variant: 'error' });
      }
    };
    load();
  }, [enqueueSnackbar]);

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId, 1);
      enqueueSnackbar('✅ Đã thêm vào giỏ hàng', { variant: 'success' });
    } catch (err) {
      console.error('❌ Không thêm được vào giỏ:', err);
      enqueueSnackbar('❌ Lỗi khi thêm vào giỏ hàng', { variant: 'error' });
    }
  };

  return (
    <Box sx={{ px: 4, py: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Danh sách sản phẩm
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={3}>
        {products.map((product, index) => (
          <MotionBox
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            sx={{
              flex: {
                xs: '1 1 100%',
                sm: '1 1 calc(50% - 24px)',
                md: '1 1 calc(33.333% - 24px)',
              },
              maxWidth: {
                sm: 'calc(50% - 24px)',
                md: 'calc(33.333% - 24px)',
              },
            }}
          >
            <Card
              elevation={4}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-6px)',
                },
              }}
            >
              <Link
                to={`/product/${product.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    product.imageUrl ||
                    'https://via.placeholder.com/400x300?text=No+Image'
                  }
                  alt={product.name}
                  sx={{
                    objectFit: 'contain',
                    backgroundColor: '#f9f9f9',
                  }}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {product.description || 'Không có mô tả'}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    {product.price.toLocaleString()}đ
                  </Typography>
                </CardContent>
              </Link>

              <CardActions sx={{ mt: 'auto' }}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => handleAddToCart(product.id)}
                  fullWidth
                >
                  Thêm vào giỏ
                </Button>
              </CardActions>
            </Card>
          </MotionBox>
        ))}
      </Box>
    </Box>
  );
};

export default ProductPage;
