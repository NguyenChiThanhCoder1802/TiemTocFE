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

import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LayersIcon from '@mui/icons-material/Layers'

import { fetchComboById } from '../../api/ComboAPI'
import type { Combo } from '../../types/Combo/Combo'

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

  /* ================= TÍNH TỔNG GIÁ GỐC ================= */
  const originalTotal = useMemo(() => {
    if (!combo) return 0
    return combo.services.reduce(
      (sum, s) => sum + s.unitPriceSnapshot,
      0
    )
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
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={5}>
        
        {/* IMAGE */}
        <Box flex={1}>
          <Box
            component="img"
            src={combo.images?.[0] || '/placeholder.png'}
            alt={combo.name}
            sx={{
              width: '100%',
              height: 420,
              objectFit: 'cover',
              borderRadius: 3,
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            }}
          />
        </Box>

        {/* INFO */}
        <Box flex={1}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {combo.name}
          </Typography>

          {/* CATEGORY */}
          {combo.category && (
            <Typography color="text.secondary" mb={1}>
              {combo.category}
            </Typography>
          )}

          {/* PRICE */}
          <Box mb={2}>
            {originalTotal > combo.pricing.comboPrice && (
              <Typography
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                  fontSize: 14,
                }}
              >
                {originalTotal.toLocaleString()}₫
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

          {/* TAGS */}
          {combo.tags?.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {combo.tags.map((tag, index) => (
                <Chip key={index} label={tag} size="small" />
              ))}
            </Stack>
          )}
        </Box>
      </Box>

      {/* DESCRIPTION */}
      <Box mt={6}>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Mô tả combo
        </Typography>
        <Typography color="text.secondary" lineHeight={1.8}>
          {combo.description || 'Chưa có mô tả cho combo này.'}
        </Typography>
      </Box>

      {/* SERVICES SNAPSHOT */}
      <Box mt={6}>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Dịch vụ trong combo
        </Typography>

        <Stack spacing={2}>
          {combo.services.map((item, index) => (
            <Stack
              key={index}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: '#f9f9f9'
              }}
            >
              <Box>
                <Typography fontWeight={600}>
                  {item.nameSnapshot}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.durationSnapshot} phút
                </Typography>
              </Box>

              <Typography fontWeight={600}>
                {item.unitPriceSnapshot.toLocaleString()}₫
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      {/* ACTIVE PERIOD */}
      {combo.activePeriod && (
        <Box mt={6}>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body2" color="text.secondary">
            Áp dụng từ{' '}
            {new Date(combo.activePeriod.startAt).toLocaleDateString()} 
            {' '}đến{' '}
            {new Date(combo.activePeriod.endAt).toLocaleDateString()}
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default ComboServiceDetailPage