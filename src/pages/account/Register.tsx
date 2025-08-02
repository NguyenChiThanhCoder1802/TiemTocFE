import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  MenuItem
} from '@mui/material';
import {
  PersonOutline,
  LockOutlined,
  Visibility,
  VisibilityOff,
  EmailOutlined,
} from '@mui/icons-material';
import {
  LoginWrapper,
  LoginContainer,
  AvatarCircle,
} from '../../styles/LoginStyles';

const Register = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState('Customer');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage('❌ Mật khẩu không khớp');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/account/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName, password, role })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(typeof data === 'string' ? data : data.message);
      }
      localStorage.setItem('pendingEmail', email);
      navigate('/otp', { state: { email } });
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
          Tạo tài khoản
        </Typography>

        <form onSubmit={handleRegister}>
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
                  <EmailOutlined />
                </InputAdornment>
              )
            }}
          />
          <TextField
            label="Họ và tên"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
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
                  <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            label="Xác nhận mật khẩu"
            type={showPassword ? 'text' : 'password'}
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
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
          <TextField
            select
            label="Vai trò"
            value={role}
            onChange={e => setRole(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Customer">Khách hàng</MenuItem>
            <MenuItem value="Staff">Nhân viên</MenuItem>
            <MenuItem value="Admin">Chủ</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, borderRadius: 2 }}
          >
            Đăng ký
          </Button>
        </form>

        {message && (
          <Alert severity={message.includes('khớp') || message.includes('lỗi') ? 'error' : 'success'} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
      </LoginContainer>
    </LoginWrapper>
  );
};

export default Register;
