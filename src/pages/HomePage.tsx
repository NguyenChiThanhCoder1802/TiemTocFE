import { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { fetchPublicStaffs } from '../api/staffAPI'
import StaffCardList from '../components/staff/StaffCardList'
import ItemCardList from '../components/Services/ItemCardList';
import { fetchServices } from '../api/servicesAPI';
import type { ServiceCard } from '../types/HairService/ServiceCard';
import type { Staff } from '../types/Staff/Staff'
const HomePage = () => {

  const [services, setServices] = useState<ServiceCard[]>([]);
   const [staffs, setStaffs] = useState<Staff[]>([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [serviceData, staffData] = await Promise.all([
          fetchServices(),
          fetchPublicStaffs()
        ])
        setServices(serviceData)
        setStaffs(staffData)
      } catch {
        setError('Không thể tải dữ liệu')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])



  return (
    <Box>


      <Container sx={{ mt: 4 }}>
        {loading && <Typography align="center">Đang tải dịch vụ...</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        {!loading && !error && (
           <>
            <ItemCardList
              items={services}
              title="🌟 Dịch vụ nổi bật"
              linkPrefix="services"
            />

            <StaffCardList
              staffs={staffs}
              title="👨‍💼 Đội ngũ nhân viên"
            />
          </>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;
