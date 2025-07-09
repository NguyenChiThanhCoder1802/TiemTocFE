import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';
import { fetchServices } from '../../api/apiService';
import type { Service } from '../../types/Service';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

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

  const handleUseService = (service: Service) => {
    const usedItem = {
      serviceName: service.name,
      price: service.price,
      source: 'onsite',
    };

    const stored = localStorage.getItem('invoice-items');
    const items = stored ? JSON.parse(stored) : [];

    items.push(usedItem);
    localStorage.setItem('invoice-items', JSON.stringify(items));

    alert(`✅ Đã thêm dịch vụ "${service.name}" vào hóa đơn!`);
  };

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

  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
        ✂️ Dịch vụ làm đẹp
      </Typography>

      <Box
        display="flex"
        flexWrap="wrap"
        gap={3}
        justifyContent="center"
      >
        {services.map((service, index) => (
          <MotionBox
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            sx={{
              flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 24px)', md: '1 1 calc(33.333% - 24px)' },
              maxWidth: { sm: 'calc(50% - 24px)', md: 'calc(33.333% - 24px)' },
            }}
          >
            <Card
              sx={{
                borderRadius: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 4,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              {service.imageUrl && (
                <CardMedia
                  component="img"
                  height="180"
                  image={service.imageUrl}
                  alt={service.name}
                />
              )}
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {service.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {service.description}
                </Typography>
                <Typography variant="subtitle1" color="primary" fontWeight="bold">
                  {service.price.toLocaleString()} VNĐ
                </Typography>
              </CardContent>
              <Box sx={{ px: 2, pb: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleUseService(service)}
                >
                  Sử dụng
                </Button>
              </Box>
            </Card>
          </MotionBox>
        ))}
      </Box>
    </Box>
  );
};

export default ServicesPage;
