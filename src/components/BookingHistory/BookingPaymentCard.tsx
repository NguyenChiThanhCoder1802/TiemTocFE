import { Box, Typography,Chip, Stack } from '@mui/material'
import type { Booking } from '../../types/Booking/Booking'

interface Props {
  booking: Booking
}
const methodLabelMap = {
  vnpay: 'VNPay',
  momo: 'MoMo',
  cash: 'Tiền mặt'
}

const paymentStatusLabelMap = {
  unpaid: 'Chưa thanh toán',
  paid: 'Đã thanh toán',
  failed: 'Thanh toán thất bại'
}
export default function BookingPaymentCard({ booking }: Props) {
      const payment = booking.payment
  return (
    <Box p={3} border="1px solid #eee" borderRadius={3}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Thanh toán
      </Typography>

      <Typography>
        Giá gốc:{' '}
        {booking.price.original.toLocaleString('vi-VN')}đ
      </Typography>

      <Typography fontWeight={700}>
        Thành tiền:{' '}
        {booking.price.final.toLocaleString('vi-VN')}đ
      </Typography>

       <Stack mt={2} spacing={1}>
        <Typography>
          Phương thức:{' '}
          {booking.paymentMethod
            ? methodLabelMap[booking.paymentMethod]
            : 'Chưa thanh toán'}
        </Typography>

        <Typography>
          Trạng thái:{' '}
          {paymentStatusLabelMap[booking.paymentStatus]}
        </Typography>

        {payment?.status === 'success' && (
          <Chip
            label="Giao dịch thành công"
            color="success"
            size="small"
          />
        )}

        {payment?.status === 'failed' && (
          <Chip
            label="Giao dịch thất bại"
            color="error"
            size="small"
          />
        )}
      </Stack>
    </Box>
  )
}