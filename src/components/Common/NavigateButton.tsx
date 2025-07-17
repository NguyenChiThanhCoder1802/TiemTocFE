import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NavigateButtonProps {
  label: string;
  route: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
  startIcon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

const NavigateButton = ({
  label,
  route,
  size = 'medium',
  variant = 'contained',
  startIcon,
  color = 'info',
}: NavigateButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      startIcon={startIcon}
      onClick={() => navigate(route)}
    >
      {label}
    </Button>
  );
};

export default NavigateButton;
