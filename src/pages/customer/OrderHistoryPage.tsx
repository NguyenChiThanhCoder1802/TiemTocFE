import { useEffect, useState } from 'react';
import {
  Box, Typography, Card, CardContent, Divider
} from '@mui/material';
import { fetchMyOrders } from '../../api/OrderAPI';
import type { Order } from '../../types/Order';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchMyOrders();
        setOrders(data);
      } catch (err) {
        console.error('Lỗi khi tải đơn hàng:', err);
      }
    };
    loadOrders();
  }, []);

  return (
    <Box maxWidth={900} mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Lịch sử đơn hàng
      </Typography>

      {orders.length === 0 ? (
        <Typography>Không có đơn hàng nào.</Typography>
      ) : (
        orders.map(order => (
          <Card key={order.id} sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Đơn hàng #{order.id} - {new Date(order.orderDate).toLocaleDateString()}
              </Typography>
              <Typography color="text.secondary" mt={0.5}>
                Trạng thái: {order.status}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" flexWrap="wrap" gap={2}>
                {order.items.map(item => (
                  <Box
                    key={item.productId}
                    sx={{
                      flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' },
                      maxWidth: { sm: 'calc(50% - 8px)' },
                      display: 'flex',
                      alignItems: 'center',
                      p: 1,
                      border: '1px solid #eee',
                      borderRadius: 2,
                    }}
                  >
                    <img
                      src={item.imageUrl || 'https://via.placeholder.com/80x80?text=No+Image'}
                      alt={item.productName}
                      style={{
                        width: 64,
                        height: 64,
                        marginRight: 16,
                        objectFit: 'cover',
                        borderRadius: 8
                      }}
                    />
                    <Box>
                      <Typography fontWeight="medium">{item.productName}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.quantity} x {item.price.toLocaleString()}đ
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" fontWeight="bold">
                Tổng tiền: {order.totalPrice.toLocaleString()}đ
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default OrderHistoryPage;
