import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { fetchServices, fetchServicesByCategory} from '../../api/servicesAPI';
import{fetchCategories} from '../../api/categoryApi'
import type { Service } from '../../types/Service';
import type { Category } from '../../types/Category';
import ItemCardList from '../../components/List/ItemCardList';
import BackButton from '../../components/Common/BackButton';

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');

  // Lấy danh mục khi load trang
  useEffect(() => {
    Promise.all([fetchCategories(), fetchServices()])
      .then(([cats, services]) => {
        setCategories(cats);
        setServices(services);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleCategoryChange = async (value: number | 'all') => {
    setSelectedCategory(value);
    setLoading(true);

    try {
      if (value === 'all') {
        setServices(await fetchServices());
      } else {
        setServices(await fetchServicesByCategory(value));
      }
    } catch (err: unknown) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
  if (services.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography>Không có dịch vụ nào để hiển thị.</Typography>
      </Box>
    );
  }

  return (
    <>
      <BackButton />

      {/* Bộ lọc danh mục */}
      <Box sx={{ maxWidth: 300, mx: 'auto', mt: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Chọn danh mục</InputLabel>
          <Select
            value={selectedCategory}
            label="Chọn danh mục"
            onChange={(e) => handleCategoryChange(e.target.value as number | 'all')}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Danh sách dịch vụ */}
      <ItemCardList
        items={services}
        title="✂️ Dịch vụ làm đẹp"
        linkPrefix="services"
      />
    </>
  );
};

export default ServicesPage;
