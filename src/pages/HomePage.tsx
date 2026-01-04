import { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';

import ItemCardList from '../components/Services/ItemCardList';
import { fetchServices } from '../api/servicesAPI';
import type { ServiceCard } from '../types/HairService/ServiceCard';

const HomePage = () => {

  const [services, setServices] = useState<ServiceCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const data = await fetchServices();
        setServices(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Lỗi tải dịch vụ');
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);



  return (
    <Box>


      <Container sx={{ mt: 4 }}>
        {loading && <Typography align="center">Đang tải dịch vụ...</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        {!loading && !error && (
          <ItemCardList
            items={services}
            title="🌟 Dịch vụ nổi bật"
            linkPrefix="services"
          />
        )}
      </Container>
    </Box>
  );
};

export default HomePage;
