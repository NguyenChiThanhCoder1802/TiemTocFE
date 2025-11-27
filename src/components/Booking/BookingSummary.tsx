// Tính tổng tiền dịch vụ
import { Typography } from '@mui/material';

interface Props {
  total: number;
}

const BookingSummary = ({ total }: Props) => (
  <Typography
    variant="h6"
    sx={{ mt: 2, fontWeight: 'bold', color: 'primary.main', textAlign: 'right' }}
  >
    Tổng tiền: {total.toLocaleString()}đ
  </Typography>
);

export default BookingSummary;