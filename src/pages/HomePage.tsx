// src/pages/HomePage.tsx
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
} from '@mui/material';
import { useNavigate, useOutletContext } from 'react-router-dom';
import BookingFab from '../components/Common/BookingFab';
import ItemCardList from '../components/List/ItemCardList';
import ComboCard from '../components/BeautyCombo/ComboCard';
import { getCombos } from '../api/comboAPI';
import type { ComboDto } from '../types/Combo';
import type { Service } from '../types/Service';

interface OutletContextType {
  services: Service[];
  isFiltering: boolean;
}

const HomePage = () => {
  const navigate = useNavigate();
  const { services, isFiltering } = useOutletContext<OutletContextType>();
  const [combos, setCombos] = useState<ComboDto[]>([]);

  useEffect(() => {
    getCombos().then(setCombos).catch(console.error);
  }, []);

  const handleBookCombo = (combo: ComboDto) => {
    navigate(`/book-combo/${combo.id}`);
  };

  return (
    <>
      <Box
        sx={{
          background: 'linear-gradient(to right bottom, #e0f7fa, #ffccbc)',
          minHeight: '100vh',
          py: 8,
        }}
      >
        <Container>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            fontWeight="bold"
            color="primary"
          >
            Chào mừng đến với Tiệm Tóc Thanh
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" mb={6}>
            Đẹp mỗi ngày cùng đội ngũ chuyên nghiệp và sản phẩm chất lượng!
          </Typography>

          <Box textAlign="center" mt={4} mb={4}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/booking')}
            >
              Đặt lịch ngay
            </Button>
          </Box>

          <ItemCardList
            items={services.slice(0, isFiltering ? services.length : 6)}
            title={
              isFiltering ? 'Dịch vụ theo danh mục đã chọn' : 'Dịch vụ nổi bật'
            }
            linkPrefix="services"
            showActionButton
            actionLabel="Đặt ngay"
            onActionClick={(id) => navigate(`/booking?serviceId=${id}`)}
          />
        </Container>
        <BookingFab />
      </Box>

      {/* COMBO */}
      <Box sx={{ background: '#fff', py: 5 }}>
        <Container>
          <Typography variant="h5" gutterBottom>
            🎁 Combo Làm Đẹp Hot
          </Typography>
          {combos.length === 0 ? (
            <Typography>Hiện chưa có combo nào.</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {combos.map((combo) => (
                <Box
                  key={combo.id}
                  sx={{
                    width: {
                      xs: '100%',
                      sm: 'calc(50% - 16px)',
                      md: 'calc(33.333% - 16px)',
                    },
                  }}
                >
                  <ComboCard combo={combo} onBook={handleBookCombo} />
                </Box>
              ))}
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
