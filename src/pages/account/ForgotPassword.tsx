import { useState } from 'react';
import { forgotPassword } from '../../services/authService';
import {Box,Button,TextField,Typography,Avatar,} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { LoginWrapper, LoginContainer, AvatarCircle } from '../../styles/LoginStyles';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMessage('Vui lòng kiểm tra email của bạn để tiến hành cấp lại mật khẩu mới của bạn.');
      setError('');
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'message' in err &&
        typeof (err as { message?: unknown }).message === 'string'
      ) {
        setError((err as { message: string }).message);
      } else {
        setError('Đã xảy ra lỗi không xác định');
      }
      setMessage('');
    }
  };

  return (
    <LoginWrapper>
      <LoginContainer>
        <AvatarCircle>
          <Avatar sx={{ bgcolor: '#ff7043' }}>
            <LockResetIcon />
          </Avatar>
        </AvatarCircle>

        <Typography variant="h5" fontWeight={600} gutterBottom>
          Quên mật khẩu
        </Typography>

        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Nhập địa chỉ email đã đăng ký để nhận lại mật khẩu
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Gửi yêu cầu
          </Button>
        </Box>

        {message && (
          <Typography sx={{ mt: 2 }} color="green">
            {message}
          </Typography>
        )}
        {error && (
          <Typography sx={{ mt: 2 }} color="red">
            {error}
          </Typography>
        )}
      </LoginContainer>
    </LoginWrapper>
  );
};

export default ForgotPassword;
