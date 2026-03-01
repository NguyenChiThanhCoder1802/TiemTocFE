import { Box, Typography, Stack, Chip, Divider } from '@mui/material'
import type { Booking } from '../../types/Booking/Booking'
import type { ChipProps } from '@mui/material'

type ChipColor = NonNullable<ChipProps['color']>

const statusColorMap: Record<Booking['status'], ChipColor> = {
  pending: 'warning',
  confirmed: 'info',
  completed: 'success',
  cancelled: 'error'
}

const paymentColorMap: Record<Booking['paymentStatus'], ChipColor> = {
  unpaid: 'warning',
  paid: 'success',
  failed: 'error'
}

interface Props {
  booking: Booking
}

export default function BookingInfoCard({ booking }: Props) {
  const customer =
    typeof booking.customer === 'string'
      ? null
      : booking.customer

  return (
    <Box p={3} border="1px solid #eee" borderRadius={3}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Thông tin đơn đặt lịch
      </Typography>

      <Stack spacing={1}>
        <Typography>
          <b>Khách hàng:</b> {customer?.name ?? '---'}
        </Typography>

        <Typography>
          <b>Email:</b> {customer?.email ?? '---'}
        </Typography>

        <Typography>
          <b>SĐT:</b> {customer?.phone ?? '---'}
        </Typography>

        <Typography>
          <b>Thời gian:</b>{' '}
          {new Date(booking.startTime).toLocaleString('vi-VN')}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Stack direction="row" spacing={2}>
          <Chip
            label={booking.status}
            color={statusColorMap[booking.status]}
          />

          <Chip
            label={booking.paymentStatus}
            color={paymentColorMap[booking.paymentStatus]}
          />
        </Stack>
      </Stack>
    </Box>
  )
}