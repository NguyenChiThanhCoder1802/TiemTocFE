import { Box, Typography, Stack } from '@mui/material'
import type { Booking } from '../../types/Booking/Booking'

interface Props {
  booking: Booking
}

export default function BookingServiceCard({ booking }: Props) {
  const isService = booking.bookingType === 'service'

  const firstImage =
    isService
      ? booking.services?.[0]?.imageSnapshot?.[0]
      : booking.comboSnapshot?.imageSnapshot?.[0]

  return (
    <Box p={3} border="1px solid #eee" borderRadius={3}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        {isService ? 'Dịch vụ đã đặt' : 'Combo đã đặt'}
      </Typography>

      <Stack direction="row" spacing={2}>
        {firstImage && (
          <Box
            component="img"
            src={firstImage}
            sx={{
              width: 120,
              height: 120,
              objectFit: 'cover',
              borderRadius: 2
            }}
          />
        )}

        <Stack spacing={1}>
          {isService &&
            booking.services.map(s => (
              <Box key={s.nameSnapshot}>
                <Typography fontWeight={600}>
                  {s.nameSnapshot}
                </Typography>

                <Typography variant="body2">
                  Thời lượng: {s.durationSnapshot} phút
                </Typography>

                <Typography variant="body2">
                  Giá: {s.priceSnapshot?.toLocaleString('vi-VN')}đ
                </Typography>
              </Box>
            ))}

          {!isService && booking.comboSnapshot && (
            <>
              <Typography fontWeight={600}>
                {booking.comboSnapshot.name}
              </Typography>

              <Typography variant="body2">
                Giá combo:{' '}
                {booking.comboSnapshot.comboPrice.toLocaleString('vi-VN')}đ
              </Typography>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}