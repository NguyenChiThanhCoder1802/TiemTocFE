import { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { fetchPublicStaffs } from '../api/staffAPI'
import StaffCardList from '../components/staff/StaffCardList'
import ItemCardList from '../components/Services/ItemCardList';
import { fetchServices } from '../api/servicesAPI';
import type { ServiceCard } from '../types/HairService/ServiceCard';

import type { Staff } from '../types/Staff/Staff'
import CategorySidebar from '../components/category/CategorySidebar'
const HomePage = () => {

  const [services, setServices] = useState<ServiceCard[]>([]);
   const [staffs, setStaffs] = useState<Staff[]>([])
  const [error, setError] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [loadingPage, setLoadingPage] = useState(true)     // load lần đầu
const [loadingServices, setLoadingServices] = useState(false) // đổi category


   useEffect(() => {
  const loadInitial = async () => {
    try {
      setLoadingPage(true)
      const [serviceData, staffData] = await Promise.all([
        fetchServices(),
        fetchPublicStaffs()
      ])
      setServices(serviceData)
      setStaffs(staffData)
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
