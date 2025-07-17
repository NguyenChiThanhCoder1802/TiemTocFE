import { useEffect, useState } from 'react';
import {
  Box, Typography, Avatar, CircularProgress, Alert, Divider,
  Stack, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField
} from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import { getProfile, updateProfile } from '../../api/profileApi';
import type { ProfileDto } from '../../types/ProfileDto';
import { useSnackbar } from 'notistack';

const ProfileInfoCard = () => {
  const [profile, setProfile] = useState<ProfileDto | null>(null);
  const [editProfile, setEditProfile] = useState<ProfileDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getProfile()
      .then((data) => {
        setProfile(data);
        setEditProfile(data);
      })
      .catch(() => setError('Không thể tải thông tin người dùng'))
      .finally(() => setLoading(false));
  }, []);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleChange = (field: keyof ProfileDto, value: string) => {
    setEditProfile((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = async () => {
    if (!editProfile) return;
    try {
      await updateProfile(editProfile);
      setProfile(editProfile);
      enqueueSnackbar('✅ Cập nhật thành công', { variant: 'success' });
      handleCloseDialog();
    } catch {
      enqueueSnackbar('❌ Cập nhật thất bại', { variant: 'error' });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!profile) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Box
          border={1}
          borderColor="divider"
          borderRadius={3}
          p={3}
          bgcolor="white"
          boxShadow={2}
          position="relative"
        >
          <IconButton
            onClick={handleOpenDialog}
            sx={{ position: 'absolute', top: 16, right: 16 }}
            aria-label="Chỉnh sửa"
          >
            <EditIcon />
          </IconButton>

          <Box display="flex" alignItems="center" mb={2}>
            <Avatar
              src={profile.avatarUrl || ''}
              alt={profile.fullName}
              sx={{ width: 72, height: 72, mr: 2 }}
            />
            <Box>
              <Typography variant="h6">{profile.fullName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.phoneNumber}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1}>
            <Typography><strong>Giới tính:</strong> {profile.gender || 'Không rõ'}</Typography>
            <Typography><strong>Ngày sinh:</strong> {profile.birthDate || 'Không rõ'}</Typography>
            <Typography><strong>Địa chỉ:</strong> {profile.address || 'Không rõ'}</Typography>
          </Stack>
        </Box>
      </motion.div>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Cập nhật thông tin cá nhân</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Họ tên"
              fullWidth
              value={editProfile?.fullName || ''}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
            <TextField
              label="Số điện thoại"
              fullWidth
              value={editProfile?.phoneNumber || ''}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
            />
            <TextField
              label="Địa chỉ"
              fullWidth
              value={editProfile?.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
            />
            <TextField
              label="Giới tính"
              fullWidth
              value={editProfile?.gender || ''}
              onChange={(e) => handleChange('gender', e.target.value)}
            />
            <TextField
              label="Ngày sinh"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={editProfile?.birthDate || ''}
              onChange={(e) => handleChange('birthDate', e.target.value)}
            />
            <TextField
              label="Avatar URL"
              fullWidth
              value={editProfile?.avatarUrl || ''}
              onChange={(e) => handleChange('avatarUrl', e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSave} variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileInfoCard;
