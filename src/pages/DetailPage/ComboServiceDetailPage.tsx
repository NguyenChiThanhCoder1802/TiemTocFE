import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Chip,
  Divider,
  Stack,
  Button
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import CategoryIcon from '@mui/icons-material/Category'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LayersIcon from '@mui/icons-material/Layers'

import { getCategoryName } from '../../utils/CategoryHelper'
import { getComboBySlug } from '../../api/ComboAPI'
import type { Combo } from '../../types/Combo/Combo'

const ComboServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const theme = useTheme()
  const navigate = useNavigate()

  const [combo, setCombo] = useState<Combo | null>(null)
  const [loading, setLoading] = useState(true)

  /* ================= FETCH ================= */
  useEffect(() => {
    if (!slug) return

    const loadCombo = async () => {
      try {
        const data = await getComboBySlug(slug)
        setCombo(data)
      } finally {
        setLoading(false)
      }
    }

    loadCombo()
  }, [slug])

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
      {/* ================= TOP ================= */}
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={5}
      >
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
              borderRadius: 4,
              boxShadow: '0 12px 32px rgba(0,0,0,0.15)'
            }}
          />
        </Box>

        {/* INFO */}
        <Box flex={1}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {combo.name}
          </Typography>

          {/* PRICE */}
          <Box mb={2}>
            {originalTotal > combo.pricing.comboPrice && (
              <Typography
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                  fontSize: 14
                }}
              >
                {new Intl.NumberFormat('vi-VN').format(originalTotal)}₫
              </Typography>
            )}

            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: theme.palette.primary.main }}
            >
              {new Intl.NumberFormat('vi-VN').format(
                combo.pricing.comboPrice
              )}₫
            </Typography>

            {/* ACTIVE PERIOD ngay dưới giá */}
            {combo.activePeriod?.startAt &&
              combo.activePeriod?.endAt && (
                <Stack
                  direction="row"
                  spacing={1}
                  mt={1}
                  alignItems="center"
                >
                  <CalendarMonthIcon fontSize="small" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Từ{' '}
                    {new Date(
                      combo.activePeriod.startAt
                    ).toLocaleDateString('vi-VN')}
                    {' – '}
                    {new Date(
                      combo.activePeriod.endAt
                    ).toLocaleDateString('vi-VN')}
                  </Typography>
                </Stack>
              )}
          </Box>

          {/* META */}
          <Stack
            direction="row"
            spacing={1}
            mb={2}
            flexWrap="wrap"
          >
            {combo.category && (
              <Chip
                icon={<CategoryIcon />}
                label={getCategoryName(combo.category)}
              />
            )}

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
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              mb={2}
            >
              {combo.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                />
              ))}
            </Stack>
          )}

          <Button
            fullWidth
            size="large"
            variant="contained"
            sx={{
              mt: 3,
              height: 52,
              fontWeight: 600,
              borderRadius: 3
            }}
            onClick={() =>
              navigate(`/customer/booking/combo/${slug}`)
            }
          >
            Đặt combo ngay
          </Button>
        </Box>
      </Box>

      {/* ================= DESCRIPTION ================= */}
      <Box mt={6}>
        <Divider sx={{ mb: 3 }} />
        <Typography
          variant="h5"
          fontWeight={600}
          gutterBottom
        >
          Mô tả combo
        </Typography>

        <Typography
          color="text.secondary"
          lineHeight={1.8}
        >
          {combo.description ||
            'Chưa có mô tả cho combo này.'}
        </Typography>
      </Box>

      {/* ================= SERVICES SNAPSHOT ================= */}
      <Box mt={6}>
        <Divider sx={{ mb: 3 }} />
        <Typography
          variant="h5"
          fontWeight={600}
          gutterBottom
        >
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
                bgcolor: '#fafafa'
              }}
            >
              <Box>
                <Typography fontWeight={600}>
                  {item.nameSnapshot}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {item.durationSnapshot} phút
                </Typography>
              </Box>

              <Typography fontWeight={600}>
                {new Intl.NumberFormat('vi-VN').format(
                  item.unitPriceSnapshot
                )}
                ₫
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Container>
  )
}

export default ComboServiceDetailPage