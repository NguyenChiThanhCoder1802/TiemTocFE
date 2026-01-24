import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  Chip,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import { Edit, Delete, Star } from '@mui/icons-material'
import type { Combo } from '../../../types/Combo/Combo'

interface Props {
  combos?: Combo[]            // ⬅️ optional để tránh crash
  onEdit: (combo: Combo) => void
  onDelete: (id: string) => void
}

const ComboTable = ({
  combos = [],                // ⬅️ default value
  onEdit,
  onDelete
}: Props) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Ảnh</TableCell>
          <TableCell>Combo</TableCell>
          <TableCell>Dịch vụ</TableCell>
          <TableCell>Giá</TableCell>
          <TableCell>Thời gian</TableCell>
          <TableCell align="center">Trạng thái</TableCell>
          <TableCell align="right">Hành động</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {combos.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} align="center">
              <Typography color="text.secondary">
                Chưa có combo nào
              </Typography>
            </TableCell>
          </TableRow>
        ) : (
          combos.map((c) => (
            <TableRow key={c._id} hover>
              {/* IMAGE */}
              <TableCell>
                <Avatar
                  src={c.images?.[0]}
                  variant="rounded"
                  sx={{ width: 56, height: 56 }}
                />
              </TableCell>

              {/* NAME */}
              <TableCell>
                <Stack spacing={0.5}>
                  <Typography fontWeight={600}>{c.name}</Typography>

                  {c.isFeatured && (
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Star fontSize="small" color="warning" />
                      <Typography variant="caption" color="warning.main">
                        Nổi bật
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </TableCell>

              {/* SERVICES */}
              <TableCell>
                <Typography variant="body2">
                  {c.services?.length ?? 0} dịch vụ
                </Typography>
              </TableCell>

              {/* PRICE */}
              <TableCell>
                <Stack spacing={0.25}>
                  <Typography
                    variant="caption"
                    sx={{ textDecoration: 'line-through', opacity: 0.6 }}
                  >
                    {c.pricing.originalPrice.toLocaleString()}₫
                  </Typography>
                  <Typography fontWeight={600} color="primary.main">
                    {c.pricing.comboPrice.toLocaleString()}₫
                  </Typography>
                </Stack>
              </TableCell>

              {/* DURATION */}
              <TableCell>{c.duration} phút</TableCell>

              {/* STATUS */}
              <TableCell align="center">
                <Chip
                  size="small"
                  label={c.isActive ? 'Hoạt động' : 'Ẩn'}
                  color={c.isActive ? 'success' : 'default'}
                />
              </TableCell>

              {/* ACTION */}
              <TableCell align="right">
                <Tooltip title="Chỉnh sửa">
                  <IconButton onClick={() => onEdit(c)}>
                    <Edit />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Xoá">
                  <IconButton
                    color="error"
                    onClick={() => onDelete(c._id)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

export default ComboTable
