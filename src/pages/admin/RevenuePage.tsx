import  { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Divider,
} from '@mui/material';
import {
  fetchTotalRevenue,
  fetchRevenueByDay,
  fetchRevenueByMonth,
  fetchTotalBookingRevenue,
  fetchBookingRevenueByDay,
  fetchBookingRevenueByMonth,
  type RevenueByDay,
  type RevenueByMonth,
} from '../../api/RevenueAPI';

const RevenuePage = () => {
  const [total, setTotal] = useState<number>(0);
  const [byDay, setByDay] = useState<RevenueByDay[]>([]);
  const [byMonth, setByMonth] = useState<RevenueByMonth[]>([]);
  const [bookingTotal, setBookingTotal] = useState<number>(0);
  const [bookingByDay, setBookingByDay] = useState<RevenueByDay[]>([]);
  const [bookingByMonth, setBookingByMonth] = useState<RevenueByMonth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          totalRevenue,
          daily,
          monthly,
          totalBooking,
          bookingDaily,
          bookingMonthly,
        ] = await Promise.all([
          fetchTotalRevenue(),
          fetchRevenueByDay(),
          fetchRevenueByMonth(),
          fetchTotalBookingRevenue(),
          fetchBookingRevenueByDay(),
          fetchBookingRevenueByMonth(),
        ]);

        setTotal(totalRevenue);
        setByDay(daily);
        setByMonth(monthly);
        setBookingTotal(totalBooking);
        setBookingByDay(bookingDaily);
        setBookingByMonth(bookingMonthly);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Đã xảy ra lỗi không xác định');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        📊 Thống kê Doanh Thu
      </Typography>

      {/* Tổng doanh thu */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Tổng Doanh Thu Từ Đơn Hàng:</Typography>
          <Typography variant="h4" color="primary">
            {total.toLocaleString('vi-VN')} ₫
          </Typography>
        </CardContent>
      </Card>

      {/* Tổng doanh thu Booking */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Tổng Doanh Thu Từ Đặt Lịch:</Typography>
          <Typography variant="h4" color="secondary">
            {bookingTotal.toLocaleString('vi-VN')} ₫
          </Typography>
        </CardContent>
      </Card>

      {/* Doanh thu theo ngày */}
      <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Doanh Thu Đơn Hàng Theo Ngày
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Ngày</TableCell>
              <TableCell align="right">Tổng doanh thu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {byDay.map((item) => (
              <TableRow key={item.date}>
                <TableCell>{item.date}</TableCell>
                <TableCell align="right">
                  {item.total.toLocaleString('vi-VN')} ₫
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Doanh thu Booking theo ngày */}
      <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Doanh Thu Đặt Lịch Theo Ngày
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Ngày</TableCell>
              <TableCell align="right">Tổng doanh thu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookingByDay.map((item) => (
              <TableRow key={item.date}>
                <TableCell>{item.date}</TableCell>
                <TableCell align="right">
                  {item.total.toLocaleString('vi-VN')} ₫
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Doanh thu theo tháng */}
      <Paper elevation={3} sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Doanh Thu Đơn Hàng Theo Tháng
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Tháng</TableCell>
              <TableCell align="right">Tổng doanh thu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {byMonth.map((item) => (
              <TableRow key={`${item.year}-${item.month}`}>
                <TableCell>{`${item.month}/${item.year}`}</TableCell>
                <TableCell align="right">
                  {item.total.toLocaleString('vi-VN')} ₫
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Doanh thu Booking theo tháng */}
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Doanh Thu Đặt Lịch Theo Tháng
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Tháng</TableCell>
              <TableCell align="right">Tổng doanh thu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookingByMonth.map((item) => (
              <TableRow key={`${item.year}-${item.month}`}>
                <TableCell>{`${item.month}/${item.year}`}</TableCell>
                <TableCell align="right">
                  {item.total.toLocaleString('vi-VN')} ₫
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default RevenuePage;
