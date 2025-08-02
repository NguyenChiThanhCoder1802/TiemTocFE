import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { ChangeEvent } from 'react';
import type { Category } from '../../../types/Category';

interface Props {
  form: {
    name: string;
    price: number;
    description: string;
    imageFile: File | null;
    subImageFiles: File[]; // ✅ thêm ảnh phụ
    videoFiles: File[];
    categoryId: string | number;
    durationInMinutes: number;
  };
  categories: Category[];
  categoryType: 'Product' | 'Service';
  isEditMode?: boolean;
  onChange: (field: string, value: unknown) => void;
  onImageChange: (file: File) => void;
  onSubmit: () => void;
  submitLabel?: string;
}

const SharedForm = ({
  form,
  categories,
  categoryType,
  onChange,
  onImageChange,
  onSubmit,
  submitLabel = 'Lưu',
}: Props) => {
  return (
    <Stack spacing={2}>
      <TextField
        label={`Tên ${categoryType === 'Product' ? 'sản phẩm' : 'dịch vụ'}`}
        value={form.name}
        onChange={(e) => onChange('name', e.target.value)}
        fullWidth
      />

      <TextField
        label="Giá"
        type="number"
        value={form.price}
        onChange={(e) => onChange('price', +e.target.value)}
        fullWidth
      />

      <TextField
        label="Thời gian thực hiện (phút)"
        type="number"
        value={form.durationInMinutes}
        onChange={(e) =>
          onChange('durationInMinutes', parseInt(e.target.value, 10) || 0)
        }
        fullWidth
      />

      <TextField
        label="Mô tả"
        value={form.description}
        onChange={(e) => onChange('description', e.target.value)}
        fullWidth
        multiline
        rows={2}
      />

      <FormControl fullWidth>
        <InputLabel>Danh mục</InputLabel>
        <Select
          value={form.categoryId}
          label="Danh mục"
          onChange={(e) => onChange('categoryId', e.target.value)}
        >
          {categories
            .filter((cat) => cat.type === categoryType)
            .map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {/* Ảnh chính */}
      <Button variant="contained" component="label">
        {form.imageFile ? '📷 Đã chọn ảnh chính' : '📷 Chọn ảnh chính'}
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) onImageChange(file);
          }}
        />
      </Button>

      {form.imageFile && (
        <>
          <Typography variant="body2" color="textSecondary">
            {form.imageFile.name}
          </Typography>
          <img
            src={URL.createObjectURL(form.imageFile)}
            alt="Ảnh chính"
            style={{ width: 100, marginTop: 8, borderRadius: 8 }}
          />
        </>
      )}

      {/* ✅ Ảnh phụ */}
      <Button variant="contained" component="label">
        🖼️ Chọn ảnh phụ
        <input
          type="file"
          hidden
          accept="image/*"
          multiple
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files) {
              onChange('subImageFiles', Array.from(files));
            }
          }}
        />
      </Button>

      {form.subImageFiles && form.subImageFiles.length > 0 && (
        <>
          <Typography variant="body2" color="textSecondary">
            {form.subImageFiles.map((f) => f.name).join(', ')}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            {form.subImageFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Ảnh phụ ${index + 1}`}
                style={{ width: 80, borderRadius: 6 }}
              />
            ))}
          </Stack>
        </>
      )}

      {/* Video picker */}
      <Button variant="contained" component="label">
        🎥 Chọn video
        <input
          type="file"
          hidden
          accept="video/*"
          multiple
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files) {
              onChange('videoFiles', Array.from(files));
            }
          }}
        />
      </Button>

      {form.videoFiles && form.videoFiles.length > 0 && (
        <Typography variant="body2" color="textSecondary">
          {form.videoFiles.map((v) => v.name).join(', ')}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={onSubmit}
        sx={{ alignSelf: 'flex-start' }}
      >
        {submitLabel}
      </Button>
    </Stack>
  );
};

export default SharedForm;
