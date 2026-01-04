import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { fetchMyBookings } from '../../../api/BookingAPI'
import type { Booking } from '../../../types/Booking/Booking'

const statusColorMap: Record<string, any> = {
  pending: 'warning',
  confirmed: 'info',
  completed: 'success',
  canceled: 'error'
}

export default function BookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMyBookings()
      .then(setBookings)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Typography>Đang tải...</Typography>

  if (!bookings.length)
    return <Typography>Chưa có lịch hẹn nào</Typography>

  return (
    <Box maxWidth={900} mx="auto">
      <Typography variant="h5" mb={2}>
        Lịch hẹn của tôi
      </Typography>

      {bookings.map(b => (
        <Card key={b._id} sx={{ mb: 2 }}>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontWeight={600}>
                {new Date(b.bookingDate).toLocaleString()}
              </Typography>

              <Chip
                label={b.status}
                color={statusColorMap[b.status]}
                size="small"
              />
            </Stack>

            <Stack spacing={1} mt={1}>
              {b.services.map((s, i) => (
                <Typography key={i}>
                  • {s.name} – {s.price.toLocaleString()}đ
                  {s.isCombo && ' (Combo)'}
                </Typography>
              ))}
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              mt={2}
            >
              <Typography>
                Tổng: <b>{b.finalPrice.toLocaleString()}đ</b>
              </Typography>

              <Chip
                label={b.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                color={b.isPaid ? 'success' : 'warning'}
                size="small"
              />
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
