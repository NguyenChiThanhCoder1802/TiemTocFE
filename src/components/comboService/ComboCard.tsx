import {
  Box,
  Typography,
  Card,
  CardMedia,
} from '@mui/material'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Combo } from '../../types/Combo/Combo'

import StarIcon from '@mui/icons-material/Star'
import VisibilityIcon from '@mui/icons-material/Visibility'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'

const MotionBox = motion(Box)

interface ComboCardProps {
  item: Combo
  index: number
  linkPrefix: string
}

const ComboCard = ({
  item,
  index,
  linkPrefix,
}: ComboCardProps) => {
  const imageUrl = item.images?.[0] || '/placeholder.png'

  /* ================= DISCOUNT LOGIC (GIỮ NGUYÊN) ================= */
  const discountAmount =
    item.pricing.originalPrice - item.pricing.comboPrice

  const discountPercent =
    item.pricing.originalPrice > 0
      ? Math.round(
          (discountAmount / item.pricing.originalPrice) * 100
        )
      : 0

  const serviceCount = item.services.length

  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      sx={{ width: '100%' }}
    >
      <Card
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
          transition: '0.3s',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
            '& img': { transform: 'scale(1.06)' }
          }
        }}
      >
        {/* ================= IMAGE ================= */}
        <Box sx={{ position: 'relative' }}>
          <Link to={`/${linkPrefix}/${item.slug}`}>
            <CardMedia
              component="img"
              image={imageUrl}
              alt={item.name}
              sx={{
                height: 200,
                objectFit: 'cover',
                transition: 'transform 0.5s ease'
              }}
            />
          </Link>

          {/* BADGE GIẢM GIÁ */}
          {discountPercent > 0 && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                px: 1.1,
                py: 0.3,
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 700,
                color: '#fff',
                backgroundColor: '#dc7f06',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                boxShadow: '0 4px 10px rgba(0,0,0,0.25)'
              }}
            >
              <LocalOfferIcon sx={{ fontSize: 14 }} />
              -{discountPercent}%
            </Box>
          )}

          {/* TIẾT KIỆM */}
          {discountAmount > 0 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 12,
                left: 12,
                bgcolor: 'rgba(0,0,0,0.75)',
                color: '#fff',
                px: 1,
                py: 0.3,
                borderRadius: 2,
                fontSize: 11,
                fontWeight: 600
              }}
            >
              Tiết kiệm{' '}
              {new Intl.NumberFormat('vi-VN').format(discountAmount)}đ
            </Box>
          )}
        </Box>

        {/* ================= INFO ================= */}
        <Box sx={{ p: 2, flexGrow: 1 }}>
          {/* NAME + PRICE */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1
            }}
          >
            <Typography fontWeight={600} noWrap sx={{ flex: 1 }}>
              {item.name}
            </Typography>

            <Typography
              fontWeight={700}
              sx={{
                color: 'primary.main',
                whiteSpace: 'nowrap'
              }}
            >
              {new Intl.NumberFormat('vi-VN').format(
                item.pricing.comboPrice
              )}đ
            </Typography>
          </Box>

          {/* GIÁ GỐC */}
          <Typography
            variant="body2"
            sx={{
              textDecoration: 'line-through',
              color: 'text.secondary',
              mt: 0.5
            }}
          >
            {new Intl.NumberFormat('vi-VN').format(
              item.pricing.originalPrice
            )}đ
          </Typography>

          {/* META */}
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1.2,
              color: 'text.secondary'
            }}
          >
            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <StarIcon sx={{ fontSize: 16, color: '#f5a623' }} />
              <Typography variant="body2" fontWeight={600}>
                {item.rating.average.toFixed(1)}
              </Typography>
              <Typography variant="caption">
                ({item.rating.count})
              </Typography>
            </Box>

            <Typography>•</Typography>

            {/* View */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <VisibilityIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2">
                {item.stats.viewCount}
              </Typography>
            </Box>

            <Typography>•</Typography>

            {/* Booking */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <EventAvailableIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2">
                {item.stats.bookingCount || 0}
              </Typography>
            </Box>
          </Box>

          {/* SERVICE INFO */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, textAlign: 'center' }}
          >
            {serviceCount} dịch vụ • {item.duration} phút
          </Typography>
        </Box>

       
      </Card>
    </MotionBox>
  )
}

export default ComboCard