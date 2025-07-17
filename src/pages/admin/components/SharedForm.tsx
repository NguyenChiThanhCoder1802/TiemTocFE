import {TextField,Button,FormControl,InputLabel,Select,MenuItem,Stack,Typography,} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { ChangeEvent } from 'react';
import type { Category } from '../../../types/Category';

interface Props {
  form: {
    name: string;
    price: number;
    description: string;
    imageFile: File | null;
    categoryId: string | number;
  };
  categories: Category[];
  categoryType: 'Product' | 'Service'; // thêm để phân biệt
  isEditMode?: boolean; // cho biết đang dùng ở form sửa hay thêm
  onChange: (field: string, value: unknown) => void;
  onImageChange: (file: File) => void;
  onSubmit: () => void;
  submitLabel?: string; // text nút submit, ví dụ: "Thêm sản phẩm" hoặc "Lưu"
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
      <Button variant="contained" component="label">
        {form.imageFile ? '📷 Đã chọn ảnh' : '📷 Chọn ảnh'}
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
            alt="Xem trước"
            style={{ width: 100, marginTop: 8, borderRadius: 8 }}
          />
        </>
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
