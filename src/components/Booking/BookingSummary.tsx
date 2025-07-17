import { Typography } from '@mui/material';

interface Props {
  total: number;
}

const BookingSummary = ({ total }: Props) => (
  <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
    Tổng tiền: {total.toLocaleString()}đ
  </Typography>
);

export default BookingSummary;
