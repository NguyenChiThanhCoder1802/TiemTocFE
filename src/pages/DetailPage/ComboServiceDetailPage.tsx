import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Chip,
  Divider,
  Stack
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import StarIcon from '@mui/icons-material/Star'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import LayersIcon from '@mui/icons-material/Layers'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import { fetchComboById } from '../../api/ComboAPI'
import type { Combo } from '../../types/Combo/Combo'

/* ================= COMPONENT ================= */
const ComboServiceDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const theme = useTheme()

  const [combo, setCombo] = useState<Combo | null>(null)
  const [loading, setLoading] = useState(true)

  /* ================= FETCH ================= */
  useEffect(() => {
    if (!id) return
    const loadCombo = async () => {
      try {
        const data = await fetchComboById(id)
        setCombo(data)
      } finally {
        setLoading(false)
      }
    }
    loadCombo()
  }, [id])

  /* ================= DISCOUNT ================= */
  const discountPercent = useMemo(() => {
    if (!combo) return 0
    const { originalPrice, comboPrice } = combo.pricing
    if (!originalPrice || originalPrice <= comboPrice) return 0
    return Math.round(
      ((originalPrice - comboPrice) / originalPrice) * 100
    )
  }, [combo])

  /* ================= HOT ================= */
  const isHot = useMemo(() => {
    if (!combo) return false
    return combo.stats.bookingCount > 20 || combo.popularityScore > 50
  }, [combo])

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    )
  }

  if (!combo) {
    return (
      <Typography align="center" mt={10}>
        Không tìm thấy combo
      </Typography>
    )
  }

  return (
    <Container sx={{ mt: 6, mb: 10 }}>
      {/* ================= TOP ================= */}
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={5}>
        {/* ================= IMAGE ================= */}
        <Box flex={1}>
          <Box position="relative">
            <Box
              component="img"
              src={combo.images?.[0] || '/placeholder.png'}
              alt={combo.name}
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
              {combo.isFeatured && (
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

              {discountPercent > 0 && (
                <Chip
                  label={`-${discountPercent}%`}
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: '#fff',
                    fontWeight: 700,
                  }}
                />
              )}
            </Stack>

            {/* SERVICE COUNT */}
            <Chip
              icon={<LayersIcon />}
              label={`${combo.services.length} dịch vụ`}
              sx={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                bgcolor: 'rgba(255,255,255,0.9)',
                fontWeight: 600,
              }}
            />
          </Box>
        </Box>

        {/* ================= INFO ================= */}
        <Box flex={1}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {combo.name}
          </Typography>

          {/* STATS */}
          <Stack direction="row" spacing={2} mb={2} alignItems="center">
            <Stack direction="row" spacing={0.5} alignItems="center">
              <StarIcon sx={{ color: '#f5a623' }} />
              <Typography fontWeight={600}>
                {combo.rating.average.toFixed(1)}
              </Typography>
              <Typography color="text.secondary">
                ({combo.rating.count})
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.5} alignItems="center">
              <VisibilityIcon />
              <Typography color="text.secondary">
                {combo.stats.viewCount}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.5} alignItems="center">
              <CalendarMonthIcon />
              <Typography color="text.secondary">
                {combo.stats.bookingCount} đã đặt
              </Typography>
            </Stack>
          </Stack>

          {/* PRICE */}
          <Box mb={2}>
            {combo.pricing.originalPrice >
              combo.pricing.comboPrice && (
              <Typography
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                  fontSize: 14,
                }}
              >
                {combo.pricing.originalPrice.toLocaleString()}₫
              </Typography>
            )}

            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: theme.palette.primary.main }}
            >
              {combo.pricing.comboPrice.toLocaleString()}₫
            </Typography>
          </Box>

          {/* META */}
          <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
            <Chip
              icon={<AccessTimeIcon />}
              label={`${combo.duration} phút`}
            />
            <Chip
              icon={<LayersIcon />}
              label={`${combo.services.length} dịch vụ`}
            />
          </Stack>
        </Box>
      </Box>

      {/* ================= DESCRIPTION ================= */}
      <Box mt={6}>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Mô tả combo
        </Typography>
        <Typography color="text.secondary" lineHeight={1.8}>
          {combo.description || 'Chưa có mô tả cho combo này.'}
        </Typography>
      </Box>

      {/* ================= SERVICES ================= */}
      <Box mt={6}>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Dịch vụ trong combo
        </Typography>

        <Stack spacing={1.5}>
          {combo.services.map((item, index) => {
            const service =
              typeof item.service === 'string'
                ? null
                : item.service

            return (
              <Stack
                key={index}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>
                  {service?.name ?? 'Dịch vụ'}
                  {item.quantity > 1 && ` x${item.quantity}`}
                </Typography>
                <Typography color="text.secondary">
                  {service?.finalPrice?.toLocaleString()}₫
                </Typography>
              </Stack>
            )
          })}
        </Stack>
      </Box>
    </Container>
  )
}

export default ComboServiceDetailPage
