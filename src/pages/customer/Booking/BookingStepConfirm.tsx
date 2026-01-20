import { Button, Stack, Typography, CircularProgress } from '@mui/material'
import { useEffect } from 'react'
import type { BookingEstimateContext } from '../../../types/Booking/BookingEstimateContext'


interface Props {
  booking: BookingEstimateContext
  onBack: () => void
}

const BookingStepConfirm = ({ booking, onBack }: Props) => {
  const { estimate, loading, runEstimate, draft } = booking

  useEffect(() => {
    if (
      draft.services.length > 0 &&
      draft.startTime &&
      !estimate &&
      !loading
    ) {
      runEstimate()
    }
  }, [
    draft.services,
    draft.startTime,
    estimate,
    loading,
    runEstimate
  ])

  if (loading || !estimate) {
    return (
      <Stack alignItems="center" mt={4}>
        <CircularProgress />
        <Typography>Đang tính toán...</Typography>
      </Stack>
    )
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h6">
        Tổng tiền:{' '}
        {estimate.pricing.totalPrice.toLocaleString('vi-VN')}đ
      </Typography>

      {estimate.time.endTime && (
        <Typography>
          Kết thúc lúc:{' '}
          {new Date(
            estimate.time.endTime
          ).toLocaleTimeString('vi-VN')}
        </Typography>
      )}

      <Stack direction="row" spacing={2}>
        <Button onClick={onBack}>Quay lại</Button>

        <Button
          variant="contained"
          color="success"
          onClick={async () => {
            await booking.confirm()
            booking.reset()
          }}
        >
          Xác nhận đặt lịch
        </Button>
      </Stack>
    </Stack>
  )
}

export default BookingStepConfirm
