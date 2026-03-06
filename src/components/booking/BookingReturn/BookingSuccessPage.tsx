import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { CircularProgress, Box, Typography, Alert } from '@mui/material'
import BookingDetailResult from './BookingDetailResult'
import { fetchBookingById } from '../../../api/BookingAPI'
import type { Booking } from '../../../types/Booking/Booking'

export default function BookingSuccessPage() {
  const { id } = useParams<{ id: string }>()
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const message = location.state?.message
  useEffect(() => {
    if (!id) return

    const load = async () => {
      const data = await fetchBookingById(id)
      setBooking(data)
      setLoading(false)
    }

    load()
  }, [id])

  if (loading) return <CircularProgress sx={{ mt: 6 }} />

  if (!booking)
    return <Typography color="error">Không tìm thấy booking</Typography>

  return (
    <>
    {message && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}
    <Box maxWidth={720} mx="auto" mt={4}>
      <Typography variant="h5" mb={3} fontWeight={600}>
        Đặt lịch thành công!
      </Typography>

      <BookingDetailResult booking={booking} />
    </Box>
    </>
  )
}