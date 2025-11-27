import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionBox = motion(Box);

interface ItemCardProps {
  item: {
    id: number;
    name: string;
    description?: string;
    imageUrl?: string;
    price: number;
  };
  index: number;
  linkPrefix: string;
  onBookNow?: (serviceId: number) => void;
}

const ItemCard = ({ item, index, linkPrefix, onBookNow }: ItemCardProps) => {
  return (
    <MotionBox
      key={item.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
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
        mb: 3,
      }}
    >
      <Card
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 4,
          transition: 'transform 0.3s',
          '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 },
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Link
          to={`/${linkPrefix}/${item.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <CardMedia
            component="img"
            image={item.imageUrl || '/placeholder.png'}
            alt={item.name}
            sx={{
              width: '100%',
              height: 200,
              objectFit: 'cover',
            }}
          />
        </Link>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" noWrap textAlign="center">
            {item.name}
          </Typography>

          {item.description && (
            <Typography variant="body2" color="text.secondary" noWrap>
              {item.description}
            </Typography>
          )}

          <Typography
            variant="subtitle1"
            color="error"
            textAlign="center"
            sx={{ mt: 1 }}
          >
            {new Intl.NumberFormat('vi-VN').format(item.price ?? 0)}đ
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => onBookNow?.(item.id)}
            fullWidth
          >
            Đặt ngayy chưa dùng đc
          </Button>
        </CardActions>
      </Card>
    </MotionBox>
  );
};

export default ItemCard;
