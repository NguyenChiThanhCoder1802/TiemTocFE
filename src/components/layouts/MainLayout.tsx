import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';

import Header from '../share/Header';
import Footer from '../share/Footer';
import TopBar from '../../components/share/TopBar';
import { fetchServices, fetchServicesByCategory } from '../../api/servicesAPI';
import type { Service } from '../../types/Service';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [services, setServices] = useState<Service[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const isHomePage = location.pathname === '/';

  // 🔹 Lấy categoryId nếu được chuyển từ TopBar (qua navigate + state)
  const categoryFromNav = location.state?.selectedCategoryId as number | undefined;

  // 🔹 Khi vừa vào Home hoặc vừa được navigate về Home với category
  useEffect(() => {
    const fetchInitialServices = async () => {
      try {
        if (isHomePage) {
          if (categoryFromNav !== undefined) {
            const filtered = await fetchServicesByCategory(categoryFromNav);
            setServices(filtered);
            setIsFiltering(true);
          } else if (!isFiltering && services.length === 0) {
            const all = await fetchServices();
            setServices(all);
          }
        }
      } catch (err) {
        console.error('Lỗi khi load dịch vụ:', err);
      }
    };

    fetchInitialServices();
  }, [isHomePage, categoryFromNav]);

  // 🔹 Hàm chọn danh mục (được truyền xuống TopBar)
  const handleCategorySelect = async (categoryId: number | null) => {
    if (!isHomePage) {
      // Chuyển về Home và truyền categoryId qua location.state
      navigate('/', { state: { selectedCategoryId: categoryId } });
      return;
    }

    try {
      if (categoryId === null) {
        const all = await fetchServices();
        setServices(all);
        setIsFiltering(false);
      } else {
        const filtered = await fetchServicesByCategory(categoryId);
        setServices(filtered);
        setIsFiltering(true);
      }
    } catch (err) {
      console.error('Lỗi khi lọc danh mục:', err);
    }
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <TopBar onCategorySelect={handleCategorySelect} />
      <Box component="main" flex={1} p={2}>
        <Outlet context={{ services, isFiltering }} />
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
