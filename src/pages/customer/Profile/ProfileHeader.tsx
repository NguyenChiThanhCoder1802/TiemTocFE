import { Box, Typography } from '@mui/material'
import useAuth from '../../../hooks/useAuth'
import AvatarSection from './AvatarSection'
import ProfileTabs from './ProfileTabs'

const ProfileHeader = () => {
  const { user } = useAuth()
  if (!user) return null

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: '#f5f5f5',
        pb: 3,
        borderRadius: 3
      }}
    >
      {/* AVATAR */}
      <AvatarSection user={user} />

      {/* NAME + ROLE */}
      <Box textAlign="center" mt={1}>
        <Typography fontWeight={700} fontSize={20}>
          {user.name} - {user.role}
        </Typography>
       
      </Box>

      {/* TABS */}
      <ProfileTabs />
    </Box>
  )
}

export default ProfileHeader
