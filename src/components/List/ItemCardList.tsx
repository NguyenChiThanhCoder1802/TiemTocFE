import { Box, Typography } from '@mui/material';
import ItemCard from './ItemCard';

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
  linkPrefix: string;
  onDragToBook?: (serviceId: number) => void;
}

const ItemCardList = ({ items, title, linkPrefix,onDragToBook  }: Props) => {
  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" align="center">
        {title}
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
        {items.map((item, index) => (
          <ItemCard key={item.id} item={item} index={index} linkPrefix={linkPrefix} onDragToBook={onDragToBook} />
        ))}
        
      </Box>
    </Box>
    
  );
};

export default ItemCardList;
