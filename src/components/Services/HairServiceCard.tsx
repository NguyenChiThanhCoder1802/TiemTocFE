import {
  Box,
  Typography,
  Card,
  CardMedia
} from '@mui/material'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { ServiceCard } from '../../types/HairService/ServiceCard'

import StarIcon from '@mui/icons-material/Star'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'

const MotionBox = motion(Box)

interface HairServiceCardProps {
  item: ServiceCard
  index: number
  linkPrefix: string
}

const HairServiceCard = ({
  item,
  index,
  linkPrefix
}: HairServiceCardProps) => {
  const imageUrl = item.images?.[0] || '/placeholder.png'

  /* ================= BADGE LOGIC ================= */
  const isSale = item.finalPrice < item.price

  const discountPercent = isSale
    ? Math.round(((item.price - item.finalPrice) / item.price) * 100)
    : 0

  const badgeLabel = isSale ? `-${discountPercent}%` : ''
  const badgeColor = isSale ? '#d2a679' : '#f57c00'

  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
     sx={{
        width: '100%'
      }}

    >
      <Card
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
          transition: '0.3s',
          height: '100%',
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

          {/* BADGE */}
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              px: 1.1,
              py: 0.25,
              borderRadius: 6,
              fontSize: 10,
              fontWeight: 700,
              color: '#fff',
              backgroundColor: badgeColor,
              boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
              backdropFilter: 'blur(4px)'
            }}
          >
            {badgeLabel}
          </Box>
        </Box>

        {/* ================= INFO ================= */}
        <Box sx={{ p: 2 }}>
          {/* NAME + PRICE */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              justifyContent: 'space-between'
            }}
          >
            <Typography
              fontWeight={600}
              noWrap
              sx={{ flex: 1 }}
            >
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
                item.finalPrice ?? item.price
              )}đ
            </Typography>
          </Box>

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
                {item.ratingAverage?.toFixed(1) || '0.0'}
              </Typography>
              <Typography variant="caption">
                ({item.ratingCount || 0})
              </Typography>
            </Box>

            <Typography>•</Typography>

            {/* View */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <VisibilityIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2">
                {item.viewCount || 0}
              </Typography>
            </Box>

            <Typography>•</Typography>

            {/* Booking */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <EventAvailableIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2">
                {item.bookingCount || 0}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </MotionBox>
  )
}

export default HairServiceCard
