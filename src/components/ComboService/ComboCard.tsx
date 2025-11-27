import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import type { ComboDto } from '../../types/Combo';
import { useNavigate } from 'react-router-dom';

interface Props {
  combo: ComboDto;
  onBook: (combo: ComboDto) => void;
}

const ComboCard = ({ combo, onBook }: Props) => {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/combos/${combo.id}`);
  };

  return (
    <Card
      sx={{
        mb: 2,
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.01)' },
      }}
      onClick={handleViewDetail}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {combo.name}
        </Typography>
        <Typography color="textSecondary">{combo.description}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
        Giá gốc: {combo.originalPrice.toLocaleString()}₫
      </Typography>
        <Typography fontWeight="bold" color="primary" mt={1}>
          Giá khuyến mãi: {combo.discountedPrice.toLocaleString()}₫
        </Typography>
        <Typography variant="body2">
          ⏳ {combo.startDate} → {combo.endDate}
        </Typography>
        <Box mt={1}>
          <ul>
            {combo.services.map((s) => (
              <li key={s.id}>{s.name}</li>
            ))}
          </ul>
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              onBook(combo);
            }}
          >
            Đặt combo này
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ComboCard;
