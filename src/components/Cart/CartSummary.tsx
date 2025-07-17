import { Box, Typography } from '@mui/material';

interface Props {
  total: number;
  discountPercentage: number;
  discountAmount?: number;
}

const CartSummary = ({ total, discountPercentage = 0, discountAmount = 0 }: Props) => {
  const discount = discountAmount > 0
    ? discountAmount
    : (total * discountPercentage) / 100;

  const finalTotal = Math.max(total - discount, 0);

  return (
    <Box>
      <Typography>Tạm tính: {total.toLocaleString()}₫</Typography>
      <Typography>
        Giảm giá: -{discount.toLocaleString()}₫
      </Typography>
      <Typography variant="h6">
        Thành tiền: {finalTotal.toLocaleString()}₫
      </Typography>
    </Box>
  );
};

export default CartSummary;
