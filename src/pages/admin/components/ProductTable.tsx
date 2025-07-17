import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Select,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Product } from '../../../types/Product';
import type { Category } from '../../../types/Category';

interface Props {
  products: Product[];
  categories: Category[];
  editingProduct: Product | null;
  onEdit: (product: Product) => void;
  onCancelEdit: () => void;
  onChangeEdit: (field: string, value: unknown) => void;
  onImageChange: (file: File) => void;
  onUpdate: () => void;
  onDelete: (id: number) => void;
}

const ProductTable = ({
  products,
  categories,
  editingProduct,
  onEdit,
  onCancelEdit,
  onChangeEdit,
  onImageChange,
  onUpdate,
  onDelete,
}: Props) => (
  <Table>
    <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
      <TableRow>
        <TableCell><strong>Tên</strong></TableCell>
        <TableCell><strong>Giá</strong></TableCell>
        <TableCell><strong>Mô tả</strong></TableCell>
        <TableCell><strong>Ảnh</strong></TableCell>
        <TableCell><strong>Danh mục</strong></TableCell>
        <TableCell><strong>Hành động</strong></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {products.map((p) => (
        <TableRow key={p.id}>
          <TableCell>
            {editingProduct?.id === p.id ? (
              <TextField
                value={editingProduct.name}
                onChange={(e) => onChangeEdit('name', e.target.value)}
              />
            ) : (
              p.name
            )}
          </TableCell>

          <TableCell>
            {editingProduct?.id === p.id ? (
              <TextField
                type="number"
                value={editingProduct.price}
                onChange={(e) => onChangeEdit('price', +e.target.value)}
              />
            ) : (
              p.price.toLocaleString() + ' VNĐ'
            )}
          </TableCell>

          <TableCell>
            {editingProduct?.id === p.id ? (
              <TextField
                value={editingProduct.description}
                onChange={(e) => onChangeEdit('description', e.target.value)}
                multiline
                rows={2}
              />
            ) : (
              p.description
            )}
          </TableCell>

          <TableCell>
            {editingProduct?.id === p.id ? (
              <>
                <Button variant="contained" component="label" size="small">
                  Chọn ảnh
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onImageChange(file);
                    }}
                  />
                </Button>
                <Typography variant="body2">
                  {editingProduct.imageFile?.name || 'Không có ảnh'}
                </Typography>
                {(editingProduct.imageFile || editingProduct.imageUrl) && (
                  <img
                    src={
                      editingProduct.imageFile
                        ? URL.createObjectURL(editingProduct.imageFile)
                        : editingProduct.imageUrl
                    }
                    alt="preview"
                    width="80"
                    style={{ borderRadius: 8, marginTop: 8 }}
                  />
                )}
              </>
            ) : p.imageUrl ? (
              <img
                src={p.imageUrl}
                alt={p.name}
                width="80"
                style={{ borderRadius: 8 }}
              />
            ) : (
              'Không có'
            )}
          </TableCell>

          <TableCell>
            {editingProduct?.id === p.id ? (
              <Select
                size="small"
                value={editingProduct.categoryId}
                onChange={(e) => onChangeEdit('categoryId', +e.target.value)}
              >
                {categories
                  .filter((cat) => cat.type === 'Product')
                  .map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
              </Select>
            ) : (
              categories.find((c) => c.id === p.categoryId)?.name || 'Không rõ'
            )}
          </TableCell>

          <TableCell>
            {editingProduct?.id === p.id ? (
              <>
                <Button onClick={onUpdate} color="primary" size="small">
                  Lưu
                </Button>
                <Button onClick={onCancelEdit} color="inherit" size="small">
                  Huỷ
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => onEdit(p)} size="small">
                  Sửa
                </Button>
                <IconButton color="error" onClick={() => onDelete(p.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default ProductTable;
