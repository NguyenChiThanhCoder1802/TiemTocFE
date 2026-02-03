import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Stack,
  Chip,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Divider
} from '@mui/material'

import {
  getBookingDetail,
  cancelBooking
} from '../../api/BookingAPI'

import type { Booking, BookingStatus } from '../../types/Booking/Booking'
import type { ChipProps } from '@mui/material'


type ChipColor = NonNullable<ChipProps['color']>

/* ===== STATUS COLOR ===== */
const statusColorMap: Record<BookingStatus, ChipColor> = {
  pending: 'warning',
  confirmed: 'info',
  completed: 'success',
  cancelled: 'error'
}

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)

  /* ===== CANCEL ===== */
  const [openCancel, setOpenCancel] = useState(false)
  const [canceling, setCanceling] = useState(false)

  /* ===== TOAST ===== */
  const [toastOpen, setToastOpen] = useState(false)

  /* ===== FETCH ===== */
  useEffect(() => {
    if (!id) return

    getBookingDetail(id)
      .then(setBooking)
      .finally(() => setLoading(false))
  }, [id])

  /* ===== CANCEL HANDLER ===== */
  const handleCancel = async () => {
    if (!booking) return

    try {
      setCanceling(true)
      const updated = await cancelBooking(booking._id)
      setBooking(updated)
      setToastOpen(true)
    } finally {
      setCanceling(false)
      setOpenCancel(false)
    }
  }

  /* ===== LOADING ===== */
  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    )
  }

  if (!booking) {
    return (
      <Container sx={{ mt: 6 }}>
        <Typography>Không tìm thấy booking</Typography>
      </Container>
    )
  }

  /* ===== RENDER ===== */
  return (
    <Container sx={{ mt: 6 }}>
      <Stack spacing={3}>
        {/* ===== HEADER ===== */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" fontWeight={700}>
            Chi tiết đặt lịch
          </Typography>

          <Chip
            label={booking.status}
            color={statusColorMap[booking.status]}
          />
        </Stack>

        <Divider />

        {/* ===== TIME ===== */}
        <Box>
          <Typography fontWeight={600}>Thời gian</Typography>
          <Typography>
            {new Date(booking.startTime).toLocaleString('vi-VN')}
          </Typography>
        </Box>

        {/* ===== STAFF ===== */}
        <Box>
          <Typography fontWeight={600}>Nhân viên</Typography>
          <Typography>
            {booking.staff?.user?.name ?? 'Chưa gán'}
          </Typography>
        </Box>

        {/* ===== SERVICES / COMBO ===== */}
        <Box>
          <Typography fontWeight={600}>
            {booking.bookingType === 'service'
              ? 'Dịch vụ'
              : 'Combo'}
          </Typography>

          {booking.bookingType === 'service' &&
            booking.services.map(s => (
                <Typography
                key={s.service._id}
                variant="body2"
                sx={{
                    cursor: 'pointer',
                    color: 'primary.main',
                    '&:hover': { textDecoration: 'underline' }
                }}
                onClick={() =>
                    navigate(`/services/${s.service._id}`)
                }
                >
                • {s.service.name} ({s.service.duration} phút)
                </Typography>
            ))}


          {booking.bookingType === 'combo' && (
            <Typography>
              {booking.combo?.name} (
              {booking.combo?.duration} phút)
            </Typography>
          )}
        </Box>

        {/* ===== PRICE ===== */}
        <Box>
          <Typography fontWeight={600}>Thanh toán</Typography>
          <Typography>
            Giá gốc:{' '}
            {booking.price.original.toLocaleString('vi-VN')}đ
          </Typography>
          <Typography fontWeight={700}>
            Thành tiền:{' '}
            {booking.price.final.toLocaleString('vi-VN')}đ
          </Typography>
        </Box>

        {/* ===== NOTE ===== */}
        {booking.note && (
          <Box>
            <Typography fontWeight={600}>Ghi chú</Typography>
            <Typography>{booking.note}</Typography>
          </Box>
        )}

        {/* ===== ACTION ===== */}
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Quay lại
          </Button>

          {booking.status === 'pending' && (
            <Button
              color="error"
              variant="contained"
              onClick={() => setOpenCancel(true)}
            >
              Huỷ lịch
            </Button>
          )}
        </Stack>
      </Stack>

      {/* ===== CONFIRM DIALOG ===== */}
      <Dialog open={openCancel} onClose={() => setOpenCancel(false)}>
        <DialogTitle>Huỷ lịch đặt?</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn huỷ lịch này không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCancel(false)}>
            Đóng
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleCancel}
            disabled={canceling}
          >
            Xác nhận huỷ
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== TOAST ===== */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
      >
        <Alert severity="success" variant="filled">
          Huỷ lịch thành công
        </Alert>
      </Snackbar>
    </Container>
  )
}
