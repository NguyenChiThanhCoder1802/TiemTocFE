import { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { fetchPublicStaffs } from '../api/staffAPI'
import StaffCardList from '../components/staff/StaffCardList'
import ItemCardList from '../components/Services/ItemCardList';
import { fetchServices ,getMostFavoritedServices} from '../api/servicesAPI';
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


   useEffect(() => {
  const loadInitial = async () => {
    try {
      setLoadingPage(true)
      const [serviceData, staffData, comboData,favoriteData] = await Promise.all([
        fetchServices(),
        fetchPublicStaffs(),
        fetchCombos({ isActive: true }),
        getMostFavoritedServices(8)
      ])
      setServices(serviceData)
      setStaffs(staffData)
      setCombos(comboData)
       setFavoriteServices(favoriteData)
    } catch {
      setError('Không thể tải dữ liệu')
    } finally {
      setLoadingPage(false)
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
        <Container sx={{ mt: 2 }}>
           <ComboCardList
            items={combos}
            title="🔥 Combo tiết kiệm"
            linkPrefix="combos"
            loading={loadingCombos}
          />
           <ItemCardList
              items={favoriteServices}
              title="❤️ Được yêu thích nhất"
              linkPrefix="services"
              loading={loadingFavorites}
            />
          <ItemCardList
            items={services}
            title="🌟 Dịch vụ nổi bật"
            linkPrefix="services"
            loading={loadingServices}
          />

          <StaffCardList
            staffs={staffs}
            title="👨‍💼 Đội ngũ nhân viên"
          />
        </Container>
      </Box>
    )}
  </Box>
)

};

export default HomePage;
