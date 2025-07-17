import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Box, Typography, Table, TableHead, TableRow, TableCell,TableBody, Divider} from '@mui/material';
import axios from 'axios';

interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

interface Order {
  id: number;
  userId: string;
  orderDate: string;
  totalPrice: number;
  status: string;
  items: OrderItem[];
}

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/order/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Lỗi khi tải đơn hàng:", err);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  if (!order) return <Typography>Đang tải đơn hàng...</Typography>;

  return (
    <Box maxWidth={800} mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>Chi tiết đơn hàng #{order.id}</Typography>
      <Typography>Ngày đặt: {new Date(order.orderDate).toLocaleString()}</Typography>
      <Typography>Trạng thái: {order.status}</Typography>
      <Divider sx={{ my: 2 }} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Hình ảnh</TableCell>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Giá</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Thành tiền</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.items.map(item => (
            <TableRow key={item.productId}>
              <TableCell>
                <img
                  src={item.imageUrl || 'https://via.placeholder.com/80x80?text=No+Image'}
                  alt={item.productName}
                  style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }}
                />
              </TableCell>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.price.toLocaleString()}đ</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{(item.price * item.quantity).toLocaleString()}đ</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Tổng cộng: {order.totalPrice.toLocaleString()}đ</Typography>
    </Box>
  );
};

export default OrderDetailPage;
