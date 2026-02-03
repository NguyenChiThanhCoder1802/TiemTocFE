import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

import { getMyFavoriteServices } from '../../../api/UserAPI'
import type { ServiceCard } from '../../../types/HairService/ServiceCard'
import ItemCardList from '../../../components/Services/ItemCardList'

const FavoriteServicesPage = () => {
  const [services, setServices] = useState<ServiceCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await getMyFavoriteServices()
        setServices(data)
      } finally {
        setLoading(false)
      }
    }

    loadFavorites()
  }, [])

  if (!loading && services.length === 0) {
    return (
      <Typography align="center" mt={4} color="text.secondary">
        Bạn chưa yêu thích dịch vụ nào ❤️
      </Typography>
    )
  }

  return (
    <Box mt={2}>
      <ItemCardList
        title="Dịch vụ yêu thích"
        items={services}
        linkPrefix="services"
        loading={loading}
      />
    </Box>
  )
}

export default FavoriteServicesPage
