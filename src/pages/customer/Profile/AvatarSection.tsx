import {
  Box,
  Avatar,
  Button,CircularProgress
} from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { useState } from 'react'
import { uploadAvatar } from '../../../api/UserAPI'
import type { User } from '../../../types/Auth/User'
interface AvatarSectionProps {
  user: User
  onAvatarChange?: (avatar: string) => void
}
const AvatarSection = ({ user,onAvatarChange  }: AvatarSectionProps) => {
  const [avatar, setAvatar] = useState<string | undefined>(user.avatar)
  const [loading, setLoading] = useState(false)
 const handleUploadAvatar = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('avatar', file)

    try {
      setLoading(true)
      const newAvatar = await uploadAvatar(formData)
      const avatarWithCacheBust = `${newAvatar}?v=${Date.now()}`
      setAvatar(avatarWithCacheBust)
      onAvatarChange?.(avatarWithCacheBust)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        mt: -6 
      }}
    >
       <Box position="relative">
        <Avatar
          key={avatar}
          src={avatar}
          sx={{
            width: 120,
            height: 120,
            border: '4px solid white',
            bgcolor: '#deb887',
            fontSize: 42
          }}
        >
          {user.name?.charAt(0)}
        </Avatar>

        {loading && (
          <CircularProgress
            size={120}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        )}
      </Box>

       <Button
        component="label"
        size="small"
        startIcon={<PhotoCameraIcon />}
        sx={{ mt: 1 }}
        disabled={loading}
      >
        Đổi ảnh
        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleUploadAvatar}
        />
      </Button>
    </Box>
  )
}

export default AvatarSection
