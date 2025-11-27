import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addToCart, fetchProducts } from '../../api/apiService';
import type { Product } from '../../types/Product';
import { useSnackbar } from 'notistack';
import { useCart } from '../../hooks/useCart';
import ProductList from '../../components/Products/ProductList';

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { refreshCart } = useCart();
  const location = useLocation();

  const selectedCategoryId = location.state?.selectedCategoryId as number | null;

  // 🔹 Load tất cả sản phẩm
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch {
        enqueueSnackbar('❌ Không tải được sản phẩm!', {
          variant: 'error',
          autoHideDuration: 1000,
        });
      }
    };
    load();
  }, [enqueueSnackbar]);

  // 🔹 Lọc sản phẩm theo danh mục nếu có
  useEffect(() => {
    if (selectedCategoryId != null) {
      const filtered = products.filter(p => p.categoryId === selectedCategoryId);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, selectedCategoryId]);

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId, 1);
      await refreshCart();
      enqueueSnackbar('✅ Đã thêm vào giỏ hàng', {
        variant: 'success',
        autoHideDuration: 1000,
      });
    } catch {
      enqueueSnackbar('❌ Lỗi khi thêm vào giỏ hàng', {
        variant: 'error',
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <ProductList
      items={filteredProducts}
      title="Danh sách sản phẩm"
      linkPrefix="product"
      showActionButton
      actionLabel="Thêm vào giỏ"
      onActionClick={handleAddToCart}
    />
  );
};

export default ProductPage;
