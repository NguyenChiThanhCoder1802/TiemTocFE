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
import type { Service } from '../../../types/HairService/Service'
import { formatTagLabel } from '../../../utils/formatTag'
import type { Category } from '../../../types/Category/Category'
import { getCategoryName } from '../../../utils/CategoryHelper'

interface Props {
  services: Service[]
  categories: Category[]
  onEdit: (service: Service) => void
  onDelete: (id: string) => void
}

const isDiscountActive = (service: Service) => {
  const d = service.serviceDiscount
  if (!d || d.percent <= 0) return false

  const now = new Date()
  return (
    (!d.startAt || new Date(d.startAt) <= now) &&
    (!d.endAt || new Date(d.endAt) >= now)
  )
}



const ServiceTable = ({ services, onEdit, onDelete }: Props) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Ảnh</TableCell>
          <TableCell>Dịch vụ</TableCell>
          <TableCell>Danh mục</TableCell>
          <TableCell>Giá</TableCell>
          <TableCell>Thời gian</TableCell>
          <TableCell>Tags</TableCell>
          <TableCell align="center">Trạng thái</TableCell>
          <TableCell align="right">Hành động</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {services.map((s) => {
          const discountActive = isDiscountActive(s)

          return (
            <TableRow key={s._id} hover>
              {/* Ảnh */}
              <TableCell>
                <Avatar
                  src={s.images?.[0]}
                  variant="rounded"
                  sx={{ width: 56, height: 56 }}
                />
              </TableCell>

              {/* Tên + Featured */}
              <TableCell>
                <Stack spacing={0.5}>
                  <Typography fontWeight={500}>{s.name}</Typography>

                  {s.isFeatured && (
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Star fontSize="small" sx={{ color: 'warning.main' }} />
                      <Typography variant="caption" color="warning.main">
                        Nổi bật
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </TableCell>

              {/* Category */}
              <TableCell>
                <Chip
                  size="small"
                  label={getCategoryName(s.category) || '—'}
                  variant="outlined"
                />
              </TableCell>



              {/* Giá */}
              <TableCell>
                <Stack spacing={0.25}>
                  {discountActive && (
                    <Typography
                      variant="caption"
                      sx={{ textDecoration: 'line-through', opacity: 0.6 }}
                    >
                      {s.price.toLocaleString()}₫
                    </Typography>
                  )}

                  <Typography fontWeight={600} color="primary.main">
                    {s.finalPrice.toLocaleString()}₫
                  </Typography>

                  {discountActive && (
                    <Chip
                      size="small"
                      label={`-${s.serviceDiscount?.percent}%`}
                      color="primary"
                      sx={{
                        width: 'fit-content',
                        fontWeight: 500
                      }}
                    />
                  )}

                </Stack>
              </TableCell>

              {/* Thời gian */}
              <TableCell>{s.duration} phút</TableCell>

              {/* Tags */}
              <TableCell>
                <Stack direction="row" spacing={0.5} flexWrap="wrap">
                  {s.tags?.slice(0, 3).map((tag, idx) => (
                    <Chip
                      key={idx}
                      size="small"
                      label={formatTagLabel(tag)}
                      variant="outlined"
                    />
                  ))}

                  {s.tags && s.tags.length > 3 && (
                    <Chip
                      size="small"
                      label={`+${s.tags.length - 3}`}
                      variant="outlined"
                    />
                  )}
                </Stack>
              </TableCell>

              {/* Trạng thái */}
              <TableCell align="center">
                <Stack spacing={0.25} alignItems="center">
                  <Typography
                    variant="body2"
                    sx={{ opacity: s.isActive ? 1 : 0.4 }}
                  >
                    {s.isActive ? 'Hoạt động' : 'Ẩn'}
                  </Typography>

                  {discountActive && (
                    <Chip
                      size="small"
                      label="Đang giảm giá"
                      color="primary"
                    />
                  )}
                </Stack>
              </TableCell>

              {/* Action */}
              <TableCell align="right">
                <Tooltip title="Chỉnh sửa">
                  <IconButton onClick={() => onEdit(s)}>
                    <Edit />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Xoá">
                  <IconButton color="error" onClick={() => onDelete(s._id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default ServiceTable
