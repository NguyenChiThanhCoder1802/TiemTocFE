import { Box, Typography, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../../api/categoryApi';
import CategoryForm from './components/Category/CategoryForm';
import CategoryTable from './components/Category/CategoryTable';
import type { Category } from '../../types/Category';
const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState({ name: '', type: 'Product' });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => alert('❌ Không thể tải danh mục'));
  }, []);

  const handleAdd = async () => {
    if (!token || !newCategory.name) return;
    try {
      const added = await addCategory(newCategory, token);
      setCategories((prev) => [...prev, added]);
      setNewCategory({ name: '', type: 'Product' });
    } catch {
      alert('❌ Không thể thêm danh mục');
    }
  };

  const handleUpdate = async () => {
    if (!token || !editingCategory) return;
    try {
      const updated = await updateCategory(editingCategory.id, editingCategory, token);
      setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setEditingCategory(null);
    } catch {
      alert('❌ Không thể cập nhật danh mục');
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    try {
      await deleteCategory(id, token);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert('❌ Không thể xoá danh mục');
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#fefcf9', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom>📁 Quản lý danh mục</Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <CategoryForm
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          onAdd={handleAdd}
        />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <CategoryTable
          categories={categories}
          editingCategory={editingCategory}
          setEditingCategory={setEditingCategory}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </Paper>
    </Box>
  );
};

export default CategoryManager;
