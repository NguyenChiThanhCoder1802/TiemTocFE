
import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const ProfileWrapper = styled(Box)(() => ({
  width: '100vw',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(to right bottom, #e0f7fa, #ff7043)',
  overflow: 'hidden',
  padding: '40px 16px',
}));

export const ProfileContainer = styled(Paper)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: 500,
  padding: theme.spacing(4),
  paddingTop: theme.spacing(6),
  borderRadius: 16,
  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  backgroundColor: '#fff',
}));

export const AvatarCircle = styled(Box)(() => ({
  position: 'absolute',
  top: -48,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 96,
  height: 96,
  borderRadius: '50%',
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
