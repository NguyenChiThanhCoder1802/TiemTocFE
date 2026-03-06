import { Box, Typography,IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import AvatarSection from './AvatarSection'
import ProfileTabs from './ProfileTabs'
import UpdateProfileDialog from './UpdateProfileDialog'
import type { ProfileTab } from '../../../types/Profile/ProfileTab'
interface ProfileHeaderProps {
  activeTab: ProfileTab
  onTabChange: (tab: ProfileTab) => void
}
const ProfileHeader = ({ activeTab, onTabChange }: ProfileHeaderProps) => {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  if (!user) return null

  return (
    <Box sx={{ bgcolor: '#f0f0ed',mt:8, pb: 3, borderRadius: 3 }}>
      <AvatarSection user={user} />

      <Box textAlign="center" mt={1}>
         <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
          <Typography fontWeight={700} fontSize={20}>
            {user.name} - {user.role}
          </Typography>

          <IconButton size="small" onClick={() => setOpen(true)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <ProfileTabs value={activeTab} onChange={onTabChange} />
       <UpdateProfileDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  )
}

export default ProfileHeader
