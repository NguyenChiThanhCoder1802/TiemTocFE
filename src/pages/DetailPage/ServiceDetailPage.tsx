import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Chip,
  Button,
  Divider,
  Stack
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import StarIcon from '@mui/icons-material/Star'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CategoryIcon from '@mui/icons-material/Category'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import TimerIcon from '@mui/icons-material/Timer'

import { fetchServiceById } from '../../api/servicesAPI'
import type { Service } from '../../types/HairService/Service'
import ReviewList from '../../pages/customer/Review/ReviewList'
import ReviewFormDialog from '../../pages/customer/Review/ReviewFormDialog'

/* ================= HELPERS ================= */
const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString('vi-VN') : ''

const isExpiringSoon = (endAt?: string, days = 3) => {
  if (!endAt) return false
  const diff =
    (new Date(endAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  return diff > 0 && diff <= days
}

/* ================= COMPONENT ================= */
const ServiceDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const theme = useTheme()

  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [openReview, setOpenReview] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!id) return
    const loadService = async () => {
      try {
        const data = await fetchServiceById(id)
        setService(data)
      } finally {
        setLoading(false)
      }
    }
    loadService()
  }, [id])

  const reloadReviews = () => setReloadKey(k => k + 1)

  /* ================= BADGES ================= */
  const isHot = useMemo(() => {
    if (!service) return false
    return service.bookingCount > 50 || service.popularityScore > 80
  }, [service])

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    )
  }

  if (!service) {
    return (
      <Typography align="center" mt={10}>
        Không tìm thấy dịch vụ
      </Typography>
    )
  }

  const discount = service.serviceDiscount
  const expiringSoon = discount?.isActive &&
    isExpiringSoon(discount.endAt)

  return (
    <Container sx={{ mt: 6, mb: 10 }}>
      {/* ================= TOP ================= */}
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={5}>
        {/* IMAGE */}
        <Box flex={1} position="relative">
          <Box
            component="img"
            src={service.images?.[0] || '/placeholder.png'}
            alt={service.name}
            sx={{
              width: '100%',
              height: 420,
              objectFit: 'cover',
              borderRadius: 4,
              boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
            }}
          />

          {/* BADGES */}
          <Stack direction="row" spacing={1} position="absolute" top={16} left={16}>
            {service.isFeatured && (
              <Chip
                icon={<WorkspacePremiumIcon />}
                label="FEATURED"
                sx={{
                  bgcolor: '#000',
                  color: '#fff',
                  fontWeight: 600,
                }}
              />
            )}

            {isHot && (
              <Chip
                icon={<LocalFireDepartmentIcon />}
                label="HOT"
                sx={{
                  bgcolor: '#e53935',
                  color: '#fff',
                  fontWeight: 600,
                }}
              />
            )}
          </Stack>
        </Box>

        {/* INFO */}
        <Box flex={1}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {service.name}
          </Typography>

          {/* STATS */}
          <Stack direction="row" spacing={2} mb={2} alignItems="center">
            <Stack direction="row" spacing={0.5} alignItems="center">
              <StarIcon sx={{ color: '#f5a623' }} />
              <Typography fontWeight={600}>
                {service.ratingAverage.toFixed(1)}
              </Typography>
              <Typography color="text.secondary">
                ({service.ratingCount})
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.5} alignItems="center">
              <VisibilityIcon />
              <Typography color="text.secondary">
                {service.viewCount}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.5} alignItems="center">
              <CalendarMonthIcon />
              <Typography color="text.secondary">
                {service.bookingCount} đã đặt
              </Typography>
            </Stack>
          </Stack>

          {/* PRICE */}
          <Box mb={2}>
            {discount?.isActive && discount.percent > 0 && (
              <Typography
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                  fontSize: 14,
                }}
              >
                {new Intl.NumberFormat('vi-VN').format(service.price)}đ
              </Typography>
            )}

            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: theme.palette.primary.main }}
            >
              {new Intl.NumberFormat('vi-VN').format(service.finalPrice)}đ
            </Typography>

            {discount?.isActive && discount.percent > 0 && (
              <Stack direction="row" spacing={1} mt={1} alignItems="center">
                <Chip
                  label={`Giảm ${discount.percent}%`}
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: '#fff',
                    fontWeight: 600,
                  }}
                />

                <Typography variant="body2" color="text.secondary">
                  {discount.startAt && <>Từ {formatDate(discount.startAt)}</>}
                  {discount.endAt && <> – {formatDate(discount.endAt)}</>}
                </Typography>

                {expiringSoon && (
                  <Chip
                    icon={<TimerIcon />}
                    label="Sắp hết hạn"
                    color="error"
                    size="small"
                  />
                )}
              </Stack>
            )}
          </Box>

          {/* META */}
          <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
            {service.category && (
              <Chip icon={<CategoryIcon />} label={service.category} />
            )}
            <Chip
              icon={<AccessTimeIcon />}
              label={`${service.duration} phút`}
            />
          </Stack>

          {/* CTA */}
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 600,
            }}
          >
            Đặt lịch ngay
          </Button>
        </Box>
      </Box>

      {/* ================= DESCRIPTION ================= */}
      <Box mt={6}>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Mô tả dịch vụ
        </Typography>
        <Typography color="text.secondary" lineHeight={1.8}>
          {service.description || 'Chưa có mô tả cho dịch vụ này.'}
        </Typography>
      </Box>

      {/* ================= REVIEWS ================= */}
      <Box mt={6}>
        <Divider sx={{ mb: 3 }} />

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight={600}>
            Đánh giá từ khách hàng
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenReview(true)}
            sx={{ borderRadius: 3, fontWeight: 600 }}
          >
            Viết đánh giá
          </Button>
        </Box>

        <ReviewList serviceId={service._id} reloadKey={reloadKey} />

        <ReviewFormDialog
          open={openReview}
          onClose={() => setOpenReview(false)}
          serviceId={service._id}
          onSuccess={reloadReviews}
        />
      </Box>
    </Container>
  )
}

export default ServiceDetailPage
