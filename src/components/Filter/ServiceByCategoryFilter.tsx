// Hàm lọc dịch vụ theo tên
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  CircularProgress,
} from '@mui/material';
import { fetchServicesByCategory } from '../../api/servicesAPI';
import { fetchCategories } from '../../api/categoryApi';
import type { Category } from '../../types/Category';
import type { Service } from '../../types/Service';

interface Props {
  onFilter: (services: Service[]) => void;
  onClearFilter: () => void;
}

export default function ServiceByCategoryFilter({ onFilter, onClearFilter }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        const serviceCategories = data.filter((c) => c.type === 'Service');
        setCategories(serviceCategories);
      } catch (error) {
        console.error('Lỗi tải danh mục:', error);
      }
    };
    loadCategories();
  }, []);

  const handleSelectCategory = async (categoryId: number) => {
    if (selectedCategoryId === categoryId) {
      // Bỏ chọn
      setSelectedCategoryId(null);
      onClearFilter();
      return;
    }

    setSelectedCategoryId(categoryId);
    setLoading(true);
    try {
      const data = await fetchServicesByCategory(categoryId);
      onFilter(data);
    } catch (error) {
      console.error('Lỗi tải dịch vụ:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Dịch vụ theo danh mục
      </Typography>
      <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategoryId === cat.id ? 'contained' : 'outlined'}
            onClick={() => handleSelectCategory(cat.id)}
            sx={{ textTransform: 'none' }}
          >
            {cat.name}
          </Button>
        ))}
      </Stack>

      {loading && (
        <Stack alignItems="center" my={2}>
          <CircularProgress />
        </Stack>
      )}
    </Box>
  );
}
