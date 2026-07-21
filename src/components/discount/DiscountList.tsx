import { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box
} from '@mui/material'

import { getDiscountCards } from '../../api/discountAPI'
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
  <Box
    sx={{
      minHeight:'100vh',
      background:'#fdf8f2',
      py:5
    }}
  >

    <Container>

      <Typography
        variant="h4"
        fontWeight={800}
        sx={{
          mb:1,
          color:'#3b2416',
          textAlign:'center'
        }}
      >
        Ưu đãi dành cho bạn
      </Typography>


      <Typography
        textAlign="center"
        sx={{
          mb:5,
          color:'#8b5e34'
        }}
      >
        Sử dụng mã giảm giá để nhận ưu đãi khi đặt lịch
      </Typography>




      {
        data.length === 0 ? (

          <Alert severity="info">
            Hiện chưa có thẻ giảm giá nào
          </Alert>

        )

        :

        (

          <Box
            sx={{
              display:'flex',
              flexWrap:'wrap',
              gap:3
            }}
          >

            {
              data.map(discount=>(

                <Box
                  key={discount._id}
                  sx={{
                    width:{
                      xs:'100%',
                      sm:'calc(50% - 12px)',
                      md:'calc(33.333% - 16px)'
                    }
                  }}
                >

                  <UserDiscountCard
                    discount={discount}
                  />


                </Box>

              ))
            }


          </Box>


        )
      }


    </Container>


  </Box>
)
}
