import {
  Box, Button, Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  fetchServices, createService, updateService, deleteService,
} from '../../../api/servicesAPI';
import { fetchCategories } from '../../../api/categoryApi';
import ServiceDialog from './ServiceDialog';
import ServiceTable from './ServiceTable';
import type { Service } from '../../../types/Service';
import type { Category } from '../../../types/Category';
import BackButton from '../../../components/Common/BackButton';

export default function ServiceManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServices().then(setServices);
    fetchCategories().then(setCategories);
  }, []);

  const handleOpenDialog = () => setDialogOpen(true);

  const handleCloseDialog = () => {
    setEditingService(null);
    setDialogOpen(false);
  };

  // ✅ Thêm mới
  const handleCreateService = async (formData: FormData) => {
    try {
      
      await createService(formData);
      alert('✅ Thêm dịch vụ thành công');
      handleCloseDialog();
      fetchServices().then(setServices);
    } catch {
      alert('❌ Lỗi khi thêm dịch vụ');
    }
  };

  // ✅ Cập nhật
  const handleUpdateService = async (formData: FormData) => {
    try {
      if (!editingService) return;
      
      await updateService(editingService.id, formData);
      alert('✅ Cập nhật thành công');
      handleCloseDialog();
      fetchServices().then(setServices);
    } catch {
      alert('❌ Cập nhật thất bại');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xoá dịch vụ này?')) return;
    try {
      
      await deleteService(id,);
      alert('🗑️ Xoá thành công');
      fetchServices().then(setServices);
    } catch {
      alert('❌ Xoá thất bại');
    }
  };

  return (
    <Box>
      <BackButton />
      <Typography variant="h4" gutterBottom>Quản lý Dịch Vụ</Typography>

      <Button variant="contained" onClick={handleOpenDialog}>
        + Thêm Dịch Vụ
      </Button>

      <ServiceTable
        services={services}
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ServiceDialog
        open={dialogOpen}
        service={editingService}
        categories={categories}
        onClose={handleCloseDialog}
        onSubmit={editingService ? handleUpdateService : handleCreateService}
      />
    </Box>
  );
}
