import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
} from '@mui/material';
import { LockOutlined, Pin, EmailOutlined } from '@mui/icons-material';
import {
  LoginWrapper,
  LoginContainer,
  AvatarCircle,
} from '../../styles/LoginStyles';

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialEmail = location.state?.email || localStorage.getItem('pendingEmail') || '';
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage('❌ Vui lòng nhập email.');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/account/confirm-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), otp: otp.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Xác minh OTP thất bại');
      }

      localStorage.removeItem('pendingEmail');
      setMessage('✅ Xác minh thành công! Đang chuyển hướng...');
      setTimeout(() => navigate('/login'), 1500);
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
          Xác nhận OTP
        </Typography>

        <form onSubmit={handleVerify}>
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
            label="Mã OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Pin />
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
            Xác nhận
          </Button>
        </form>

        {message && (
          <Alert severity={message.includes('✅') ? 'success' : 'error'} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
      </LoginContainer>
    </LoginWrapper>
  );
};

export default OtpVerification;
