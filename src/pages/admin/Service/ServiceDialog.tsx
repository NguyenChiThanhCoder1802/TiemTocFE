import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField,
  MenuItem, Button, Stack, Typography, DialogActions
} from '@mui/material';
import type { Category } from '../../../types/Category';
import type { Service } from '../../../types/Service';
import DropZone from './DropZone';

export interface ServiceFormData {
  name: string;
  description: string;
  price: number;
  categoryId: number | '';
  durationInMinutes: number;
  image?: File;
  additionalImages?: File[];
  videoFiles?: File[];
}

interface Props {
  open: boolean;
  service: Partial<Service>
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

  // ✅ Reset/Fill form khi edit
  useEffect(() => {
    if (editingService) {
      setService({
        name: editingService.name,
        description: editingService.description ?? '',
        price: editingService.price,
        categoryId: editingService.categoryId,
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
      [name]: name === 'price' || name === 'durationInMinutes' || name === 'categoryId' ? Number(value) : value
    }));
  };

  const handleDrop = (files: File[], field: keyof ServiceFormData) => {
    setService(prev => {
      if (field === 'image') {
        return { ...prev, image: files[0] };
      }
      return {
        ...prev,
        [field]: [...(prev[field] as File[] || []), ...files]
      };
    });
  };

  const onFileChange = (field: keyof ServiceFormData, newFiles: File[]) => {
    setService(prev => ({ ...prev, [field]: newFiles }));
  };

  const handleSubmit = () => {
    if (!service.name || !service.price || !service.categoryId) return;

    const formData = new FormData();
    formData.append('Name', service.name);
    formData.append('Description', service.description);
    formData.append("Price", String(Number(service.price)));
    formData.append("CategoryId", String(Number(service.categoryId)));
    formData.append("DurationInMinutes", String(Number(service.durationInMinutes)));

    if (service.image) {
      formData.append('Image', service.image); // ✅ khớp với DTO
    }
    service.additionalImages?.forEach((file) =>
      formData.append('AdditionalImages', file) // ✅ khớp với DTO
    );
    service.videoFiles?.forEach((file) =>
      formData.append('VideoFiles', file) // ✅ khớp với DTO
    );
   
    onSubmit(formData, !!editingService, editingService?.id);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{editingService ? 'Sửa dịch vụ' : 'Thêm dịch vụ mới'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Tên dịch vụ"
            name="name"
            value={service.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Mô tả"
            name="description"
            value={service.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="Giá"
            name="price"
            value={service.price}
            onChange={handleChange}
            type="number"
            fullWidth
            required
          />
         <TextField
  select
  label="Danh mục"
  name="categoryId"
  value={service.categoryId}
  onChange={handleChange}
  fullWidth
  required
>
  {categories.map((cat) => (
    <MenuItem key={cat.id} value={cat.id}>
      {cat.id} {/* hiển thị ID thay cho tên */}
    </MenuItem>
  ))}
</TextField>

          <TextField
            label="Thời lượng (phút)"
            name="durationInMinutes"
            value={service.durationInMinutes}
            onChange={handleChange}
            type="number"
            fullWidth
          />

          <Typography fontWeight={600}>Ảnh chính</Typography>
          <DropZone
            label="Ảnh chính"
            field="image"
            files={service.image ? [service.image] : []}
            onDrop={handleDrop}
            onRemove={(field) => onFileChange(field, [])}
          />

          <Typography fontWeight={600}>Ảnh phụ</Typography>
          <DropZone
            label="Ảnh phụ"
            field="additionalImages"
            files={service.additionalImages || []}
            multiple
            onDrop={handleDrop}
            onRemove={(field, index) => {
              const newFiles = [...(service.additionalImages || [])];
              newFiles.splice(index, 1);
              onFileChange(field, newFiles);
            }}
          />

          <Typography fontWeight={600}>Video</Typography>
          <DropZone
            label="Video"
            field="videoFiles"
            files={service.videoFiles || []}
            multiple
            onDrop={handleDrop}
            onRemove={(field, index) => {
              const newFiles = [...(service.videoFiles || [])];
              newFiles.splice(index, 1);
              onFileChange(field, newFiles);
            }}
          />
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
