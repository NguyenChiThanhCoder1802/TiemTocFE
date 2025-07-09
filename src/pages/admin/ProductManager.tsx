import {Box,Table,TableHead,TableRow,TableCell,TableBody,Paper,Typography,IconButton,TextField,Button,Stack,} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../../api/productApi';
import { useEffect, useState } from 'react';
import type { Product } from '../../types/Product';

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    description: '',
    imageFile: null as File | null,
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const token = localStorage.getItem('token');

  const handleEditClick = (product: Product) => {
    setEditingProduct({ ...product });
  };

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err: unknown) => {
        if (err instanceof Error) {
          alert('❌ Không thể tải sản phẩm: ' + err.message);
        }
      });
  }, []);

  const handleAdd = async () => {
    if (!token) return;
    try {
      const p = await addProduct(newProduct, token);
      setProducts((prev) => [...prev, p]);
      setNewProduct({ name: '', price: 0, description: '', imageFile: null });
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert('❌ Không thể thêm sản phẩm: ' + err.message);
      } else {
        alert('❌ Lỗi không xác định khi thêm sản phẩm.');
      }
    }
  };

  const handleUpdate = async () => {
    if (!editingProduct || !token) return;
    try {
      const updated = await updateProduct(editingProduct, token);
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      setEditingProduct(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert('❌ Không thể cập nhật: ' + err.message);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    try {
      await deleteProduct(id, token);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert('❌ Không thể xóa sản phẩm: ' + err.message);
      }
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #fff4e6, #ffe0cc)',
        minHeight: '100vh',
        py: 4,
        px: 2,
        overflowX: 'hidden',
      }}
    >
      <Box sx={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
            justifyContent: 'center',
          }}
        >
          <Box component="span" mr={1}>
            📦
          </Box>
          Quản lý sản phẩm
        </Typography>

        {/* Bảng sản phẩm */}
        <Paper elevation={4} sx={{ mb: 4, borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
              <TableRow>
                <TableCell><strong>Tên</strong></TableCell>
                <TableCell><strong>Giá</strong></TableCell>
                <TableCell><strong>Mô tả</strong></TableCell>
                <TableCell><strong>Ảnh</strong></TableCell>
                <TableCell><strong>Hành động</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    {editingProduct?.id === p.id ? (
                      <TextField
                        value={editingProduct.name}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      p.name
                    )}
                  </TableCell>

                  <TableCell>
                    {editingProduct?.id === p.id ? (
                      <TextField
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            price: +e.target.value,
                          })
                        }
                      />
                    ) : (
                      p.price.toLocaleString() + ' VNĐ'
                    )}
                  </TableCell>

                  <TableCell>
                    {editingProduct?.id === p.id ? (
                      <TextField
                        value={editingProduct.description}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            description: e.target.value,
                          })
                        }
                        multiline
                        rows={2}
                      />
                    ) : (
                      p.description
                    )}
                  </TableCell>

                  <TableCell>
                    {editingProduct?.id === p.id ? (
                      <>
                        <Button variant="contained" component="label" size="small">
                          Chọn ảnh
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              if (file) {
                                setEditingProduct((prev) =>
                                  prev && { ...prev, imageFile: file }
                                );
                              }
                            }}
                          />
                        </Button>
                        <Typography variant="body2">
                          {editingProduct.imageFile?.name}
                        </Typography>
                        {editingProduct.imageFile ? (
                          <img
                            src={URL.createObjectURL(editingProduct.imageFile)}
                            alt="Xem trước"
                            width="80"
                            style={{ borderRadius: 8, marginTop: 8 }}
                          />
                        ) : editingProduct.imageUrl ? (
                          <img
                            src={editingProduct.imageUrl}
                            alt="Ảnh hiện tại"
                            width="80"
                            style={{ borderRadius: 8, marginTop: 8 }}
                          />
                        ) : (
                          <Typography variant="body2">Không có ảnh</Typography>
                        )}
                      </>
                    ) : p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        width="80"
                        style={{ borderRadius: 8 }}
                      />
                    ) : (
                      'Không có'
                    )}
                  </TableCell>

                  <TableCell>
                    {editingProduct?.id === p.id ? (
                      <>
                        <Button onClick={handleUpdate} color="primary" size="small">
                          Lưu
                        </Button>
                        <Button
                          onClick={() => setEditingProduct(null)}
                          color="inherit"
                          size="small"
                        >
                          Huỷ
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => handleEditClick(p)} size="small">
                          Sửa
                        </Button>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(p.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        {/* Form thêm sản phẩm */}
        <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <AddIcon sx={{ mr: 1 }} /> Thêm sản phẩm mới
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Tên sản phẩm"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Giá"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: +e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Mô tả"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              fullWidth
              multiline
              rows={2}
            />
            <Button variant="contained" component="label">
              Chọn ảnh
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setNewProduct((prev) => ({ ...prev, imageFile: file }));
                }}
              />
            </Button>
            <Typography variant="body2" color="textSecondary">
              {newProduct.imageFile?.name}
            </Typography>
            {newProduct.imageFile && (
              <img
                src={URL.createObjectURL(newProduct.imageFile)}
                alt="Xem trước"
                style={{ width: 100, marginTop: 8, borderRadius: 8 }}
              />
            )}

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAdd}
              sx={{ alignSelf: 'flex-start' }}
            >
              Thêm sản phẩm
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProductManager;
