import { useEffect, useState } from 'react';
import {
  Box, Typography, CircularProgress, Table, TableHead,
  TableBody, TableRow, TableCell, Paper 
} from '@mui/material';
import { fetchMyBookings } from '../../services/bookingService';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';
import dayjs from 'dayjs';
import type { Booking } from '../../types/Booking';
import { useNavigate } from 'react-router-dom';

const BookingHistoryPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMyBookings();
        setBookings(data);
      } catch (err) {
        console.error('Lỗi khi tải lịch sử đặt lịch:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <Box maxWidth="1000px" mx="auto" mt={4} px={2}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Lịch sử đặt lịch của bạn
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : bookings.length === 0 ? (
        <Typography>Không có lịch sử đặt lịch.</Typography>
      ) : (
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell></TableCell>
                <TableCell>Dịch vụ / Combo</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => {
                const serviceNames = booking.services?.map((s) => s.name) || [];
                const comboNames = booking.combos?.map((c) => `Combo: ${c.name}`) || [];
                const allItems = [...comboNames, ...serviceNames];

                return (
                  <TableRow
                    key={booking.id}
                    hover
                    onClick={() => navigate(`/booking/${booking.id}`)}
                    sx={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                  >
                    <TableCell>
                      {booking.status === 'Đã hoàn thành' ? (
                        <CheckCircleIcon sx={{ color: 'green' }} />
                      ) : booking.status === 'Cancelled' ? (
                        <CancelIcon sx={{ color: 'red' }} />
                      ) : (
                        <WarningIcon sx={{ color: 'orange' }} />
                      )}
                    </TableCell>

                    <TableCell>
                      {allItems.length > 0 ? allItems.join(', ') : 'Không có dịch vụ hoặc combo'}
                    </TableCell>

                    <TableCell>
                      {dayjs(booking.date).format('DD/MM/YYYY')} - {booking.time}
                    </TableCell>

                    <TableCell>{booking.status}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default BookingHistoryPage;
