import { styled,keyframes  } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
const waveAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
export const LoginWrapper = styled(Box)(() => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  background: 'linear-gradient(-45deg, #d2a679, #f5deb3, #fff8dc, #deb887)',
  backgroundSize: '400% 400%',
  animation: `${waveAnimation} 10s ease infinite`,
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
