import React, { useEffect, useState } from 'react';
import {Dialog, DialogTitle, DialogContent, TextField,MenuItem, Button, Stack, Typography, DialogActions
} from '@mui/material';
import type { Category } from '../../../types/Category';
import type { Service, ServiceFormData } from '../../../types/Service';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData, isEdit: boolean, idToUpdate?: number) => void;
  editingService?: Service | null;
  categories: Category[];
}

export default function AddServiceDialog({
  open,
  onClose,
  onSubmit,
  editingService,
  categories
}: Props) {
  const [service, setService] = useState<ServiceFormData>({
    name: '',
    description: '',
    price: 0,
    categoryId: '',
    durationInMinutes: 0,
    image: undefined,
    additionalImages: [],
    videoFiles: []
  });

  useEffect(() => {
    if (editingService) {
      setService({
        name: editingService.name ?? '',
        description: editingService.description ?? '',
        price: editingService.price ?? 0,
        categoryId: editingService.categoryId ?? '',
        durationInMinutes: editingService.durationInMinutes ?? 0,
        image: undefined,
        additionalImages: [],
        videoFiles: []
      });
    } else {
      setService({
        name: '',
        description: '',
        price: 0,
        categoryId: '',
        durationInMinutes: 0,
        image: undefined,
        additionalImages: [],
        videoFiles: []
      });
    }
  }, [editingService, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setService(prev => ({
      ...prev,
      [name]:
        ['price', 'durationInMinutes', 'categoryId'].includes(name)
          ? value === '' ? '' : Number(value)
          : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ServiceFormData) => {
    const files = e.target.files;
    if (!files) return;
    if (field === 'image') {
      setService(prev => ({ ...prev, image: files[0] }));
    } else {
      setService(prev => ({ ...prev, [field]: Array.from(files) }));
    }
  };

  const handleSubmit = () => {
    if (!service.name.trim() || !service.price || !service.categoryId) {
      alert('⚠️ Vui lòng nhập đầy đủ Tên, Giá và Danh mục.');
      return;
    }

    const formData = new FormData();
    formData.append('Name', service.name.trim());
    formData.append('Description', service.description.trim());
    formData.append('Price', String(service.price));
    formData.append('CategoryId', String(service.categoryId));
    formData.append('DurationInMinutes', String(service.durationInMinutes));

    if (service.image) formData.append('Image', service.image);
    service.additionalImages?.forEach(file => formData.append('AdditionalImages', file));
    service.videoFiles?.forEach(file => formData.append('VideoFiles', file));

    onSubmit(formData, !!editingService, editingService?.id);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{editingService ? '✏️ Sửa dịch vụ' : '➕ Thêm dịch vụ mới'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Tên dịch vụ" name="name" value={service.name} onChange={handleChange} fullWidth required />
          <TextField label="Mô tả" name="description" value={service.description} onChange={handleChange} fullWidth multiline rows={3} />
          <TextField label="Giá" name="price" value={service.price} onChange={handleChange} type="number" inputProps={{ min: 0 }} fullWidth required />
         <TextField
  select
  label="Danh mục"
  name="categoryId"
  value={service.categoryId}
  onChange={handleChange}
  fullWidth
  required
>
  {categories
    .filter(cat => cat.type === 'Service')
    .map(cat => (
      <MenuItem key={cat.id} value={cat.id}>
        {cat.name}
      </MenuItem>
    ))}
</TextField>

          <TextField label="Thời lượng (phút)" name="durationInMinutes" value={service.durationInMinutes} onChange={handleChange} type="number" inputProps={{ min: 0 }} fullWidth />

          <Typography fontWeight={600}>Ảnh chính</Typography>
          <input type="file" accept="image/*" onChange={e => handleFileChange(e, 'image')} />

          <Typography fontWeight={600}>Ảnh phụ</Typography>
          <input type="file" multiple accept="image/*" onChange={e => handleFileChange(e, 'additionalImages')} />

          <Typography fontWeight={600}>Video</Typography>
          <input type="file" multiple accept="video/*" onChange={e => handleFileChange(e, 'videoFiles')} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSubmit} variant="contained">
          {editingService ? 'Cập nhật' : 'Thêm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
