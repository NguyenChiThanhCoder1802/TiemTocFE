import { Box, Typography, List, ListItem, Divider, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInvoice } from '../api/invoiceApi'; // 👈 API bạn cần có

interface InvoiceItem {
  serviceName: string;
  price: number;
  source?: string;
}

const isInvoiceItem = (item: unknown): item is InvoiceItem => {
  if (typeof item === 'object' && item !== null) {
    const obj = item as Record<string, unknown>;
    return typeof obj.serviceName === 'string' && typeof obj.price === 'number';
  }
  return false;
};

const InvoicePreviewPage = () => {
  const navigate = useNavigate();
  const rawItems = JSON.parse(localStorage.getItem('invoice-items') || '[]');
  const items: InvoiceItem[] = rawItems.filter(isInvoiceItem);
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (items.length === 0) {
      alert('Hóa đơn trống!');
      return;
    }

    setLoading(true);

    try {
      const customerName = localStorage.getItem('email') || 'unknown@example.com';

      await createInvoice({
        customerName,
        discountCode: '',
        items: items.map(item => ({
          serviceName: item.serviceName,
          price: item.price,
        })),
      });

      alert('✅ Đã thanh toán thành công!');
      localStorage.removeItem('invoice-items');
      navigate('/'); // hoặc navigate tới trang hóa đơn
    } catch {
      alert('❌ Lỗi khi thanh toán!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to right bottom, #e0f7fa, #ff7043)'
    }}>
      <Box sx={{
        width: 400,
        backgroundColor: '#fff',
        borderRadius: 3,
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        p: 4,
        textAlign: 'center'
      }}>
        <Typography variant="h5" gutterBottom>
          🧾 Hóa đơn tạm thời
        </Typography>
        <List>
          {items.map((item, index) => (
            <Box key={index}>
              <ListItem>
                {item.serviceName} - {item.price.toLocaleString()} VNĐ
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Tổng cộng: {total.toLocaleString()} VNĐ
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          fullWidth
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : '💰 Thanh toán'}
        </Button>
      </Box>
    </Box>
  );
};

export default InvoicePreviewPage;
