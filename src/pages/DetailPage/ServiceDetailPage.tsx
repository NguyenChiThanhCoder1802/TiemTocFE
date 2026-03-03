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
  Stack,IconButton, Tooltip
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import ShareIcon from '@mui/icons-material/Share'
import StarIcon from '@mui/icons-material/Star'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CategoryIcon from '@mui/icons-material/Category'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import TimerIcon from '@mui/icons-material/Timer'
import { getCategoryName } from '../../utils/CategoryHelper'
import { fetchServiceBySlug } from '../../api/servicesAPI'

import type { Service } from '../../types/HairService/Service'
import ReviewList from '../../pages/customer/Review/ReviewList'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { toggleFavoriteService } from '../../api/UserAPI'
import  useAuth  from '../../hooks/useAuth'
import type { ServiceCard } from '../../types/HairService/ServiceCard'
import ItemCardList from '../../components/Services/ItemCardList'




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
  const { slug } = useParams<{ slug: string }>()
  const theme = useTheme()
  const navigate = useNavigate()
  const [mainImage, setMainImage] = useState<string | null>(null)

  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedServices, setRelatedServices] = useState<ServiceCard[]>([])
const [loadingRelated, setLoadingRelated] = useState(true)
const { user } = useAuth()

const [isFavorited, setIsFavorited] = useState(false)
const [favoriteCount, setFavoriteCount] = useState(0)
const [favLoading, setFavLoading] = useState(false)

  useEffect(() => {
    if (!slug) return
    const loadService = async () => {
      try {
        const data = await fetchServiceBySlug(slug)
        
        setService(data.service)
        setRelatedServices(data.relatedServices)
        setMainImage(data.service.images?.[0] || null)
      } finally {
        setLoading(false)
        setLoadingRelated(false) 
      }
    }
    loadService()
  }, [slug])
  useEffect(() => {
  if (!service || !user) return

  setFavoriteCount(service.favoriteCount || 0)
  setIsFavorited(
    user.favoriteServices?.includes(service._id) ?? false
  )
}, [service, user])
  const handleToggleFavorite = async () => {
  if (!user) {
    navigate('/login')
    return
  }

  if (!service) return

  try {
    setFavLoading(true)
    const res = await toggleFavoriteService(service._id)

    setIsFavorited(res.isFavorited)
    setFavoriteCount(res.favoriteCount)
  } finally {
    setFavLoading(false)
  }
}

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
        <Box flex={1}>
  {/* MAIN IMAGE */}
  <Box position="relative">
    <Box
      component="img"
      src={mainImage || '/placeholder.png'}
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
    <Stack
      direction="row"
      spacing={1}
      position="absolute"
      top={16}
      left={16}
    >
      {service.isFeatured && (
        <Chip
          icon={<WorkspacePremiumIcon />}
          label="FEATURED"
          sx={{ bgcolor: '#000', color: '#fff', fontWeight: 600 }}
        />
      )}

      {isHot && (
        <Chip
          icon={<LocalFireDepartmentIcon />}
          label="HOT"
          sx={{ bgcolor: '#e53935', color: '#fff', fontWeight: 600 }}
        />
      )}
    </Stack>
  </Box>

  {/* THUMBNAILS */}
  {service.images && service.images.length > 1 && (
    <Stack
      direction="row"
      spacing={1}
      mt={2}
      sx={{ overflowX: 'auto' }}
    >
      {service.images.map((img, idx) => (
        <Box
          key={idx}
          component="img"
          src={img}
          alt={`thumb-${idx}`}
          onClick={() => setMainImage(img)}
          sx={{
            width: 90,
            height: 70,
            objectFit: 'cover',
            borderRadius: 2,
            cursor: 'pointer',
            border:
              img === mainImage
                ? `2px solid ${theme.palette.primary.main}`
                : '2px solid transparent',
            opacity: img === mainImage ? 1 : 0.7,
            transition: 'all 0.2s',
            '&:hover': {
              opacity: 1,
            },
          }}
        />
      ))}
    </Stack>
  )}
</Box>


        {/* INFO */}
        <Box flex={1}>
         <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h4" fontWeight={700}>
              {service.name}
            </Typography>

            <Stack direction="row" spacing={1}>
              {/* FAVORITE */}
              <Tooltip title={isFavorited ? 'Bỏ yêu thích' : 'Yêu thích'}>
                <IconButton
                  color="error"
                  disabled={favLoading}
                  onClick={handleToggleFavorite}
                >
                  {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}  
                  {favoriteCount > 0 && (
                <Typography fontSize={14} color="text.secondary">
                  {favoriteCount}
                </Typography>
              )}

                </IconButton>
              </Tooltip>
            
              {/* SHARE */}
              <Tooltip title="Chia sẻ">
                <IconButton
                  onClick={() => {
                    navigator.share?.({
                      title: service.name,
                      url: window.location.href
                    }) || navigator.clipboard.writeText(window.location.href)
                  }}
                >
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>


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

          <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
            {getCategoryName(service.category) && (
              <Chip
                icon={<CategoryIcon />}
                label={getCategoryName(service.category)}
              />
            )}

            <Chip
              icon={<AccessTimeIcon />}
              label={`${service.duration} phút`}
            />
          </Stack>

         <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={() =>
            navigate('/customer/booking', {
              state: { serviceId: service._id }
            })
          }
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

          
        </Box>

        <ReviewList serviceId={service._id}/>

        
      </Box> 
      {relatedServices.length > 0 && (
      <Box mt={8}>
        <ItemCardList
          title="Có thể bạn sẽ thích"
          items={relatedServices}
          linkPrefix="services"
          loading={loadingRelated}
        />
      </Box>
    )}
    </Container>
   
  )
}

export default ServiceDetailPage
