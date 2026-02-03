import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Combo } from '../../types/Combo/Combo'
import VisibilityIcon from '@mui/icons-material/Visibility'
import StarIcon from '@mui/icons-material/Star'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'

const MotionBox = motion(Box)

interface ComboCardProps {
  item: Combo
  index: number
  linkPrefix: string
  onBookNow?: (comboId: string) => void
}

const ComboCard = ({
  item,
  index,
  linkPrefix,
  onBookNow,
}: ComboCardProps) => {
  const imageUrl = item.images?.[0] || '/placeholder.png'

  /* ================== CALCULATIONS ================== */
  const discountAmount =
    item.pricing.originalPrice - item.pricing.comboPrice

  const discountPercent =
    item.pricing.originalPrice > 0
      ? Math.round(
          (discountAmount / item.pricing.originalPrice) * 100
        )
      : 0

  const serviceCount = item.services.length

  /* ================== RENDER ================== */
  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      sx={{
        flex: {
          xs: '1 1 100%',
          sm: '1 1 calc(50% - 24px)',
          md: '1 1 calc(25% - 24px)',
        },
        maxWidth: {
          sm: 'calc(50% - 24px)',
          md: 'calc(25% - 24px)',
        },
      }}
    >
      <Card
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: item.isFeatured ? '2px solid #d2a679' : 'none',
          boxShadow: item.isFeatured
            ? '0 12px 32px rgba(210,166,121,0.45)'
            : '0 8px 24px rgba(0,0,0,0.08)',
          transition: 'all 0.35s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: item.isFeatured
              ? '0 18px 42px rgba(210,166,121,0.6)'
              : '0 16px 36px rgba(0,0,0,0.12)',
            '& img': {
              transform: 'scale(1.05)',
            },
          },
        }}
      >
        {/* ================== IMAGE ================== */}
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <Link
            to={`/${linkPrefix}/${item._id}`}
            style={{ textDecoration: 'none' }}
          >
            <CardMedia
              component="img"
              image={imageUrl}
              alt={item.name}
              sx={{
                height: 220,
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
            />
          </Link>

          {/* Gradient overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'linear-gradient(to top, rgba(0,0,0,0.35), transparent 60%)',
            }}
          />

          {/* 🔥 DISCOUNT PERCENT */}
          {discountPercent > 0 && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                bgcolor: 'primary.main',
                color: '#fff',
                px: 1.2,
                py: 0.4,
                borderRadius: 2,
                fontSize: 13,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <LocalOfferIcon sx={{ fontSize: 16 }} />
              -{discountPercent}%
            </Box>
          )}

          {/* 💰 SAVE AMOUNT */}
          {discountAmount > 0 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 12,
                left: 12,
                bgcolor: 'rgba(0,0,0,0.75)',
                color: '#fff',
                px: 1.2,
                py: 0.4,
                borderRadius: 2,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              Tiết kiệm{' '}
              {new Intl.NumberFormat('vi-VN').format(discountAmount)}đ
            </Box>
          )}

          {/* ⭐ FEATURED */}
          {item.isFeatured && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                bgcolor: '#d2a679',
                color: '#000',
                px: 1.2,
                py: 0.4,
                borderRadius: 2,
                fontSize: 13,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <StarIcon sx={{ fontSize: 16 }} />
              Nổi bật
            </Box>
          )}
        </Box>

        {/* ================== CONTENT ================== */}
        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography variant="h6" fontWeight={600} noWrap>
            {item.name}
          </Typography>

          {item.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{ mt: 0.5 }}
            >
              {item.description}
            </Typography>
          )}

          {/* PRICE */}
          <Box sx={{ mt: 1 }}>
            <Typography
              variant="body2"
              sx={{
                textDecoration: 'line-through',
                color: 'text.secondary',
              }}
            >
              {new Intl.NumberFormat('vi-VN').format(
                item.pricing.originalPrice
              )}
              đ
            </Typography>

            <Typography
              variant="h6"
              fontWeight={700}
              color="primary.main"
            >
              {new Intl.NumberFormat('vi-VN').format(
                item.pricing.comboPrice
              )}
              đ
            </Typography>

            {/* SERVICE COUNT */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {serviceCount} dịch vụ • {item.duration} phút
            </Typography>
          </Box>
        </CardContent>

        {/* ================== RATING + VIEW ================== */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1.5,
            mb: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
            <StarIcon sx={{ fontSize: 18, color: '#f5a623' }} />
            <Typography variant="body2" fontWeight={600}>
              {item.rating.average.toFixed(1)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ({item.rating.count})
            </Typography>
          </Box>

          <Typography color="text.secondary">•</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
            <VisibilityIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2" color="text.secondary">
              {item.stats.viewCount}
            </Typography>
          </Box>
        </Box>

        {/* ================== ACTION ================== */}
        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              borderRadius: 3,
              py: 1,
              fontWeight: 600,
              textTransform: 'none',
            }}
            onClick={() => onBookNow?.(item._id)}
          >
            Đặt combo
          </Button>
        </CardActions>
      </Card>
    </MotionBox>
  )
}

export default ComboCard
