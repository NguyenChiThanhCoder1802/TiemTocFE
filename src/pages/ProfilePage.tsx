// src/pages/ProfilePage.tsx
import { useEffect, useRef, useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Avatar,
  IconButton,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { getProfile, updateProfile } from '../api/profileApi';
import type { ProfileDto } from '../types/ProfileDto';
import { ProfileWrapper, ProfileContainer, AvatarCircle } from '../styles/ProfileStyles';
import { Box} from '@mui/material';
import UserPointDisplay from '../pages/UserPointsDisplay';
const genders = ['Nam', 'Nữ', 'Khác'];

const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch {
        enqueueSnackbar('❌ Lỗi khi tải thông tin hồ sơ', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [enqueueSnackbar]);

  const handleChange = (field: keyof ProfileDto, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = async () => {
    if (!profile) return;
    try {
      setSaving(true);
      await updateProfile(profile);
      enqueueSnackbar('✅ Cập nhật hồ sơ thành công', { variant: 'success' });
    } catch {
      enqueueSnackbar('❌ Cập nhật thất bại', { variant: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setProfile({ ...profile, avatarUrl: imageUrl });
  };

  if (loading || !profile) {
    return (
      <ProfileWrapper>
        <CircularProgress />
      </ProfileWrapper>
    );
  }

  return (
    <ProfileWrapper>
      <ProfileContainer>
        <AvatarCircle>
          <Avatar
            src={profile.avatarUrl || ''}
            alt="Avatar"
            sx={{ width: 88, height: 88 }}
          />
          <IconButton
            size="small"
            sx={{ position: 'absolute', bottom: -4, right: -4, bgcolor: '#fff' }}
            onClick={() => fileInputRef.current?.click()}
          >
            <PhotoCamera />
          </IconButton>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </AvatarCircle>

        <Box mt={6}>
          <TextField
            label="Họ tên"
            value={profile.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Số điện thoại"
            value={profile.phoneNumber || ''}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Địa chỉ"
            value={profile.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            select
            label="Giới tính"
            value={profile.gender || ''}
            onChange={(e) => handleChange('gender', e.target.value)}
            fullWidth
            margin="normal"
          >
            {genders.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Ngày sinh"
            type="date"
            value={profile.birthDate ? profile.birthDate.split('T')[0] : ''}
            onChange={(e) => handleChange('birthDate', e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </Box>
        </Box>
      </ProfileContainer>
      <UserPointDisplay />
     
    </ProfileWrapper>
    
  );
};

export default ProfilePage;
