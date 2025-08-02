import { useEffect, useState } from 'react';
import {Box,Typography,Table,TableHead,TableRow,TableCell,TableBody,Divider,Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { removeFromCart, createOrderFromCart, updateCartItemQuantity } from '../../api/apiService';
import { applyDiscountCode } from '../../services/discountService';
import { useCart } from '../../hooks/useCart';
import type { CartItem } from '../../types/Cart';
import CartItemRow from '../../components/Cart/CartItemRow';
import DiscountSection from '../../components/Discount/DiscountSection';
import CartSummary from '../../components/Cart/CartSummary';
import type { Product } from '../../types/Product';
import ItemCardList from '../../components/List/ItemCardList';
import {fetchProducts} from '../../api/apiService';
const CartPage = () => {
  const { items, refreshCart, cartId } = useCart();
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [discountError, setDiscountError] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleRemove = async (productId: number) => {
    try {
      await removeFromCart(productId);
      await refreshCart();
    } catch {
      enqueueSnackbar('Không xóa được sản phẩm', { variant: 'error', autoHideDuration: 1000 });
    }
  };

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItemQuantity(productId, newQuantity);
      await refreshCart();
    } catch {
      enqueueSnackbar('Không load được', { variant: 'error', autoHideDuration: 1000 });
    }
  };

  const handleApplyDiscount = async () => {
  try {
    const result = await applyDiscountCode(discountCode.trim());

    // Nếu có giảm theo số tiền thì dùng, nếu không thì dùng phần trăm
    if (result.amount && result.amount > 0) {
      setDiscountAmount(result.amount);
      setDiscountPercentage(0);
      enqueueSnackbar(`Mã ${result.code} áp dụng thành công: Giảm ${result.amount.toLocaleString()}₫`, {
        variant: 'success',
        autoHideDuration: 1000,
      });
    } else {
      setDiscountPercentage(result.percentage);
      setDiscountAmount(0);
      enqueueSnackbar(`Mã ${result.code} áp dụng thành công: Giảm ${result.percentage}%`, {
        variant: 'success',
        autoHideDuration: 1000,
      });
    }

    setDiscountError('');
  } catch (err: unknown) {
    setDiscountPercentage(0);
    setDiscountAmount(0);
    if (err instanceof Error) {
      setDiscountError(err.message || 'Không thể áp dụng mã');
    } else {
      setDiscountError('Không thể áp dụng mã');
    }
  }
};
useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch{
        enqueueSnackbar('❌ Không tải được sản phẩm!', { variant: 'error',autoHideDuration: 1000, });
      }
    };
    load();
  }, [enqueueSnackbar]);

  const handleCheckout = async () => {
    if (!cartId) {
      alert('Không tìm thấy giỏ hàng để thanh toán.');
      return;
    }
    try {
      setIsLoading(true);
      const payload = {
        cartId,
        discountCode: discountCode.trim() || undefined,
      };
      const order = await createOrderFromCart(payload);
      enqueueSnackbar('Đã đặt hàng thành công', { variant: 'success', autoHideDuration: 1000 });
      await refreshCart();
      setTotal(0);
      setDiscountCode('');
      setDiscountPercentage(0);
      setDiscountAmount(0);

      navigate(`/my-orders/${order.id}`);
    } catch {
      enqueueSnackbar('Lỗi khi thanh toán', { variant: 'error', autoHideDuration: 1000 });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const totalAmount = items.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  }, [items]);
  return (
    <Box maxWidth={800} mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>
        Giỏ hàng của bạn
      </Typography>

      {items.length === 0 ? (
        <>
        <Typography variant="body1">Không có sản phẩm trong giỏ hàng.</Typography>
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/product')}
          >
            🛍️ Mua hàng ngay
          </Button>
        </Box>
         <ItemCardList
          items={products}
          title="Mua Ngay"
          linkPrefix="product"
         
        />
        </>
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
              {items.map((item) => (
                <CartItemRow
                  key={item.productId}
                  item={item}
                  onRemove={handleRemove}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </TableBody>
          </Table>

          <DiscountSection
            code={discountCode}
            error={discountError}
            onChange={setDiscountCode}
            onApply={handleApplyDiscount}
          />
          <Divider sx={{ my: 3 }} />
          <CartSummary total={total} discountPercentage={discountPercentage} discountAmount={discountAmount} />
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              disabled={items.length === 0 || isLoading}
              onClick={handleCheckout}
            >
              {isLoading ? 'Đang xử lý...' : 'Thanh toán'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
export default CartPage;
