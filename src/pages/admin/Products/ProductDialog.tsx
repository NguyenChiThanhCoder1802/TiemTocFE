import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { Category } from '../../../types/Category';
import type { Product } from '../../../types/Product';

interface Props {
  open: boolean;
  categories: Category[];
  editingProduct: Product | null;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
}

const ProductDialog = ({ open, categories, editingProduct, onClose, onSubmit }: Props) => {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    categoryId: '',
    imageFile: null as File | null,
    imageUrl: '',
  });

  // ✅ Gán dữ liệu khi sửa
  useEffect(() => {
    if (editingProduct) {
      setProduct({
        name: editingProduct.name,
        price: editingProduct.price,
        description: editingProduct.description,
        categoryId: editingProduct.categoryId.toString(),
        imageFile: null,
        imageUrl: editingProduct.imageUrl || '',
      });
    } else {
      setProduct({
        name: '',
        price: 0,
        description: '',
        categoryId: '',
        imageFile: null,
        imageUrl: '',
      });
    }
  }, [editingProduct]);

  const handleChange = (field: string, value: string | number) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProduct((prev) => ({ ...prev, imageFile: file }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('description', product.description);
    formData.append('categoryId', product.categoryId);

    if (product.imageFile) {
      formData.append('imageFile', product.imageFile);
    }

    await onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Tên sản phẩm"
            value={product.name}
            onChange={(e) => handleChange('name', e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Giá"
            type="number"
            value={product.price}
            onChange={(e) => handleChange('price', +e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Mô tả"
            multiline
            rows={3}
            value={product.description}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
          />
          <TextField
            select
            label="Danh mục"
            value={product.categoryId}
            onChange={(e) => handleChange('categoryId', e.target.value)}
            fullWidth
            required
          >
            {categories
              .filter((cat) => cat.type === 'Product')
              .map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
          </TextField>

          {/* Ảnh */}
          <Box>
            <Button variant="contained" component="label" size="small">
              Chọn ảnh
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>
            <Typography variant="body2" mt={1}>
              {product.imageFile?.name || 'Không có ảnh được chọn'}
            </Typography>
            {(product.imageFile || product.imageUrl) && (
              <img
                src={
                  product.imageFile
                    ? URL.createObjectURL(product.imageFile)
                    : product.imageUrl
                }
                alt="preview"
                width="120"
                style={{ borderRadius: 8, marginTop: 8 }}
              />
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Hủy
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {editingProduct ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
