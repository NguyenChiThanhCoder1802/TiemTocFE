import { Box, Typography, Stack, Chip, Divider } from '@mui/material'
import type { Booking } from '../../types/Booking/Booking'
import type { ChipProps } from '@mui/material'

type ChipColor = NonNullable<ChipProps['color']>

const statusColorMap: Record<Booking['status'], ChipColor> = {
  pending: 'warning',
  confirmed: 'info',
  in_progress:"info",
  completed: 'success',
  cancelled: 'error',
  no_show: 'error'
}

const statusLabelMap: Record<Booking['status'], string> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  in_progress: "Đang thực hiện",
  completed: "Hoàn thành",
  cancelled: "Đã huỷ",
  no_show: "Không đến"
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
        Thông tin khách đặt lịch
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
          <Typography fontWeight={600}>
            Trạng thái lịch của bạn:
          </Typography>
        <Chip
          label={statusLabelMap[booking.status]}
          color={statusColorMap[booking.status]}
        />
      </Stack>
      </Stack>
    </Box>
  )
}