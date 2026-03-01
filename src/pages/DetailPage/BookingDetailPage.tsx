import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Stack,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material'

import {
  getBookingDetail,
  cancelBooking
} from '../../api/BookingAPI'

import type { Booking } from '../../types/Booking/Booking'

import BookingInfoCard from '../../components/BookingHistory/BookingInfoCard'
import BookingServiceCard from '../../components/BookingHistory/BookingServiceCard'
import BookingPaymentCard from '../../components/BookingHistory/BookingPaymentCard'

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [openCancel, setOpenCancel] = useState(false)
  const [canceling, setCanceling] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)

  /* ================= FETCH ================= */
  useEffect(() => {
    let mounted = true

    const fetchBooking = async () => {
      if (!id) return

      try {
        const data = await getBookingDetail(id)
        if (mounted) setBooking(data)
      } catch (err) {
        if (mounted) setError('Không thể tải dữ liệu')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchBooking()

    return () => {
      mounted = false
    }
  }, [id])

  /* ================= CANCEL ================= */
  const handleCancel = useCallback(async () => {
    if (!booking) return

    try {
      setCanceling(true)
      const updated = await cancelBooking(booking._id)
      setBooking(updated)
      setToastOpen(true)
    } catch {
      setError('Huỷ lịch thất bại')
    } finally {
      setCanceling(false)
      setOpenCancel(false)
    }
  }, [booking])

  /* ================= STATES ================= */

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Container sx={{ mt: 6 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    )
  }

  if (!booking) {
    return (
      <Container sx={{ mt: 6 }}>
        <Typography>Không tìm thấy booking</Typography>
      </Container>
    )
  }

  /* ================= RENDER ================= */

  return (
    <Container sx={{ mt: 6, mb: 8 }}>
      <Stack spacing={3}>

        {/* HEADER */}
        <Typography variant="h5" fontWeight={700}>
          Chi tiết đặt lịch
        </Typography>

        {/* CARDS */}
        <BookingInfoCard booking={booking} />
        <BookingServiceCard booking={booking} />
        <BookingPaymentCard booking={booking} />

        {/* ACTION */}
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

      {/* CANCEL DIALOG */}
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

      {/* SUCCESS TOAST */}
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