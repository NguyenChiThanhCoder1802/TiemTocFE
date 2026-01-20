import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Stack,
  Typography,
  Box
} from '@mui/material'
import dayjs from 'dayjs'

import type { Booking } from '../../../types/Booking/Booking'


const BookingTable = ({ bookings }: { bookings: Booking[] }) => {
  if (bookings.length === 0) {
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={5} align="center">
              Không có lịch đặt
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Dịch vụ</TableCell>
          <TableCell>Nhân viên</TableCell>
          <TableCell>Thời gian</TableCell>
          <TableCell>Giá</TableCell>
          <TableCell>Trạng thái</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {bookings.map(booking => (
          <TableRow key={booking._id}>
            {/* SERVICES */}
            <TableCell>
              <Stack spacing={1}>
                {booking.services.map(service => (
                  <Stack
                    key={service._id}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <Avatar
                      src={service.images?.[0]}
                      variant="rounded"
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box>
                      <Typography fontWeight={500}>
                        {service.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {service.duration} phút
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </TableCell>

            {/* STAFF */}
            <TableCell>
              {booking.staff?.name || 'Chưa gán'}
            </TableCell>

            {/* TIME */}
            <TableCell>
              <Typography>
                {dayjs(booking.startTime).format('HH:mm')} -{' '}
                {dayjs(booking.endTime).format('HH:mm')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {dayjs(booking.bookingDate).format('DD/MM/YYYY')}
              </Typography>
            </TableCell>

            {/* PRICE */}
            <TableCell>
              <Typography fontWeight={600}>
                {booking.totalPrice.toLocaleString()}₫
              </Typography>
            </TableCell>

            {/* STATUS */}
            <TableCell>
              <BookingStatusChip
                status={booking.bookingStatus}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default BookingTable
