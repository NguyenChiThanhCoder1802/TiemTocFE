import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export const LoginWrapper = styled(Box)(() => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(to right bottom, #e0f7fa, #ff7043)',
  overflow: 'hidden',
}));


export const LoginContainer = styled(Paper)(({ theme }) => ({
  position: 'relative',
  width: 400,
  padding: theme.spacing(4),
  paddingTop: theme.spacing(6),
  borderRadius: 16,
  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  backgroundColor: '#fff',
  textAlign: 'center',
}));

export const AvatarCircle = styled(Box)(() => ({
  position: 'absolute',
  top: -32,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 64,
  height: 64,
  borderRadius: '50%',
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
