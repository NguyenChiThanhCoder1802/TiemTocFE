import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Divider,
  Chip,
  Box,
} from '@mui/material'

import {
  CalendarMonth,
  Visibility,
  Favorite,
  Star,
  TrendingUp,
} from '@mui/icons-material'

import type { Service } from '../../../../types/HairService/Service'

interface Props {
  open: boolean
  service: Service | null
  onClose: () => void
}

const StatRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 1.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
      >
        {icon}

        <Typography color="text.secondary">
          {label}
        </Typography>
      </Stack>

      <Typography fontWeight={700}>
        {value}
      </Typography>
    </Box>
  )
}

const ServiceStatisticsDialog = ({
  open,
  service,
  onClose,
}: Props) => {
  if (!service) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Thống kê dịch vụ
      </DialogTitle>

      <DialogContent>
        {/* ================= SERVICE ================= */}

        <Stack spacing={1} mb={3}>
          <Typography
            variant="h6"
            fontWeight={700}
          >
            {service.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {service.slug}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            mt={1}
          >
            <Chip
              size="small"
              label={
                service.isActive
                  ? 'Đang hoạt động'
                  : 'Đang ẩn'
              }
              color={
                service.isActive
                  ? 'success'
                  : 'default'
              }
            />

            {service.isFeatured && (
              <Chip
                size="small"
                label="Nổi bật"
                color="warning"
              />
            )}
          </Stack>
        </Stack>

        <Divider />

        {/* ================= BOOKING ================= */}

        <Typography
          fontWeight={700}
          sx={{ mt: 2 }}
        >
          Hiệu suất đặt dịch vụ
        </Typography>

        <StatRow
          icon={<CalendarMonth />}
          label="Tổng lượt đặt"
          value={service.bookingCount}
        />

        <StatRow
          icon={<TrendingUp />}
          label="Lượt đặt tuần này"
          value={service.weeklyBookingCount}
        />

        <StatRow
          icon={<TrendingUp />}
          label="Lượt đặt tháng này"
          value={service.monthlyBookingCount}
        />

        {/* ================= ENGAGEMENT ================= */}

        <Typography
          fontWeight={700}
          sx={{ mt: 3 }}
        >
          Tương tác
        </Typography>

        <StatRow
          icon={<Visibility />}
          label="Lượt xem"
          value={service.viewCount}
        />

        <StatRow
          icon={<Favorite />}
          label="Lượt yêu thích"
          value={service.favoriteCount}
        />

        <StatRow
          icon={<TrendingUp />}
          label="Tỷ lệ chuyển đổi"
          value={`${service.conversionRate}%`}
        />

        {/* ================= RATING ================= */}

        <Typography
          fontWeight={700}
          sx={{ mt: 3 }}
        >
          Đánh giá
        </Typography>

        <StatRow
          icon={<Star />}
          label="Điểm trung bình"
          value={service.ratingAverage.toFixed(
            1
          )}
        />

        <StatRow
          icon={<Star />}
          label="Số lượt đánh giá"
          value={service.ratingCount}
        />

        {/* ================= SCORE ================= */}

        <Typography
          fontWeight={700}
          sx={{ mt: 3 }}
        >
          Điểm hệ thống
        </Typography>

        <StatRow
          icon={<TrendingUp />}
          label="Popularity Score"
          value={service.popularityScore}
        />

        <StatRow
          icon={<TrendingUp />}
          label="Priority"
          value={service.priority}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ServiceStatisticsDialog