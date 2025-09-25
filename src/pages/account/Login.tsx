import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {TextField, Button, Typography, Alert,InputAdornment, Box, IconButton}from '@mui/material';
import { LockOutlined, PersonOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import { getDecodedToken } from '../../services/authService';
import { loginApi } from '../../api/accountAPI';
import { LoginWrapper, LoginContainer, AvatarCircle } from '../../styles/LoginStyles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const { token } = await loginApi({ email, password });
    localStorage.setItem("token", token);
    const user = getDecodedToken(token);

    if (user?.role === "Admin") {
      navigate("/admin/dashboard");
    } else if (user?.role === "Staff") {
      navigate("/staff/home");
    } else {
      navigate("/"); // Khách hàng mặc định
    }

    setMessage("Đăng nhập thành công!");
  } catch (err: unknown) {
    setMessage(err instanceof Error ? err.message : "Có lỗi xảy ra");
  }
};


  return (
    <LoginWrapper>
      <LoginContainer elevation={6}>
        <AvatarCircle>
          <LockOutlined fontSize="large" color="primary" />
        </AvatarCircle>
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Đăng Nhập        
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setMessage(''); }}
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
            onChange={e => { setPassword(e.target.value); setMessage(''); }}
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
                  <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: 8 }}>
            Đăng nhập
          </Button>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 4 }}>
            <Typography variant="body2" sx={{ cursor: 'pointer', color: 'primary.main' }} onClick={() => navigate('/forgot-password')}>
              Quên mật khẩu?
            </Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer', color: 'primary.main' }} onClick={() => navigate('/register')}>
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
