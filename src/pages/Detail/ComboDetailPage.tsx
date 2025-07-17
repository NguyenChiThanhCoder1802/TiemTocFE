import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getComboById } from '../../api/comboAPI';
import type { ComboDto } from '../../types/Combo';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';

const ComboDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [combo, setCombo] = useState<ComboDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCombo = async () => {
      try {
        const data = await getComboById(Number(id));
        setCombo(data);
      } catch (err) {
        console.error('Không tìm thấy combo:', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadCombo();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ py: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!combo) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography>Combo không tồn tại.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        {combo.name}
      </Typography>
      <Box
        component="img"
       
        alt={combo.name}
        sx={{ width: '100%', maxHeight: 400, objectFit: 'cover', mb: 3 }}
      />
      <Typography variant="body1" sx={{ mb: 2 }}>
        {combo.description}
      </Typography>
      <Typography variant="h6" color="primary" gutterBottom>
        Giá khuyến mãi: {combo.discountedPrice.toLocaleString()} VND
        </Typography>

      <Button variant="contained" onClick={() => navigate(`/book-combo/${combo.id}`)}>
        Đặt combo ngay
      </Button>
    </Container>
  );
};

export default ComboDetailPage;
