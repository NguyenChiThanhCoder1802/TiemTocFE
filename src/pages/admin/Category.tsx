import { Box, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../../api/categoryApi';
import CategoryForm from './components/Category/CategoryForm';
import CategoryTable from './components/Category/CategoryTable';
import type { Category } from '../../types/Category';
import { useSnackbar } from 'notistack';

const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState({ name: '', type: 'Product' });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // Dùng cho dialog xác nhận xoá
  const [openConfirm, setOpenConfirm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  //Load danh mục khi mở trang
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() =>
        enqueueSnackbar('❌ Không thể tải danh mục', { variant: 'error', autoHideDuration: 2000 })
      );
  }, [enqueueSnackbar]);

  //Thêm danh mục
  const handleAdd = async () => {
    if (!newCategory.name.trim()) {
      enqueueSnackbar('Vui lòng nhập tên danh mục', { variant: 'warning', autoHideDuration: 2000 });
      return;
    }

    try {
      const added = await addCategory(newCategory);
      setCategories((prev) => [...prev, added]);
      setNewCategory({ name: '', type: 'Product' });
      enqueueSnackbar('Thêm danh mục thành công', { variant: 'success', autoHideDuration: 2000 });
    } catch {
      enqueueSnackbar('Không thể thêm danh mục', { variant: 'error', autoHideDuration: 2000 });
    }
  };

  //Cập nhật danh mục
  const handleUpdate = async () => {
    if (!editingCategory) return;
    try {
      const updated = await updateCategory(editingCategory.id, editingCategory);
      setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setEditingCategory(null);
      enqueueSnackbar('Cập nhật danh mục thành công', { variant: 'success', autoHideDuration: 2000 });
    } catch {
      enqueueSnackbar('Không thể cập nhật danh mục', { variant: 'error', autoHideDuration: 2000 });
    }
  };

  // Mở dialog xác nhận xoá
  const confirmDelete = (id: number) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  //Thực hiện xoá danh mục sau khi xác nhận
  const handleConfirmDelete = async () => {
    if (selectedId === null) return;
    try {
      await deleteCategory(selectedId);
      setCategories((prev) => prev.filter((c) => c.id !== selectedId));
      enqueueSnackbar('Xoá danh mục thành công', { variant: 'info', autoHideDuration: 2000 });
    } catch {
      enqueueSnackbar('Không thể xoá danh mục', { variant: 'error', autoHideDuration: 2000 });
    } finally {
      setOpenConfirm(false);
      setSelectedId(null);
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#fefcf9', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom>
        📁 Quản lý danh mục
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <CategoryForm newCategory={newCategory} setNewCategory={setNewCategory} onAdd={handleAdd} />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <CategoryTable
          categories={categories}
          editingCategory={editingCategory}
          setEditingCategory={setEditingCategory}
          onUpdate={handleUpdate}
          onDelete={confirmDelete} 
        />
      </Paper>

      {/*Dialog xác nhận xoá */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Xác nhận xoá</DialogTitle>
        <DialogContent>Bạn có chắc chắn muốn xoá danh mục này không?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="inherit">
            Hủy
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Xoá
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryManager;
