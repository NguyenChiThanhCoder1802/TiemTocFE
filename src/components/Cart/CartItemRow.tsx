import { TableRow, TableCell, Box, Button, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { CartItem } from '../../types/Cart';

interface Props {
  item: CartItem;
  onRemove: (productId: number) => void;
  onQuantityChange: (productId: number, quantity: number) => void;
}

const CartItemRow = ({ item, onRemove, onQuantityChange }: Props) => (
  <TableRow>
    <TableCell>
      <img
        src={item.imageUrl || 'https://via.placeholder.com/80x80?text=No+Image'}
        alt={item.productName}
        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }}
      />
    </TableCell>
    <TableCell>{item.productName}</TableCell>
    <TableCell>{item.price.toLocaleString()}đ</TableCell>
    <TableCell>
      <Box display="flex" alignItems="center" gap={1}>
        <Button size="small" variant="outlined" onClick={() => onQuantityChange(item.productId, item.quantity - 1)}>-</Button>
        <Typography>{item.quantity}</Typography>
        <Button size="small" variant="outlined" onClick={() => onQuantityChange(item.productId, item.quantity + 1)}>+</Button>
      </Box>
    </TableCell>
    <TableCell>{(item.price * item.quantity).toLocaleString()}đ</TableCell>
    <TableCell>
      <IconButton color="error" onClick={() => onRemove(item.productId)}>
        <DeleteIcon />
      </IconButton>
    </TableCell>
  </TableRow>
);

export default CartItemRow;
