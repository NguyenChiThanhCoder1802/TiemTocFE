import {
  Box, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Typography, Table, TableHead,
  TableRow, TableCell, TableBody, Paper, Stack
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from '../../api/servicesAPI';
import type { Service } from '../../types/Service';

const ServiceManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<Service>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      const data = await getAllServices();
      setServices(data);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError('Lỗi khi tải dịch vụ: ' + err.message);
      } else {
        setError('Lỗi không xác định khi tải dịch vụ.');
      }
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpen = (service?: Service) => {
    if (service) {
      setForm(service);
      setEditingId(service.id);
    } else {
      setForm({});
      setEditingId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({});
    setEditingId(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingId !== null) {
        await updateService(editingId, form);
      } else {
        await createService(form);
      }
      await fetchServices();
      handleClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert('Lỗi khi lưu dịch vụ: ' + err.message);
      } else {
        alert('Lỗi không xác định khi lưu dịch vụ.');
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xoá?')) return;
    try {
      await deleteService(id);
      await fetchServices();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert('Không thể xoá dịch vụ: ' + err.message);
      } else {
        alert('Không thể xoá dịch vụ (lỗi không xác định)');
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
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Box sx={{ maxWidth: '1000px', width: '100%' }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
            justifyContent: 'center'
          }}
        >
          <Box component="span" mr={1}>🧴</Box> Quản lý Dịch vụ
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={() => handleOpen()}
          sx={{ mb: 3 }}
        >
          ➕ Thêm mới
        </Button>

        <Paper elevation={4} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
              <TableRow>
                <TableCell><strong>Tên</strong></TableCell>
                <TableCell><strong>Mô tả</strong></TableCell>
                <TableCell><strong>Giá</strong></TableCell>
                <TableCell><strong>Hành động</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map(s => (
                <TableRow key={s.id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.description}</TableCell>
                  <TableCell>{s.price.toLocaleString()} VNĐ</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => handleOpen(s)}>✏️ Sửa</Button>
                    <Button size="small" color="error" onClick={() => handleDelete(s.id)}>🗑️ Xoá</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>{editingId ? 'Sửa dịch vụ' : 'Thêm dịch vụ'}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Tên dịch vụ"
                fullWidth
                value={form.name || ''}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
              <TextField
                label="Mô tả"
                fullWidth
                value={form.description || ''}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
              <TextField
                label="Giá"
                type="number"
                fullWidth
                value={form.price || ''}
                onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button variant="contained" onClick={handleSubmit}>Lưu</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ServiceManager;
