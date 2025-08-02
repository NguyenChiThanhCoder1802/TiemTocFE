import { Box, Typography, Card, CardMedia } from '@mui/material';
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

const ItemCard = ({ item, index, linkPrefix,onDragToBook }: ItemCardProps) => {
 const [{ isDragging }, dragRef] = useDrag({
  type: DRAG_TYPE,
  item: { id: item.id },
  collect: (monitor) => ({
    isDragging: monitor.isDragging(),
  }),
  end: (draggedItem, monitor) => {
    if (monitor.didDrop()) return; // nếu thả vào drop target thì bỏ qua

    // Gọi hàm khi kéo nhưng không thả vào vùng nào
    onDragToBook?.(draggedItem.id);
  },
});


  // Khắc phục lỗi ref
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
          md: '1 1 calc(33.333% - 24px)',
        },
        maxWidth: {
          sm: 'calc(50% - 24px)',
          md: 'calc(33.333% - 24px)',
        },
        mb: 3,
      }}
    >
      <Card
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
          height: 220,
          boxShadow: 4,
          transition: 'transform 0.3s',
          '&:hover': { transform: 'translateY(-6px)' },
          '&:hover .overlay': {
            opacity: 1,
          },
        }}
      >
        <Link
          to={`/${linkPrefix}/${item.id}`}
          style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
        >
          <CardMedia
            component="img"
            image={item.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={item.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          <Box
            className="overlay"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              p: 2,
              opacity: 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            <Typography variant="h6" noWrap>
              {item.name}
            </Typography>
            <Typography variant="body2">
              Giá: {item.price.toLocaleString()}đ
            </Typography>
          </Box>
        </Link>
      </Card>
    </MotionBox>
  );
};

export default ItemCard;
