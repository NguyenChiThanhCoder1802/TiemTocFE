import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Divider,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchCart, removeFromCart, createOrderFromCart, updateCartItemQuantity } from '../../api/apiService';
import { applyDiscountCode } from '../../services/discountService';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const CartPage = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [cartId, setCartId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountError, setDiscountError] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  const loadCart = async () => {
    try {
      const data = await fetchCart();
      setItems(data.items);
      setCartId(data.id);

      const totalAmount = data.items.reduce(
        (sum: number, item: CartItem) => sum + item.price * item.quantity,
        0
      );
      setTotal(totalAmount);
    } catch (err) {
      console.error('Lỗi khi tải giỏ hàng:', err);
    }
  };

  const handleRemove = async (productId: number) => {
    try {
      await removeFromCart(productId);
      await loadCart();
    } catch (err) {
      console.error('Lỗi khi xóa sản phẩm:', err);
    }
  };
  const handleQuantityChange = async (productId: number, newQuantity: number) => {
  if (newQuantity < 1) return;

  try {
    await updateCartItemQuantity(productId, newQuantity);
    await loadCart();
  } catch (err) {
    console.error('Lỗi khi cập nhật số lượng:', err);
    enqueueSnackbar(`Không load được`, { variant: 'error' });

  }
};

  const handleApplyDiscount = async () => {
    try {
      const result = await applyDiscountCode(discountCode.trim());
      setDiscountPercentage(result.percentage);
      setDiscountError('');
      enqueueSnackbar(`✅ Mã ${result.code} áp dụng thành công: Giảm ${result.percentage}%`, { variant: 'success' });

    }  catch (err: unknown) {
  setDiscountPercentage(0);

  if (err instanceof Error) {
    setDiscountError(err.message || 'Không thể áp dụng mã');
  } else {
    setDiscountError('Không thể áp dụng mã');
  }
}

  };

  const discountedTotal = total - (total * discountPercentage) / 100;
 const handleCheckout = async () => {
  if (!cartId) {
    alert("Không tìm thấy giỏ hàng để thanh toán.");
    return;
  }
  try {
    setIsLoading(true);

    const payload = {
      cartId,
      discountCode: discountCode.trim() || undefined,
    };

    const order = await createOrderFromCart(payload);

    enqueueSnackbar(`Đã đặt hành thành công`, { variant: 'success' });


    // Reset sau khi đặt hàng
    setItems([]);
    setTotal(0);
    setCartId(null);
    setDiscountCode('');
    setDiscountPercentage(0);

    navigate(`/orders/${order.id}`);
  } catch (err) {
    console.error("Lỗi khi thanh toán:", err);
    enqueueSnackbar(`Lỗi khi thanh toán`, { variant: 'error' });

  } finally {
    setIsLoading(false);
  }
};
  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Box maxWidth={800} mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>Giỏ hàng của bạn</Typography>

      {items.length === 0 ? (
        <Typography variant="body1">Không có sản phẩm trong giỏ hàng.</Typography>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Giá</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Thành tiền</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item => (
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
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                      >-</Button>
                      <Typography>{item.quantity}</Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                      >+</Button>
                    </Box>
                  </TableCell>

                  <TableCell>{(item.price * item.quantity).toLocaleString()}đ</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleRemove(item.productId)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* --- Áp dụng mã giảm giá --- */}
          <Box mt={3} display="flex" gap={2} alignItems="center">
            <TextField
              label="Mã giảm giá"
              variant="outlined"
              size="small"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              error={!!discountError}
              helperText={discountError}
            />
            <Button variant="outlined" onClick={handleApplyDiscount}>
              Áp dụng
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box>
            <Typography variant="body1">
              Tổng tiền gốc: {total.toLocaleString()}đ
            </Typography>

            {discountPercentage > 0 && (
              <Typography variant="body1" color="green">
                Đã giảm: {discountPercentage}% ({(total * discountPercentage / 100).toLocaleString()}đ)
              </Typography>
            )}

            <Typography variant="h6" sx={{ mt: 1 }}>
              Tổng thanh toán: {discountedTotal.toLocaleString()}đ
            </Typography>
          </Box>

          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              disabled={items.length === 0 || isLoading}
              onClick={handleCheckout}
            >
              {isLoading ? "Đang xử lý..." : "Thanh toán"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartPage;
