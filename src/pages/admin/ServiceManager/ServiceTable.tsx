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
  Typography,
} from '@mui/material'

import {
  Edit,
  Delete,
  Star,
} from '@mui/icons-material'

import type { Service } from '../../../types/HairService/Service'
import { formatTagLabel } from '../../../utils/formatTag'

interface Props {
  services: Service[]

  onEdit: (service: Service) => void
  onDelete: (id: string) => void
  onStatistics: (service: Service) => void
}

const isDiscountActive = (
  service: Service
) => {
  const discount = service.serviceDiscount

  if (
    !discount ||
    discount.percent <= 0 ||
    !discount.isActive
  ) {
    return false
  }

  const now = new Date()

  return (
    (!discount.startAt ||
      new Date(discount.startAt) <= now) &&
    (!discount.endAt ||
      new Date(discount.endAt) >= now)
  )
}

const ServiceTable = ({
  services,
  onEdit,
  onDelete,
  onStatistics,
}: Props) => {
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

          <TableCell>Đánh giá</TableCell>

          <TableCell>Trạng thái</TableCell>

          <TableCell align="right">
            Hành động
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {services.map((service) => {
          const discountActive =
            isDiscountActive(service)

          return (
            <TableRow
              key={service._id}
              hover
            >
              {/* ================= IMAGE ================= */}

              <TableCell>
                <Avatar
                  src={service.images?.[0]}
                  variant="rounded"
                  sx={{
                    width: 56,
                    height: 56,
                  }}
                />
              </TableCell>

              {/* ================= SERVICE ================= */}

              <TableCell>
                <Stack spacing={0.5}>
                  <Typography fontWeight={600}>
                    {service.name}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {service.bookingCount} lượt đặt
                  </Typography>

                  {service.isFeatured && (
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="center"
                    >
                      <Star
                        fontSize="small"
                        color="warning"
                      />

                      <Typography
                        variant="caption"
                        color="warning.main"
                      >
                        Nổi bật
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </TableCell>

              {/* ================= CATEGORY ================= */}

              <TableCell>
                <Chip
                  size="small"
                  label={
                    typeof service.category ===
                    'object'
                      ? service.category.name
                      : service.category || '—'
                  }
                  variant="outlined"
                />
              </TableCell>

              {/* ================= PRICE ================= */}

              <TableCell>
                <Stack spacing={0.3}>
                  {discountActive && (
                    <Typography
                      variant="caption"
                      sx={{
                        textDecoration:
                          'line-through',
                        opacity: 0.6,
                      }}
                    >
                      {service.price.toLocaleString(
                        'vi-VN'
                      )}
                      ₫
                    </Typography>
                  )}

                  <Typography
                    fontWeight={700}
                    color="primary.main"
                  >
                    {service.finalPrice.toLocaleString(
                      'vi-VN'
                    )}
                    ₫
                  </Typography>

                  {discountActive && (
                    <Chip
                      size="small"
                      label={`-${service.serviceDiscount?.percent}%`}
                      color="primary"
                      sx={{
                        width: 'fit-content',
                      }}
                    />
                  )}
                </Stack>
              </TableCell>

              {/* ================= DURATION ================= */}

              <TableCell>
                {service.duration} phút
              </TableCell>

              {/* ================= TAGS ================= */}

              <TableCell>
                <Stack
                  direction="row"
                  spacing={0.5}
                  flexWrap="wrap"
                >
                  {service.tags
                    ?.slice(0, 2)
                    .map((tag) => (
                      <Chip
                        key={tag}
                        size="small"
                        label={formatTagLabel(
                          tag
                        )}
                        variant="outlined"
                      />
                    ))}

                  {service.tags &&
                    service.tags.length > 2 && (
                      <Chip
                        size="small"
                        label={`+${service.tags.length - 2}`}
                        variant="outlined"
                      />
                    )}
                </Stack>
              </TableCell>

              {/* ================= RATING ================= */}

              <TableCell>
                <Stack spacing={0.3}>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                  >
                    <Star
                      fontSize="small"
                      color="warning"
                    />

                    <Typography
                      fontWeight={600}
                    >
                      {service.ratingAverage.toFixed(
                        1
                      )}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {service.ratingCount} đánh giá
                  </Typography>
                </Stack>
              </TableCell>

              {/* ================= STATUS ================= */}

              <TableCell>
                <Stack spacing={0.5}>
                  <Chip
                    size="small"
                    label={
                      service.isActive
                        ? 'Hoạt động'
                        : 'Ẩn'
                    }
                    color={
                      service.isActive
                        ? 'success'
                        : 'default'
                    }
                  />

                  {discountActive && (
                    <Chip
                      size="small"
                      label="Đang giảm giá"
                      color="primary"
                    />
                  )}
                </Stack>
              </TableCell>

              {/* ================= ACTION ================= */}

              <TableCell align="right">
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                >
                  <Tooltip title="Thống kê">
                    <IconButton
                      onClick={() =>
                        onStatistics(service)
                      }
                    >
                      <Star />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Chỉnh sửa">
                    <IconButton
                      onClick={() =>
                        onEdit(service)
                      }
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Xoá">
                    <IconButton
                      color="error"
                      onClick={() =>
                        onDelete(service._id)
                      }
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default ServiceTable