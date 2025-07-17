import { useEffect, useState } from 'react';
import { getCombos } from '../api/comboAPI';
import type { ComboDto } from '../types/Combo';
import { Container, Typography, Box } from '@mui/material';
import ComboCard from '../components/BeautyCombo/ComboCard';
import { useNavigate } from 'react-router-dom';

const ComboListPage = () => {
  const [combos, setCombos] = useState<ComboDto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCombos();
        setCombos(data);
      } catch (error) {
        console.error('Lỗi khi tải combo:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        🎁 Combo Làm Đẹp
      </Typography>
      {combos.length === 0 ? (
        <Typography>Chưa có combo nào</Typography>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {combos.map((combo) => (
            <Box
              key={combo.id}
              sx={{
                width: {
                  xs: '100%',
                  sm: 'calc(50% - 16px)',
                  md: 'calc(33.33% - 16px)',
                },
              }}
            >
              <ComboCard
                combo={combo}
                onBook={() => navigate(`/book-combo/${combo.id}`)}
              />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default ComboListPage;
