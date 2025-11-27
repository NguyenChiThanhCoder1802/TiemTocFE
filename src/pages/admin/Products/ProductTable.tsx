import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Button, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Product } from '../../../types/Product';
import type { Category } from '../../../types/Category';

interface Props {
  products: Product[];
  categories: Category[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductTable = ({ products, categories, onEdit, onDelete }: Props) => (
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
          <TableCell>{p.name}</TableCell>
          <TableCell>{p.price.toLocaleString()} VNĐ</TableCell>
          <TableCell>{p.description}</TableCell>
          <TableCell>
            {p.imageUrl ? (
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
            {categories.find((c) => c.id === p.categoryId)?.name || 'Không rõ'}
          </TableCell>
          <TableCell>
            <Button onClick={() => onEdit(p)} size="small">Sửa</Button>
            <IconButton color="error" onClick={() => onDelete(p.id)}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default ProductTable;
