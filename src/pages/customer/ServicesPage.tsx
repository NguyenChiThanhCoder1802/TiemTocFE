import { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import { fetchServices } from '../../api/servicesAPI'
import type { Service } from '../../types/HairService/Service'
import ItemCardList from '../../components/Services/ItemCardList'


const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices()
        setServices(data)
      } catch (err: unknown) {
        setError((err as Error).message || 'Không thể tải dịch vụ')
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography>Đang tải dịch vụ...</Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error">❌ Lỗi: {error}</Typography>
      </Box>
    )
  }

  if (services.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography>Không có dịch vụ nào để hiển thị.</Typography>
      </Box>
    )
  }

  return (
    <>


      <ItemCardList
        items={services}
        title="✂️ Dịch vụ làm đẹp"
        linkPrefix="services"
      />
    </>
  )
}

export default ServicesPage
