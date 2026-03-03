import { Box, Typography,Chip, Stack, Divider, type ChipProps } from '@mui/material'
import type { Booking } from '../../types/Booking/Booking'

interface Props {
  booking: Booking
}
const methodLabelMap: Record<
  NonNullable<Booking['paymentMethod']>,
  string
> = {
  vnpay: 'VNPay',
  momo: 'MoMo',
  cash: 'Tiền mặt'
}

const paymentStatusLabelMap = {
  unpaid: 'Chưa thanh toán',
  paid: 'Đã thanh toán',
  failed: 'Thanh toán thất bại'
}
type ChipColor = NonNullable<ChipProps['color']>

const paymentColorMap: Record<Booking['paymentStatus'], ChipColor> = {
  unpaid: 'warning',
  paid: 'success',
  failed: 'error'
}
export default function BookingPaymentCard({ booking }: Props) {
      const payment = booking.payment
  return (
     <Box
  sx={{
    p: 3,
    backgroundColor: '#fff',
    borderRadius: 1,
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
    transition: 'all 0.2s ease',
    '&:hover': {
      boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
    }
  }}
>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Thanh toán
      </Typography>

     <Stack spacing={1}>
  <Stack direction="row" justifyContent="space-between">
    <Typography>Tổng giá gốc</Typography>
    <Typography>
      {booking.price.original.toLocaleString('vi-VN')}đ
    </Typography>
  </Stack>

  {/* Giảm dịch vụ */}
  {booking.price.original > booking.price.afterServiceDiscount && (
    <Stack direction="row" justifyContent="space-between">
      <Typography color="warning.main">
        Giảm dịch vụ
      </Typography>
      <Typography color="warning.main">
        -{(
          booking.price.original -
          booking.price.afterServiceDiscount
        ).toLocaleString('vi-VN')}đ
      </Typography>
    </Stack>
  )}

  {/* Giảm mã giảm giá */}
  {booking.price.discountAmount > 0 && (
    <Stack direction="row" justifyContent="space-between">
      <Typography color="primary">
        Giảm giá
      </Typography>
      <Typography color="primary">
        -{booking.price.discountAmount.toLocaleString('vi-VN')}đ
      </Typography>
    </Stack>
  )}

      <Divider sx={{ my: 1 }} />

      <Stack direction="row" justifyContent="space-between">
        <Typography fontWeight={700}>
          Tổng thanh toán
        </Typography>
        <Typography fontWeight={700} color="primary">
          {booking.price.final.toLocaleString('vi-VN')}đ
        </Typography>
      </Stack>
    </Stack>

       <Stack mt={2} spacing={1}>
        <Typography>
          Phương thức thanh toán:{' '}
          {booking.paymentMethod
            ? methodLabelMap[booking.paymentMethod]
            : 'Chưa thanh toán'}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" fontWeight={500}>
            Trạng thái thanh toán:
          </Typography>

          <Chip
            label={paymentStatusLabelMap[booking.paymentStatus]}
            color={paymentColorMap[booking.paymentStatus]}
            size="small"
            sx={{ width: 'fit-content' }}
          />
        </Stack>

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