import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { useRef, useEffect } from 'react';

const MotionBox = motion(Box);
const DRAG_TYPE = 'SERVICE_ITEM';

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
  onDragToBook?: (serviceId: number) => void;
}

const ItemCard = ({ item, index, linkPrefix, onDragToBook }: ItemCardProps) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: DRAG_TYPE,
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (draggedItem, monitor) => {
      if (!monitor.didDrop()) {
        onDragToBook?.(draggedItem.id);
      }
    },
  });

  const boxRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (boxRef.current) {
      dragRef(boxRef.current);
    }
  }, [boxRef, dragRef]);

  return (
    <MotionBox
      ref={boxRef}
      key={item.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      sx={{
        opacity: isDragging ? 0.5 : 1,
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
        }}
      >
        <Link to={`/${linkPrefix}/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <CardMedia
            component="img"
            image={item.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={item.name}
            sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </Link>

        <CardContent>
          <Typography variant="h6" noWrap>
            {item.name}
          </Typography>
          {item.description && (
            <Typography variant="body2" color="text.secondary" noWrap>
              {item.description}
            </Typography>
          )}
          <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
  {new Intl.NumberFormat('vi-VN').format(item.price ?? 0)}đ
</Typography>

        </CardContent>

        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => onDragToBook?.(item.id)}
          >
            Đặt ngay
          </Button>
        </CardActions>
      </Card>
    </MotionBox>
  );
};

export default ItemCard;
