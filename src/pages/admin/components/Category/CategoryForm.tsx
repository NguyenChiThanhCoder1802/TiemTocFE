import { Stack, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  newCategory: { name: string; type: string };
  setNewCategory: (value: { name: string; type: string }) => void;
  onAdd: () => void;
}

const CategoryForm = ({ newCategory, setNewCategory, onAdd }: Props) => (
  <>
    <h3>Thêm danh mục</h3>
    <Stack spacing={2} direction="row">
      <TextField
        label="Tên danh mục"
        value={newCategory.name}
        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
      />
      <TextField
        select
        label="Loại"
        value={newCategory.type}
        SelectProps={{ native: true }}
        onChange={(e) => setNewCategory({ ...newCategory, type: e.target.value })}
      >
        <option value="Product">Sản phẩm</option>
        <option value="Service">Dịch vụ</option>
        <option value="Combo">Combo</option>
      </TextField>
      <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>Thêm</Button>
    </Stack>
  </>
);

export default CategoryForm;
