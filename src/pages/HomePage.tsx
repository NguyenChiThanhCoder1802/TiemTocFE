import { useEffect, useState } from 'react';
import { Box, Typography, Container} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ItemCardList from '../components/List/ItemCardList';
import ComboCard from '../components/BeautyCombo/ComboCard';
import { getCombos } from '../api/comboAPI';
import { GetTopPopularServicesAsync } from '../api/servicesAPI';
import type { ComboDto } from '../types/Combo';
import type { ServicePopularityDto } from '../types/Service';
import { useSnackbar } from 'notistack';
import Banner from '../components/Common/Banner';

const HomePage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<ServicePopularityDto[]>([]);
  const [combos, setCombos] = useState<ComboDto[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getCombos().then(setCombos).catch(console.error);
    GetTopPopularServicesAsync().then(setServices).catch(console.error);
  }, []);

  const handleBookCombo = (combo: ComboDto) => {
    navigate(`/book-combo/${combo.id}`);
  };

  const handleBookService = (serviceId: number) => {
    const existing = JSON.parse(localStorage.getItem('temporaryBookingServices') || '[]') as number[];

    if (existing.includes(serviceId)) {
      enqueueSnackbar('Bạn đã có dịch vụ này rồi!', { variant: 'info', autoHideDuration: 3000 });
      return;
    }

    localStorage.setItem('temporaryBookingServices', JSON.stringify([...existing, serviceId]));
    enqueueSnackbar('Bạn đã thêm dịch vụ thành công!', { variant: 'success', autoHideDuration: 2000 });
  };

  return (
    <Box>
      <Banner />
      <Container>
        <ItemCardList
          items={services.slice(0, 6)}
          title="Dịch vụ nổi bật"
          linkPrefix="services"
          onDragToBook={handleBookService}
        />
      </Container>

      <Box>
        <Container>
          <Typography variant="h5" gutterBottom>🎁 Combo Làm Đẹp Hot</Typography>
          {combos.length === 0 ? (
            <Typography>Hiện chưa có combo nào.</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {combos.map((combo) => (
                <Box
                  key={combo.id}
                  sx={{
                    width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 16px)' },
                  }}
                >
                  <ComboCard combo={combo} onBook={handleBookCombo} />
                </Box>
              ))}
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
