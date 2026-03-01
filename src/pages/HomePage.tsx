import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { fetchPublicStaffs } from '../api/staffAPI'
import StaffCardList from '../components/staff/StaffCardList'
import ItemCardList from '../components/Services/ItemCardList';
import { fetchServices ,getMostFavoritedServices, getFeaturedServices} from '../api/servicesAPI';
import type { ServiceCard } from '../types/HairService/ServiceCard';

import type { Staff } from '../types/Staff/Staff'
import CategorySidebar from '../components/category/CategorySidebar'
import { fetchCombos } from '../api/ComboAPI'
import ComboCardList from '../components/comboService/ComboCardList'
import type { Combo } from '../types/Combo/Combo'

const HomePage = () => {

  const [services, setServices] = useState<ServiceCard[]>([]);
   const [staffs, setStaffs] = useState<Staff[]>([])
  const [error, setError] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [loadingPage, setLoadingPage] = useState(true)     // load lần đầu
  const [combos, setCombos] = useState<Combo[]>([])
const [loadingCombos, setLoadingCombos] = useState(false)
  const [favoriteServices, setFavoriteServices] = useState<ServiceCard[]>([])
const [loadingFavorites, setLoadingFavorites] = useState(false)

const [loadingServices, setLoadingServices] = useState(false) // đổi category
const [featuredServices, setFeaturedServices] = useState<ServiceCard[]>([])
const [loadingFeatured, setLoadingFeatured] = useState(false)


   useEffect(() => {
  const loadInitial = async () => {
    try {
      setLoadingPage(true)
      setLoadingFeatured(true)
      setLoadingFavorites(true)

      const [serviceData, staffData, comboData,favoriteData, featuredData] = await Promise.all([
        fetchServices(),
        fetchPublicStaffs(),
        fetchCombos({ isActive: true }),
        getMostFavoritedServices(8),
        getFeaturedServices(8)
      ])
      setServices(serviceData)
      setStaffs(staffData)
      setCombos(comboData)
       setFavoriteServices(favoriteData)
        setFeaturedServices(featuredData)
    } catch {
      setError('Không thể tải dữ liệu')
    } finally {
      setLoadingPage(false)
      setLoadingFeatured(false)
      setLoadingFavorites(false)
    }
  }

  loadInitial()
}, [])

 useEffect(() => {
  const loadServicesByCategory = async () => {
    try {
      setLoadingServices(true)
      const data = await fetchServices(categoryId ?? undefined)
      setServices(data)
    } catch {
      setError('Không thể tải dịch vụ')
    } finally {
      setLoadingServices(false)
    }
  }

  loadServicesByCategory()
}, [categoryId])




 return (
  <Box>
    {error && (
      <Typography color="error" sx={{ mt: 2, ml: 2 }}>
        {error}
      </Typography>
    )}

    {!loadingPage && (
      <Box display="flex">
        {/* ===== SIDEBAR SÁT TRÁI ===== */}
        <Box
          sx={{
            width: 260,
            px: 2,
            pt: 2,            // sát header
            borderRight: '1px solid #eee'
          }}
        >
          <CategorySidebar
            value={categoryId}
            onChange={setCategoryId}
          />
        </Box>

        {/* ===== MAIN CONTENT ===== */}
       <Box
          sx={{
            flex: 1,
            px: 3,        // padding ngang vừa phải
            pt: 2
          }}
        >
           <ComboCardList
            items={combos}
            title="Combo tiết kiệm"
            linkPrefix="combos"
            loading={loadingCombos}
          />
           <ItemCardList
              items={favoriteServices}
              title="Được yêu thích nhất"
              linkPrefix="services"
              loading={loadingFavorites}
            />
          <ItemCardList
            items={featuredServices}
            title="Dịch vụ nổi bật"
            linkPrefix="services"
            loading={loadingFeatured}
          />

          <StaffCardList
            staffs={staffs}
            title="👨‍💼 Đội ngũ nhân viên"
          />
        </Box>
      </Box>
    )}
  </Box>
)

};

export default HomePage;
