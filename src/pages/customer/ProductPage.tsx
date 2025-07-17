import { useEffect, useState } from 'react';
import { addToCart, fetchProducts } from '../../api/apiService';
import type { Product } from '../../types/Product';
import { useSnackbar } from 'notistack';
import { useCart } from '../../hooks/useCart';
import ItemCardList from '../../components/List/ItemCardList';
const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { refreshCart } = useCart();
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

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId, 1);
      await refreshCart();

      enqueueSnackbar(' Đã thêm vào giỏ hàng', { variant: 'success',autoHideDuration: 1000});
    } catch{
      enqueueSnackbar('Lỗi khi thêm vào giỏ hàng', { variant: 'error' });
    }
    await refreshCart();
  };

  return (
          <ItemCardList
          items={products}
          title="Danh sách sản phẩm"
          linkPrefix="product"
          showActionButton
          actionLabel="Thêm vào giỏ"
          onActionClick={handleAddToCart}
        />
  );
};

export default ProductPage;
