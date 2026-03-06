// src/components/Profile/SecuritySettings.tsx
import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import axiosInstance from '../../utils/axiosInstance';

const SecuritySettings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Mật khẩu mới không khớp' });
      return;
    }

    try {
      const res = await axiosInstance.put('/account/change-password', {
        oldPassword,
        newPassword,
      });
      setMessage({ type: 'success', text: res.data.message || 'Đổi mật khẩu thành công' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch{
      setMessage({ type: 'error', text: '❌ Không thể đổi mật khẩu. Vui lòng thử lại.' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
      <Box p={3} borderRadius={2} boxShadow={2} bgcolor="#fff">
        <Typography variant="h6" gutterBottom>
          🔐 Cài đặt bảo mật
        </Typography>

        {message && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            type="password"
            label="Mật khẩu hiện tại"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            fullWidth
          />
          <TextField
            type="password"
            label="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
          />
          <TextField
            type="password"
            label="Xác nhận mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleChangePassword}>
            Cập nhật mật khẩu
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};

export default SecuritySettings;
