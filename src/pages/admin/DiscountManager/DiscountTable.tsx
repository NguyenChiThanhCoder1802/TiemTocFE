import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Switch,
  Tooltip
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import type { DiscountCard } from '../../../types/Discount/Discount'

interface Props {
  discounts: DiscountCard[]
  onEdit: (discount: DiscountCard) => void
  onDelete: (id: string) => void
  onToggleActive: (id: string, isActive: boolean) => void
}

export function DiscountTable({
  discounts,
  onEdit,
  onDelete,
  onToggleActive
}: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Mã</TableCell>
          <TableCell>Tên</TableCell>
          <TableCell>Loại</TableCell>
          <TableCell>Giá trị</TableCell>
          <TableCell>Sử dụng</TableCell>
          <TableCell>Trạng thái</TableCell>
          <TableCell align="right" />
        </TableRow>
      </TableHead>

      <TableBody>
        {discounts.map((d) => (
          <TableRow key={d._id}>
            <TableCell>{d.code}</TableCell>
            <TableCell>{d.name}</TableCell>

            <TableCell>
              {d.discountType === 'percent'
                ? 'Giảm %'
                : 'Giảm tiền'}
            </TableCell>

            <TableCell>
              {d.discountType === 'percent'
                ? `${d.discountValue}%`
                : `${d.discountValue.toLocaleString()}đ`}
            </TableCell>

            <TableCell>
              {d.usedQuantity}/{d.quantity}
            </TableCell>

            <TableCell>
              <Tooltip title={d.isActive ? 'Đang bật' : 'Đang tắt'}>
                <Switch
                  checked={d.isActive}
                  onChange={(e) =>
                    onToggleActive(d._id, e.target.checked)
                  }
                  color="success"
                />
              </Tooltip>
            </TableCell>

            <TableCell align="right">
              <IconButton onClick={() => onEdit(d)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(d._id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
