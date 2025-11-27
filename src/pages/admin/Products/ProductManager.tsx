import { useEffect, useState } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../../../api/productApi';
import { fetchCategories } from '../../../api/categoryApi';
import type { Product } from '../../../types/Product';
import type { Category } from '../../../types/Category';
import ProductTable from './ProductTable';
import ProductDialog from './ProductDialog';
import BackButton from '../../../components/Common/BackButton';
import { Button, Typography, Box } from '@mui/material';
import { useSnackbar } from 'notistack';

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  // ✅ Load dữ liệu ban đầu
  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() =>
        enqueueSnackbar('❌ Không thể tải sản phẩm', { variant: 'error', autoHideDuration: 2000 })
      );

    fetchCategories()
      .then(setCategories)
      .catch(() =>
        enqueueSnackbar('❌ Không thể tải danh mục', { variant: 'error', autoHideDuration: 2000 })
      );
  }, [enqueueSnackbar]);

  // ✅ Mở dialog thêm
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  // ✅ Mở dialog sửa
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleClose = () => setDialogOpen(false);

  // ✅ Thêm
  const handleCreate = async (productData: Omit<Product, 'id' | 'imageUrl'>) => {
    try {
      const created = await addProduct(productData);
      setProducts((prev) => [...prev, created]);
      enqueueSnackbar('✅ Thêm sản phẩm thành công!', { variant: 'success' });
      handleClose();
    } catch{
      enqueueSnackbar('❌ Lỗi khi thêm sản phẩm', { variant: 'error' });
    }
  };

  // ✅ Cập nhật
  const handleUpdate = async (productData: Product) => {
    try {
      const updated = await updateProduct(productData);
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      enqueueSnackbar('✅ Cập nhật thành công!', { variant: 'success' });
      handleClose();
    } catch{
      enqueueSnackbar('❌ Cập nhật thất bại!', { variant: 'error' });
    }
  };

  // ✅ Xóa
  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xoá sản phẩm này?')) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      enqueueSnackbar('🗑️ Xóa sản phẩm thành công!', { variant: 'success' });
    } catch{
      enqueueSnackbar('❌ Không thể xóa sản phẩm!', { variant: 'error' });
    }
  };

  return (
    <Box>
      <BackButton />
      <Typography variant="h4" gutterBottom>
        Quản lý Sản phẩm
      </Typography>

      <Button variant="contained" color="primary" onClick={handleOpenAdd} sx={{ mb: 2 }}>
        + Thêm sản phẩm
      </Button>

      <ProductTable
        products={products}
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductDialog
        open={dialogOpen}
        categories={categories}
        editingProduct={editingProduct}
        onClose={handleClose}
        onSubmit={editingProduct ? handleUpdate : handleCreate}
      />

    </Box>
  );
};

export default ProductManager;
