import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

import { fetchPublicStaffs } from '../api/staffAPI'
import { fetchServices, getMostFavoritedServices, getFeaturedServices, getLatestServices } from '../api/servicesAPI'
import { fetchCombos } from '../api/ComboAPI'

import StaffCardList from '../components/staff/StaffCardList'
import ItemCardList from '../components/Services/ItemCardList'
import ComboCardList from '../components/comboService/ComboCardList'

import type { ServiceCard } from '../types/HairService/ServiceCard'
import type { Staff } from '../types/Staff/Staff'
import type { Combo } from '../types/Combo/Combo'

const HomePage = () => {
  const [service, setServices] = useState<ServiceCard[]>([])
  const [staffs, setStaffs] = useState<Staff[]>([])
  const [combos, setCombos] = useState<Combo[]>([])
  const [favoriteServices, setFavoriteServices] = useState<ServiceCard[]>([])
  const [featuredServices, setFeaturedServices] = useState<ServiceCard[]>([])
  const [latestServices, setLatestServices] = useState<ServiceCard[]>([])
const [loadingLatest, setLoadingLatest] = useState(false)
  const [loadingPage, setLoadingPage] = useState(true)
  const [loadingFavorites, setLoadingFavorites] = useState(false)
  const [loadingFeatured, setLoadingFeatured] = useState(false)
  const [loadingCombos] = useState(false)

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadInitial = async () => {
      try {
        setLoadingPage(true)
        setLoadingFavorites(true)
        setLoadingFeatured(true)
        setLoadingLatest(true)
        const [
          serviceData,
          staffData,
          comboData,
          favoriteData,
          featuredData,
          latestData
        ] = await Promise.all([
          fetchServices(),
          fetchPublicStaffs(),
          fetchCombos({ isActive: true }),
          getMostFavoritedServices(8),
          getFeaturedServices(8),
          getLatestServices(8)
        ])

        setServices(serviceData)
        setStaffs(staffData)
        setCombos(comboData)
        setFavoriteServices(favoriteData)
        setFeaturedServices(featuredData)
        setLatestServices(latestData)
      } catch {
        setError('Không thể tải dữ liệu')
      } finally {
        setLoadingPage(false)
        setLoadingFavorites(false)
        setLoadingFeatured(false)
        setLoadingLatest(false)
      }
    }

    loadInitial()
  }, [])

  return (
    <Box sx={{ px: 3, pt: 2 }}>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {!loadingPage && (
        <>
        {featuredServices.length > 0 && (
          <ItemCardList
            items={featuredServices}
            title="Dịch vụ nổi bật"
            linkPrefix="services"
            loading={loadingFeatured}
          />)}
          <ItemCardList
            items={latestServices}
            title="Dịch vụ mới nhất"
            linkPrefix="services"
            loading={loadingLatest}
          />
          <ItemCardList
            items={service}
            title="Dịch vụ thường ngày"
            linkPrefix="services"
          />
          <ItemCardList
            items={favoriteServices}
            title="Được yêu thích nhất"
            linkPrefix="services"
            loading={loadingFavorites}
          />
          <ComboCardList
            items={combos}
            title="Combo tiết kiệm"
            linkPrefix="combos"
            loading={loadingCombos}
          />

          
          

          

          <StaffCardList
            staffs={staffs}
            title="Đội ngũ nhân viên"
          />
        </>
      )}
    </Box>
  )
}

export default HomePage