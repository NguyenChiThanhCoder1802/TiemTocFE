import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Stack,
  Alert,
  CircularProgress
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'

import BookingDetailResult from '../BookingReturn/BookingDetailResult.tsx'
import { useBookingDetail } from '../../../hooks/useBookingDetail.ts'
import { useMyLatestBooking } from '../../../hooks/useMyLatestBooking.ts'

export default function PaymentResultPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const status =
    (params.get('status') as
      | 'success'
      | 'failed'
      | 'error') || 'error'

  const bookingId = params.get('bookingId')

  const isSuccess = status === 'success'
  const {
    booking: bookingById,
    loading: loadingById
  } = useBookingDetail(bookingId)

  const {
    booking: latestBooking,
    loading: loadingLatest
  } = useMyLatestBooking(!bookingId && isSuccess)

  const booking = bookingById || latestBooking
  const loading = loadingById || loadingLatest

  /* ===== GUARD ===== */
  useEffect(() => {
    if (!status) navigate('/')
  }, [status, navigate])

  return (
    <Box maxWidth={720} mx="auto" mt={6}>
      {/* ===== RESULT ALERT ===== */}
      <Alert
        severity={isSuccess ? 'success' : 'error'}
        icon={
          isSuccess ? (
            <CheckCircleIcon />
          ) : (
            <ErrorIcon />
          )
        }
        sx={{ mb: 3 }}
      >
        <Typography fontWeight={600}>
          {isSuccess
            ? 'Thanh toán thành công '
            : 'Thanh toán thất bại'}
        </Typography>
        <Typography variant="body2">
          {isSuccess
            ? 'Booking của bạn đã được xác nhận.'
            : 'Giao dịch không thành công hoặc đã bị huỷ.'}
        </Typography>
      </Alert>

      {/* ===== BOOKING DETAIL ===== */}
      {loading && <CircularProgress />}

      {!loading && booking && (
        <BookingDetailResult
          booking={booking}
          showRetry={!isSuccess}
        />
      )}

      {!loading && !booking && isSuccess && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          Không tìm thấy thông tin booking.
        </Alert>
      )}

      {/* ===== ACTIONS ===== */}
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        mt={4}
      >
        <Button
          variant="outlined"
          onClick={() => navigate('/my-bookings')}
        >
          Lịch sử booking
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate('/')}
        >
          Về trang chủ
        </Button>
      </Stack>
    </Box>
  )
}
