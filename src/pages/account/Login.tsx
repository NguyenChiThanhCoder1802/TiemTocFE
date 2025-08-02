import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
  InputAdornment,Box
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  PersonOutline,
} from '@mui/icons-material';
import { getDecodedToken } from '../../services/authService';
import {
  LoginWrapper,
  LoginContainer,
  AvatarCircle,
} from '../../styles/LoginStyles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/account/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Đăng nhập thất bại');
      }

      const token = data.token;
      localStorage.setItem('token', token);

      const user = getDecodedToken(token);
      if (user) {
      

        if (user.role === 'Admin') {
          navigate('/admin/dashboard');
        } else if (user.role === 'Customer') {
          navigate('/');
        } else {
          navigate('/');
        }
      }

      setMessage('Đăng nhập thành công!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage('Có lỗi xảy ra');
      }
    }
  };

  return (
    <LoginWrapper>
      <LoginContainer elevation={6}>
        <AvatarCircle>
          <LockOutlined fontSize="large" color="primary" />
        </AvatarCircle>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          My Account
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutline />
                </InputAdornment>
              )
            }}
          />
          <TextField
            label="Mật khẩu"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(prev => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, borderRadius: 2 }}
          >
            Đăng nhập
          </Button>
          <Box
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'center',
                gap: 4, // khoảng cách giữa hai mục
               
              }}
            >
              <Typography
                variant="body2"
                sx={{ cursor: 'pointer', color: 'primary.main' }}
                onClick={() => navigate('/forgot-password')}
              >
                Quên mật khẩu?
              </Typography>
              <Typography
                variant="body2"
                sx={{ cursor: 'pointer', color: 'primary.main' }}
                onClick={() => navigate('/register')}
              >
                Đăng ký
              </Typography>
            </Box>


        </form>

        {message && (
          <Alert severity={message.includes('thành công') ? 'success' : 'error'} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
      </LoginContainer>
    </LoginWrapper>
  );
};

export default Login;

