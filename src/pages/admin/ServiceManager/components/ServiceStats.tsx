import {
  Box,
  Paper,
  Stack,
  Typography,
} from '@mui/material'

import {
  CalendarMonth,
  TrendingUp,
  Visibility,
  Star,
} from '@mui/icons-material'

import type { Service } from '../../../../types/HairService/Service'

interface Props {
  services: Service[]
}

const ServiceStats = ({ services }: Props) => {
  const totalBookings = services.reduce(
    (sum, service) => sum + service.bookingCount,
    0
  )

  const totalViews = services.reduce(
    (sum, service) => sum + service.viewCount,
    0
  )

  const totalFavorites = services.reduce(
    (sum, service) => sum + service.favoriteCount,
    0
  )

  const averageRating =
    services.length > 0
      ? services.reduce(
          (sum, service) =>
            sum + service.ratingAverage,
          0
        ) / services.length
      : 0

  const stats = [
    {
      label: 'Lượt đặt',
      value: totalBookings,
      icon: <CalendarMonth />,
    },
    {
      label: 'Lượt xem',
      value: totalViews,
      icon: <Visibility />,
    },
    {
      label: 'Lượt yêu thích',
      value: totalFavorites,
      icon: <TrendingUp />,
    },
    {
      label: 'Đánh giá trung bình',
      value: averageRating.toFixed(1),
      icon: <Star />,
    },
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        mb: 3,
      }}
    >
      {stats.map((stat) => (
        <Paper
          key={stat.label}
          elevation={0}
          sx={{
            flex: '1 1 220px',
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'action.hover',
              }}
            >
              {stat.icon}
            </Box>

            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                {stat.label}
              </Typography>

              <Typography
                variant="h6"
                fontWeight={700}
              >
                {stat.value}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      ))}
    </Box>
  )
}

export default ServiceStats