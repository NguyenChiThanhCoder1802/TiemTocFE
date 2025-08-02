// components/ServiceManager.tsx
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../../api/categoryApi';
import { createService } from '../../api/servicesAPI';
import type { Service } from '../../types/Service';

export default function ServiceManager() {
  const [service, setService] = useState<Partial<Service>>({});
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleFileChange = (field: keyof Service) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (field === 'imageFile') {
      setService({ ...service, imageFile: files[0] });
    } else {
      setService({ ...service, [field]: Array.from(files) });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (service.name) formData.append('Name', service.name);
    if (service.description) formData.append('Description', service.description);
    if (service.price) formData.append('Price', String(service.price));
    if (service.durationInMinutes) formData.append('DurationInMinutes', String(service.durationInMinutes));
    if (service.categoryId) formData.append('CategoryId', String(service.categoryId));
    if (service.imageFile) formData.append('Image', service.imageFile);
    if (service.additionalImageFiles) {
      service.additionalImageFiles.forEach(file => formData.append('AdditionalImages', file));
    }
    if (service.videoFiles) {
      service.videoFiles.forEach(file => formData.append('VideoFiles', file));
    }

    try {
      const token = localStorage.getItem('token') ?? '';
      await createService(formData, token);
      alert('✔ Tạo dịch vụ thành công');
    } catch  {
      alert('❌ Tạo thất bại');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Thêm Dịch Vụ</Typography>
      <Stack spacing={2}>
        <TextField name="name" label="Tên dịch vụ" onChange={handleChange} fullWidth />
        <TextField name="description" label="Mô tả" onChange={handleChange} multiline rows={8} />
        <TextField name="price" label="Giá" type="number" onChange={handleChange} />
        <TextField name="durationInMinutes" label="Thời lượng (phút)" type="number" onChange={handleChange} />

        <FormControl>
          <InputLabel>Danh mục</InputLabel>
          <Select
            value={service.categoryId || ''}
            label="Danh mục"
            onChange={(e) => setService({ ...service, categoryId: +e.target.value })}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="outlined" component="label">
          Ảnh chính
          <input type="file" hidden onChange={handleFileChange('imageFile')} />
        </Button>

        <Button variant="outlined" component="label">
          Ảnh phụ (nhiều)
          <input type="file" hidden multiple onChange={handleFileChange('additionalImageFiles')} />
        </Button>

        <Button variant="outlined" component="label">
          Video (nhiều)
          <input type="file" hidden multiple onChange={handleFileChange('videoFiles')} />
        </Button>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Tạo dịch vụ
        </Button>
      </Stack>
    </Box>
  );
}
