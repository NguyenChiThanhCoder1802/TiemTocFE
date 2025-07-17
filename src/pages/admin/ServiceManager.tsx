import {
  Box, Button, Dialog, DialogContent,
  DialogTitle,  Typography, Table, TableHead,
  TableRow, TableCell, TableBody, Paper, Stack
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  fetchServices as fetchAllServices,
  createService,
  updateService,
  deleteService,
} from '../../api/servicesAPI';
import { fetchCategories } from '../../api/categoryApi';
import type { Service } from '../../types/Service';
import type { Category } from '../../types/Category';
import SharedForm from './components/SharedForm';
type SharedFormData = {
  name: string;
  price: number;
  description: string;
  imageFile: File | null;
  categoryId: string | number;
};
const ServiceManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<SharedFormData>({
  name: '',
  price: 0,
  description: '',
  imageFile: null,
  categoryId: '',
});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  const loadServices = async () => {
    try {
      const data = await fetchAllServices();
      setServices(data);
    } catch {
      setError('Lỗi khi tải dịch vụ.');
    }
  };

  useEffect(() => {
    loadServices();
    fetchCategories().then(setCategories);
  }, []);
  const handleOpen = (service?: Service) => {
  if (service) {
    setForm({
      name: service.name ?? '',
      price: service.price ?? 0,
      description: service.description ?? '',
      imageFile: null,
      categoryId: service.categoryId ?? '',
    });
    setEditingId(service.id);
  } else {
    setForm({
      name: '',
      price: 0,
      description: '',
      imageFile: null,
      categoryId: '',
    });
    setEditingId(null);
  }
  setOpen(true);
};


  const handleClose = () => {
    setOpen(false);
    setForm({
      name: '',
      price: 0,
      description: '',
      imageFile: null,
      categoryId: '',
    });

    setEditingId(null);
  };

  const handleSubmit = async () => {
  try {
    if (!token) return;

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', String(form.price));
    formData.append('description', form.description);
    formData.append('categoryId', String(form.categoryId));
    if (form.imageFile) {
      formData.append('image', form.imageFile);
    }

    if (editingId !== null) {
      await updateService(editingId, formData, token);
    } else {
      await createService(formData,token);
    }

    await loadServices();
    handleClose();
  } catch (err) {
    alert('Lỗi khi lưu dịch vụ.');
    console.error(err);
  }
};

  const handleDelete = async (id: number) => {
    if(!token) return;
    try {
      await deleteService(id,token);
      await loadServices();
    } catch {
      alert('Không thể xoá dịch vụ.');
    }
  };
  return (
    <Box sx={{ py: 4, px: 2, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: '1000px' }}>
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
          🧴 Quản lý Dịch vụ
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button variant="contained" onClick={() => handleOpen()}>
            ➕ Thêm dịch vụ
          </Button>
        </Stack>

        <Paper elevation={4} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
              <TableRow>
                <TableCell><strong>Ảnh</strong></TableCell>
                <TableCell><strong>Tên</strong></TableCell>
                <TableCell><strong>Mô tả</strong></TableCell>
                <TableCell><strong>Giá</strong></TableCell>
                <TableCell><strong>Danh mục</strong></TableCell>
                <TableCell><strong>Hành động</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((s) => {
                const category = categories.find((c) => c.id === s.categoryId);
                return (
                  <TableRow key={s.id}>
                    <TableCell>
                      {s.imageUrl ? (
                        <img src={s.imageUrl} alt={s.name} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }} />
                      ) : (
                        <Typography variant="body2" color="text.secondary">Không có ảnh</Typography>
                      )}
                    </TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.description}</TableCell>
                    <TableCell>{s.price.toLocaleString()} VNĐ</TableCell>
                    <TableCell>{category?.name || 'Không rõ'}</TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => handleOpen(s)}>✏️ Sửa</Button>
                      <Button size="small" color="error" onClick={() => handleDelete(s.id)}>🗑️ Xoá</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>{editingId ? 'Sửa dịch vụ' : 'Thêm dịch vụ'}</DialogTitle>
          <DialogContent>
            <SharedForm
              form={form}
              categories={categories}
              categoryType="Service"
              onChange={(field, value) =>
                setForm((prev) => ({ ...prev, [field]: value }))
              }
              onImageChange={(file) =>
                setForm((prev) => ({ ...prev, imageFile: file }))
              }
              onSubmit={handleSubmit}
              submitLabel={editingId ? 'Lưu' : 'Thêm dịch vụ'}
              isEditMode={!!editingId}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ServiceManager;
