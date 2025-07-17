import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { fetchServices } from '../../api/apiService';
import type { Service } from '../../types/Service';
import ItemCardList from '../../components/List/ItemCardList';
import BookingFab from '../../components/Common/BookingFab';
const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography variant="body1">Đang tải dịch vụ...</Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error">❌ Lỗi: {error}</Typography>
      </Box>
    );
  }
  if (services.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography>Không có dịch vụ nào để hiển thị.</Typography>
      </Box>
    );
  }

  return (
    <>
    <ItemCardList
      items={services}
      title="✂️ Dịch vụ làm đẹp"
      linkPrefix="services"
    />
    <BookingFab />
    </>
    
  );
};

export default ServicesPage;
