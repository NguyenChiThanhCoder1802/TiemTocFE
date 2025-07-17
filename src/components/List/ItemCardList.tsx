import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionBox = motion(Box);

interface Item {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
}

interface Props {
  items: Item[];
  title: string;
  linkPrefix: string; // "product" or "services"
  onActionClick?: (itemId: number) => void;
  actionLabel?: string;
  showActionButton?: boolean;
}

const ItemCardList = ({
  items,
  title,
  linkPrefix,
  onActionClick,
  actionLabel = 'Xem thêm',
  showActionButton = false,
}: Props) => {
  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" align="center">
        {title}
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
        {items.map((item, index) => (
          <MotionBox
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
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
              sx={{
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 4,
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-6px)' },
              }}
            >
              <Link
                to={`/${linkPrefix}/${item.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={item.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={item.name}
                  sx={{ objectFit: 'contain', backgroundColor: '#f9f9f9' }}
                />
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {item.description || 'Không có mô tả'}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" fontWeight="bold">
                    Giá: {item.price.toLocaleString()}đ
                  </Typography>
                </CardContent>
              </Link>

              {showActionButton && (
                <CardActions sx={{ mt: 'auto' }}>
                  <Button fullWidth variant="contained" onClick={() => onActionClick?.(item.id)}>
                    {actionLabel}
                  </Button>
                </CardActions>
              )}
            </Card>
          </MotionBox>
        ))}
      </Box>
    </Box>
  );
};

export default ItemCardList;
