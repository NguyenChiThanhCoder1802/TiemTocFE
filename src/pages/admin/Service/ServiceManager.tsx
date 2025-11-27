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
import { useSnackbar } from 'notistack';

export default function ServiceManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch(() =>
        enqueueSnackbar('Không thể tải danh sách dịch vụ', {
          variant: 'error',
          autoHideDuration: 2000,
        })
      );

    fetchCategories()
      .then(setCategories)
      .catch(() =>
        enqueueSnackbar('Không thể tải danh mục', {
          variant: 'error',
          autoHideDuration: 2000,
        })
      );
  }, [enqueueSnackbar]);

  const handleOpenDialog = () => setDialogOpen(true);

  const handleCloseDialog = () => {
    setEditingService(null);
    setDialogOpen(false);
  };

  // ✅ Thêm mới
  const handleCreateService = async (formData: FormData) => {
    try {
      await createService(formData);
      enqueueSnackbar('Thêm dịch vụ thành công', {
        variant: 'success',
        autoHideDuration: 2000,
      });
      handleCloseDialog();
      fetchServices().then(setServices);
    } catch {
      enqueueSnackbar('Lỗi khi thêm dịch vụ', {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  // ✅ Cập nhật
  const handleUpdateService = async (formData: FormData) => {
    try {
      if (!editingService) return;
      await updateService(editingService.id, formData);
      enqueueSnackbar('Cập nhật dịch vụ thành công', {
        variant: 'success',
        autoHideDuration: 2000,
      });
      handleCloseDialog();
      fetchServices().then(setServices);
    } catch {
      enqueueSnackbar('Cập nhật thất bại', {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  // ✅ Sửa
  const handleEdit = (service: Service) => {
    setEditingService(service);
    setDialogOpen(true);
  };

  // ✅ Xóa
  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xoá dịch vụ này?')) return;
    try {
      await deleteService(id);
      enqueueSnackbar('Xoá dịch vụ thành công', {
        variant: 'success',
        autoHideDuration: 2000,
      });
      fetchServices().then(setServices);
    } catch {
      enqueueSnackbar('Xoá thất bại', {
        variant: 'error',
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <Box>
      <BackButton />
      <Typography variant="h4" gutterBottom>
        Quản lý Dịch Vụ
      </Typography>

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
        editingService={editingService}
        categories={categories}
        onClose={handleCloseDialog}
        onSubmit={editingService ? handleUpdateService : handleCreateService}
      />
    </Box>
  );
}
