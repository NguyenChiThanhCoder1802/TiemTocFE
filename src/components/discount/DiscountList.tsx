import { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box
} from '@mui/material'

import { getDiscountCards } from '../../api/DiscountAPI'
import type { DiscountCard } from '../../types/Discount/Discount'
import { UserDiscountCard } from './UserDiscountCard'

export default function DiscountListPage() {
  const [data, setData] = useState<DiscountCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getDiscountCards()
      .then(res => {
        setData(res.filter(d => d.isActive && !d.isDeleted))
      })
      .catch(() => setError('Không thể tải danh sách ưu đãi'))
      .finally(() => setLoading(false))
  }, [])

  const handleApply = (code: string) => {
    console.log('Apply discount:', code)
  }

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 6 }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" gutterBottom>
        🎁 Ưu đãi dành cho bạn
      </Typography>

      {data.length === 0 ? (
        <Alert severity="info">
          Hiện chưa có thẻ giảm giá nào
        </Alert>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          {data.map(discount => (
            <Box
              key={discount._id}
              sx={{
                width: {
                  xs: '100%',
                  sm: 'calc(50% - 8px)',
                  md: 'calc(33.333% - 10.7px)'
                }
              }}
            >
              <UserDiscountCard
                discount={discount}
                onApply={handleApply}
              />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  )
}
