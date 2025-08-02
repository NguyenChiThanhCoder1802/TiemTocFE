import { useEffect, useState } from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell,Typography, Dialog, DialogTitle, DialogContent,DialogActions, Button, Select, MenuItem} from '@mui/material';
import {fetchAllBookings,deleteBookingById,updateBookingStatus} from '../../services/bookingService';

interface Booking {
  id: number;
  customerName: string;
  appointmentTime: string;
  services: {
    id: number;
    name: string;
    description?: string;
    price: number;
  }[];
  combos: Combo[];
  status: string;
}
interface Combo {
  id: number;
  name: string;
  description?: string;
  originalPrice: number;
  discountedPrice: number;
  imageUrl?: string | null;
}
const BookingManager = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    try {
      const data = await fetchAllBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
      alert('Lỗi khi tải danh sách đặt lịch!');
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedId !== null) {
        await deleteBookingById(selectedId);
        setOpen(false);
        fetchData();
      }
    } catch (err) {
      console.error(err);
      alert('Xóa không thành công!');
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateBookingStatus(id, newStatus);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Cập nhật trạng thái thất bại!');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Quản lý Đặt lịch
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Khách hàng</TableCell>
            <TableCell>Dịch vụ</TableCell>
            <TableCell>Tổng tiền</TableCell>
            <TableCell>Thời gian</TableCell>
            <TableCell>Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map(b => (
            <TableRow key={b.id}>
              <TableCell>{b.customerName}</TableCell>
              <TableCell>
  <div>
    {b.services.map(s => s.name).join(', ')}
  </div>
  {b.combos.length > 0 && (
    <div style={{ fontStyle: 'italic', color: '#555' }}>
      Combo: {b.combos.map(c => c.name).join(', ')}
    </div>
  )}
</TableCell>

              <TableCell>
  {(
    b.services.reduce((total, s) => total + s.price, 0) +
    b.combos.reduce((total, c) => total + c.discountedPrice, 0)
  ).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
</TableCell>

              <TableCell>{new Date(b.appointmentTime).toLocaleString()}</TableCell>
              <TableCell>
                <Select
                  value={b.status || ''}
                  size="small"
                  onChange={(e) => handleStatusChange(b.id, e.target.value)}
                >
              
                  <MenuItem value="Đã hoàn thành">Đã hoàn thành</MenuItem>
                  <MenuItem value="Đã hủy">Đã hủy</MenuItem>
                </Select>
              </TableCell>
              <TableCell>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>Bạn có chắc muốn xóa lịch đặt này?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Huỷ</Button>
          <Button onClick={handleDelete} color="error">Xóa</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BookingManager;
