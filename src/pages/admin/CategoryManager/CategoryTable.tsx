import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Switch,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import type { Category } from '../../../types/Category/Category'

interface Props {
  categories: Category[]
  onEdit: (category: Category) => void
  onToggleActive: (category: Category) => void
  onDelete: (id: string) => void
}

const CategoryTable = ({
  categories,
  onEdit,
  onToggleActive,
  onDelete
}: Props) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Tên</TableCell>
          <TableCell>Mô tả</TableCell>
          <TableCell>Thứ tự</TableCell>
          <TableCell align="center">Hoạt động</TableCell>
          <TableCell align="right">Hành động</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {categories.map((cat) => (
          <TableRow key={cat._id} hover>
            <TableCell>
              <Typography fontWeight={500}>{cat.name}</Typography>
            </TableCell>

            <TableCell sx={{ opacity: 0.7 }}>
              {cat.description || '—'}
            </TableCell>

            <TableCell>{cat.order}</TableCell>

            <TableCell align="center">
              <Switch
                checked={cat.isActive}
                onChange={() => onToggleActive(cat)}
              />
            </TableCell>

            <TableCell align="right">
              <Tooltip title="Chỉnh sửa">
                <IconButton onClick={() => onEdit(cat)}>
                  <Edit />
                </IconButton>
              </Tooltip>

              <Tooltip title="Xoá">
                <IconButton
                  color="error"
                  onClick={() => onDelete(cat._id)}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default CategoryTable
