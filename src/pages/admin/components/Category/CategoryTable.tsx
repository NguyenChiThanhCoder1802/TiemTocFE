import {
  Table, TableHead, TableBody, TableRow, TableCell,
  TextField, IconButton, Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Category } from '../../../../types/Category';

interface Props {
  categories: Category[];
  editingCategory: Category | null;
  setEditingCategory: (value: Category | null) => void;
  onUpdate: () => void;
  onDelete: (id: number) => void;
}

const CategoryTable = ({ categories, editingCategory, setEditingCategory, onUpdate, onDelete }: Props) => (
  <>
    <h3>Danh sách danh mục</h3>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><strong>Tên</strong></TableCell>
          <TableCell><strong>Loại</strong></TableCell>
          <TableCell><strong>Hành động</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {categories.map((cat) => (
          <TableRow key={cat.id}>
            {/* Cột Tên */}
            <TableCell>
              {editingCategory?.id === cat.id ? (
                <TextField
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                />
              ) : cat.name}
            </TableCell>

            {/* Cột Loại */}
            <TableCell>
              {editingCategory?.id === cat.id ? (
                <TextField
                  select
                  value={editingCategory.type}
                  onChange={(e) => setEditingCategory({ ...editingCategory, type: e.target.value })}
                  SelectProps={{ native: true }}
                >
                  <option value="Product">Sản phẩm</option>
                  <option value="Service">Dịch vụ</option>
                  <option value="Combo">Combo</option>
                </TextField>
              ) : (
                cat.type === 'Product'
                  ? 'Sản phẩm'
                  : cat.type === 'Service'
                    ? 'Dịch vụ'
                    : 'Combo'
              )}
            </TableCell>

            {/* Cột Hành động */}
            <TableCell>
              {editingCategory?.id === cat.id ? (
                <>
                  <Button onClick={onUpdate} size="small" color="primary">Lưu</Button>
                  <Button onClick={() => setEditingCategory(null)} size="small">Huỷ</Button>
                </>
              ) : (
                <>
                  <IconButton onClick={() => setEditingCategory(cat)}><EditIcon /></IconButton>
                  <IconButton onClick={() => onDelete(cat.id)} color="error"><DeleteIcon /></IconButton>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
);

export default CategoryTable;
