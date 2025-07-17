import { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { fetchServices } from '../../api/servicesAPI';
import { getCombos, createCombo, deleteCombo } from '../../api/comboAPI';
import ComboList from './components/BeautyCombo/ComboList';
import ComboFormDialog from './components/BeautyCombo/ComboFormDialog';
import type { ComboDto, CreateComboDto } from '../../types/Combo';
import type { Service } from '../../types/Service';

const BeautyComboPage = () => {
  const [combos, setCombos] = useState<ComboDto[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CreateComboDto>({
    name: '',
    description: '',
    originalPrice: 0,
    discountedPrice: 0,
    serviceIds: [],
    startDate: '',
    endDate: ''
  });

  const fetchData = async () => {
    try {
      const [comboData, serviceData] = await Promise.all([
        getCombos(),
        fetchServices()
      ]);
      setCombos(comboData);
      setServices(serviceData);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const resetForm = () => {
    setForm({
      name: '',
      description: '',
      originalPrice: 0,
      discountedPrice: 0,
      serviceIds: [],
      startDate: '',
      endDate: ''
    });
  };

  const handleSubmit = async () => {
    try {
      if (!form.name || !form.discountedPrice || form.serviceIds.length === 0) {
        alert('Vui lòng nhập đầy đủ thông tin combo!');
        return;
      }
      await createCombo(form);
      setOpen(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Lỗi khi tạo combo:', error);
      alert('Tạo combo thất bại!');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Xác nhận xoá combo?')) {
      try {
        await deleteCombo(id);
        fetchData();
      } catch (error) {
        console.error('Xoá combo lỗi:', error);
        alert('Xoá combo thất bại!');
      }
    }
  };

  useEffect(() => {
    const total = services
      .filter((s) => form.serviceIds.includes(s.id))
      .reduce((sum, s) => sum + s.price, 0);

    setForm((prev) => ({
      ...prev,
      originalPrice: total,
    }));
  }, [form.serviceIds, services]);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>🎁 Quản lý Combo Làm Đẹp</Typography>

      <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
        Thêm Combo
      </Button>

      <ComboList combos={combos} onDelete={handleDelete} />

      <ComboFormDialog
        open={open}
        form={form}
        services={services}
        onChange={setForm}
        onClose={() => {
          setOpen(false);
          resetForm();
        }}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default BeautyComboPage;