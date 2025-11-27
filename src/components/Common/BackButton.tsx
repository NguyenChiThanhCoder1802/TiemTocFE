// Button trở về trang trước 1 Trang
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  label?: string;
}

const BackButton = ({ label = 'Quay lại' }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate(-1)}
      variant="outlined"
      color="primary"
      sx={{ mb: 2 }}
    >
      {label}
    </Button>
  );
};

export default BackButton;
