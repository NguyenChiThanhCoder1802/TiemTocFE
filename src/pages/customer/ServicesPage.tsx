import { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import { fetchServices } from '../../api/servicesAPI'
import type { Service } from '../../types/HairService/Service'
import ItemCardList from '../../components/Services/ItemCardList'
import CategorySidebar from '../../components/category/CategorySidebar'

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [categoryName, setCategoryName] = useState<string | null>(null)

  /* Load khi đổi category */
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true)
        const data = await fetchServices(categoryId ?? undefined)
        setServices(data)
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Không thể tải dịch vụ')
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [categoryId])

  return (
    <Box>
      {error && (
        <Typography color="error" sx={{ mt: 2, ml: 2 }}>
          {error}
        </Typography>
      )}

      <Box display="flex">
        {/* ===== SIDEBAR ===== */}
        <Box
          sx={{
            width: 260,
            px: 2,
            pt: 2,
            borderRight: '1px solid #eee'
          }}
        >
          <CategorySidebar
            value={categoryId}
            onChange={(value) => {
              setCategoryId(value.id)
              setCategoryName(value.name)
            }}
          />
        </Box>

        {/* ===== MAIN CONTENT ===== */}
        <Box
          sx={{
            flex: 1,
            px: 3,
            pt: 2
          }}
        >
          {/* ===== TITLE ===== */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 2
            }}
          >
            Dịch vụ{' '}
            {categoryName && (
              <Box
                component="span"
                sx={{
                  color: 'primary.main',
                  fontWeight: 800
                }}
              >
                - {categoryName}
              </Box>
            )}
          </Typography>

          {loading ? (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <CircularProgress />
              <Typography>Đang tải dịch vụ...</Typography>
            </Box>
          ) : services.length === 0 ? (
            <Typography>Không có dịch vụ nào.</Typography>
          ) : (
            <ItemCardList
              items={services}
              linkPrefix="services"
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default ServicesPage