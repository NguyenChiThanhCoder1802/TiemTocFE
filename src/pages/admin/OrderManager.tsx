import { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, Select, MenuItem, FormControl, InputLabel, Paper
} from '@mui/material';
import { fetchAllOrders, updateOrderStatus} from '../../api/OrderAPI';
import type { Order } from '../../api/OrderAPI';
const statusOptions = ['Chờ xác nhận', 'Đã đóng gói', 'Đang vận chuyển', 'Đã giao', 'Đã huỷ'];

const OrderManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = async () => {
    try {
      const data = await fetchAllOrders();
      setOrders(data);
    } catch (err) {
      console.error('Lỗi khi tải đơn hàng:', err);
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      await loadOrders(); // Reload danh sách
    } catch (err) {
      console.error('Lỗi khi cập nhật trạng thái:', err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>Quản lý đơn hàng</Typography>

      {orders.length === 0 ? (
        <Typography>Không có đơn hàng nào.</Typography>
      ) : (
        orders.map(order => (
          <Paper key={order.id} elevation={3} sx={{ mb: 4, p: 2 }}>
            <Typography variant="subtitle1">
              🧾 Đơn hàng #{order.id} – {order.customerEmail}
            </Typography>
            <Typography>Ngày đặt: {new Date(order.orderDate).toLocaleString()}</Typography>
            <Typography>Tổng tiền: {order.totalPrice.toLocaleString()}đ</Typography>
            {order.discountCode && (
              <Typography color="success.main">
                🎁 Mã giảm giá đã dùng: <strong>{order.discountCode}</strong>
              </Typography>
            )}
            <FormControl fullWidth sx={{ mt: 2, maxWidth: 250 }}>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={order.status}
                label="Trạng thái"
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
              >
                {statusOptions.map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Table size="small" sx={{ mt: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Ảnh</TableCell>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Thành tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map(item => (
                  <TableRow key={item.productId}>
                    <TableCell>
                      <img
                        src={item.imageUrl || 'https://via.placeholder.com/60'}
                        alt={item.productName}
                        style={{ width: 50, height: 50, borderRadius: 4 }}
                      />
                    </TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price.toLocaleString()}đ</TableCell>
                    <TableCell>{(item.price * item.quantity).toLocaleString()}đ</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default OrderManager;
