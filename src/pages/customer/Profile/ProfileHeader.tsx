import { Box, Typography } from '@mui/material'
import useAuth from '../../../hooks/useAuth'
import AvatarSection from './AvatarSection'
import ProfileTabs from './ProfileTabs'
import type { ProfileTab } from '../../../types/Profile/ProfileTab'
interface ProfileHeaderProps {
  activeTab: ProfileTab
  onTabChange: (tab: ProfileTab) => void
}
const ProfileHeader = ({ activeTab, onTabChange }: ProfileHeaderProps) => {
  const { user } = useAuth()
  if (!user) return null

  return (
    <Box sx={{ bgcolor: '#f5f5f5', pb: 3, borderRadius: 3 }}>
      <AvatarSection user={user} />

      <Box textAlign="center" mt={1}>
        <Typography fontWeight={700} fontSize={20}>
          {user.name} - {user.role}
        </Typography>
      </Box>

      <ProfileTabs value={activeTab} onChange={onTabChange} />
    </Box>
  )
}

export default ProfileHeader
