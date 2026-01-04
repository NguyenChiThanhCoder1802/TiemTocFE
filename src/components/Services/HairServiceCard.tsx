import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ServiceCard } from '../../types/HairService/ServiceCard';
import VisibilityIcon from '@mui/icons-material/Visibility'
import StarIcon from '@mui/icons-material/Star'

const MotionBox = motion(Box);

interface HairServiceCardProps {
  item: ServiceCard;
  index: number;
  linkPrefix: string;
  onBookNow?: (serviceId: string) => void;
}

const HairServiceCard = ({
  item,
  index,
  linkPrefix,
  onBookNow,
}: HairServiceCardProps) => {
  const imageUrl = item.images?.[0] || '/placeholder.png';

  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      sx={{
        flex: {
          xs: '1 1 100%',
          sm: '1 1 calc(50% - 24px)',
          md: '1 1 calc(25% - 24px)',
        },
        maxWidth: {
          sm: 'calc(50% - 24px)',
          md: 'calc(25% - 24px)',
        },
      }}
    >
      <Card
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          transition: 'all 0.35s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 16px 36px rgba(0,0,0,0.12)',
            '& img': {
              transform: 'scale(1.05)',
            },
          },
        }}
      >
        {/* IMAGE */}
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <Link
            to={`/${linkPrefix}/${item._id}`}
            style={{ textDecoration: 'none' }}
          >
            <CardMedia
              component="img"
              image={imageUrl}
              alt={item.name}
              sx={{
                height: 220,
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
            />
          </Link>

          {/* Gradient overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'linear-gradient(to top, rgba(0,0,0,0.35), transparent 60%)',
            }}
          />
        </Box>

        {/* CONTENT */}
        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography
            variant="h6"
            fontWeight={600}
            noWrap
            sx={{ mb: 0.5 }}
          >
            {item.name}
          </Typography>

          {item.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{ mb: 1 }}
            >
              {item.description}
            </Typography>
          )}

          {/* PRICE */}
          <Typography
            variant="h6"
            sx={{
              mt: 1,
              fontWeight: 700,
              color: 'primary.main', // 🔥 #d2a679
            }}
          >
            {new Intl.NumberFormat('vi-VN').format(
              item.finalPrice ?? item.price
            )}
            đ
          </Typography>
        </CardContent>
            {/* RATING + VIEW */}
<Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1.5,
    mt: 0.5,
  }}
>
  {/* Rating */}
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
    <StarIcon sx={{ fontSize: 18, color: '#f5a623' }} />
    <Typography variant="body2" fontWeight={600}>
      {item.ratingAverage?.toFixed(1) || '0.0'}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      ({item.ratingCount || 0})
    </Typography>
  </Box>

  {/* Divider */}
  <Typography color="text.secondary">•</Typography>

  {/* View */}
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
    <VisibilityIcon sx={{ fontSize: 18 }} />
    <Typography variant="body2" color="text.secondary">
      {item.viewCount || 0}
    </Typography>
  </Box>
</Box>

        {/* ACTION */}
        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 3,
              py: 1,
              fontWeight: 600,
              textTransform: 'none',
            }}
            onClick={() => onBookNow?.(item._id)}
          >
            Đặt ngay
          </Button>
        </CardActions>
        
      </Card>
    </MotionBox>
  );
};

export default HairServiceCard;
