import { useEffect, useState } from 'react';
import {Box,Typography, Card,CardContent,Avatar,Stack,CircularProgress,} from '@mui/material';
import { fetchMyBookings } from '../../services/bookingService';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VideoCallIcon from '@mui/icons-material/VideoCall';
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
        Lịch sử đặt lịch
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : bookings.length === 0 ? (
        <Typography>Không có lịch sử đặt lịch.</Typography>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={3} mt={2}>
          {bookings.map((booking) => (
            <Box
              key={booking.id}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' }, // chia 2 cột trên sm+
                maxWidth: { xs: '100%', sm: 'calc(50% - 12px)' },
              }}
            >
              <Card onClick={() => navigate(`/booking/${booking.id}`)}
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 6,
                  },
                }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: '#1976d2' }}>
                      {booking.services.some((s) =>
                        s.name.toLowerCase().includes('online')
                      ) ? (
                        <VideoCallIcon /> 
                      ) : (
                        <CalendarTodayIcon />
                      )}
                    </Avatar>

                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Đặt lịch
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {booking.services.map((s) => s.name).join(', ')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={0.5}>
                        {dayjs(booking.date).format('DD/MM/YYYY')} - {booking.time}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Trạng thái: {booking.status}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default BookingHistoryPage;
