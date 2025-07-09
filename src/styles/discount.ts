
import { styled } from '@mui/material/styles';
import { Button, DialogTitle } from '@mui/material';

export const StyledBox = styled('div')(({ theme }) => ({
  maxWidth: 600,
  margin: '0 auto',
  padding: theme.spacing(2),
}));

export const Title = styled('h2')(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
  marginBottom: theme.spacing(2),
}));

export const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#115293',
  },
  marginBottom: theme.spacing(2),
}));

export const DiscountCard = styled('div')(({ theme }) => ({
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

export const DiscountBadge = styled('span')(({ theme }) => ({
  backgroundColor: '#4caf50',
  color: '#fff',
  padding: '4px 12px',
  borderRadius: '12px',
  fontWeight: 'bold',
  marginRight: theme.spacing(2),
  '&.orange': {
    backgroundColor: '#ff9800',
  },
}));

export const DiscountDetails = styled('div')(() => ({
  flexGrow: 1,
}));

export const DiscountCode = styled('span')(({ theme }) => ({
  fontWeight: 'bold',
  color: '#1976d2',
  marginLeft: theme.spacing(1),
}));

export const SaveButton = styled(Button)(() => ({
  backgroundColor: '#ff5722',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#e64a19',
  },
  padding: '4px 16px',
  borderRadius: '8px',
}));

export const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));
